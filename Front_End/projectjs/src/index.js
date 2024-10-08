import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './Layout';
import Home from './pages/Home';

import Faculty from './pages/Faculty';
import DetailFaculty from './pages/DetailFaculty';
import AddFaculty from './pages/AddFaculty';
import EditFaculty from './pages/EditFaculty';

import Product from './pages/Product';
import DetailProduct from './pages/DetailProduct';
import AddProduct from './pages/AddProduct';
 import EditProduct from './pages/EditProduct';
import Student from './pages/Student';
import DetailStudent from './pages/DetailStudent';
import AddStudent from './pages/AddStudent';
import EditStudent from './pages/EditStudent';
// import Faculty from './pages/Faculty';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<Layout/>}>
        <Route index element={<Home />} />

        <Route path="/Products" element={<Product/>} />
        <Route path="/Products/:ProductID" element={<DetailProduct/>} />
        <Route path="/AddProducts/add" element={<AddProduct/>} />
        <Route path="/edit/:ProductID" element={<EditProduct />} />

        <Route path="/faculty" element={<Faculty/>} />
        <Route path="/faculty/:FacultyId" element={<DetailFaculty/>} />
        <Route path="/AddFaculty/add" element={<AddFaculty/>} /> 
        <Route path="/edit/:FacultyId" element={<EditFaculty/>} />
       
        <Route path="/student" element={<Student/>} />
        <Route path="/student/:StudentID" element={<DetailStudent/>} />
        <Route path="/AddStudent/add" element={<AddStudent/>} />
        <Route path="/edit/:StudentID" element={<EditStudent />} />

        </Route>
    </Routes>
  </BrowserRouter>
);
