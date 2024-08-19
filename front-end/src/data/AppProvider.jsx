// import React, { createContext, useEffect, useState } from "react";
// import { getMeals } from "./API";
// import { useReducer } from "react";
// export const AppContext = createContext();
// const initialState = {
//   cart: [],
//   amount: 0,
//   total: 0,
//   payment: {},
//   isSwitchOn: false, // Add isSwitchOn to the initial state
// };

// const AppProvider = ({ children }) => {
//   const [menu, setMenu] = useState([]);
//   const [isSwitchOn, setIsSwitchOn] = useState(false);

//   useEffect(() => {
//     async function getData() {
//       const data = await getMeals();
//       setMenu(data);
//     }
//     getData();
//   }, []);
//   const Reducer = (state, action) => {
//     switch (action.type) {
//       case "CLEAR_CART":
//         return { ...state, cart: [], total: 0, amount: 0 };
//       case "REMOVE":
//         return {
//           ...state,
//           cart: state.cart.filter((item) => item.id !== action.payload),
//         };

//       case "INCREASE": {
//         const newCart = state.cart.map((item) => {
//           if (item.id === action.payload) {
//             return { ...item, amount: item.amount + 1 };
//           }
//           return item;
//         });
//         return { ...state, cart: newCart };
//       }

//       case "DECREASE": {
//         const newCart = state.cart
//           .map((item) => {
//             if (item.id === action.payload) {
//               return { ...item, amount: item.amount - 1 };
//             }
//             return item;
//           })
//           .filter((item) => item.amount > 0);
//         return { ...state, cart: newCart };
//       }

//       case "TOGGLE_SIZE": {
//         const isSwitchOn = !state.isSwitchOn;
//         const updatedCart = state.cart.map((item) => {
//           const newPrice = isSwitchOn
//             ? item.price[1] // Assuming price[1] is for the larger size
//             : item.price[0]; // Default price
//           return { ...item, displayPrice: newPrice };
//         });
//         return { ...state, cart: updatedCart, isSwitchOn };
//       }

//       case "GET_TOTAL": {
//         let { amount, total } = state.cart.reduce(
//           (cartTotal, cartItem) => {
//             const itemPrice = cartItem.displayPrice || cartItem.price[0];
//             cartTotal.amount += cartItem.amount;
//             cartTotal.total += cartItem.amount * itemPrice;
//             return cartTotal;
//           },
//           { total: 0, amount: 0 }
//         );
//         total = parseFloat(total.toFixed(2));
//         return { ...state, amount, total };
//       }

//       case "ADD_TO_CART": {
//         const newProduct = menu.find(
//           (product) => product.id === action.payload
//         );
//         const alreadyProduct = state.cart.find(
//           (product) => product.id === action.payload
//         );
//         if (alreadyProduct) return state;
//         const initialPrice = newProduct?.price[0];
//         const updatedCart = [
//           ...state.cart,
//           { ...newProduct, displayPrice: initialPrice },
//         ];
//         return { ...state, cart: updatedCart };
//       }

//       case "PAYMENT": {
//         return { ...state, payment: action.payload };
//       }

//       case "LOAD_CART": {
//         return { ...state, cart: action.payload };
//       }

//       case "UPDATE_ITEM_PRICE": {
//         const { id, newPrice } = action.payload;
//         const updatedCart = state.cart.map((item) =>
//           item.id === id ? { ...item, displayPrice: newPrice } : item
//         );
//         return { ...state, cart: updatedCart };
//       }

//       default:
//         return state;
//     }
//   };
//   const [state, dispatch] = useReducer(Reducer, initialState);
//   const addTocart = (id) => {
//     dispatch({ type: "ADD_TO_CART", payload: id });
//     dispatch({ type: "GET_TOTAL" }); // Add this line
//   };
//   const clearCart = () => {
//     dispatch({ type: "CLEAR_CART" });
//     dispatch({ type: "GET_TOTAL" }); // Add this line
//   };
//   const remove = (id) => {
//     dispatch({ type: "REMOVE", payload: id });
//     dispatch({ type: "GET_TOTAL" }); // Add this line
//   };
//   const increase = (id) => {
//     dispatch({ type: "INCREASE", payload: id });
//     dispatch({ type: "GET_TOTAL" }); // Add this line
//   };
//   const decrease = (id) => {
//     dispatch({ type: "DECREASE", payload: id });
//     dispatch({ type: "GET_TOTAL" }); // Add this line
//   };

//   const cartPayment = () => {
//     dispatch({ type: "PAYMENT", payload: payment });
//   };
//   const updatedCart = () => {
//     dispatch({ type: "LOAD_CART", payload: state.cart });
//   };

//   const updateItemPrice = (id, newPrice) => {
//     dispatch({ type: "UPDATE_ITEM_PRICE", payload: { id, newPrice } });
//     dispatch({ type: "GET_TOTAL" }); // Ensure totals are recalculated
//   };
//   const toggleSize = () => {
//     dispatch({ type: "TOGGLE_SIZE" });
//   };

//   const handleToggleSize = (id) => {
//     const newSize = !state.isSwitchOn;
//     const newPrice =
//       (newSize && menu.find((item) => item.id === id)?.price[1]) ||
//       menu.find((item) => item.id === id)?.price[0];
//     dispatch({ type: "UPDATE_ITEM_PRICE", payload: { id, newPrice } });
//     toggleSize();
//   };

//   return (
//     <AppContext.Provider
//       value={{
//         ...state,
//         handleToggleSize,
//         clearCart,
//         remove,
//         increase,
//         decrease,
//         cartPayment,
//         addTocart,
//         updatedCart,
//       }}
//     >
//       {children}
//     </AppContext.Provider>
//   );
// };

// export default AppProvider;

import React, { createContext, useEffect, useState } from "react";
import { getMeals } from "./API";
import { useReducer } from "react";
export const AppContext = createContext();
const initialState = {
  cart: [],
  amount: 0,
  total: 0,
  payment: {},
  isSwitchOn: false, // Add isSwitchOn to the initial state
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
          const newPrice = isSwitchOn
            ? item.price[1] // Assuming price[1] is for the larger size
            : item.price[0]; // Default price
          return { ...item, displayPrice: newPrice };
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
        const updatedCart = [
          ...state.cart,
          { ...newProduct, displayPrice: initialPrice },
        ];
        return { ...state, cart: updatedCart };
      }

      case "PAYMENT": {
        return { ...state, payment: action.payload };
      }

      case "LOAD_CART": {
        return { ...state, cart: action.payload };
      }

      case "UPDATE_ITEM_PRICE": {
        const { id, newPrice } = action.payload;
        const updatedCart = state.cart.map((item) =>
          item.id === id ? { ...item, displayPrice: newPrice } : item
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
    dispatch({ type: "GET_TOTAL" }); // Add this line
  };
  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
    dispatch({ type: "GET_TOTAL" }); // Add this line
  };
  const remove = (id) => {
    dispatch({ type: "REMOVE", payload: id });
    dispatch({ type: "GET_TOTAL" }); // Add this line
  };
  const increase = (id) => {
    dispatch({ type: "INCREASE", payload: id });
    dispatch({ type: "GET_TOTAL" }); // Add this line
  };
  const decrease = (id) => {
    dispatch({ type: "DECREASE", payload: id });
    dispatch({ type: "GET_TOTAL" }); // Add this line
  };

  const cartPayment = () => {
    dispatch({ type: "PAYMENT", payload: payment });
  };
  const updatedCart = () => {
    dispatch({ type: "LOAD_CART", payload: state.cart });
  };

  const updateItemPrice = (id, newPrice) => {
    dispatch({ type: "UPDATE_ITEM_PRICE", payload: { id, newPrice } });
    dispatch({ type: "GET_TOTAL" }); // Ensure totals are recalculated
  };
  const toggleSize = () => {
    dispatch({ type: "TOGGLE_SIZE" });
  };

  const handleToggleSize = (id) => {
    const newSize = !state.isSwitchOn;
    const newPrice =
      (newSize && menu.find((item) => item.id === id)?.price[1]) ||
      menu.find((item) => item.id === id)?.price[0];
    dispatch({ type: "UPDATE_ITEM_PRICE", payload: { id, newPrice } });
    toggleSize();
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
        updatedCart,
        updateItemPrice,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
