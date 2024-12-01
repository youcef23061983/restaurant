import React, { createContext, useEffect, useState } from "react";
import { getMeals } from "./API";
import { useReducer } from "react";
export const AppContext = createContext();
const initialState = {
  cart: [],
  amount: 0,
  total: 0,
  payment: {},
  information: {},
  isSwitchOn: false,
};

const AppProvider = ({ children }) => {
  const [menu, setMenu] = useState([]);
  const [isSwitchOn, setIsSwitchOn] = useState(false);

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

  useEffect(() => {
    const storedCart = localStorage.getItem("restaurantCart");
    if (storedCart) {
      dispatch({ type: "LOAD_CART", payload: JSON.parse(storedCart) });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("restaurantCart", JSON.stringify(state.cart));
  }, [state.cart]);

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
    localStorage.setItem("information", JSON.stringify(information));
    dispatch({ type: "INFORMATION", payload: information });
  };
  const cartPayment = (payment) => {
    localStorage.setItem("payment", JSON.stringify(payment));
    dispatch({ type: "PAYMENT", payload: payment });
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
        addTocart,
        updateItemPrice,
        cartInformation,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
