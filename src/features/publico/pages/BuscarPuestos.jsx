import { useEffect, useState } from 'react';
import Navbar from '../../../shared/components/Navbar';
import Footer from '../../../shared/components/Footer';

export default function BuscarPuestos() {
    const [caracteristicas, setCaracteristicas] = useState([]);
    const [seleccionadas, setSeleccionadas] = useState([]);
    const [resultados, setResultados] = useState([]);
    const [buscado, setBuscado] = useState(false);

    useEffect(() => {
        fetch('http://localhost:8080/api/admin/caracteristicas')
            .then(r => r.json())
            .then(setCaracteristicas)
            .catch(console.error);
    }, []);

    const toggle = (id) => {
        setSeleccionadas(prev =>
            prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
    };

    const buscar = async () => {
        const params = seleccionadas.length > 0
            ? '?caracteristicas=' + seleccionadas.join(',') : '';
        const token = localStorage.getItem('token');
        const headers = token ? { Authorization: 'Bearer ' + token } : {};
        const res = await fetch('http://localhost:8080/api/puestos/buscar' + params, { headers });
        const data = await res.json();
        setResultados(data);
        setBuscado(true);
    };

    const raices = caracteristicas.filter(c => !c.padreId);
    const hijos = (padreId) => caracteristicas.filter(c => c.padreId === padreId);

    const formatSalario = (s) => '₡' + Number(s).toLocaleString('es-CR');

    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#1e2a38' }}>
            <Navbar />
            <div style={{ padding: '2rem', flex: 1, display: 'flex', gap: '2rem' }}>

                {/* Panel filtros */}
                <div style={{
                    width: '260px', minWidth: '260px',
                    background: '#253447', borderRadius: '12px',
                    padding: '1.5rem', height: 'fit-content'
                }}>
                    <h2 style={{ color: 'white', marginBottom: '1rem', fontSize: '1.2rem' }}>Filtrar por habilidad</h2>
                    {raices.map(r => (
                        <div key={r.id} style={{ marginBottom: '1rem' }}>
                            <p style={{ color: '#5f8f9e', fontWeight: 'bold', marginBottom: '0.4rem', fontSize: '0.9rem' }}>
                                {r.nombre}
                            </p>
                            <div style={{ marginLeft: '0.8rem' }}>
                                {hijos(r.id).map(h => (
                                    <div key={h.id} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.3rem' }}>
                                        <input type="checkbox"
                                               checked={seleccionadas.includes(h.id)}
                                               onChange={() => toggle(h.id)}
                                               style={{ accentColor: '#5f8f9e' }} />
                                        <label style={{ color: '#ccc', fontSize: '0.85rem', cursor: 'pointer' }}
                                               onClick={() => toggle(h.id)}>
                                            {h.nombre}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                    <button onClick={buscar} style={{
                        width: '100%', padding: '0.7rem',
                        background: '#5f8f9e', color: 'white',
                        border: 'none', borderRadius: '8px',
                        cursor: 'pointer', fontWeight: 'bold',
                        fontSize: '1rem', marginTop: '0.5rem'
                    }}>
                        Buscar
                    </button>
                </div>

                {/* Resultados */}
                <div style={{ flex: 1 }}>
                    <h2 style={{ color: 'white', marginBottom: '1.5rem' }}>
                        {buscado ? `${resultados.length} resultado(s) encontrado(s)` : 'Resultados'}
                    </h2>
                    {buscado && resultados.length === 0 && (
                        <p style={{ color: '#aaa' }}>No se encontraron puestos con esas características.</p>
                    )}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
                        {resultados.map(p => (
                            <div key={p.id} style={{
                                background: '#253447',
                                borderRadius: '12px',
                                padding: '1.2rem',
                                width: '220px',
                                boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                                borderLeft: '4px solid #5f8f9e',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '0.5rem'
                            }}>
                                <p style={{ color: '#5f8f9e', fontSize: '0.8rem', fontWeight: 'bold', margin: 0 }}>
                                    {p.empresaNombre}
                                </p>
                                <p style={{ color: 'white', fontWeight: 'bold', fontSize: '0.95rem', margin: 0 }}>
                                    {p.descripcion}
                                </p>
                                <p style={{ color: '#4caf50', fontWeight: 'bold', fontSize: '0.9rem', margin: 0 }}>
                                    {formatSalario(p.salario)}
                                </p>
                                <p style={{ color: '#aaa', fontSize: '0.75rem', margin: 0 }}>
                                    {p.publico ? 'Público' : 'Privado'}
                                </p>
                                {p.requisitos?.length > 0 && (
                                    <div style={{ marginTop: '0.3rem' }}>
                                        <p style={{ color: '#888', fontSize: '0.75rem', margin: '0 0 0.3rem 0' }}>Requisitos:</p>
                                        {p.requisitos.map((r, i) => (
                                            <span key={i} style={{
                                                display: 'inline-block',
                                                background: '#1e2a38',
                                                color: '#5f8f9e',
                                                borderRadius: '20px',
                                                padding: '2px 8px',
                                                fontSize: '0.7rem',
                                                margin: '2px'
                                            }}>
                                                {r.caracteristicaNombre} ({r.nivelRequerido})
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}