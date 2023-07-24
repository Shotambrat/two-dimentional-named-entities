const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('config');
const TableData = require('./model');

const app = express();
app.use(bodyParser.json());


mongoose.connect(config.get('mongoURL'), {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const conn = mongoose.connection;
conn.on('error', console.error.bind(console, 'connection error:'));
conn.once('open', function() {
    console.log('Connected to MongoDB');
});

// обработчик GET-запросов на получение всех данных
app.get('/api/data', async (req, res) => {
    try {
        const data = await TableData.find({});
        res.json(data);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Ошибка сервера' });
    }
});

  // обработчик POST-запросов на создание новых данных
app.post('/api/data', async (req, res) => {
    try {
        const newData = new TableData(req.body);
        await newData.save();
        res.json(newData);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Ошибка сервера' });
    }
});

  // обработчик PUT-запросов на обновление данных
app.put('/api/data/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updatedData = await TableData.findOneAndUpdate(
            { id },
            req.body,
            { new: true }
        );
        res.json(updatedData);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Ошибка сервера' });
    }
});

  // обработчик DELETE-запросов на удаление данных
app.delete('/api/data/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await TableData.findOneAndDelete({ id });
        res.json({ message: 'Данные успешно удалены' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Ошибка сервера' });
    }
});

app.listen(config.get('PORT'), () => {
    console.log(`Сервер запущен на порту ${config.get('PORT')}`)
})