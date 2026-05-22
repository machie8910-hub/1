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

const WA_NUMBER = "+6288973262022";

const App = () => {
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [activeAngle, setActiveAngle] = useState("depan");
  const [scrollPos, setScrollPos] = useState(0);
  const [toasts, setToasts] = useState([]);

  // Recommendations Loop Logic (3 items)
  const recs = useMemo(() => PRODUCTS.slice(0, 3), []);
  const [activeRec, setActiveRec] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollPos(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(p => p.nama.toLowerCase().includes(search.toLowerCase()));
  }, [search]);

  const addToast = (message, type = "success") => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3000);
  };

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
    const url = `https://wa.me/${WA_NUMBER.replace('+', '')}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  const checkoutCart = () => {
    let message = "Halo TKTM, saya ingin memesan produk berikut:\n\n";
    cart.forEach((item, index) => {
      message += `${index + 1}. ${item.nama} (${item.qty}x) - Rp ${(item.harga * item.qty).toLocaleString('id-ID')}\n`;
    });
    message += `\nTotal Harga: Rp ${totalHarga.toLocaleString('id-ID')}\n\nTerima kasih!`;

    const url = `https://wa.me/${WA_NUMBER.replace('+', '')}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');

    setCart([]);
    setIsCartOpen(false);
    addToast("Pesanan berhasil dikirim!");
  };

  const totalHarga = cart.reduce((acc, item) => acc + (item.harga * item.qty), 0);

  const nextRec = () => setActiveRec((prev) => (prev + 1) % recs.length);
  const prevRec = () => setActiveRec((prev) => (prev - 1 + recs.length) % recs.length);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-['Inter']">
      {/* Toast System */}
      <div className="fixed top-24 right-6 z-[300] flex flex-col gap-3 pointer-events-none">
        <AnimatePresence>
          {toasts.map(toast => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, x: 50, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
              className="bg-white py-4 px-6 rounded-2xl shadow-2xl flex items-center gap-3 border-l-4 border-accent min-w-[280px] pointer-events-auto"
            >
              <LucideIcon name={toast.type === "success" ? "check-circle" : "info"} className="w-5 h-5 text-accent" />
              <p className="font-bold text-sm text-[#0a0a0a]">{toast.message}</p>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 glass py-4 px-6 flex justify-between items-center border-b border-white/10">
        <div className="flex items-center gap-4">
          <button onClick={() => setIsMenuOpen(true)} className="p-2 md:hidden" aria-label="Menu">
            <LucideIcon name="menu" className="w-6 h-6 text-white" />
          </button>
          <h1 className="text-2xl font-black tracking-tighter text-accent">TKTM</h1>
        </div>

        <div className="flex items-center gap-4 md:gap-6">
          <div className="relative hidden md:block">
            <input
              type="text"
              placeholder="Cari topi..."
              className="bg-white/10 border border-white/20 rounded-full py-1.5 px-4 text-sm focus:outline-none focus:ring-2 ring-accent text-white placeholder-white/50"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <button onClick={() => setIsCartOpen(true)} className="relative p-2" aria-label="Buka Keranjang">
            <LucideIcon name="shopping-cart" className="w-6 h-6 text-white" />
            {cart.length > 0 && (
              <span className="absolute top-0 right-0 bg-accent text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {cart.length}
              </span>
            )}
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-black">
        <div className="absolute inset-0 opacity-40" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1533055640609-24b498dfd74c?q=80&w=1920&auto=format&fit=crop')`, backgroundPosition: 'center', backgroundSize: 'cover', transform: `translateY(${scrollPos * 0.5}px)` }} />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black" />
        <div className="relative z-10 text-center px-4">
          <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-white text-6xl md:text-9xl font-black mb-4 tracking-tighter">TOPIKU TOPIMU</motion.h2>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="text-gray-400 text-lg md:text-2xl max-w-2xl mx-auto font-medium">Koleksi eksklusif untuk melengkapi gaya harianmu. TKTM hadir untuk kenyamanan dan estetika.</motion.p>
          <div className="mt-10">
            <a href="#koleksi" className="bg-accent hover:bg-red-700 text-white font-black py-4 px-10 rounded-full transition-all text-lg shadow-2xl shadow-accent/20 inline-block">Jelajahi Koleksi</a>
          </div>
        </div>
      </section>

      {/* Rekomendasi 3 - Loop Slider */}
      <section id="terbaru" className="py-24 px-6 bg-[#0a0a0a] overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-accent font-black tracking-[0.2em] uppercase text-xs">Pilihan Terbaik</span>
            <h3 className="text-4xl md:text-6xl font-black mt-3 text-white">Rekomendasi Minggu Ini</h3>
          </div>

          <div className="relative group max-w-4xl mx-auto">
            <div className="overflow-hidden rounded-[2.5rem] shadow-[0_0_50px_-12px_rgba(225,29,72,0.3)]">
              <motion.div
                className="flex"
                animate={{ x: `-${activeRec * 100}%` }}
                transition={{ type: "spring", stiffness: 200, damping: 25 }}
              >
                {recs.map((product) => (
                  <div key={product.id} className="min-w-full relative aspect-[16/9] md:aspect-[2/1] overflow-hidden cursor-pointer" onClick={() => { setSelectedProduct(product); setActiveAngle("depan"); }}>
                    <img src={product.gambar.depan} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                    <div className="absolute bottom-10 left-10 text-white">
                      <p className="text-accent font-black uppercase tracking-widest text-xs mb-2">{product.kategori}</p>
                      <h4 className="text-3xl md:text-5xl font-black mb-2">{product.nama}</h4>
                      <p className="text-xl font-bold opacity-90">Rp {product.harga.toLocaleString('id-ID')}</p>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>

            <button onClick={prevRec} className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 backdrop-blur-md p-3 rounded-full text-white transition-all border border-white/10" aria-label="Sebelumnya">
              <LucideIcon name="chevron-left" className="w-6 h-6" />
            </button>
            <button onClick={nextRec} className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 backdrop-blur-md p-3 rounded-full text-white transition-all border border-white/10" aria-label="Berikutnya">
              <LucideIcon name="chevron-right" className="w-6 h-6" />
            </button>

            <div className="flex justify-center gap-3 mt-10">
              {recs.map((_, i) => (
                <button key={i} onClick={() => setActiveRec(i)} className={`h-1.5 rounded-full transition-all ${activeRec === i ? 'bg-accent w-12' : 'bg-white/20 w-4'}`} aria-label={`Slide ${i + 1}`} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Katalog Produk (3 Kolom) */}
      <section id="koleksi" className="py-32 px-6 bg-[#0a0a0a]">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div>
              <span className="text-accent font-black tracking-[0.2em] uppercase text-xs">Arsip Produk</span>
              <h3 className="text-4xl md:text-5xl font-black text-white mt-2">Katalog Terbaru</h3>
            </div>
            <div className="relative w-full md:w-96">
              <input
                type="text" placeholder="Cari koleksi..."
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 focus:outline-none focus:ring-2 ring-accent text-white"
                value={search} onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredProducts.map(product => (
              <motion.div layout key={product.id} className="bg-white/5 rounded-3xl overflow-hidden border border-white/10 hover:border-accent/50 transition-all group animate-in">
                <div className="relative aspect-square overflow-hidden cursor-pointer" onClick={() => { setSelectedProduct(product); setActiveAngle("depan"); }}>
                  <img src={product.gambar.depan} alt={product.nama} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-all" />
                  <div className="absolute top-6 right-6 bg-black/60 backdrop-blur-md p-3 rounded-2xl border border-white/10 opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0">
                    <LucideIcon name="maximize-2" className="w-5 h-5 text-white" />
                  </div>
                </div>
                <div className="p-8">
                  <p className="text-[10px] text-accent font-black uppercase tracking-widest mb-2">{product.kategori}</p>
                  <h4 className="text-xl font-bold mb-4">{product.nama}</h4>
                  <p className="text-white font-black text-2xl mb-8">Rp {product.harga.toLocaleString('id-ID')}</p>
                  <div className="grid grid-cols-2 gap-4">
                    <button onClick={() => addToCart(product)} className="bg-white/10 text-white py-3.5 rounded-2xl font-black text-xs hover:bg-white hover:text-black transition-all border border-white/10 uppercase tracking-widest" aria-label={`Tambah ${product.nama} ke Keranjang`}>Cart</button>
                    <button onClick={() => buyNowWA(product)} className="bg-accent text-white py-3.5 rounded-2xl font-black text-xs hover:bg-red-700 transition-all uppercase tracking-widest" aria-label={`Beli ${product.nama} Sekarang`}>Buy</button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="kontak" className="bg-black text-white py-24 px-6 border-t border-white/10">
        <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-16">
          <div className="md:col-span-2">
            <h4 className="text-4xl font-black mb-8 text-accent">TKTM</h4>
            <p className="text-gray-400 max-w-sm leading-relaxed font-medium">Topiku Topimu. Eksplorasi gaya tanpa batas dengan koleksi headwear premium pilihan terbaik untuk Anda.</p>
            <div className="flex gap-4 mt-8">
               <div className="p-3 bg-white/5 rounded-xl border border-white/10" aria-label="Instagram"><LucideIcon name="instagram" className="w-5 h-5" /></div>
               <div className="p-3 bg-white/5 rounded-xl border border-white/10" aria-label="Twitter"><LucideIcon name="twitter" className="w-5 h-5" /></div>
               <div className="p-3 bg-white/5 rounded-xl border border-white/10" aria-label="Facebook"><LucideIcon name="facebook" className="w-5 h-5" /></div>
            </div>
          </div>
          <div>
            <h5 className="font-black text-xs uppercase tracking-[0.2em] mb-8 text-accent">Kontak</h5>
            <div className="space-y-6 text-gray-400 text-sm font-medium">
              <p className="flex items-center gap-4"><LucideIcon name="phone" className="w-4 h-4 text-accent" /> {WA_NUMBER}</p>
              <p className="flex items-center gap-4"><LucideIcon name="mail" className="w-4 h-4 text-accent" /> machie8910@gmail.com</p>
              <p className="flex items-center gap-4"><LucideIcon name="map-pin" className="w-4 h-4 text-accent" /> Banten, Indonesia</p>
            </div>
          </div>
          <div>
            <h5 className="font-black text-xs uppercase tracking-[0.2em] mb-8 text-accent">Navigasi</h5>
            <div className="flex flex-col gap-4 text-gray-400 text-sm font-medium">
              <a href="#" className="hover:text-accent transition-colors">Beranda</a>
              <a href="#terbaru" className="hover:text-accent transition-colors">Terbaru</a>
              <a href="#koleksi" className="hover:text-accent transition-colors">Koleksi</a>
              <a href="#kontak" className="hover:text-accent transition-colors">Hubungi Kami</a>
            </div>
          </div>
        </div>
        <div className="max-w-6xl mx-auto pt-16 mt-16 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 text-gray-500 text-xs font-bold uppercase tracking-widest">
           <p>© 2024 TKTM. ALL RIGHTS RESERVED.</p>
           <div className="flex gap-8">
              <span>Privacy Policy</span>
              <span>Terms of Service</span>
           </div>
        </div>
      </footer>

      {/* Menu Drawer (Mobile) */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsMenuOpen(false)} className="fixed inset-0 bg-black/80 z-[120] backdrop-blur-md md:hidden" />
            <motion.div initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }} transition={{ type: "spring", damping: 25, stiffness: 200 }} className="fixed left-0 top-0 h-full w-full max-w-xs bg-[#0a0a0a] z-[130] border-r border-white/10 p-10 flex flex-col md:hidden">
              <div className="flex justify-between items-center mb-16">
                <h1 className="text-3xl font-black tracking-tighter text-accent">TKTM</h1>
                <button onClick={() => setIsMenuOpen(false)} className="p-2 bg-white/5 rounded-xl border border-white/10" aria-label="Tutup Menu"><LucideIcon name="x" className="w-6 h-6" /></button>
              </div>

              <nav className="flex flex-col gap-8 mb-auto">
                <a href="#" onClick={() => setIsMenuOpen(false)} className="text-2xl font-black hover:text-accent transition-colors tracking-tighter">BERANDA</a>
                <a href="#terbaru" onClick={() => setIsMenuOpen(false)} className="text-2xl font-black hover:text-accent transition-colors tracking-tighter">TERBARU</a>
                <a href="#koleksi" onClick={() => setIsMenuOpen(false)} className="text-2xl font-black hover:text-accent transition-colors tracking-tighter">KOLEKSI</a>
                <a href="#kontak" onClick={() => setIsMenuOpen(false)} className="text-2xl font-black hover:text-accent transition-colors tracking-tighter">HUBUNGI KAMI</a>
              </nav>

              <div className="pt-10 border-t border-white/10">
                <h5 className="font-black mb-6 text-[10px] uppercase tracking-[0.3em] text-gray-500">KONEKSI</h5>
                <div className="space-y-4">
                  <a href={`https://wa.me/${WA_NUMBER.replace('+', '')}`} className="flex items-center gap-4 font-bold text-sm hover:text-accent transition-all">
                    <LucideIcon name="phone" className="w-5 h-5 text-accent" /> {WA_NUMBER}
                  </a>
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
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsCartOpen(false)} className="fixed inset-0 bg-black/80 z-[120] backdrop-blur-md" />
            <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", damping: 25, stiffness: 200 }} className="fixed right-0 top-0 h-full w-full max-w-md bg-[#0a0a0a] z-[130] border-l border-white/10 p-10 flex flex-col">
              <div className="flex justify-between items-center mb-12">
                <h3 className="text-3xl font-black tracking-tighter">KERANJANG</h3>
                <button onClick={() => setIsCartOpen(false)} className="p-2 bg-white/5 rounded-xl border border-white/10" aria-label="Tutup Keranjang"><LucideIcon name="x" className="w-6 h-6" /></button>
              </div>
              <div className="flex-1 overflow-y-auto space-y-6 pr-2 scrollbar-hide">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center">
                    <div className="p-8 bg-white/5 rounded-full mb-6 border border-white/10"><LucideIcon name="shopping-bag" className="w-12 h-12 text-gray-700" /></div>
                    <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">Keranjang Anda masih kosong</p>
                  </div>
                ) : cart.map(item => (
                  <div key={item.id} className="flex gap-6 items-center bg-white/5 p-4 rounded-2xl border border-white/10">
                    <img src={item.gambar.depan} alt={item.nama} className="w-20 h-20 object-cover rounded-xl border border-white/10" />
                    <div className="flex-1">
                      <h5 className="font-bold text-sm mb-1">{item.nama}</h5>
                      <p className="text-xs text-gray-500 mb-2">{item.qty} x Rp {item.harga.toLocaleString('id-ID')}</p>
                      <p className="text-sm font-black text-accent">Rp {(item.qty * item.harga).toLocaleString('id-ID')}</p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <button onClick={() => removeFromCart(item.id)} className="p-2 text-gray-500 hover:text-accent transition-colors" aria-label={`Hapus ${item.nama} dari Keranjang`}><LucideIcon name="trash-2" className="w-5 h-5" /></button>
                    </div>
                  </div>
                ))}
              </div>
              {cart.length > 0 && (
                <div className="pt-10 border-t border-white/10 mt-auto">
                  <div className="flex justify-between text-xl font-black mb-8 px-2 uppercase tracking-tighter"><span>Total</span><span className="text-accent">Rp {totalHarga.toLocaleString('id-ID')}</span></div>
                  <button onClick={checkoutCart} className="w-full bg-accent text-white py-5 rounded-2xl font-black uppercase tracking-[0.2em] shadow-2xl shadow-accent/20 hover:bg-red-700 transition-all">Checkout</button>
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
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedProduct(null)} className="fixed inset-0 bg-black/90 z-[200] backdrop-blur-xl" />
            <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }} className="fixed inset-4 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-5xl max-h-[90vh] bg-[#0d0d0d] z-[210] rounded-[2.5rem] overflow-hidden flex flex-col md:flex-row border border-white/10 shadow-[0_0_100px_-20px_rgba(225,29,72,0.2)]">
              <div className="w-full md:w-3/5 flex flex-col bg-black relative">
                <div className="flex-1 overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={activeAngle}
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                      src={selectedProduct.gambar[activeAngle]}
                      alt={selectedProduct.nama}
                      className="w-full h-full object-cover"
                    />
                  </AnimatePresence>
                </div>
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-4 p-4 bg-black/40 backdrop-blur-xl rounded-[2rem] border border-white/10">
                  {Object.keys(selectedProduct.gambar).map(angle => (
                    <button
                      key={angle}
                      onClick={() => setActiveAngle(angle)}
                      className={`w-16 h-16 rounded-2xl overflow-hidden border-2 transition-all ${activeAngle === angle ? 'border-accent scale-110 shadow-lg' : 'border-white/10 opacity-40 hover:opacity-100'}`}
                      aria-label={`Lihat gambar ${angle}`}
                    >
                      <img src={selectedProduct.gambar[angle]} alt={`${selectedProduct.nama} ${angle}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>
              <div className="w-full md:w-2/5 p-10 md:p-14 overflow-y-auto relative bg-[#0d0d0d] border-l border-white/5">
                <button onClick={() => setSelectedProduct(null)} className="absolute top-8 right-8 bg-white/5 p-3 rounded-2xl border border-white/10 hover:bg-white/10 transition-all" aria-label="Tutup Detail Produk"><LucideIcon name="x" className="w-6 h-6" /></button>
                <span className="text-accent font-black uppercase text-[10px] tracking-[0.3em]">{selectedProduct.kategori}</span>
                <h3 className="text-4xl font-black mt-4 text-white leading-tight">{selectedProduct.nama}</h3>
                <p className="text-3xl font-black text-white my-8 tracking-tighter">Rp {selectedProduct.harga.toLocaleString('id-ID')}</p>

                <div className="mb-10">
                  <p className="text-gray-500 font-bold uppercase text-[10px] tracking-widest mb-4">Deskripsi</p>
                  <p className="text-gray-400 leading-relaxed font-medium">{selectedProduct.deskripsi}</p>
                </div>

                <div className="space-y-4 mb-12">
                  <div className="flex justify-between border-b border-white/5 pb-3 text-sm font-bold"><span className="text-gray-600 uppercase text-[10px] tracking-widest">Bahan</span><span className="text-white">{selectedProduct.info.bahan}</span></div>
                  <div className="flex justify-between border-b border-white/5 pb-3 text-sm font-bold"><span className="text-gray-600 uppercase text-[10px] tracking-widest">Ukuran</span><span className="text-white">{selectedProduct.info.ukuran}</span></div>
                  <div className="pt-4"><p className="text-gray-600 uppercase text-[10px] tracking-widest font-bold mb-3">Highlight</p><p className="text-white/80 text-sm font-medium leading-relaxed italic border-l-2 border-accent pl-4">{selectedProduct.info.fitur}</p></div>
                </div>

                <div className="grid gap-4">
                  <button onClick={() => { addToCart(selectedProduct); setSelectedProduct(null); }} className="w-full bg-white text-black py-5 rounded-2xl font-black shadow-2xl hover:bg-gray-200 transition-all uppercase tracking-[0.2em] text-xs">Add To Cart</button>
                  <button onClick={() => buyNowWA(selectedProduct)} className="w-full bg-accent text-white py-5 rounded-2xl font-black flex items-center justify-center gap-3 shadow-2xl shadow-accent/20 hover:bg-red-700 transition-all uppercase tracking-[0.2em] text-xs"><LucideIcon name="phone" className="w-5 h-5" /> Buy Now</button>
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
