// downloadController.js
const express = require('express');
const ytdl = require('ytdl-core');
const router = express.Router();
const cors = require('cors');

router.use(cors());

router.get('/download', async (req, res) => {
    try {
        const videoUrl = req.query.videoUrl;
        console.log('Video URL:', videoUrl);
        const info = await ytdl.getInfo(videoUrl);
        const audioFormat = ytdl.chooseFormat(info.formats, { quality: 'highestaudio' });

        res.header('Content-Disposition', `attachment; filename="${info.title}.mp3"`);
        res.setHeader('Content-Type', 'audio/mp3');

        const readableStream = ytdl(videoUrl, { format: audioFormat });
        let fileSize = 0;

        readableStream.on('response', (response) => {
            fileSize = parseInt(response.headers['content-length'], 10);
        });

        readableStream.on('data', (chunk) => {
            res.write(chunk);
        });

        readableStream.on('end', () => {
            res.end();

            console.log('Download complete.');
            console.log('File size:', fileSize, 'bytes');
        });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ error: 'An error occurred during the download.' });
    }
});

module.exports = router;
