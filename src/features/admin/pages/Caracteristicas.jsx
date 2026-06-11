import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiFetch } from "../../../shared/api/apiClient";

export default function Caracteristicas() {
    const [lista, setLista] = useState([]);
    const [nombre, setNombre] = useState("");
    const [padreId, setPadreId] = useState("");
    const [mensaje, setMensaje] = useState("");
    const navigate = useNavigate();

    const cargar = async () => {
        const data = await apiFetch("/api/admin/caracteristicas");
        setLista(data || []);
    };

    useEffect(() => { cargar(); }, []);

    async function agregar(e) {
        e.preventDefault();
        const body = { nombre, padreId: padreId ? parseInt(padreId) : null };
        await apiFetch("/api/admin/caracteristicas", {
            method: "POST", body: JSON.stringify(body)
        });
        setNombre("");
        setPadreId("");
        setMensaje("Característica agregada correctamente.");
        cargar();
    }

    const raices = lista.filter(c => !c.padreId);
    const hijos = (id) => lista.filter(c => c.padreId === id);

    const btnStyle = {
        background: '#5f8f9e', color: 'white', border: 'none',
        borderRadius: '8px', padding: '0.5rem 1rem',
        cursor: 'pointer', fontWeight: 'bold'
    };

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
                <button onClick={() => navigate('/admin/dashboard')} style={btnStyle}>
                    ← Dashboard
                </button>
            </nav>

            <div style={{ padding: '2rem', display: 'flex', gap: '2rem' }}>

                {/* Formulario agregar */}
                <div style={{
                    background: '#253447', borderRadius: '12px',
                    padding: '1.5rem', width: '300px', height: 'fit-content'
                }}>
                    <h2 style={{ color: 'white', marginBottom: '1rem' }}>Agregar Característica</h2>
                    {mensaje && <p style={{ color: '#4caf50', marginBottom: '1rem' }}>{mensaje}</p>}
                    <form onSubmit={agregar}>
                        <div style={{ marginBottom: '1rem' }}>
                            <label style={{ color: '#aaa', fontSize: '0.85rem' }}>Nombre</label><br />
                            <input
                                value={nombre}
                                onChange={e => setNombre(e.target.value)}
                                required
                                placeholder="Ej: Kotlin"
                                style={{
                                    width: '100%', padding: '0.5rem',
                                    background: '#1e2a38', border: '1px solid #5f8f9e',
                                    borderRadius: '6px', color: 'white', marginTop: '0.3rem'
                                }}
                            />
                        </div>
                        <div style={{ marginBottom: '1rem' }}>
                            <label style={{ color: '#aaa', fontSize: '0.85rem' }}>Categoría padre (opcional)</label><br />
                            <select
                                value={padreId}
                                onChange={e => setPadreId(e.target.value)}
                                style={{
                                    width: '100%', padding: '0.5rem',
                                    background: '#1e2a38', border: '1px solid #5f8f9e',
                                    borderRadius: '6px', color: 'white', marginTop: '0.3rem'
                                }}
                            >
                                <option value="">Sin padre (categoría raíz)</option>
                                {lista.map(c => (
                                    <option key={c.id} value={c.id}>
                                        {c.padreNombre ? c.padreNombre + ' / ' + c.nombre : c.nombre}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <button type="submit" style={{ ...btnStyle, width: '100%' }}>
                            Agregar
                        </button>
                    </form>
                </div>

                {/* Lista jerárquica */}
                <div style={{ flex: 1 }}>
                    <h2 style={{ color: 'white', marginBottom: '1rem' }}>Catálogo de Características</h2>
                    {raices.map(r => (
                        <div key={r.id} style={{
                            background: '#253447', borderRadius: '12px',
                            padding: '1rem', marginBottom: '1rem',
                            borderLeft: '4px solid #5f8f9e'
                        }}>
                            <p style={{ color: '#5f8f9e', fontWeight: 'bold', margin: '0 0 0.5rem 0' }}>
                                {r.nombre}
                            </p>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                                {hijos(r.id).map(h => (
                                    <span key={h.id} style={{
                                        background: '#1e2a38',
                                        color: '#ccc',
                                        borderRadius: '20px',
                                        padding: '3px 12px',
                                        fontSize: '0.8rem'
                                    }}>
                                        {h.nombre}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}