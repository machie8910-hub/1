const { useState, useEffect, useMemo, useRef } = React;
const { motion, AnimatePresence } = window.Motion || {
    motion: {
        div: (props) => <div {...props}>{props.children}</div>,
        button: (props) => <button {...props}>{props.children}</button>,
        nav: (props) => <nav {...props}>{props.children}</nav>,
        span: (props) => <span {...props}>{props.children}</span>,
        h2: (props) => <h2 {...props}>{props.children}</h2>,
        h3: (props) => <h3 {...props}>{props.children}</h3>,
        p: (props) => <p {...props}>{props.children}</p>,
        img: (props) => <img {...props} />
    },
    AnimatePresence: ({children}) => children
};

// --- CONFIG ---
const CONFIG = {
    WHATSAPP_NUMBER: "6288973262022",
    BRAND_NAME: "TKTM",
    CURRENCY: "Rp"
};

const INITIAL_PRODUCTS = [
    {
        id: 1,
        name: "Cyberpunk Oni Mask",
        price: 450000,
        category: "Aksesoris",
        images: [
            "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=800&q=80",
            "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&q=80"
        ],
        description: "Masker Oni dengan desain futuristik cyberpunk. Terbuat dari material berkualitas tinggi dengan finishing matte.",
        stats: { material: "ABS Grade A", weight: "250g", finish: "Matte Black" }
    },
    {
        id: 2,
        name: "Noir Techwear Hoodie",
        price: 750000,
        category: "Pakaian",
        images: [
            "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&q=80",
            "https://images.unsplash.com/photo-1578681994506-b8f463449011?w=800&q=80"
        ],
        description: "Hoodie techwear minimalis dengan banyak saku fungsional. Tahan air dan sangat nyaman digunakan.",
        stats: { material: "Gore-Tex", size: "Over-sized", tech: "Waterproof" }
    },
    {
        id: 3,
        name: "Katana Shift Keycap",
        price: 150000,
        category: "Gaming",
        images: [
            "https://images.unsplash.com/photo-1618384881928-142379374029?w=800&q=80",
            "https://images.unsplash.com/photo-1595225405013-9897380d66d0?w=800&q=80"
        ],
        description: "Keycap custom bertema katana untuk keyboard mekanikal Anda. Detail presisi dan estetik.",
        stats: { profile: "OEM", material: "Resin", fit: "MX Switches" }
    },
    {
        id: 4,
        name: "Neon Street Poster",
        price: 85000,
        category: "Dekorasi",
        images: [
            "https://images.unsplash.com/photo-1563089145-599997674d42?w=800&q=80",
            "https://images.unsplash.com/photo-1493238792000-8113da705763?w=800&q=80"
        ],
        description: "Poster kualitas tinggi dengan cetakan neon yang vibran. Memberikan suasana cinematic pada ruangan Anda.",
        stats: { size: "A2", paper: "Art Paper 260g", finish: "Laminasi Doff" }
    },
    {
        id: 5,
        name: "Minimalist Desk Pad",
        price: 125000,
        category: "Gaming",
        images: [
            "https://images.unsplash.com/photo-1616440347437-b1c73416efc2?w=800&q=80",
            "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&q=80"
        ],
        description: "Mousepad besar minimalis dengan permukaan halus untuk kontrol presisi.",
        stats: { size: "90x40cm", material: "Jacquard Fabric", base: "Rubber Anti-slip" }
    },
    {
        id: 6,
        name: "Industrial Cargo Pants",
        price: 550000,
        category: "Pakaian",
        images: [
            "https://images.unsplash.com/photo-1624282531313-7187498b21d5?w=800&q=80",
            "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=800&q=80"
        ],
        description: "Celana cargo bergaya industrial dengan banyak strap dan saku fungsional.",
        stats: { style: "Jogger", material: "Canvas Drill", strap: "Nylon" }
    }
];

// --- COMPONENTS ---

const LucideIcon = ({ name, className = "w-6 h-6", strokeWidth = 2 }) => {
    useEffect(() => {
        if (window.lucide) {
            window.lucide.createIcons();
        }
    }, [name, className, strokeWidth]);

    return <i data-lucide={name} className={className} style={{ strokeWidth }}></i>;
};

const Toast = ({ message, onClose }) => (
    <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] bg-white text-[#0a0a0a] px-6 py-3 rounded-full shadow-2xl font-bold flex items-center gap-3 border-2 border-accent"
    >
        <LucideIcon name="check-circle-2" className="w-5 h-5 text-accent" />
        {message}
    </motion.div>
);

const App = () => {
    const [cart, setCart] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("Semua");
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [toasts, setToasts] = useState([]);
    const [activeImageIndex, setActiveImageIndex] = useState(0);

    const categories = ["Semua", ...new Set(INITIAL_PRODUCTS.map(p => p.category))];

    const filteredProducts = INITIAL_PRODUCTS.filter(p => {
        const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                             p.category.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === "Semua" || p.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    const addToast = (message) => {
        const id = Date.now();
        setToasts(prev => [...prev, { id, message }]);
        setTimeout(() => {
            setToasts(prev => prev.filter(t => t.id !== id));
        }, 3000);
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

    const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    const formatPrice = (price) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(price);
    };

    const handleCheckout = () => {
        if (cart.length === 0) return;

        const message = `Halo ${CONFIG.BRAND_NAME}, saya ingin memesan:\n\n` +
            cart.map(item => `- ${item.name} (${item.quantity}x) - ${formatPrice(item.price * item.quantity)}`).join('\n') +
            `\n\nTotal: ${formatPrice(cartTotal)}\n\nTerima kasih!`;

        const encodedMessage = encodeURIComponent(message);
        window.open(`https://wa.me/${CONFIG.WHATSAPP_NUMBER}?text=${encodedMessage}`, '_blank');

        addToast("Pembelian berhasil!");
        setCart([]);
        setIsCartOpen(false);
    };

    const handleBuyNow = (product) => {
        const message = `Halo ${CONFIG.BRAND_NAME}, saya ingin membeli ${product.name} seharga ${formatPrice(product.price)}.\n\nTerima kasih!`;
        const encodedMessage = encodeURIComponent(message);
        window.open(`https://wa.me/${CONFIG.WHATSAPP_NUMBER}?text=${encodedMessage}`, '_blank');
    };

    return (
        <div className="min-h-screen bg-brand font-sans selection:bg-accent selection:text-white overflow-x-hidden">
            {/* Navbar */}
            <nav className="fixed top-0 left-0 right-0 z-50 glass-panel border-b border-white/5 px-6 py-4">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-8">
                        <a href="#" className="text-2xl font-black tracking-tighter text-accent flex items-center gap-2">
                            <span className="bg-accent text-white px-2 py-0.5 rounded">TK</span>
                            <span>TM</span>
                        </a>
                        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-400">
                            {categories.map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => setSelectedCategory(cat)}
                                    className={`hover:text-white transition-colors ${selectedCategory === cat ? 'text-accent font-bold' : ''}`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="relative hidden sm:block">
                            <input
                                type="text"
                                placeholder="Cari produk..."
                                aria-label="Cari produk"
                                className="bg-white/5 border border-white/10 rounded-full py-1.5 pl-10 pr-4 text-sm focus:outline-none focus:border-accent w-48 lg:w-64 transition-all"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <LucideIcon name="search" className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                        </div>

                        <button
                            className="relative p-2 hover:bg-white/5 rounded-full transition-colors"
                            onClick={() => setIsCartOpen(true)}
                            aria-label="Keranjang Belanja"
                        >
                            <LucideIcon name="shopping-cart" />
                            {cart.length > 0 && (
                                <span className="absolute top-0 right-0 bg-accent text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full animate-in fade-in zoom-in">
                                    {cart.reduce((s, i) => s + i.quantity, 0)}
                                </span>
                            )}
                        </button>

                        <button
                            className="md:hidden p-2"
                            onClick={() => setIsMenuOpen(true)}
                            aria-label="Menu"
                        >
                            <LucideIcon name="menu" />
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu Drawer */}
            <AnimatePresence>
                {isMenuOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsMenuOpen(false)}
                            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[60]"
                        />
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="fixed top-0 right-0 h-full w-3/4 max-w-sm glass-panel z-[70] p-8"
                        >
                            <div className="flex justify-between items-center mb-8">
                                <h2 className="text-xl font-bold">Kategori</h2>
                                <button onClick={() => setIsMenuOpen(false)} aria-label="Tutup Menu">
                                    <LucideIcon name="x" />
                                </button>
                            </div>
                            <div className="flex flex-col gap-4">
                                {categories.map(cat => (
                                    <button
                                        key={cat}
                                        onClick={() => { setSelectedCategory(cat); setIsMenuOpen(false); }}
                                        className={`text-left text-lg py-2 border-b border-white/5 ${selectedCategory === cat ? 'text-accent font-bold' : 'text-gray-400'}`}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            {/* Hero Section */}
            <section id="hero" className="pt-32 pb-20 px-6 overflow-hidden">
                <div className="max-w-7xl mx-auto relative">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center"
                    >
                        <h1 className="text-5xl md:text-8xl font-black tracking-tighter mb-6 bg-gradient-to-b from-white to-white/40 bg-clip-text text-transparent">
                            FUTURE <span className="text-accent">AESTHETICS</span>
                        </h1>
                        <p className="max-w-2xl mx-auto text-gray-400 text-lg mb-10">
                            Koleksi eksklusif techwear dan aksesoris cyberpunk untuk jiwa-jiwa masa depan yang tak kenal takut.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <button className="btn-primary flex items-center gap-2 group">
                                Jelajahi Koleksi
                                <LucideIcon name="arrow-right" className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </button>
                            <button className="bg-white/5 hover:bg-white/10 px-8 py-2 rounded-full border border-white/10 transition-all">
                                Tentang Kami
                            </button>
                        </div>
                    </motion.div>

                    {/* Decorative Elements */}
                    <div className="absolute -top-24 -left-24 w-96 h-96 bg-accent/20 blur-[120px] rounded-full -z-10" />
                    <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-accent/10 blur-[120px] rounded-full -z-10" />
                </div>
            </section>

            {/* Product Grid */}
            <section id="koleksi" className="py-20 px-6 bg-white/[0.02]">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                        <div>
                            <h2 className="text-3xl font-bold mb-2">Koleksi Terbaru</h2>
                            <div className="w-20 h-1.5 bg-accent rounded-full" />
                        </div>
                        <div className="flex items-center gap-4 overflow-x-auto pb-2 no-scrollbar">
                            {categories.map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => setSelectedCategory(cat)}
                                    className={`whitespace-nowrap px-4 py-1.5 rounded-full text-sm font-medium border transition-all ${
                                        selectedCategory === cat
                                        ? 'bg-accent border-accent text-white'
                                        : 'border-white/10 text-gray-400 hover:border-white/30'
                                    }`}
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
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                className="group relative glass-panel rounded-3xl overflow-hidden border-white/5 hover:border-accent/50 transition-all duration-500"
                            >
                                <div
                                    className="aspect-[4/5] overflow-hidden cursor-pointer relative"
                                    onClick={() => { setSelectedProduct(product); setActiveImageIndex(0); }}
                                >
                                    <img
                                        src={product.images[0]}
                                        alt={product.name}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-brand to-transparent opacity-60" />
                                    <div className="absolute top-4 left-4">
                                        <span className="bg-accent/90 text-white text-[10px] font-black tracking-widest uppercase px-3 py-1 rounded-full backdrop-blur-md">
                                            {product.category}
                                        </span>
                                    </div>
                                </div>

                                <div className="p-6 relative">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="text-xl font-bold group-hover:text-accent transition-colors">
                                            {product.name}
                                        </h3>
                                        <button className="text-gray-500 hover:text-accent transition-colors" aria-label="Simpan">
                                            <LucideIcon name="heart" className="w-5 h-5" />
                                        </button>
                                    </div>
                                    <p className="text-accent text-lg font-black mb-6">
                                        {formatPrice(product.price)}
                                    </p>
                                    <div className="grid grid-cols-2 gap-3">
                                        <button
                                            onClick={() => addToCart(product)}
                                            className="flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 text-white text-sm font-bold py-3 rounded-2xl border border-white/10 transition-all"
                                            aria-label="Tambah ke keranjang"
                                        >
                                            <LucideIcon name="plus" className="w-4 h-4" />
                                            Cart
                                        </button>
                                        <button
                                            onClick={() => handleBuyNow(product)}
                                            className="flex items-center justify-center gap-2 bg-accent hover:bg-accent/90 text-white text-sm font-bold py-3 rounded-2xl transition-all"
                                            aria-label="Beli Sekarang"
                                        >
                                            Beli
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {filteredProducts.length === 0 && (
                        <div className="text-center py-20">
                            <LucideIcon name="search-x" className="w-16 h-16 text-gray-700 mx-auto mb-4" />
                            <h3 className="text-xl font-bold text-gray-500">Produk tidak ditemukan</h3>
                            <p className="text-gray-600">Coba kata kunci lain atau pilih kategori yang berbeda.</p>
                        </div>
                    )}
                </div>
            </section>

            {/* Product Modal */}
            <AnimatePresence>
                {selectedProduct && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 lg:p-10">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedProduct(null)}
                            className="absolute inset-0 bg-brand/90 backdrop-blur-xl"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="relative w-full max-w-6xl glass-panel rounded-[2.5rem] overflow-hidden flex flex-col lg:flex-row h-full lg:h-auto max-h-[90vh] shadow-[0_0_100px_rgba(225,29,72,0.1)] border-white/10"
                        >
                            <button
                                onClick={() => setSelectedProduct(null)}
                                className="absolute top-6 right-6 z-10 p-2 bg-brand/50 hover:bg-accent rounded-full transition-all border border-white/10"
                                aria-label="Tutup"
                            >
                                <LucideIcon name="x" className="w-6 h-6" />
                            </button>

                            {/* Gallery */}
                            <div className="lg:w-1/2 relative bg-black/20 flex flex-col">
                                <div className="flex-1 overflow-hidden relative">
                                    <AnimatePresence mode="wait">
                                        <motion.img
                                            key={activeImageIndex}
                                            src={selectedProduct.images[activeImageIndex]}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            className="w-full h-full object-cover"
                                            alt={selectedProduct.name}
                                        />
                                    </AnimatePresence>
                                </div>
                                <div className="p-6 flex justify-center gap-3 bg-brand/40 backdrop-blur-sm">
                                    {selectedProduct.images.map((img, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => setActiveImageIndex(idx)}
                                            className={`w-20 aspect-square rounded-xl overflow-hidden border-2 transition-all ${activeImageIndex === idx ? 'border-accent scale-105' : 'border-transparent opacity-50'}`}
                                            aria-label={`Lihat gambar ${idx + 1}`}
                                        >
                                            <img src={img} className="w-full h-full object-cover" alt="thumbnail" />
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Details */}
                            <div className="lg:w-1/2 p-8 lg:p-12 overflow-y-auto no-scrollbar flex flex-col">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-6">
                                        <span className="bg-accent/20 text-accent text-xs font-black tracking-widest uppercase px-4 py-1.5 rounded-full border border-accent/30">
                                            {selectedProduct.category}
                                        </span>
                                        <div className="flex items-center gap-1 text-yellow-500">
                                            <LucideIcon name="star" className="w-4 h-4 fill-current" />
                                            <span className="text-sm font-bold text-white">4.9</span>
                                        </div>
                                    </div>
                                    <h2 className="text-4xl md:text-5xl font-black mb-4 leading-tight">{selectedProduct.name}</h2>
                                    <p className="text-3xl font-black text-accent mb-8">{formatPrice(selectedProduct.price)}</p>

                                    <div className="space-y-6 mb-10 text-gray-400">
                                        <p className="text-lg leading-relaxed">{selectedProduct.description}</p>
                                        <div className="grid grid-cols-2 gap-4">
                                            {Object.entries(selectedProduct.stats).map(([key, value]) => (
                                                <div key={key} className="bg-white/5 p-4 rounded-2xl border border-white/5">
                                                    <p className="text-[10px] uppercase tracking-widest font-bold text-accent mb-1">{key}</p>
                                                    <p className="text-white font-medium">{value}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col sm:flex-row gap-4 mt-auto pt-6 border-t border-white/10">
                                    <button
                                        onClick={() => addToCart(selectedProduct)}
                                        className="flex-1 flex items-center justify-center gap-3 bg-white text-[#0a0a0a] hover:bg-gray-200 py-4 rounded-2xl font-black transition-all active:scale-95"
                                        aria-label="Tambahkan ke Keranjang"
                                    >
                                        <LucideIcon name="shopping-bag" className="w-5 h-5" />
                                        ADD TO CART
                                    </button>
                                    <button
                                        onClick={() => handleBuyNow(selectedProduct)}
                                        className="flex-1 flex items-center justify-center gap-3 bg-accent hover:bg-accent/90 py-4 rounded-2xl font-black transition-all active:scale-95"
                                        aria-label="Beli Sekarang Via WhatsApp"
                                    >
                                        <LucideIcon name="zap" className="w-5 h-5" />
                                        BUY NOW
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
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
                            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[110]"
                        />
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                            className="fixed top-0 right-0 h-full w-full max-w-md glass-panel border-l border-white/10 z-[120] flex flex-col"
                        >
                            <div className="p-8 border-b border-white/10 flex justify-between items-center bg-brand/50 backdrop-blur-md sticky top-0 z-10">
                                <div className="flex items-center gap-3">
                                    <LucideIcon name="shopping-cart" className="w-6 h-6 text-accent" />
                                    <h2 className="text-2xl font-black italic tracking-tight">CART</h2>
                                </div>
                                <button onClick={() => setIsCartOpen(false)} className="p-2 hover:bg-white/5 rounded-full transition-colors" aria-label="Tutup Keranjang">
                                    <LucideIcon name="x" className="w-6 h-6" />
                                </button>
                            </div>

                            <div className="flex-1 overflow-y-auto p-8 space-y-6 no-scrollbar">
                                {cart.length === 0 ? (
                                    <div className="h-full flex flex-col items-center justify-center text-center opacity-40">
                                        <LucideIcon name="shopping-bag" className="w-20 h-20 mb-6" />
                                        <h3 className="text-xl font-bold">Keranjang Kosong</h3>
                                        <p className="max-w-[200px]">Mulai belanja untuk menambahkan item ke sini.</p>
                                    </div>
                                ) : (
                                    cart.map(item => (
                                        <div key={item.id} className="flex gap-6 group">
                                            <div className="w-24 h-24 rounded-2xl overflow-hidden border border-white/5 shrink-0">
                                                <img src={item.images[0]} className="w-full h-full object-cover" alt={item.name} />
                                            </div>
                                            <div className="flex-1 py-1">
                                                <div className="flex justify-between items-start mb-1">
                                                    <h4 className="font-bold text-lg leading-tight group-hover:text-accent transition-colors">{item.name}</h4>
                                                    <button onClick={() => removeFromCart(item.id)} className="text-gray-600 hover:text-accent transition-colors" aria-label="Hapus Item">
                                                        <LucideIcon name="trash-2" className="w-4 h-4" />
                                                    </button>
                                                </div>
                                                <p className="text-accent font-black mb-4">{formatPrice(item.price)}</p>
                                                <div className="flex items-center gap-4">
                                                    <div className="flex items-center bg-white/5 rounded-lg border border-white/5 px-2">
                                                        <button
                                                            onClick={() => updateQuantity(item.id, -1)}
                                                            className="p-1.5 hover:text-accent transition-colors"
                                                            aria-label="Kurangi"
                                                        >
                                                            <LucideIcon name="minus" className="w-3 h-3" />
                                                        </button>
                                                        <span className="w-8 text-center text-sm font-bold">{item.quantity}</span>
                                                        <button
                                                            onClick={() => updateQuantity(item.id, 1)}
                                                            className="p-1.5 hover:text-accent transition-colors"
                                                            aria-label="Tambah"
                                                        >
                                                            <LucideIcon name="plus" className="w-3 h-3" />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>

                            {cart.length > 0 && (
                                <div className="p-8 bg-brand/80 backdrop-blur-xl border-t border-white/10 space-y-6">
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-400 font-medium">Subtotal</span>
                                        <span className="text-2xl font-black text-accent">{formatPrice(cartTotal)}</span>
                                    </div>
                                    <button
                                        onClick={handleCheckout}
                                        className="w-full bg-accent hover:bg-accent/90 py-5 rounded-2xl font-black tracking-widest text-lg shadow-[0_10px_30px_rgba(225,29,72,0.3)] transition-all active:scale-95 flex items-center justify-center gap-3"
                                        aria-label="Checkout via WhatsApp"
                                    >
                                        CHECKOUT VIA WA
                                        <LucideIcon name="send" className="w-5 h-5" />
                                    </button>
                                </div>
                            )}
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            {/* Footer */}
            <footer className="py-20 px-6 border-t border-white/5 bg-brand">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
                    <div className="col-span-1 md:col-span-2">
                        <a href="#" className="text-3xl font-black tracking-tighter text-accent flex items-center gap-2 mb-8">
                            <span className="bg-accent text-white px-2 py-0.5 rounded">TK</span>
                            <span>TM</span>
                        </a>
                        <p className="text-gray-400 max-w-sm mb-8 leading-relaxed">
                            Mendefinisikan ulang gaya futuristik dengan kurasi terbaik dari seluruh dunia. Temukan identitas Anda di masa depan.
                        </p>
                        <div className="flex gap-4">
                            {['instagram', 'twitter', 'facebook', 'youtube'].map(social => (
                                <button key={social} className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-accent transition-all duration-300" aria-label={social}>
                                    <LucideIcon name={social} className="w-5 h-5" />
                                </button>
                            ))}
                        </div>
                    </div>
                    <div>
                        <h4 className="text-white font-bold mb-6 tracking-widest uppercase text-xs">Navigasi</h4>
                        <ul className="space-y-4 text-gray-500 text-sm font-medium">
                            <li><a href="#hero" className="hover:text-accent transition-colors">Home</a></li>
                            <li><a href="#koleksi" className="hover:text-accent transition-colors">Koleksi</a></li>
                            <li><a href="#" className="hover:text-accent transition-colors">Terbaru</a></li>
                            <li><a href="#" className="hover:text-accent transition-colors">Kontak</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-white font-bold mb-6 tracking-widest uppercase text-xs">Dukungan</h4>
                        <ul className="space-y-4 text-gray-500 text-sm font-medium">
                            <li><a href="#" className="hover:text-accent transition-colors">Panduan Ukuran</a></li>
                            <li><a href="#" className="hover:text-accent transition-colors">Pengiriman</a></li>
                            <li><a href="#" className="hover:text-accent transition-colors">Kebijakan Privasi</a></li>
                            <li><a href="#" className="hover:text-accent transition-colors">Syarat & Ketentuan</a></li>
                        </ul>
                    </div>
                </div>
                <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-gray-600 text-[10px] font-black tracking-widest uppercase">
                    <p>© 2026 {CONFIG.BRAND_NAME} FUTURE AESTHETICS. ALL RIGHTS RESERVED.</p>
                    <div className="flex items-center gap-8">
                        <span>MADE IN NEO-TOKYO</span>
                        <span>SYSTEM STATUS: OPTIMAL</span>
                    </div>
                </div>
            </footer>

            {/* Toasts */}
            <div className="pointer-events-none">
                <AnimatePresence>
                    {toasts.map(toast => (
                        <Toast key={toast.id} message={toast.message} />
                    ))}
                </AnimatePresence>
            </div>
        </div>
    );
};

// --- RENDER ---
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);