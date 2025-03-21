import { MimeType, Transformer } from "remix-image";
import sharp from "sharp";

const supportedInputs = new Set([
  MimeType.JPEG,
  MimeType.PNG,
  MimeType.WEBP,
  MimeType.TIFF,
]);

const supportedOutputs = new Set([MimeType.JPEG, MimeType.PNG, MimeType.WEBP]);

export const sharpTransformer: Transformer = {
  name: "sharpTransformer",
  supportedInputs,
  supportedOutputs,
  transform: async (
    { data },
    {
      contentType: outputContentType,
      width,
      height,
      fit,
      position,
      background,
      quality,
      compressionLevel,
      loop,
      delay,
    }
  ) => {
    const image = sharp(data);

    image
      .resize(width, height, {
        fit,
        position,
        ...(background && {
          background: {
            r: background[0],
            g: background[1],
            b: background[2],
            alpha: background[3],
          },
        }),
      })
      .jpeg({
        quality,
        progressive: true,
        force: outputContentType === MimeType.JPEG,
      })
      .png({
        progressive: true,
        compressionLevel,
        force: outputContentType === MimeType.PNG,
      })
      // Possible, but requires additional sharp config
      // .gif({
      //   loop,
      //   delay: delay ? [delay] : undefined,
      //   force: outputContentType === MimeType.GIF,
      // })
      .webp({
        quality,
        force: outputContentType === MimeType.WEBP,
      })
      .tiff({
        quality,
        // cannot be displayed on browsers
        force: false,
      });

    return image.toBuffer();
  },
};
