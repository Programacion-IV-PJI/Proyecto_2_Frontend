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

    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Navbar />
            <div style={{ padding: '2rem', flex: 1 }}>
                <h1>Dashboard Empresa</h1>
                <button onClick={() => navigate('/empresa/crear-puesto')}
                    style={{ marginBottom: '1rem' }}>
                    Publicar nuevo puesto
                </button>
                {mensaje && <p style={{ color: 'green' }}>{mensaje}</p>}
                {puestos.length === 0
                    ? <p>No tienes puestos publicados.</p>
                    : <table border="1" cellPadding="8"
                        style={{ borderCollapse: 'collapse', width: '100%' }}>
                        <thead>
                            <tr>
                                <th>Descripcion</th>
                                <th>Salario</th>
                                <th>Tipo</th>
                                <th>Estado</th>
                                <th>Requisitos</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {puestos.map(p => (
                                <tr key={p.id}>
                                    <td>{p.descripcion}</td>
                                    <td>&#8353;{p.salario}</td>
                                    <td>{p.publico ? 'Publico' : 'Privado'}</td>
                                    <td>{p.activo ? 'Activo' : 'Inactivo'}</td>
                                    <td>
                                        {p.requisitos.map((r, i) => (
                                            <div key={i}>
                                                {r.padreNombre ? r.padreNombre + ' / ' : ''}
                                                {r.caracteristicaNombre} (nivel {r.nivelRequerido})
                                            </div>
                                        ))}
                                    </td>
                                    <td>
                                        <button
                                            onClick={() => navigate(`/empresa/candidatos/${p.id}`)}>
                                            Ver candidatos
                                        </button>
                                        {p.activo && (
                                            <button
                                                onClick={() => desactivar(p.id)}
                                                style={{ marginLeft: '0.5rem', color: 'red' }}>
                                                Desactivar
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                }
            </div>
            <Footer />
        </div>
    );
}
