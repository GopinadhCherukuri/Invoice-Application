import React, { useState, useEffect } from "react";
import axios from "axios";

const DisplayInvoices = () => {
  const [invoices, setInvoices] = useState([]);
  const [message, setMessage] = useState("");
  const [estimates, setEstimates] = useState([]);

  const fetchEstimates = async (invoiceId) => {
    try {
        console.log(invoiceId);
      const response = await axios.get(`/invoices/${invoiceId}/estimates`);
      console.log(response.data);
      setEstimates(response.data);
     
    } catch (error) {
      console.log(error.response ? error.response.data.error : error.message);
    }
  };

  const viewInvoiceDetails = async (invoice, event) => {
    event.preventDefault();
console.log(invoice.id)
  const res = await fetchEstimates(invoice.id);

    // const formData = {
    //   subject: "Estimate #1001",
    //   body: "Here is our estimate.",
    //   send_me_a_copy: true,
    //   estimates,
    //   recipients: [
    //     {
    //       name: "Bhaskar godasi",
    //       email: "bhaskaragodasi@gmail.com",
    //     },
    //   ],
    // };
    console.log(estimates)

    axios
      .post("/invoices/check-past-due",{estimate_id:estimates})
      .then((response) => {
        console.log("Response:", response.data);
        setMessage("Estimate sent successfully!");
      })
      .catch((error) => {
        console.error("Error:", error);
        setMessage("Failed to send estimate.");
      });
  };

  const editInvoice = (invoice) => {
    // Logic to edit the invoice
    console.log("Editing invoice:", invoice);
  };

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const response = await axios.get("/fetch-invoices");
        setInvoices(response.data.invoices);
        console.log("Fetched invoices:", response.data);
      } catch (error) {
        console.error("Error fetching invoices:", error);
      }
    };

    fetchInvoices();
  }, []);

  return (
    <div className="invoices-list row">
      {message && <p>{message}</p>}
      {invoices?.map((invoice) => (
        <div key={invoice._id} className="col-md-6 mb-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">{invoice.subject}</h5>
              <p className="card-text">
                <strong>Client ID:</strong> {invoice.client_id}
              </p>
              <p className="card-text">
                <strong>Due Date:</strong> {invoice.due_date}
              </p>
              <div className="card-buttons">
                <button
                  className="btn btn-primary mx-2"
                  onClick={(e) => viewInvoiceDetails(invoice, e)}
                >
                  Send Reminder mail
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={() => editInvoice(invoice)}
                >
                  Edit Invoice
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DisplayInvoices;
