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

    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Navbar />
            <div style={{ padding: '2rem', flex: 1 }}>
                <h1>Bolsa de Empleo</h1>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
                    {puestos.map(p => (
                        <div key={p.id}
                             style={{ border: '1px solid #ccc', padding: '1rem',
                                 width: '200px', position: 'relative', cursor: 'pointer' }}
                             onMouseEnter={() => setHover(p.id)}
                             onMouseLeave={() => setHover(null)}>
                            <strong>{p.empresaNombre}</strong>
                            <p>{p.descripcion}</p>
                            <p>&#8353;{p.salario}</p>
                            <button onClick={() => navigate('/buscar')}>Ver detalle</button>
                            {hover === p.id && (
                                <div style={{ position: 'absolute', top: 0, left: '210px',
                                    background: 'white', border: '1px solid #999',
                                    padding: '1rem', width: '220px', zIndex: 10 }}>
                                    <strong>Requisitos</strong>
                                    <ul>
                                        {p.requisitos.map((r, i) => (
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
