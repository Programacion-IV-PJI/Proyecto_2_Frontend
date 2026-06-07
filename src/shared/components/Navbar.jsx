import { useNavigate } from 'react-router-dom';

export default function Navbar({ onLoginClick }) {
    const navigate = useNavigate();
    const rol = localStorage.getItem('rol');
    const nombre = localStorage.getItem('nombre');

    const handleLogout = () => {
        localStorage.clear();
        navigate('/');
    };

    const btnStyle = {
        background: 'transparent', border: 'none', color: '#ccc',
        cursor: 'pointer', fontSize: '1rem', padding: '0.4rem 0.8rem',
        borderRadius: '6px', transition: 'color 0.2s'
    };

    const loginBtn = {
        background: '#5f8fa3', border: 'none', color: 'white',
        cursor: 'pointer', fontSize: '1rem', padding: '0.5rem 1.2rem',
        borderRadius: '20px', fontWeight: 'bold'
    };

    const handleLoginClick = () => {
        if (onLoginClick) onLoginClick();
        else navigate('/login');
    };

    return (
        <nav style={{
            padding: '0.8rem 2rem', background: '#1e2a38', color: 'white',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            boxShadow: '0 2px 8px rgba(0,0,0,0.4)'
        }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', cursor: 'pointer' }}
                 onClick={() => navigate('/')}>
                <img src="/logo.png" alt="logo" style={{ height: 50, borderRadius: '50%' }}
                     onError={e => e.target.style.display='none'} />
            </div>

            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                {!rol && <>
                    <button style={btnStyle} onClick={() => navigate('/buscar')}>Buscar puestos</button>
                    <button style={btnStyle} onClick={() => navigate('/oferente/registro')}>Registro Oferente</button>
                    <button style={btnStyle} onClick={() => navigate('/empresa/registro')}>Registro Empresa</button>
                    <button style={loginBtn} onClick={handleLoginClick}>Login</button>
                </>}
                {rol === 'EMPRESA' && <>
                    <button style={btnStyle} onClick={() => navigate('/empresa/dashboard')}>Dashboard</button>
                    <span style={{ color: '#aaa' }}>{nombre}</span>
                    <button style={loginBtn} onClick={handleLogout}>Salir</button>
                </>}
                {rol === 'OFERENTE' && <>
                    <button style={btnStyle} onClick={() => navigate('/oferente/dashboard')}>Dashboard</button>
                    <span style={{ color: '#aaa' }}>{nombre}</span>
                    <button style={loginBtn} onClick={handleLogout}>Salir</button>
                </>}
                {rol === 'ADMIN' && <>
                    <button style={btnStyle} onClick={() => navigate('/admin/dashboard')}>Dashboard</button>
                    <span style={{ color: '#aaa' }}>{nombre}</span>
                    <button style={loginBtn} onClick={handleLogout}>Salir</button>
                </>}
            </div>
        </nav>
    );
}