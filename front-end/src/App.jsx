import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import Layout from "./frontPage/Layout";
import HomePage from "./frontPage/Homepage";
import Contact from "./components/Contact";
import About from "./components/About";
import Menu, { loader as menuLoader } from "./components/Menu";
import MealDetail, {
  loader as menuDetailLoader,
} from "./components/MealDetail";
import Cart from "./components/Cart";
import Ordre from "./components/Ordre";
import Location from "./components/Location";
import Error from "./frontPage/Error";
import Reservation from "./components/Reservation";
import NotFound from "./frontPage/NotFound";
import Login, {
  loader as loginLoader,
  action as loginAction,
} from "./components/Login";
import RequiredAuth from "./components/RequiredAuth";
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />} errorElement={<Error />}>
      <Route index element={<HomePage />} />
      <Route />
      <Route path="about" element={<About />} />
      <Route path="contact" element={<Contact />} />
      <Route
        path="cart"
        element={<Cart />}
        loader={async () => await RequiredAuth()}
      />
      <Route path="ordre" element={<Ordre />} />
      <Route path="location" element={<Location />} />
      <Route path="reserver" element={<Reservation />} />
      <Route
        path="login"
        element={<Login />}
        loader={loginLoader}
        action={loginAction}
      />
      <Route path="menu" element={<Menu />} loader={menuLoader} />
      <Route
        path="menu/:id"
        element={<MealDetail />}
        loader={menuDetailLoader}
      />
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
