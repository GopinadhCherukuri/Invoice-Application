const express=require('express')
const path=require('path')
const app=express()
const port=7007
require('./auth');
app.use(express.json())
app.use(express.static(path.join(__dirname, 'frontend')));
const passport=require('passport')
const session=require('express-session')
const axios=require('axios')
require('dotenv').config()

const connectDB = require("./connectDB");
const Invoice = require('./models/Invioces');
// const { postingInvoice } = require('./zapier');

const ACCESS_TOKEN =process.env.ACCESS_TOKENS;
        const ACCOUNT_ID = process.env.ACCOUNT_IDS;

        let user
function isLoggedIn(req, res, next){
    req.user ? next():res.sendStatus(401)
}

app.get('/', (req, res)=>{
    res.sendFile('index.html')
})

connectDB();
app.use(session({
    secret: 'mysecret',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
  }))

app.use(passport.initialize());
app.use(passport.session());
app.get('/auth/google',passport.authenticate('google', { scope:
        [ 'email', 'profile' ] }
  ));
  
  app.get( '/auth/google/callback',
      passport.authenticate( 'google', {
          successRedirect: '/auth/google/success',
          failureRedirect: '/auth/google/failure'
  }));
  app.get('/auth/google/failure', isLoggedIn, (req, res)=>{
    res.send('Something went wrong!');
  })

  app.get('/auth/google/success', (req, res)=>{
    user=req.user
    console.log(req,"success");
    res.redirect('http://localhost:3000/Dashboard')
  })

  app.get('/auth/protected', (req, res)=>{
    console.log(req.user);
   
    res.json(user);
  })

  app.get('/auth/logout', (req, res)=>{
   console.log('logout');
    req.session.destroy();
    res.send('See you again!');
  });

  app.get('/fetch-invoices', async (req, res) => {
    try {
        // Harvest API endpoint for invoices
        const apiUrl = 'https://api.harvestapp.com/v2/invoices';

       
        // Axios GET request to Harvest API
        const response = await axios.get(apiUrl, {
            headers: {
                'Authorization': `Bearer ${ACCESS_TOKEN}`,
                'Harvest-Account-Id': ACCOUNT_ID,
                'User-Agent': "Zapier xraythought@gmail.com"
            }
        });

        // console.log(response);
        // Send the API response back to the client
        res.json(response.data);
    } catch (error) {
        // Handle errors
        console.error('Error fetching invoices:', error);
        res.status(error.response.status || 500).json({ error: error.message });
    }
});

  
  // Get a specific invoice
  app.get('/invoices/:id', async (req, res) => {
    try {
      const invoice = await Invoice.findById(req.params.id);
      if (!invoice) return res.status(404).send('Invoice not found');
      res.json(invoice);
    } catch (err) {
      res.status(500).send(err);
    }
  });
  


    
  // Endpoint to trigger Zapier automation for past-due invoices
  app.post('/api/invoices', async (req, res) => {
    const { client_id, subject, due_date,amount,estimate_id, line_items } = req.body;
    const newInvoice = new Invoice({ client_id, subject, due_date,amount,estimate_id, line_items });
    
    try {
        await newInvoice.save();

         const headers = {
            "Authorization": `Bearer ${ACCESS_TOKEN}`,
            "Harvest-Account-Id": ACCOUNT_ID,
            "User-Agent": "Zapier xraythought@gmail.com",
            "Content-Type": "application/json"
        };

        const payload = {
            client_id,
            subject,
            due_date,
            estimate_id,
            line_items
        };

        const response = await fetch("https://api.harvestapp.com/v2/invoices", {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            const errorDetails = await response.json();
            return res.status(response.status).json({ error: 'Harvest API error', details: errorDetails });
        }
console.log('Harvest')
        const data = await response.json();
        res.status(201).json(data);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
});
  
  // get estimate id from an invoice
  app.get('/invoices/:invoice_id/estimates', async (req, res) => {
    const { invoice_id } = req.params;
  console.log(invoice_id);
    const  headers= {
        'Authorization': `Bearer ${ACCESS_TOKEN}`,
        'Harvest-Account-Id': ACCOUNT_ID,
        'User-Agent': 'Zapier xraythought@gmail.com',

    };
  
    try {
      // Fetch estimates associated with the invoice_id
      const response = await axios.get(`https://api.harvestapp.com/v2/invoices/${invoice_id}/estimates`, headers);
      
      // Extract relevant estimate information from the response
      const estimates = response.data.estimates.map(estimate => ({
        id: estimate.id,
        subject: estimate.subject,
        amount: estimate.amount
        // Add more fields as needed
      }));
  
      res.status(200).json(estimates);
    } catch (error) {
    //  console.error('Error fetching estimates:', error.response ? error.response.data : error.message);
      res.status(500).json({ error: error.response ? error.response.data : error.message });
    }
  });
  
  

  
  // Check and update past-due invoices
  app.post('/invoices/check-past-due', async (req, res) => {
    const {estimate_id}= req.body
const headers = {
      'Authorization': `Bearer ${ACCESS_TOKEN}`,
      'Harvest-Account-Id': ACCOUNT_ID,
      "User-Agent": "Zapier xraythought@gmail.com",
      'Content-Type': 'application/json',
};
  
  const payload = {
    subject: 'Estimate #1001',
    body: 'Here is our estimate.',
    send_me_a_copy: true,
    recipients: [
      {
        name: 'Bhaskar godasi',
        email: 'bhaskaragodasi@gmail.com'
      }
    ]
  };
  
  try {

    const response = await fetch(`https://api.harvestapp.com/v2/estimates/${estimate_id}/messages`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(payload)
    });


    // const response = await axios.post(`https://api.harvestapp.com/v2/estimates/1/messages`, data, config);
     const data = await response.json();
        res.status(201).json(data);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: error.message });
  }

  });

app.listen(port,()=>{
    console.log(`Listening on port ${port}`)
})