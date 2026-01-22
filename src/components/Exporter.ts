/**
 * Export utilities for capturing globe visualization
 * Supports: Screenshot (PNG), GIF animation (using gifenc), Video (WebM)
 *
 * GIF encoding uses gifenc library: https://github.com/mattdesl/gifenc
 */

// @ts-expect-error - gifenc has no type definitions
import { applyPalette, GIFEncoder, quantize } from "gifenc";
import * as THREE from "three";
import type { CountryLabels } from "./CountryLabels";

interface ExportOptions {
  width?: number;
  height?: number;
  duration?: number;
  fps?: number;
  quality?: number;
  filename?: string;
}

interface FrameData {
  data: Uint8ClampedArray;
  width: number;
  height: number;
}

export class Exporter {
  private renderer: THREE.WebGLRenderer;
  private scene: THREE.Scene;
  private camera: THREE.Camera;
  private isRecording: boolean = false;
  private frames: FrameData[] = [];
  private mediaRecorder: MediaRecorder | null = null;
  private recordedChunks: Blob[] = [];
  private captureCanvas: HTMLCanvasElement;
  private captureCtx: CanvasRenderingContext2D;
  private compositeCanvas: HTMLCanvasElement;
  private compositeCtx: CanvasRenderingContext2D;
  private gifWidth: number = 480;
  private gifHeight: number = 270;
  private legendElement: HTMLElement | null = null;
  private countryLabels: CountryLabels | null = null;

  constructor(renderer: THREE.WebGLRenderer, scene: THREE.Scene, camera: THREE.Camera) {
    this.renderer = renderer;
    this.scene = scene;
    this.camera = camera;

    // Create a canvas for capturing frames at consistent size
    this.captureCanvas = document.createElement("canvas");
    this.captureCtx = this.captureCanvas.getContext("2d", { willReadFrequently: true })!;

    // Create composite canvas for video recording (includes legend overlay)
    this.compositeCanvas = document.createElement("canvas");
    this.compositeCtx = this.compositeCanvas.getContext("2d")!;
  }

  /**
   * Set the legend element to include in exports
   */
  setLegendElement(element: HTMLElement | null): void {
    this.legendElement = element;
  }

  /**
   * Set the country labels component to include in exports
   */
  setCountryLabels(labels: CountryLabels | null): void {
    this.countryLabels = labels;
  }

  /**
   * Draw country labels onto canvas
   * @param camera - Optional camera to use for projection (defaults to main camera)
   */
  private drawCountryLabelsOnCanvas(
    ctx: CanvasRenderingContext2D,
    canvasWidth: number,
    canvasHeight: number,
    camera?: THREE.Camera,
  ): void {
    if (!this.countryLabels) return;

    try {
      const labels = this.countryLabels.getVisibleLabelsForCanvas(
        camera || this.camera,
        canvasWidth,
        canvasHeight,
      );

      labels.forEach((label) => {
        ctx.save();
        ctx.globalAlpha = label.opacity;

        // Draw text shadow for better visibility
        ctx.font = "bold 12px Arial, sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        // Shadow/outline
        ctx.strokeStyle = "rgba(0, 0, 0, 0.8)";
        ctx.lineWidth = 3;
        ctx.strokeText(label.text, label.x, label.y);

        // Main text
        ctx.fillStyle = "#ffffff";
        ctx.fillText(label.text, label.x, label.y);

        ctx.restore();
      });
    } catch (error) {
      console.warn("Failed to draw country labels:", error);
    }
  }

  /**
   * Draw all overlays (legend + country labels) onto canvas
   * @param camera - Optional camera to use for label projection (defaults to main camera)
   */
  private drawOverlaysOnCanvas(
    ctx: CanvasRenderingContext2D,
    canvasWidth: number,
    canvasHeight: number,
    camera?: THREE.Camera,
  ): void {
    this.drawCountryLabelsOnCanvas(ctx, canvasWidth, canvasHeight, camera);
    this.drawLegendOnCanvas(ctx, canvasWidth, canvasHeight);
  }

  /**
   * Draw legend onto canvas at specified position
   */
  private drawLegendOnCanvas(
    ctx: CanvasRenderingContext2D,
    canvasWidth: number,
    canvasHeight: number,
  ): void {
    try {
      if (!this.legendElement || !this.legendElement.classList.contains("visible")) return;

      const legend = this.legendElement;
      // Support both old class names and new gralobe- prefixed names
      const title = (legend.querySelector(".gralobe-legend-title") ||
        legend.querySelector(".legend-title")) as HTMLElement;
      const gradient = (legend.querySelector(".gralobe-legend-gradient") ||
        legend.querySelector(".legend-gradient")) as HTMLElement;
      const minLabel = (legend.querySelector(".gralobe-legend-min") ||
        legend.querySelector(".legend-min")) as HTMLElement;
      const maxLabel = (legend.querySelector(".gralobe-legend-max") ||
        legend.querySelector(".legend-max")) as HTMLElement;
      const description = (legend.querySelector(".gralobe-legend-description") ||
        legend.querySelector(".legend-description")) as HTMLElement;

      if (!title || !gradient) return;

      // Fixed size legend - large and readable
      const legendWidth = 280;
      const legendHeight = 100;
      const padding = 20;
      const x = canvasWidth - legendWidth - padding;
      const y = canvasHeight - legendHeight - padding;
      const cornerRadius = 12;

      // Semi-transparent background with border
      ctx.fillStyle = "rgba(0, 10, 20, 0.9)";
      ctx.strokeStyle = "rgba(100, 170, 255, 0.5)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      if (ctx.roundRect) {
        ctx.roundRect(x, y, legendWidth, legendHeight, cornerRadius);
      } else {
        ctx.rect(x, y, legendWidth, legendHeight);
      }
      ctx.fill();
      ctx.stroke();

      // Title - cyan color like the original
      ctx.fillStyle = "#44aaff";
      ctx.font = "bold 18px Arial, sans-serif";
      ctx.fillText(title.textContent || "", x + 16, y + 28);

      // Gradient bar - larger and more visible
      const barX = x + 16;
      const barY = y + 40;
      const barWidth = legendWidth - 32;
      const barHeight = 20;

      // Get colors by sampling the gradient element's computed style
      // or parsing the background property more carefully
      const gradientStyle = gradient.style.background || "";
      let colors: string[] = [];

      // Try to extract rgb/rgba colors from the gradient
      const rgbMatches = gradientStyle.match(/rgba?\([^)]+\)/g);
      if (rgbMatches && rgbMatches.length >= 2) {
        colors = rgbMatches;
      } else {
        // Try hex colors
        const hexMatches = gradientStyle.match(/#[0-9a-fA-F]{3,8}/g);
        if (hexMatches && hexMatches.length >= 2) {
          colors = hexMatches;
        }
      }

      // Draw gradient if we found colors
      if (colors.length >= 2) {
        const grd = ctx.createLinearGradient(barX, 0, barX + barWidth, 0);
        grd.addColorStop(0, colors[0]);
        if (colors.length >= 3) {
          grd.addColorStop(0.5, colors[1]);
          grd.addColorStop(1, colors[2]);
        } else {
          grd.addColorStop(1, colors[1]);
        }
        ctx.fillStyle = grd;

        // Draw gradient bar with rounded corners
        ctx.beginPath();
        if (ctx.roundRect) {
          ctx.roundRect(barX, barY, barWidth, barHeight, 4);
        } else {
          ctx.rect(barX, barY, barWidth, barHeight);
        }
        ctx.fill();
      } else {
        // Fallback: draw a placeholder gradient (orange scale like life expectancy)
        const grd = ctx.createLinearGradient(barX, 0, barX + barWidth, 0);
        grd.addColorStop(0, "#cc6600");
        grd.addColorStop(0.5, "#ffaa44");
        grd.addColorStop(1, "#ffeecc");
        ctx.fillStyle = grd;
        ctx.beginPath();
        if (ctx.roundRect) {
          ctx.roundRect(barX, barY, barWidth, barHeight, 4);
        } else {
          ctx.rect(barX, barY, barWidth, barHeight);
        }
        ctx.fill();
        console.log("Legend gradient style:", gradientStyle);
      }

      // Min/Max labels - larger text
      ctx.fillStyle = "#cccccc";
      ctx.font = "14px Arial, sans-serif";
      if (minLabel) ctx.fillText(minLabel.textContent || "", barX, y + 78);
      if (maxLabel) {
        const maxText = maxLabel.textContent || "";
        const maxWidth = ctx.measureText(maxText).width;
        ctx.fillText(maxText, barX + barWidth - maxWidth, y + 78);
      }

      // Description text if available
      if (description && description.textContent) {
        ctx.fillStyle = "#888888";
        ctx.font = "italic 12px Arial, sans-serif";
        ctx.fillText(description.textContent, barX, y + 95);
      }
    } catch (error) {
      console.warn("Failed to draw legend on canvas:", error);
    }
  }

  /**
   * Capture a single screenshot (includes legend if visible)
   * Uses an offscreen renderer to avoid disturbing the main display
   */
  screenshot(options: ExportOptions = {}): void {
    const { width = 1920, height = 1080, filename } = options;

    // Create an offscreen renderer to avoid disturbing the main display
    const offscreenRenderer = new THREE.WebGLRenderer({
      antialias: true,
      preserveDrawingBuffer: true,
    });
    offscreenRenderer.setSize(width, height);
    offscreenRenderer.setPixelRatio(1); // Use 1 for consistent output size

    // Create a temporary camera with correct aspect ratio
    const tempCamera = (this.camera as THREE.PerspectiveCamera).clone();
    tempCamera.aspect = width / height;
    tempCamera.updateProjectionMatrix();

    // Render to offscreen renderer
    offscreenRenderer.render(this.scene, tempCamera);

    // Create composite with legend and labels
    // IMPORTANT: Pass tempCamera so labels are projected correctly for the screenshot aspect ratio
    this.compositeCanvas.width = width;
    this.compositeCanvas.height = height;
    this.compositeCtx.drawImage(offscreenRenderer.domElement, 0, 0);
    this.drawOverlaysOnCanvas(this.compositeCtx, width, height, tempCamera);

    // Capture from composite
    const dataUrl = this.compositeCanvas.toDataURL("image/png");

    // Clean up offscreen renderer
    offscreenRenderer.dispose();

    // Download
    const outputFilename = filename ? `${filename}.png` : `globe-${Date.now()}.png`;
    this.downloadFile(dataUrl, outputFilename);
  }

  /**
   * Start recording video using MediaRecorder
   * Prefers MP4 format when available, falls back to WebM
   * Includes legend overlay if visible
   * Returns a promise that resolves when recording has started
   */
  startVideoRecording(options: ExportOptions = {}): Promise<void> {
    return new Promise((resolve) => {
      if (this.isRecording) {
        resolve();
        return;
      }

      // Set up composite canvas at renderer size for video with legend
      const rendererCanvas = this.renderer.domElement;
      this.compositeCanvas.width = rendererCanvas.width;
      this.compositeCanvas.height = rendererCanvas.height;

      // Draw initial frame to composite canvas before starting stream
      this.compositeCtx.drawImage(rendererCanvas, 0, 0);
      this.drawOverlaysOnCanvas(
        this.compositeCtx,
        this.compositeCanvas.width,
        this.compositeCanvas.height,
      );

      // Use composite canvas stream - frames captured at 60fps
      // updateVideoFrame() must be called each animation frame to keep it updated
      const stream = this.compositeCanvas.captureStream(60);

      // Try MP4 first (supported in Safari, some Chromium builds)
      // Then try WebM with H.264 (more compatible), then VP9, then VP8
      const mimeTypes = [
        { mime: "video/mp4;codecs=avc1", ext: "mp4" },
        { mime: "video/mp4", ext: "mp4" },
        { mime: "video/webm;codecs=h264", ext: "webm" },
        { mime: "video/webm;codecs=vp9", ext: "webm" },
        { mime: "video/webm;codecs=vp8", ext: "webm" },
        { mime: "video/webm", ext: "webm" },
      ];

      let selectedMime = "video/webm";
      let selectedExt = "webm";

      for (const { mime, ext } of mimeTypes) {
        if (MediaRecorder.isTypeSupported(mime)) {
          selectedMime = mime;
          selectedExt = ext;
          console.log(`Video recording using: ${mime}`);
          break;
        }
      }

      this.mediaRecorder = new MediaRecorder(stream, {
        mimeType: selectedMime,
        videoBitsPerSecond: 8000000,
      });

      this.recordedChunks = [];
      const fileExtension = selectedExt;

      this.mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          this.recordedChunks.push(event.data);
        }
      };

      this.mediaRecorder.onstop = () => {
        const mimeType = selectedMime.split(";")[0]; // Get base mime type
        const blob = new Blob(this.recordedChunks, { type: mimeType });
        const url = URL.createObjectURL(blob);
        this.downloadFile(url, `globe-${Date.now()}.${fileExtension}`);
        URL.revokeObjectURL(url);
      };

      this.mediaRecorder.onstart = () => {
        this.isRecording = true;
        // Wait a tiny bit for the first proper frame to be captured
        setTimeout(() => resolve(), 50);
      };

      this.mediaRecorder.start(100); // Capture in 100ms chunks for better reliability
    });
  }

  /**
   * Update video frame - call this in animation loop while recording video
   * Composites the renderer output with the legend overlay
   */
  updateVideoFrame(): void {
    if (!this.isRecording || !this.mediaRecorder) return;

    const width = this.compositeCanvas.width;
    const height = this.compositeCanvas.height;

    // Draw renderer to composite canvas
    this.compositeCtx.drawImage(this.renderer.domElement, 0, 0, width, height);

    // Draw legend overlay
    this.drawOverlaysOnCanvas(this.compositeCtx, width, height);
  }

  /**
   * Stop video recording
   */
  stopVideoRecording(): void {
    if (!this.isRecording || !this.mediaRecorder) return;

    this.mediaRecorder.stop();
    this.isRecording = false;
  }

  /**
   * Start GIF capture (frame collection)
   */
  startGifCapture(options: ExportOptions = {}): void {
    if (this.isRecording) return;

    this.frames = [];
    this.isRecording = true;

    // Set capture size (smaller for GIF to keep file size reasonable)
    const { width = 480, height = 270 } = options;
    this.gifWidth = width;
    this.gifHeight = height;
    this.captureCanvas.width = width;
    this.captureCanvas.height = height;
  }

  /**
   * Capture a single GIF frame (call this in animation loop)
   * Captures RGBA data directly from canvas, includes legend if visible
   */
  captureGifFrame(): void {
    if (!this.isRecording) return;

    const canvas = this.renderer.domElement;
    const width = this.gifWidth;
    const height = this.gifHeight;

    // Draw the renderer canvas to our capture canvas (scaled down)
    this.captureCtx.drawImage(canvas, 0, 0, width, height);

    // Draw all overlays (country labels + legend)
    this.drawOverlaysOnCanvas(this.captureCtx, width, height);

    // Get the raw RGBA image data
    const imageData = this.captureCtx.getImageData(0, 0, width, height);

    // Store a copy of the RGBA data
    this.frames.push({
      data: new Uint8ClampedArray(imageData.data),
      width: width,
      height: height,
    });
  }

  /**
   * Stop GIF capture and generate GIF using gifenc
   * Uses a single global palette for smooth animation (no flickering)
   */
  async stopGifCapture(options: ExportOptions = {}): Promise<void> {
    if (!this.isRecording) return;

    this.isRecording = false;

    if (this.frames.length === 0) {
      console.warn("No frames captured for GIF");
      return;
    }

    const { fps = 20, filename } = options;
    const delay = Math.round(1000 / fps); // milliseconds per frame

    console.log(`Generating GIF with ${this.frames.length} frames at ${fps} fps...`);

    try {
      const firstFrame = this.frames[0];
      const width = firstFrame.width;
      const height = firstFrame.height;

      // Create a single global palette from the first frame
      // This prevents color flickering between frames
      const globalPalette = quantize(firstFrame.data, 256);

      // Create GIF encoder
      const gif = GIFEncoder();

      // Process each frame using the same global palette
      for (let i = 0; i < this.frames.length; i++) {
        const frame = this.frames[i];

        // Apply the global palette to this frame
        const index = applyPalette(frame.data, globalPalette);

        // Write frame
        gif.writeFrame(index, width, height, {
          palette: i === 0 ? globalPalette : undefined, // Only first frame needs palette
          delay: delay,
          repeat: i === 0 ? 0 : undefined, // 0 = loop forever
        });

        // Yield to UI every 10 frames
        if (i % 10 === 0) {
          await new Promise((r) => setTimeout(r, 0));
        }
      }

      // Finish encoding
      gif.finish();

      // Get the GIF and download
      const bytes = gif.bytes();
      const blob = new Blob([bytes], { type: "image/gif" });
      const url = URL.createObjectURL(blob);
      const outputFilename = filename || `globe-${Date.now()}.gif`;

      this.downloadFile(url, outputFilename);
      setTimeout(() => URL.revokeObjectURL(url), 1000);

      console.log(
        `GIF saved: ${outputFilename} (${this.frames.length} frames, ${(blob.size / 1024).toFixed(1)}KB)`,
      );
    } catch (error) {
      console.error("Failed to generate GIF:", error);
    }

    // Clear frames
    this.frames = [];
  }

  /**
   * Check if currently recording
   */
  getIsRecording(): boolean {
    return this.isRecording;
  }

  /**
   * Get frame count for GIF
   */
  getFrameCount(): number {
    return this.frames.length;
  }

  private downloadFile(url: string, filename: string): void {
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    link.style.display = "none";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}
