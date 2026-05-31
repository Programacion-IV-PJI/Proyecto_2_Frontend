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
            .then(data => {
                setCandidatos(data || []);
                setCargando(false);
            })
            .catch(() => setCargando(false));
    }, [puestoId]);

    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Navbar />
            <div style={{ padding: '2rem', flex: 1 }}>
                <button onClick={() => navigate('/empresa/dashboard')}>← Volver</button>
                <h1>Candidatos para el puesto</h1>
                {cargando && <p>Cargando...</p>}
                {!cargando && candidatos.length === 0 && <p>No hay candidatos registrados.</p>}
                {candidatos.length > 0 && (
                    <table border="1" cellPadding="8"
                        style={{ borderCollapse: 'collapse', width: '100%' }}>
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Apellido</th>
                                <th>Correo</th>
                                <th>Telefono</th>
                                <th>Residencia</th>
                                <th>Requisitos cumplidos</th>
                                <th>Porcentaje</th>
                                <th>CV</th>
                            </tr>
                        </thead>
                        <tbody>
                            {candidatos.map(c => (
                                <tr key={c.oferenteId}>
                                    <td>{c.nombre}</td>
                                    <td>{c.primerApellido}</td>
                                    <td>{c.correo}</td>
                                    <td>{c.telefono}</td>
                                    <td>{c.residencia}</td>
                                    <td>{c.cumplidas} / {c.total}</td>
                                    <td>{c.porcentaje}%</td>
                                    <td>
                                        {c.cvPath
                                            ? <a href={`http://localhost:8080/api/oferentes/cv/${c.cvPath}`}
                                                target="_blank" rel="noreferrer">
                                                Ver CV
                                              </a>
                                            : 'Sin CV'
                                        }
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
