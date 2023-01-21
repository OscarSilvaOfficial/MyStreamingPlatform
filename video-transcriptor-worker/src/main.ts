import { createReadStream } from 'fs';
import { ONE_MB } from './constants';
import { logReadFile } from './functions';

const VIDEO = createReadStream('./test-4.mp4');

const execute = setInterval(() => {
  if (VIDEO.readableEnded) {
    console.log(VIDEO)
    clearInterval(execute);
  }
  logReadFile(VIDEO)
  VIDEO.read(ONE_MB / 100);
}, 10)
