import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "../layouts/layout";
import Home from "../pages/home";

const AppRouter: React.FC = () => {
    return (
        <Router>
            <Layout>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/services/web-development" element={<div>Programación web</div>} />
                    <Route path="/services/bussiness-software" element={<div>Software empresarial</div>} />
                    <Route path="/services/promotional-web" element={<div>Páginas web promocionales</div>} />
                    <Route path="/services/ecommerce-web" element={<div>Páginas E-Commerce</div>} />
                    <Route path="/services" element={<div>Lista completa</div>} />
                    <Route path="/contact" element={<div>Contacto</div>} />
                </Routes>
            </Layout>
        </Router>
    );
};

export default AppRouter;
