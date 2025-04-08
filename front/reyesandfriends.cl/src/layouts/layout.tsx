import React from 'react';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <div className="flex flex-col min-h-screen">
            <header className="bg-gray-200 p-4">
                <h1 className="text-xl font-bold">Reyes&Friends</h1>
            </header>
            <main className="flex-1 p-4">
                {children}
            </main>
            <footer className="bg-gray-200 p-4 text-center">
                <p>&copy; {new Date().getFullYear()} Reyes and Friends. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default Layout;