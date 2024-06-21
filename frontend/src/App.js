import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Login from './Components/Login';
import Dashbord from './Components/Dashbord';
import DisplayInvoices from './Components/DisplayInvoices';
import Profile from './Components/Profile';
import InvoiceForm from './Components/HarvestPost';
import Logout from './Components/LogOut';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'


function App() {

  
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Login/>} />
        <Route path='/Dashboard' element={<Dashbord />} >
          <Route path="create-invoice" element={<InvoiceForm/>} />
          <Route path="display-invoices" element={<DisplayInvoices />} />
          <Route path="profile" element={<Profile />} />
          <Route path="logout" element={<Logout/>} />
          <Route index element={<DisplayInvoices/>} />
        </Route>
        {/* <Route path='/Posts' element={<InvoiceForm/>} /> */}
      </Routes>
    
      {/* <button className="btn btn-primary" onClick={postingInvoice}>post</button> */}
    </div>
  );
}

export default App;
