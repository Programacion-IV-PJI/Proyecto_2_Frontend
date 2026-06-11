import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
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
                <Route path="/oferente/registro" element={<RegistroOferente />} />
                <Route path="/empresa/registro" element={<RegistroEmpresa />} />

                {/* Oferente */}
                <Route path="/oferente/dashboard" element={
                    <ProtectedRoute rol="OFERENTE"><DashboardOferente /></ProtectedRoute>
                } />
                <Route path="/oferente/habilidades" element={
                    <ProtectedRoute rol="OFERENTE"><Habilidades /></ProtectedRoute>
                } />
                <Route path="/oferente/cv" element={
                    <ProtectedRoute rol="OFERENTE"><SubirCV /></ProtectedRoute>
                } />

                {/* Empresa */}
                <Route path="/empresa/dashboard" element={
                    <ProtectedRoute rol="EMPRESA"><DashboardEmpresa /></ProtectedRoute>
                } />
                <Route path="/empresa/crear-puesto" element={
                    <ProtectedRoute rol="EMPRESA"><CrearPuesto /></ProtectedRoute>
                } />
                <Route path="/empresa/candidatos/:puestoId" element={
                    <ProtectedRoute rol="EMPRESA"><BuscarCandidatos /></ProtectedRoute>
                } />

                {/* Admin */}
                <Route path="/admin/dashboard" element={
                    <ProtectedRoute rol="ADMIN"><AdminDashboard /></ProtectedRoute>
                } />
                <Route path="/admin/empresas-pendientes" element={
                    <ProtectedRoute rol="ADMIN"><EmpresasPendientes /></ProtectedRoute>
                } />
                <Route path="/admin/oferentes-pendientes" element={
                    <ProtectedRoute rol="ADMIN"><OferentesPendientes /></ProtectedRoute>
                } />
                <Route path="/admin/caracteristicas" element={
                    <ProtectedRoute rol="ADMIN"><Caracteristicas /></ProtectedRoute>
                } />

                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </BrowserRouter>
    );
}