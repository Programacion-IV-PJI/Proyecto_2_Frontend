import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from '../../features/auth/pages/Login';
import Home from '../../features/publico/pages/Home';
import BuscarPuestos from '../../features/publico/pages/BuscarPuestos';
import RegistroOferente from '../../features/oferente/pages/RegistroOferente';
import DashboardOferente from '../../features/oferente/pages/DashboardOferente';
import Habilidades from '../../features/oferente/pages/Habilidades';
import SubirCV from '../../features/oferente/pages/SubirCV';
import RegistroEmpresa from '../../features/empresa/pages/RegistroEmpresa';
import DashboardEmpresa from '../../features/empresa/pages/DashboardEmpresa';
import CrearPuesto from '../../features/empresa/pages/CrearPuesto';
import BuscarCandidatos from '../../features/empresa/pages/BuscarCandidatos';
import AdminDashboard from '../../features/admin/pages/AdminDashboard';
import EmpresasPendientes from '../../features/admin/pages/EmpresasPendientes';
import OferentesPendientes from '../../features/admin/pages/OferentesPendientes';
import Caracteristicas from '../../features/admin/pages/Caracteristicas';

export default function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Publico */}
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/buscar" element={<BuscarPuestos />} />

                {/* Oferente */}
                <Route path="/oferente/registro" element={<RegistroOferente />} />
                <Route path="/oferente/dashboard" element={<DashboardOferente />} />
                <Route path="/oferente/habilidades" element={<Habilidades />} />
                <Route path="/oferente/cv" element={<SubirCV />} />

                {/* Empresa */}
                <Route path="/empresa/registro" element={<RegistroEmpresa />} />
                <Route path="/empresa/dashboard" element={<DashboardEmpresa />} />
                <Route path="/empresa/crear-puesto" element={<CrearPuesto />} />
                <Route path="/empresa/candidatos/:puestoId" element={<BuscarCandidatos />} />

                {/* Admin */}
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
                <Route path="/admin/empresas-pendientes" element={<EmpresasPendientes />} />
                <Route path="/admin/oferentes-pendientes" element={<OferentesPendientes />} />
                <Route path="/admin/caracteristicas" element={<Caracteristicas />} />

                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </BrowserRouter>
    );
}