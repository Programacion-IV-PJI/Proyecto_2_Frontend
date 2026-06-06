import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../../shared/components/Navbar';
import Footer from '../../../shared/components/Footer';

export default function Home() {
    const [puestos, setPuestos] = useState([]);
    const [hover, setHover] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetch('http://localhost:8080/api/puestos/publicos/recientes')
            .then(r => r.json())
            .then(setPuestos)
            .catch(console.error);
    }, []);

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
            <Navbar />
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