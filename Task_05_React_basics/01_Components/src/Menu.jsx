import { MenuItem } from "./MenuItem";

export const Menu = () => {
  const handleOrder = (itemName, itemPrice) => {
    console.log(`You Ordered ${itemName} for $${itemPrice.toFixed(2)}`);
  };

  return (
    <div>
      <h2>Our Menu</h2>
      <MenuItem name="Pizza" price={9.99} onOrder={handleOrder} />
      <MenuItem name="Burger" price={7.99} onOrder={handleOrder} />
      <MenuItem name="Pasta" price={8.99} onOrder={handleOrder} />
    </div>
  );
};
