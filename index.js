const express = require('express');
const app = express();
const port = process.env.PORT || 3000; // Use the environment port or default to 3000
const downloadController = require('./downloadController');

app.use(downloadController);

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});