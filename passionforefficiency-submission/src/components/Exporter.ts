/**
 * Export utilities for capturing globe visualization
 * Supports: Screenshot (PNG), GIF animation (using gifenc), Video (WebM)
 *
 * GIF encoding uses gifenc library: https://github.com/mattdesl/gifenc
 */

import * as THREE from 'three';
// @ts-ignore - gifenc has no type definitions
import { GIFEncoder, quantize, applyPalette } from 'gifenc';

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
    private gifWidth: number = 480;
    private gifHeight: number = 270;

    constructor(renderer: THREE.WebGLRenderer, scene: THREE.Scene, camera: THREE.Camera) {
        this.renderer = renderer;
        this.scene = scene;
        this.camera = camera;

        // Create a canvas for capturing frames at consistent size
        this.captureCanvas = document.createElement('canvas');
        this.captureCtx = this.captureCanvas.getContext('2d', { willReadFrequently: true })!;
    }

    /**
     * Capture a single screenshot
     */
    screenshot(options: ExportOptions = {}): void {
        const { width = 1920, height = 1080 } = options;

        // Store original size
        const originalWidth = this.renderer.domElement.width;
        const originalHeight = this.renderer.domElement.height;

        // Resize for high-res capture
        this.renderer.setSize(width, height);
        (this.camera as THREE.PerspectiveCamera).aspect = width / height;
        (this.camera as THREE.PerspectiveCamera).updateProjectionMatrix();

        // Render
        this.renderer.render(this.scene, this.camera);

        // Capture
        const dataUrl = this.renderer.domElement.toDataURL('image/png');

        // Restore original size
        this.renderer.setSize(originalWidth, originalHeight);
        (this.camera as THREE.PerspectiveCamera).aspect = originalWidth / originalHeight;
        (this.camera as THREE.PerspectiveCamera).updateProjectionMatrix();

        // Download
        this.downloadFile(dataUrl, `globe-${Date.now()}.png`);
    }

    /**
     * Start recording video using MediaRecorder
     * Returns a promise that resolves when recording has started
     */
    startVideoRecording(options: ExportOptions = {}): Promise<void> {
        return new Promise((resolve) => {
            if (this.isRecording) {
                resolve();
                return;
            }

            const canvas = this.renderer.domElement;
            const stream = canvas.captureStream(60);

            this.mediaRecorder = new MediaRecorder(stream, {
                mimeType: 'video/webm;codecs=vp9',
                videoBitsPerSecond: 8000000
            });

            this.recordedChunks = [];

            this.mediaRecorder.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    this.recordedChunks.push(event.data);
                }
            };

            this.mediaRecorder.onstop = () => {
                const blob = new Blob(this.recordedChunks, { type: 'video/webm' });
                const url = URL.createObjectURL(blob);
                this.downloadFile(url, `globe-${Date.now()}.webm`);
                URL.revokeObjectURL(url);
            };

            this.mediaRecorder.onstart = () => {
                this.isRecording = true;
                resolve();
            };

            this.mediaRecorder.start(100); // Capture in 100ms chunks for better reliability
        });
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
     * Captures RGBA data directly from canvas
     */
    captureGifFrame(): void {
        if (!this.isRecording) return;

        const canvas = this.renderer.domElement;
        const width = this.gifWidth;
        const height = this.gifHeight;

        // Draw the renderer canvas to our capture canvas (scaled down)
        this.captureCtx.drawImage(canvas, 0, 0, width, height);

        // Get the raw RGBA image data
        const imageData = this.captureCtx.getImageData(0, 0, width, height);

        // Store a copy of the RGBA data
        this.frames.push({
            data: new Uint8ClampedArray(imageData.data),
            width: width,
            height: height
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
            console.warn('No frames captured for GIF');
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
                    await new Promise(r => setTimeout(r, 0));
                }
            }

            // Finish encoding
            gif.finish();

            // Get the GIF and download
            const bytes = gif.bytes();
            const blob = new Blob([bytes], { type: 'image/gif' });
            const url = URL.createObjectURL(blob);
            const outputFilename = filename || `globe-${Date.now()}.gif`;

            this.downloadFile(url, outputFilename);
            setTimeout(() => URL.revokeObjectURL(url), 1000);

            console.log(`GIF saved: ${outputFilename} (${this.frames.length} frames, ${(blob.size / 1024).toFixed(1)}KB)`);
        } catch (error) {
            console.error('Failed to generate GIF:', error);
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
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        link.style.display = 'none';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
}
