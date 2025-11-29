import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import Profile from './pages/Profile';
import DesignSystemShowcase from './pages/DesignSystemShowcase';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/profile/:id" element={<Profile />} />
                <Route path="/showcase" element={<DesignSystemShowcase />} />

                <Route element={<ProtectedRoute />}>
                    <Route path="/admin" element={<AdminDashboard />} />
                </Route>

                <Route path="/" element={<Navigate to="/admin" replace />} />
            </Routes>
        </Router>
    );
}

export default App;
