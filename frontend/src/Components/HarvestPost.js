import React, { useState } from 'react';
import axios from 'axios';

const InvoiceForm = () => {
    const [clientId, setClientId] = useState('');
    const [subject, setSubject] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [description, setDescription] = useState('');
    const [unitPrice, setUnitPrice] = useState('');
    const [amount, setAmount] = useState(0);
    const handleSubmit = async (event) => {
        event.preventDefault();
const num=Math.round(Math.random(99999))
        const payload = {
            client_id: Number(clientId),
            subject,
            due_date: dueDate,
            estimate_id:Number(num),
            line_items: [
                {
                    kind: "Service",
                    description,                  
                    unit_price: Number(unitPrice),
                    quantity:Number(amount)
                }
            ]
        };

        try {
            const response = await axios.post('/api/invoices', payload, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.status === 201) {
                alert('Invoice created successfully!');
                console.log('Success:', response.data);
            } else {
                alert('Failed to create invoice.');
                console.error('Error:', response.data);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="container">
        <h2>Create New Invoice</h2>
        <form onSubmit={handleSubmit}>
    
            {/* Client ID */}
            <div className="row mb-3">
                <label htmlFor="client_id" className="col-sm-2 col-form-label">Client ID:</label>
                <div className="col-sm-10">
                    <input
                        type="number"
                        className="form-control"
                        id="client_id"
                        name="client_id"
                        value={clientId}
                        onChange={(e) => setClientId(e.target.value)}
                        required
                    />
                </div>
            </div>
    
            {/* Subject */}
            <div className="row mb-3">
                <label htmlFor="subject" className="col-sm-2 col-form-label">Subject:</label>
                <div className="col-sm-10">
                    <input
                        type="text"
                        className="form-control"
                        id="subject"
                        name="subject"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        required
                    />
                </div>
            </div>
    
            {/* Due Date */}
            <div className="row mb-3">
                <label htmlFor="due_date" className="col-sm-2 col-form-label">Due Date:</label>
                <div className="col-sm-10">
                    <input
                        type="date"
                        className="form-control"
                        id="due_date"
                        name="due_date"
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                        required
                    />
                </div>
            </div>
{/* Amout */}
            <div className="row mb-3">
                <label htmlFor="Amount" className="col-sm-2 col-form-label">quantity for one unit :</label>
                <div className="col-sm-10">
                    <input
                        type="text"
                        className="form-control"
                        id="amount"
                        name="amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        required
                    />
                </div>
            </div>

             {/* Unit Price */}
             <div className="row mb-3">
                <label htmlFor="unit_price" className="col-sm-2 col-form-label">Unit</label>
                <div className="col-sm-10">
                    <input
                        type="number"
                        className="form-control"
                        step="0.01"
                        id="unit_price"
                        name="unit_price"
                        value={unitPrice}
                        onChange={(e) => setUnitPrice(e.target.value)}
                        required
                    />
                </div>
            </div>
    
            {/* Description */}
            <div className="row mb-3">
                <label htmlFor="description" className="col-sm-2 col-form-label">Description:</label>
                <div className="col-sm-10">
                    <input
                        type="text"
                        className="form-control"
                        id="description"
                        name="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </div>
            </div>
    
           
    
            {/* Submit Button */}
            <div className="row mb-3">
                <div className="col-sm-10 offset-sm-2">
                    <button type="submit" className="btn btn-primary">Submit</button>
                </div>
            </div>
    
        </form>
    </div>
    
    );
};

export default InvoiceForm;
