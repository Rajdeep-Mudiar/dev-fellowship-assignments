import { useState, useEffect } from "react";
import "./styles.css";

export default function LoadMoreData() {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [count, setCount] = useState(0);
  const disableButton = products.length >= 100;

  async function fetchProducts() {
    try {
      setLoading(true);
      const response = await fetch(
        `https://dummyjson.com/products?limit=20&skip=${count === 0 ? 0 : count * 20}`,
      );

      const result = await response.json();

      if (result?.products?.length) {
        setProducts((prevProducts) =>
          count === 0 ? result.products : [...prevProducts, ...result.products],
        );
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, [count]);

  if (loading) {
    return <div>Loading data! Please wait...</div>;
  }

  return (
    <div className="load-more-container">
      <div className="product-container">
        {products.length
          ? products.map((item) => (
              <div className="product" key={item.id}>
                <img src={item.thumbnail} alt={item.title} />
                <p>{item.title}</p>
              </div>
            ))
          : null}
      </div>

      <div className="button-container">
        <button
          disabled={disableButton}
          onClick={() => setCount((prevCount) => prevCount + 1)}
        >
          Load More Products
        </button>
        {disableButton ? <p>You have reached 100 products</p> : null}
      </div>
    </div>
  );
}
