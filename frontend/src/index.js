import React from "react";
import ReactDOM from "react-dom/client"

import "./i18n";

import Header from './layout/Header'
import Footer from './layout/Footer'

import Users from './Users';

export default function App() {
    return ( 
        <div className="App">
            <Header />
            <Users />

            <Footer />
        </div>
    )
}

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(<App />)
