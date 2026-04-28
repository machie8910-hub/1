const { useState, useEffect, useMemo, useRef } = React;


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

  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, qty: item.qty + 1 } : item);
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const buyNowWA = (product) => {
    const message = `Halo TKTM, saya ingin membeli produk berikut:\n\nNama: ${product.nama}\nHarga: Rp ${product.harga.toLocaleString('id-ID')}\n\nTerima kasih!`;
    const url = `https://wa.me/${WA_NUMBER.replace('+', '')}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  const totalHarga = cart.reduce((acc, item) => acc + (item.harga * item.qty), 0);

  const nextRec = () => setActiveRec((prev) => (prev + 1) % recs.length);
  const prevRec = () => setActiveRec((prev) => (prev - 1 + recs.length) % recs.length);

  return (
    <div className="min-h-screen">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 glass py-4 px-6 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <button onClick={() => setIsMenuOpen(true)} className="p-2 md:hidden">
            <LucideIcon name="menu" className="w-6 h-6" />
          </button>
          <h1 className="text-2xl font-black tracking-tighter text-brand">TKTM</h1>
        </div>

        <div className="flex items-center gap-4 md:gap-6">
          <div className="relative hidden md:block">
            <input
              type="text"
              placeholder="Cari topi..."
              className="bg-gray-100 rounded-full py-1 px-4 text-sm focus:outline-none focus:ring-2 ring-accent"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <button onClick={() => setIsCartOpen(true)} className="relative p-2">
            <LucideIcon name="shopping-cart" className="w-6 h-6" />
            {cart.length > 0 && (
              <span className="absolute top-0 right-0 bg-accent text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {cart.length}
              </span>
            )}
          </button>
        </div>
      </nav>

      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-black">
        <div className="absolute inset-0 opacity-50" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1533055640609-24b498dfd74c?q=80&w=1920&auto=format&fit=crop')`, backgroundPosition: 'center', backgroundSize: 'cover', transform: `translateY(${scrollPos * 0.5}px)` }} />
        <div className="relative z-10 text-center px-4">
          <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-white text-5xl md:text-8xl font-black mb-4">TOPIKU TOPIMU</motion.h2>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="text-gray-300 text-lg md:text-2xl max-w-2xl mx-auto">Koleksi eksklusif untuk melengkapi gaya harianmu. TKTM hadir untuk kenyamanan dan estetika.</motion.p>
          <div className="mt-8">
            <a href="#produk" className="bg-accent hover:bg-yellow-600 text-white font-bold py-3 px-8 rounded-full transition-all">Jelajahi Koleksi</a>
          </div>
        </div>
      </section>

      <section className="py-24 px-6 bg-white overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-accent font-bold tracking-widest uppercase text-sm">Pilihan Terbaik</span>
            <h3 className="text-4xl md:text-5xl font-black mt-3 text-brand">Rekomendasi Minggu Ini</h3>
          </div>

          <div className="relative group max-w-4xl mx-auto">
            <div className="overflow-hidden rounded-[2.5rem] shadow-2xl">
              <motion.div
                className="flex"
                animate={{ x: `-${activeRec * 100}%` }}
                transition={{ type: "spring", stiffness: 200, damping: 25 }}
              >
                {recs.map((product) => (
                  <div key={product.id} className="min-w-full relative aspect-[16/9] md:aspect-[2/1] overflow-hidden cursor-pointer" onClick={() => { setSelectedProduct(product); setActiveAngle("depan"); }}>
                    <img src={product.gambar.depan} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    <div className="absolute bottom-10 left-10 text-white">
                      <p className="text-accent font-bold uppercase tracking-widest text-sm mb-2">{product.kategori}</p>
                      <h4 className="text-3xl md:text-5xl font-black mb-2">{product.nama}</h4>
                      <p className="text-xl opacity-90">Rp {product.harga.toLocaleString('id-ID')}</p>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>

            <button onClick={prevRec} className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 backdrop-blur-md p-3 rounded-full text-white transition-all">
              <LucideIcon name="chevron-left" className="w-6 h-6" />
            </button>
            <button onClick={nextRec} className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 backdrop-blur-md p-3 rounded-full text-white transition-all">
              <LucideIcon name="chevron-right" className="w-6 h-6" />
            </button>

            <div className="flex justify-center gap-2 mt-8">
              {recs.map((_, i) => (
                <button key={i} onClick={() => setActiveRec(i)} className={`w-3 h-3 rounded-full transition-all ${activeRec === i ? 'bg-accent w-8' : 'bg-gray-200'}`} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="produk" className="py-20 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
            <h3 className="text-4xl font-black text-brand">Katalog Terbaru</h3>
            <div className="relative w-full md:w-96">
              <input
                type="text" placeholder="Cari topi..."
                className="w-full bg-white border border-gray-200 rounded-xl py-3 px-4 shadow-sm"
                value={search} onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map(product => (
              <motion.div layout key={product.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all group">
                <div className="relative aspect-square overflow-hidden cursor-pointer" onClick={() => { setSelectedProduct(product); setActiveAngle("depan"); }}>
                  <img src={product.gambar.depan} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute top-4 right-4 bg-white/90 p-2 rounded-full shadow-lg"><LucideIcon name="info" className="w-5 h-5" /></div>
                </div>
                <div className="p-6">
                  <p className="text-xs text-gray-400 font-bold uppercase">{product.kategori}</p>
                  <h4 className="text-lg font-bold mt-1 mb-2">{product.nama}</h4>
                  <p className="text-accent font-black text-xl mb-4">Rp {product.harga.toLocaleString('id-ID')}</p>
                  <div className="grid grid-cols-2 gap-2">
                    <button onClick={() => addToCart(product)} className="bg-gray-100 text-brand py-2.5 rounded-xl font-bold text-sm hover:bg-brand hover:text-white transition-all">Keranjang</button>
                    <button onClick={() => buyNowWA(product)} className="bg-green-500 text-white py-2.5 rounded-xl font-bold text-sm hover:bg-green-600 transition-all">Beli Sekarang</button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <footer className="bg-brand text-white py-16 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-12">
          <div><h4 className="text-3xl font-black mb-6">TKTM</h4><p className="text-gray-400">Topiku Topimu. Platform e-commerce topi nomor satu dengan kualitas tanpa kompromi.</p></div>
          <div>
            <h5 className="font-bold mb-6">Kontak</h5>
            <div className="space-y-4 text-gray-400 text-sm">
              <p className="flex items-center gap-2"><LucideIcon name="phone" className="w-4 h-4" /> {WA_NUMBER}</p>
              <p className="flex items-center gap-2"><LucideIcon name="mail" className="w-4 h-4" /> machie8910@gmail.com</p>
              <p className="flex items-center gap-2"><LucideIcon name="map-pin" className="w-4 h-4" /> Banten, Indonesia</p>
            </div>
          </div>
          <div>
            <h5 className="font-bold mb-6">Metode Pembayaran</h5>
            <p className="text-gray-400 text-sm">Pembayaran dilakukan secara aman melalui konfirmasi WhatsApp dengan berbagai pilihan Bank dan E-Wallet.</p>
          </div>
        </div>
      </footer>

      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsMenuOpen(false)} className="fixed inset-0 bg-black/60 z-[80] backdrop-blur-sm md:hidden" />
            <motion.div initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }} className="fixed left-0 top-0 h-full w-full max-w-xs bg-white z-[90] shadow-2xl p-8 flex flex-col md:hidden">
              <div className="flex justify-between items-center mb-10">
                <h1 className="text-2xl font-black tracking-tighter text-brand">TKTM</h1>
                <button onClick={() => setIsMenuOpen(false)}><LucideIcon name="x" className="w-6 h-6" /></button>
              </div>

              <nav className="flex flex-col gap-6 mb-auto">
                <a href="#" onClick={() => setIsMenuOpen(false)} className="text-xl font-bold hover:text-accent transition-colors">Beranda</a>
                <a href="#produk" onClick={() => setIsMenuOpen(false)} className="text-xl font-bold hover:text-accent transition-colors">Koleksi</a>
                <a href="#footer" onClick={() => setIsMenuOpen(false)} className="text-xl font-bold hover:text-accent transition-colors">Tentang Kami</a>
              </nav>

              <div className="pt-10 border-t">
                <h5 className="font-bold mb-4 text-sm uppercase tracking-widest text-gray-400">Hubungi Kami</h5>
                <div className="space-y-4 text-brand">
                  <a href={`https://wa.me/${WA_NUMBER.replace('+', '')}`} className="flex items-center gap-3 font-medium hover:text-accent">
                    <LucideIcon name="phone" className="w-5 h-5 text-accent" /> {WA_NUMBER}
                  </a>
                  <p className="flex items-center gap-3 font-medium">
                    <LucideIcon name="mail" className="w-5 h-5 text-accent" /> machie8910@gmail.com
                  </p>
                  <p className="flex items-center gap-3 font-medium">
                    <LucideIcon name="map-pin" className="w-5 h-5 text-accent" /> Banten, Indonesia
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsCartOpen(false)} className="fixed inset-0 bg-black/60 z-[60] backdrop-blur-sm" />
            <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-[70] shadow-2xl p-8 flex flex-col">
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-2xl font-bold">Keranjang</h3>
                <button onClick={() => setIsCartOpen(false)}><LucideIcon name="x" className="w-6 h-6" /></button>
              </div>
              <div className="flex-1 overflow-y-auto space-y-4">
                {cart.length === 0 ? <p className="text-gray-400 text-center py-10">Keranjang kosong</p> : cart.map(item => (
                  <div key={item.id} className="flex gap-4 items-center border-b pb-4">
                    <img src={item.gambar.depan} className="w-16 h-16 object-cover rounded-lg" />
                    <div className="flex-1"><h5 className="font-bold">{item.nama}</h5><p className="text-sm text-gray-500">{item.qty} x Rp {item.harga.toLocaleString('id-ID')}</p></div>
                    <button onClick={() => removeFromCart(item.id)} className="text-red-500"><LucideIcon name="trash-2" className="w-5 h-5" /></button>
                  </div>
                ))}
              </div>
              {cart.length > 0 && (
                <div className="pt-6 border-t mt-auto">
                  <div className="flex justify-between text-xl font-bold mb-4"><span>Total</span><span>Rp {totalHarga.toLocaleString('id-ID')}</span></div>
                  <button className="w-full bg-brand text-white py-4 rounded-xl font-bold">Checkout via WhatsApp</button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selectedProduct && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedProduct(null)} className="fixed inset-0 bg-black/80 z-[100] backdrop-blur-md" />
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="fixed inset-4 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-4xl max-h-[90vh] bg-white z-[110] rounded-[2rem] overflow-hidden flex flex-col md:flex-row">
              <div className="w-full md:w-1/2 flex flex-col bg-gray-100">
                <div className="flex-1 overflow-hidden">
                  <motion.img
                    key={activeAngle}
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    src={selectedProduct.gambar[activeAngle]}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4 flex justify-center gap-4 bg-white/50 backdrop-blur">
                  {Object.keys(selectedProduct.gambar).map(angle => (
                    <button
                      key={angle}
                      onClick={() => setActiveAngle(angle)}
                      className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all ${activeAngle === angle ? 'border-accent scale-110 shadow-lg' : 'border-transparent opacity-60'}`}
                    >
                      <img src={selectedProduct.gambar[angle]} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>
              <div className="w-full md:w-1/2 p-8 md:p-12 overflow-y-auto relative bg-white">
                <button onClick={() => setSelectedProduct(null)} className="absolute top-4 right-4 bg-gray-100 p-2 rounded-full"><LucideIcon name="x" className="w-6 h-6" /></button>
                <span className="text-accent font-bold uppercase text-xs tracking-widest">{selectedProduct.kategori}</span>
                <h3 className="text-3xl font-black mt-2 text-brand">{selectedProduct.nama}</h3>
                <p className="text-2xl font-black text-accent my-4">Rp {selectedProduct.harga.toLocaleString('id-ID')}</p>
                <p className="text-gray-600 mb-6 leading-relaxed">{selectedProduct.deskripsi}</p>
                <div className="space-y-4 mb-8">
                  <div className="flex justify-between border-b pb-2 text-sm"><span className="text-gray-400">Bahan</span><span className="font-bold text-brand">{selectedProduct.info.bahan}</span></div>
                  <div className="flex justify-between border-b pb-2 text-sm"><span className="text-gray-400">Ukuran</span><span className="font-bold text-brand">{selectedProduct.info.ukuran}</span></div>
                  <div className="text-sm"><p className="text-gray-400 mb-1">Fitur</p><p className="font-medium text-brand italic">{selectedProduct.info.fitur}</p></div>
                </div>
                <div className="grid gap-3">
                  <button onClick={() => { addToCart(selectedProduct); setSelectedProduct(null); }} className="w-full bg-brand text-white py-4 rounded-xl font-bold shadow-lg hover:bg-black transition-all">Tambah ke Keranjang</button>
                  <button onClick={() => buyNowWA(selectedProduct)} className="w-full bg-green-500 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg hover:bg-green-600 transition-all"><LucideIcon name="phone" className="w-5 h-5" /> Beli via WhatsApp</button>
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