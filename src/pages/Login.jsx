import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card, Input, Button } from '../components/ui';
import { useToast } from '../hooks/useToast';
import { ToastContainer } from '../components/ui/Toast';
import { FaKey, FaBolt, FaArrowRight } from 'react-icons/fa';

const Login = () => {
    const [adminKey, setAdminKey] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { toasts, error, removeToast } = useToast();

    const handleLogin = (e) => {
        e.preventDefault();
        setLoading(true);

        // Simulate API call
        setTimeout(() => {
            setLoading(false);
            localStorage.setItem('isAuthenticated', 'true');
            navigate('/admin');
        }, 1500);
    };

    return (
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gray-900">
            {/* Ambient Background Effects */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-gold-500/20 rounded-full blur-[120px] animate-float" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-purple-900/40 rounded-full blur-[120px] animate-float" style={{ animationDelay: '-2s' }} />
                <div className="absolute top-[40%] left-[40%] w-[30%] h-[30%] bg-blue-900/20 rounded-full blur-[100px] animate-pulse" />
            </div>

            <div className="w-full max-w-md px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                >
                    <div className="text-center mb-8">
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.2, duration: 0.5 }}
                            className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-gold-400 to-gold-600 text-white shadow-gold-lg mb-6"
                        >
                            <FaBolt className="text-3xl" />
                        </motion.div>
                        <h1 className="text-4xl font-extrabold text-white tracking-tight mb-2">
                            Electric Filament
                        </h1>
                        <p className="text-gray-400 text-lg">
                            Enter the command center
                        </p>
                    </div>

                    <div className="glass-dark rounded-2xl p-8 shadow-2xl border border-white/10 backdrop-blur-xl">
                        <form onSubmit={handleLogin} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-300 ml-1">
                                    Access Key
                                </label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500 group-focus-within:text-gold-500 transition-colors">
                                        <FaKey />
                                    </div>
                                    <input
                                        type="password"
                                        value={adminKey}
                                        onChange={(e) => setAdminKey(e.target.value)}
                                        className="w-full pl-11 pr-4 py-3.5 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-gold-500/50 focus:border-gold-500 transition-all outline-none"
                                        placeholder="Enter your secure key"
                                        required
                                        autoFocus
                                    />
                                </div>
                            </div>

                            <Button
                                type="submit"
                                variant="primary"
                                size="lg"
                                fullWidth
                                loading={loading}
                                className="h-12 text-base font-semibold shadow-gold hover:shadow-gold-lg transition-all duration-300"
                            >
                                <span>Authenticate</span>
                                {!loading && <FaArrowRight className="ml-2" />}
                            </Button>
                        </form>
                    </div>

                    <p className="text-center text-sm text-gray-500 mt-8">
                        Protected System. Authorized Personnel Only.
                    </p>
                </motion.div>
            </div>

            <ToastContainer toasts={toasts} onClose={removeToast} />
        </div>
    );
};

export default Login;
