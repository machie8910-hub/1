const { useState, useEffect, useMemo, useRef } = React;

// --- Framer Motion Fallback ---
const Motion = window.Motion || {
  div: ({ children, ...props }) => <div {...props}>{children}</div>,
  section: ({ children, ...props }) => <section {...props}>{children}</section>,
  nav: ({ children, ...props }) => <nav {...props}>{children}</nav>,
  button: ({ children, ...props }) => <button {...props}>{children}</button>,
  h1: ({ children, ...props }) => <h1 {...props}>{children}</h1>,
  p: ({ children, ...props }) => <p {...props}>{children}</p>,
  AnimatePresence: ({ children }) => <>{children}</>
};

// --- Constants ---
const CONFIG = {
  BRAND: "TKTM",
  WHATSAPP: "6288973262022",
  CURRENCY: "IDR",
  LOCALE: "id-ID"
};

const INITIAL_PRODUCTS = [
  {
    id: 1,
    name: "Cyberpunk Tech Hoodie",
    price: 450000,
    category: "Outerwear",
    images: [
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&q=80&w=800"
    ],
    description: "Hoodie futuristik dengan material tahan air dan detail reflektif untuk keamanan di malam hari. Cocok untuk gaya urban techwear."
  },
  {
    id: 2,
    name: "Tactical Cargo Pants v2",
    price: 550000,
    category: "Bottoms",
    images: [
      "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&q=80&w=800"
    ],
    description: "Celana cargo taktis dengan 10 kantong fungsional. Menggunakan material durabel yang nyaman digunakan sepanjang hari."
  },
  {
    id: 3,
    name: "Stealth Tech Mask",
    price: 150000,
    category: "Accessories",
    images: [
      "https://images.unsplash.com/photo-1598257006458-087169a1f08d?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1583209814683-c023dd293cc6?auto=format&fit=crop&q=80&w=800"
    ],
    description: "Masker pelindung dengan sistem filtrasi canggih dan desain ergonomis yang terinspirasi dari estetika cyberpunk."
  },
  {
    id: 4,
    name: "Neon Street Jacket",
    price: 750000,
    category: "Outerwear",
    images: [
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=800"
    ],
    description: "Jaket bomber dengan aksen neon yang mencolok. Tahan angin dan memiliki lapisan dalam yang hangat."
  },
  {
    id: 5,
    name: "Modular Stealth Backpack",
    price: 600000,
    category: "Accessories",
    images: [
      "https://images.unsplash.com/photo-1553062407-98eeb94c6a62?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&q=80&w=800"
    ],
    description: "Ransel modular yang dapat dikonfigurasi sesuai kebutuhan. Dilengkapi dengan kompartemen laptop terlindungi."
  },
  {
    id: 6,
    name: "Urban Tactical Vest",
    price: 400000,
    category: "Outerwear",
    images: [
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&q=80&w=800"
    ],
    description: "Rompi taktis ringan untuk layering. Menambah kesan technical pada tampilan streetwear Anda."
  }
];

// --- Components ---

const LucideIcon = ({ name, size = 24, className = "" }) => {
  useEffect(() => {
    if (window.lucide) {
      window.lucide.createIcons();
    }
  }, [name]);

  return <i data-lucide={name} style={{ width: size, height: size }} className={className}></i>;
};

const Toast = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[200] bg-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-3 animate-in">
      <div className="w-2 h-2 rounded-full bg-[#e11d48]"></div>
      <span className="font-semibold text-[#0a0a0a] text-sm toast-content">{message}</span>
    </div>
  );
};

const Navbar = ({ cartCount, onCartClick, onMenuClick, isMenuOpen, searchQuery, setSearchQuery }) => (
  <nav className="fixed top-0 left-0 right-0 z-50 glass h-20 flex items-center">
    <div className="container mx-auto px-6 flex items-center justify-between">
      <div className="flex items-center gap-8">
        <a href="#" className="text-2xl font-black tracking-tighter text-white flex items-center gap-2">
          <div className="w-8 h-8 bg-accent flex items-center justify-center rounded">T</div>
          {CONFIG.BRAND}
        </a>
        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-400">
          <a href="#koleksi" className="hover:text-accent transition-colors">Koleksi</a>
          <a href="#terbaru" className="hover:text-accent transition-colors">Terbaru</a>
          <a href="#kontak" className="hover:text-accent transition-colors">Kontak</a>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative hidden sm:block">
          <input
            type="text"
            placeholder="Cari produk..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label="Cari produk"
            className="bg-zinc-900 border border-zinc-800 rounded-full py-2 px-10 text-sm focus:outline-none focus:border-accent w-48 lg:w-64 transition-all"
          />
          <LucideIcon name="search" size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
        </div>

        <button
          onClick={onCartClick}
          aria-label="Buka keranjang"
          className="relative p-2 hover:bg-zinc-900 rounded-full transition-colors group"
        >
          <LucideIcon name="shopping-cart" className="group-hover:text-accent transition-colors" />
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-accent text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-[#0a0a0a]">
              {cartCount}
            </span>
          )}
        </button>

        <button
          onClick={onMenuClick}
          aria-label="Menu"
          className="md:hidden p-2 hover:bg-zinc-900 rounded-full transition-colors"
        >
          <LucideIcon name={isMenuOpen ? "x" : "menu"} />
        </button>
      </div>
    </div>
  </nav>
);

const Hero = () => (
  <section className="relative h-[90vh] flex items-center justify-center overflow-hidden pt-20">
    <div className="absolute inset-0 z-0">
      <img
        src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=2000"
        className="w-full h-full object-cover opacity-30 grayscale"
        alt="Hero background"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent"></div>
    </div>

    <div className="container mx-auto px-6 relative z-10 text-center">
      <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-6 leading-none animate-in">
        URBAN<br />
        <span className="text-accent">SYNTHESIS</span>
      </h1>
      <p className="text-zinc-400 max-w-xl mx-auto mb-10 text-lg md:text-xl animate-in" style={{ animationDelay: '0.1s' }}>
        Koleksi techwear futuristik yang memadukan fungsi taktis dengan estetika cyberpunk urban.
      </p>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-in" style={{ animationDelay: '0.2s' }}>
        <a href="#koleksi" className="bg-white text-black px-8 py-4 rounded font-bold hover:bg-accent hover:text-white transition-all w-full sm:w-auto">
          Lihat Koleksi
        </a>
        <a href="#terbaru" className="border border-zinc-800 px-8 py-4 rounded font-bold hover:bg-zinc-900 transition-all w-full sm:w-auto">
          Terbaru 2024
        </a>
      </div>
    </div>
  </section>
);

const ProductCard = ({ product, onOpen, onAddToCart }) => (
  <div className="group animate-in">
    <div className="relative aspect-[4/5] overflow-hidden rounded-sm mb-4 bg-zinc-900">
      <img
        src={product.images[0]}
        alt={product.name}
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
      />
      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
        <button
          onClick={() => onOpen(product)}
          className="bg-white text-black p-3 rounded-full hover:bg-accent hover:text-white transition-colors"
          aria-label={`Detail ${product.name}`}
        >
          <LucideIcon name="eye" size={20} />
        </button>
        <button
          onClick={() => onAddToCart(product)}
          className="bg-white text-black p-3 rounded-full hover:bg-accent hover:text-white transition-colors"
          aria-label={`Tambah ${product.name} ke keranjang`}
        >
          <LucideIcon name="plus" size={20} />
        </button>
      </div>
      <div className="absolute top-4 left-4">
        <span className="bg-accent text-white text-[10px] font-black uppercase px-2 py-1 tracking-widest">
          {product.category}
        </span>
      </div>
    </div>
    <div className="flex justify-between items-start">
      <div>
        <h3 className="font-bold text-lg mb-1 group-hover:text-accent transition-colors">{product.name}</h3>
        <p className="text-zinc-500 text-sm">Rp {product.price.toLocaleString(CONFIG.LOCALE)}</p>
      </div>
    </div>
  </div>
);

const ProductModal = ({ product, onClose, onAddToCart }) => {
  const [activeImage, setActiveImage] = useState(0);

  if (!product) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" onClick={onClose}></div>
      <div className="bg-[#0f0f0f] w-full max-w-5xl rounded-sm overflow-hidden relative z-10 flex flex-col md:flex-row max-h-[90vh]">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 bg-black/50 p-2 rounded-full hover:text-accent transition-colors"
          aria-label="Tutup"
        >
          <LucideIcon name="x" />
        </button>

        <div className="md:w-1/2 h-[40vh] md:h-auto overflow-hidden bg-zinc-900 relative">
          <img
            src={product.images[activeImage]}
            alt={product.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-6 left-6 flex gap-2">
            {product.images.map((img, i) => (
              <button
                key={i}
                onClick={() => setActiveImage(i)}
                className={`w-16 h-16 rounded-sm overflow-hidden border-2 transition-all ${activeImage === i ? 'border-accent' : 'border-transparent opacity-50 hover:opacity-100'}`}
              >
                <img src={img} className="w-full h-full object-cover" alt="" />
              </button>
            ))}
          </div>
        </div>

        <div className="md:w-1/2 p-8 md:p-12 overflow-y-auto">
          <div className="mb-8">
            <span className="text-accent text-xs font-black uppercase tracking-[0.2em] mb-2 block">{product.category}</span>
            <h2 className="text-3xl md:text-4xl font-black tracking-tighter mb-4">{product.name}</h2>
            <p className="text-2xl font-bold text-white/90">Rp {product.price.toLocaleString(CONFIG.LOCALE)}</p>
          </div>

          <div className="prose prose-invert mb-10">
            <p className="text-zinc-400 leading-relaxed">{product.description}</p>
          </div>

          <div className="space-y-4">
            <button
              onClick={() => { onAddToCart(product); onClose(); }}
              className="w-full bg-accent hover:bg-accent-hover text-white py-5 font-bold flex items-center justify-center gap-3 transition-colors"
            >
              <LucideIcon name="shopping-cart" size={20} />
              Tambah ke Keranjang
            </button>
            <button
              onClick={() => {
                const message = `Halo ${CONFIG.BRAND}, saya ingin membeli ${product.name} - Rp ${product.price.toLocaleString(CONFIG.LOCALE)}`;
                window.open(`https://wa.me/${CONFIG.WHATSAPP}?text=${encodeURIComponent(message)}`, "_blank");
              }}
              className="w-full border border-zinc-800 hover:bg-zinc-900 text-white py-5 font-bold transition-colors"
            >
              Beli Sekarang via WhatsApp
            </button>
          </div>

          <div className="mt-10 pt-10 border-t border-zinc-800 grid grid-cols-2 gap-6">
            <div className="flex items-center gap-3">
              <LucideIcon name="truck" className="text-accent" size={20} />
              <div className="text-[10px] uppercase font-bold tracking-widest text-zinc-500">Free Shipping</div>
            </div>
            <div className="flex items-center gap-3">
              <LucideIcon name="shield-check" className="text-accent" size={20} />
              <div className="text-[10px] uppercase font-bold tracking-widest text-zinc-500">Official Warranty</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Cart = ({ items, onClose, onRemove, onUpdateQty, onCheckout, total }) => (
  <div className="fixed inset-0 z-[150] flex justify-end">
    <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose}></div>
    <div className="bg-[#0a0a0a] w-full max-w-md relative z-10 flex flex-col h-full border-l border-zinc-800">
      <div className="p-6 border-b border-zinc-800 flex items-center justify-between">
        <h2 className="text-xl font-black tracking-tight">KERANJANG ({items.length})</h2>
        <button onClick={onClose} aria-label="Tutup" className="p-2 hover:text-accent transition-colors">
          <LucideIcon name="x" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {items.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-zinc-600 gap-4">
            <LucideIcon name="shopping-bag" size={48} />
            <p className="font-medium">Keranjang Anda kosong</p>
          </div>
        ) : (
          items.map(item => (
            <div key={item.id} className="flex gap-4 group">
              <div className="w-20 h-24 bg-zinc-900 flex-shrink-0 overflow-hidden">
                <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between mb-1">
                  <h3 className="font-bold text-sm">{item.name}</h3>
                  <button onClick={() => onRemove(item.id)} className="text-zinc-600 hover:text-accent">
                    <LucideIcon name="trash-2" size={16} />
                  </button>
                </div>
                <p className="text-zinc-500 text-xs mb-3">Rp {item.price.toLocaleString(CONFIG.LOCALE)}</p>
                <div className="flex items-center gap-3">
                  <button onClick={() => onUpdateQty(item.id, -1)} className="w-8 h-8 flex items-center justify-center border border-zinc-800 hover:border-zinc-600 transition-colors">-</button>
                  <span className="text-sm font-bold">{item.quantity}</span>
                  <button onClick={() => onUpdateQty(item.id, 1)} className="w-8 h-8 flex items-center justify-center border border-zinc-800 hover:border-zinc-600 transition-colors">+</button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="p-6 border-t border-zinc-800 bg-zinc-900/50">
        <div className="flex justify-between mb-6">
          <span className="text-zinc-400 font-medium">Subtotal</span>
          <span className="text-xl font-black">Rp {total.toLocaleString(CONFIG.LOCALE)}</span>
        </div>
        <button
          onClick={onCheckout}
          disabled={items.length === 0}
          className="w-full bg-white text-black hover:bg-accent hover:text-white py-5 font-black uppercase tracking-widest disabled:opacity-50 disabled:hover:bg-white disabled:hover:text-black transition-all"
        >
          CHECKOUT VIA WHATSAPP
        </button>
      </div>
    </div>
  </div>
);

// --- Main App ---

const App = () => {
  const [cart, setCart] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toasts, setToasts] = useState([]);

  const addToast = (message) => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message }]);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    addToast(`${product.name} ditambahkan ke keranjang`);
  };

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id, delta) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const filteredProducts = useMemo(() => {
    return INITIAL_PRODUCTS.filter(p =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const totalCartPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleCheckout = () => {
    if (cart.length === 0) return;

    const message = `Halo ${CONFIG.BRAND}, saya ingin memesan:\n\n` +
      cart.map(item => `- ${item.name} (x${item.quantity}) - Rp ${item.price.toLocaleString(CONFIG.LOCALE)}`).join("\n") +
      `\n\nTotal: Rp ${totalCartPrice.toLocaleString(CONFIG.LOCALE)}\n\nTerima kasih!`;

    const waUrl = `https://wa.me/${CONFIG.WHATSAPP}?text=${encodeURIComponent(message)}`;
    window.open(waUrl, "_blank");

    setCart([]);
    setIsCartOpen(false);
    addToast("Pesanan dikirim! Menghubungi WhatsApp...");
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white selection:bg-accent selection:text-white">
      <Navbar
        cartCount={cart.reduce((s, i) => s + i.quantity, 0)}
        onCartClick={() => setIsCartOpen(true)}
        onMenuClick={() => setIsMenuOpen(!isMenuOpen)}
        isMenuOpen={isMenuOpen}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      <Hero />

      <section id="koleksi" className="py-24">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div className="max-w-2xl">
              <span className="text-accent text-xs font-black uppercase tracking-[0.2em] mb-4 block">Archive 2024</span>
              <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-6">CORE COLLECTION</h2>
              <p className="text-zinc-500">Setiap item dirancang untuk ketahanan maksimal dan fleksibilitas gaya urban modern.</p>
            </div>
            <div className="text-sm font-bold tracking-widest text-zinc-500 uppercase flex items-center gap-4">
              <span className="text-white">01</span>
              <div className="w-20 h-[1px] bg-zinc-800"></div>
              <span>{filteredProducts.length} Items</span>
            </div>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="py-20 text-center border border-dashed border-zinc-800 rounded">
              <p className="text-zinc-500">Tidak ada produk yang ditemukan untuk "{searchQuery}"</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
              {filteredProducts.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onOpen={setSelectedProduct}
                  onAddToCart={addToCart}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      <footer id="kontak" className="py-20 border-t border-zinc-900 bg-zinc-900/20">
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
          <div className="md:col-span-2">
            <a href="#" className="text-3xl font-black tracking-tighter mb-6 block">{CONFIG.BRAND}</a>
            <p className="text-zinc-500 max-w-sm mb-8">Pionir techwear dan streetwear di Indonesia dengan standar kualitas internasional.</p>
            <div className="flex gap-4">
              {['instagram', 'twitter', 'facebook', 'youtube'].map(s => (
                <a key={s} href="#" className="w-10 h-10 border border-zinc-800 rounded-full flex items-center justify-center hover:bg-accent hover:border-accent transition-all">
                  <LucideIcon name={s} size={18} />
                </a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-bold mb-6 uppercase tracking-widest text-xs">Informasi</h4>
            <ul className="space-y-4 text-zinc-500 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Tentang Kami</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Pengiriman</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Kebijakan Privasi</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Syarat & Ketentuan</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-6 uppercase tracking-widest text-xs">Hubungi Kami</h4>
            <ul className="space-y-4 text-zinc-500 text-sm">
              <li className="flex items-center gap-3"><LucideIcon name="mail" size={16} /> support@tktm.com</li>
              <li className="flex items-center gap-3"><LucideIcon name="phone" size={16} /> +62 889 7326 2022</li>
              <li className="flex items-start gap-3"><LucideIcon name="map-pin" size={16} /> Jakarta, Indonesia</li>
            </ul>
          </div>
        </div>
        <div className="container mx-auto px-6 border-t border-zinc-900 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-zinc-600 text-[10px] font-bold uppercase tracking-widest">
          <p>© 2024 {CONFIG.BRAND} CORP. ALL RIGHTS RESERVED.</p>
          <div className="flex gap-8">
            <a href="#">Security</a>
            <a href="#">Cookies</a>
            <a href="#">Sitemap</a>
          </div>
        </div>
      </footer>

      {/* Overlays */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={addToCart}
        />
      )}

      {isCartOpen && (
        <Cart
          items={cart}
          onClose={() => setIsCartOpen(false)}
          onRemove={removeFromCart}
          onUpdateQty={updateQuantity}
          onCheckout={handleCheckout}
          total={totalCartPrice}
        />
      )}

      <AnimatePresence>
        {isMenuOpen && (
          <div className="fixed inset-0 z-[100] bg-[#0a0a0a] flex flex-col p-10 animate-in">
             <button onClick={() => setIsMenuOpen(false)} className="self-end p-2 mb-10"><LucideIcon name="x" size={32} /></button>
             <div className="flex flex-col gap-8 text-4xl font-black tracking-tighter">
                <a href="#koleksi" onClick={() => setIsMenuOpen(false)}>KOLEKSI</a>
                <a href="#terbaru" onClick={() => setIsMenuOpen(false)}>TERBARU</a>
                <a href="#kontak" onClick={() => setIsMenuOpen(false)}>KONTAK</a>
             </div>
          </div>
        )}
      </AnimatePresence>

      {toasts.map(toast => (
        <Toast key={toast.id} message={toast.message} onClose={() => removeToast(toast.id)} />
      ))}
    </div>
  );
};

// --- Render ---
const { AnimatePresence } = Motion;
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);