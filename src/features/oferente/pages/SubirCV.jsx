import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../../shared/components/Navbar';
import Footer from '../../../shared/components/Footer';

export default function SubirCV() {
    const [archivo, setArchivo] = useState(null);
    const [mensaje, setMensaje] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async e => {
        e.preventDefault();
        if (!archivo) return;
        setMensaje('');
        setError('');

        const formData = new FormData();
        formData.append('archivo', archivo);
        const token = localStorage.getItem('token');

        try {
            const res = await fetch('http://localhost:8080/api/oferentes/cv', {
                method: 'POST',
                headers: { Authorization: 'Bearer ' + token },
                body: formData
            });
            if (res.ok) setMensaje('CV subido correctamente.');
            else {
                const txt = await res.text();
                setError('Error: ' + txt);
            }
        } catch {
            setError('Error conectando con el servidor.');
        }
    };

    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#1e2a38' }}>
            <Navbar />
            <div style={{ padding: '2rem', flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
                <div style={{
                    background: '#253447', borderRadius: '12px',
                    padding: '2rem', width: '400px',
                    borderLeft: '4px solid #5f8f9e',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
                }}>
                    <button onClick={() => navigate('/oferente/dashboard')} style={{
                        background: '#1e2a38', color: '#5f8f9e',
                        border: '1px solid #5f8f9e', borderRadius: '8px',
                        padding: '0.5rem 1rem', cursor: 'pointer',
                        fontWeight: 'bold', marginBottom: '1.5rem'
                    }}>
                         Volver
                    </button>

                    <h1 style={{ color: 'white', margin: '0 0 0.5rem 0' }}>Subir CV</h1>
                    <p style={{ color: '#aaa', fontSize: '0.85rem', marginBottom: '1.5rem' }}>
                        Solo se aceptan archivos en formato PDF.
                    </p>

                    {mensaje && (
                        <div style={{
                            background: '#1a4a3a', border: '1px solid #4caf50',
                            borderRadius: '8px', padding: '0.8rem',
                            color: '#4caf50', marginBottom: '1rem'
                        }}>
                             {mensaje}
                        </div>
                    )}
                    {error && (
                        <div style={{
                            background: '#3a2a2a', border: '1px solid #f44336',
                            borderRadius: '8px', padding: '0.8rem',
                            color: '#f44336', marginBottom: '1rem'
                        }}>
                            ✕ {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        <div style={{
                            border: '2px dashed #5f8f9e', borderRadius: '10px',
                            padding: '2rem', textAlign: 'center',
                            marginBottom: '1.5rem', cursor: 'pointer'
                        }}>
                            <p style={{ color: '#aaa', margin: '0 0 1rem 0' }}>
                                {archivo ? `${archivo.name}` : 'Selecciona un archivo PDF'}
                            </p>
                            <input
                                type="file"
                                accept=".pdf"
                                onChange={e => setArchivo(e.target.files[0])}
                                required
                                style={{ color: '#aaa' }}
                            />
                        </div>
                        <button type="submit" style={{
                            width: '100%', padding: '0.8rem',
                            background: '#5f8f9e', color: 'white',
                            border: 'none', borderRadius: '8px',
                            cursor: 'pointer', fontWeight: 'bold',
                            fontSize: '1rem'
                        }}>
                            Subir CV
                        </button>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    );
}