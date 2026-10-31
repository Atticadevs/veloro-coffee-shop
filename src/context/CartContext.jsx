import { createContext, useContext, useEffect, useMemo, useReducer } from 'react'

const STORAGE_KEY = 'veloro-cart'
const CartContext = createContext(null)

function reducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM': {
      const p = action.product
      const exists = state.items.some((i) => i.id === p.id)
      const items = exists
        ? state.items.map((i) => (i.id === p.id ? { ...i, quantity: i.quantity + 1 } : i))
        : [...state.items, { id: p.id, name: p.name, price: p.price, note: p.note, color: p.color, image: p.image, quantity: 1 }]
      return { items }
    }
    case 'REMOVE_ITEM':
      return { items: state.items.filter((i) => i.id !== action.id) }
    case 'UPDATE_QTY':
      if (action.quantity < 1) return { items: state.items.filter((i) => i.id !== action.id) }
      return { items: state.items.map((i) => (i.id === action.id ? { ...i, quantity: action.quantity } : i)) }
    case 'CLEAR_CART':
      return { items: [] }
    default:
      return state
  }
}

function init() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY))
    if (saved && Array.isArray(saved.items)) return saved
  } catch {
    /* ignore corrupt or unavailable storage */
  }
  return { items: [] }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, undefined, init)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    } catch {
      /* storage unavailable */
    }
  }, [state])

  const value = useMemo(
    () => ({
      items: state.items,
      cartCount: state.items.reduce((n, i) => n + i.quantity, 0),
      cartTotal: state.items.reduce((n, i) => n + i.quantity * i.price, 0),
      addToCart: (product) => dispatch({ type: 'ADD_ITEM', product }),
      removeFromCart: (id) => dispatch({ type: 'REMOVE_ITEM', id }),
      updateQty: (id, quantity) => dispatch({ type: 'UPDATE_QTY', id, quantity }),
      clearCart: () => dispatch({ type: 'CLEAR_CART' }),
    }),
    [state],
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export const useCart = () => useContext(CartContext)
