const { useState, useEffect, useMemo, useRef } = React;

// CONFIG
const CONFIG = {
  BRAND_NAME: "Topiku Topimu",
  WA_NUMBER: "6288973262022",
  COLORS: {
    BRAND: "#0a0a0a",
    ACCENT: "#e11d48"
  }
};

// Framer Motion UMD Helper
const Motion = window.Motion || {
  motion: {
    div: (props) => <div {...props} />,
    h2: (props) => <h2 {...props} />,
    p: (props) => <p {...props} />,
    img: (props) => <img {...props} />,
    button: (props) => <button {...props} />,
    nav: (props) => <nav {...props} />,
    span: (props) => <span {...props} />,
    section: (props) => <section {...props} />
  },
  AnimatePresence: ({ children }) => <>{children}</>
};
const { motion, AnimatePresence } = Motion;

// Mock Data
const PRODUCTS = [
  {
    id: 1,
    nama: "Classic Snapback",
    harga: 150000,
    kategori: "Snapback",
    deskripsi: "Topi snapback klasik dengan desain minimalis namun elegan. Cocok untuk penggunaan sehari-hari maupun acara kasual.",
    info: {
      bahan: "Cotton Twill Premium",
      ukuran: "All Size (Adjustable)",
      fitur: "Flat brim, 6 panels, Adjustable snap closure"
    },
    gambar: {
      depan: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?q=80&w=1000&auto=format&fit=crop",
      samping: "https://images.unsplash.com/photo-1572307480813-ceb0e59d8325?q=80&w=1000&auto=format&fit=crop",
      belakang: "https://images.unsplash.com/photo-1556306535-0f09a537f0a3?q=80&w=1000&auto=format&fit=crop"
    }
  },
  {
    id: 2,
    nama: "Urban Beanie",
    harga: 120000,
    kategori: "Beanie",
    deskripsi: "Beanie rajut hangat dengan material lembut yang tidak gatal di kulit. Pilihan tepat untuk cuaca dingin atau gaya streetwear.",
    info: {
      bahan: "Acrylic Knit Wool",
      ukuran: "Stretch (One size fits most)",
      fitur: "Soft texture, Breathable, Foldable cuff"
    },
    gambar: {
      depan: "https://images.unsplash.com/photo-1575425186775-b8de9a427e67?q=80&w=1000&auto=format&fit=crop",
      samping: "https://images.unsplash.com/photo-1521119989659-a83eee488004?q=80&w=1000&auto=format&fit=crop",
      belakang: "https://images.unsplash.com/photo-1459156212016-c812468e2115?q=80&w=1000&auto=format&fit=crop"
    }
  },
  {
    id: 3,
    nama: "Trucker Mesh",
    harga: 135000,
    kategori: "Trucker",
    deskripsi: "Topi trucker dengan jaring di bagian belakang untuk sirkulasi udara maksimal. Nyaman digunakan di bawah sinar matahari.",
    info: {
      bahan: "Polyester Mesh & Cotton",
      ukuran: "All Size (Adjustable)",
      fitur: "Breathable mesh back, Curved brim, Snap closure"
    },
    gambar: {
      depan: "https://images.unsplash.com/photo-1521369909029-2afed882baee?q=80&w=1000&auto=format&fit=crop",
      samping: "https://images.unsplash.com/photo-1611601322175-ef8ec8c85f01?q=80&w=1000&auto=format&fit=crop",
      belakang: "https://images.unsplash.com/photo-1534215754734-18e55d13e346?q=80&w=1000&auto=format&fit=crop"
    }
  },
  {
    id: 4,
    nama: "Vintage Dad Hat",
    harga: 145000,
    kategori: "Dad Hat",
    deskripsi: "Topi bergaya vintage dengan kesan 'washed' yang memberikan karakter unik. Material katun berkualitas tinggi.",
    info: {
      bahan: "Washed Cotton",
      ukuran: "All Size (Metal strap)",
      fitur: "Unstructured crown, Curved peak, Vintage look"
    },
    gambar: {
      depan: "https://images.unsplash.com/photo-1596455607563-ad6193f76b17?q=80&w=1000&auto=format&fit=crop",
      samping: "https://images.unsplash.com/photo-1556306535-0f09a537f0a3?q=80&w=1000&auto=format&fit=crop",
      belakang: "https://images.unsplash.com/photo-1572307480813-ceb0e59d8325?q=80&w=1000&auto=format&fit=crop"
    }
  },
  {
    id: 5,
    nama: "Explorer Bucket Hat",
    harga: 160000,
    kategori: "Bucket Hat",
    deskripsi: "Topi bucket yang trendi dan serbaguna, memberikan perlindungan maksimal dari sinar matahari dengan gaya yang santai.",
    info: {
      bahan: "Canvas Cotton",
      ukuran: "Medium/Large",
      fitur: "Wide brim, Foldable, Lightweight"
    },
    gambar: {
      depan: "https://images.unsplash.com/photo-1618354691792-d1d42acfd860?q=80&w=1000&auto=format&fit=crop",
      samping: "https://images.unsplash.com/photo-1621072156002-e2fcced0b170?q=80&w=1000&auto=format&fit=crop",
      belakang: "https://images.unsplash.com/photo-1618354691792-d1d42acfd860?q=80&w=1000&auto=format&fit=crop"
    }
  },
  {
    id: 6,
    nama: "Classic Fedora",
    harga: 250000,
    kategori: "Fedora",
    deskripsi: "Sentuhan klasik untuk penampilan formal maupun semi-formal. Dibuat dengan presisi untuk kenyamanan sepanjang hari.",
    info: {
      bahan: "Wool Felt",
      ukuran: "Fixed (58cm)",
      fitur: "Stiff brim, Ribbon band, Elegant lining"
    },
    gambar: {
      depan: "https://images.unsplash.com/photo-1514327605112-b887c0e61c0a?q=80&w=1000&auto=format&fit=crop",
      samping: "https://images.unsplash.com/photo-1517423568366-8b83523034fd?q=80&w=1000&auto=format&fit=crop",
      belakang: "https://images.unsplash.com/photo-1514327605112-b887c0e61c0a?q=80&w=1000&auto=format&fit=crop"
    }
  },
  {
    id: 7,
    nama: "Performance Sport Cap",
    harga: 175000,
    kategori: "Sport",
    deskripsi: "Topi olahraga dengan teknologi 'moisture-wicking' untuk menjaga kepala tetap kering saat beraktivitas berat.",
    info: {
      bahan: "Micro-Polyester",
      ukuran: "All Size (Adjustable)",
      fitur: "Breathable, Sweatband, Reflective detail"
    },
    gambar: {
      depan: "https://images.unsplash.com/photo-1572307480813-ceb0e59d8325?q=80&w=1000&auto=format&fit=crop",
      samping: "https://images.unsplash.com/photo-1533055640609-24b498dfd74c?q=80&w=1000&auto=format&fit=crop",
      belakang: "https://images.unsplash.com/photo-1572307480813-ceb0e59d8325?q=80&w=1000&auto=format&fit=crop"
    }
  },
  {
    id: 8,
    nama: "Premium Corduroy",
    harga: 185000,
    kategori: "Lifestyle",
    deskripsi: "Topi corduroy dengan tekstur unik yang memberikan kesan retro namun tetap modern. Pilihan gaya untuk semua musim.",
    info: {
      bahan: "Premium Corduroy",
      ukuran: "All Size (Metal Buckle)",
      fitur: "Soft texture, Durable, Retro design"
    },
    gambar: {
      depan: "https://images.unsplash.com/photo-1556306535-0f09a537f0a3?q=80&w=1000&auto=format&fit=crop",
      samping: "https://images.unsplash.com/photo-1596455607563-ad6193f76b17?q=80&w=1000&auto=format&fit=crop",
      belakang: "https://images.unsplash.com/photo-1556306535-0f09a537f0a3?q=80&w=1000&auto=format&fit=crop"
    }
  }
];

const Toast = ({ message, type, onClose }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, scale: 0.8 }}
    className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[200] bg-white text-[#0a0a0a] px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-4 border border-white/10"
  >
    <div className={`w-3 h-3 rounded-full ${type === 'success' ? 'bg-green-500' : 'bg-accent'} shadow-[0_0_10px_rgba(0,0,0,0.1)]`} />
    <span className="font-bold text-sm tracking-tight">{message}</span>
  </motion.div>
);

const App = () => {
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [activeAngle, setActiveAngle] = useState("depan");
  const [toasts, setToasts] = useState([]);

  const addToast = (message, type = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3000);
  };

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(p => p.nama.toLowerCase().includes(search.toLowerCase()));
  }, [search]);

  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, qty: item.qty + 1 } : item);
      }
      return [...prev, { ...product, qty: 1 }];
    });
    addToast(`${product.nama} berhasil ditambahkan ke keranjang`);
  };

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const buyNowWA = (product) => {
    const message = `Halo ${CONFIG.BRAND_NAME}, saya ingin membeli produk berikut:\n\nNama: ${product.nama}\nHarga: Rp ${product.harga.toLocaleString('id-ID')}\n\nTerima kasih!`;
    const url = `https://wa.me/${CONFIG.WA_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  const checkoutWA = () => {
    const items = cart.map(item => `- ${item.nama} (${item.qty}x)`).join("\n");
    const total = cart.reduce((acc, item) => acc + (item.harga * item.qty), 0);
    const message = `Halo ${CONFIG.BRAND_NAME}, saya ingin memesan:\n\n${items}\n\nTotal: Rp ${total.toLocaleString('id-ID')}\n\nMohon informasi pembayarannya. Terima kasih!`;
    const url = `https://wa.me/${CONFIG.WA_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');

    setCart([]);
    setIsCartOpen(false);
    addToast("Pembelian berhasil! Menunggu konfirmasi WhatsApp", "success");
  };

  const totalHarga = cart.reduce((acc, item) => acc + (item.harga * item.qty), 0);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Toast System */}
      <AnimatePresence>
        {toasts.map(toast => (
          <Toast key={toast.id} {...toast} />
        ))}
      </AnimatePresence>

      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 glass py-4 px-6 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <button onClick={() => setIsMenuOpen(true)} className="p-2 md:hidden">
            <LucideIcon name="menu" className="w-6 h-6" />
          </button>
          <h1 className="text-2xl font-black tracking-tighter text-white">{CONFIG.BRAND_NAME}</h1>
        </div>

        <div className="flex items-center gap-4 md:gap-6">
          <div className="relative hidden md:block">
            <input
              type="text"
              placeholder="Cari topi..."
              className="bg-white/10 border border-white/10 rounded-full py-2 px-6 text-sm focus:outline-none focus:ring-2 ring-accent transition-all w-64"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <button onClick={() => setIsCartOpen(true)} className="relative p-2 hover:text-accent transition-colors">
            <LucideIcon name="shopping-cart" className="w-6 h-6" />
            {cart.length > 0 && (
              <span className="absolute top-0 right-0 bg-accent text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-black animate-pulse">
                {cart.reduce((acc, item) => acc + item.qty, 0)}
              </span>
            )}
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 opacity-40 bg-[url('https://images.unsplash.com/photo-1533055640609-24b498dfd74c?q=80&w=1920&auto=format&fit=crop')] bg-center bg-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
        <div className="relative z-10 text-center px-4 max-w-4xl">
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-accent font-black tracking-[0.3em] uppercase text-sm mb-4 block">Limited Edition</motion.span>
          <motion.h2 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-5xl md:text-8xl font-black mb-6 leading-tight tracking-tighter">ESTETIKA DALAM <br/><span className="text-accent">SETIAP DETAIL</span></motion.h2>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="text-gray-400 text-lg md:text-2xl mb-10 font-light">Koleksi eksklusif untuk melengkapi gaya harianmu. TKTM hadir untuk kenyamanan dan estetika modern.</motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}>
            <a href="#produk" className="bg-accent hover:bg-white hover:text-brand text-white font-black py-4 px-12 rounded-full transition-all duration-500 inline-block shadow-[0_0_30px_rgba(225,29,72,0.3)]">JELAJAHI KOLEKSI</a>
          </motion.div>
        </div>
      </section>

      {/* Catalog */}
      <section id="produk" className="py-32 px-6 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <div className="animate-in">
              <span className="text-accent font-black uppercase tracking-widest text-sm">Katalog Terbaru</span>
              <h3 className="text-4xl md:text-6xl font-black mt-2 tracking-tighter">PILIHAN <span className="text-white/20">TOPIKMU</span></h3>
            </div>
            <div className="relative w-full md:w-96 animate-in">
              <input
                type="text" placeholder="Cari model topi..."
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 focus:outline-none focus:ring-2 ring-accent transition-all text-white"
                value={search} onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.map(product => (
              <motion.div layout key={product.id} className="bg-white/5 border border-white/10 rounded-[2.5rem] overflow-hidden group animate-in">
                <div className="relative aspect-[4/5] overflow-hidden cursor-pointer" onClick={() => { setSelectedProduct(product); setActiveAngle("depan"); }}>
                  <img src={product.gambar.depan} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 product-image" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
                    <button className="w-full bg-white text-brand py-3 rounded-xl font-bold text-sm transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">LIHAT DETAIL</button>
                  </div>
                  <div className="absolute top-6 right-6 bg-accent text-white px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">{product.kategori}</div>
                </div>
                <div className="p-8">
                  <h4 className="text-xl font-black mb-2 tracking-tight">{product.nama}</h4>
                  <p className="text-accent font-black text-2xl mb-6">Rp {product.harga.toLocaleString('id-ID')}</p>
                  <div className="grid grid-cols-2 gap-3">
                    <button onClick={() => addToCart(product)} className="bg-white/10 hover:bg-white hover:text-brand py-3 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-2">
                      <LucideIcon name="shopping-bag" className="w-4 h-4" /> CART
                    </button>
                    <button onClick={() => buyNowWA(product)} className="bg-green-600 hover:bg-green-500 py-3 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-2">
                      <LucideIcon name="phone" className="w-4 h-4" /> BELI
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white/5 border-t border-white/10 py-24 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-16">
          <div className="md:col-span-2">
            <h4 className="text-4xl font-black mb-8 tracking-tighter">{CONFIG.BRAND_NAME}</h4>
            <p className="text-gray-400 text-lg leading-relaxed max-w-md">Platform e-commerce topi nomor satu dengan kualitas tanpa kompromi. Menggabungkan gaya streetwear dan fungsionalitas.</p>
          </div>
          <div>
            <h5 className="font-black mb-8 uppercase tracking-widest text-xs text-accent">Kontak</h5>
            <div className="space-y-6 text-gray-400">
              <a href={`https://wa.me/${CONFIG.WA_NUMBER}`} className="flex items-center gap-4 hover:text-white transition-colors">
                <LucideIcon name="phone" className="w-5 h-5" /> <span>+{CONFIG.WA_NUMBER}</span>
              </a>
              <div className="flex items-center gap-4">
                <LucideIcon name="mail" className="w-5 h-5" /> <span>machie8910@gmail.com</span>
              </div>
              <div className="flex items-center gap-4">
                <LucideIcon name="map-pin" className="w-5 h-5" /> <span>Banten, Indonesia</span>
              </div>
            </div>
          </div>
          <div>
            <h5 className="font-black mb-8 uppercase tracking-widest text-xs text-accent">Pembayaran</h5>
            <p className="text-gray-400 leading-relaxed">Aman melalui WhatsApp. Mendukung semua Bank Utama & E-Wallet (Gopay, OVO, Dana).</p>
          </div>
        </div>
      </footer>

      {/* Sidebar Cart */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsCartOpen(false)} className="fixed inset-0 bg-black/80 z-[100] backdrop-blur-md" />
            <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", damping: 25, stiffness: 200 }} className="fixed right-0 top-0 h-full w-full max-w-md bg-[#0a0a0a] border-l border-white/10 z-[110] shadow-2xl p-10 flex flex-col">
              <div className="flex justify-between items-center mb-12">
                <h3 className="text-3xl font-black tracking-tighter">KERANJANG</h3>
                <button onClick={() => setIsCartOpen(false)} className="hover:text-accent transition-colors"><LucideIcon name="x" className="w-8 h-8" /></button>
              </div>
              <div className="flex-1 overflow-y-auto pr-4 space-y-6">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-gray-500 opacity-50">
                    <LucideIcon name="shopping-bag" className="w-16 h-16 mb-4" />
                    <p>Keranjang masih kosong</p>
                  </div>
                ) : cart.map(item => (
                  <div key={item.id} className="flex gap-6 items-center bg-white/5 p-4 rounded-2xl border border-white/5">
                    <img src={item.gambar.depan} className="w-20 h-20 object-cover rounded-xl" />
                    <div className="flex-1">
                      <h5 className="font-bold text-lg">{item.nama}</h5>
                      <p className="text-accent font-black">{item.qty} x Rp {item.harga.toLocaleString('id-ID')}</p>
                    </div>
                    <button onClick={() => removeFromCart(item.id)} className="text-white/20 hover:text-accent transition-colors"><LucideIcon name="trash-2" className="w-5 h-5" /></button>
                  </div>
                ))}
              </div>
              {cart.length > 0 && (
                <div className="pt-10 border-t border-white/10 mt-10">
                  <div className="flex justify-between text-2xl font-black mb-8"><span>TOTAL</span><span className="text-accent">Rp {totalHarga.toLocaleString('id-ID')}</span></div>
                  <button onClick={checkoutWA} className="w-full bg-accent text-white py-5 rounded-2xl font-black text-lg shadow-[0_0_30px_rgba(225,29,72,0.3)] hover:scale-[1.02] transition-all active:scale-95 flex items-center justify-center gap-3">
                    <LucideIcon name="phone" className="w-6 h-6" /> CHECKOUT (WA)
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Menu Mobile */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsMenuOpen(false)} className="fixed inset-0 bg-black/90 z-[120] backdrop-blur-xl" />
            <motion.div initial={{ y: "-100%" }} animate={{ y: 0 }} exit={{ y: "-100%" }} className="fixed inset-0 z-[130] p-10 flex flex-col items-center justify-center">
              <button onClick={() => setIsMenuOpen(false)} className="absolute top-10 right-10 text-white/50 hover:text-accent"><LucideIcon name="x" className="w-10 h-10" /></button>
              <nav className="flex flex-col gap-10 text-center">
                <a href="#" onClick={() => setIsMenuOpen(false)} className="text-5xl font-black hover:text-accent transition-all tracking-tighter">BERANDA</a>
                <a href="#produk" onClick={() => setIsMenuOpen(false)} className="text-5xl font-black hover:text-accent transition-all tracking-tighter">KOLEKSI</a>
                <a href="#" onClick={() => setIsMenuOpen(false)} className="text-5xl font-black text-white/20 cursor-not-allowed tracking-tighter">PROMO</a>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Product Detail Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedProduct(null)} className="fixed inset-0 bg-black/90 z-[150] backdrop-blur-2xl" />
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="fixed inset-4 md:inset-10 lg:inset-20 bg-[#111] z-[160] rounded-[3rem] overflow-hidden flex flex-col lg:flex-row border border-white/10 shadow-2xl">
              <div className="w-full lg:w-3/5 flex flex-col h-full bg-black relative">
                <div className="flex-1 overflow-hidden p-6 flex items-center justify-center">
                  <motion.img
                    key={activeAngle}
                    initial={{ opacity: 0, scale: 1.1 }} animate={{ opacity: 1, scale: 1 }}
                    src={selectedProduct.gambar[activeAngle]}
                    className="w-full h-full object-contain product-image"
                  />
                </div>
                <div className="p-8 flex justify-center gap-6 bg-white/5 backdrop-blur-md">
                  {Object.keys(selectedProduct.gambar).map(angle => (
                    <button
                      key={angle}
                      onClick={() => setActiveAngle(angle)}
                      className={`w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all duration-500 ${activeAngle === angle ? 'border-accent scale-110 shadow-2xl' : 'border-transparent opacity-40 grayscale hover:grayscale-0 hover:opacity-100'}`}
                    >
                      <img src={selectedProduct.gambar[angle]} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>
              <div className="w-full lg:w-2/5 p-10 lg:p-20 overflow-y-auto relative bg-[#0a0a0a]">
                <button onClick={() => setSelectedProduct(null)} className="absolute top-10 right-10 bg-white/5 p-4 rounded-full hover:bg-accent transition-all group">
                  <LucideIcon name="x" className="w-6 h-6 group-hover:rotate-90 transition-transform" />
                </button>
                <span className="text-accent font-black uppercase text-sm tracking-[0.3em] mb-4 block">Detail Produk</span>
                <h3 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-tight mb-8">{selectedProduct.nama}</h3>
                <div className="flex items-center gap-4 mb-10">
                  <span className="text-3xl font-black text-white">Rp {selectedProduct.harga.toLocaleString('id-ID')}</span>
                  <div className="h-1 flex-1 bg-white/10" />
                </div>
                <p className="text-gray-400 text-lg mb-12 leading-relaxed font-light">{selectedProduct.deskripsi}</p>
                <div className="space-y-6 mb-16">
                  <div className="flex justify-between items-center border-b border-white/5 pb-4"><span className="text-gray-500 font-bold uppercase text-xs tracking-widest">Bahan</span><span className="font-black text-white">{selectedProduct.info.bahan}</span></div>
                  <div className="flex justify-between items-center border-b border-white/5 pb-4"><span className="text-gray-500 font-bold uppercase text-xs tracking-widest">Ukuran</span><span className="font-black text-white">{selectedProduct.info.ukuran}</span></div>
                  <div><p className="text-gray-500 font-bold uppercase text-xs tracking-widest mb-4">Fitur Utama</p><p className="text-white/80 font-medium italic bg-white/5 p-4 rounded-xl border border-white/5">{selectedProduct.info.fitur}</p></div>
                </div>
                <div className="flex flex-col gap-4">
                  <button onClick={() => { addToCart(selectedProduct); setSelectedProduct(null); }} className="w-full bg-white text-brand py-6 rounded-2xl font-black text-lg hover:bg-accent hover:text-white transition-all duration-500 shadow-xl flex items-center justify-center gap-3">
                    <LucideIcon name="shopping-bag" className="w-6 h-6" /> TAMBAH KE KERANJANG
                  </button>
                  <button onClick={() => buyNowWA(selectedProduct)} className="w-full bg-green-600/10 text-green-500 border border-green-500/20 py-6 rounded-2xl font-black text-lg hover:bg-green-600 hover:text-white transition-all duration-500 flex items-center justify-center gap-3">
                    <LucideIcon name="phone" className="w-6 h-6" /> BELI INSTAN (WA)
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

const LucideIcon = ({ name, className }) => {
  const iconRef = useRef(null);
  useEffect(() => { if (window.lucide && iconRef.current) window.lucide.createIcons({ targets: [iconRef.current] }); }, [name]);
  return <i ref={iconRef} data-lucide={name} className={className}></i>;
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
