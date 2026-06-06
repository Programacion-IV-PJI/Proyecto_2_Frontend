import { useEffect, useState } from "react";
import { apiFetch } from "../../../shared/api/apiClient";

export default function EmpresasPendientes() {
    const [empresas, setEmpresas] = useState([]);

    useEffect(() => {
        apiFetch("/api/admin/empresas/pendientes").then(setEmpresas).catch(console.error);
    }, []);

    async function aprobar(id) {
        await apiFetch(`/api/admin/empresas/${id}/aprobar`, { method: "POST" });
        setEmpresas(prev => prev.filter(e => e.id !== id));
    }

    async function rechazar(id) {
        await apiFetch(`/api/admin/empresas/${id}/rechazar`, { method: "PUT" });
        setEmpresas(prev => prev.filter(e => e.id !== id));
    }

    return (
        <div style={{ padding: 24 }}>
            <h2>Empresas Pendientes</h2>
            {empresas.length === 0 && <p>No hay empresas pendientes.</p>}
            {empresas.map(e => (
                <div key={e.id} style={{ border: "1px solid #ccc", padding: 12, marginBottom: 8 }}>
                    <p><strong>{e.nombre}</strong> — {e.correo}</p>
                    <button onClick={() => aprobar(e.id)}>Aprobar</button>{" "}
                    <button onClick={() => rechazar(e.id)}>Rechazar</button>
                </div>
            ))}
        </div>
    );
}