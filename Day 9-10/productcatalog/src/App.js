import React, { useState, useEffect, createContext, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useParams, useNavigate, useLocation } from 'react-router-dom';

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
  text-decoration: none;
}

.logo i { font-size: 1.75rem; }

.nav-links {
  display: flex;
  gap: 2rem;
  align-items: center;
}

.nav-link {
  text-decoration: none;
  color: var(--text-light);
  font-weight: 600;
  transition: var(--transition);
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.nav-link:hover, .nav-link.active {
  color: var(--primary);
}

.nav-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.wishlist-nav-btn {
  position: relative;
  background: transparent;
  color: var(--text);
  border: 2px solid var(--border);
  width: 44px;
  height: 44px;
  border-radius: 50%;
  cursor: pointer;
  font-size: 1.1rem;
  transition: var(--transition);
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
}

.wishlist-nav-btn:hover {
  border-color: var(--secondary);
  color: var(--secondary);
  transform: scale(1.1);
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
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
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
  text-decoration: none;
  color: inherit;
  display: block;
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
  z-index: 2;
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

/* ===== PRODUCT DETAIL PAGE ===== */
.product-detail {
  max-width: 1200px;
  margin: 0 auto;
  padding: 3rem 2rem;
}

.breadcrumb {
  display: flex;
  gap: 0.5rem;
  align-items: center;
  margin-bottom: 2rem;
  color: var(--text-light);
}

.breadcrumb a {
  color: var(--primary);
  text-decoration: none;
  font-weight: 600;
}

.breadcrumb a:hover {
  text-decoration: underline;
}

.detail-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  align-items: start;
}

.detail-image {
  border-radius: var(--radius);
  overflow: hidden;
  box-shadow: var(--shadow-xl);
}

.detail-image img {
  width: 100%;
  height: auto;
  display: block;
}

.detail-info h1 {
  font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: 1rem;
}

.detail-category {
  display: inline-block;
  padding: 0.5rem 1rem;
  background: rgba(99,102,241,0.1);
  color: var(--primary);
  border-radius: 20px;
  font-weight: 600;
  margin-bottom: 1rem;
}

.detail-rating {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.detail-price {
  display: flex;
  align-items: baseline;
  gap: 1rem;
  margin-bottom: 2rem;
}

.detail-price .current {
  font-size: 2.5rem;
  font-weight: 800;
  color: var(--primary);
}

.detail-price .old {
  font-size: 1.5rem;
  color: var(--text-light);
  text-decoration: line-through;
}

.detail-price .discount {
  padding: 0.25rem 0.75rem;
  background: #fee2e2;
  color: #ef4444;
  border-radius: 8px;
  font-weight: 700;
  font-size: 0.9rem;
}

.detail-actions {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
}

.btn-primary {
  flex: 1;
  padding: 1rem 2rem;
  border: none;
  border-radius: var(--radius-sm);
  background: linear-gradient(135deg, var(--primary), var(--primary-dark));
  color: white;
  font-size: 1.1rem;
  font-weight: 700;
  cursor: pointer;
  transition: var(--transition);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 30px rgba(99,102,241,0.3);
}

.btn-secondary {
  padding: 1rem 2rem;
  border: 2px solid var(--border);
  border-radius: var(--radius-sm);
  background: white;
  color: var(--text);
  font-size: 1.1rem;
  font-weight: 700;
  cursor: pointer;
  transition: var(--transition);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.btn-secondary:hover {
  border-color: var(--secondary);
  color: var(--secondary);
}

.btn-secondary.active {
  background: var(--secondary);
  color: white;
  border-color: var(--secondary);
}

.detail-features {
  background: #f8fafc;
  border-radius: var(--radius-sm);
  padding: 1.5rem;
}

.detail-features h3 {
  margin-bottom: 1rem;
  font-size: 1.1rem;
}

.detail-features ul {
  list-style: none;
}

.detail-features li {
  padding: 0.5rem 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--text-light);
}

.detail-features li i {
  color: #22c55e;
}

/* ===== WISHLIST PAGE ===== */
.wishlist-page {
  max-width: 1400px;
  margin: 0 auto;
  padding: 3rem 2rem;
}

.wishlist-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
}

.empty-state {
  text-align: center;
  padding: 5rem 2rem;
  color: var(--text-light);
}

.empty-state i {
  font-size: 5rem;
  margin-bottom: 1.5rem;
  opacity: 0.3;
}

.empty-state h2 {
  color: var(--text);
  margin-bottom: 0.5rem;
}

.empty-state p {
  margin-bottom: 2rem;
}

.btn-back {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.875rem 1.5rem;
  background: linear-gradient(135deg, var(--primary), var(--primary-dark));
  color: white;
  text-decoration: none;
  border-radius: var(--radius-sm);
  font-weight: 700;
  transition: var(--transition);
}

.btn-back:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(99,102,241,0.25);
}

/* ===== CART PAGE ===== */
.cart-page {
  max-width: 1000px;
  margin: 0 auto;
  padding: 3rem 2rem;
}

.cart-page h1 {
  font-size: 2rem;
  margin-bottom: 2rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.cart-list {
  background: white;
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  overflow: hidden;
}

.cart-item-row {
  display: grid;
  grid-template-columns: auto 1fr auto auto auto;
  gap: 1.5rem;
  align-items: center;
  padding: 1.5rem 2rem;
  border-bottom: 1px solid var(--border);
}

.cart-item-row:last-child {
  border-bottom: none;
}

.cart-item-row img {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 12px;
}

.cart-item-details h3 {
  font-size: 1.1rem;
  margin-bottom: 0.25rem;
}

.cart-item-details p {
  color: var(--text-light);
  font-size: 0.9rem;
}

.cart-item-price {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--primary);
}

.qty-control {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.qty-btn {
  width: 36px;
  height: 36px;
  border-radius: 10px;
  border: 2px solid var(--border);
  background: white;
  cursor: pointer;
  font-size: 1rem;
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

.remove-btn {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  border: none;
  background: #fee2e2;
  color: #ef4444;
  cursor: pointer;
  font-size: 1rem;
  transition: var(--transition);
  display: flex;
  align-items: center;
  justify-content: center;
}

.remove-btn:hover {
  background: #ef4444;
  color: white;
  transform: scale(1.1);
}

.cart-summary {
  margin-top: 2rem;
  background: white;
  border-radius: var(--radius);
  padding: 2rem;
  box-shadow: var(--shadow);
}

.summary-row {
  display: flex;
  justify-content: space-between;
  padding: 0.75rem 0;
  color: var(--text-light);
}

.summary-row.total {
  border-top: 2px solid var(--border);
  margin-top: 1rem;
  padding-top: 1rem;
  font-size: 1.5rem;
  font-weight: 800;
  color: var(--primary);
}

.checkout-actions {
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
}

.checkout-actions .btn-primary {
  flex: 1;
}

.checkout-actions .btn-secondary {
  flex: 1;
  text-decoration: none;
}

/* ===== CHECKOUT PAGE ===== */
.checkout-page {
  max-width: 800px;
  margin: 0 auto;
  padding: 3rem 2rem;
}

.checkout-page h1 {
  font-size: 2rem;
  margin-bottom: 2rem;
}

.checkout-form {
  background: white;
  border-radius: var(--radius);
  padding: 2rem;
  box-shadow: var(--shadow);
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: var(--text);
}

.form-group input {
  width: 100%;
  padding: 0.875rem 1rem;
  border: 2px solid var(--border);
  border-radius: var(--radius-sm);
  font-size: 1rem;
  transition: var(--transition);
}

.form-group input:focus {
  outline: none;
  border-color: var(--primary);
  box-shadow: 0 0 0 4px rgba(99,102,241,0.1);
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.order-summary {
  background: #f8fafc;
  border-radius: var(--radius-sm);
  padding: 1.5rem;
  margin-bottom: 2rem;
}

.order-summary h3 {
  margin-bottom: 1rem;
}

.order-item {
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 0;
  color: var(--text-light);
}

.order-total {
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 2px solid var(--border);
  font-size: 1.25rem;
  font-weight: 800;
  color: var(--primary);
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

.toast i { color: #22c55e; }

/* ===== FOOTER ===== */
.footer {
  background: var(--dark);
  color: white;
  padding: 3rem 2rem;
  text-align: center;
  margin-top: auto;
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
  .detail-grid { grid-template-columns: 1fr; }
  .nav-links { display: none; }
  .cart-item-row { grid-template-columns: 1fr; text-align: center; }
  .form-row { grid-template-columns: 1fr; }
  .checkout-actions { flex-direction: column; }
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
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=400&fit=crop',
    badge: 'hot',
    inStock: true,
    description: 'Premium wireless headphones with active noise cancellation, 30-hour battery life, and studio-quality sound.'
  },
  {
    id: 2,
    name: 'Smart Watch Pro Series',
    category: 'Electronics',
    price: 449,
    oldPrice: 599,
    rating: 4.6,
    reviews: 189,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=400&fit=crop',
    badge: 'sale',
    inStock: true,
    description: 'Advanced fitness tracking, ECG monitoring, and seamless smartphone integration in a sleek design.'
  },
  {
    id: 3,
    name: 'Premium Leather Backpack',
    category: 'Fashion',
    price: 129,
    oldPrice: null,
    rating: 4.9,
    reviews: 456,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&h=400&fit=crop',
    badge: 'new',
    inStock: true,
    description: 'Handcrafted genuine leather backpack with laptop compartment and multiple organizer pockets.'
  },
  {
    id: 4,
    name: 'Mechanical Gaming Keyboard',
    category: 'Gaming',
    price: 159,
    oldPrice: 199,
    rating: 4.7,
    reviews: 312,
    image: 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=600&h=400&fit=crop',
    badge: 'sale',
    inStock: true,
    description: 'RGB mechanical keyboard with Cherry MX switches, programmable macros, and aircraft-grade aluminum frame.'
  },
  {
    id: 5,
    name: '4K Ultra HD Monitor',
    category: 'Electronics',
    price: 699,
    oldPrice: 899,
    rating: 4.5,
    reviews: 128,
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=600&h=400&fit=crop',
    badge: null,
    inStock: true,
    description: '27-inch 4K IPS display with 99% sRGB coverage, USB-C connectivity, and ergonomic stand.'
  },
  {
    id: 6,
    name: 'Running Shoes Ultra Boost',
    category: 'Sports',
    price: 189,
    oldPrice: 249,
    rating: 4.8,
    reviews: 567,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=400&fit=crop',
    badge: 'hot',
    inStock: true,
    description: 'Energy-returning cushioning, breathable Primeknit upper, and Continental rubber outsole.'
  },
  {
    id: 7,
    name: 'Portable Bluetooth Speaker',
    category: 'Electronics',
    price: 79,
    oldPrice: null,
    rating: 4.4,
    reviews: 891,
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600&h=400&fit=crop',
    badge: 'new',
    inStock: true,
    description: 'Waterproof portable speaker with 360° sound, 20-hour battery, and built-in power bank.'
  },
  {
    id: 8,
    name: 'Designer Sunglasses',
    category: 'Fashion',
    price: 249,
    oldPrice: 349,
    rating: 4.6,
    reviews: 234,
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600&h=400&fit=crop',
    badge: 'sale',
    inStock: true,
    description: 'Polarized UV400 lenses with handcrafted acetate frames in timeless aviator style.'
  },
];

const categories = ['All', 'Electronics', 'Fashion', 'Gaming', 'Sports'];

/* ============ CONTEXT ============ */
const StoreContext = createContext();

const StoreProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : [];
  });
  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem('wishlist');
    return saved ? JSON.parse(saved) : [];
  });
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
        showToast('Removed from wishlist');
        return prev.filter(wid => wid !== id);
      }
      showToast('Added to wishlist');
      return [...prev, id];
    });
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);
  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <StoreContext.Provider value={{
      cart, wishlist, toast, cartCount, cartTotal,
      addToCart, updateQty, removeFromCart, toggleWishlist, clearCart, showToast
    }}>
      {children}
    </StoreContext.Provider>
  );
};

const useStore = () => useContext(StoreContext);

/* ============ COMPONENTS ============ */

const Navbar = () => {
  const { cartCount, wishlist } = useStore();
  const location = useLocation();

  return (
    <nav className="navbar">
      <div className="nav-content">
        <Link to="/" className="logo">
          <i className="fas fa-shopping-bag"></i>
          LuxeStore
        </Link>
        
        <div className="nav-links">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/wishlist" className="nav-link">
            Wishlist ({wishlist.length})
          </Link>
          <Link to="/cart" className="nav-link">
            Cart ({cartCount})
          </Link>
        </div>

        <div className="nav-actions">
          <Link to="/wishlist" className="wishlist-nav-btn">
            <i className="fas fa-heart"></i>
            {wishlist.length > 0 && <span className="cart-count">{wishlist.length}</span>}
          </Link>
          <Link to="/cart" className="cart-btn">
            <i className="fas fa-shopping-cart"></i>
            {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
          </Link>
        </div>
      </div>
    </nav>
  );
};

const Hero = () => (
  <section className="hero">
    <div className="hero-content">
      <h1>Premium Products</h1>
      <p>Discover our curated collection of top-tier products with exclusive deals</p>
    </div>
  </section>
);

const ProductCard = ({ product }) => {
  const { addToCart, toggleWishlist, wishlist } = useStore();

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <i key={i} className={`fas fa-star ${i <= Math.floor(rating) ? '' : 'far'}`}></i>
      );
    }
    return stars;
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  return (
    <Link to={`/product/${product.id}`} className="product-card">
      <div className="product-image">
        <img src={product.image} alt={product.name} />
        {product.badge && <span className={`badge badge-${product.badge}`}>{product.badge}</span>}
        <button 
          className={`wishlist-btn ${wishlist.includes(product.id) ? 'active' : ''}`}
          onClick={handleWishlist}
        >
          <i className={`${wishlist.includes(product.id) ? 'fas' : 'far'} fa-heart`}></i>
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
          <button className="add-to-cart" onClick={handleAddToCart}>
            <i className="fas fa-plus"></i>
          </button>
        </div>
      </div>
    </Link>
  );
};

/* ============ PAGES ============ */

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'All' || product.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <>
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
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </main>
    </>
  );
};

const ProductDetailPage = () => {
  const { id } = useParams();
  const { addToCart, toggleWishlist, wishlist } = useStore();
  
  const product = products.find(p => p.id === parseInt(id));

  if (!product) {
    return (
      <div className="empty-state">
        <i className="fas fa-exclamation-circle"></i>
        <h2>Product Not Found</h2>
        <Link to="/" className="btn-back">Back to Home</Link>
      </div>
    );
  }

  const discount = product.oldPrice ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100) : 0;

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
    <div className="product-detail">
      <div className="breadcrumb">
        <Link to="/">Home</Link>
        <i className="fas fa-chevron-right" style={{fontSize: '0.75rem'}}></i>
        <span>{product.name}</span>
      </div>

      <div className="detail-grid">
        <div className="detail-image">
          <img src={product.image} alt={product.name} />
        </div>
        
        <div className="detail-info">
          <span className="detail-category">{product.category}</span>
          <h1>{product.name}</h1>
          
          <div className="detail-rating">
            <span className="stars">{renderStars(product.rating)}</span>
            <span>({product.reviews} reviews)</span>
          </div>

          <div className="detail-price">
            <span className="current">${product.price}</span>
            {product.oldPrice && (
              <>
                <span className="old">${product.oldPrice}</span>
                <span className="discount">-{discount}% OFF</span>
              </>
            )}
          </div>

          <p style={{color: 'var(--text-light)', marginBottom: '2rem', lineHeight: 1.8}}>
            {product.description}
          </p>

          <div className="detail-actions">
            <button className="btn-primary" onClick={() => addToCart(product)}>
              <i className="fas fa-shopping-cart"></i> Add to Cart
            </button>
            <button 
              className={`btn-secondary ${wishlist.includes(product.id) ? 'active' : ''}`}
              onClick={() => toggleWishlist(product.id)}
            >
              <i className={`${wishlist.includes(product.id) ? 'fas' : 'far'} fa-heart`}></i>
              {wishlist.includes(product.id) ? 'Wishlisted' : 'Wishlist'}
            </button>
          </div>

          <div className="detail-features">
            <h3><i className="fas fa-check-circle"></i> Key Features</h3>
            <ul>
              <li><i className="fas fa-check"></i> Premium quality guaranteed</li>
              <li><i className="fas fa-check"></i> Free shipping on orders over $50</li>
              <li><i className="fas fa-check"></i> 30-day money-back guarantee</li>
              <li><i className="fas fa-check"></i> 2-year warranty included</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

const WishlistPage = () => {
  const { wishlist } = useStore();
  const wishlistProducts = products.filter(p => wishlist.includes(p.id));

  return (
    <div className="wishlist-page">
      <div className="section-header">
        <h2><i className="fas fa-heart" style={{color: 'var(--secondary)'}}></i> My Wishlist</h2>
        <span>{wishlistProducts.length} items</span>
      </div>

      {wishlistProducts.length === 0 ? (
        <div className="empty-state">
          <i className="fas fa-heart"></i>
          <h2>Your Wishlist is Empty</h2>
          <p>Save your favorite items here for later!</p>
          <Link to="/" className="btn-back">Browse Products</Link>
        </div>
      ) : (
        <div className="wishlist-grid">
          {wishlistProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

const CartPage = () => {
  const { cart, updateQty, removeFromCart, cartTotal } = useStore();
  const navigate = useNavigate();

  return (
    <div className="cart-page">
      <h1><i className="fas fa-shopping-cart"></i> Shopping Cart</h1>

      {cart.length === 0 ? (
        <div className="empty-state">
          <i className="fas fa-shopping-basket"></i>
          <h2>Your Cart is Empty</h2>
          <p>Add some products to get started!</p>
          <Link to="/" className="btn-back">Continue Shopping</Link>
        </div>
      ) : (
        <>
          <div className="cart-list">
            {cart.map(item => (
              <div key={item.id} className="cart-item-row">
                <img src={item.image} alt={item.name} />
                <div className="cart-item-details">
                  <h3>{item.name}</h3>
                  <p>{item.category}</p>
                </div>
                <div className="cart-item-price">${item.price}</div>
                <div className="qty-control">
                  <button className="qty-btn" onClick={() => updateQty(item.id, -1)}>-</button>
                  <span style={{fontWeight: 700, minWidth: 30, textAlign: 'center'}}>{item.qty}</span>
                  <button className="qty-btn" onClick={() => updateQty(item.id, 1)}>+</button>
                </div>
                <button className="remove-btn" onClick={() => removeFromCart(item.id)}>
                  <i className="fas fa-trash"></i>
                </button>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <div className="summary-row">
              <span>Subtotal</span>
              <span>${cartTotal.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Shipping</span>
              <span>{cartTotal > 50 ? 'FREE' : '$5.00'}</span>
            </div>
            <div className="summary-row total">
              <span>Total</span>
              <span>${(cartTotal > 50 ? cartTotal : cartTotal + 5).toFixed(2)}</span>
            </div>
            <div className="checkout-actions">
              <button className="btn-primary" onClick={() => navigate('/checkout')}>
                <i className="fas fa-lock"></i> Proceed to Checkout
              </button>
              <Link to="/" className="btn-secondary" style={{textDecoration: 'none'}}>
                Continue Shopping
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

const CheckoutPage = () => {
  const { cart, cartTotal, clearCart, showToast } = useStore();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    showToast('Order placed successfully!');
    clearCart();
    setTimeout(() => navigate('/'), 2000);
  };

  if (cart.length === 0) {
    return (
      <div className="empty-state" style={{padding: '5rem 2rem'}}>
        <i className="fas fa-exclamation-circle"></i>
        <h2>Your Cart is Empty</h2>
        <Link to="/" className="btn-back">Back to Shopping</Link>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <h1><i className="fas fa-credit-card"></i> Checkout</h1>

      <div className="order-summary">
        <h3>Order Summary</h3>
        {cart.map(item => (
          <div key={item.id} className="order-item">
            <span>{item.name} x {item.qty}</span>
            <span>${(item.price * item.qty).toFixed(2)}</span>
          </div>
        ))}
        <div className="order-total">
          <span>Total</span>
          <span>${cartTotal.toFixed(2)}</span>
        </div>
      </div>

      <form className="checkout-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Full Name</label>
          <input type="text" placeholder="John Doe" required />
        </div>
        <div className="form-group">
          <label>Email Address</label>
          <input type="email" placeholder="john@example.com" required />
        </div>
        <div className="form-group">
          <label>Shipping Address</label>
          <input type="text" placeholder="123 Main Street, City, Country" required />
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>Card Number</label>
            <input type="text" placeholder="1234 5678 9012 3456" required />
          </div>
          <div className="form-group">
            <label>Expiry (MM/YY)</label>
            <input type="text" placeholder="12/26" required />
          </div>
        </div>
        <button type="submit" className="btn-primary" style={{width: '100%', marginTop: '1rem'}}>
          <i className="fas fa-lock"></i> Place Order (${cartTotal.toFixed(2)})
        </button>
      </form>
    </div>
  );
};

const Toast = () => {
  const { toast } = useStore();
  return (
    <div className={`toast ${toast.visible ? 'show' : ''}`}>
      <i className="fas fa-check-circle"></i>
      {toast.message}
    </div>
  );
};

/* ============ MAIN APP ============ */

const App = () => {
  return (
    <StoreProvider>
      <Router>
        <style>{styles}</style>
        <div className="app" style={{display: 'flex', flexDirection: 'column', minHeight: '100vh'}}>
          <Navbar />
          
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/product/:id" element={<ProductDetailPage />} />
            <Route path="/wishlist" element={<WishlistPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
          </Routes>

          <Toast />

          <footer className="footer">
            <div className="footer-content">
              <h3><i className="fas fa-shopping-bag"></i> LuxeStore</h3>
              <p>Premium products for premium people</p>
            </div>
          </footer>
        </div>
      </Router>
    </StoreProvider>
  );
};

export default App;