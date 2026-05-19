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

const CONFIG = {
  WA_NUMBER: "6288973262022",
  BRAND_NAME: "TKTM",
  CURRENCY: "Rp"
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

const LucideIcon = ({ name, className }) => {
  const iconRef = useRef(null);
  useEffect(() => {
    if (window.lucide && iconRef.current) {
      window.lucide.createIcons({
        targets: [iconRef.current]
      });
    }
  }, [name]);
  return <i ref={iconRef} data-lucide={name} className={className}></i>;
};

const Toast = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className={`fixed bottom-8 left-1/2 -translate-x-1/2 z-[200] px-6 py-3 rounded-2xl shadow-2xl flex items-center gap-3 backdrop-blur-xl border border-white/10 ${
        type === 'success' ? 'bg-[#e11d48] text-white' : 'bg-white text-[#0a0a0a]'
      }`}
    >
      <LucideIcon name={type === 'success' ? 'check-circle' : 'info'} className="w-5 h-5" />
      <span className="font-bold tracking-tight">{message}</span>
    </motion.div>
  );
};

const ProductModal = ({ product, onClose, onAddToCart, onBuyNow }) => {
  const [activeAngle, setActiveAngle] = useState("depan");

  if (!product) return null;

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/90 z-[100] backdrop-blur-md"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="fixed inset-4 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-4xl md:h-[600px] bg-[#111] z-[110] rounded-[2.5rem] overflow-hidden flex flex-col md:flex-row border border-white/10"
      >
        <div className="w-full md:w-1/2 flex flex-col bg-[#0a0a0a]">
          <div className="flex-1 overflow-hidden relative group">
            <AnimatePresence mode="wait">
              <motion.img
                key={activeAngle}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                src={product.gambar[activeAngle]}
                className="w-full h-full object-cover"
              />
            </AnimatePresence>
            <div className="absolute top-4 left-4">
              <span className="bg-[#e11d48] text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest shadow-lg">New Arrival</span>
            </div>
          </div>
          <div className="p-6 flex justify-center gap-4 bg-white/5">
            {Object.keys(product.gambar).map(angle => (
              <button
                key={angle}
                onClick={() => setActiveAngle(angle)}
                className={`w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all duration-300 ${
                  activeAngle === angle ? 'border-[#e11d48] scale-110 shadow-[0_0_20px_rgba(225,29,72,0.3)]' : 'border-transparent opacity-40 hover:opacity-100'
                }`}
              >
                <img src={product.gambar[angle]} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        <div className="w-full md:w-1/2 p-10 md:p-14 overflow-y-auto relative bg-[#111] text-white">
          <button onClick={onClose} className="absolute top-6 right-6 bg-white/5 hover:bg-[#e11d48] p-3 rounded-full transition-all group">
            <LucideIcon name="x" className="w-6 h-6 group-hover:scale-110 transition-transform" />
          </button>

          <span className="text-[#e11d48] font-black uppercase text-xs tracking-[0.2em] mb-2 block">{product.kategori}</span>
          <h3 className="text-4xl font-black mt-2 tracking-tighter leading-tight">{product.nama}</h3>
          <p className="text-3xl font-black text-white/90 my-6">Rp {product.harga.toLocaleString('id-ID')}</p>

          <div className="space-y-6 mb-10">
            <p className="text-gray-400 leading-relaxed text-lg">{product.deskripsi}</p>
            <div className="grid grid-cols-1 gap-4 pt-6 border-t border-white/5">
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500 font-medium">Material</span>
                <span className="font-bold text-white/80">{product.info.bahan}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500 font-medium">Fit</span>
                <span className="font-bold text-white/80">{product.info.ukuran}</span>
              </div>
            </div>
          </div>

          <div className="grid gap-4 sticky bottom-0 pt-4 bg-[#111]">
            <button
              onClick={() => { onAddToCart(product); onClose(); }}
              className="w-full bg-white text-[#0a0a0a] py-5 rounded-2xl font-black text-lg hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl"
            >
              TAMBAH KE KERANJANG
            </button>
            <button
              onClick={() => onBuyNow(product)}
              className="w-full bg-[#e11d48] text-white py-5 rounded-2xl font-black text-lg flex items-center justify-center gap-3 hover:bg-[#f43f5e] hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_10px_30px_rgba(225,29,72,0.3)]"
            >
              <LucideIcon name="phone" className="w-6 h-6" /> BELI SEKARANG
            </button>
          </div>
        </div>
      </motion.div>
    </>
  );
};

const CartDrawer = ({ isOpen, onClose, cart, onRemove, onCheckout }) => {
  const total = cart.reduce((sum, item) => sum + (item.harga * item.qty), 0);

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="fixed inset-0 bg-black/80 z-[150] backdrop-blur-sm"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 h-full w-full max-w-md bg-[#0a0a0a] z-[160] shadow-2xl flex flex-col border-l border-white/5"
            >
              <div className="p-8 flex justify-between items-center border-b border-white/5">
                <div>
                  <h3 className="text-2xl font-black tracking-tight">KERANJANG</h3>
                  <p className="text-xs text-gray-500 font-bold uppercase tracking-widest mt-1">{cart.length} ITEMS SELECTED</p>
                </div>
                <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full transition-colors">
                  <LucideIcon name="x" className="w-6 h-6" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-8 space-y-6">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center opacity-20">
                    <LucideIcon name="shopping-bag" className="w-20 h-20 mb-4" />
                    <p className="text-xl font-bold">Keranjang Kosong</p>
                  </div>
                ) : (
                  cart.map(item => (
                    <motion.div layout key={item.id} className="flex gap-4 items-center bg-white/5 p-4 rounded-2xl border border-white/5">
                      <img src={item.gambar.depan} className="w-20 h-20 object-cover rounded-xl" />
                      <div className="flex-1">
                        <h5 className="font-bold text-white tracking-tight leading-tight">{item.nama}</h5>
                        <p className="text-[#e11d48] font-black text-sm mt-1">{CONFIG.CURRENCY} {item.harga.toLocaleString('id-ID')}</p>
                        <div className="flex items-center gap-3 mt-2 text-xs font-bold text-gray-500 uppercase">
                          <span>QTY: {item.qty}</span>
                        </div>
                      </div>
                      <button onClick={() => onRemove(item.id)} className="p-2 text-gray-500 hover:text-[#e11d48] transition-colors">
                        <LucideIcon name="trash-2" className="w-5 h-5" />
                      </button>
                    </motion.div>
                  ))
                )}
              </div>

              {cart.length > 0 && (
                <div className="p-8 bg-[#111] border-t border-white/5">
                  <div className="flex justify-between items-end mb-8">
                    <span className="text-gray-500 font-bold uppercase tracking-widest text-xs">Total Pembayaran</span>
                    <span className="text-3xl font-black text-white">{CONFIG.CURRENCY} {total.toLocaleString('id-ID')}</span>
                  </div>
                  <button
                    onClick={onCheckout}
                    className="w-full bg-[#e11d48] text-white py-5 rounded-2xl font-black text-lg shadow-[0_10px_30px_rgba(225,29,72,0.3)] hover:bg-[#f43f5e] transition-all flex items-center justify-center gap-3"
                  >
                    CHECKOUT VIA WHATSAPP
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

const App = () => {
  const [toasts, setToasts] = useState([]);
  const [cart, setCart] = useState([]);
  const [search, setSearch] = useState("");
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [scrollPos, setScrollPos] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollPos(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(p =>
      p.nama.toLowerCase().includes(search.toLowerCase()) ||
      p.kategori.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  const addToast = (message, type = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, qty: item.qty + 1 } : item);
      }
      return [...prev, { ...product, qty: 1 }];
    });
    addToast(`Berhasil menambah ${product.nama} ke keranjang`);
  };

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const checkout = () => {
    const total = cart.reduce((sum, item) => sum + (item.harga * item.qty), 0);
    const itemsList = cart.map(item => `- ${item.nama} (${item.qty}x)`).join('\n');
    const message = `Halo ${CONFIG.BRAND_NAME}, saya ingin memesan:\n\n${itemsList}\n\nTotal: ${CONFIG.CURRENCY} ${total.toLocaleString('id-ID')}\n\nMohon informasi pembayarannya.`;

    window.open(`https://wa.me/${CONFIG.WA_NUMBER}?text=${encodeURIComponent(message)}`, '_blank');
    setCart([]);
    setIsCartOpen(false);
    addToast('Pembelian berhasil! Pesanan Anda telah dikirim.', 'success');
  };

  const buyNow = (product) => {
    const message = `Halo ${CONFIG.BRAND_NAME}, saya ingin membeli:\n\n- ${product.nama} (1x)\n\nTotal: ${CONFIG.CURRENCY} ${product.harga.toLocaleString('id-ID')}\n\nMohon informasi pembayarannya.`;
    window.open(`https://wa.me/${CONFIG.WA_NUMBER}?text=${encodeURIComponent(message)}`, '_blank');
    addToast('Pesanan dikirim via WhatsApp', 'success');
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Navbar */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 px-6 py-5 flex justify-between items-center ${scrollPos > 50 ? 'glass' : 'bg-transparent'}`}>
        <div className="flex items-center gap-6">
          <button onClick={() => setIsMenuOpen(true)} className="p-2 md:hidden hover:bg-white/5 rounded-full transition-colors">
            <LucideIcon name="menu" className="w-6 h-6" />
          </button>
          <h1 className="text-3xl font-black tracking-tighter text-[#e11d48] cursor-pointer hover:scale-105 transition-transform">TKTM</h1>

          <div className="hidden md:flex items-center gap-8 ml-10">
             {['Koleksi', 'Terbaru', 'Kontak'].map(item => (
               <a key={item} href={`#${item.toLowerCase()}`} className="text-xs font-black uppercase tracking-[0.2em] text-gray-400 hover:text-white transition-colors">{item}</a>
             ))}
          </div>
        </div>

        <div className="flex items-center gap-3 md:gap-8">
          <div className="relative hidden sm:block group">
            <LucideIcon name="search" className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-[#e11d48] transition-colors" />
            <input
              type="text"
              placeholder="CARI TOPI..."
              className="bg-white/5 border border-white/5 rounded-full py-2.5 pl-11 pr-6 text-[10px] font-black uppercase tracking-widest focus:outline-none focus:ring-1 ring-[#e11d48]/50 w-48 lg:w-64 transition-all"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <button onClick={() => setIsCartOpen(true)} className="relative p-3 hover:bg-white/5 rounded-full transition-all group">
            <LucideIcon name="shopping-bag" className="w-6 h-6 group-hover:scale-110 transition-transform" />
            {cart.length > 0 && (
              <span className="absolute top-1 right-1 bg-[#e11d48] text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-black border-2 border-[#0a0a0a] animate-bounce">
                {cart.length}
              </span>
            )}
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden bg-black">
        <motion.div
          initial={{ scale: 1.2, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.4 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1521369909029-2afed882baee?q=80&w=1920&auto=format&fit=crop')`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            transform: `translateY(${scrollPos * 0.2}px)`
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0a0a0a]" />

        <div className="relative z-10 text-center px-4 max-w-5xl">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block text-[#e11d48] font-black tracking-[0.4em] uppercase text-xs mb-6"
          >
            Spring Summer 2024 Collection
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-white text-6xl md:text-9xl font-black mb-8 tracking-tighter leading-none"
          >
            TOPIKU<br/><span className="text-outline text-transparent">TOPIMU</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto font-medium leading-relaxed mb-12"
          >
            Elevasi gaya harianmu dengan koleksi headwear premium yang menggabungkan estetika urban dan kenyamanan tanpa kompromi.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <a href="#koleksi" className="bg-[#e11d48] hover:bg-[#f43f5e] text-white font-black py-5 px-10 rounded-2xl transition-all shadow-2xl shadow-[#e11d48]/20 flex items-center justify-center gap-3 group">
              JELAJAHI KOLEKSI <LucideIcon name="arrow-right" className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-30 animate-pulse">
           <span className="text-[10px] font-black uppercase tracking-[0.3em]">Scroll Down</span>
           <div className="w-px h-12 bg-white" />
        </div>
      </section>

      {/* Product Grid */}
      <main id="koleksi" className="py-32 px-6 max-w-7xl mx-auto">
        <div id="terbaru" className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div>
            <span className="text-[#e11d48] font-black uppercase text-xs tracking-[0.2em] mb-3 block">Selected Headwear</span>
            <h3 className="text-4xl md:text-6xl font-black tracking-tighter">KATALOG TERBARU</h3>
          </div>
          <div className="flex gap-4">
             {['All', 'Snapback', 'Beanie'].map(cat => (
               <button key={cat} className="text-[10px] font-black uppercase tracking-widest px-6 py-3 rounded-full border border-white/10 hover:border-[#e11d48] transition-colors">{cat}</button>
             ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
           {filteredProducts.map((p, idx) => (
             <motion.div
               layout
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: idx * 0.1 }}
               key={p.id}
               className="group cursor-pointer"
               onClick={() => setSelectedProduct(p)}
             >
                <div className="relative aspect-[3/4] overflow-hidden rounded-[2rem] bg-[#111] mb-6">
                   <img src={p.gambar.depan} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                   <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors" />
                   <div className="absolute bottom-6 left-6 right-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                      <button className="w-full bg-white text-black py-4 rounded-xl font-black text-xs uppercase tracking-widest shadow-2xl">Detail Produk</button>
                   </div>
                   <div className="absolute top-6 right-6">
                      <button className="bg-black/50 backdrop-blur-md p-3 rounded-full hover:bg-[#e11d48] transition-colors">
                         <LucideIcon name="shopping-bag" className="w-4 h-4" />
                      </button>
                   </div>
                </div>
                <div className="px-2">
                   <div className="flex justify-between items-start mb-2">
                      <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">{p.kategori}</p>
                      <p className="text-[#e11d48] font-black text-sm">New</p>
                   </div>
                   <h4 className="font-bold text-xl tracking-tight text-white/90 group-hover:text-[#e11d48] transition-colors line-clamp-1">{p.nama}</h4>
                   <p className="text-gray-400 font-bold mt-2">{CONFIG.CURRENCY} {p.harga.toLocaleString('id-ID')}</p>
                </div>
             </motion.div>
           ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="py-20 text-center opacity-30">
             <LucideIcon name="search-slash" className="w-16 h-16 mx-auto mb-4" />
             <p className="text-xl font-bold">Produk tidak ditemukan</p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer id="kontak" className="bg-[#050505] border-t border-white/5 py-24 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-16">
          <div className="md:col-span-2">
            <h4 className="text-4xl font-black text-[#e11d48] mb-8 tracking-tighter">TKTM</h4>
            <p className="text-gray-500 max-w-md leading-relaxed text-lg font-medium">Platform e-commerce topi nomor satu di Indonesia yang mengutamakan kualitas material dan estetika desain urban.</p>
            <div className="flex gap-4 mt-10">
               {['instagram', 'twitter', 'facebook'].map(social => (
                 <button key={social} className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-[#e11d48] hover:border-[#e11d48] transition-all group">
                    <LucideIcon name={social} className="w-5 h-5 text-gray-400 group-hover:text-white" />
                 </button>
               ))}
            </div>
          </div>
          <div>
            <h5 className="font-black uppercase tracking-widest text-xs text-white mb-8">Informasi</h5>
            <div className="space-y-4 text-gray-500 font-bold text-sm">
              <p className="hover:text-white cursor-pointer transition-colors">Tentang Kami</p>
              <p className="hover:text-white cursor-pointer transition-colors">Kebijakan Privasi</p>
              <p className="hover:text-white cursor-pointer transition-colors">Syarat & Ketentuan</p>
              <p className="hover:text-white cursor-pointer transition-colors">Layanan Pelanggan</p>
            </div>
          </div>
          <div>
            <h5 className="font-black uppercase tracking-widest text-xs text-white mb-8">Kontak</h5>
            <div className="space-y-6 text-gray-500 text-sm font-bold">
              <p className="flex items-center gap-4 group cursor-pointer"><LucideIcon name="phone" className="w-5 h-5 text-[#e11d48]" /> +{CONFIG.WA_NUMBER}</p>
              <p className="flex items-center gap-4 group cursor-pointer"><LucideIcon name="mail" className="w-5 h-5 text-[#e11d48]" /> support@tktm.shop</p>
              <p className="flex items-center gap-4 group cursor-pointer"><LucideIcon name="map-pin" className="w-5 h-5 text-[#e11d48]" /> Banten, Indonesia</p>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-24 pt-8 border-t border-white/5 text-center text-gray-600 text-[10px] font-black uppercase tracking-[0.5em]">
          &copy; 2024 TKTM - ALL RIGHTS RESERVED
        </div>
      </footer>

      {/* Menu Drawer Mobile */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsMenuOpen(false)} className="fixed inset-0 bg-black/95 z-[100] md:hidden" />
            <motion.div initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }} className="fixed left-0 top-0 h-full w-full max-w-xs bg-[#0a0a0a] z-[110] p-10 flex flex-col">
              <div className="flex justify-between items-center mb-16">
                <h1 className="text-3xl font-black tracking-tighter text-[#e11d48]">TKTM</h1>
                <button onClick={() => setIsMenuOpen(false)}><LucideIcon name="x" className="w-8 h-8" /></button>
              </div>
              <nav className="flex flex-col gap-8">
                {['Beranda', 'Koleksi', 'Tentang Kami', 'Kontak'].map((item, i) => (
                  <motion.a
                    key={item}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    href="#"
                    onClick={() => setIsMenuOpen(false)}
                    className="text-4xl font-black tracking-tighter hover:text-[#e11d48] transition-colors"
                  >
                    {item}
                  </motion.a>
                ))}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selectedProduct && (
          <ProductModal
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
            onAddToCart={addToCart}
            onBuyNow={buyNow}
          />
        )}
      </AnimatePresence>

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onRemove={removeFromCart}
        onCheckout={checkout}
      />

      <div className="pointer-events-none">
        <AnimatePresence>
          {toasts.map(toast => (
            <Toast
              key={toast.id}
              message={toast.message}
              type={toast.type}
              onClose={() => removeToast(toast.id)}
            />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
