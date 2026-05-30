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

    if (!perfil) return <p>Cargando...</p>;

    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Navbar />
            <div style={{ padding: '2rem', flex: 1 }}>
                <h1>Bienvenido, {perfil.nombre} {perfil.primerApellido}</h1>
                <p>Correo: {perfil.correo}</p>
                <p>Residencia: {perfil.residencia}</p>
                <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                    <button onClick={() => navigate('/oferente/habilidades')}>
                        Mis Habilidades
                    </button>
                    <button onClick={() => navigate('/oferente/cv')}>
                        Subir CV
                    </button>
                    {perfil.cvPath && (
                        <a href={'http://localhost:8080/api/oferentes/cv/' + perfil.cvPath}
                           target="_blank" rel="noreferrer">
                            <button>Ver mi CV</button>
                        </a>
                    )}
                </div>
                <h2 style={{ marginTop: '2rem' }}>Mis Habilidades</h2>
                {perfil.habilidades.length === 0
                    ? <p>No tienes habilidades registradas.</p>
                    : <ul>
                        {perfil.habilidades.map(h => (
                            <li key={h.id}>
                                {h.padreNombre ? h.padreNombre + ' / ' : ''}
                                {h.caracteristicaNombre} — Nivel {h.nivel}
                            </li>
                        ))}
                    </ul>
                }
            </div>
            <Footer />
        </div>
    );
}
