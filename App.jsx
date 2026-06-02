const { useState, useEffect, useMemo, useRef, Fragment } = React;
const { motion, AnimatePresence } = window.Motion || {
    motion: {
        div: 'div', nav: 'nav', section: 'section', button: 'button',
        h1: 'h1', p: 'p', span: 'span', img: 'img', footer: 'footer'
    },
    AnimatePresence: Fragment
};

const CONFIG = {
    BRAND: 'TKTM',
    WHATSAPP: '6288973262022',
    CURRENCY: 'IDR',
};

const PRODUCTS = [
    {
        id: 1,
        name: "Neo-Tokyo Stealth Bomber",
        price: 1850000,
        category: "Outerwear",
        images: [
            "https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=800&auto=format&fit=crop"
        ],
        description: "Jaket bomber tahan air dengan estetika techwear futuristik. Dilengkapi dengan banyak kantong fungsional dan material premium.",
        features: ["Waterproof", "Tactical Pockets", "Breathable Mesh", "Adjustable Cuffs"]
    },
    {
        id: 2,
        name: "Cyber-Vanguard Cargo Pants",
        price: 950000,
        category: "Bottoms",
        images: [
            "https://images.unsplash.com/photo-1517438476312-10d79c077509?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=800&auto=format&fit=crop"
        ],
        description: "Celana cargo dengan siluet tapered yang modern. Sangat nyaman untuk mobilitas tinggi di perkotaan.",
        features: ["Stretch Fabric", "10 Storage Pockets", "Reinforced Knees", "Quick-Dry"]
    },
    {
        id: 3,
        name: "Overload Graphic Tee",
        price: 350000,
        category: "Tops",
        images: [
            "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=800&auto=format&fit=crop"
        ],
        description: "T-shirt oversized dengan desain grafis distopia cyberpunk. Terbuat dari katun berkualitas tinggi.",
        features: ["100% Cotton", "Screen Printed Graphic", "Oversized Fit", "Pre-shrunk"]
    },
    {
        id: 4,
        name: "Void Runner High-Top",
        price: 2400000,
        category: "Footwear",
        images: [
            "https://images.unsplash.com/photo-1552346154-21d32810aba3?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=800&auto=format&fit=crop"
        ],
        description: "Sepatu high-top dengan desain avant-garde. Menggabungkan gaya streetwear dan performa atletik.",
        features: ["Responsive Cushioning", "Durable Outsole", "Sleek Aesthetics", "Sock-like Fit"]
    },
    {
        id: 5,
        name: "Signal-Lost Hoodie",
        price: 750000,
        category: "Tops",
        images: [
            "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1578587018452-892bacefd3f2?q=80&w=800&auto=format&fit=crop"
        ],
        description: "Hoodie minimalis dengan detail jahitan kontras. Cocok untuk tampilan layer yang bersih.",
        features: ["Heavyweight Fleece", "Hidden Pockets", "Embroidery Logo", "Ribbed Trims"]
    },
    {
        id: 6,
        name: "Protocol Tactical Vest",
        price: 1200000,
        category: "Outerwear",
        images: [
            "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=800&auto=format&fit=crop"
        ],
        description: "Vest taktikal modular untuk melengkapi tampilan urban ninja Anda.",
        features: ["MOLLE System", "Adjustable Straps", "Lightweight Padding", "Velcro Patches"]
    }
];

const LucideIcon = ({ name, className = "w-5 h-5", ...props }) => {
    const iconRef = useRef(null);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (window.lucide) {
                window.lucide.createIcons();
            }
        }, 0);
        return () => clearTimeout(timer);
    }, [name, className]);

    return (
        <i
            ref={iconRef}
            data-lucide={name}
            className={className}
            {...props}
        />
    );
};

const formatIDR = (price) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
    }).format(price);
};

const App = () => {
    const [cart, setCart] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [scrolled, setScrolled] = useState(false);
    const [activeCategory, setActiveCategory] = useState('Semua');

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const filteredProducts = useMemo(() => {
        return PRODUCTS.filter(p => {
            const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesCategory = activeCategory === 'Semua' || p.category === activeCategory;
            return matchesSearch && matchesCategory;
        });
    }, [searchQuery, activeCategory]);

    const addToCart = (product) => {
        setCart(prev => {
            const existing = prev.find(item => item.id === product.id);
            if (existing) {
                return prev.map(item =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [...prev, { ...product, quantity: 1 }];
        });
    };

    const removeFromCart = (productId) => {
        setCart(prev => prev.filter(item => item.id !== productId));
    };

    const updateQuantity = (productId, delta) => {
        setCart(prev => prev.map(item => {
            if (item.id === productId) {
                const newQty = Math.max(1, item.quantity + delta);
                return { ...item, quantity: newQty };
            }
            return item;
        }));
    };

    const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

    const [toast, setToast] = useState(null);

    const showToast = (message) => {
        setToast(message);
        setTimeout(() => setToast(null), 3000);
    };

    const handleAddToCart = (product) => {
        addToCart(product);
        showToast(`${product.name} ditambahkan ke keranjang`);
    };

    const handleCheckout = () => {
        const message = `Halo ${CONFIG.BRAND}, saya ingin memesan:\n\n` +
            cart.map(item => `- ${item.name} (${item.quantity}x) - ${formatIDR(item.price * item.quantity)}`).join('\n') +
            `\n\nTotal: ${formatIDR(cartTotal)}\n\nTerima kasih!`;

        const encoded = encodeURIComponent(message);
        window.open(`https://wa.me/${CONFIG.WHATSAPP}?text=${encoded}`, '_blank');

        setCart([]);
        setIsCartOpen(false);
        showToast('Pesanan berhasil dibuat!');
    };

    return (
        <div className="min-h-screen bg-bg selection:bg-brand selection:text-white">
            {/* Navbar */}
            <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-bg/80 backdrop-blur-md border-b border-white/10 py-3' : 'bg-transparent py-5'}`}>
                <div className="container mx-auto px-4 flex justify-between items-center">
                    <div className="flex items-center gap-8">
                        <a href="#" className="text-2xl font-black tracking-tighter text-brand italic">
                            {CONFIG.BRAND}
                        </a>
                        <div className="hidden md:flex gap-6 text-sm font-medium text-gray-400">
                            {['Semua', 'Outerwear', 'Bottoms', 'Tops', 'Footwear'].map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => setActiveCategory(cat)}
                                    className={`hover:text-white transition-colors ${activeCategory === cat ? 'text-brand' : ''}`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="relative group hidden sm:block">
                            <input
                                type="text"
                                placeholder="Cari produk..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="bg-white/5 border border-white/10 rounded-full py-1.5 px-4 pl-10 text-sm focus:outline-none focus:border-brand/50 transition-all w-40 group-focus-within:w-64"
                            />
                            <LucideIcon name="search" className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                        </div>
                        <button
                            onClick={() => setIsCartOpen(true)}
                            className="relative p-2 hover:bg-white/5 rounded-full transition-colors"
                            aria-label="Keranjang"
                        >
                            <LucideIcon name="shopping-cart" />
                            {cartCount > 0 && (
                                <span className="absolute -top-1 -right-1 bg-brand text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full animate-in">
                                    {cartCount}
                                </span>
                            )}
                        </button>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <header className="relative h-[85vh] flex items-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=2000&auto=format&fit=crop"
                        alt="Hero Background"
                        className="w-full h-full object-cover opacity-40 scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/20 to-transparent"></div>
                </div>

                <div className="container mx-auto px-4 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="max-w-2xl"
                    >
                        <span className="text-brand font-bold tracking-widest text-sm uppercase mb-4 block">New Season 2026</span>
                        <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-6 leading-[0.9]">
                            CYBER <br/> <span className="text-brand italic">CORE</span>
                        </h1>
                        <p className="text-gray-400 text-lg mb-8 max-w-lg">
                            Masa depan fashion perkotaan ada di sini. Koleksi techwear yang menggabungkan fungsi taktis dengan estetika masa depan.
                        </p>
                        <div className="flex gap-4">
                            <a href="#koleksi" className="btn-primary">Lihat Koleksi</a>
                            <button className="btn-outline">Tentang Kami</button>
                        </div>
                    </motion.div>
                </div>
            </header>

            {/* Product Grid */}
            <main id="koleksi" className="container mx-auto px-4 py-24">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                    <div>
                        <h2 className="text-4xl font-black tracking-tighter mb-2 italic underline decoration-brand/50">KOLEKSI TERBARU</h2>
                        <p className="text-gray-500">Menampilkan {filteredProducts.length} produk pilihan</p>
                    </div>
                    <div className="flex gap-2 bg-white/5 p-1 rounded-lg">
                        {['Semua', 'Outerwear', 'Bottoms', 'Tops'].map(cat => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${activeCategory === cat ? 'bg-brand text-white' : 'hover:text-white'}`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredProducts.map((product, idx) => (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="group relative bg-[#121212] border border-white/5 rounded-2xl overflow-hidden hover:border-brand/30 transition-all duration-500"
                        >
                            <div className="aspect-[4/5] overflow-hidden relative cursor-pointer" onClick={() => setSelectedProduct(product)}>
                                <img
                                    src={product.images[0]}
                                    alt={product.name}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                                    <button
                                        className="w-12 h-12 bg-white text-black rounded-full flex items-center justify-center hover:bg-brand hover:text-white transition-colors"
                                        onClick={(e) => { e.stopPropagation(); setSelectedProduct(product); }}
                                        aria-label="Detail Produk"
                                    >
                                        <LucideIcon name="eye" className="w-5 h-5" />
                                    </button>
                                    <button
                                        className="w-12 h-12 bg-brand text-white rounded-full flex items-center justify-center hover:bg-white hover:text-black transition-colors"
                                        onClick={(e) => { e.stopPropagation(); handleAddToCart(product); }}
                                        aria-label="Tambah ke keranjang"
                                    >
                                        <LucideIcon name="shopping-cart" className="w-5 h-5" />
                                    </button>
                                </div>
                                <div className="absolute top-4 left-4">
                                    <span className="bg-brand/90 backdrop-blur-sm text-[10px] font-black tracking-widest uppercase px-2 py-1 rounded">New Arrival</span>
                                </div>
                            </div>
                            <div className="p-6">
                                <p className="text-brand text-[10px] font-bold tracking-widest uppercase mb-1">{product.category}</p>
                                <h3 className="text-xl font-bold tracking-tight mb-2 group-hover:text-brand transition-colors">{product.name}</h3>
                                <div className="flex justify-between items-center">
                                    <span className="text-lg font-black text-gray-400 group-hover:text-white transition-colors">
                                        {formatIDR(product.price)}
                                    </span>
                                    <button
                                        onClick={() => handleAddToCart(product)}
                                        className="text-sm font-bold text-white hover:text-brand transition-colors flex items-center gap-1"
                                    >
                                        BELI <LucideIcon name="arrow-right" className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {filteredProducts.length === 0 && (
                    <div className="py-20 text-center">
                        <LucideIcon name="search-x" className="w-16 h-16 text-gray-700 mx-auto mb-4" />
                        <h3 className="text-2xl font-bold mb-2">Produk Tidak Ditemukan</h3>
                        <p className="text-gray-500">Coba kata kunci lain atau kategori yang berbeda.</p>
                    </div>
                )}
            </main>

            {/* Footer */}
            <footer className="bg-[#050505] border-t border-white/5 py-12 mt-20">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                        <div className="col-span-1 md:col-span-2">
                            <h2 className="text-3xl font-black italic text-brand mb-6">{CONFIG.BRAND}</h2>
                            <p className="text-gray-500 max-w-sm mb-6">
                                Menyediakan perlengkapan techwear berkualitas tinggi untuk mendukung mobilitas urban Anda dengan gaya masa depan.
                            </p>
                            <div className="flex gap-4">
                                {['instagram', 'twitter', 'facebook', 'youtube'].map(social => (
                                    <a key={social} href="#" className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-brand transition-colors">
                                        <LucideIcon name={social} className="w-4 h-4" />
                                    </a>
                                ))}
                            </div>
                        </div>
                        <div>
                            <h4 className="font-bold mb-6 uppercase tracking-widest text-xs text-brand">Navigasi</h4>
                            <ul className="space-y-4 text-sm text-gray-400">
                                <li><a href="#" className="hover:text-white transition-colors">Home</a></li>
                                <li><a href="#koleksi" className="hover:text-white transition-colors">Koleksi</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Tentang Kami</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Kontak</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-bold mb-6 uppercase tracking-widest text-xs text-brand">Bantuan</h4>
                            <ul className="space-y-4 text-sm text-gray-400">
                                <li><a href="#" className="hover:text-white transition-colors">Panduan Ukuran</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Pengiriman</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Kebijakan Pengembalian</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-600 font-medium">
                        <p>© 2026 {CONFIG.BRAND} INDUSTRIES. All Rights Reserved.</p>
                        <div className="flex gap-6">
                            <a href="#" className="hover:text-gray-400 transition-colors">Privacy Policy</a>
                            <a href="#" className="hover:text-gray-400 transition-colors">Terms of Service</a>
                        </div>
                    </div>
                </div>
            </footer>

            {/* Toast Notification */}
            <AnimatePresence>
                {toast && (
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] bg-white text-[#0a0a0a] px-6 py-3 rounded-full font-bold shadow-2xl flex items-center gap-3 border-b-4 border-brand"
                    >
                        <LucideIcon name="check-circle-2" className="w-5 h-5 text-brand" />
                        {toast}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Cart Drawer */}
            <AnimatePresence>
                {isCartOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsCartOpen(false)}
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
                        />
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="fixed right-0 top-0 h-full w-full max-w-md bg-[#0a0a0a] border-l border-white/10 z-[70] flex flex-col shadow-2xl"
                        >
                            <div className="p-6 border-b border-white/10 flex justify-between items-center bg-[#0d0d0d]">
                                <h2 className="text-xl font-black italic tracking-tight flex items-center gap-2">
                                    <LucideIcon name="shopping-bag" className="text-brand" />
                                    KERANJANG <span className="text-sm font-normal text-gray-500 not-italic ml-2">({cartCount})</span>
                                </h2>
                                <button
                                    onClick={() => setIsCartOpen(false)}
                                    className="p-2 hover:bg-white/5 rounded-full transition-colors"
                                    aria-label="Tutup Keranjang"
                                >
                                    <LucideIcon name="x" />
                                </button>
                            </div>

                            <div className="flex-1 overflow-y-auto p-6 space-y-6">
                                {cart.length === 0 ? (
                                    <div className="h-full flex flex-col items-center justify-center text-center opacity-50">
                                        <LucideIcon name="shopping-cart" className="w-16 h-16 mb-4" />
                                        <p className="text-lg font-bold">Keranjang Kosong</p>
                                        <p className="text-sm">Mulailah belanja untuk mengisi keranjang Anda.</p>
                                    </div>
                                ) : (
                                    cart.map(item => (
                                        <div key={item.id} className="flex gap-4 group">
                                            <div className="w-20 h-20 bg-white/5 rounded-lg overflow-hidden flex-shrink-0 border border-white/5">
                                                <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h4 className="font-bold text-sm truncate group-hover:text-brand transition-colors">{item.name}</h4>
                                                <p className="text-brand font-black text-sm mt-1">{formatIDR(item.price)}</p>
                                                <div className="flex items-center gap-3 mt-3">
                                                    <div className="flex items-center bg-white/5 rounded-full border border-white/10">
                                                        <button
                                                            onClick={() => updateQuantity(item.id, -1)}
                                                            className="p-1 px-2 hover:text-brand transition-colors"
                                                        >
                                                            <LucideIcon name="minus" className="w-3 h-3" />
                                                        </button>
                                                        <span className="text-xs font-bold w-6 text-center">{item.quantity}</span>
                                                        <button
                                                            onClick={() => updateQuantity(item.id, 1)}
                                                            className="p-1 px-2 hover:text-brand transition-colors"
                                                        >
                                                            <LucideIcon name="plus" className="w-3 h-3" />
                                                        </button>
                                                    </div>
                                                    <button
                                                        onClick={() => removeFromCart(item.id)}
                                                        className="text-xs text-gray-500 hover:text-red-500 transition-colors font-bold underline underline-offset-4"
                                                    >
                                                        HAPUS
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>

                            {cart.length > 0 && (
                                <div className="p-6 border-t border-white/10 bg-[#0d0d0d] space-y-4">
                                    <div className="flex justify-between items-end">
                                        <span className="text-gray-500 font-bold text-xs uppercase tracking-widest">Subtotal</span>
                                        <span className="text-2xl font-black">{formatIDR(cartTotal)}</span>
                                    </div>
                                    <button
                                        onClick={handleCheckout}
                                        className="w-full btn-primary flex items-center justify-center gap-2 py-4"
                                    >
                                        CHECKOUT VIA WHATSAPP <LucideIcon name="message-circle" className="w-5 h-5" />
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
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedProduct(null)}
                            className="fixed inset-0 bg-black/80 backdrop-blur-md z-[80]"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="fixed inset-4 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-[900px] md:h-[600px] bg-[#0d0d0d] border border-white/10 z-[90] rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row"
                        >
                            <button
                                onClick={() => setSelectedProduct(null)}
                                className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/50 backdrop-blur-md hover:bg-brand text-white rounded-full flex items-center justify-center transition-colors"
                            >
                                <LucideIcon name="x" />
                            </button>

                            {/* Image Gallery */}
                            <div className="w-full md:w-1/2 h-64 md:h-full relative group bg-white/5">
                                <img
                                    src={selectedProduct.images[0]}
                                    alt={selectedProduct.name}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                                    {selectedProduct.images.map((_, i) => (
                                        <div key={i} className={`w-1.5 h-1.5 rounded-full ${i === 0 ? 'bg-brand' : 'bg-white/30'}`}></div>
                                    ))}
                                </div>
                            </div>

                            {/* Details */}
                            <div className="flex-1 p-8 md:p-12 overflow-y-auto">
                                <span className="text-brand font-bold text-xs tracking-[0.2em] uppercase mb-2 block">{selectedProduct.category}</span>
                                <h2 className="text-3xl md:text-4xl font-black tracking-tighter mb-4 italic leading-none">{selectedProduct.name}</h2>
                                <p className="text-2xl font-black text-gray-400 mb-8">{formatIDR(selectedProduct.price)}</p>

                                <div className="space-y-6 mb-10">
                                    <div>
                                        <h4 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-3 italic underline decoration-brand/30 underline-offset-4">Deskripsi</h4>
                                        <p className="text-gray-400 text-sm leading-relaxed">{selectedProduct.description}</p>
                                    </div>
                                    <div>
                                        <h4 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-3 italic underline decoration-brand/30 underline-offset-4">Fitur Utama</h4>
                                        <ul className="grid grid-cols-2 gap-y-2">
                                            {selectedProduct.features.map(f => (
                                                <li key={f} className="text-xs text-gray-300 flex items-center gap-2 font-medium">
                                                    <div className="w-1 h-1 bg-brand rounded-full"></div> {f}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <button
                                        onClick={() => { handleAddToCart(selectedProduct); setSelectedProduct(null); }}
                                        className="flex-1 btn-primary py-4 flex items-center justify-center gap-2"
                                    >
                                        TAMBAH KE KERANJANG <LucideIcon name="shopping-cart" className="w-5 h-5" />
                                    </button>
                                    <button className="btn-outline w-14 p-0 flex items-center justify-center">
                                        <LucideIcon name="heart" className="w-5 h-5" />
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

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
