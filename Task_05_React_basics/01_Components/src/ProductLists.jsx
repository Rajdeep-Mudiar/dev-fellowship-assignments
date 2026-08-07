export const ProductLists = () => {
  const products = [
    {
      id: 1,
      name: "Product 1",
      price: 10.99,
    },
    {
      id: 2,
      name: "Product 2",
      price: 19.99,
    },
    {
      id: 3,
      name: "Product 3",
      price: 5.99,
    },
    {
      id: 4,
      name: "Product 4",
      price: 29.99,
    },
    {
      id: 5,
      name: "Product 5",
      price: 15.99,
    },
  ];

  const ProductElements = products.map((product) => {
    return (
      <div key={product.id}>
        <h3>{product.name}</h3>
        <p>Price: ${product.price.toFixed(2)}</p>
      </div>
    );
  });

  return (
    <div>
      <h2>Product List</h2>
      {ProductElements}
    </div>
  );
};
