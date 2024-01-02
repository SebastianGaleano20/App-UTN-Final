/* eslint-disable react/prop-types */
const ProductCard = ({ product }) => {
    return (
      <div key={product.id} className="product-card">
        <img src={product.image} alt={product.title} />
        <h3>{product.title}</h3>
        <p>{product.description}</p>
        <p>Price: {product.price}</p>
        <p>Category: {product.category}</p>
        <p>
          Rating: {product.rating.rate} - {product.rating.count} reviews.
        </p>
      </div>
    );
  };
  
  export { ProductCard };