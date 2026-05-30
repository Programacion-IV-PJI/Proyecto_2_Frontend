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
        setMensaje('Habilidad guardada.');
        cargar();
    };

    const eliminar = async (id) => {
        await apiFetch('/api/oferentes/habilidades/' + id, { method: 'DELETE' });
        cargar();
    };

    const hojas = todas.filter(c => c.padreId !== null);

    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Navbar />
            <div style={{ padding: '2rem', flex: 1 }}>
                <button onClick={() => navigate('/oferente/dashboard')}>← Volver</button>
                <h1>Mis Habilidades</h1>
                {mensaje && <p style={{ color: 'green' }}>{mensaje}</p>}
                <form onSubmit={agregar} style={{ marginBottom: '2rem' }}>
                    <select value={selCar} onChange={e => setSelCar(e.target.value)} required>
                        <option value="">Seleccione caracteristica</option>
                        {hojas.map(c => (
                            <option key={c.id} value={c.id}>
                                {c.padreNombre ? c.padreNombre + ' / ' : ''}{c.nombre}
                            </option>
                        ))}
                    </select>
                    <select value={nivel} onChange={e => setNivel(e.target.value)}
                            style={{ marginLeft: '1rem' }}>
                        {[1, 2, 3, 4, 5].map(n => (
                            <option key={n} value={n}>Nivel {n}</option>
                        ))}
                    </select>
                    <button type="submit" style={{ marginLeft: '1rem' }}>Agregar</button>
                </form>
                {mis.length === 0 ? <p>Sin habilidades.</p> : (
                    <table border="1" cellPadding="8"
                           style={{ borderCollapse: 'collapse', width: '100%' }}>
                        <thead>
                        <tr>
                            <th>Categoria</th>
                            <th>Habilidad</th>
                            <th>Nivel</th>
                            <th>Accion</th>
                        </tr>
                        </thead>
                        <tbody>
                        {mis.map(h => (
                            <tr key={h.id}>
                                <td>{h.padreNombre || '-'}</td>
                                <td>{h.caracteristicaNombre}</td>
                                <td>{h.nivel}</td>
                                <td>
                                    <button onClick={() => eliminar(h.id)}
                                            style={{ color: 'red' }}>Eliminar</button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                )}
            </div>
            <Footer />
        </div>
    );
}
