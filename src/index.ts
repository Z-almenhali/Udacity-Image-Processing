import express from 'express';
import router from './routes/routes';

const app = express();
const port = 3000;
app.use('/', router);

// start the Express server
app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});

export default {
  app
};
