import { useState } from "react";

export const ShoppingCart = () => {
  const [cartItems, setCartItems] = useState({
    reactCourse: 0,
    vueCourse: 0,
    angularCourse: 0,
  });

  const prices = {
    reactCourse: 19.99,
    vueCourse: 59.99,
  };
  const handleAddReactCourse = () => {
    setCartItems({
      ...cartItems,
      reactCourse: cartItems.reactCourse + 1,
    });
  };

  const handleAddVueCourse = () => {
    setCartItems({
      ...cartItems,
      vueCourse: cartItems.vueCourse + 1,
    });
  };

  const clearCart = () => {
    setCartItems({
      reactCourse: 0,
      vueCourse: 0,
    });
  };
  return (
    <div>
      <h2>Shopping Cart component</h2>
      <ProductCard
        name="React Course"
        price={prices.reactCourse}
        quantity={cartItems.reactCourse}
        onAddToCart={handleAddReactCourse}
      />
      <ProductCard
        name="Vue Course"
        price={prices.vueCourse}
        quantity={cartItems.vueCourse}
        onAddToCart={handleAddVueCourse}
      />
      <CartSummary cartItems={cartItems} prices={prices} />
      <button onClick={clearCart}>Clear Cart</button>
    </div>
  );
};

export const ProductCard = ({ name, price, quantity, onAddToCart }) => {
  return (
    <div>
      <h3>{name}</h3>
      <p>Price: ${price.toFixed(2)}</p>
      <p>Quantity: {quantity}</p>
      <button onClick={onAddToCart}>Add to Cart</button>
    </div>
  );
};

export const CartSummary = ({ cartItems, prices }) => {
  const totalItems = cartItems.reactCourse + cartItems.vueCourse;
  const totalPrice =
    cartItems.reactCourse * prices.reactCourse +
    cartItems.vueCourse * prices.vueCourse;
  return (
    <div>
      <h3>Cart Summary</h3>
      <p>Total Items: {totalItems}</p>
      <p>Total Price: ${totalPrice.toFixed(2)}</p>
    </div>
  );
};
