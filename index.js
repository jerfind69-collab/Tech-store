const { useState, useEffect } = React;

// Product Data
const productsData = [
  {
    id: 1,
    name: "QuantumCore X1",
    category: "Quantum Computing",
    price: 49999,
    image: "https://via.placeholder.com/300x200/0ff/000?text=QuantumCore+X1",
    description: "Next-gen quantum processor with 256 qubits"
  },
  {
    id: 2,
    name: "Neural Band Pro",
    category: "Neural Wearables",
    price: 2999,
    image: "https://via.placeholder.com/300x200/f0f/000?text=Neural+Band+Pro",
    description: "AI-powered brain-computer interface headband"
  },
  {
    id: 3,
    name: "HoloDisplay 8K",
    category: "Holographic Displays",
    price: 8999,
    image: "https://via.placeholder.com/300x200/0ff/000?text=HoloDisplay+8K",
    description: "360° holographic projection system"
  },
  {
    id: 4,
    name: "CyberGlove Elite",
    category: "Neural Wearables",
    price: 1499,
    image: "https://via.placeholder.com/300x200/f0f/000?text=CyberGlove+Elite",
    description: "Haptic feedback gloves for VR/AR"
  },
  {
    id: 5,
    name: "PlasmaShield Phone",
    category: "Mobile Devices",
    price: 3499,
    image: "https://via.placeholder.com/300x200/0ff/000?text=PlasmaShield+Phone",
    description: "Unbreakable plasma-reinforced smartphone"
  },
  {
    id: 6,
    name: "NanoBot Med Kit",
    category: "Medical Tech",
    price: 12999,
    image: "https://via.placeholder.com/300x200/f0f/000?text=NanoBot+Med+Kit",
    description: "Personal medical nanobots for health monitoring"
  },
  {
    id: 7,
    name: "Fusion Battery Pack",
    category: "Energy",
    price: 5999,
    image: "https://via.placeholder.com/300x200/0ff/000?text=Fusion+Battery",
    description: "Micro-fusion powered battery, 10-year lifespan"
  },
  {
    id: 8,
    name: "SynthVoice AI",
    category: "AI Assistants",
    price: 899,
    image: "https://via.placeholder.com/300x200/f0f/000?text=SynthVoice+AI",
    description: "Advanced AI voice assistant with personality"
  },
  {
    id: 9,
    name: "GravityBoots X",
    category: "Transportation",
    price: 7999,
    image: "https://via.placeholder.com/300x200/0ff/000?text=GravityBoots+X",
    description: "Anti-gravity boots for urban mobility"
  },
  {
    id: 10,
    name: "PhotonBlade Keyboard",
    category: "Peripherals",
    price: 599,
    image: "https://via.placeholder.com/300x200/f0f/000?text=PhotonBlade",
    description: "Holographic mechanical keyboard"
  },
  {
    id: 11,
    name: "MindReader Pro",
    category: "Neural Wearables",
    price: 4999,
    image: "https://via.placeholder.com/300x200/0ff/000?text=MindReader+Pro",
    description: "Advanced thought-to-text interface"
  },
  {
    id: 12,
    name: "ChromaLens AR",
    category: "AR Glasses",
    price: 2499,
    image: "https://via.placeholder.com/300x200/f0f/000?text=ChromaLens+AR",
    description: "Lightweight AR glasses with neural sync"
  }
];

// Product Card Component
const ProductCard = ({ product, onAddToCart }) => {
  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} className="product-image" />
      <div className="product-info">
        <span className="product-category">{product.category}</span>
        <h3 className="product-name">{product.name}</h3>
        <p className="product-description">{product.description}</p>
        <div className="product-footer">
          <span className="product-price">${product.price.toLocaleString()}</span>
          <button className="add-to-cart-btn" onClick={() => onAddToCart(product)}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

// Search Component
const Search = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  return (
    <div className="search-container">
      <input 
        className="search-input" 
        type="text" 
        placeholder="Search futuristic tech..." 
        value={searchTerm}
        onChange={handleSearch}
      />
      <button className="search-button">🔍</button>
    </div>
  );
};

// Cart Component
const Cart = ({ cart, onRemoveFromCart, onClose }) => {
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="cart-overlay" onClick={onClose}>
      <div className="cart-panel" onClick={(e) => e.stopPropagation()}>
        <div className="cart-header">
          <h2>Shopping Cart</h2>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>
        <div className="cart-items">
          {cart.length === 0 ? (
            <p className="empty-cart">Your cart is empty</p>
          ) : (
            cart.map(item => (
              <div key={item.id} className="cart-item">
                <img src={item.image} alt={item.name} />
                <div className="cart-item-info">
                  <h4>{item.name}</h4>
                  <p>${item.price.toLocaleString()} × {item.quantity}</p>
                </div>
                <button 
                  className="remove-btn" 
                  onClick={() => onRemoveFromCart(item.id)}
                >
                  Remove
                </button>
              </div>
            ))
          )}
        </div>
        {cart.length > 0 && (
          <div className="cart-footer">
            <div className="cart-total">
              <span>Total:</span>
              <span className="total-price">${total.toLocaleString()}</span>
            </div>
            <button className="checkout-btn">Proceed to Checkout</button>
          </div>
        )}
      </div>
    </div>
  );
};

// Main App Component
const App = () => {
  const [products, setProducts] = useState(productsData);
  const [filteredProducts, setFilteredProducts] = useState(productsData);
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', ...new Set(productsData.map(p => p.category))];

  const handleSearch = (searchTerm) => {
    const filtered = products.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  const handleCategoryFilter = (category) => {
    setSelectedCategory(category);
    if (category === 'All') {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter(p => p.category === category));
    }
  };

  const handleAddToCart = (product) => {
    setCart(prevCart => {
      const existing = prevCart.find(item => item.id === product.id);
      if (existing) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const handleRemoveFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="app">
      <header className="header">
        <div className="header-content">
          <h1 className="logo">
            <span className="neon-text">NEON</span>
            <span className="nexus-text">NEXUS</span>
          </h1>
          <p className="tagline">Futuristic Tech • 2026 Collection</p>
          <button className="cart-icon" onClick={() => setShowCart(true)}>
            🛒 <span className="cart-count">{cartCount}</span>
          </button>
        </div>
      </header>

      <main className="main-content">
        <Search onSearch={handleSearch} />
        
        <div className="category-filter">
          {categories.map(category => (
            <button
              key={category}
              className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => handleCategoryFilter(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="products-grid">
          {filteredProducts.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="no-results">
            <p>No products found. Try a different search.</p>
          </div>
        )}
      </main>

      <footer className="footer">
        <p>© 2026 Neon-Nexus • All Rights Reserved • Built with React</p>
      </footer>

      {showCart && (
        <Cart
          cart={cart}
          onRemoveFromCart={handleRemoveFromCart}
          onClose={() => setShowCart(false)}
        />
      )}
    </div>
  );
};

// Render App
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);