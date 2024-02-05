
/* eslint-disable no-undef */
// App.js
import { useEffect, useState } from "react";
import axios from "axios";
import { ProductCard } from "./components/ProductCard";
import "./App.css";

const App = () => {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    price: 0,
    description: "",
    category: "",
    image: "",
    rating: { rate: 0, count: 0 },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_REACT_APP_API_URL}/product`
        );
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      await axios.post(
        `${import.meta.env.VITE_REACT_APP_API_URL}/product`,
        formData
      );
      // Actualizar la lista de productos después de la inserción exitosa
      const response = await axios.get(
        `${import.meta.env.VITE_REACT_APP_API_URL}/product`
      );
      console.log(response.data);
      setProducts(response.data);
      setFormData({
        title: " ",
        price: 0,
        description: " ",
        category: " ",
        image: " ",
        rating: { rate: 0, count: 0 },
      });
    } catch (error) {
      console.error("Error submitting data:", error);
    }
    window.location.reload();
  };

  return (
    <div className="app">
      <h1>Product Landing Page</h1>
      <div className="add-product-form">
        <h2>Add a New Product</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            required
          />

          <label htmlFor="price">Price:</label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            required
          />

          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            required
          ></textarea>

          <label htmlFor="category">Category:</label>
          <input
            type="text"
            id="category"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            required
          />

          <label htmlFor="image">Image URL:</label>
          <input
            type="text"
            id="image"
            name="image"
            value={formData.image}
            onChange={handleInputChange}
            required
          />

          <label htmlFor="rating">Rating:</label>
          <input
            type="number"
            id="rating"
            name="rating"
            step="0.1"
            value={formData.rating.rate}
            onChange={(e) =>
              setFormData((prevData) => ({
                ...prevData,
                rating: {
                  ...prevData.rating,
                  rate: parseFloat(e.target.value),
                },
              }))
            }
            required
          />

          <label htmlFor="ratingCount">Rating Count:</label>
          <input
            type="number"
            id="ratingCount"
            name="ratingCount"
            value={formData.rating.count}
            onChange={(e) =>
              setFormData((prevData) => ({
                ...prevData,
                rating: {
                  ...prevData.rating,
                  count: parseInt(e.target.value, 10),
                },
              }))
            }
            required
          />

          <button type="submit">Add Product</button>
        </form>
      </div>
      <div className="product-list">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export { App };