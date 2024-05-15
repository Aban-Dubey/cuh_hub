import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import background from '../assets/split-background.jpeg'; // Custom background image

function Split() {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const navigate = useNavigate();

    const handleProceed = () => {
        // Navigate to BlogHome
        navigate('/bloghome');
    };

    const redirectToHome = () => {
        // Redirect to Home
        navigate('/prodhome');
    };

    const openDialog = () => {
        setIsDialogOpen(true);
    };

    const closeDialog = () => {
        setIsDialogOpen(false);
    };

    return (
        <div className="flex flex-col min-h-screen bg-cover bg-center" style={{ backgroundImage: `url(${background})` }}>
            <div className="flex-grow"></div>
            <div className="w-full max-w-lg mx-auto bg-white bg-opacity-90 rounded-xl shadow-2xl p-10">
                {/* Content for the center-aligned box */}
                <div className="text-center mb-10">
                    <p className="text-xl text-gray-700">Choose an option to continue</p>
                </div>
                <div className="flex flex-col space-y-6">
                    <button onClick={handleProceed} className="w-full bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold text-xl hover:bg-blue-800 transition duration-300 ease-in-out">Continue to Blog</button>
                    <button onClick={redirectToHome} className="w-full bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold text-xl hover:bg-blue-800 transition duration-300 ease-in-out">Continue to Product</button>
                </div>
                <div className="mt-8 text-sm text-gray-600 text-center">
                    By continuing, you agree to our <button onClick={openDialog} className="text-blue-700 underline hover:text-blue-900">Terms of Service</button> and <button onClick={openDialog} className="text-blue-700 underline hover:text-blue-900">Privacy Policy</button>.
                </div>
            </div>
            <div className="flex-grow"></div>

            {/* Dialog box */}
            {isDialogOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg p-8">
                        <p>Tu Jaa Reee..</p>
                        <button onClick={closeDialog} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">Close</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Split;
