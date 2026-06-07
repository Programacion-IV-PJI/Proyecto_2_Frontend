import { useEffect, useState } from "react";
import { apiFetch } from "../../../shared/api/apiClient";

export default function OferentesPendientes() {
    const [oferentes, setOferentes] = useState([]);

    useEffect(() => {
        apiFetch("/api/admin/oferentes/pendientes").then(setOferentes).catch(console.error);
    }, []);

    async function aprobar(id) {
        await apiFetch(`/api/admin/oferentes/${id}/aprobar`, { method: "POST" });
        setOferentes(prev => prev.filter(o => o.id !== id));
    }

    async function rechazar(id) {
        await apiFetch(`/api/admin/oferentes/${id}/rechazar`, { method: "POST" });
        setOferentes(prev => prev.filter(o => o.id !== id));
    }

    return (
        <div style={{ padding: 24 }}>
            <h2>Oferentes Pendientes</h2>
            {oferentes.length === 0 && <p>No hay oferentes pendientes.</p>}
            {oferentes.map(o => (
                <div key={o.id} style={{ border: "1px solid #ccc", padding: 12, marginBottom: 8 }}>
                    <p><strong>{o.nombre} {o.primerApellido}</strong> — {o.correo}</p>
                    <button onClick={() => aprobar(o.id)}>Aprobar</button>{" "}
                    <button onClick={() => rechazar(o.id)}>Rechazar</button>
                </div>
            ))}
        </div>
    );
}