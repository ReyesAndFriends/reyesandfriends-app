import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Layout from "../layouts/layout";

// Pages

import Home from "../pages/home/home";
import Portfolio from "../pages/portfolio";
import Contact from "../pages/contact/contact";
import Services from "../pages/services/services";
import AboutUs from "../pages/about-us/aboutUs";
import QuotePage from "../pages/quote-project/quoteProject";

// Services pages
import WebProgramming from "../pages/services/WebProgramming/WebProgramming";

import WebPlanes from "../pages/web-planes/web-planes";

// Error handler
import Error from "../pages/error/Error";

const pageTransition = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.3 },
};

const AnimatedRoutes: React.FC = () => {
    const location = useLocation();

    const handleExitComplete = () => {
        window.scrollTo(0, 0);
    };

    return (
        <AnimatePresence mode="wait" onExitComplete={handleExitComplete}>
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<motion.div {...pageTransition}><Home /></motion.div>} />
                <Route path="/services/web-development" element={<motion.div {...pageTransition}><WebProgramming/></motion.div>} />
                <Route path="/services" element={<motion.div {...pageTransition}><Services /></motion.div>} />
                <Route path="/about" element={<motion.div {...pageTransition}><AboutUs /></motion.div>} />
                <Route path="/portfolio" element={<motion.div {...pageTransition}><Portfolio /></motion.div>} />
                <Route path="/contact" element={<motion.div {...pageTransition}><Contact /></motion.div>} />
                <Route path="/quote-project" element={<motion.div {...pageTransition}><QuotePage /></motion.div>} />
                <Route path="/web-planes" element={<motion.div {...pageTransition}><WebPlanes /></motion.div>} />
                <Route path="*" element={<motion.div {...pageTransition}><Error /></motion.div>} />
            </Routes>
        </AnimatePresence>
    );
};

const AppRouter: React.FC = () => {
    return (
        <Router>
            <Layout>
                <AnimatedRoutes />
            </Layout>
        </Router>
    );
};

export default AppRouter;
