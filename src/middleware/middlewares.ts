import { Response, Request, NextFunction } from 'express';

function validation(req: Request, res: Response, next: NextFunction) {
  const filename = req.query.filename;
  const width = req.query.width;
  const height = req.query.height;

  if (!filename) {
    return res.status(400).send('parameter not sent');
  } else if ((width && !height) || (!width && height)) {
    return res.status(400).send('send both width and hieght');
  } else if (width && height) {
    const width_number = Number(width);
    const height_number = Number(height);

    if (isNaN(width_number) || isNaN(height_number)) return res.status(400).send('Only numbers allowed');

    if (width_number < 0 || height_number < 0) {
      return res.status(400).send('width and hieght must be positive numbers');
    }
  }

  next();
}
export default {
  validation
};
