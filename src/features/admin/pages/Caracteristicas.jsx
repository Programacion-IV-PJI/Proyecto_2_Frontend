import { useEffect, useState } from "react";
import { apiFetch } from "../../../shared/api/apiClient";

export default function Caracteristicas() {
    const [lista, setLista] = useState([]);
    const [nombre, setNombre] = useState("");
    const [padre, setPadre] = useState("");

    useEffect(() => {
        apiFetch("/api/admin/caracteristicas").then(setLista).catch(console.error);
    }, []);

    async function agregar(e) {
        e.preventDefault();
        const body = { nombre, padreId: padre ? parseInt(padre) : null };
        const nueva = await apiFetch("/api/admin/caracteristicas", {
            method: "POST", body: JSON.stringify(body)
        });
        setLista(prev => [...prev, nueva]);
        setNombre(""); setPadre("");
    }

    return (
        <div style={{ padding: 24 }}>
            <h2>Características</h2>
            <form onSubmit={agregar} style={{ marginBottom: 16 }}>
                <input placeholder="Nombre" value={nombre} onChange={e => setNombre(e.target.value)} required style={{ marginRight: 8 }} />
                <input placeholder="ID padre (opcional)" value={padre} onChange={e => setPadre(e.target.value)} style={{ marginRight: 8, width: 180 }} />
                <button type="submit">Agregar</button>
            </form>
            <ul>
                {lista.map(c => (
                    <li key={c.id}>{c.nombre} {c.padre ? `(hijo de: ${c.padre.nombre})` : "(raíz)"}</li>
                ))}
            </ul>
        </div>
    );
}