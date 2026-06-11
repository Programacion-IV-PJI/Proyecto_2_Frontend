import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { apiFetch } from '../../../shared/api/apiClient';
import Navbar from '../../../shared/components/Navbar';
import Footer from '../../../shared/components/Footer';

export default function BuscarCandidatos() {
    const { puestoId } = useParams();
    const [candidatos, setCandidatos] = useState([]);
    const [cargando, setCargando] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        apiFetch(`/api/empresas/puestos/${puestoId}/candidatos`)
            .then(data => { setCandidatos(data || []); setCargando(false); })
            .catch(() => setCargando(false));
    }, [puestoId]);

    const nivelColor = (p) => {
        if (p >= 80) return '#4caf50';
        if (p >= 50) return '#f0a500';
        return '#f44336';
    };

    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#1e2a38' }}>
            <Navbar />
            <div style={{ padding: '2rem', flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                    <button onClick={() => navigate('/empresa/dashboard')} style={{
                        background: '#253447', color: '#5f8f9e',
                        border: '1px solid #5f8f9e', borderRadius: '8px',
                        padding: '0.5rem 1rem', cursor: 'pointer', fontWeight: 'bold'
                    }}>
                        ← Volver
                    </button>
                    <h1 style={{ color: 'white', margin: 0 }}>Candidatos para el puesto</h1>
                </div>

                {cargando && <p style={{ color: '#aaa' }}>Cargando...</p>}
                {!cargando && candidatos.length === 0 && (
                    <p style={{ color: '#aaa' }}>No hay candidatos registrados.</p>
                )}

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
                    {candidatos.map(c => (
                        <div key={c.oferenteId} style={{
                            background: '#253447', borderRadius: '12px',
                            padding: '1.4rem', width: '280px',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                            borderLeft: `4px solid ${nivelColor(c.porcentaje)}`,
                            display: 'flex', flexDirection: 'column', gap: '0.5rem'
                        }}>
                            <h3 style={{ color: 'white', margin: 0 }}>
                                {c.nombre} {c.primerApellido}
                            </h3>
                            <p style={{ color: '#aaa', fontSize: '0.85rem', margin: 0 }}>{c.correo}</p>
                            <p style={{ color: '#aaa', fontSize: '0.85rem', margin: 0 }}>{c.telefono}</p>
                            <p style={{ color: '#aaa', fontSize: '0.85rem', margin: 0 }}>{c.residencia}</p>

                            <div style={{
                                background: '#1e2a38', borderRadius: '8px',
                                padding: '0.6rem', marginTop: '0.3rem'
                            }}>
                                <p style={{ color: '#aaa', fontSize: '0.75rem', margin: '0 0 0.3rem 0' }}>
                                    Requisitos cumplidos
                                </p>
                                <p style={{ color: nivelColor(c.porcentaje), fontWeight: 'bold', margin: 0, fontSize: '1.1rem' }}>
                                    {c.cumplidas} / {c.total} — {c.porcentaje}%
                                </p>
                                <div style={{
                                    background: '#253447', borderRadius: '20px',
                                    height: '6px', marginTop: '0.5rem', overflow: 'hidden'
                                }}>
                                    <div style={{
                                        width: `${c.porcentaje}%`,
                                        height: '100%',
                                        background: nivelColor(c.porcentaje),
                                        borderRadius: '20px'
                                    }} />
                                </div>
                            </div>

                            {c.cvPath
                                ? <a href={`http://localhost:8080/api/oferentes/cv/${c.cvPath}`}
                                     style={{ textDecoration: 'none' }}>
                                    <button style={{
                                        width: '100%', padding: '0.5rem',
                                        background: '#1a4a3a', color: '#4caf50',
                                        border: '1px solid #4caf50', borderRadius: '8px',
                                        cursor: 'pointer', fontWeight: 'bold'
                                    }}>
                                        Ver CV
                                    </button>
                                </a>
                                : <p style={{ color: '#666', fontSize: '0.8rem', margin: 0, textAlign: 'center' }}>
                                    Sin CV
                                </p>
                            }
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
        </div>
    );
}