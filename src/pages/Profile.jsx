import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getEmployeeById } from '../utils/localEmployees';
import { FaPhone, FaWhatsapp, FaEnvelope, FaUserPlus, FaLinkedin, FaShareAlt, FaBolt, FaUser } from 'react-icons/fa';
import { saveAs } from 'file-saver';
import { motion } from 'framer-motion';
import { Button, Spinner, Badge } from '../components/ui';

const Profile = () => {
    const { id } = useParams();
    const [employee, setEmployee] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchEmployee();
    }, [id]);

    const fetchEmployee = () => {
        try {
            // Get employee from localStorage
            const data = getEmployeeById(id);
            setEmployee(data);
        } catch (error) {
            console.error('Error fetching employee:', error?.message || error);
        } finally {
            setLoading(false);
        }
    };

    const generateVCard = () => {
        if (!employee) return;

        const vCardData = `BEGIN:VCARD
VERSION:3.0
FN:${employee.name}
ORG:Electric Filament
TITLE:${employee.position}
TEL;TYPE=CELL:${employee.phone}
EMAIL:${employee.email}
URL:${employee.linkedin_link || ''}
NOTE:${employee.bio || ''}
END:VCARD`;

        const blob = new Blob([vCardData], { type: 'text/vcard;charset=utf-8' });
        saveAs(blob, `${employee.name.replace(/\s+/g, '_')}.vcf`);
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-900">
                <Spinner size="xl" className="text-gold-500" />
            </div>
        );
    }

    if (!employee) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 p-4 text-white">
                <div className="text-center space-y-4">
                    <h2 className="text-2xl font-bold">Profile Not Found</h2>
                    <p className="text-gray-400">The digital business card you are looking for does not exist.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-900 flex justify-center items-center p-4 font-sans relative overflow-hidden">
            {/* Ambient Background */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-[-20%] right-[-20%] w-[80%] h-[80%] bg-gold-600/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-20%] left-[-20%] w-[80%] h-[80%] bg-purple-900/20 rounded-full blur-[120px]" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="w-full max-w-md relative z-10"
            >
                {/* Main Card with Design System */}
                <div className="glass-dark rounded-[2rem] overflow-hidden shadow-2xl border border-white/10 relative">
                    {/* Header Image / Pattern */}
                    <div className="h-48 bg-gradient-to-br from-gray-900 via-gray-800 to-black relative overflow-hidden">
                        <div className="absolute inset-0 opacity-30 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
                        <div className="absolute inset-0 bg-gradient-to-t from-gray-800/90 to-transparent"></div>

                        {/* Decorative Circles */}
                        <div className="absolute top-4 right-4 flex gap-2">
                            <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                            <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                        </div>

                        {/* Brand Icon */}
                        <div className="absolute top-4 left-4">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center text-white shadow-gold-sm">
                                <FaBolt className="text-lg" />
                            </div>
                        </div>
                    </div>

                    {/* Profile Content */}
                    <div className="px-8 pb-8 -mt-24 relative">
                        <div className="flex flex-col items-center">
                            {/* Avatar with Gold Ring */}
                            <motion.div
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ delay: 0.3 }}
                                className="p-1.5 rounded-full bg-gradient-to-br from-gold-300 via-gold-500 to-gold-700 shadow-gold-lg"
                            >
                                <div className="p-1 bg-gray-900 rounded-full">
                                    {employee.image_url ? (
                                        <img
                                            src={employee.image_url}
                                            alt={employee.name}
                                            className="w-32 h-32 rounded-full object-cover border-2 border-gray-800"
                                        />
                                    ) : (
                                        <div className="w-32 h-32 rounded-full border-2 border-gray-800 bg-gray-800 flex items-center justify-center text-gray-400">
                                            <FaUser className="text-5xl" />
                                        </div>
                                    )}
                                </div>
                            </motion.div>

                            {/* Name & Title */}
                            <div className="text-center mt-6 space-y-2">
                                <h1 className="text-3xl font-bold text-white tracking-tight">{employee.name}</h1>
                                <Badge variant="warning" className="bg-gold-500/20 text-gold-300 border-gold-500/30 px-4 py-1">
                                    {employee.position}
                                </Badge>
                            </div>

                            {/* Bio */}
                            {employee.bio && (
                                <p className="text-gray-400 text-sm text-center mt-6 leading-relaxed max-w-xs mx-auto">
                                    {employee.bio}
                                </p>
                            )}

                            {/* Action Buttons */}
                            <div className="flex gap-4 mt-8 justify-center mx-auto">
                                {[
                                    { icon: FaPhone, href: `tel:${employee.phone}`, label: 'Call', color: 'blue' },
                                    { icon: FaEnvelope, href: `mailto:${employee.email}`, label: 'Email', color: 'purple' },
                                    { icon: FaWhatsapp, href: employee.whatsapp_link || `https://wa.me/${employee.phone?.replace(/\D/g, '')}`, label: 'Chat', color: 'green' },
                                    { icon: FaLinkedin, href: employee.linkedin_link, label: 'Connect', color: 'blue', disabled: !employee.linkedin_link }
                                ].map((item, index) => (
                                    !item.disabled && (
                                        <motion.a
                                            key={index}
                                            href={item.href}
                                            target={item.label === 'Call' || item.label === 'Email' ? '_self' : '_blank'}
                                            rel="noopener noreferrer"
                                            whileHover={{ y: -5 }}
                                            whileTap={{ scale: 0.95 }}
                                            className="w-20 h-14 flex flex-col items-center justify-center px-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-gold-500/30 transition-all duration-300 group"
                                        >
                                            <item.icon className="text-xl text-gray-300 group-hover:text-gold-400 transition-colors mb-1" />
                                            <span className="text-[10px] font-medium text-gray-500 group-hover:text-white uppercase tracking-wider transition-colors text-center">{item.label}</span>
                                        </motion.a>
                                    )
                                ))}
                            </div>

                            {/* Save Contact Button - Using Design System Button */}
                            <Button
                                onClick={generateVCard}
                                variant="primary"
                                size="lg"
                                fullWidth
                                icon={<FaUserPlus />}
                                className="mt-8 h-14 text-base font-bold shadow-gold-lg hover:shadow-gold-xl"
                            >
                                Save to Contacts
                            </Button>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="bg-black/20 py-4 text-center border-t border-white/5 backdrop-blur-sm">
                        <div className="flex items-center justify-center gap-2 opacity-50 hover:opacity-100 transition-opacity">
                            <FaShareAlt className="text-gold-500 text-xs" />
                            <p className="text-[10px] text-gray-400 font-medium uppercase tracking-[0.2em]">
                                Electric Filament
                            </p>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Profile;
