import express, { Request, Response } from 'express';
import * as fs from 'fs';
import cors from 'cors'

const port = 3000;
const app = express();
const corsConfig = cors({ origin:'*' })

app.use(corsConfig)
app.get('/video', (req: Request, res: Response) => {
    const videoPath = '../bucket/videos/converted/test-1/FPS60-640x480-1673667625496.mp4';
    const stat = fs.statSync(videoPath);
    const fileSize = stat.size;
    const range = req.headers.range;

    if (range) {
        const parts = range.replace(/bytes=/, '').split('-');
        const start = parseInt(parts[0], 10);
        const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
        const file = fs.createReadStream(videoPath, { start, end });
        const head = {
            'Content-Range': `bytes ${start}-${end}/${fileSize}`,
            'Accept-Ranges': 'bytes',
            'Content-Type': 'video/mp4',
        };

        res.writeHead(206, head);
        file.pipe(res);
    } else {
        const head = {
            'Content-Type': 'video/mp4',
        };

        res.writeHead(200, head);
        fs.createReadStream(videoPath).pipe(res);
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
