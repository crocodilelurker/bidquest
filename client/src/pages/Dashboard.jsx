import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Dashboard = () => {
    const { user, logout } = useContext(AuthContext);
    const [ownedItems, setOwnedItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOwnedItems = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/item/owned', { withCredentials: true });
                if (response.data.status === 'success' || response.data.status === 'success' || Array.isArray(response.data.data)) {
                    setOwnedItems(response.data.data || []);
                }
            } catch (error) {
                console.error("Failed to fetch owned items", error);
            } finally {
                setLoading(false);
            }
        };

        if (user) {
            fetchOwnedItems();
        }
    }, [user]);

    return (
        <div className="min-h-screen bg-black text-white font-['JBMM'] p-8">
            <nav className="flex justify-between items-center mb-16 border-b border-zinc-900 pb-6">
                <div className="text-2xl font-bold tracking-tighter hover:text-green-500 transition-colors cursor-default">
                    BIDQUEST<span className="text-zinc-600">/DASH</span>
                </div>
                <div className="flex items-center gap-6">
                    <Link to="/" className="text-zinc-500 hover:text-green-400 transition-colors text-sm uppercase tracking-wider">
                        Home
                    </Link>
                    <button
                        onClick={logout}
                        className="text-zinc-500 hover:text-red-400 transition-colors text-sm uppercase tracking-wider bg-zinc-900 px-4 py-2 rounded border border-zinc-800 hover:border-red-900"
                    >
                        Logout
                    </button>
                </div>
            </nav>

            <div className="max-w-6xl mx-auto">
                <header className="mb-10 md:mb-16 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                    <div>
                        <h1 className="text-2xl md:text-4xl font-light text-zinc-500 mb-2">Welcome back,</h1>
                        <h2 className="text-5xl md:text-7xl font-bold tracking-tighter bg-linear-to-r from-white to-green-800 bg-clip-text text-transparent break-all">
                            {user?.name || 'User'}
                        </h2>
                    </div>
                    <div className="flex flex-col items-end">
                        <div className="inline-flex items-center px-4 py-2 bg-zinc-900/50 border border-zinc-800 rounded-full text-xs text-green-400 uppercase tracking-widest shadow-lg shadow-green-900/10">
                            <span className="w-2 h-2 bg-green-500 rounded-full mr-3 animate-pulse"></span>
                            System Online
                        </div>
                    </div>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                    <div className="bg-zinc-900/20 border border-zinc-800 p-8 rounded-2xl hover:border-green-900/50 transition-colors group cursor-pointer h-full relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/5 blur-[80px] rounded-full pointer-events-none group-hover:bg-green-500/10 transition-colors"></div>
                        <Link to="/items" className="relative z-10 h-full flex flex-col justify-between">
                            <div>
                                <h3 className="text-2xl font-bold mb-2 group-hover:text-green-400 transition-colors">Browse Market &rarr;</h3>
                                <p className="text-zinc-500">Discover new assets globally.</p>
                            </div>
                            <div className="mt-8 opacity-0 group-hover:opacity-100 transition-opacity text-green-500 text-sm uppercase tracking-wider font-bold">
                                Enter Market
                            </div>
                        </Link>
                    </div>
                    <div className="bg-zinc-900/20 border border-zinc-800 p-8 rounded-2xl hover:border-zinc-700 transition-colors h-full flex flex-col justify-between">
                        <div>
                            <h3 className="text-2xl font-bold mb-2 text-zinc-600">Analytics</h3>
                            <p className="text-zinc-600">Performance metrics.</p>
                        </div>
                        <div className="mt-8 text-zinc-700 text-xs uppercase tracking-widest border border-zinc-800 inline-block px-3 py-1 rounded w-fit">
                            Coming Soon
                        </div>
                    </div>
                    <div className="bg-zinc-900/20 border border-zinc-800 p-8 rounded-2xl hover:border-zinc-700 transition-colors h-full flex flex-col justify-between">
                        <div>
                            <h3 className="text-2xl font-bold mb-2 text-zinc-600">Settings</h3>
                            <p className="text-zinc-600">Profile configuration.</p>
                        </div>
                        <div className="mt-8 text-zinc-700 text-xs uppercase tracking-widest border border-zinc-800 inline-block px-3 py-1 rounded w-fit">
                            Coming Soon
                        </div>
                    </div>
                </div>

                <section>
                    <div className="flex items-center gap-4 mb-8">
                        <h3 className="text-2xl font-bold text-white">Your Assets</h3>
                        <div className="h-px bg-zinc-900 grow"></div>
                        <span className="text-zinc-500 text-sm font-mono">{ownedItems.length} ITEMS</span>
                    </div>

                    {loading ? (
                        <div className="text-zinc-600 font-mono text-sm animate-pulse">Scanning database...</div>
                    ) : ownedItems.length === 0 ? (
                        <div className="bg-zinc-900/10 border border-zinc-800 border-dashed rounded-xl p-12 text-center">
                            <p className="text-zinc-500 mb-4">No assets found in your portfolio.</p>
                            <Link to="/items" className="text-green-500 hover:text-green-400 font-bold hover:underline">
                                Acquire First Item
                            </Link>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {ownedItems.map(item => (
                                <Link to={`/items/${item.id}`} key={item.id} className="block bg-black border border-zinc-800 rounded-lg overflow-hidden hover:border-green-900/50 transition-all duration-300 group cursor-pointer">
                                    <div className="aspect-square overflow-hidden relative">
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500 grayscale group-hover:grayscale-0"
                                        />
                                        <div className="absolute top-2 right-2 bg-black/90 px-2 py-0.5 rounded text-[10px] items-center font-bold uppercase tracking-wider text-green-500 border border-green-900/30">
                                            OWNED
                                        </div>
                                    </div>
                                    <div className="p-4 border-t border-zinc-900">
                                        <h4 className="font-bold text-white truncate group-hover:text-green-400 transition-colors">{item.name}</h4>
                                        <div className="flex justify-between items-center mt-2">
                                            <span className="text-xs text-zinc-500">{item.category}</span>
                                            <span className="text-sm font-mono text-zinc-300">${item.price.toLocaleString()}</span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </section>
            </div>
        </div>
    );
};

export default Dashboard;
