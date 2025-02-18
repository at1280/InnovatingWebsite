require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/save-json', (req, res) => {
    const data = req.body;
    const fileName = `${data.companyName}_${data.date}.json`;
    const filePath = path.join(__dirname, 'json_files', fileName);

    // Ensure the directory exists
    if (!fs.existsSync(path.join(__dirname, 'json_files'))) {
        fs.mkdirSync(path.join(__dirname, 'json_files'));
    }

    // Save JSON file
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

    res.status(200).send('File JSON salvato con successo');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});