import * as fs from 'fs';
import sharp from 'sharp';

const ProcessImage = (filename: string, width: string | null, height: string | null): Promise<string> => {
  // This function takes three parameters filename, width, height
  // It returns the picture path which either got resized or not
  return new Promise((resolve, reject) => {
    fs.stat('./Full/' + filename + '.jpg', (err: NodeJS.ErrnoException | null) => {
      if (err == null) {
        if (!width && !height) {
          resolve('./Full/' + filename + '.jpg');
        } else {
          fs.stat('./thumb/' + filename + '-' + width + '-' + height + '.jpg', (err: NodeJS.ErrnoException | null) => {
            if (err == null) {
              resolve('./thumb/' + filename + '-' + width + '-' + height + '.jpg');
            } else if (err.code === 'ENOENT') {
              sharp('./Full/' + filename + '.jpg')
                .resize(Number(width), Number(height))
                .toFile('./thumb/' + filename + '-' + width + '-' + height + '.jpg')
                .then(() => {
                  resolve('./thumb/' + filename + '-' + width + '-' + height + '.jpg');
                })
                .catch(() => {
                  reject('error while processing the image');
                });
            }
          });
        }
        //------------------------------
      } else if (err.code === 'ENOENT') {
        reject('image not found');
      } else {
        reject('error');
      }
    });
  });
};

export default {
  ProcessImage
};
