import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ProtectedRoute({ children, rol }) {
    const navigate = useNavigate();
    const tokenGuardado = localStorage.getItem('token');
    const rolGuardado = localStorage.getItem('rol');

    useEffect(() => {
        if (!tokenGuardado) {
            navigate('/', { replace: true });
            return;
        }
        if (rol && rolGuardado !== rol) {
            navigate('/', { replace: true });
        }
    }, [tokenGuardado, rolGuardado, rol, navigate]);

    if (!tokenGuardado) return null;
    if (rol && rolGuardado !== rol) return null;

    return children;
}