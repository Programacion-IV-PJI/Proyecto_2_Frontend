import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../../shared/components/Navbar';
import Footer from '../../../shared/components/Footer';

export default function RegistroEmpresa() {
    const [form, setForm] = useState({
        nombre: '', localizacion: '', correo: '',
        telefono: '', descripcion: ''
    });
    const [mensaje, setMensaje] = useState('');
    const navigate = useNavigate();

    const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async e => {
        e.preventDefault();
        const res = await fetch('http://localhost:8080/api/empresas/registro', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form)
        });
        if (res.ok) setMensaje('Registro enviado. Espere aprobacion del administrador.');
        else setMensaje('Error al registrar.');
    };

    const campos = [
        ['nombre', 'Nombre de la empresa'],
        ['localizacion', 'Localizacion'],
        ['correo', 'Correo electronico'],
        ['telefono', 'Telefono'],
        ['descripcion', 'Descripcion']
    ];

    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Navbar />
            <div style={{ padding: '2rem', maxWidth: '500px', margin: '0 auto', flex: 1 }}>
                <h1>Registro de Empresa</h1>
                {mensaje && <p style={{ color: 'green' }}>{mensaje}</p>}
                <form onSubmit={handleSubmit}>
                    {campos.map(([name, label]) => (
                        <div key={name} style={{ marginBottom: '1rem' }}>
                            <label>{label}</label><br />
                            <input name={name} value={form[name]}
                                onChange={handleChange}
                                style={{ width: '100%' }} required />
                        </div>
                    ))}
                    <button type="submit">Registrarse</button>
                    <button type="button" style={{ marginLeft: '1rem' }}
                        onClick={() => navigate('/')}>Cancelar</button>
                </form>
            </div>
            <Footer />
        </div>
    );
}
