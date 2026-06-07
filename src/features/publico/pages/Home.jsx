import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../../shared/components/Navbar';
import Footer from '../../../shared/components/Footer';

export default function Home() {
    const [puestos, setPuestos] = useState([]);
    const [hover, setHover] = useState(null);
    const [showLogin, setShowLogin] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorLogin, setErrorLogin] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetch('http://localhost:8080/api/puestos/publicos/recientes')
            .then(r => r.json())
            .then(setPuestos)
            .catch(console.error);
    }, []);

    const handleLogin = async (e) => {
        e.preventDefault();
        setErrorLogin('');
        try {
            const res = await fetch('http://localhost:8080/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ identificacion: username, clave: password })
            });
            if (!res.ok) { setErrorLogin('Credenciales incorrectas'); return; }
            const data = await res.json();
            localStorage.setItem('token', data.token);
            localStorage.setItem('rol', data.rol);
            localStorage.setItem('nombre', data.nombre);
            setShowLogin(false);
            if (data.rol === 'EMPRESA') navigate('/empresa/dashboard');
            else if (data.rol === 'OFERENTE') navigate('/oferente/dashboard');
            else if (data.rol === 'ADMIN') navigate('/admin/dashboard');
        } catch { setErrorLogin('Error conectando con el servidor'); }
    };

    const cardStyle = {
        background: '#5f8f9e', borderRadius: '16px', padding: '1.2rem',
        width: '280px', minHeight: '160px', cursor: 'pointer',
        position: 'relative', display: 'flex', flexDirection: 'column',
        justifyContent: 'space-between', boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
    };

    const btnStyle = {
        background: '#1e2a38', color: 'white', border: 'none',
        borderRadius: '20px', padding: '0.5rem 1.4rem',
        cursor: 'pointer', alignSelf: 'flex-end', fontWeight: 'bold'
    };

    const tooltipStyle = {
        position: 'absolute', top: 0, left: '300px',
        background: '#2c3e50', border: '1px solid #5f8f9e',
        color: 'white', padding: '1rem', width: '220px',
        borderRadius: '12px', zIndex: 10, fontSize: '0.9rem'
    };

    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#1e2a38' }}>
            <Navbar onLoginClick={() => setShowLogin(true)} />

            {/* Modal Login */}
            {showLogin && (
                <div style={{
                    position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
                    background: 'rgba(0,0,0,0.6)', zIndex: 100,
                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                    <div style={{
                        background: 'white', color: '#1e2a38', padding: '2rem',
                        borderRadius: '12px', width: '320px'
                    }}>
                        <h2 style={{ textAlign: 'center', marginBottom: '1rem' }}>Login</h2>
                        {errorLogin && <p style={{ color: 'red' }}>{errorLogin}</p>}
                        <form onSubmit={handleLogin}>
                            <div style={{ marginBottom: '1rem' }}>
                                <label>Usuario</label><br />
                                <input value={username} onChange={e => setUsername(e.target.value)}
                                       style={{ width: '100%', padding: '8px' }} required />
                            </div>
                            <div style={{ marginBottom: '1rem' }}>
                                <label>Clave</label><br />
                                <input type="password" value={password}
                                       onChange={e => setPassword(e.target.value)}
                                       style={{ width: '100%', padding: '8px' }} required />
                            </div>
                            <div style={{ display: 'flex', gap: '1rem' }}>
                                <button type="submit"
                                        style={{ flex: 1, padding: '8px', background: '#5f8f9e', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
                                    Ingresar
                                </button>
                                <button type="button" onClick={() => setShowLogin(false)}
                                        style={{ flex: 1, padding: '8px', background: '#ccc', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
                                    Cancelar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <div style={{ padding: '2.5rem', flex: 1 }}>
                <h1 style={{ color: 'white', textAlign: 'center', fontSize: '2.2rem',
                    borderBottom: '2px solid #5f8f9e', paddingBottom: '1rem', marginBottom: '2rem' }}>
                    Bolsa de Empleo
                </h1>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', justifyContent: 'center' }}>
                    {puestos.map(p => (
                        <div key={p.id} style={cardStyle}
                             onMouseEnter={() => setHover(p.id)}
                             onMouseLeave={() => setHover(null)}>
                            <div>
                                <h3 style={{ color: 'white', margin: '0 0 0.5rem 0' }}>{p.empresaNombre}</h3>
                                <p style={{ color: '#dce8ec', margin: '0 0 0.3rem 0', fontSize: '0.9rem' }}>{p.descripcion}</p>
                                <p style={{ color: '#b2d0d8', margin: 0, fontSize: '0.9rem' }}>&#8353;{p.salario}</p>
                            </div>
                            <button style={btnStyle} onClick={() => navigate('/buscar')}>Mostrar más</button>

                            {hover === p.id && (
                                <div style={tooltipStyle}>
                                    <strong>Requisitos</strong>
                                    <ul style={{ paddingLeft: '1.2rem', marginTop: '0.5rem' }}>
                                        {p.requisitos?.map((r, i) => (
                                            <li key={i}>
                                                {r.padreNombre ? r.padreNombre + ' / ' : ''}
                                                {r.caracteristicaNombre} ({r.nivelRequerido})
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
        </div>
    );
}