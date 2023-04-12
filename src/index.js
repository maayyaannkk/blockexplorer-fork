import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import NavbarMain from './components/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import DashboardCard from './components/DashboardCard';
import Transactions from './components/Transactions';

document.body.style.backgroundColor = '#343a40';

ReactDOM.render(
  <React.StrictMode>
    <NavbarMain />
    <br />
    <DashboardCard />
    <br />
    <Transactions />

  </React.StrictMode>,
  document.getElementById('root')
);

