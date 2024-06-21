import React from 'react';
import { Link, Outlet, Routes } from 'react-router-dom';


const Dashboard = () => {
    return (
        
        <div className="container-fluid dashboard">
        <div className="row h-100 m-5">
            <aside className="col-md-3 sidebar bg-light">
                <nav className="nav flex-column">
                    <h1 className="h4">Invoice Application</h1>
                    <ul className="nav flex-column">
                        <li className="nav-item">
                            <Link to="/Dashboard/create-invoice" className="nav-link">Create New Invoice</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/Dashboard/display-invoices" className="nav-link">Display Invoices</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/Dashboard/profile" className="nav-link">Profile</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/Dashboard/logout" className="nav-link">Logout</Link>
                        </li>
                    </ul>
                </nav>
            </aside>
            <main className="col-md-9 main-content">
                <Outlet/>
            </main>
        </div>
    </div> 
    );
};

export default Dashboard;
