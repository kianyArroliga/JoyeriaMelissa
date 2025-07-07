import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/clientes/Registro"; 
import Login from "./pages/clientes/Login";
import DashboardAdmin from "./pages/admin/DashboardAdmin";
import Productos from "./pages/admin/Productos";
import Cuentas from "./pages/admin/Cuentas";
import Stock from "./pages/admin/Stock";
import Pedidos from "./pages/admin/Pedidos";

function App() {
  return (
    <Router>
      <Routes>

        {/* Rutas de clientes */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Rutas de administrador */}
        <Route path="/admin" element={<DashboardAdmin />} />
        <Route path="/admin/productos" element={<Productos />} />
        <Route path="/admin/cuentas" element={<Cuentas />} />
        <Route path="/admin/pedidos" element={<Pedidos />} />
        <Route path="/admin/stock" element={<Stock />} />

      </Routes>
    </Router>
  );
}

export default App;
