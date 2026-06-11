import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiFetch } from '../../../shared/api/apiClient';
import Navbar from '../../../shared/components/Navbar';
import Footer from '../../../shared/components/Footer';

export default function DashboardOferente() {
    const [perfil, setPerfil] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        apiFetch('/api/oferentes/perfil').then(setPerfil).catch(console.error);
    }, []);

    if (!perfil) return (
        <div style={{ minHeight: '100vh', background: '#1e2a38', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <p style={{ color: 'white' }}>Cargando...</p>
        </div>
    );

    const nivelColor = (n) => {
        if (n >= 5) return '#4caf50';
        if (n >= 3) return '#f0a500';
        return '#5f8f9e';
    };

    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#1e2a38' }}>
            <Navbar />
            <div style={{ padding: '2rem', flex: 1 }}>

                {/* Tarjeta de perfil */}
                <div style={{
                    background: '#253447', borderRadius: '12px',
                    padding: '1.5rem', marginBottom: '2rem',
                    borderLeft: '4px solid #5f8f9e',
                    display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
                    flexWrap: 'wrap', gap: '1rem'
                }}>
                    <div>
                        <h1 style={{ color: 'white', margin: '0 0 0.5rem 0' }}>{perfil.nombre} {perfil.primerApellido}</h1>
                        <p style={{ color: '#aaa', margin: '0 0 0.3rem 0', fontSize: '0.9rem' }}>{perfil.correo}</p>
                        <p style={{ color: '#aaa', margin: '0 0 0.3rem 0', fontSize: '0.9rem' }}>{perfil.residencia}</p>
                        <p style={{ color: '#aaa', margin: 0, fontSize: '0.9rem' }}>{perfil.identificacion}</p>
                    </div>
                    <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap' }}>
                        <button onClick={() => navigate('/oferente/habilidades')} style={{
                            background: '#5f8f9e', color: 'white', border: 'none',
                            borderRadius: '8px', padding: '0.6rem 1.2rem',
                            cursor: 'pointer', fontWeight: 'bold'
                        }}>
                            Mis Habilidades
                        </button>
                        <button onClick={() => navigate('/oferente/cv')} style={{
                            background: '#253447', color: '#5f8f9e',
                            border: '1px solid #5f8f9e', borderRadius: '8px',
                            padding: '0.6rem 1.2rem', cursor: 'pointer', fontWeight: 'bold'
                        }}>
                            Subir CV
                        </button>
                        {perfil.cvPath && (
                            <a href={'http://localhost:8080/api/oferentes/cv/' + perfil.cvPath}>
                                <button style={{
                                    background: '#1a4a3a', color: '#4caf50',
                                    border: '1px solid #4caf50', borderRadius: '8px',
                                    padding: '0.6rem 1.2rem', cursor: 'pointer', fontWeight: 'bold'
                                }}>
                                    Ver mi CV
                                </button>
                            </a>
                        )}
                    </div>
                </div>

                {/* Habilidades */}
                <h2 style={{ color: 'white', marginBottom: '1rem' }}>Mis Habilidades</h2>
                {perfil.habilidades.length === 0
                    ? <p style={{ color: '#aaa' }}>No tienes habilidades registradas.</p>
                    : <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.8rem' }}>
                        {perfil.habilidades.map(h => (
                            <div key={h.id} style={{
                                background: '#253447', borderRadius: '10px',
                                padding: '0.8rem 1.2rem',
                                borderLeft: `3px solid ${nivelColor(h.nivel)}`,
                                minWidth: '180px'
                            }}>
                                <p style={{ color: '#aaa', fontSize: '0.75rem', margin: '0 0 0.2rem 0' }}>
                                    {h.padreNombre || 'General'}
                                </p>
                                <p style={{ color: 'white', fontWeight: 'bold', fontSize: '0.95rem', margin: '0 0 0.3rem 0' }}>
                                    {h.caracteristicaNombre}
                                </p>
                                <p style={{ color: nivelColor(h.nivel), fontSize: '0.8rem', margin: 0, fontWeight: 'bold' }}>
                                    Nivel {h.nivel} / 5
                                </p>
                            </div>
                        ))}
                    </div>
                }
            </div>
            <Footer />
        </div>
    );
}