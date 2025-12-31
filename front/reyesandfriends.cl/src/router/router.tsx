import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Layout from "../layouts/layout";

// Pages

import Home from "../pages/home/home";
import Portfolio from "../pages/portfolio";
import Contact from "../pages/contact/contact";
import Services from "../pages/services/services";
import AboutUs from "../pages/about-us/about-us";
import QuotePage from "../pages/quote-project/quote-project";
import SocialMedia from "../pages/social-media/social-media";

// Services pages
import WebProgramming from "../pages/services/WebProgramming/web-programming";
import EnterpriseSoftware from "../pages/services/EnterpriseSoftware/enterprise-software";
import MobileApps from "../pages/services/MobileApps/mobile-apps";
import ECommerce from "../pages/services/E-commerce/e-commerce";
import Entertainment from "../pages/services/Entertainment/entertainment";
import MinecraftHosting from "../pages/services/MinecraftHosting/minecraft-hosting";

import WebPlanes from "../pages/web-planes/web-planes";
import WebPlanesOrder from "../pages/web-planes-order/web-planes-order";

// Error handler
import Error from "../pages/error/error";

// Register visitors
import { useRegisterVisitors } from "../hooks/registerVisitors/useRegisterVisitors";

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
                <Route path="/services" element={<motion.div {...pageTransition}><Services /></motion.div>} />
                <Route path="/services/web-development" element={<motion.div {...pageTransition}><WebProgramming/></motion.div>} />
                <Route path="/services/enterprise-software" element={<motion.div {...pageTransition}><EnterpriseSoftware/></motion.div>} />
                <Route path="/services/mobile-apps" element={<motion.div {...pageTransition}><MobileApps/></motion.div>} />
                <Route path="/services/e-commerce" element={<motion.div {...pageTransition}><ECommerce/></motion.div>} />
                <Route path="/services/entertainment" element={<motion.div {...pageTransition}><Entertainment/></motion.div>} />
                <Route path="/services/minecraft-hosting" element={<motion.div {...pageTransition}><MinecraftHosting/></motion.div>} />
                <Route path="/about" element={<motion.div {...pageTransition}><AboutUs /></motion.div>} />
                <Route path="/portfolio" element={<motion.div {...pageTransition}><Portfolio /></motion.div>} />
                <Route path="/contact" element={<motion.div {...pageTransition}><Contact /></motion.div>} />
                <Route path="/quote-project" element={<motion.div {...pageTransition}><QuotePage /></motion.div>} />
                <Route path="/web-planes" element={<motion.div {...pageTransition}><WebPlanes /></motion.div>} />
                <Route path="/web-planes/:slug/order" element={<motion.div {...pageTransition}><WebPlanesOrder /></motion.div>} />
                <Route path="/social-media" element={<motion.div {...pageTransition}><SocialMedia /></motion.div>} />
                <Route path="*" element={<motion.div {...pageTransition}><Error /></motion.div>} />
            </Routes>
        </AnimatePresence>
    );
};

const AppRouter: React.FC = () => {
    useRegisterVisitors();
    
    return (
        <Router>
            <Layout>
                <AnimatedRoutes />
            </Layout>
        </Router>
    );
};

export default AppRouter;
