import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
    const navigate = useNavigate();
    const nombre = localStorage.getItem('nombre');

    function logout() {
        localStorage.clear();
        navigate("/");
    }

    const cardStyle = {
        background: '#253447',
        borderRadius: '12px',
        padding: '1.5rem',
        width: '220px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
        borderLeft: '4px solid #5f8f9e',
        cursor: 'pointer',
        transition: 'transform 0.2s'
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
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <span style={{ color: '#aaa' }}>{nombre}</span>
                    <button onClick={logout} style={{
                        background: '#5f8fa3', border: 'none', color: 'white',
                        cursor: 'pointer', fontSize: '1rem', padding: '0.5rem 1.2rem',
                        borderRadius: '20px', fontWeight: 'bold'
                    }}>Salir</button>
                </div>
            </nav>

            <div style={{ padding: '2rem' }}>
                <h1 style={{ color: 'white', marginBottom: '0.5rem' }}>Panel Administrador</h1>
                <p style={{ color: '#aaa', marginBottom: '2rem' }}>Bienvenido, {nombre}</p>

                <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
                    <div style={cardStyle} onClick={() => navigate("/admin/empresas-pendientes")}>
                        <h3 style={{ color: 'white', margin: '0 0 0.5rem 0' }}>Empresas Pendientes</h3>
                        <p style={{ color: '#aaa', fontSize: '0.85rem', margin: 0 }}>
                            Aprobar o rechazar registros de empresas
                        </p>
                    </div>

                    <div style={cardStyle} onClick={() => navigate("/admin/oferentes-pendientes")}>
                        <h3 style={{ color: 'white', margin: '0 0 0.5rem 0' }}>Oferentes Pendientes</h3>
                        <p style={{ color: '#aaa', fontSize: '0.85rem', margin: 0 }}>
                            Aprobar o rechazar registros de oferentes
                        </p>
                    </div>

                    <div style={cardStyle} onClick={() => navigate("/admin/caracteristicas")}>
                        <h3 style={{ color: 'white', margin: '0 0 0.5rem 0' }}>Características</h3>
                        <p style={{ color: '#aaa', fontSize: '0.85rem', margin: 0 }}>
                            Gestionar el catálogo de habilidades
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}