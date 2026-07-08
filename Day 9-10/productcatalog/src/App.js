import React, { useState, useEffect } from 'react';

/* ============ PREMIUM CSS ============ */
const styles = `
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css');

:root {
  --primary: #6366f1;
  --primary-dark: #4f46e5;
  --secondary: #ec4899;
  --accent: #06b6d4;
  --dark: #0f172a;
  --dark-light: #1e293b;
  --card-bg: #ffffff;
  --text: #1e293b;
  --text-light: #64748b;
  --border: #e2e8f0;
  --shadow: 0 4px 6px -1px rgba(0,0,0,0.1);
  --shadow-lg: 0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04);
  --shadow-xl: 0 25px 50px -12px rgba(0,0,0,0.25);
  --radius: 16px;
  --radius-sm: 12px;
  --transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

* { margin: 0; padding: 0; box-sizing: border-box; }

body {
  font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  color: var(--text);
  line-height: 1.6;
  min-height: 100vh;
}

/* ===== NAVBAR ===== */
.navbar {
  background: rgba(255,255,255,0.9);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(0,0,0,0.05);
  padding: 1rem 2rem;
  position: sticky;
  top: 0;
  z-index: 100;
}

.nav-content {
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 1.5rem;
  font-weight: 800;
  background: linear-gradient(135deg, var(--primary), var(--secondary));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.logo i { font-size: 1.75rem; }

.nav-actions {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.cart-btn {
  position: relative;
  background: linear-gradient(135deg, var(--primary), var(--secondary));
  color: white;
  border: none;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  cursor: pointer;
  font-size: 1.2rem;
  transition: var(--transition);
  box-shadow: 0 4px 15px rgba(99,102,241,0.3);
}

.cart-btn:hover {
  transform: scale(1.1) rotate(-5deg);
  box-shadow: 0 8px 25px rgba(99,102,241,0.4);
}

.cart-count {
  position: absolute;
  top: -5px;
  right: -5px;
  background: var(--secondary);
  color: white;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  font-size: 0.75rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* ===== HERO ===== */
.hero {
  background: linear-gradient(135deg, var(--dark) 0%, var(--dark-light) 100%);
  color: white;
  padding: 4rem 2rem;
  text-align: center;
  position: relative;
  overflow: hidden;
}

.hero::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%);
  animation: pulse 4s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { transform: scale(1); opacity: 0.5; }
  50% { transform: scale(1.1); opacity: 1; }
}

.hero-content {
  position: relative;
  z-index: 1;
  max-width: 800px;
  margin: 0 auto;
}

.hero h1 {
  font-size: 3.5rem;
  font-weight: 800;
  margin-bottom: 1rem;
  background: linear-gradient(90deg, #fff, #a5b4fc);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.hero p {
  font-size: 1.25rem;
  color: #94a3b8;
  margin-bottom: 2rem;
}

/* ===== SEARCH & FILTER BAR ===== */
.controls-section {
  max-width: 1400px;
  margin: -2rem auto 0;
  padding: 0 2rem;
  position: relative;
  z-index: 10;
}

.controls-card {
  background: white;
  border-radius: var(--radius);
  padding: 1.5rem 2rem;
  box-shadow: var(--shadow-xl);
  display: flex;
  gap: 1rem;
  align-items: center;
  flex-wrap: wrap;
}

.search-box {
  flex: 1;
  min-width: 250px;
  position: relative;
}

.search-box i {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: var(--text-light);
}

.search-box input {
  width: 100%;
  padding: 0.875rem 1rem 0.875rem 2.75rem;
  border: 2px solid var(--border);
  border-radius: var(--radius-sm);
  font-size: 1rem;
  transition: var(--transition);
}

.search-box input:focus {
  outline: none;
  border-color: var(--primary);
  box-shadow: 0 0 0 4px rgba(99,102,241,0.1);
}

.filter-group {
  display: flex;
  gap: 0.75rem;
}

.filter-btn {
  padding: 0.875rem 1.5rem;
  border: 2px solid var(--border);
  border-radius: var(--radius-sm);
  background: white;
  cursor: pointer;
  font-weight: 600;
  transition: var(--transition);
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.filter-btn:hover, .filter-btn.active {
  border-color: var(--primary);
  background: linear-gradient(135deg, var(--primary), var(--primary-dark));
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(99,102,241,0.25);
}

/* ===== MAIN CONTENT ===== */
.main-content {
  max-width: 1400px;
  margin: 0 auto;
  padding: 3rem 2rem;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.section-header h2 {
  font-size: 1.75rem;
  font-weight: 700;
}

.section-header span {
  color: var(--text-light);
}

/* ===== PRODUCT GRID ===== */
.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
}

/* ===== PRODUCT CARD ===== */
.product-card {
  background: white;
  border-radius: var(--radius);
  overflow: hidden;
  box-shadow: var(--shadow);
  transition: var(--transition);
  position: relative;
}

.product-card:hover {
  transform: translateY(-8px);
  box-shadow: var(--shadow-xl);
}

.product-image {
  position: relative;
  height: 240px;
  overflow: hidden;
}

.product-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: var(--transition);
}

.product-card:hover .product-image img {
  transform: scale(1.1);
}

.badge {
  position: absolute;
  top: 1rem;
  left: 1rem;
  padding: 0.35rem 0.875rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 700;
  text-transform: uppercase;
}

.badge-new { background: var(--accent); color: white; }
.badge-sale { background: var(--secondary); color: white; }
.badge-hot { background: #ef4444; color: white; }

.wishlist-btn {
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: none;
  background: rgba(255,255,255,0.9);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
  color: var(--text-light);
  transition: var(--transition);
}

.wishlist-btn:hover, .wishlist-btn.active {
  background: var(--secondary);
  color: white;
  transform: scale(1.1);
}

.product-info {
  padding: 1.5rem;
}

.product-category {
  font-size: 0.8rem;
  color: var(--primary);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 0.5rem;
}

.product-name {
  font-size: 1.15rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: var(--text);
}

.product-rating {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.stars { color: #fbbf24; }
.rating-text { color: var(--text-light); font-size: 0.85rem; }

.product-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.price {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.current-price {
  font-size: 1.5rem;
  font-weight: 800;
  color: var(--primary);
}

.old-price {
  font-size: 1rem;
  color: var(--text-light);
  text-decoration: line-through;
}

.add-to-cart {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  border: none;
  background: linear-gradient(135deg, var(--primary), var(--primary-dark));
  color: white;
  cursor: pointer;
  font-size: 1.1rem;
  transition: var(--transition);
  display: flex;
  align-items: center;
  justify-content: center;
}

.add-to-cart:hover {
  transform: scale(1.1) rotate(-5deg);
  box-shadow: 0 8px 20px rgba(99,102,241,0.3);
}

/* ===== CART SIDEBAR ===== */
.cart-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.5);
  z-index: 200;
  opacity: 0;
  visibility: hidden;
  transition: var(--transition);
}

.cart-overlay.open {
  opacity: 1;
  visibility: visible;
}

.cart-sidebar {
  position: fixed;
  top: 0;
  right: 0;
  width: 420px;
  max-width: 100%;
  height: 100%;
  background: white;
  z-index: 201;
  transform: translateX(100%);
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  flex-direction: column;
}

.cart-sidebar.open {
  transform: translateX(0);
}

.cart-header {
  padding: 1.5rem 2rem;
  border-bottom: 1px solid var(--border);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.cart-header h2 {
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.close-cart {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: none;
  background: var(--border);
  cursor: pointer;
  font-size: 1.2rem;
  transition: var(--transition);
}

.close-cart:hover {
  background: var(--danger);
  color: white;
}

.cart-items {
  flex: 1;
  overflow-y: auto;
  padding: 1rem 2rem;
}

.cart-item {
  display: flex;
  gap: 1rem;
  padding: 1rem 0;
  border-bottom: 1px solid var(--border);
}

.cart-item img {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 12px;
}

.cart-item-info {
  flex: 1;
}

.cart-item-name {
  font-weight: 700;
  margin-bottom: 0.25rem;
}

.cart-item-price {
  color: var(--primary);
  font-weight: 700;
}

.quantity-control {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.5rem;
}

.qty-btn {
  width: 28px;
  height: 28px;
  border-radius: 8px;
  border: 1px solid var(--border);
  background: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: var(--transition);
}

.qty-btn:hover {
  background: var(--primary);
  color: white;
  border-color: var(--primary);
}

.remove-item {
  color: var(--danger);
  cursor: pointer;
  padding: 0.5rem;
  transition: var(--transition);
}

.remove-item:hover {
  transform: scale(1.2);
}

.cart-footer {
  padding: 1.5rem 2rem;
  border-top: 1px solid var(--border);
  background: #f8fafc;
}

.cart-total {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.cart-total span:first-child {
  font-size: 1.1rem;
  color: var(--text-light);
}

.cart-total span:last-child {
  font-size: 1.75rem;
  font-weight: 800;
  color: var(--primary);
}

.checkout-btn {
  width: 100%;
  padding: 1rem;
  border: none;
  border-radius: var(--radius-sm);
  background: linear-gradient(135deg, var(--primary), var(--secondary));
  color: white;
  font-size: 1.1rem;
  font-weight: 700;
  cursor: pointer;
  transition: var(--transition);
}

.checkout-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 30px rgba(99,102,241,0.3);
}

.empty-cart {
  text-align: center;
  padding: 3rem;
  color: var(--text-light);
}

.empty-cart i {
  font-size: 4rem;
  margin-bottom: 1rem;
  opacity: 0.3;
}

/* ===== TOAST ===== */
.toast {
  position: fixed;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%) translateY(100px);
  background: var(--dark);
  color: white;
  padding: 1rem 2rem;
  border-radius: 12px;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-weight: 600;
  z-index: 300;
  opacity: 0;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.toast.show {
  transform: translateX(-50%) translateY(0);
  opacity: 1;
}

.toast i { color: var(--success); }

/* ===== FOOTER ===== */
.footer {
  background: var(--dark);
  color: white;
  padding: 3rem 2rem;
  text-align: center;
}

.footer-content {
  max-width: 1400px;
  margin: 0 auto;
}

.footer h3 {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
}

.footer p {
  color: #94a3b8;
}

/* ===== RESPONSIVE ===== */
@media (max-width: 768px) {
  .hero h1 { font-size: 2rem; }
  .controls-card { flex-direction: column; }
  .search-box { width: 100%; }
  .filter-group { width: 100%; overflow-x: auto; }
  .product-grid { grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); }
  .cart-sidebar { width: 100%; }
}
`;

/* ============ PRODUCT DATA ============ */
const products = [
  {
    id: 1,
    name: 'Wireless Noise-Cancel Headphones',
    category: 'Electronics',
    price: 299,
    oldPrice: 399,
    rating: 4.8,
    reviews: 234,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop',
    badge: 'hot',
    inStock: true
  },
  {
    id: 2,
    name: 'Smart Watch Pro Series',
    category: 'Electronics',
    price: 449,
    oldPrice: 599,
    rating: 4.6,
    reviews: 189,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop',
    badge: 'sale',
    inStock: true
  },
  {
    id: 3,
    name: 'Premium Leather Backpack',
    category: 'Fashion',
    price: 129,
    oldPrice: null,
    rating: 4.9,
    reviews: 456,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop',
    badge: 'new',
    inStock: true
  },
  {
    id: 4,
    name: 'Mechanical Gaming Keyboard',
    category: 'Gaming',
    price: 159,
    oldPrice: 199,
    rating: 4.7,
    reviews: 312,
    image: 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=400&h=300&fit=crop',
    badge: 'sale',
    inStock: true
  },
  {
    id: 5,
    name: '4K Ultra HD Monitor',
    category: 'Electronics',
    price: 699,
    oldPrice: 899,
    rating: 4.5,
    reviews: 128,
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400&h=300&fit=crop',
    badge: null,
    inStock: true
  },
  {
    id: 6,
    name: 'Running Shoes Ultra Boost',
    category: 'Sports',
    price: 189,
    oldPrice: 249,
    rating: 4.8,
    reviews: 567,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=300&fit=crop',
    badge: 'hot',
    inStock: true
  },
  {
    id: 7,
    name: 'Portable Bluetooth Speaker',
    category: 'Electronics',
    price: 79,
    oldPrice: null,
    rating: 4.4,
    reviews: 891,
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=300&fit=crop',
    badge: 'new',
    inStock: true
  },
  {
    id: 8,
    name: 'Designer Sunglasses',
    category: 'Fashion',
    price: 249,
    oldPrice: 349,
    rating: 4.6,
    reviews: 234,
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=300&fit=crop',
    badge: 'sale',
    inStock: true
  },
];

const categories = ['All', 'Electronics', 'Fashion', 'Gaming', 'Sports'];

/* ============ COMPONENTS ============ */

const Navbar = ({ cartCount, onCartClick }) => (
  <nav className="navbar">
    <div className="nav-content">
      <div className="logo">
        <i className="fas fa-shopping-bag"></i>
        LuxeStore
      </div>
      <div className="nav-actions">
        <button className="cart-btn" onClick={onCartClick}>
          <i className="fas fa-shopping-cart"></i>
          {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
        </button>
      </div>
    </div>
  </nav>
);

const Hero = () => (
  <section className="hero">
    <div className="hero-content">
      <h1>Premium Products</h1>
      <p>Discover our curated collection of top-tier products with exclusive deals</p>
    </div>
  </section>
);

const ProductCard = ({ product, onAddToCart, onToggleWishlist, isWishlisted }) => {
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <i key={i} className={`fas fa-star ${i <= Math.floor(rating) ? '' : 'far'}`}></i>
      );
    }
    return stars;
  };

  return (
    <div className="product-card">
      <div className="product-image">
        <img src={product.image} alt={product.name} />
        {product.badge && <span className={`badge badge-${product.badge}`}>{product.badge}</span>}
        <button 
          className={`wishlist-btn ${isWishlisted ? 'active' : ''}`}
          onClick={() => onToggleWishlist(product.id)}
        >
          <i className={`${isWishlisted ? 'fas' : 'far'} fa-heart`}></i>
        </button>
      </div>
      <div className="product-info">
        <div className="product-category">{product.category}</div>
        <h3 className="product-name">{product.name}</h3>
        <div className="product-rating">
          <span className="stars">{renderStars(product.rating)}</span>
          <span className="rating-text">({product.reviews})</span>
        </div>
        <div className="product-footer">
          <div className="price">
            <span className="current-price">${product.price}</span>
            {product.oldPrice && <span className="old-price">${product.oldPrice}</span>}
          </div>
          <button className="add-to-cart" onClick={() => onAddToCart(product)}>
            <i className="fas fa-plus"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

const CartSidebar = ({ isOpen, onClose, cartItems, onUpdateQty, onRemove, onCheckout }) => {
  const total = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <>
      <div className={`cart-overlay ${isOpen ? 'open' : ''}`} onClick={onClose}></div>
      <div className={`cart-sidebar ${isOpen ? 'open' : ''}`}>
        <div className="cart-header">
          <h2><i className="fas fa-shopping-bag"></i> Your Cart</h2>
          <button className="close-cart" onClick={onClose}>
            <i className="fas fa-times"></i>
          </button>
        </div>
        
        <div className="cart-items">
          {cartItems.length === 0 ? (
            <div className="empty-cart">
              <i className="fas fa-shopping-basket"></i>
              <h3>Your cart is empty</h3>
              <p>Add some products to get started!</p>
            </div>
          ) : (
            cartItems.map(item => (
              <div key={item.id} className="cart-item">
                <img src={item.image} alt={item.name} />
                <div className="cart-item-info">
                  <div className="cart-item-name">{item.name}</div>
                  <div className="cart-item-price">${item.price}</div>
                  <div className="quantity-control">
                    <button className="qty-btn" onClick={() => onUpdateQty(item.id, -1)}>-</button>
                    <span>{item.qty}</span>
                    <button className="qty-btn" onClick={() => onUpdateQty(item.id, 1)}>+</button>
                  </div>
                </div>
                <div className="remove-item" onClick={() => onRemove(item.id)}>
                  <i className="fas fa-trash"></i>
                </div>
              </div>
            ))
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="cart-footer">
            <div className="cart-total">
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <button className="checkout-btn" onClick={onCheckout}>
              <i className="fas fa-lock"></i> Checkout
            </button>
          </div>
        )}
      </div>
    </>
  );
};

const Toast = ({ message, isVisible }) => (
  <div className={`toast ${isVisible ? 'show' : ''}`}>
    <i className="fas fa-check-circle"></i>
    {message}
  </div>
);

/* ============ MAIN APP ============ */

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : [];
  });
  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem('wishlist');
    return saved ? JSON.parse(saved) : [];
  });
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toast, setToast] = useState({ message: '', visible: false });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const showToast = (message) => {
    setToast({ message, visible: true });
    setTimeout(() => setToast({ message: '', visible: false }), 2500);
  };

  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
    showToast(`${product.name} added to cart!`);
  };

  const updateQty = (id, delta) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.qty + delta);
        return { ...item, qty: newQty };
      }
      return item;
    }));
  };

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const toggleWishlist = (id) => {
    setWishlist(prev => {
      if (prev.includes(id)) {
        return prev.filter(wid => wid !== id);
      }
      return [...prev, id];
    });
  };

  const handleCheckout = () => {
    showToast('Order placed successfully!');
    setCart([]);
    setIsCartOpen(false);
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'All' || product.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);

  return (
    <>
      <style>{styles}</style>
      <div className="app">
        <Navbar cartCount={cartCount} onCartClick={() => setIsCartOpen(true)} />
        
        <Hero />
        
        <section className="controls-section">
          <div className="controls-card">
            <div className="search-box">
              <i className="fas fa-search"></i>
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="filter-group">
              {categories.map(cat => (
                <button
                  key={cat}
                  className={`filter-btn ${activeCategory === cat ? 'active' : ''}`}
                  onClick={() => setActiveCategory(cat)}
                >
                  {cat === 'All' ? <i className="fas fa-th-large"></i> : null}
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </section>

        <main className="main-content">
          <div className="section-header">
            <h2>All Products</h2>
            <span>{filteredProducts.length} items found</span>
          </div>
          
          <div className="product-grid">
            {filteredProducts.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={addToCart}
                onToggleWishlist={toggleWishlist}
                isWishlisted={wishlist.includes(product.id)}
              />
            ))}
          </div>
        </main>

        <CartSidebar
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          cartItems={cart}
          onUpdateQty={updateQty}
          onRemove={removeFromCart}
          onCheckout={handleCheckout}
        />

        <Toast message={toast.message} isVisible={toast.visible} />

        <footer className="footer">
          <div className="footer-content">
            <h3><i className="fas fa-shopping-bag"></i> LuxeStore</h3>
            <p>Premium products for premium people</p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default App;