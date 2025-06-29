import { createContext, useEffect, useState } from "react";
import { getMeals } from "./API";
import { useReducer } from "react";
export const AppContext = createContext();
const initialState = {
  cart: [],
  amount: 0,
  total: 0,
  payment: {},
  information: {},
  formUser: null,
  isSwitchOn: false,
};
const AppProvider = ({ children }) => {
  const [menu, setMenu] = useState([]);
  const [isInitialized, setIsInitialized] = useState(false);
  const url = import.meta.env.VITE_PUBLIC_PRODUCTS_URL;

  useEffect(() => {
    async function getData() {
      const data = await getMeals();
      setMenu(data);
    }
    getData();
  }, []);
  const Reducer = (state, action) => {
    switch (action.type) {
      case "CLEAR_CART":
        return { ...state, cart: [], total: 0, amount: 0 };
      case "REMOVE":
        return {
          ...state,
          cart: state.cart.filter((item) => item.id !== action.payload),
        };
      case "INCREASE": {
        const newCart = state.cart.map((item) => {
          if (item.id === action.payload) {
            return { ...item, amount: item.amount + 1 };
          }
          return item;
        });
        return { ...state, cart: newCart };
      }
      case "DECREASE": {
        const newCart = state.cart
          .map((item) => {
            if (item.id === action.payload) {
              return { ...item, amount: item.amount - 1 };
            }
            return item;
          })
          .filter((item) => item.amount > 0);
        return { ...state, cart: newCart };
      }
      case "TOGGLE_SIZE": {
        const isSwitchOn = !state.isSwitchOn;
        const updatedCart = state.cart.map((item) => {
          const newPrice = isSwitchOn ? item.price[1] : item.price[0];
          const newImage = isSwitchOn ? item.image[1] : item.image[0];
          return { ...item, displayPrice: newPrice, displayImage: newImage };
        });
        return { ...state, cart: updatedCart, isSwitchOn };
      }
      case "GET_TOTAL": {
        let { amount, total } = state.cart.reduce(
          (cartTotal, cartItem) => {
            const itemPrice = cartItem.displayPrice || cartItem.price[0];
            cartTotal.amount += cartItem.amount;
            cartTotal.total += cartItem.amount * itemPrice;
            return cartTotal;
          },
          { total: 0, amount: 0 }
        );
        total = parseFloat(total.toFixed(2));
        return { ...state, amount, total };
      }

      // case "GET_TOTAL": {
      //   let { amount, total } = state.cart.reduce(
      //     (cartTotal, cartItem) => {
      //       // 1. Safely get price (fallback to 0 if invalid)
      //       const rawPrice = cartItem.displayPrice ?? cartItem.price[0];
      //       const itemPrice = typeof rawPrice === "number" ? rawPrice : 0;

      //       // 2. Validate before calculation
      //       if (isNaN(itemPrice)) {
      //         console.error("Invalid price detected:", cartItem);
      //         return cartTotal;
      //       }

      //       // 3. Accumulate with fixed precision
      //       cartTotal.amount += Number(cartItem.amount) || 0;
      //       cartTotal.total += Number((itemPrice * cartItem.amount).toFixed(2));

      //       return cartTotal;
      //     },
      //     { total: 0, amount: 0 }
      //   );

      //   // 4. Final validation
      //   total = Number(total.toFixed(2));
      //   if (isNaN(total)) total = 0;

      //   return { ...state, amount, total };
      // }
      case "ADD_TO_CART": {
        const newProduct = menu.find(
          (product) => product.id === action.payload
        );
        const alreadyProduct = state.cart.find(
          (product) => product.id === action.payload
        );
        if (alreadyProduct) return state;
        const initialPrice = newProduct?.price[0];
        const initialImage = newProduct?.image[0];
        const updatedCart = [
          ...state.cart,
          {
            ...newProduct,
            displayPrice: initialPrice,
            displayImage: initialImage,
          },
        ];
        return { ...state, cart: updatedCart };
      }
      case "PAYMENT": {
        return { ...state, payment: action.payload };
      }
      case "INFORMATION": {
        return {
          ...state,
          information: action.payload,
        };
      }
      case "LOAD_CART": {
        return { ...state, cart: action.payload };
      }
      case "UPDATE_ITEM_PRICE": {
        const { id, newPrice, newImage } = action.payload;
        const updatedCart = state.cart.map((item) =>
          item.id === id
            ? { ...item, displayPrice: newPrice, displayImage: newImage }
            : item
        );
        return { ...state, cart: updatedCart };
      }
      case "SET_FORM_USER": {
        return {
          ...state,
          formUser: action.payload,
        };
      }
      case "LOGOUT": {
        return {
          ...state,
          formUser: null,
        };
      }
      case "SET_AUTH": {
        return {
          ...state,
          formUser: action.payload.user,
          auth: {
            isAuthenticated: true,
            user_role: action.payload.user?.user_role || "customer",
          },
        };
      }
      default:
        return state;
    }
  };
  const [state, dispatch] = useReducer(Reducer, initialState);
  const addTocart = (id) => {
    dispatch({ type: "ADD_TO_CART", payload: id });
    dispatch({ type: "GET_TOTAL" });
  };
  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
    dispatch({ type: "GET_TOTAL" });
  };
  const remove = (id) => {
    dispatch({ type: "REMOVE", payload: id });
    dispatch({ type: "GET_TOTAL" });
  };
  const increase = (id) => {
    dispatch({ type: "INCREASE", payload: id });
    dispatch({ type: "GET_TOTAL" });
  };
  const decrease = (id) => {
    dispatch({ type: "DECREASE", payload: id });
    dispatch({ type: "GET_TOTAL" });
  };

  const updateItemPrice = (id, newPrice, newImage) => {
    dispatch({
      type: "UPDATE_ITEM_PRICE",
      payload: { id, newPrice, newImage },
    });
    dispatch({ type: "GET_TOTAL" }); // Ensure totals are recalculated
  };
  const toggleSize = () => {
    dispatch({ type: "TOGGLE_SIZE" });
  };
  const handleToggleSize = (id) => {
    const newSize = !state.isSwitchOn;
    const item = menu.find((item) => item.id === id);
    const newPrice = newSize ? item?.price[1] : item?.price[0];
    const newImage = newSize ? item?.image[1] : item?.image[0];
    updateItemPrice(id, newPrice, newImage); // Pass both newPrice and newImage
    toggleSize();
  };
  const cartInformation = (information) => {
    sessionStorage.setItem("information", JSON.stringify(information));
    dispatch({ type: "INFORMATION", payload: information });
  };
  const cartPayment = (payment) => {
    sessionStorage.setItem("payment", JSON.stringify(payment));
    dispatch({ type: "PAYMENT", payload: payment });
  };
  const setFormUser = (user) => {
    sessionStorage.setItem("formUser", JSON.stringify(user));
    // dispatch({
    //   type: "SET_AUTH",
    //   payload: { user },
    // });
    dispatch({ type: "SET_FORM_USER", payload: user });
  };
  const logout = async () => {
    try {
      sessionStorage.removeItem("formUser");
      sessionStorage.removeItem("token");
      dispatch({ type: "LOGOUT" });
      window.location.href = "/";
    } catch (error) {
      console.error("Logout error:", error);
      throw error; // Re-throw to handle in components
    }
  };

  useEffect(() => {
    if (isInitialized) return;

    const initializeState = () => {
      const storedCart = sessionStorage.getItem("restaurantCart");
      if (storedCart) {
        dispatch({ type: "LOAD_CART", payload: JSON.parse(storedCart) });
      }

      try {
        const savedFormUser = sessionStorage.getItem("formUser");
        if (savedFormUser) {
          const user = JSON.parse(savedFormUser);
          setFormUser(user);

          // Verify the user object has required fields
          if (user && user.email) {
            dispatch({ type: "SET_FORM_USER", payload: user });
          }
        }
      } catch (e) {
        console.warn("Failed to load form user", e);
      }

      // Load payment
      const storedPayment = sessionStorage.getItem("payment");
      if (storedPayment) {
        dispatch({ type: "PAYMENT", payload: JSON.parse(storedPayment) });
      }

      // Load shipping
      const storedShipping = sessionStorage.getItem("information");
      if (storedShipping) {
        dispatch({ type: "INFORMATION", payload: JSON.parse(storedShipping) });
      }

      setIsInitialized(true);
    };

    initializeState();
  }, [isInitialized]);
  //   // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (!isInitialized) return;
    sessionStorage.setItem("restaurantCart", JSON.stringify(state.cart));
    dispatch({ type: "GET_TOTAL" });
  }, [state.cart, isInitialized]);
  const checkAuthStatus = async () => {
    try {
      const token = sessionStorage.getItem("token");
      console.log("check token", token);

      if (!token) return null;

      const response = await fetch(`${url}/auth/verify`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        sessionStorage.removeItem("token");
        return null;
      }

      const data = await response.json();
      sessionStorage.setItem("token", data.token);
      sessionStorage.setItem("formUser", JSON.stringify(data.user));

      console.log("Auth check response:", data);

      return data;
    } catch (error) {
      console.error("Auth check error:", error);
      return null;
    }
  };
  return (
    <AppContext.Provider
      value={{
        ...state,
        handleToggleSize,
        clearCart,
        remove,
        increase,
        decrease,
        cartPayment,
        checkAuthStatus,
        setFormUser,
        addTocart,
        logout,
        updateItemPrice,
        cartInformation,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
