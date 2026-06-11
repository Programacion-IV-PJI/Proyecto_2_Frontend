import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiFetch } from '../../../shared/api/apiClient';
import Navbar from '../../../shared/components/Navbar';
import Footer from '../../../shared/components/Footer';

export default function DashboardEmpresa() {
    const [puestos, setPuestos] = useState([]);
    const [mensaje, setMensaje] = useState('');
    const navigate = useNavigate();

    const cargar = async () => {
        const data = await apiFetch('/api/empresas/mis-puestos');
        setPuestos(data || []);
    };

    useEffect(() => { cargar(); }, []);

    const desactivar = async (id) => {
        await apiFetch(`/api/empresas/puestos/${id}/desactivar`, { method: 'POST' });
        setMensaje('Puesto desactivado.');
        cargar();
    };

    const formatSalario = (s) => '₡' + Number(s).toLocaleString('es-CR');

    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#1e2a38' }}>
            <Navbar />
            <div style={{ padding: '2rem', flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                    <h1 style={{ color: 'white', margin: 0 }}>Mis Puestos</h1>
                    <button onClick={() => navigate('/empresa/crear-puesto')} style={{
                        background: '#5f8f9e', color: 'white', border: 'none',
                        borderRadius: '8px', padding: '0.6rem 1.4rem',
                        cursor: 'pointer', fontWeight: 'bold', fontSize: '1rem'
                    }}>
                        + Publicar nuevo puesto
                    </button>
                </div>

                {mensaje && <p style={{ color: '#4caf50', marginBottom: '1rem' }}>{mensaje}</p>}

                {puestos.length === 0
                    ? <p style={{ color: '#aaa' }}>No tienes puestos publicados.</p>
                    : <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.2rem' }}>
                        {puestos.map(p => (
                            <div key={p.id} style={{
                                background: '#253447',
                                borderRadius: '12px',
                                padding: '1.4rem',
                                width: '300px',
                                boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                                borderLeft: `4px solid ${p.activo ? '#5f8f9e' : '#666'}`,
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '0.6rem'
                            }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                    <p style={{ color: 'white', fontWeight: 'bold', fontSize: '1rem', margin: 0, flex: 1 }}>
                                        {p.descripcion}
                                    </p>
                                    <span style={{
                                        background: p.activo ? '#1a4a3a' : '#3a2a2a',
                                        color: p.activo ? '#4caf50' : '#f44336',
                                        borderRadius: '20px', padding: '2px 10px',
                                        fontSize: '0.75rem', fontWeight: 'bold', marginLeft: '0.5rem'
                                    }}>
                                        {p.activo ? 'Activo' : 'Inactivo'}
                                    </span>
                                </div>

                                <p style={{ color: '#4caf50', fontWeight: 'bold', fontSize: '1.1rem', margin: 0 }}>
                                    {formatSalario(p.salario)}
                                </p>

                                <p style={{ color: '#aaa', fontSize: '0.8rem', margin: 0 }}>
                                    {p.publico ? 'Público' : 'Privado'}
                                </p>

                                {p.requisitos?.length > 0 && (
                                    <div>
                                        <p style={{ color: '#888', fontSize: '0.75rem', margin: '0 0 0.4rem 0' }}>Requisitos:</p>
                                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                                            {p.requisitos.map((r, i) => (
                                                <span key={i} style={{
                                                    background: '#1e2a38',
                                                    color: '#5f8f9e',
                                                    borderRadius: '20px',
                                                    padding: '2px 8px',
                                                    fontSize: '0.7rem'
                                                }}>
                                                    {r.caracteristicaNombre} ({r.nivelRequerido})
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                                    <button onClick={() => navigate(`/empresa/candidatos/${p.id}`)} style={{
                                        flex: 1, padding: '0.5rem',
                                        background: '#5f8f9e', color: 'white',
                                        border: 'none', borderRadius: '8px',
                                        cursor: 'pointer', fontSize: '0.85rem'
                                    }}>
                                        Ver candidatos
                                    </button>
                                    {p.activo && (
                                        <button onClick={() => desactivar(p.id)} style={{
                                            flex: 1, padding: '0.5rem',
                                            background: '#3a2a2a', color: '#f44336',
                                            border: '1px solid #f44336', borderRadius: '8px',
                                            cursor: 'pointer', fontSize: '0.85rem'
                                        }}>
                                            Desactivar
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                }
            </div>
            <Footer />
        </div>
    );
}