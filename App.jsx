const { useState, useEffect, useMemo, useRef } = React;

// Helper to handle Framer Motion UMD
const Motion = window.Motion || {
  motion: {
    div: (props) => <div {...props} />,
    h2: (props) => <h2 {...props} />,
    p: (props) => <p {...props} />,
    img: (props) => <img {...props} />,
    button: (props) => <button {...props} />,
    nav: (props) => <nav {...props} />,
    section: (props) => <section {...props} />,
    span: (props) => <span {...props} />
  },
  AnimatePresence: ({ children }) => <>{children}</>
};
const { motion, AnimatePresence } = Motion;

const CONFIG = {
  WA_NUMBER: "6288973262022",
  BRAND_COLOR: "#0a0a0a",
  ACCENT_COLOR: "#e11d48",
  BREAKPOINT: 768
};

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

const App = () => {
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [activeAngle, setActiveAngle] = useState("depan");
  const [scrollPos, setScrollPos] = useState(0);
  const [toasts, setToasts] = useState([]);

  const addToast = (message, type = "success") => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3000);
  };

  useEffect(() => {
    const handleScroll = () => setScrollPos(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
    addToast(`${product.nama} ditambahkan ke keranjang`);
  };

  const removeFromCart = (id) => {
    const item = cart.find(i => i.id === id);
    setCart(prev => prev.filter(i => i.id !== id));
    if (item) addToast(`${item.nama} dihapus dari keranjang`, "info");
  };

  const buyNowWA = (product) => {
    const message = `Halo TKTM, saya ingin membeli produk berikut:\n\nNama: ${product.nama}\nHarga: Rp ${product.harga.toLocaleString('id-ID')}\n\nTerima kasih!`;
    const url = `https://wa.me/${CONFIG.WA_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  const checkoutWA = () => {
    if (cart.length === 0) return;
    let message = "Halo TKTM, saya ingin memesan:\n\n";
    cart.forEach(item => {
      message += `- ${item.nama} (${item.qty}x) - Rp ${(item.harga * item.qty).toLocaleString('id-ID')}\n`;
    });
    message += `\nTotal: Rp ${totalHarga.toLocaleString('id-ID')}\n\nTerima kasih!`;
    const url = `https://wa.me/${CONFIG.WA_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
    addToast("Pembelian berhasil", "success");
    setCart([]);
    setIsCartOpen(false);
  };

  const totalHarga = cart.reduce((acc, item) => acc + (item.harga * item.qty), 0);

  const recs = useMemo(() => PRODUCTS.slice(0, 3), []);
  const [activeRec, setActiveRec] = useState(0);

  const nextRec = () => setActiveRec((prev) => (prev + 1) % recs.length);
  const prevRec = () => setActiveRec((prev) => (prev - 1 + recs.length) % recs.length);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white selection:bg-accent selection:text-white">
      {/* Navbar */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrollPos > 50 ? 'glass py-3' : 'bg-transparent py-5'} px-6 flex justify-between items-center`}>
        <div className="flex items-center gap-4">
          <button onClick={() => setIsMenuOpen(true)} className="p-2 md:hidden hover:text-accent transition-colors">
            <LucideIcon name="menu" className="w-6 h-6" />
          </button>
          <h1 className="text-3xl font-black tracking-tighter text-accent">TKTM</h1>
        </div>

        <div className="flex items-center gap-4 md:gap-8">
          <div className="relative hidden md:block">
            <input
              type="text"
              placeholder="Cari koleksi..."
              className="bg-white/5 border border-white/10 rounded-full py-2 px-6 text-sm focus:outline-none focus:ring-2 ring-accent/50 w-64 transition-all focus:w-80"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <button onClick={() => setIsCartOpen(true)} className="relative p-2 group">
            <LucideIcon name="shopping-cart" className="w-6 h-6 group-hover:text-accent transition-colors" />
            {cart.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-accent text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold animate-bounce">
                {cart.length}
              </span>
            )}
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-[#0a0a0a] z-10" />
          <img
            src="https://images.unsplash.com/photo-1533055640609-24b498dfd74c?q=80&w=1920&auto=format&fit=crop"
            className="w-full h-full object-cover scale-110"
            style={{ transform: `translateY(${scrollPos * 0.3}px) scale(1.1)` }}
          />
        </div>

        <div className="relative z-20 text-center px-6 max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <span className="text-accent font-bold tracking-[0.3em] uppercase text-sm mb-4 block">PREMIUM HEADWEAR</span>
            <h2 className="text-6xl md:text-9xl font-black mb-6 tracking-tighter leading-none">TOPIKU <br/> <span className="text-transparent border-t-white/20 text-stroke-white">TOPIMU</span></h2>
            <p className="text-gray-400 text-lg md:text-2xl max-w-2xl mx-auto mb-10 font-light leading-relaxed">Definisi gaya urban sesungguhnya. Koleksi terbatas yang dirancang untuk mereka yang berani tampil beda.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="#produk" className="bg-accent hover:bg-red-700 text-white font-bold py-4 px-10 rounded-full transition-all hover:scale-105 shadow-[0_0_20px_rgba(225,29,72,0.4)]">Mulai Belanja</a>
              <a href="#rekomendasi" className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white font-bold py-4 px-10 rounded-full transition-all">Lihat Tren</a>
            </div>
          </motion.div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 animate-bounce text-white/30">
          <LucideIcon name="chevron-down" className="w-8 h-8" />
        </div>
      </section>

      {/* Recommendations Slider */}
      <section id="rekomendasi" className="py-32 px-6 bg-[#0a0a0a] border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-end justify-between mb-20 gap-8">
            <div className="max-w-xl">
              <span className="text-accent font-bold tracking-widest uppercase text-xs mb-3 block">CURATED SELECTION</span>
              <h3 className="text-4xl md:text-6xl font-black">PILIHAN <br/> MINGGU INI</h3>
            </div>
            <div className="flex gap-4">
              <button onClick={prevRec} className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 hover:border-white/20 transition-all">
                <LucideIcon name="arrow-left" className="w-6 h-6" />
              </button>
              <button onClick={nextRec} className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 hover:border-white/20 transition-all">
                <LucideIcon name="arrow-right" className="w-6 h-6" />
              </button>
            </div>
          </div>

          <div className="relative">
            <div className="overflow-hidden rounded-3xl">
              <motion.div
                className="flex"
                animate={{ x: `-${activeRec * 100}%` }}
                transition={{ type: "spring", stiffness: 100, damping: 20 }}
              >
                {recs.map((product) => (
                  <div key={product.id} className="min-w-full px-2">
                    <div
                      className="relative aspect-[16/9] md:aspect-[21/9] overflow-hidden rounded-3xl cursor-pointer group"
                      onClick={() => { setSelectedProduct(product); setActiveAngle("depan"); }}
                    >
                      <img src={product.gambar.depan} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80" />
                      <div className="absolute bottom-12 left-12 right-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <div>
                          <p className="text-accent font-bold uppercase tracking-widest text-xs mb-3">{product.kategori}</p>
                          <h4 className="text-4xl md:text-6xl font-black mb-2">{product.nama}</h4>
                          <p className="text-2xl text-white/80 font-light">Rp {product.harga.toLocaleString('id-ID')}</p>
                        </div>
                        <button className="bg-white text-black font-black py-4 px-10 rounded-full hover:bg-accent hover:text-white transition-all transform group-hover:translate-y-0 translate-y-4 opacity-0 group-hover:opacity-100 duration-300">DETAIL PRODUK</button>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Catalog */}
      <section id="produk" className="py-32 px-6 bg-[#0d0d0d]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center mb-24 gap-10">
            <div>
              <h3 className="text-4xl md:text-5xl font-black">KATALOG TERBARU</h3>
              <p className="text-gray-500 mt-4">Menampilkan {filteredProducts.length} produk pilihan</p>
            </div>
            <div className="relative w-full md:w-96">
              <input
                type="text" placeholder="Cari gaya favoritmu..."
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white focus:outline-none focus:ring-2 ring-accent/50"
                value={search} onChange={(e) => setSearch(e.target.value)}
              />
              <LucideIcon name="search" className="absolute right-6 top-1/2 -translate-y-1/2 text-white/20 w-5 h-5" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
            {filteredProducts.map((product, idx) => (
              <motion.div
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                key={product.id}
                className="group animate-in"
              >
                <div
                  className="relative aspect-[4/5] overflow-hidden rounded-2xl cursor-pointer bg-[#1a1a1a]"
                  onClick={() => { setSelectedProduct(product); setActiveAngle("depan"); }}
                >
                  <img src={product.gambar.depan} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="bg-white text-black p-4 rounded-full scale-50 group-hover:scale-100 transition-transform duration-300">
                      <LucideIcon name="eye" className="w-6 h-6" />
                    </div>
                  </div>
                  <div className="absolute top-4 left-4 bg-accent text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-tighter">New</div>
                </div>
                <div className="mt-6">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="text-[10px] text-accent font-bold uppercase tracking-widest">{product.kategori}</p>
                      <h4 className="text-lg font-bold text-white group-hover:text-accent transition-colors">{product.nama}</h4>
                    </div>
                    <p className="font-black text-white">Rp {product.harga.toLocaleString('id-ID')}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-3 mt-6">
                    <button
                      onClick={() => addToCart(product)}
                      className="border border-white/10 hover:bg-white/5 py-3 rounded-xl font-bold text-xs uppercase tracking-widest transition-all"
                    >
                      + Cart
                    </button>
                    <button
                      onClick={() => buyNowWA(product)}
                      className="bg-white text-black hover:bg-accent hover:text-white py-3 rounded-xl font-bold text-xs uppercase tracking-widest transition-all"
                    >
                      Buy Now
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black border-t border-white/5 py-24 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-16">
          <div className="col-span-1 md:col-span-2">
            <h4 className="text-4xl font-black text-accent mb-8 tracking-tighter">TKTM</h4>
            <p className="text-gray-500 text-lg leading-relaxed max-w-md">Topiku Topimu. Platform e-commerce premium untuk pencinta headwear sejati. Kualitas tanpa kompromi, gaya tanpa batas.</p>
            <div className="flex gap-6 mt-10">
              <a href="#" className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-accent transition-all"><i className="fab fa-instagram"></i></a>
              <a href="#" className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-accent transition-all"><i className="fab fa-twitter"></i></a>
              <a href="#" className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-accent transition-all"><i className="fab fa-tiktok"></i></a>
            </div>
          </div>
          <div>
            <h5 className="font-bold text-white mb-8 uppercase tracking-[0.2em] text-sm">Customer Care</h5>
            <div className="space-y-4 text-gray-500 text-sm">
              <p className="flex items-center gap-4 group cursor-pointer hover:text-white transition-colors"><LucideIcon name="phone" className="w-4 h-4 text-accent" /> +{CONFIG.WA_NUMBER}</p>
              <p className="flex items-center gap-4 group cursor-pointer hover:text-white transition-colors"><LucideIcon name="mail" className="w-4 h-4 text-accent" /> machie8910@gmail.com</p>
              <p className="flex items-center gap-4 group cursor-pointer hover:text-white transition-colors"><LucideIcon name="map-pin" className="w-4 h-4 text-accent" /> Banten, Indonesia</p>
            </div>
          </div>
          <div>
            <h5 className="font-bold text-white mb-8 uppercase tracking-[0.2em] text-sm">Payments</h5>
            <p className="text-gray-500 text-sm leading-relaxed mb-6">Pembayaran aman melalui konfirmasi WhatsApp dengan dukungan berbagai perbankan dan e-wallet.</p>
            <div className="flex flex-wrap gap-3">
              <div className="bg-white/5 px-4 py-2 rounded-lg text-[10px] font-bold">BCA</div>
              <div className="bg-white/5 px-4 py-2 rounded-lg text-[10px] font-bold">MANDIRI</div>
              <div className="bg-white/5 px-4 py-2 rounded-lg text-[10px] font-bold">GOPAY</div>
              <div className="bg-white/5 px-4 py-2 rounded-lg text-[10px] font-bold">OVO</div>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-24 pt-8 border-t border-white/5 text-center text-gray-600 text-xs tracking-widest uppercase">
          &copy; {new Date().getFullYear()} TKTM Premium Headwear. All Rights Reserved.
        </div>
      </footer>

      {/* Menu Drawer */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsMenuOpen(false)} className="fixed inset-0 bg-black/90 z-[100] backdrop-blur-md md:hidden" />
            <motion.div initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }} className="fixed left-0 top-0 h-full w-full max-w-xs bg-black z-[110] p-10 flex flex-col md:hidden border-r border-white/5">
              <div className="flex justify-between items-center mb-16">
                <h1 className="text-3xl font-black tracking-tighter text-accent">TKTM</h1>
                <button onClick={() => setIsMenuOpen(false)} className="p-2 hover:text-accent transition-colors"><LucideIcon name="x" className="w-6 h-6" /></button>
              </div>

              <nav className="flex flex-col gap-10 mb-auto">
                <a href="#" onClick={() => setIsMenuOpen(false)} className="text-3xl font-black hover:text-accent transition-all tracking-tighter">BERANDA</a>
                <a href="#produk" onClick={() => setIsMenuOpen(false)} className="text-3xl font-black hover:text-accent transition-all tracking-tighter">KOLEKSI</a>
                <a href="#rekomendasi" onClick={() => setIsMenuOpen(false)} className="text-3xl font-black hover:text-accent transition-all tracking-tighter">TREN</a>
              </nav>

              <div className="pt-10 border-t border-white/10">
                <h5 className="font-bold mb-6 text-xs uppercase tracking-[0.3em] text-gray-600">HUBUNGI KAMI</h5>
                <div className="space-y-6">
                  <a href={`https://wa.me/${CONFIG.WA_NUMBER}`} className="flex items-center gap-4 font-bold text-sm hover:text-accent transition-colors">
                    <LucideIcon name="phone" className="w-5 h-5 text-accent" /> +{CONFIG.WA_NUMBER}
                  </a>
                  <p className="flex items-center gap-4 font-bold text-sm">
                    <LucideIcon name="mail" className="w-5 h-5 text-accent" /> machie8910@gmail.com
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Cart Drawer */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsCartOpen(false)} className="fixed inset-0 bg-black/80 z-[100] backdrop-blur-md" />
            <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} className="fixed right-0 top-0 h-full w-full max-w-md bg-[#0a0a0a] z-[110] p-8 flex flex-col border-l border-white/10">
              <div className="flex justify-between items-center mb-10">
                <h3 className="text-2xl font-black tracking-tighter">KERANJANG</h3>
                <button onClick={() => setIsCartOpen(false)} className="p-2 hover:text-accent transition-colors"><LucideIcon name="x" className="w-6 h-6" /></button>
              </div>

              <div className="flex-1 overflow-y-auto space-y-6 pr-2">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center opacity-30">
                    <LucideIcon name="shopping-bag" className="w-16 h-16 mb-4" />
                    <p className="text-sm font-bold uppercase tracking-widest">Keranjang masih kosong</p>
                  </div>
                ) : cart.map(item => (
                  <div key={item.id} className="flex gap-6 items-center bg-white/5 p-4 rounded-2xl animate-in">
                    <img src={item.gambar.depan} className="w-20 h-20 object-cover rounded-xl" />
                    <div className="flex-1">
                      <h5 className="font-bold text-sm mb-1">{item.nama}</h5>
                      <p className="text-xs text-gray-400 mb-2">{item.qty} x Rp {item.harga.toLocaleString('id-ID')}</p>
                      <div className="flex items-center gap-3">
                        <button onClick={() => removeFromCart(item.id)} className="text-accent text-[10px] font-bold uppercase hover:underline">Hapus</button>
                      </div>
                    </div>
                    <div className="font-bold text-sm">Rp {(item.harga * item.qty).toLocaleString('id-ID')}</div>
                  </div>
                ))}
              </div>

              {cart.length > 0 && (
                <div className="pt-8 border-t border-white/10 mt-auto">
                  <div className="flex justify-between text-2xl font-black mb-6 tracking-tighter">
                    <span>TOTAL</span>
                    <span className="text-accent">Rp {totalHarga.toLocaleString('id-ID')}</span>
                  </div>
                  <button
                    onClick={checkoutWA}
                    className="w-full bg-accent hover:bg-red-700 text-white py-5 rounded-2xl font-black tracking-widest uppercase transition-all shadow-[0_0_20px_rgba(225,29,72,0.3)]"
                  >
                    CHECKOUT VIA WA
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Product Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedProduct(null)} className="fixed inset-0 bg-black/95 z-[200] backdrop-blur-xl" />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed inset-0 md:inset-10 lg:inset-20 bg-[#0d0d0d] z-[210] rounded-none md:rounded-[3rem] overflow-hidden flex flex-col md:flex-row border border-white/5"
            >
              <div className="w-full md:w-3/5 flex flex-col bg-black relative">
                <div className="flex-1 overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={activeAngle}
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      src={selectedProduct.gambar[activeAngle]}
                      className="w-full h-full object-cover"
                    />
                  </AnimatePresence>
                </div>
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-4 glass p-3 rounded-2xl">
                  {Object.keys(selectedProduct.gambar).map(angle => (
                    <button
                      key={angle}
                      onClick={() => setActiveAngle(angle)}
                      className={`w-14 h-14 rounded-xl overflow-hidden border-2 transition-all ${activeAngle === angle ? 'border-accent scale-110' : 'border-transparent opacity-40 hover:opacity-100'}`}
                    >
                      <img src={selectedProduct.gambar[angle]} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>

              <div className="w-full md:w-2/5 p-10 md:p-16 overflow-y-auto bg-[#0d0d0d] flex flex-col">
                <button onClick={() => setSelectedProduct(null)} className="absolute top-10 right-10 text-white/40 hover:text-white transition-colors"><LucideIcon name="x" className="w-8 h-8" /></button>

                <div className="mb-auto">
                  <span className="text-accent font-bold uppercase text-[10px] tracking-[0.4em] mb-4 block">PREMIUM SERIES</span>
                  <h3 className="text-4xl md:text-5xl font-black mb-2 tracking-tighter">{selectedProduct.nama}</h3>
                  <p className="text-3xl font-black text-white/90 mb-8">Rp {selectedProduct.harga.toLocaleString('id-ID')}</p>

                  <div className="h-px bg-white/5 w-full mb-8" />

                  <p className="text-gray-400 text-lg leading-relaxed mb-10 font-light">{selectedProduct.deskripsi}</p>

                  <div className="space-y-6 mb-12">
                    <div className="flex justify-between items-center"><span className="text-gray-600 text-xs font-bold uppercase tracking-widest">Material</span><span className="font-bold text-white text-sm">{selectedProduct.info.bahan}</span></div>
                    <div className="flex justify-between items-center"><span className="text-gray-600 text-xs font-bold uppercase tracking-widest">Dimension</span><span className="font-bold text-white text-sm">{selectedProduct.info.ukuran}</span></div>
                    <div>
                      <span className="text-gray-600 text-xs font-bold uppercase tracking-widest mb-3 block">Key Features</span>
                      <p className="text-white/80 text-sm leading-loose italic bg-white/5 p-4 rounded-xl border-l-2 border-accent">{selectedProduct.info.fitur}</p>
                    </div>
                  </div>
                </div>

                <div className="grid gap-4 mt-10">
                  <button
                    onClick={() => { addToCart(selectedProduct); setSelectedProduct(null); }}
                    className="w-full bg-accent hover:bg-red-700 text-white py-5 rounded-2xl font-black tracking-widest uppercase transition-all shadow-xl"
                  >
                    ADD TO CART
                  </button>
                  <button
                    onClick={() => buyNowWA(selectedProduct)}
                    className="w-full border border-white/10 hover:bg-white/5 text-white py-5 rounded-2xl font-black tracking-widest uppercase flex items-center justify-center gap-3 transition-all"
                  >
                    <i className="fab fa-whatsapp text-lg text-green-500"></i> DIRECT ORDER
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Toast Notification Container */}
      <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[300] flex flex-col gap-3 w-full max-w-xs px-6">
        <AnimatePresence>
          {toasts.map(toast => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className={`p-4 rounded-2xl shadow-2xl flex items-center gap-3 backdrop-blur-xl border border-white/10 ${
                toast.type === 'success' ? 'bg-white/95 text-[#0a0a0a]' : 'bg-accent/90 text-white'
              }`}
            >
              <div className={`w-2 h-2 rounded-full ${toast.type === 'success' ? 'bg-green-500' : 'bg-white'}`} />
              <p className="text-sm font-bold tracking-tight">{toast.message}</p>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
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
