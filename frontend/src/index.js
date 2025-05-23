import React from "react";
import "./App.css";
import ReactDOM from "react-dom/client";

import "./i18n";


import Header from './layout/Header'
import LocationDateForm from './components/LocationDateForm'
import Footer from './layout/Footer'


export default function App() {

    return ( 
        <div className="App">
            <Header />
             <div className="min-h-screen bg-gray-50 p-8">
                <LocationDateForm />
            </div>
            <Footer />
        </div>
    )
}

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(<App />)
