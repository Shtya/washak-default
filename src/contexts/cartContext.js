import React, {
    createContext,
    useContext,
    useMemo,
    useReducer,
    ReactNode,
    useEffect,
  } from "react";
import { readFromStorage, saveToStorage } from "../helper/localStorage";
  

const CART_STORAGE_KEY = "cart";
  /* =========================
     Types
  ========================= */
  
//   export type CartItem = {
//     id: string;
//     quantity: number;
//     selectedOptions: string[]; // ["variantId_optionId"]
//   };
  
//   type State = {
//     cartItems: CartItem[];
//   };
  
//   type AddItemPayload = {
//     id: string;
//     quantity?: number; // default 1
//     selectedOptions?: string[];
//   };
  
//   type RemoveItemPayload = {
//     id: string;
//   };
  
//   type ChangeAllOptionsPayload = {
//     id: string;
//     selectedOptions: string[];
//   };
  
//   type ChangeSpecificOptionPayload = {
//     id: string;
//     variantId: string;
//     optionId: string; // replaces existing entry for that variantId if present
//   };
  
//   type IncreaseQtyPayload = {
//     id: string;
//   };
  
//   type DecreaseQtyPayload = {
//     id: string;
//   };

//   type ClearCart = null;
  
//   type Action =
//     | { type: "ADD_ITEM"; payload: AddItemPayload }
//     | { type: "REMOVE_ITEM"; payload: RemoveItemPayload }
//     | { type: "INCREASE_QTY"; payload: IncreaseQtyPayload }
//     | { type: "DECREASE_QTY"; payload: DecreaseQtyPayload }
//     | { type: "SET_SELECTED_OPTIONS"; payload: ChangeAllOptionsPayload }
//     | { type: "SET_SPECIFIC_OPTION"; payload: ChangeSpecificOptionPayload };
  
  /* =========================
     Utilities
  ========================= */
  
  // Normalize options: unique by variantId, keep only one option per variant.
  // Ensures no falsy, trims whitespace, and dedupes by variantId.
  function normalizeOptions(options = []) {
    const map = new Map();
    for (const raw of options) {
      if (!raw) continue;
      const s = String(raw).trim();
      if (!s) continue;
      const [variantId, optionId] = s.split("_");
      if (!variantId || !optionId) continue;
      map.set(variantId, `${variantId}_${optionId}`);
    }
    return Array.from(map.values());
  }
  
  
  // Replace or insert a variant option in ["variantId_optionId"] array.
  function upsertOption(options = [], variantId , optionId) {
    const normalized = normalizeOptions(options);
    const filtered = normalized.filter((o) => !o.startsWith(`${variantId}_`));
    return normalizeOptions([...filtered, `${variantId}_${optionId}`]);
  }
  
  // Lazy init from localStorage
function initFromStorage() {
  const stored = readFromStorage(CART_STORAGE_KEY, []);
  return {
    cartItems: Array.isArray(stored) ? stored : [],
  };
}

  /* =========================
     Reducer
  ========================= */
  
  const initialState = {
    cartItems: [],
  };
  
  function cartReducer(state, action) {
    switch (action.type) {
      case "ADD_ITEM": {
        const { id, quantity = 1, selectedOptions = [] } = action.payload;
        const options = normalizeOptions(selectedOptions);
        const newItem = { id, quantity, selectedOptions: options };
  
        const idx = state.cartItems.findIndex((item) => item.id == newItem.id);
        if (idx !== -1) {
          const updated = [...state.cartItems];
          updated[idx] = {
            ...updated[idx],
            quantity: Math.max(1, updated[idx].quantity + quantity),
          };
          return { cartItems: updated };
        }
  
        return { cartItems: [...state.cartItems, newItem] };
      }
  
      case "REMOVE_ITEM": {
        const { id } = action.payload;

        return { cartItems: state.cartItems.filter((item) => item.id !== id) };
      }
  
      case "INCREASE_QTY": {
        const { id } = action.payload;
        
        const updated = state.cartItems.map((item) =>
          item.id == id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        return { cartItems: updated };
      }
  
      case "DECREASE_QTY": {
        const { id } = action.payload;

        const updated = state.cartItems.map((item) =>
            item.id == id
              ? { ...item, quantity: item.quantity == 1 ?  item.quantity : item.quantity - 1 }
              : item
          );
          
        return { cartItems: updated };
      }
  
      case "SET_SELECTED_OPTIONS": {
        const { id, selectedOptions } = action.payload;
        const normalized = normalizeOptions(selectedOptions);
        
        // Replace options for item with this id 
        const updated = state.cartItems.map((item) =>
            item.id == id ? { ...item, selectedOptions: normalized } : item
        );
  
        
        return { cartItems: updated };
      }
  
      case "SET_SPECIFIC_OPTION": {
        const { id, variantId, optionId } = action.payload;
  
        // Update the first matching line of the same product id; if multiple, update all by design?
        // We'll update all lines of that id for predictability in product pages with single active line.
        const updated = state.cartItems.map((item) =>
            item.id == id
            ? { ...item, selectedOptions: upsertOption(item.selectedOptions, variantId, optionId) }
            : item
        );
  
        return { cartItems: updated };
      }

      case "CLEAR_CART": {
        return { cartItems: [] };
      }
  
      default:
        return state;
    }
  }
  
  
  /* =========================
     Context
  ========================= */
  
//   type CartContextValue = {
//     cartItems: CartItem[];
//     count: number; // memoized sum of quantities
//     addItem: (payload: AddItemPayload) => void;
//     removeItem: (payload: RemoveItemPayload) => void;
//     increaseQty: (payload: IncreaseQtyPayload) => void;
//     decreaseQty: (payload: DecreaseQtyPayload) => void;
//     setSelectedOptions: (payload: ChangeAllOptionsPayload) => void;
//     setSpecificOption: (payload: ChangeSpecificOptionPayload) => void;
//   };
  
  const CartContext = createContext(null);
  
  export function CartProvider({ children }) {
    const [state, dispatch] = useReducer(cartReducer, initialState, initFromStorage);
  
      // Persist to localStorage on change
    useEffect(() => {
      saveToStorage(CART_STORAGE_KEY, state.cartItems);
    }, [state.cartItems]);

    const count = useMemo(
      () => state.cartItems.reduce((sum, it) => sum + it.quantity, 0),
      [state.cartItems]
    );
  
    const value = {
      cartItems: state.cartItems,
      count,
      addItem: (payload) => dispatch({ type: "ADD_ITEM", payload }),
      removeItem: (payload) => dispatch({ type: "REMOVE_ITEM", payload }),
      increaseQty: (payload) => dispatch({ type: "INCREASE_QTY", payload }),
      decreaseQty: (payload) => dispatch({ type: "DECREASE_QTY", payload }),
      setSelectedOptions: (payload) => dispatch({ type: "SET_SELECTED_OPTIONS", payload }),
      setSpecificOption: (payload) => dispatch({ type: "SET_SPECIFIC_OPTION", payload }),
      clearCart: () => dispatch({ type: "CLEAR_CART" }), // 🔥 added here
    };
  
    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
  }
  
  export function useCartContext() {
    const ctx = useContext(CartContext);
    if (!ctx) throw new Error("useCart must be used within CartProvider");
    return ctx;
  }
  

  