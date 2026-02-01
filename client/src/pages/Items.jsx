import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Loader from '../components/Loader';

const Items = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchItems = async () => {
            try {
                // Determine if we need to pass cookies (for auth context in header/nav later)
                // but strictly for fetching items, it might be public. 
                // Using withCredentials true is safe if we want to support future personalized views
                const response = await axios.get('http://localhost:3000/api/item/all', { withCredentials: true });
                if (response.data.status === 'success') {
                    setItems(response.data.data);
                } else {
                    setError(response.data.message || 'Failed to fetch items');
                }
            } catch (err) {
                console.error("Error fetching items:", err);
                setError('Error connecting to server');
            } finally {
                setLoading(false);
            }
        };

        fetchItems();
    }, []);

    if (loading) return (
        <div className="min-h-screen bg-black flex justify-center items-center">
            <Loader />
        </div>
    );

    if (error) return (
        <div className="min-h-screen bg-black text-white flex flex-col justify-center items-center font-['JBMM']">
            <div className="text-red-400 mb-4 bg-red-500/10 px-6 py-4 rounded-lg border border-red-500/20">
                {error}
            </div>
            <button
                onClick={() => window.location.reload()}
                className="text-white underline hover:text-zinc-300"
            >
                Try Again
            </button>
        </div>
    );

    return (
        <div className="min-h-screen bg-black text-white p-8 font-['JBMM']">
            <nav className="flex justify-between items-center mb-16 border-b border-zinc-900 pb-6">
                <Link to="/" className="text-2xl font-bold tracking-tighter hover:text-zinc-300 transition-colors">
                    BIDQUEST<span className="text-zinc-600">/MARKET</span>
                </Link>
                <div className="space-x-4">
                    {/* Placeholder navigation items - in a real app these would be conditional based on auth */}
                    <Link to="/dashboard" className="text-zinc-500 hover:text-white transition-colors text-sm uppercase tracking-wider">
                        Dashboard
                    </Link>
                </div>
            </nav>

            <header className="mb-12 text-center">
                <h1 className="text-6xl font-bold mb-4 bg-linear-to-r from-white to-zinc-500 bg-clip-text text-transparent tracking-tighter">
                    Active Listings
                </h1>
                <p className="text-zinc-500 text-lg">
                    Bid on exclusive items available now.
                </p>
            </header>

            {items.length === 0 ? (
                <div className="text-center text-zinc-500 py-20 border border-zinc-800 border-dashed rounded-xl bg-zinc-900/10">
                    No items available at the moment.
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {items.map((item) => (
                        <div key={item.id} className="bg-zinc-900/30 border border-zinc-800 rounded-xl overflow-hidden hover:border-zinc-600 transition-all duration-300 group">
                            <div className="h-64 overflow-hidden relative border-b border-zinc-800">
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                                />
                                <div className="absolute top-3 right-3 bg-black/80 backdrop-blur-sm px-3 py-1 rounded text-xs font-semibold uppercase tracking-wider text-white border border-zinc-700">
                                    {item.category}
                                </div>
                            </div>

                            <div className="p-6">
                                <h2 className="text-xl font-bold mb-2 truncate text-white group-hover:text-zinc-300 transition-colors">
                                    {item.name}
                                </h2>
                                <p className="text-gray-500 text-sm mb-6 line-clamp-2 h-10 leading-relaxed font-light">
                                    {item.description}
                                </p>

                                <div className="flex items-center justify-between pt-4 border-t border-zinc-800/50">
                                    <div className="flex flex-col">
                                        <span className="text-[10px] text-zinc-500 uppercase tracking-widest mb-1">Starting Bid</span>
                                        <span className="text-lg font-bold text-white">${item.price.toLocaleString()}</span>
                                    </div>

                                    <Link
                                        to={`/items/${item.id}`}
                                        className="bg-white text-black hover:bg-zinc-200 px-5 py-2 rounded-lg font-bold text-sm transition-colors cursor-pointer"
                                    >
                                        Place Bid
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Items;
