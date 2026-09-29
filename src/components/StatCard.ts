/**
 * StatCard
 *
 * Renders a shareable image summarizing one country's current statistic
 * (and trend, if available) as a 2D canvas. Pure canvas drawing — no WebGL,
 * so it never competes for GPU context budget with the globe itself.
 */

export interface StatCardTrend {
  direction: "up" | "down" | "flat";
  /** e.g. "+2.3% vs last year" */
  label: string;
}

export interface StatCardParams {
  countryName: string;
  statLabel: string;
  formattedValue: string;
  trend?: StatCardTrend | null;
  colorScale: [string, string, string];
}

const CARD_WIDTH = 1200;
const CARD_HEIGHT = 630;
const FONT = "'Inter', system-ui, -apple-system, sans-serif";

function fitFontSize(
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number,
  startSize: number,
  weight: number,
  minSize = 28,
): number {
  let size = startSize;
  ctx.font = `${weight} ${size}px ${FONT}`;
  while (ctx.measureText(text).width > maxWidth && size > minSize) {
    size -= 2;
    ctx.font = `${weight} ${size}px ${FONT}`;
  }
  return size;
}

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
): void {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

function drawGlobeMotif(ctx: CanvasRenderingContext2D, cx: number, cy: number, r: number): void {
  ctx.save();
  ctx.strokeStyle = "rgba(255,255,255,0.16)";
  ctx.lineWidth = 1.5;

  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.stroke();

  // Latitude rings
  [0.5, 0.82].forEach((ratio) => {
    const ry = r * 0.12;
    const rx = r * Math.sqrt(1 - ratio * ratio);
    ctx.beginPath();
    ctx.ellipse(cx, cy - r * ratio, rx, ry, 0, 0, Math.PI * 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.ellipse(cx, cy + r * ratio, rx, ry, 0, 0, Math.PI * 2);
    ctx.stroke();
  });
  ctx.beginPath();
  ctx.ellipse(cx, cy, r, r * 0.16, 0, 0, Math.PI * 2);
  ctx.stroke();

  // Longitude rings
  [0.35, 0.7, 1].forEach((ratio) => {
    ctx.beginPath();
    ctx.ellipse(cx, cy, r * ratio, r, 0, 0, Math.PI * 2);
    ctx.stroke();
  });

  ctx.restore();
}

/**
 * Draw a 1200x630 shareable card for the given country/statistic.
 */
export function renderStatCard(params: StatCardParams): HTMLCanvasElement {
  const canvas = document.createElement("canvas");
  canvas.width = CARD_WIDTH;
  canvas.height = CARD_HEIGHT;
  const ctx = canvas.getContext("2d");
  if (!ctx) return canvas;

  const [low, mid, high] = params.colorScale;

  // Background gradient from the statistic's own color scale
  const grad = ctx.createLinearGradient(0, 0, CARD_WIDTH, CARD_HEIGHT);
  grad.addColorStop(0, low);
  grad.addColorStop(0.5, mid);
  grad.addColorStop(1, high);
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, CARD_WIDTH, CARD_HEIGHT);

  // Dark overlay for text contrast
  ctx.fillStyle = "rgba(5, 10, 20, 0.62)";
  ctx.fillRect(0, 0, CARD_WIDTH, CARD_HEIGHT);

  // Decorative globe motif, right side
  drawGlobeMotif(ctx, CARD_WIDTH - 230, CARD_HEIGHT / 2, 200);

  ctx.textBaseline = "top";

  // Wordmark
  ctx.fillStyle = "rgba(255,255,255,0.88)";
  ctx.font = `700 22px ${FONT}`;
  ctx.fillText("GRALOBE", 64, 56);
  ctx.fillStyle = "rgba(255,255,255,0.4)";
  ctx.font = `500 14px ${FONT}`;
  ctx.fillText("WORLD STATISTICS", 64, 86);

  // Country name (auto-shrinks to fit)
  const nameSize = fitFontSize(ctx, params.countryName, 620, 64, 700, 32);
  ctx.fillStyle = "#ffffff";
  ctx.font = `700 ${nameSize}px ${FONT}`;
  ctx.fillText(params.countryName, 64, 190);

  // Stat label
  ctx.fillStyle = "rgba(255,255,255,0.72)";
  ctx.font = `600 20px ${FONT}`;
  ctx.fillText(params.statLabel.toUpperCase(), 64, 280);

  // Big value (auto-shrinks to fit)
  const valueSize = fitFontSize(ctx, params.formattedValue, 620, 96, 800, 44);
  ctx.fillStyle = "#ffffff";
  ctx.font = `800 ${valueSize}px ${FONT}`;
  ctx.fillText(params.formattedValue, 64, 310);

  // Trend badge
  if (params.trend) {
    const { direction, label } = params.trend;
    const color = direction === "up" ? "#8fe0a8" : direction === "down" ? "#f6a3a3" : "#dcdcdc";
    const bg =
      direction === "up"
        ? "rgba(46,125,70,0.4)"
        : direction === "down"
          ? "rgba(168,31,29,0.4)"
          : "rgba(150,150,150,0.35)";
    const arrow = direction === "up" ? "▲" : direction === "down" ? "▼" : "●";
    const text = `${arrow} ${label}`;

    ctx.font = `600 24px ${FONT}`;
    const textWidth = ctx.measureText(text).width;
    const badgeY = 450;
    const paddingX = 18;
    roundRect(ctx, 64, badgeY, textWidth + paddingX * 2, 48, 24);
    ctx.fillStyle = bg;
    ctx.fill();

    ctx.fillStyle = color;
    ctx.textBaseline = "middle";
    ctx.fillText(text, 64 + paddingX, badgeY + 24);
    ctx.textBaseline = "top";
  }

  // Footer
  ctx.fillStyle = "rgba(255,255,255,0.38)";
  ctx.font = `500 15px ${FONT}`;
  ctx.fillText("Made with Gralobe — npmjs.com/package/gralobe", 64, CARD_HEIGHT - 46);

  return canvas;
}

/**
 * Trigger a browser download of the rendered card as a PNG.
 */
export function downloadStatCard(canvas: HTMLCanvasElement, filename: string): void {
  canvas.toBlob((blob) => {
    if (!blob) return;
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }, "image/png");
}
