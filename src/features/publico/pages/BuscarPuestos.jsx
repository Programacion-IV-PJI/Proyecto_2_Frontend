import { useEffect, useState } from 'react';
import Navbar from '../../../shared/components/Navbar';
import Footer from '../../../shared/components/Footer';

export default function BuscarPuestos() {
    const [caracteristicas, setCaracteristicas] = useState([]);
    const [seleccionadas, setSeleccionadas] = useState([]);
    const [resultados, setResultados] = useState([]);
    const [buscado, setBuscado] = useState(false);

    useEffect(() => {
        fetch('http://localhost:8080/api/admin/caracteristicas')
            .then(r => r.json())
            .then(setCaracteristicas)
            .catch(console.error);
    }, []);

    const toggle = (id) => {
        setSeleccionadas(prev =>
            prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
    };

    const buscar = async () => {
        const params = seleccionadas.length > 0
            ? '?caracteristicas=' + seleccionadas.join(',') : '';
        const res = await fetch('http://localhost:8080/api/puestos/buscar' + params);
        const data = await res.json();
        setResultados(data);
        setBuscado(true);
    };

    const raices = caracteristicas.filter(c => !c.padreId);
    const hijos = (padreId) => caracteristicas.filter(c => c.padreId === padreId);

    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Navbar />
            <div style={{ padding: '2rem', flex: 1, display: 'flex', gap: '2rem' }}>
                <div style={{ width: '280px' }}>
                    <h2>Buscar Puestos</h2>
                    {raices.map(r => (
                        <div key={r.id}>
                            <strong>{r.nombre}</strong>
                            <div style={{ marginLeft: '1rem' }}>
                                {hijos(r.id).map(h => (
                                    <div key={h.id}>
                                        <input type="checkbox"
                                               checked={seleccionadas.includes(h.id)}
                                               onChange={() => toggle(h.id)} />
                                        <label> {h.nombre}</label>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                    <br />
                    <button onClick={buscar}>Buscar</button>
                </div>
                <div style={{ flex: 1 }}>
                    <h2>Resultados</h2>
                    {buscado && resultados.length === 0 && <p>Sin resultados.</p>}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
                        {resultados.map(p => (
                            <div key={p.id}
                                 style={{ border: '1px solid #ccc', padding: '1rem', width: '200px' }}>
                                <strong>{p.empresaNombre}</strong>
                                <p>{p.descripcion}</p>
                                <p>&#8353;{p.salario}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
