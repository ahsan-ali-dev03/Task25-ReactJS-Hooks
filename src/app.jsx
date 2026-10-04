import { useState } from "react";
import "./App.css";

const shoes = [
  {
    id: 1,
    name: "White Casual Sneaker",
    price: 70,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500",
  },
  {
    id: 2,
    name: "MACTREE Men's Mid Top Ankle Boots",
    price: 90,
    image: "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=500",
  },
  {
    id: 3,
    name: "Campus Men's Sneakers",
    price: 50,
    image: "https://images.unsplash.com/photo-1552346154-21d32810aba3?w=500",
  },
  {
    id: 4,
    name: "Campus Men's OG-03 Sneakers",
    price: 75,
    image: "https://images.unsplash.com/photo-1495555961986-6d4c1ecb7be3?w=500",
  },
  {
    id: 5,
    name: "ASIAN Men's Sports Shoes",
    price: 68,
    image: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=500",
  },
];

function App() {
  const [cart, setCart] = useState([]);

  const addToCart = (shoe) => {
    setCart((currentCart) => {
      const existingItem = currentCart.find(
        (item) => item.id === shoe.id
      );

      if (existingItem) {
        return currentCart.map((item) =>
          item.id === shoe.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...currentCart, { ...shoe, quantity: 1 }];
    });
  };

  const decreaseQuantity = (id) => {
    setCart((currentCart) =>
      currentCart
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="app">
      <h1>Task: (ReactJS) Hooks</h1>

      <nav className="navbar">
        <div className="logo">👟</div>
        <a href="#">Home</a>
        <a href="#">Categories</a>
        <a href="#">About Us</a>
      </nav>

      <div className="store-container">

        {/* Shoes */}
        <div className="shoes-section">
          {shoes.map((shoe) => (
            <div className="shoe-card" key={shoe.id}>
              <img src={shoe.image} alt={shoe.name} />

              <div className="shoe-info">
                <h3>{shoe.name}</h3>
                <p>${shoe.price}</p>

                <button onClick={() => addToCart(shoe)}>
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Cart */}
        <div className="cart">
          <h2>Cart</h2>

          {cart.length === 0 ? (
            <p className="empty">Your cart is empty</p>
          ) : (
            cart.map((item) => (
              <div className="cart-item" key={item.id}>
                <img src={item.image} alt={item.name} />

                <div className="cart-details">
                  <h4>{item.name}</h4>
                  <p>${item.price}</p>
                </div>

                <div className="quantity">
                  <button onClick={() => decreaseQuantity(item.id)}>
                    −
                  </button>

                  <span>{item.quantity}</span>

                  <button onClick={() => addToCart(item)}>
                    +
                  </button>
                </div>
              </div>
            ))
          )}

          <div className="total">
            Total: ${total.toFixed(2)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;