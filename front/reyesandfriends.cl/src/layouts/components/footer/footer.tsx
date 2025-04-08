import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer className="bg-black text-white py-8">
            <div className="container mx-auto px-4">
                <div className="flex flex-wrap justify-between">
                    <div className="w-full md:w-1/3 mb-6 md:mb-0">
                        <h2 className="text-lg font-bold text-white mb-4">Reyes&Friends</h2>
                        <p className="text-sm">
                            Bringing you the best content since 1995. Inspired by the classics, built for the future.
                        </p>
                    </div>
                    <div className="w-full md:w-1/3 mb-6 md:mb-0">
                        <h3 className="text-md font-semibold text-white mb-4">Quick Links</h3>
                        <ul className="text-sm space-y-2">
                            <li><a href="#" className="hover:underline">Home</a></li>
                            <li><a href="#" className="hover:underline">About Us</a></li>
                            <li><a href="#" className="hover:underline">Services</a></li>
                            <li><a href="#" className="hover:underline">Contact</a></li>
                        </ul>
                    </div>
                    <div className="w-full md:w-1/3">
                        <h3 className="text-md font-semibold text-white mb-4">Follow Us</h3>
                        <ul className="text-sm space-y-2">
                            <li><a href="#" className="hover:underline">Twitter</a></li>
                            <li><a href="#" className="hover:underline">Facebook</a></li>
                            <li><a href="#" className="hover:underline">LinkedIn</a></li>
                            <li><a href="#" className="hover:underline">Instagram</a></li>
                        </ul>
                    </div>
                </div>
                <div className="border-t border-gray-700 mt-8 pt-4 text-center text-sm">
                    <p>&copy; 2023 Reyes and Friends. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;