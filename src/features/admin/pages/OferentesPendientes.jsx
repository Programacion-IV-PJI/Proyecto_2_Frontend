import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiFetch } from "../../../shared/api/apiClient";

export default function OferentesPendientes() {
    const [oferentes, setOferentes] = useState([]);
    const [mensaje, setMensaje] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        apiFetch("/api/admin/oferentes/pendientes").then(setOferentes).catch(console.error);
    }, []);

    async function aprobar(id) {
        await apiFetch(`/api/admin/oferentes/${id}/aprobar`, { method: "POST" });
        setMensaje("Oferente aprobado correctamente.");
        setOferentes(prev => prev.filter(o => o.id !== id));
    }

    async function rechazar(id) {
        await apiFetch(`/api/admin/oferentes/${id}/rechazar`, { method: "POST" });
        setMensaje("Oferente rechazado.");
        setOferentes(prev => prev.filter(o => o.id !== id));
    }

    const btnStyle = (color) => ({
        padding: '0.4rem 1rem',
        borderRadius: '6px',
        cursor: 'pointer',
        fontWeight: 'bold',
        fontSize: '0.85rem',
        background: color === 'green' ? '#1a4a3a' : '#3a2a2a',
        color: color === 'green' ? '#4caf50' : '#f44336',
        border: `1px solid ${color === 'green' ? '#4caf50' : '#f44336'}`
    });

    return (
        <div style={{ minHeight: '100vh', background: '#1e2a38' }}>
            <nav style={{
                padding: '0.8rem 2rem', background: '#1e2a38',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                boxShadow: '0 2px 8px rgba(0,0,0,0.4)'
            }}>
                <span style={{ color: 'white', fontWeight: 'bold', fontSize: '1.2rem' }}>
                    Bolsa de Empleo
                </span>
                <button onClick={() => navigate('/admin/dashboard')} style={{
                    background: '#5f8f9e', color: 'white', border: 'none',
                    borderRadius: '8px', padding: '0.5rem 1rem',
                    cursor: 'pointer', fontWeight: 'bold'
                }}>
                    ← Dashboard
                </button>
            </nav>

            <div style={{ padding: '2rem' }}>
                <h1 style={{ color: 'white', marginBottom: '0.5rem' }}>Oferentes Pendientes</h1>
                {mensaje && <p style={{ color: '#4caf50', marginBottom: '1rem' }}>{mensaje}</p>}

                {oferentes.length === 0
                    ? <p style={{ color: '#aaa' }}>No hay oferentes pendientes de aprobación.</p>
                    : <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
                        {oferentes.map(o => (
                            <div key={o.id} style={{
                                background: '#253447', borderRadius: '12px',
                                padding: '1.4rem', width: '300px',
                                boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                                borderLeft: '4px solid #f0a500',
                                display: 'flex', flexDirection: 'column', gap: '0.5rem'
                            }}>
                                <h3 style={{ color: 'white', margin: 0 }}>
                                    {o.nombre} {o.primerApellido}
                                </h3>
                                <p style={{ color: '#aaa', fontSize: '0.85rem', margin: 0 }}>{o.identificacion}</p>
                                <p style={{ color: '#aaa', fontSize: '0.85rem', margin: 0 }}>{o.correo}</p>
                                <p style={{ color: '#aaa', fontSize: '0.85rem', margin: 0 }}>{o.nacionalidad}</p>
                                <p style={{ color: '#aaa', fontSize: '0.85rem', margin: 0 }}>{o.telefono}</p>
                                <p style={{ color: '#aaa', fontSize: '0.85rem', margin: 0 }}>{o.residencia}</p>
                                <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                                    <button onClick={() => aprobar(o.id)} style={btnStyle('green')}>
                                        Aprobar
                                    </button>
                                    <button onClick={() => rechazar(o.id)} style={btnStyle('red')}>
                                        Rechazar
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                }
            </div>
        </div>
    );
}