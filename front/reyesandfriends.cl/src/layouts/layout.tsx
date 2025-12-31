import React from 'react';
import Navbar from './components/navbar/navbar';
import Footer from './components/footer/footer';

import FloatingSocialBar from './components/floating-social-bar/floating-social-bar';
import JohnSmithAssistance from './components/john-smith-assistance/john-smith-assistance';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-100 to-gray-300">
            <Navbar />
            <main className="flex-1 bg-zinc-900">
                <JohnSmithAssistance />
                <FloatingSocialBar />
                {children}
            </main>
            <Footer />
        </div>
    );
};

export default Layout;