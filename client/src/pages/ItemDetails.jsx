import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import Loader from '../components/Loader';

const ItemDetails = () => {
    const { id } = useParams();
    const [item, setItem] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchItem = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/item/${id}`, { withCredentials: true });
                if (response.data.status === 'success') {
                    setItem(response.data.data);
                } else {
                    setError(response.data.message || 'Item not found');
                }
            } catch (err) {
                console.error("Error fetching item:", err);
                setError('Error connecting to server');
            } finally {
                setLoading(false);
            }
        };

        fetchItem();
    }, [id]);

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
            <Link to="/items" className="text-white underline hover:text-zinc-300">
                Back to Market
            </Link>
        </div>
    );

    if (!item) return <div className="min-h-screen bg-black text-white flex justify-center items-center">Item not found</div>;

    return (
        <div className="min-h-screen bg-black text-white p-8 font-['JBMM'] flex justify-center items-center">
            <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 gap-16">

                <div className="relative group">
                    <div className="absolute inset-0 bg-green-500/10 blur-2xl rounded-2xl opacity-50 group-hover:opacity-80 transition-opacity duration-500"></div>
                    <img
                        src={item.image}
                        alt={item.name}
                        className="relative w-full h-[600px] object-cover rounded-xl border border-zinc-800 shadow-2xl z-10 grayscale group-hover:grayscale-0 transition-all duration-700"
                    />
                    <div className="absolute top-6 left-6 z-20">
                        <Link to="/items" className="bg-black/80 backdrop-blur-md border border-zinc-800 text-white px-4 py-2 rounded-full text-sm font-bold hover:bg-zinc-900 transition-colors flex items-center gap-2">
                            &larr; Back
                        </Link>
                    </div>
                </div>

                <div className="flex flex-col justify-center space-y-8">
                    <div>
                        <div className="flex items-center space-x-4 mb-6">
                            <span className="px-3 py-1 bg-zinc-900 border border-zinc-800 text-white rounded-full text-xs font-bold uppercase tracking-widest">
                                {item.category}
                            </span>
                            <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest border ${item.status === 'ACTIVE' ? 'bg-green-900/20 text-green-500 border-green-500/30' : 'bg-red-900/20 text-red-500 border-red-500/30'}`}>
                                {item.status}
                            </span>
                        </div>

                        <h1 className="text-6xl font-bold bg-linear-to-r from-white to-zinc-500 bg-clip-text text-transparent mb-6 tracking-tighter leading-tight">
                            {item.name}
                        </h1>

                        <p className="text-zinc-400 text-lg leading-relaxed font-light border-l-2 border-green-900/50 pl-6">
                            {item.description}
                        </p>
                    </div>

                    <div className="bg-zinc-900/20 border border-zinc-800 rounded-2xl p-8">
                        <div className="flex justify-between items-end mb-8">
                            <div>
                                <p className="text-zinc-500 uppercase text-xs tracking-widest mb-2 font-bold">Current Valuation</p>
                                <p className="text-5xl font-bold text-white tracking-tight">${item.price.toLocaleString()}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-zinc-500 uppercase text-xs tracking-widest mb-2 font-bold">Seller ID</p>
                                <p className="text-xl font-mono text-zinc-300">#{item.userId}</p>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <button className="flex-1 bg-white text-black font-bold py-4 rounded-lg hover:bg-zinc-200 transition-all duration-300 transform hover:-translate-y-1 cursor-pointer">
                                Place Bid
                            </button>
                            <button className="px-6 py-4 border border-zinc-700 rounded-lg hover:border-white transition-colors cursor-pointer">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ItemDetails;