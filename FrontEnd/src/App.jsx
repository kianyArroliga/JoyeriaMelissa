import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  createRoutesFromElements,
  Route,
  ScrollRestoration,
  Navigate,
} from "react-router-dom";

import Header from "./components/ui/home/Header/Header";
import HeaderBottom from "./components/ui/home/Header/HeaderBottom";
import Footer from "./components/ui/home/Footer/Footer";
import FooterBottom from "./components/ui/home/Footer/FooterBottom";
import SpecialCase from "./components/ui/SpecialCase/SpecialCase";
import ErrorPage from "./components/ui/ErrorPage/ErrorPage";

//import "slick-carousel/slick/slick.css";
//import "slick-carousel/slick/slick-theme.css";

// Páginas cliente
import Inicio from "./pages/clientes/Inicio/Inicio";
import Catalogo from "./pages/clientes/Catalogo/Catalogo";
import AcercaDe from "./pages/clientes/AcercaDe/AcercaDe";
import Contacto from "./pages/clientes/Contacto/Contacto";
import PedidoEspecial from "./pages/clientes/PedidoEspecial/PedidoEspecial";
import OfertasEspeciales from "./pages/clientes/OfertasEspeciales/OfertasEspeciales";
import FAQ from "./pages/clientes/FAQ/FAQ";
import Pago from "./pages/clientes/Pago/Pago";
import Carrito from "./pages/clientes/Carrito/Carrito";
import DetallesProducto from "./pages/clientes/DetallesProducto/DetallesProducto";
import Login from "./pages/clientes/Cuenta/Login";
import Registro from "./pages/clientes/Cuenta/Registro"; 
import PerfilUsuario from "./pages/clientes/Cuenta/PerfilUsuario";

// Páginas admin
import DashboardAdmin from "./pages/admin/DashboardAdmin";
import Productos from "./pages/admin/Productos";
import Cuentas from "./pages/admin/Cuentas";
import Stock from "./pages/admin/Stock";
import Pedidos from "./pages/admin/Pedidos";

// Layout para los clientes
const LayoutCliente = () => (
  <div>
    <Header />
    <HeaderBottom />
    <SpecialCase />
    <ScrollRestoration />
    <Outlet />
    <Footer />
    <FooterBottom />
  </div>
);

// Enrutador
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* Redirección raíz */}
      <Route path="/" element={<Navigate to="/clientes" />} />

      {/* Rutas cliente */}
      <Route path="/clientes" element={<LayoutCliente />} errorElement={<ErrorPage />}>
        <Route index element={<Inicio />} />
        <Route path="catalogo" element={<Catalogo />} />
        <Route path="acerca-de" element={<AcercaDe />} />
        <Route path="contacto" element={<Contacto />} />
        <Route path="faq" element={<FAQ />} />
        <Route path="pedido-especial" element={<PedidoEspecial />} />
        <Route path="ofertas-especiales" element={<OfertasEspeciales />} />
        <Route path="carrito" element={<Carrito />} />
        <Route path="pago" element={<Pago />} />
        <Route path="producto/:_id" element={<DetallesProducto />} />
        <Route path="login" element={<Login />} />
        <Route path="registro" element={<Registro />} />
        <Route path="perfil" element={<PerfilUsuario />} />
      </Route>

      {/* Rutas admin */}
      <Route path="/admin" element={<DashboardAdmin />} errorElement={<ErrorPage />} />
      <Route path="/admin/productos" element={<Productos />} />
      <Route path="/admin/cuentas" element={<Cuentas />} />
      <Route path="/admin/stock" element={<Stock />} />
      <Route path="/admin/pedidos" element={<Pedidos />} />
    </>
  )
);

// App principal
function App() {
  return (
    <div className="font-bodyFont">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
