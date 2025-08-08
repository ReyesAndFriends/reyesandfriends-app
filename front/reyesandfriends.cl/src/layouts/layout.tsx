import React from 'react';
import Navbar from './components/navbar/navbar';
import Footer from './components/footer/footer';

import FloatingSocialBar from './components/FloatingSocialBar/FloatingSocialBar';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-100 to-gray-300">
            <Navbar />
            <main className="flex-1 bg-zinc-900">
                <FloatingSocialBar />
                {children}
            </main>
            <Footer />
        </div>
    );
};

export default Layout;