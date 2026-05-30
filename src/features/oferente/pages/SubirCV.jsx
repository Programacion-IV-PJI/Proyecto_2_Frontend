import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../../shared/components/Navbar';
import Footer from '../../../shared/components/Footer';

export default function SubirCV() {
    const [archivo, setArchivo] = useState(null);
    const [mensaje, setMensaje] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async e => {
        e.preventDefault();
        if (!archivo) return;
        const formData = new FormData();
        formData.append('archivo', archivo);
        const token = localStorage.getItem('token');
        const res = await fetch('http://localhost:8080/api/oferentes/cv', {
            method: 'POST',
            headers: { Authorization: 'Bearer ' + token },
            body: formData
        });
        if (res.ok) setMensaje('CV subido correctamente.');
        else setMensaje('Error al subir el CV.');
    };

    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Navbar />
            <div style={{ padding: '2rem', maxWidth: '400px', margin: '0 auto', flex: 1 }}>
                <button onClick={() => navigate('/oferente/dashboard')}>← Volver</button>
                <h1>Subir CV</h1>
                {mensaje && <p style={{ color: 'green' }}>{mensaje}</p>}
                <form onSubmit={handleSubmit}>
                    <input type="file" accept=".pdf"
                           onChange={e => setArchivo(e.target.files[0])} required />
                    <br /><br />
                    <button type="submit">Subir CV</button>
                </form>
            </div>
            <Footer />
        </div>
    );
}
