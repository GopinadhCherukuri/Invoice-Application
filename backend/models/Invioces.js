const mongoose = require('mongoose');

const invoiceSchema = new mongoose.Schema({
    client_id: {
        type: Number,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    due_date: {
        type: Date,
        required: true
    },
    estimate_id: {
        type:Number,
        required: true
    },
    line_items: {
        type: [{
            kind: {
                type: String,
                enum: ['Service', 'Product'], // Example of using enum for validation
                required: true
            },
            description: {
                type: String,
                required: true
            },
            unit_price: {
                type: Number,
               required: true
            },
            quantity:{
                type: Number,
                required: true
            }
        }],
        required: true
    }
}, { timestamps: true });

const Invoice = mongoose.model('Invoice', invoiceSchema);

module.exports = Invoice;
