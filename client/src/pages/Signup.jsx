import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import Loader from '../components/Loader';

const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const { refreshAuth } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);
        try {
            const response = await axios.post('http://localhost:3000/api/auth/register',
                { name, email, password },
                { withCredentials: true }
            );

            if (response.data.status === 'success') {
                await refreshAuth();
                navigate('/dashboard');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-black text-white flex justify-center items-center font-['JBMM'] p-4">
            <div className="w-full max-w-md animate-fade-in">
                <Link to="/" className="text-zinc-500 hover:text-white transition-colors text-sm mb-8 block">&larr; Back to Home</Link>

                <h1 className="text-4xl font-bold mb-2">Create Account</h1>
                <p className="text-zinc-500 mb-8">Join the exclusive marketplace.</p>

                {error && <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded">{error}</div>}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-zinc-400 text-sm uppercase tracking-wider mb-2">Full Name</label>
                        <input
                            type="text"
                            className="w-full bg-zinc-900/50 border border-zinc-800 focus:border-white text-white px-4 py-3 rounded-lg outline-none transition-colors"
                            placeholder="John Doe"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-zinc-400 text-sm uppercase tracking-wider mb-2">Email</label>
                        <input
                            type="email"
                            className="w-full bg-zinc-900/50 border border-zinc-800 focus:border-white text-white px-4 py-3 rounded-lg outline-none transition-colors"
                            placeholder="name@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-zinc-400 text-sm uppercase tracking-wider mb-2">Password</label>
                        <input
                            type="password"
                            className="w-full bg-zinc-900/50 border border-zinc-800 focus:border-white text-white px-4 py-3 rounded-lg outline-none transition-colors"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-white text-black font-bold py-3 rounded-lg hover:bg-zinc-200 transition-colors cursor-pointer flex justify-center items-center h-[52px]"
                    >
                        {loading ? <Loader size="24px" color="#000" /> : "Sign Up"}
                    </button>
                </form>

                <p className="mt-8 text-center text-zinc-500 text-sm">
                    Already have an account? <Link to="/login" className="text-white hover:underline">Sign In</Link>
                </p>
            </div>
            <style>{`
                @keyframes fade-in {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in {
                    animation: fade-in 0.6s ease-out forwards;
                }
            `}</style>
        </div>
    );
};

export default Signup;
