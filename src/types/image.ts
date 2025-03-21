import { MimeType } from "./file";

export type ResponsiveSize = {
  size: {
    width: number;
    height?: number;
  };
  maxWidth?: number;
};

/** RGBA hex values 0...255 */
export type Color = [number, number, number, number];

export type ImageFit = "contain" | "cover" | "fill" | "inside" | "outside";

export type ImagePositionHorizontal = "left" | "center" | "right";
export type ImagePositionVertical = "top" | "center" | "bottom";
export type ImagePosition =
  | ImagePositionHorizontal
  | ImagePositionVertical
  | `${ImagePositionHorizontal} ${ImagePositionVertical}`;

export type FlipDirection = "horizontal" | "vertical" | "both";

export interface CropOptions {
  /** The x position of the upper left pixel. */
  x: number;
  /** The y position of the upper left pixel. */
  y: number;
  /** The number of pixels wide to crop the image. */
  width: number;
  /** The number of pixels high to crop the image. */
  height: number;
}

export interface TransformOptions {
  /** Width of resulting image. */
  width: number;
  /** Height of resulting image. If width is present, this take priority. */
  height?: number;
  /** The content type of the resulting image. (optional, default source type) */
  contentType?: MimeType;
  /** How the image should be resized to fit both provided dimensions. (optional, default 'contain') */
  fit?: ImageFit;
  /** Position to use when fit is cover or contain. (optional, default 'center') */
  position?: ImagePosition | string | number;
  /** Background color of resulting image. (optional, default [0x00, 0x00, 0x00, 0x00]) */
  background?: Color;
  /** Quality, integer 1-100. (optional, default 80) */
  quality?: number;
  /** zlib compression level, 0-9. (optional, default 9) */
  compressionLevel?: number;
  /** Number of animation iterations, use 0 for infinite animation. (optional, default 0) */
  loop?: number;
  /** Delay between animation frames (in milliseconds). (optional, default 100) */
  delay?: number;
  /** The number of pixels to blur the image by. (optional, default null) */
  blurRadius?: number | null;
  /** The number of degrees to rotate the image by. (optional, default null) */
  rotate?: number | null;
  /** The direction to mirror the image by. (optional, default null) */
  flip?: FlipDirection | null;
  /** The location to crop the source image before any other operations are applied. (optional, default null) */
  crop?: CropOptions | null;
}

export type SizelessOptions = Omit<TransformOptions, "width" | "height">;
