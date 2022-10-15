import { Router, Response, Request } from 'express';
import middlewares from '../middleware/middlewares';
import utils from '../Utils/utils';

const route = Router();

route.get('/', middlewares.validation, (req: Request, res: Response) => {
  const filename = req.query.filename;
  const width = req.query.width;
  const height = req.query.height;

  utils
    .ProcessImage(filename as string, width as string, height as string)
    .then((imagePath) => {
      return res.sendFile(imagePath, { root: '.' });
    })
    .catch((error) => {
      return res.status(400).send(error);
    });
});

export default {
  route
};
