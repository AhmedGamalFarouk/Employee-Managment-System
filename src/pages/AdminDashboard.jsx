import { useState, useEffect } from 'react';
import { getEmployees } from '../utils/fakerApi';
import { addEmployee, updateEmployee, removeEmployee, initFromList, getAllEmployees } from '../utils/localEmployees';
import QRCode from 'react-qr-code';
import { FaPlus, FaSearch, FaSignOutAlt, FaUserPlus, FaUsers, FaIdCard, FaChartLine, FaUser, FaThLarge, FaList, FaEdit, FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Button,
    Input,
    Textarea,
    Card,
    Modal,
    Spinner,
    ToastContainer
} from '../components/ui';
import { useToast } from '../hooks/useToast';

const AdminDashboard = () => {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [viewMode, setViewMode] = useState('grid');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editing, setEditing] = useState(false);
    const [form, setForm] = useState({ name: '', position: '', email: '', phone: '', linkedin_link: '', bio: '' });

    const navigate = useNavigate();
    const { toasts, success, error, removeToast } = useToast();

    useEffect(() => {
        const init = async () => {
            setLoading(true);
            try {
                const stored = getAllEmployees();
                if (stored && stored.length > 0) {
                    setEmployees(stored);
                } else {
                    // Bootstrap from faker API once if no local data
                    const data = await getEmployees(20);
                    const list = data || [];
                    initFromList(list);
                    setEmployees(list);
                }
            } catch (err) {
                console.error('Error initializing employees:', err);
                error('Failed to load employees');
            } finally {
                setLoading(false);
            }
        };

        init();
    }, []);

    const handleLogout = () => {
        if (window.confirm('Are you sure you want to logout?')) {
            localStorage.removeItem('isAuthenticated');
            navigate('/login');
        }
    };

    const openAddModal = () => {
        setForm({ name: '', position: '', email: '', phone: '', linkedin_link: '', bio: '' });
        setEditing(false);
        setIsModalOpen(true);
    };

    const openEditModal = (emp) => {
        setForm({ ...emp });
        setEditing(true);
        setIsModalOpen(true);
    };

    const handleSave = () => {
        try {
            if (editing && form.id) {
                updateEmployee(form.id, form);
                setEmployees(getAllEmployees());
                success('Employee updated');
            } else {
                addEmployee(form);
                setEmployees(getAllEmployees());
                success('Employee added');
            }
            setIsModalOpen(false);
        } catch (err) {
            console.error('Save error', err);
            error('Failed to save employee');
        }
    };

    const handleDelete = (id) => {
        if (!window.confirm('Delete this employee?')) return;
        try {
            removeEmployee(id);
            setEmployees(getAllEmployees());
            success('Employee deleted');
        } catch (err) {
            console.error('Delete error', err);
            error('Failed to delete employee');
        }
    };

    const handleField = (field) => (e) => setForm((s) => ({ ...s, [field]: e.target.value }));

    const filteredEmployees = employees.filter((emp) => {
        const name = (emp?.name || '').toLowerCase();
        const position = (emp?.position || '').toLowerCase();
        const term = searchTerm.toLowerCase();
        return name.includes(term) || position.includes(term);
    });

    const stats = [
        { label: 'Total Employees', value: employees.length, icon: <FaUsers />, color: 'text-blue-500', bg: 'bg-blue-50' },
        { label: 'Active Cards', value: employees.length, icon: <FaIdCard />, color: 'text-green-500', bg: 'bg-green-50' },
        { label: 'Profile Views', value: '1.2k', icon: <FaChartLine />, color: 'text-purple-500', bg: 'bg-purple-50' },
    ];

    return (
        <div className="min-h-screen bg-gray-50/50">
            <header className="sticky top-0 z-30 glass border-b border-gray-200/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center text-white shadow-gold-sm">
                            <FaIdCard className="text-xl" />
                        </div>
                        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Dashboard</h1>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="flex gap-2 bg-gray-100 p-1 rounded-lg">
                            <Button
                                variant={viewMode === 'grid' ? 'primary' : 'ghost'}
                                size="sm"
                                icon={<FaThLarge />}
                                onClick={() => setViewMode('grid')}
                                className={viewMode === 'grid' ? 'shadow-sm' : 'text-gray-500 hover:text-gray-700'}
                            >
                                Grid
                            </Button>
                            <Button
                                variant={viewMode === 'table' ? 'primary' : 'ghost'}
                                size="sm"
                                icon={<FaList />}
                                onClick={() => setViewMode('table')}
                                className={viewMode === 'table' ? 'shadow-sm' : 'text-gray-500 hover:text-gray-700'}
                            >
                                Table
                            </Button>
                        </div>

                        <Button
                            variant="primary"
                            icon={<FaPlus />}
                            onClick={openAddModal}
                            className="shadow-gold hover:shadow-gold-lg transition-all"
                        >
                            Add Employee
                        </Button>

                        <Button
                            variant="ghost"
                            icon={<FaSignOutAlt />}
                            onClick={handleLogout}
                            className="text-gray-500 hover:text-red-600 hover:bg-red-50"
                        >
                            Logout
                        </Button>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center justify-between"
                        >
                            <div>
                                <p className="text-sm font-medium text-gray-500">{stat.label}</p>
                                <p className="text-3xl font-bold text-gray-900 mt-1">{stat.value}</p>
                            </div>
                            <div className={`w-12 h-12 rounded-xl ${stat.bg} ${stat.color} flex items-center justify-center text-xl`}>
                                {stat.icon}
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="flex justify-center">
                    <div className="w-full max-w-xl px-4">
                        <Input
                            placeholder="Search employees by name or position..."
                            icon={<FaSearch />}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-white shadow-sm border-gray-200 focus:border-gold-500 focus:ring-gold-500/20"
                        />
                    </div>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center py-20">
                        <Spinner size="xl" />
                    </div>
                ) : (
                    <AnimatePresence mode="wait">
                        {filteredEmployees.length === 0 ? (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-300"
                            >
                                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-50 mb-6 text-gray-400">
                                    <FaUserPlus className="text-3xl" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900">No employees found</h3>
                                <p className="text-gray-500 mt-2 mb-8 max-w-sm mx-auto">
                                    Your directory is empty. Add your first employee to generate their digital business card.
                                </p>
                                <Button onClick={openAddModal} size="lg">
                                    Add First Employee
                                </Button>
                            </motion.div>
                        ) : viewMode === 'grid' ? (
                            <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {filteredEmployees.map((emp, index) => (
                                    <motion.div
                                        key={emp.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                        layout
                                        onClick={() => navigate(`/profile/${emp.id}`)}
                                        className="cursor-pointer"
                                    >
                                        <Card variant="elevated" hover className="flex flex-col h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
                                            <Card.Body className="flex-grow p-6 relative overflow-hidden">
                                                <div className="absolute top-0 right-0 w-32 h-32 bg-gold-50 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110" />

                                                <div className="relative z-10 flex items-start gap-4">
                                                    <div className="relative">
                                                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center text-white shadow-md group-hover:shadow-lg transition-all">
                                                            <FaUser className="text-2xl" />
                                                        </div>
                                                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                                                    </div>
                                                    <div className="min-w-0 flex-1 pt-1">
                                                        <h3 className="font-bold text-lg text-gray-900 truncate group-hover:text-gold-600 transition-colors">{emp.name}</h3>
                                                        <p className="text-gray-500 text-sm font-medium truncate">{emp.position}</p>
                                                    </div>
                                                </div>

                                                <div className="mt-6 space-y-2 relative z-10">
                                                    <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 p-2 rounded-lg">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-gold-400"></span>
                                                        <span className="truncate">{emp.email}</span>
                                                    </div>
                                                    <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 p-2 rounded-lg">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-gold-400"></span>
                                                        <span className="truncate">{emp.phone}</span>
                                                    </div>
                                                </div>

                                                <div className="mt-6 flex justify-center">
                                                    <div className="bg-white p-3 rounded-xl shadow-sm border border-gray-100 group-hover:scale-105 transition-transform duration-300">
                                                        <QRCode value={`${window.location.origin}${window.location.pathname}#/profile/${emp.id}`} size={100} />
                                                    </div>
                                                </div>
                                            </Card.Body>

                                            <Card.Footer className="bg-gray-50/80 backdrop-blur-sm p-4 flex justify-between items-center border-t border-gray-100">
                                                <div className="flex gap-2">
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={(e) => { e.stopPropagation(); navigate(`/profile/${emp.id}`); }}
                                                        className="hover:bg-white hover:shadow-sm"
                                                    >
                                                        View
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={(e) => { e.stopPropagation(); openEditModal(emp); }}
                                                        className="hover:bg-white hover:shadow-sm"
                                                        icon={<FaEdit />}
                                                    >
                                                        Edit
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={(e) => { e.stopPropagation(); handleDelete(emp.id); }}
                                                        className="hover:bg-white hover:shadow-sm text-error"
                                                        icon={<FaTrash />}
                                                    />
                                                </div>
                                            </Card.Footer>
                                        </Card>
                                    </motion.div>
                                ))}
                            </motion.div>
                        ) : (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead>
                                            <tr className="bg-gray-50 border-b border-gray-200">
                                                <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Name</th>
                                                <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Position</th>
                                                <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Email</th>
                                                <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Phone</th>
                                                <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200">
                                            {filteredEmployees.map((emp) => (
                                                <tr key={emp.id} onClick={() => navigate(`/profile/${emp.id}`)} className="hover:bg-gray-50 transition-colors cursor-pointer">
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center gap-3">
                                                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center text-white">
                                                                <FaUser className="text-sm" />
                                                            </div>
                                                            <span className="font-medium text-gray-900">{emp.name}</span>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 text-gray-600 text-sm">{emp.position}</td>
                                                    <td className="px-6 py-4 text-gray-600 text-sm">{emp.email}</td>
                                                    <td className="px-6 py-4 text-gray-600 text-sm">{emp.phone}</td>
                                                    <td className="px-6 py-4 flex gap-2">
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            onClick={(e) => { e.stopPropagation(); navigate(`/profile/${emp.id}`); }}
                                                            className="hover:bg-white hover:shadow-sm"
                                                        >
                                                            View
                                                        </Button>
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            onClick={(e) => { e.stopPropagation(); openEditModal(emp); }}
                                                            className="hover:bg-white hover:shadow-sm"
                                                            icon={<FaEdit />}
                                                        >
                                                            Edit
                                                        </Button>
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            onClick={(e) => { e.stopPropagation(); handleDelete(emp.id); }}
                                                            className="hover:bg-white hover:shadow-sm text-error"
                                                            icon={<FaTrash />}
                                                        />
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                )}
            </main>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editing ? 'Edit Employee' : 'Add New Employee'} size="lg">
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleSave();
                    }}
                    className="space-y-4"
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input label="Full Name" name="name" value={form.name || ''} onChange={handleField('name')} required placeholder="e.g. John Doe" />
                        <Input label="Position" name="position" value={form.position || ''} onChange={handleField('position')} required placeholder="e.g. Senior Developer" />
                        <Input label="Phone" name="phone" value={form.phone || ''} onChange={handleField('phone')} placeholder="+1 (555) 000-0000" />
                        <Input label="Email" name="email" type="email" value={form.email || ''} onChange={handleField('email')} placeholder="john@example.com" />
                        <Input label="LinkedIn URL" name="linkedin_link" value={form.linkedin_link || ''} onChange={handleField('linkedin_link')} placeholder="https://linkedin.com/in/..." className="md:col-span-2" />
                        <div className="md:col-span-2">
                            <Textarea label="Bio" name="bio" value={form.bio || ''} onChange={handleField('bio')} rows={3} placeholder="Short professional bio..." maxLength={300} />
                        </div>
                    </div>

                    <Modal.Footer>
                        <Button variant="ghost" onClick={() => setIsModalOpen(false)} type="button">
                            Cancel
                        </Button>
                        <Button variant="primary" type="submit">
                            {editing ? 'Update Employee' : 'Create Employee'}
                        </Button>
                    </Modal.Footer>
                </form>
            </Modal>

            <ToastContainer toasts={toasts} onClose={removeToast} />
        </div>
    );
};

export default AdminDashboard;
