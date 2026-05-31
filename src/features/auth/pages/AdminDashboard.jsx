import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
    const navigate = useNavigate();
    function logout() { localStorage.clear(); navigate("/login"); }

    return (
        <div style={{ padding: 24 }}>
            <h2>Panel Administrador</h2>
            <button onClick={() => navigate("/admin/empresas-pendientes")}>Empresas Pendientes</button>{" "}
            <button onClick={() => navigate("/admin/oferentes-pendientes")}>Oferentes Pendientes</button>{" "}
            <button onClick={() => navigate("/admin/caracteristicas")}>Características</button>{" "}
            <button onClick={logout} style={{ marginLeft: 16 }}>Cerrar Sesión</button>
        </div>
    );
}