import React from "react";

const Home: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-4xl font-bold text-gray-800">Welcome to Home Page</h1>
            <p className="mt-4 text-lg text-gray-600">
                This is a basic React page styled with Tailwind CSS.
            </p>
        </div>
    );
};

export default Home;