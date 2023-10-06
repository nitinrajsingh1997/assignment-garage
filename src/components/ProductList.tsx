import React, { useEffect, useState } from "react";
import "./ProductList.css";

interface Product {
  id: string;
  image: string;
  title: string;
  price: number;
  discount: number;
  quantity: number;
}

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((response) => response.json())
      .then((data) =>
        // Add the default quantity of 1 to each product
        setProducts(
          data.products.map((product: Product) => ({ ...product, quantity: 1 }))
        )
      );
  }, []);

  const increaseQuantity = (productId: string) => {
    setProducts((prevProducts) =>
      prevProducts.map((product: any) =>
        product.id === productId
          ? { ...product, quantity: product.quantity + 1 }
          : product
      )
    );
  };

  const decreaseQuantity = (productId: string) => {
    setProducts((prevProducts) =>
      prevProducts.map((product: any) =>
        product.id === productId && product.quantity > 0
          ? { ...product, quantity: product.quantity - 1 }
          : product
      )
    );
  };

  const deleteProduct = (productId: string) => {
    setProducts((prevProducts) =>
      prevProducts.filter((product: any) => product.id !== productId)
    );
  };

  return (
    <div className="product-list">
      {products.map((product: any) => (
        <div className="product-card" key={product.id}>
          <img src={product.thumbnail} alt={product.title} />
          <h2>{product.title}</h2>
          <p>Price: ${product.price}</p>
          <p>Discount: {product.discount}%</p>
          <p>Quantity: {product.quantity}</p>
          <button onClick={() => increaseQuantity(product.id)}>
            Increase Quantity
          </button>
          <button onClick={() => decreaseQuantity(product.id)}>
            Decrease Quantity
          </button>
          <button onClick={() => deleteProduct(product.id)}>
            Delete Product
          </button>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
