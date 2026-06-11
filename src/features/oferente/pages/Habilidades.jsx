import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiFetch } from '../../../shared/api/apiClient';
import Navbar from '../../../shared/components/Navbar';
import Footer from '../../../shared/components/Footer';

export default function Habilidades() {
    const [todas, setTodas] = useState([]);
    const [mis, setMis] = useState([]);
    const [selCar, setSelCar] = useState('');
    const [nivel, setNivel] = useState(1);
    const [mensaje, setMensaje] = useState('');
    const navigate = useNavigate();

    const cargar = async () => {
        const [cars, perfil] = await Promise.all([
            apiFetch('/api/admin/caracteristicas'),
            apiFetch('/api/oferentes/perfil')
        ]);
        setTodas(cars || []);
        setMis(perfil?.habilidades || []);
    };

    useEffect(() => { cargar(); }, []);

    const agregar = async e => {
        e.preventDefault();
        await apiFetch('/api/oferentes/habilidades', {
            method: 'POST',
            body: JSON.stringify({ caracteristicaId: Number(selCar), nivel: Number(nivel) })
        });
        setMensaje('Habilidad guardada correctamente.');
        setSelCar('');
        setNivel(1);
        cargar();
    };

    const eliminar = async (id) => {
        await apiFetch('/api/oferentes/habilidades/' + id, { method: 'DELETE' });
        cargar();
    };

    const hojas = todas.filter(c => c.padreId !== null);

    const nivelColor = (n) => {
        if (n >= 5) return '#4caf50';
        if (n >= 3) return '#f0a500';
        return '#5f8f9e';
    };

    const inputStyle = {
        padding: '0.5rem', background: '#1e2a38',
        border: '1px solid #5f8f9e', borderRadius: '6px',
        color: 'white', fontSize: '0.9rem'
    };

    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#1e2a38' }}>
            <Navbar />
            <div style={{ padding: '2rem', flex: 1 }}>

                {/* Header */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                    <button onClick={() => navigate('/oferente/dashboard')} style={{
                        background: '#253447', color: '#5f8f9e',
                        border: '1px solid #5f8f9e', borderRadius: '8px',
                        padding: '0.5rem 1rem', cursor: 'pointer', fontWeight: 'bold'
                    }}>
                        ← Volver
                    </button>
                    <h1 style={{ color: 'white', margin: 0 }}>Mis Habilidades</h1>
                </div>

                {/* Formulario agregar */}
                <div style={{
                    background: '#253447', borderRadius: '12px',
                    padding: '1.5rem', marginBottom: '2rem',
                    borderLeft: '4px solid #5f8f9e'
                }}>
                    <h2 style={{ color: 'white', marginBottom: '1rem', fontSize: '1.1rem' }}>
                        Agregar Habilidad
                    </h2>
                    {mensaje && <p style={{ color: '#4caf50', marginBottom: '1rem' }}>{mensaje}</p>}
                    <form onSubmit={agregar} style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'flex-end' }}>
                        <div>
                            <label style={{ color: '#aaa', fontSize: '0.85rem', display: 'block', marginBottom: '0.3rem' }}>
                                Característica
                            </label>
                            <select value={selCar} onChange={e => setSelCar(e.target.value)}
                                    required style={{ ...inputStyle, minWidth: '250px' }}>
                                <option value="">Seleccione una característica</option>
                                {hojas.map(c => (
                                    <option key={c.id} value={c.id}>
                                        {c.padreNombre ? c.padreNombre + ' / ' : ''}{c.nombre}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label style={{ color: '#aaa', fontSize: '0.85rem', display: 'block', marginBottom: '0.3rem' }}>
                                Nivel
                            </label>
                            <select value={nivel} onChange={e => setNivel(e.target.value)}
                                    style={inputStyle}>
                                {[1, 2, 3, 4, 5].map(n => (
                                    <option key={n} value={n}>Nivel {n}</option>
                                ))}
                            </select>
                        </div>
                        <button type="submit" style={{
                            background: '#5f8f9e', color: 'white', border: 'none',
                            borderRadius: '8px', padding: '0.6rem 1.4rem',
                            cursor: 'pointer', fontWeight: 'bold'
                        }}>
                            + Agregar
                        </button>
                    </form>
                </div>

                {/* Lista de habilidades */}
                {mis.length === 0
                    ? <p style={{ color: '#aaa' }}>No tienes habilidades registradas.</p>
                    : <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.8rem' }}>
                        {mis.map(h => (
                            <div key={h.id} style={{
                                background: '#253447', borderRadius: '10px',
                                padding: '0.8rem 1.2rem',
                                borderLeft: `3px solid ${nivelColor(h.nivel)}`,
                                minWidth: '180px', display: 'flex',
                                flexDirection: 'column', gap: '0.3rem'
                            }}>
                                <p style={{ color: '#aaa', fontSize: '0.75rem', margin: 0 }}>
                                    {h.padreNombre || 'General'}
                                </p>
                                <p style={{ color: 'white', fontWeight: 'bold', fontSize: '0.95rem', margin: 0 }}>
                                    {h.caracteristicaNombre}
                                </p>
                                <p style={{ color: nivelColor(h.nivel), fontSize: '0.8rem', margin: 0, fontWeight: 'bold' }}>
                                    Nivel {h.nivel} / 5
                                </p>
                                <button onClick={() => eliminar(h.id)} style={{
                                    background: '#3a2a2a', color: '#f44336',
                                    border: '1px solid #f44336', borderRadius: '6px',
                                    padding: '0.3rem 0.6rem', cursor: 'pointer',
                                    fontSize: '0.75rem', marginTop: '0.3rem'
                                }}>
                                    ✕ Eliminar
                                </button>
                            </div>
                        ))}
                    </div>
                }
            </div>
            <Footer />
        </div>
    );
}