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
        const yaExiste = requisitos.find(r => r.caracteristicaId === Number(selCar));
        if (yaExiste) return;
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
            descripcion,
            salario: Number(salario),
            publico,
            requisitos: requisitos.map(r => ({
                caracteristicaId: r.caracteristicaId,
                nivelRequerido: r.nivelRequerido
            }))
        };
        const res = await apiFetch('/api/empresas/puestos', {
            method: 'POST',
            body: JSON.stringify(body)
        });
        if (res) {
            navigate('/empresa/dashboard');
        } else {
            setMensaje('Error al crear el puesto.');
        }
    };

    const hojas = caracteristicas.filter(c => c.padreId !== null);

    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Navbar />
            <div style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto', flex: 1 }}>
                <button onClick={() => navigate('/empresa/dashboard')}>← Volver</button>
                <h1>Publicar Puesto</h1>
                {mensaje && <p style={{ color: 'red' }}>{mensaje}</p>}
                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '1rem' }}>
                        <label>Descripcion del puesto</label><br />
                        <input value={descripcion} onChange={e => setDescripcion(e.target.value)}
                            style={{ width: '100%' }} required />
                    </div>
                    <div style={{ marginBottom: '1rem' }}>
                        <label>Salario (&#8353;)</label><br />
                        <input type="number" value={salario}
                            onChange={e => setSalario(e.target.value)}
                            style={{ width: '100%' }} required />
                    </div>
                    <div style={{ marginBottom: '1rem' }}>
                        <label>Tipo de publicacion</label><br />
                        <select value={publico} onChange={e => setPublico(e.target.value === 'true')}
                            style={{ width: '100%' }}>
                            <option value="true">Publico</option>
                            <option value="false">Privado</option>
                        </select>
                    </div>

                    <div style={{ marginBottom: '1rem', border: '1px solid #ccc', padding: '1rem' }}>
                        <h3>Requisitos</h3>
                        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
                            <select value={selCar} onChange={e => setSelCar(e.target.value)}>
                                <option value="">Seleccione caracteristica</option>
                                {hojas.map(c => (
                                    <option key={c.id} value={c.id}>
                                        {c.padreNombre ? c.padreNombre + ' / ' : ''}{c.nombre}
                                    </option>
                                ))}
                            </select>
                            <select value={selNivel} onChange={e => setSelNivel(e.target.value)}>
                                {[1, 2, 3, 4, 5].map(n => (
                                    <option key={n} value={n}>Nivel {n}</option>
                                ))}
                            </select>
                            <button type="button" onClick={agregarRequisito}>Agregar</button>
                        </div>
                        {requisitos.length === 0
                            ? <p>Sin requisitos agregados.</p>
                            : <ul>
                                {requisitos.map(r => (
                                    <li key={r.caracteristicaId}>
                                        {r.nombre} — Nivel {r.nivelRequerido}
                                        <button type="button"
                                            onClick={() => quitarRequisito(r.caracteristicaId)}
                                            style={{ marginLeft: '0.5rem', color: 'red' }}>
                                            ✕
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        }
                    </div>

                    <button type="submit">Publicar puesto</button>
                </form>
            </div>
            <Footer />
        </div>
    );
}
