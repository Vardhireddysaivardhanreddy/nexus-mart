import { useState, useEffect } from 'react'

// ============================================================
// Mock Data — Premium Gadgets and Tech Accessories
// ============================================================
const PRODUCTS = [
  {
    id: 1,
    title: "AeroKeys V2 Mechanical Keyboard",
    category: "Peripherals",
    price: 189.99,
    originalPrice: 220.00,
    rating: 4.8,
    reviews: 142,
    emoji: "⌨️",
    discount: "14% OFF",
    desc: "Experience tactile perfection with custom hot-swappable switches, double-shot PBT keycaps, and a solid aluminum chassis. Wireless tri-mode connectivity included.",
    specs: ["Switches: Linear Teal (Hot-swappable)", "Layout: 75% compact", "Battery: 4000mAh up to 200 hours", "Backlight: RGB South-facing"]
  },
  {
    id: 2,
    title: "ApexGlow Wireless Gaming Mouse",
    category: "Peripherals",
    price: 99.50,
    originalPrice: 129.99,
    rating: 4.6,
    reviews: 98,
    emoji: "🖱️",
    discount: "23% OFF",
    desc: "An ultra-lightweight ergonomic mouse featuring a 26K DPI optical sensor, optical switches rated for 90 million clicks, and lag-free wireless response.",
    specs: ["Sensor: Focus Pro 30K", "Weight: 54 grams", "Battery Life: 90 hours", "Connectivity: HyperSpeed 2.4GHz"]
  },
  {
    id: 3,
    title: "SonicZen Active Noise Cancelling Headphones",
    category: "Audio",
    price: 299.00,
    originalPrice: 349.00,
    rating: 4.9,
    reviews: 215,
    emoji: "🎧",
    discount: "15% OFF",
    desc: "Immerse yourself in pure audio bliss. Custom 40mm dynamic drivers deliver exceptional depth and clarity, matched with industry-leading hybrid active noise cancellation.",
    specs: ["ANC: Hybrid 4-mic system", "Battery: 45 hours (ANC On)", "Codec: LDAC, AAC, SBC", "Charge: USB-C Fast Charge (5m = 5h)"]
  },
  {
    id: 4,
    title: "NovaCharge 140W Multi-Port Charger",
    category: "Accessories",
    price: 59.99,
    originalPrice: 79.99,
    rating: 4.7,
    reviews: 64,
    emoji: "🔌",
    discount: "25% OFF",
    desc: "Simplify your desk setup with GaNFast technology. Fast charge three devices simultaneously with a maximum output of 140W from single port.",
    specs: ["Ports: 2x USB-C, 1x USB-A", "Technology: GaN III Tech", "Output: PD 3.1 Certified", "Protection: Over-current & thermal safeguard"]
  },
  {
    id: 5,
    title: "Nomad Roll-Top Minimalist Backpack",
    category: "Lifestyle",
    price: 145.00,
    originalPrice: 145.00,
    rating: 4.5,
    reviews: 112,
    emoji: "🎒",
    discount: null,
    desc: "Weatherproof roll-top bag engineered for digital nomads. Features dedicated padded sleeves for a 16-inch laptop and tablet, plus easy side-access pockets.",
    specs: ["Material: 900D Cordura Waterproof Nylon", "Capacity: 22L to 28L expandable", "Laptop Compartment: Up to 16\" MacBook Pro", "Zippers: YKK AquaGuard"]
  },
  {
    id: 6,
    title: "VividCore Portable SSD 2TB",
    category: "Storage",
    price: 179.00,
    originalPrice: 199.00,
    rating: 4.8,
    reviews: 87,
    emoji: "💾",
    discount: "10% OFF",
    desc: "Blazing fast read/write speeds up to 2000MB/s wrapped in a shockproof, IP65-rated silicon sleeve. Perfect for high-res photo editing and console gaming storage.",
    specs: ["Speed: Up to 2000 MB/s", "Interface: USB 3.2 Gen 2x2 Type-C", "Durability: IP65 Dust & Water Resistant", "Compatibility: Windows, Mac, iPad, PS5"]
  },
  {
    id: 7,
    title: "FitPulse Smart OLED Watch",
    category: "Wearables",
    price: 219.00,
    originalPrice: 249.00,
    rating: 4.4,
    reviews: 156,
    emoji: "⌚",
    discount: "12% OFF",
    desc: "Track health metrics with military precision. Features real-time heart rate monitoring, blood oxygen sensing, comprehensive sleep analysis, and 120+ workout modes.",
    specs: ["Display: 1.43\" AMOLED Always-On", "Sensors: 6-axis accelerometer, SpO2, Heart", "Battery: Up to 14 days", "Waterproof: 5ATM rating"]
  },
  {
    id: 8,
    title: "Lumina RGB Ambient Light Bars",
    category: "Accessories",
    price: 45.00,
    originalPrice: 59.99,
    rating: 4.5,
    reviews: 53,
    emoji: "💡",
    discount: "25% OFF",
    desc: "Upgrade your battle station visual depth. Smart lighting bars sync with PC audio or screen colors to cast dynamic ambient glows onto your walls.",
    specs: ["Control: Smart App, Alexa, Google Home", "Colors: 16.8 million colors", "Modes: 12 dynamic scene presets", "Mounting: Vertical stand or monitor-mount"]
  }
];

export default function App() {
  // ============================================================
  // Application States
  // ============================================================
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('nexusmart_cart');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });
  const [sortBy, setSortBy] = useState("featured");
  
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);
  
  const [toasts, setToasts] = useState([]);
  
  // Checkout Form State
  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    card: "",
    expiry: "",
    cvv: ""
  });
  const [formErrors, setFormErrors] = useState({});

  // Sync cart to localStorage
  useEffect(() => {
    localStorage.setItem('nexusmart_cart', JSON.stringify(cart));
  }, [cart]);

  // ============================================================
  // Toast Helper
  // ============================================================
  const showToast = (message) => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3000);
  };

  // ============================================================
  // Cart Actions
  // ============================================================
  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.product.id === product.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    showToast(`Added ${product.title} to cart`);
  };

  const updateQuantity = (productId, delta) => {
    setCart(prev => prev.map(item => {
      if (item.product.id === productId) {
        const nextQty = item.quantity + delta;
        return nextQty > 0 ? { ...item, quantity: nextQty } : null;
      }
      return item;
    }).filter(Boolean));
  };

  const removeFromCart = (productId) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
    showToast("Item removed from cart");
  };

  const clearCart = () => {
    setCart([]);
  };

  // ============================================================
  // Checkout Validation & Submit
  // ============================================================
  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (formErrors[e.target.name]) {
      setFormErrors({ ...formErrors, [e.target.name]: "" });
    }
  };

  const handleCheckoutSubmit = (e) => {
    e.preventDefault();
    const errors = {};
    if (!form.name.trim()) errors.name = "Name is required";
    if (!form.email.includes("@")) errors.email = "Valid email is required";
    if (!form.address.trim()) errors.address = "Address is required";
    if (form.card.replace(/\s/g, "").length < 16) errors.card = "Valid 16-digit card required";
    if (!/^\d{2}\/\d{2}$/.test(form.expiry)) errors.expiry = "Use MM/YY format";
    if (form.cvv.length !== 3) errors.cvv = "Must be 3 digits";

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      showToast("Please fix the validation errors");
      return;
    }

    setCheckoutSuccess(true);
    clearCart();
    setForm({ name: "", email: "", address: "", card: "", expiry: "", cvv: "" });
  };

  // ============================================================
  // Product Filtering & Sorting Logic
  // ============================================================
  const filteredProducts = PRODUCTS.filter(prod => {
    const matchesSearch = prod.title.toLowerCase().includes(search.toLowerCase()) || 
                          prod.category.toLowerCase().includes(search.toLowerCase());
    
    const matchesCategory = category === "All" || prod.category === category;
    
    const minPrice = priceRange.min === "" ? 0 : parseFloat(priceRange.min);
    const maxPrice = priceRange.max === "" ? Infinity : parseFloat(priceRange.max);
    const matchesPrice = prod.price >= minPrice && prod.price <= maxPrice;
    
    return matchesSearch && matchesCategory && matchesPrice;
  }).sort((a, b) => {
    if (sortBy === "price-asc") return a.price - b.price;
    if (sortBy === "price-desc") return b.price - a.price;
    if (sortBy === "rating") return b.rating - a.rating;
    return 0; // Default Featured (no-op)
  });

  const categories = ["All", ...new Set(PRODUCTS.map(p => p.category))];

  // Cart Calculations
  const cartSubtotal = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const tax = cartSubtotal * 0.08;
  const shipping = cartSubtotal > 150 || cartSubtotal === 0 ? 0 : 15.00;
  const cartTotal = cartSubtotal + tax + shipping;

  return (
    <div className="app-container">
      {/* HEADER */}
      <header className="header glass">
        <div className="logo">
          <span>Nexus</span>Mart
        </div>
        <div className="header-actions">
          <button className="cart-trigger glass" onClick={() => setIsCartOpen(true)}>
            🛒
            {cart.length > 0 && (
              <div className="cart-count">
                {cart.reduce((sum, item) => sum + item.quantity, 0)}
              </div>
            )}
          </button>
        </div>
      </header>

      {/* MAIN LAYOUT */}
      <main className="main-content">
        {/* FILTERS SIDEBAR */}
        <aside className="filters-sidebar glass">
          <div className="filter-section">
            <h3 className="filter-title">Search Products</h3>
            <input 
              type="text" 
              className="search-input" 
              placeholder="Type brand, category..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="filter-section">
            <h3 className="filter-title">Categories</h3>
            <ul className="category-list">
              {categories.map(cat => (
                <li key={cat}>
                  <button 
                    className={`category-btn ${category === cat ? 'active' : ''}`}
                    onClick={() => setCategory(cat)}
                  >
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="filter-section">
            <h3 className="filter-title">Price Range</h3>
            <div className="range-inputs">
              <input 
                type="number" 
                placeholder="Min" 
                value={priceRange.min}
                onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })}
              />
              <span>—</span>
              <input 
                type="number" 
                placeholder="Max" 
                value={priceRange.max}
                onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })}
              />
            </div>
          </div>
        </aside>

        {/* PRODUCTS SECTION */}
        <section className="products-section">
          <div className="section-header">
            <div>
              <h2>Premium Catalog</h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '4px' }}>
                Showing {filteredProducts.length} items
              </p>
            </div>
            <select 
              className="sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="featured">Sort by: Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>

          <div className="products-grid">
            {filteredProducts.map(prod => (
              <div key={prod.id} className="product-card glass">
                {prod.discount && (
                  <span className="badge badge-success product-discount">{prod.discount}</span>
                )}
                <div 
                  className="product-image-container" 
                  onClick={() => setSelectedProduct(prod)}
                  style={{ cursor: 'pointer' }}
                >
                  {prod.emoji}
                </div>
                <div className="product-info">
                  <span className="product-category">{prod.category}</span>
                  <h3 
                    className="product-title"
                    onClick={() => setSelectedProduct(prod)}
                    style={{ cursor: 'pointer' }}
                  >
                    {prod.title}
                  </h3>
                  <div className="product-rating">
                    ★ {prod.rating} <span className="rating-count">({prod.reviews} reviews)</span>
                  </div>
                  <div className="product-footer">
                    <div className="product-price-box">
                      {prod.originalPrice > prod.price && (
                        <span className="original-price">${prod.originalPrice.toFixed(2)}</span>
                      )}
                      <span className="price">${prod.price.toFixed(2)}</span>
                    </div>
                    <button className="add-to-cart-btn" onClick={() => addToCart(prod)}>
                      ＋
                    </button>
                  </div>
                </div>
              </div>
            ))}
            {filteredProducts.length === 0 && (
              <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '4rem 0' }}>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem' }}>No products match your criteria.</p>
              </div>
            )}
          </div>
        </section>
      </main>

      {/* PRODUCT DETAIL MODAL */}
      {selectedProduct && (
        <div className="modal-overlay" onClick={() => setSelectedProduct(null)}>
          <div className="modal-content glass" onClick={(e) => e.stopPropagation()}>
            <div className="detail-grid">
              <div className="detail-img">
                {selectedProduct.emoji}
              </div>
              <div className="detail-info">
                <div>
                  <span className="product-category">{selectedProduct.category}</span>
                  <h2 style={{ fontSize: '1.5rem', marginTop: '4px' }}>{selectedProduct.title}</h2>
                  <div className="product-rating" style={{ marginTop: '8px' }}>
                    ★ {selectedProduct.rating} <span className="rating-count">({selectedProduct.reviews} reviews)</span>
                  </div>
                </div>
                <p className="detail-desc">{selectedProduct.desc}</p>
                <div>
                  <h4 style={{ fontSize: '0.9rem', marginBottom: '8px' }}>Key Specifications:</h4>
                  <ul style={{ listStyle: 'circle', paddingLeft: '20px', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                    {selectedProduct.specs.map((spec, i) => <li key={i} style={{ marginBottom: '4px' }}>{spec}</li>)}
                  </ul>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem' }}>
                  <span style={{ fontSize: '1.75rem', fontWeight: 800, fontFamily: 'var(--font-display)' }}>
                    ${selectedProduct.price.toFixed(2)}
                  </span>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <button className="glow-btn" onClick={() => { addToCart(selectedProduct); setSelectedProduct(null); }}>
                      Add to Cart
                    </button>
                    <button className="glass" style={{ padding: '10px 16px', borderRadius: '8px' }} onClick={() => setSelectedProduct(null)}>
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SIDEBAR CART */}
      <div className={`cart-overlay ${isCartOpen ? 'open' : ''}`} onClick={() => setIsCartOpen(false)}>
        <div className="cart-sidebar" onClick={(e) => e.stopPropagation()}>
          <div className="cart-header">
            <h3>Shopping Cart</h3>
            <button className="close-btn" onClick={() => setIsCartOpen(false)}>✕</button>
          </div>
          
          <div className="cart-items">
            {cart.map(item => (
              <div key={item.product.id} className="cart-item">
                <div className="cart-item-img">{item.product.emoji}</div>
                <div className="cart-item-details">
                  <h4 className="cart-item-title">{item.product.title}</h4>
                  <span className="cart-item-price">${item.product.price.toFixed(2)}</span>
                </div>
                <div className="cart-item-actions">
                  <button className="qty-btn" onClick={() => updateQuantity(item.product.id, -1)}>-</button>
                  <span>{item.quantity}</span>
                  <button className="qty-btn" onClick={() => updateQuantity(item.product.id, 1)}>+</button>
                  <button className="remove-item-btn" onClick={() => removeFromCart(item.product.id)}>🗑️</button>
                </div>
              </div>
            ))}
            {cart.length === 0 && (
              <div style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--text-secondary)' }}>
                <p>Your cart is empty.</p>
              </div>
            )}
          </div>

          {cart.length > 0 && (
            <div className="cart-footer">
              <div className="summary-row">
                <span>Subtotal</span>
                <span>${cartSubtotal.toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span>Estimated Tax (8%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span>Shipping</span>
                <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
              </div>
              <div className="summary-row total">
                <span>Total</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <button 
                className="glow-btn" 
                style={{ width: '100%', marginTop: '1.5rem', padding: '14px' }}
                onClick={() => { setIsCartOpen(false); setIsCheckoutOpen(true); }}
              >
                Proceed to Checkout
              </button>
            </div>
          )}
        </div>
      </div>

      {/* CHECKOUT MODAL */}
      {isCheckoutOpen && (
        <div className="modal-overlay" onClick={() => setIsCheckoutOpen(false)}>
          <div className="modal-content glass" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '500px' }}>
            {!checkoutSuccess ? (
              <div className="checkout-panel">
                <h2 style={{ marginBottom: '1.5rem', fontFamily: 'var(--font-display)' }}>Secure Checkout</h2>
                <form onSubmit={handleCheckoutSubmit} className="checkout-grid">
                  <div className="form-group">
                    <label>Full Name</label>
                    <input 
                      type="text" 
                      name="name" 
                      value={form.name} 
                      onChange={handleInputChange} 
                      placeholder="Jane Doe"
                    />
                    {formErrors.name && <span style={{ color: 'var(--danger)', fontSize: '0.75rem' }}>{formErrors.name}</span>}
                  </div>

                  <div className="form-group">
                    <label>Email Address</label>
                    <input 
                      type="email" 
                      name="email" 
                      value={form.email} 
                      onChange={handleInputChange} 
                      placeholder="jane@example.com"
                    />
                    {formErrors.email && <span style={{ color: 'var(--danger)', fontSize: '0.75rem' }}>{formErrors.email}</span>}
                  </div>

                  <div className="form-group">
                    <label>Shipping Address</label>
                    <input 
                      type="text" 
                      name="address" 
                      value={form.address} 
                      onChange={handleInputChange} 
                      placeholder="123 tech park road, Bengaluru"
                    />
                    {formErrors.address && <span style={{ color: 'var(--danger)', fontSize: '0.75rem' }}>{formErrors.address}</span>}
                  </div>

                  <div className="form-group">
                    <label>Card Number</label>
                    <input 
                      type="text" 
                      name="card" 
                      value={form.card} 
                      onChange={(e) => {
                        const val = e.target.value.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim();
                        setForm({ ...form, card: val });
                      }} 
                      placeholder="4000 1234 5678 9010"
                      maxLength="19"
                    />
                    {formErrors.card && <span style={{ color: 'var(--danger)', fontSize: '0.75rem' }}>{formErrors.card}</span>}
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>Expiry Date</label>
                      <input 
                        type="text" 
                        name="expiry" 
                        value={form.expiry} 
                        onChange={(e) => {
                          let val = e.target.value.replace(/\D/g, '');
                          if (val.length > 2) val = val.substring(0,2) + '/' + val.substring(2,4);
                          setForm({ ...form, expiry: val });
                        }} 
                        placeholder="MM/YY"
                        maxLength="5"
                      />
                      {formErrors.expiry && <span style={{ color: 'var(--danger)', fontSize: '0.75rem' }}>{formErrors.expiry}</span>}
                    </div>
                    <div className="form-group">
                      <label>CVV</label>
                      <input 
                        type="password" 
                        name="cvv" 
                        value={form.cvv} 
                        onChange={handleInputChange} 
                        placeholder="123"
                        maxLength="3"
                      />
                      {formErrors.cvv && <span style={{ color: 'var(--danger)', fontSize: '0.75rem' }}>{formErrors.cvv}</span>}
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '10px', marginTop: '1.5rem' }}>
                    <button type="submit" className="glow-btn" style={{ flex: 1, padding: '12px' }}>
                      Pay ${cartTotal.toFixed(2)}
                    </button>
                    <button type="button" className="glass" style={{ padding: '12px 18px', borderRadius: '8px' }} onClick={() => setIsCheckoutOpen(false)}>
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              <div className="success-screen">
                <div className="success-icon">✓</div>
                <h2>Order Placed Successfully!</h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                  Thank you for shopping at NexusMart. Your order has been placed and is being processed.
                </p>
                <button 
                  className="glow-btn" 
                  style={{ width: '100%', padding: '12px', marginTop: '1rem' }} 
                  onClick={() => { setIsCheckoutOpen(false); setCheckoutSuccess(false); }}
                >
                  Continue Shopping
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TOAST NOTIFICATIONS */}
      <div className="toast-container">
        {toasts.map(t => (
          <div key={t.id} className="toast">
            <span>✨</span> {t.message}
          </div>
        ))}
      </div>
    </div>
  );
}
