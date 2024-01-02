
import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import { ProductCard } from "./components/ProductCard";

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchingData = async () => {
      try {
        const response = await axios.get("http://localhost:2010/api/product");
        setProducts(response.data);
        console.log(response.data);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };

    fetchingData();
  }, []);
  console.log(products);
  return (
    <main className="app">
      <h1>Test</h1>
      <div className="product-list">
        {products.map((product) => {
          return <ProductCard key={product.id} product={product} />;
        })}
      </div>
    </main>
  );
}

export default App ;