import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiFetch } from '../../../shared/api/apiClient';
import Navbar from '../../../shared/components/Navbar';
import Footer from '../../../shared/components/Footer';

export default function CrearPuesto() {
    const [descripcion, setDescripcion] = useState('');
    const [salario, setSalario] = useState('');
    const [publico, setPublico] = useState(true);
    const [caracteristicas, setCaracteristicas] = useState([]);
    const [requisitos, setRequisitos] = useState([]);
    const [selCar, setSelCar] = useState('');
    const [selNivel, setSelNivel] = useState(1);
    const [mensaje, setMensaje] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        apiFetch('/api/admin/caracteristicas').then(data => {
            setCaracteristicas(data || []);
        });
    }, []);

    const agregarRequisito = () => {
        if (!selCar) return;
        const car = caracteristicas.find(c => c.id === Number(selCar));
        if (!car) return;
        if (requisitos.find(r => r.caracteristicaId === Number(selCar))) return;
        setRequisitos([...requisitos, {
            caracteristicaId: Number(selCar),
            nivelRequerido: Number(selNivel),
            nombre: car.padreNombre ? car.padreNombre + ' / ' + car.nombre : car.nombre
        }]);
        setSelCar('');
        setSelNivel(1);
    };

    const quitarRequisito = (id) => {
        setRequisitos(requisitos.filter(r => r.caracteristicaId !== id));
    };

    const handleSubmit = async e => {
        e.preventDefault();
        if (requisitos.length === 0) {
            setMensaje('Debe agregar al menos un requisito.');
            return;
        }
        const body = {
            descripcion, salario: Number(salario), publico,
            requisitos: requisitos.map(r => ({
                caracteristicaId: r.caracteristicaId,
                nivelRequerido: r.nivelRequerido
            }))
        };
        const res = await apiFetch('/api/empresas/puestos', {
            method: 'POST', body: JSON.stringify(body)
        });
        if (res) navigate('/empresa/dashboard');
        else setMensaje('Error al crear el puesto.');
    };

    const hojas = caracteristicas.filter(c => c.padreId !== null);

    const inputStyle = {
        width: '100%', padding: '0.6rem',
        background: '#1e2a38', border: '1px solid #5f8f9e',
        borderRadius: '6px', color: 'white', fontSize: '0.95rem'
    };

    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#1e2a38' }}>
            <Navbar />
            <div style={{ padding: '2rem', flex: 1, display: 'flex', justifyContent: 'center' }}>
                <div style={{
                    background: '#253447', borderRadius: '12px',
                    padding: '2rem', width: '100%', maxWidth: '600px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                    borderLeft: '4px solid #5f8f9e'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                        <button onClick={() => navigate('/empresa/dashboard')} style={{
                            background: '#1e2a38', color: '#5f8f9e',
                            border: '1px solid #5f8f9e', borderRadius: '8px',
                            padding: '0.5rem 1rem', cursor: 'pointer', fontWeight: 'bold'
                        }}>
                            ← Volver
                        </button>
                        <h1 style={{ color: 'white', margin: 0 }}>Publicar Puesto</h1>
                    </div>

                    {mensaje && (
                        <div style={{
                            background: '#3a2a2a', border: '1px solid #f44336',
                            borderRadius: '8px', padding: '0.8rem',
                            color: '#f44336', marginBottom: '1rem'
                        }}>
                            {mensaje}
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        <div style={{ marginBottom: '1.2rem' }}>
                            <label style={{ color: '#aaa', fontSize: '0.85rem', display: 'block', marginBottom: '0.3rem' }}>
                                Descripción del puesto
                            </label>
                            <input value={descripcion}
                                   onChange={e => setDescripcion(e.target.value)}
                                   style={inputStyle} required
                                   placeholder="Ej: Desarrollador Backend Java Senior" />
                        </div>

                        <div style={{ marginBottom: '1.2rem' }}>
                            <label style={{ color: '#aaa', fontSize: '0.85rem', display: 'block', marginBottom: '0.3rem' }}>
                                Salario (₡)
                            </label>
                            <input type="number" value={salario}
                                   onChange={e => setSalario(e.target.value)}
                                   style={inputStyle} required
                                   placeholder="Ej: 1500000" />
                        </div>

                        <div style={{ marginBottom: '1.2rem' }}>
                            <label style={{ color: '#aaa', fontSize: '0.85rem', display: 'block', marginBottom: '0.3rem' }}>
                                Tipo de publicación
                            </label>
                            <select value={publico}
                                    onChange={e => setPublico(e.target.value === 'true')}
                                    style={inputStyle}>
                                <option value="true">Público</option>
                                <option value="false">Privado</option>
                            </select>
                        </div>

                        <div style={{
                            background: '#1e2a38', borderRadius: '10px',
                            padding: '1.2rem', marginBottom: '1.5rem'
                        }}>
                            <h3 style={{ color: 'white', margin: '0 0 1rem 0', fontSize: '1rem' }}>
                                Requisitos
                            </h3>
                            <div style={{ display: 'flex', gap: '0.8rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
                                <select value={selCar} onChange={e => setSelCar(e.target.value)}
                                        style={{ ...inputStyle, width: 'auto', flex: 1 }}>
                                    <option value="">Seleccione característica</option>
                                    {hojas.map(c => (
                                        <option key={c.id} value={c.id}>
                                            {c.padreNombre ? c.padreNombre + ' / ' : ''}{c.nombre}
                                        </option>
                                    ))}
                                </select>
                                <select value={selNivel} onChange={e => setSelNivel(e.target.value)}
                                        style={{ ...inputStyle, width: 'auto' }}>
                                    {[1, 2, 3, 4, 5].map(n => (
                                        <option key={n} value={n}>Nivel {n}</option>
                                    ))}
                                </select>
                                <button type="button" onClick={agregarRequisito} style={{
                                    background: '#5f8f9e', color: 'white', border: 'none',
                                    borderRadius: '8px', padding: '0.6rem 1rem',
                                    cursor: 'pointer', fontWeight: 'bold'
                                }}>
                                    + Agregar
                                </button>
                            </div>

                            {requisitos.length === 0
                                ? <p style={{ color: '#666', fontSize: '0.85rem', margin: 0 }}>
                                    Sin requisitos agregados.
                                </p>
                                : <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                                    {requisitos.map(r => (
                                        <span key={r.caracteristicaId} style={{
                                            background: '#253447', color: '#5f8f9e',
                                            borderRadius: '20px', padding: '4px 12px',
                                            fontSize: '0.8rem', display: 'flex',
                                            alignItems: 'center', gap: '6px'
                                        }}>
                                            {r.nombre} (nivel {r.nivelRequerido})
                                            <button type="button"
                                                    onClick={() => quitarRequisito(r.caracteristicaId)}
                                                    style={{
                                                        background: 'none', border: 'none',
                                                        color: '#f44336', cursor: 'pointer',
                                                        padding: 0, fontSize: '0.85rem'
                                                    }}>
                                                ✕
                                            </button>
                                        </span>
                                    ))}
                                </div>
                            }
                        </div>

                        <button type="submit" style={{
                            width: '100%', padding: '0.8rem',
                            background: '#5f8f9e', color: 'white',
                            border: 'none', borderRadius: '8px',
                            cursor: 'pointer', fontWeight: 'bold', fontSize: '1rem'
                        }}>
                            Publicar Puesto
                        </button>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    );
}