import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Navigate,
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
import Login, { action as loginAction } from "./components/Login";
import Information from "./components/Information";
import Payment from "./components/Payment";
import Bill from "./components/Bill";
import Gallery, { loader as galleryLoader } from "./components/Gallery";
import Testimonial from "./components/Testimonial";
import Signup from "./components/Signup";
import Google from "./components/Google";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "./data/AppProvider";

function App() {
  const [authState, setAuthState] = useState({
    isAuthenticated: false,
    userRole: null,
    checked: false,
  });
  const { setFormUser, checkAuthStatus } = useContext(AppContext);

  const setAuth = (userData) => {
    setAuthState({
      isAuthenticated: true,
      userRole: userData?.user_role || "customer",
      checked: true,
    });
  };
  useEffect(() => {
    const verifyAuth = async () => {
      try {
        const user = await checkAuthStatus();

        if (user) {
          setAuthState({
            isAuthenticated: true,
            userRole: user.user?.user_role || "customer",
            checked: true,
          });
          setFormUser(user?.user);

          // sessionStorage.setItem("token", user.token);
        } else {
          setAuthState({
            isAuthenticated: false,
            userRole: null,
            checked: true,
          });
          sessionStorage.removeItem("token");
        }
      } catch (error) {
        setAuthState({
          isAuthenticated: false,
          userRole: null,
          checked: true,
        });
      }
    };

    verifyAuth();
  }, []);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />} errorElement={<Error />}>
        <Route index element={<HomePage />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="information" element={<Information />} />
        <Route path="payment" element={<Payment />} />
        <Route path="bill" element={<Bill />} />
        <Route path="testimonial" element={<Testimonial />} />
        <Route path="gallery" element={<Gallery />} loader={galleryLoader} />
        <Route path="signup" element={<Signup />} />
        <Route path="google" element={<Google />} />

        <Route
          path="/cart"
          element={
            authState.isAuthenticated ? (
              <Cart />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route path="ordre" element={<Ordre />} />
        <Route path="location" element={<Location />} />
        <Route path="reserver" element={<Reservation />} />

        <Route
          path="/login"
          action={loginAction}
          element={
            !authState.isAuthenticated ? (
              <Login setAuth={setAuth} />
            ) : (
              <Navigate to="/cart" replace />
            )
          }
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
  if (!authState.checked) {
    return <div>Loading...</div>; // Or your custom loader
  }
  return <RouterProvider router={router} />;
}

export default App;
