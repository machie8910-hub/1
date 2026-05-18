const { useState, useEffect, useMemo, useRef } = React;

// Helper to handle Framer Motion UMD
const Motion = window.Motion || {
  motion: {
    div: (props) => <div {...props} />,
    h2: (props) => <h2 {...props} />,
    p: (props) => <p {...props} />,
    img: (props) => <img {...props} />,
    button: (props) => <button {...props} />,
    nav: (props) => <nav {...props} />
  },
  AnimatePresence: ({ children }) => <>{children}</>
};
const { motion, AnimatePresence } = Motion;

// Mock Data Produk
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

const WA_NUMBER = "6288973262022";

const App = () => {
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [activeAngle, setActiveAngle] = useState("depan");
  const [scrollPos, setScrollPos] = useState(0);
  const [toasts, setToasts] = useState([]);

  const addToast = (message) => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message }]);
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
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const buyNowWA = (product) => {
    const message = `Halo TKTM, saya ingin membeli produk berikut:\n\nNama: ${product.nama}\nHarga: Rp ${product.harga.toLocaleString('id-ID')}\n\nTerima kasih!`;
    const url = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  const checkoutCartWA = () => {
    const itemsList = cart.map(item => `- ${item.nama} (${item.qty}x) - Rp ${(item.harga * item.qty).toLocaleString('id-ID')}`).join('\n');
    const total = cart.reduce((acc, item) => acc + (item.harga * item.qty), 0);
    const message = `Halo TKTM, saya ingin memesan:\n\n${itemsList}\n\nTotal: Rp ${total.toLocaleString('id-ID')}\n\nTerima kasih!`;
    const url = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;

    window.open(url, '_blank');
    setCart([]);
    setIsCartOpen(false);
    addToast('Pembelian berhasil');
  };

  const totalHarga = cart.reduce((acc, item) => acc + (item.harga * item.qty), 0);

  // Recommendations Loop
  const recs = useMemo(() => PRODUCTS.slice(0, 3), []);
  const [activeRec, setActiveRec] = useState(0);
  const nextRec = () => setActiveRec((prev) => (prev + 1) % recs.length);
  const prevRec = () => setActiveRec((prev) => (prev - 1 + recs.length) % recs.length);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Toast System */}
      <div className="fixed top-24 right-6 z-[200] flex flex-col gap-3 pointer-events-none">
        <AnimatePresence>
          {toasts.map(toast => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white text-[#0a0a0a] py-3 px-6 rounded-xl shadow-2xl font-bold flex items-center gap-3 border-l-4 border-accent"
            >
              <LucideIcon name="check-circle" className="w-5 h-5 text-accent" />
              {toast.message}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 glass py-4 px-6 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <button onClick={() => setIsMenuOpen(true)} className="p-2 md:hidden">
            <LucideIcon name="menu" className="w-6 h-6" />
          </button>
          <h1 className="text-2xl font-black tracking-tighter text-white">TKTM</h1>
        </div>

        <div className="flex items-center gap-4 md:gap-6">
          <div className="relative hidden md:block">
            <input
              type="text"
              placeholder="Cari topi..."
              className="bg-white/10 border border-white/20 rounded-full py-1.5 px-5 text-sm focus:outline-none focus:ring-2 ring-accent transition-all placeholder:text-gray-500"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <button onClick={() => setIsCartOpen(true)} className="relative p-2 hover:scale-110 transition-transform">
            <LucideIcon name="shopping-cart" className="w-6 h-6" />
            {cart.length > 0 && (
              <span className="absolute top-0 right-0 bg-accent text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {cart.length}
              </span>
            )}
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 opacity-40 bg-black">
          <div className="absolute inset-0" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1533055640609-24b498dfd74c?q=80&w=1920&auto=format&fit=crop')`, backgroundPosition: 'center', backgroundSize: 'cover', transform: `scale(1.1) translateY(${scrollPos * 0.3}px)` }} />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-transparent to-[#0a0a0a]" />
        </div>
        <div className="relative z-10 text-center px-4 max-w-4xl">
          <motion.h2 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-white text-6xl md:text-9xl font-black mb-6 tracking-tighter leading-none">TOPIKU TOPIMU</motion.h2>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 0.8 }} className="text-gray-400 text-lg md:text-2xl mb-10 max-w-2xl mx-auto leading-relaxed">Eksplorasi gaya tanpa batas dengan koleksi headwear premium yang dirancang untuk estetika dan kenyamanan maksimal.</motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }} className="flex flex-wrap justify-center gap-4">
            <a href="#produk" className="bg-accent hover:bg-white hover:text-black text-white font-black py-4 px-10 rounded-full transition-all duration-300 shadow-xl">START SHOPPING</a>
          </motion.div>
        </div>
      </section>

      {/* Rekomendasi Section */}
      <section className="py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col items-center mb-20 text-center">
            <span className="text-accent font-black tracking-[0.3em] uppercase text-xs mb-4">Must Have Items</span>
            <h3 className="text-4xl md:text-6xl font-black mb-4">WEEKLY HIGHLIGHTS</h3>
          </div>

          <div className="relative group max-w-5xl mx-auto">
            <div className="overflow-hidden rounded-[2.5rem] shadow-[0_30px_100px_rgba(0,0,0,0.5)] bg-[#1a1a1a]">
              <motion.div className="flex" animate={{ x: `-${activeRec * 100}%` }} transition={{ type: "spring", stiffness: 100, damping: 20 }}>
                {recs.map((product) => (
                  <div key={product.id} className="min-w-full relative aspect-[16/9] md:aspect-[21/9] overflow-hidden cursor-pointer group/item" onClick={() => { setSelectedProduct(product); setActiveAngle("depan"); }}>
                    <img src={product.gambar.depan} className="w-full h-full object-cover group-hover/item:scale-105 transition-transform duration-[2s]" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/20 to-transparent" />
                    <div className="absolute bottom-12 left-12 right-12 flex justify-between items-end">
                      <div>
                        <p className="text-accent font-bold uppercase tracking-widest text-xs mb-2">{product.kategori}</p>
                        <h4 className="text-3xl md:text-6xl font-black mb-2">{product.nama}</h4>
                      </div>
                      <div className="hidden md:block">
                         <span className="text-2xl font-black opacity-80">Rp {product.harga.toLocaleString('id-ID')}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>

            <div className="absolute inset-y-0 left-4 flex items-center">
              <button onClick={prevRec} className="bg-black/50 hover:bg-accent backdrop-blur-md p-4 rounded-full text-white transition-all transform hover:scale-110">
                <LucideIcon name="chevron-left" className="w-6 h-6" />
              </button>
            </div>
            <div className="absolute inset-y-0 right-4 flex items-center">
              <button onClick={nextRec} className="bg-black/50 hover:bg-accent backdrop-blur-md p-4 rounded-full text-white transition-all transform hover:scale-110">
                <LucideIcon name="chevron-right" className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Katalog Produk */}
      <section id="produk" className="py-32 px-6 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <div className="max-w-2xl">
              <span className="text-accent font-black tracking-[0.3em] uppercase text-xs mb-4 block">The Collection</span>
              <h3 className="text-5xl md:text-7xl font-black">LATEST ARRIVALS</h3>
            </div>
            <div className="relative w-full md:w-96">
              <LucideIcon name="search" className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                type="text" placeholder="Search our catalog..."
                className="w-full bg-[#1a1a1a] border border-white/5 shadow-inner rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:ring-2 ring-accent transition-all text-white"
                value={search} onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredProducts.map(product => (
              <motion.div layout key={product.id} className="animate-in bg-[#111111] border border-white/5 rounded-3xl overflow-hidden hover:border-accent/30 transition-all duration-500 group shadow-2xl">
                <div className="relative aspect-square overflow-hidden cursor-pointer" onClick={() => { setSelectedProduct(product); setActiveAngle("depan"); }}>
                  <img src={product.gambar.depan} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[1.5s]" />
                  <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity" />
                  <div className="absolute top-6 right-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all">
                    <div className="bg-white text-black p-3 rounded-full shadow-2xl"><LucideIcon name="plus" className="w-5 h-5" /></div>
                  </div>
                </div>
                <div className="p-8">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <p className="text-[10px] text-accent font-black uppercase tracking-widest mb-1">{product.kategori}</p>
                      <h4 className="text-xl font-bold">{product.nama}</h4>
                    </div>
                    <p className="text-xl font-black">Rp {product.harga.toLocaleString('id-ID')}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-3 mt-8">
                    <button onClick={() => addToCart(product)} className="bg-[#1a1a1a] text-white py-3.5 rounded-xl font-black text-xs hover:bg-white hover:text-black transition-all">KERANJANG</button>
                    <button onClick={() => buyNowWA(product)} className="bg-accent text-white py-3.5 rounded-xl font-black text-xs hover:bg-[#be123c] transition-all">BELI SEKARANG</button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#070707] border-t border-white/5 py-24 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-20">
          <div>
            <h4 className="text-4xl font-black mb-8 tracking-tighter">TKTM</h4>
            <p className="text-gray-500 leading-relaxed mb-8">Definisi baru untuk gaya headwear modern. Kualitas material tanpa kompromi untuk mereka yang mengapresiasi estetika.</p>
            <div className="flex gap-4">
              {['instagram', 'twitter', 'facebook'].map(social => (
                <a key={social} href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all">
                  <LucideIcon name={social} className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
          <div>
            <h5 className="font-black text-sm uppercase tracking-widest mb-8 text-accent">Connect</h5>
            <div className="space-y-6 text-gray-400">
              <a href={`https://wa.me/${WA_NUMBER}`} className="flex items-center gap-4 hover:text-white transition-colors">
                <div className="w-10 h-10 rounded-xl bg-[#111111] flex items-center justify-center text-accent"><LucideIcon name="phone" className="w-5 h-5" /></div>
                <span className="font-bold">+{WA_NUMBER}</span>
              </a>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#111111] flex items-center justify-center text-accent"><LucideIcon name="mail" className="w-5 h-5" /></div>
                <span className="font-bold">shop@tktm.com</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#111111] flex items-center justify-center text-accent"><LucideIcon name="map-pin" className="w-5 h-5" /></div>
                <span className="font-bold">Banten, Indonesia</span>
              </div>
            </div>
          </div>
          <div>
            <h5 className="font-black text-sm uppercase tracking-widest mb-8 text-accent">Payment</h5>
            <p className="text-gray-400 mb-8 leading-relaxed">Transaksi aman melalui konfirmasi WhatsApp. Kami menerima berbagai metode Transfer Bank dan E-Wallet (DANA, OVO, QRIS).</p>
            <div className="flex gap-4 opacity-50 grayscale">
               <div className="w-12 h-8 bg-white/10 rounded"></div>
               <div className="w-12 h-8 bg-white/10 rounded"></div>
               <div className="w-12 h-8 bg-white/10 rounded"></div>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-24 pt-8 border-t border-white/5 text-center text-gray-600 text-sm">
          &copy; {new Date().getFullYear()} TKTM - Topiku Topimu. Crafted with passion.
        </div>
      </footer>

      {/* Menu Drawer */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsMenuOpen(false)} className="fixed inset-0 bg-black/90 z-[80] backdrop-blur-xl md:hidden" />
            <motion.div initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }} className="fixed left-0 top-0 h-full w-full max-w-xs bg-[#0a0a0a] z-[90] shadow-2xl p-10 flex flex-col md:hidden border-r border-white/5">
              <div className="flex justify-between items-center mb-16">
                <h1 className="text-3xl font-black tracking-tighter">TKTM</h1>
                <button onClick={() => setIsMenuOpen(false)} className="p-2 bg-white/5 rounded-full"><LucideIcon name="x" className="w-6 h-6" /></button>
              </div>

              <nav className="flex flex-col gap-8 mb-auto">
                <a href="#" onClick={() => setIsMenuOpen(false)} className="text-3xl font-black hover:text-accent transition-colors tracking-tighter">HOME</a>
                <a href="#produk" onClick={() => setIsMenuOpen(false)} className="text-3xl font-black hover:text-accent transition-colors tracking-tighter">COLLECTIONS</a>
              </nav>

              <div className="pt-10 border-t border-white/5 text-gray-500 text-sm italic">
                Modern headwear for the bold.
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Cart Drawer */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsCartOpen(false)} className="fixed inset-0 bg-black/90 z-[60] backdrop-blur-xl" />
            <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} className="fixed right-0 top-0 h-full w-full max-w-md bg-[#0d0d0d] z-[70] shadow-2xl p-10 flex flex-col border-l border-white/5">
              <div className="flex justify-between items-center mb-12">
                <h3 className="text-3xl font-black tracking-tighter">CART</h3>
                <button onClick={() => setIsCartOpen(false)} className="p-2 bg-white/5 rounded-full"><LucideIcon name="x" className="w-6 h-6" /></button>
              </div>
              <div className="flex-1 overflow-y-auto space-y-6 pr-2">
                {cart.length === 0 ? (
                  <div className="text-center py-20">
                    <LucideIcon name="shopping-bag" className="w-16 h-16 mx-auto text-gray-800 mb-6" />
                    <p className="text-gray-500 font-bold">Your cart is empty</p>
                  </div>
                ) : cart.map(item => (
                  <div key={item.id} className="flex gap-6 items-center bg-[#111111] p-4 rounded-2xl border border-white/5">
                    <img src={item.gambar.depan} className="w-20 h-20 object-cover rounded-xl" />
                    <div className="flex-1">
                      <h5 className="font-black text-sm mb-1">{item.nama}</h5>
                      <p className="text-xs text-gray-500">{item.qty} x Rp {item.harga.toLocaleString('id-ID')}</p>
                    </div>
                    <button onClick={() => removeFromCart(item.id)} className="text-gray-600 hover:text-red-500 transition-colors p-2">
                      <LucideIcon name="trash-2" className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              </div>
              {cart.length > 0 && (
                <div className="pt-10 border-t border-white/5 mt-auto">
                  <div className="flex justify-between text-2xl font-black mb-8 tracking-tighter">
                    <span>TOTAL</span>
                    <span className="text-accent">Rp {totalHarga.toLocaleString('id-ID')}</span>
                  </div>
                  <button onClick={checkoutCartWA} className="w-full bg-accent text-white py-5 rounded-2xl font-black tracking-widest text-sm shadow-xl hover:bg-[#be123c] transition-all">CHECKOUT VIA WHATSAPP</button>
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
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedProduct(null)} className="fixed inset-0 bg-black/95 z-[100] backdrop-blur-2xl" />
            <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }} className="fixed inset-4 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-5xl max-h-[90vh] bg-[#0d0d0d] z-[110] rounded-[2.5rem] overflow-hidden flex flex-col md:flex-row border border-white/10 shadow-[0_50px_100px_rgba(0,0,0,0.8)]">
              <div className="w-full md:w-3/5 flex flex-col bg-[#111111] relative">
                <div className="flex-1 overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={activeAngle}
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                      transition={{ duration: 0.5 }}
                      src={selectedProduct.gambar[activeAngle]}
                      className="w-full h-full object-cover"
                    />
                  </AnimatePresence>
                </div>
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 p-2 bg-black/40 backdrop-blur-xl rounded-2xl flex gap-4 border border-white/10">
                  {Object.keys(selectedProduct.gambar).map(angle => (
                    <button
                      key={angle}
                      onClick={() => setActiveAngle(angle)}
                      className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${activeAngle === angle ? 'border-accent scale-105 shadow-xl' : 'border-transparent opacity-40 hover:opacity-100'}`}
                    >
                      <img src={selectedProduct.gambar[angle]} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>
              <div className="w-full md:w-2/5 p-10 md:p-14 overflow-y-auto relative bg-[#0d0d0d]">
                <button onClick={() => setSelectedProduct(null)} className="absolute top-8 right-8 bg-white/5 hover:bg-accent p-3 rounded-full transition-colors"><LucideIcon name="x" className="w-6 h-6" /></button>
                <span className="text-accent font-black uppercase text-[10px] tracking-[0.4em] block mb-4">{selectedProduct.kategori}</span>
                <h3 className="text-4xl md:text-5xl font-black mb-6 tracking-tighter leading-tight">{selectedProduct.nama}</h3>
                <p className="text-3xl font-black text-white/90 mb-8 tracking-tighter">Rp {selectedProduct.harga.toLocaleString('id-ID')}</p>
                <p className="text-gray-400 mb-10 leading-relaxed font-medium">{selectedProduct.deskripsi}</p>

                <div className="space-y-6 mb-12 bg-[#111111] p-8 rounded-3xl border border-white/5 shadow-inner">
                  <div className="flex justify-between border-b border-white/5 pb-4 text-xs font-black"><span className="text-gray-500 tracking-widest">MATERIAL</span><span className="text-white uppercase">{selectedProduct.info.bahan}</span></div>
                  <div className="flex justify-between border-b border-white/5 pb-4 text-xs font-black"><span className="text-gray-500 tracking-widest">SIZE</span><span className="text-white uppercase">{selectedProduct.info.ukuran}</span></div>
                  <div className="text-xs font-black"><p className="text-gray-500 tracking-widest mb-3 uppercase">FEATURES</p><p className="text-white font-medium italic leading-relaxed">{selectedProduct.info.fitur}</p></div>
                </div>

                <div className="grid gap-4">
                  <button onClick={() => { addToCart(selectedProduct); setSelectedProduct(null); }} className="w-full bg-white text-black py-5 rounded-2xl font-black tracking-widest text-sm shadow-xl hover:bg-accent hover:text-white transition-all">ADD TO CART</button>
                  <button onClick={() => buyNowWA(selectedProduct)} className="w-full border border-white/10 text-white py-5 rounded-2xl font-black tracking-widest text-sm flex items-center justify-center gap-3 hover:bg-white/5 transition-all"><LucideIcon name="phone" className="w-5 h-5" /> DIRECT ORDER</button>
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
  useEffect(() => {
    if (window.lucide && iconRef.current) {
      window.lucide.createIcons({ targets: [iconRef.current] });
    }
  }, [name]);
  return <i ref={iconRef} data-lucide={name} className={className}></i>;
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
