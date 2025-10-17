import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AnimatePresence } from "framer-motion";

import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Home from "./routes/Home";
import Patients from "./routes/Patients";
import About from "./routes/About";
import Error404 from "./routes/Error404";


function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gray-50 text-gray-800 font-inter">
        
        <Header />

        
        <main className="flex-1 w-full  mx-auto ">
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/patients" element={<Patients />} />
              <Route path="/about" element={<About />} />
              
              <Route path="*" element={<Error404 />} />
            </Routes>
          </AnimatePresence>
        </main>

        
        <Footer />

        
        <ToastContainer
          position="top-right"
          autoClose={3500}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </div>
    </Router>
  );
}

export default App;
