const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dataSchema = new Schema({
    id: { type: Number },
    name: { type: String },
    coordinate: {
        x: { type: Number },
        y: { type: Number },
    },
    labels: [{ type: String }],
});

const TableData = mongoose.model('Data', dataSchema);

module.exports = TableData;