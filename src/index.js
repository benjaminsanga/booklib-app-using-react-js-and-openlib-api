import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  BrowserRouter, Routes, Route
} from 'react-router-dom';
import { AppProvider } from './context.';
import './index.css';
import Home from './pages/Home/Home';
import About from "./pages/About/About";
import BookList from "./components/BookList/BookList";
import BookDetails from "./components/BookDetails/BookDetails";
import Auth from './components/Auth/Auth';
import { AuthProvider } from './context/auth';
import { Toaster } from 'react-hot-toast';
import BorrowBookForm from './components/BorrowBook/BorrowBookForm';
import Other from './pages/Other/Other';
import BorrowersTable from './components/BorrowBook/BorrowersTable';
import ViewPaperList from './components/Upload/ViewPaperList';
import PaperUpload from './components/Upload/PaperUpload';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AppProvider>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path = "/" element = {<Home />}>
            <Route path = "about" element = {<About />} />
            <Route path = "book" element = {<BookList />} />
            <Route path = "/book/:id" element = {<BookDetails />} />
          </Route>
          <Route path = "/" element = {<Other />}>
            <Route path = "/borrow" element = {<BorrowBookForm />} />
            <Route path = "/borrowers" element = {<BorrowersTable />} />
            <Route path = "/upload" element = {<PaperUpload />} />
            <Route path = "/upload-papers-list" element = {<ViewPaperList />} />
          </Route>
          <Route path = "auth" element = {<Auth />} />
        </Routes>
        <Toaster/>
      </BrowserRouter>
    </AuthProvider>
  </AppProvider>
);

