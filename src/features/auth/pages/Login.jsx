import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiFetch } from "../../../shared/api/apiClient";

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    async function handleLogin(e) {
        e.preventDefault();
        setError("");
        try {
            const data = await apiFetch("/api/auth/login", {
                method: "POST",
                body: JSON.stringify({ identificacion: username, clave: password }),
            });
            localStorage.setItem("token", data.token);
            localStorage.setItem("rol", data.rol);
            localStorage.setItem("id", data.id);
            localStorage.setItem("nombre", data.nombre);

            if (data.rol === "EMPRESA") navigate("/empresa/dashboard");
            else if (data.rol === "OFERENTE") navigate("/oferente/dashboard");
            else if (data.rol === "ADMIN") navigate("/admin/dashboard");
            else navigate("/");
        } catch (err) {
            setError("Credenciales incorrectas");
        }
    }

    return (
        <div style={{ maxWidth: 400, margin: "80px auto", padding: 24 }}>
            <h2>Iniciar Sesión</h2>
            <form onSubmit={handleLogin}>
                <div style={{ marginBottom: 12 }}>
                    <label>Usuario / Correo</label><br />
                    <input value={username} onChange={e => setUsername(e.target.value)}
                           style={{ width: "100%", padding: 8 }} required />
                </div>
                <div style={{ marginBottom: 12 }}>
                    <label>Contraseña</label><br />
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)}
                           style={{ width: "100%", padding: 8 }} required />
                </div>
                {error && <p style={{ color: "red" }}>{error}</p>}
                <button type="submit" style={{ padding: "8px 24px" }}>Entrar</button>
            </form>
        </div>
    );
}