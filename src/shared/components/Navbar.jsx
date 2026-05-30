import { useNavigate } from 'react-router-dom';

export default function Navbar() {
    const navigate = useNavigate();
    const rol = localStorage.getItem('rol');
    const nombre = localStorage.getItem('nombre');

    const handleLogout = () => {
        localStorage.clear();
        navigate('/login');
    };

    return (
        <nav style={{ padding: '1rem', background: '#2c3e50', color: 'white',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <strong style={{ cursor: 'pointer' }} onClick={() => navigate('/')}>
                Bolsa de Empleo
            </strong>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                {!rol && <>
                    <button onClick={() => navigate('/buscar')}>Buscar</button>
                    <button onClick={() => navigate('/empresa/registro')}>Empresa</button>
                    <button onClick={() => navigate('/oferente/registro')}>Oferente</button>
                    <button onClick={() => navigate('/login')}>Login</button>
                </>}
                {rol === 'EMPRESA' && <>
                    <button onClick={() => navigate('/empresa/dashboard')}>Dashboard</button>
                    <span>{nombre}</span>
                    <button onClick={handleLogout}>Salir</button>
                </>}
                {rol === 'OFERENTE' && <>
                    <button onClick={() => navigate('/oferente/dashboard')}>Dashboard</button>
                    <span>{nombre}</span>
                    <button onClick={handleLogout}>Salir</button>
                </>}
                {rol === 'ADMIN' && <>
                    <button onClick={() => navigate('/admin/dashboard')}>Dashboard</button>
                    <span>{nombre}</span>
                    <button onClick={handleLogout}>Salir</button>
                </>}
            </div>
        </nav>
    );
}
