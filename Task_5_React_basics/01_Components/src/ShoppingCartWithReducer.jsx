import { useReducer } from "react";

const intitialState = {
  items: [], //{id,name,price,quantity}
  totalAmount: 0,
  totalItems: 0,
};

const reducer = (state, action) => {
  //return new state
  switch (action.type) {
    case "ADD_ITEM": {
      const existingItemIndex = state.items.findIndex(
        (item) => item.id === action.payload.id,
      );
      let updatedItems;
      if (existingItemIndex >= 0) {
        //item already exists, update quantity
        updatedItems = [...state.items];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + 1,
        };
      } else {
        //item does not exist, add new item
        updatedItems = [...state.items, { ...action.payload, quantity: 1 }];
      }
      return {
        ...state,
        items: updatedItems,
        totalAmount: updatedItems.reduce((total, item) => {
          return (total += item.price * item.quantity);
        }, 0),
        totalItems: updatedItems.reduce(
          (total, item) => (total += item.quantity),
          0,
        ),
      };
    }
    default:
      return state;
  }
};

export const ShoppingCartWithReducer = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const products = [
    { id: 1, name: "React Course", price: 29.99 },
    { id: 2, name: "Vue Course", price: 19.99 },
  ];

  return (
    <div>
      <h2> Products</h2>
      {products.map((product) => (
        <div key={product.id}>
          <h3>
            {product.name} - ${product.price.toFixed(2)}
          </h3>
          <button
            onClick={() =>
              dispatch({
                type: "ADD_ITEM",
                payload: product,
              })
            }
          >
            Add to Cart
          </button>
        </div>
      ))}

    <div>
        <h2>Shopping Cart</h2>
        {state.items.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <div> </div>
        )
    </div>


    </div>
  );
};
