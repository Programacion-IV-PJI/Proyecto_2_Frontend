import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from '../../features/auth/pages/Login';
import Home from '../../features/publico/pages/Home';
import BuscarPuestos from '../../features/publico/pages/BuscarPuestos';
import RegistroOferente from '../../features/oferente/pages/RegistroOferente';
import DashboardOferente from '../../features/oferente/pages/DashboardOferente';
import Habilidades from '../../features/oferente/pages/Habilidades';
import SubirCV from '../../features/oferente/pages/SubirCV';

export default function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/buscar" element={<BuscarPuestos />} />
                <Route path="/oferente/registro" element={<RegistroOferente />} />
                <Route path="/oferente/dashboard" element={<DashboardOferente />} />
                <Route path="/oferente/habilidades" element={<Habilidades />} />
                <Route path="/oferente/cv" element={<SubirCV />} />
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </BrowserRouter>
    );
}
