// Author: Rahul Saliya

import React from 'react';
import ReactDOM from 'react-dom/client';
import 'index.css';
import 'rsuite/dist/rsuite.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Dashboard from 'screens/Dashboard';
import Footer from 'components/Footer';
import Header from 'components/Header';
import {
  Routes, Route, BrowserRouter
} from "react-router-dom";
import OrderDetails from 'screens/OrderDetails';
import PackageDetails from 'screens/PackageDetails';
import Login from 'screens/Login';
import SignUp from 'screens/SignUp';
import ContactUs from 'screens/ContactUs';
import ContactList from 'screens/ContactList';
import FAQs from 'screens/FAQs';
import ProfilePage from './screens/ProfilePage/index';
import Page404 from 'screens/Page404';
import Wishlist from 'screens/Wishlist';
import ForgotPassword from 'screens/ForgotPassword';
import ResetPassword from 'screens/ResetPassword';
import Adminlogin from 'screens/AdminLogin/Adminlogin';
import Payment from 'screens/Payment';
import MoreTrips from 'screens/MoreTrips';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/order-details" element={<OrderDetails />} />
        <Route path="/package-details" element={<PackageDetails />} />
        <Route path="/moretrips" element={<MoreTrips />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/profilepage" element={<ProfilePage />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/admin" element={<Adminlogin />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/resetpassword" element={<ResetPassword />} />
        <Route path="/admin/contact-list" element={<ContactList />} />
        <Route path="/faqs" element={<FAQs />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  </React.StrictMode >
);