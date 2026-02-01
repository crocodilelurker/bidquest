import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="min-h-screen bg-black text-white flex flex-col justify-center items-center font-['JBMM'] p-4">
            <div className="max-w-2xl text-center space-y-8 animate-fade-in">
                <div className="space-y-2">
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tighter bg-linear-to-b from-white to-zinc-500 bg-clip-text text-transparent">
                        BIDQUEST
                    </h1>
                    <p className="text-zinc-500 text-lg uppercase tracking-widest">
                        The Exclusive Marketplace
                    </p>
                </div>

                <p className="text-zinc-400 text-xl font-light leading-relaxed max-w-lg mx-auto">
                    Discover rare items. Place your bid. Win the extraordinary.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
                    <Link to="/login" className="px-8 py-3 bg-white text-black font-bold rounded-lg hover:bg-zinc-200 transition-colors duration-300 w-full sm:w-auto text-center">
                        Login
                    </Link>
                    <Link to="/signup" className="px-8 py-3 border border-zinc-700 text-white font-bold rounded-lg hover:border-white transition-colors duration-300 w-full sm:w-auto text-center">
                        Register
                    </Link>
                </div>

                <div className="mt-12 pt-12 border-t border-zinc-900 w-full">
                    <p className="text-zinc-600 text-sm">
                        Guest Access? <Link to="/items" className="text-white hover:underline underline-offset-4">Browse Items</Link>
                    </p>
                </div>
            </div>

            <style>{`
                @keyframes fade-in {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in {
                    animation: fade-in 1s ease-out forwards;
                }
            `}</style>
        </div>
    );
};

export default Home;
