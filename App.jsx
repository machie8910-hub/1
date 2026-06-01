const { useState, useEffect, useMemo } = React;
const { motion, AnimatePresence } = window.Motion || { motion: { div: 'div', section: 'section', nav: 'nav', h1: 'h1', p: 'p', span: 'span', button: 'button', img: 'img' }, AnimatePresence: ({children}) => children };

// --- CONFIG & DATA ---
const CONFIG = {
    BRAND_NAME: 'TKTM',
    WHATSAPP_NUMBER: '6288973262022',
    CURRENCY: 'Rp',
};

const PRODUCT_DATA = [
    {
        id: 1,
        name: "Cyberpunk Oversized Hoodie",
        price: 450000,
        category: "Outerwear",
        images: [
            "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=800",
            "https://images.unsplash.com/photo-1578681994506-b8f463449011?auto=format&fit=crop&q=80&w=800",
            "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&q=80&w=800"
        ],
        description: "Hoodie oversized dengan material fleece premium 330gsm. Menampilkan desain grafis reflektif bertema masa depan.",
        details: ["Cotton Fleece 330gsm", "Reflective Print", "Unisex Fit", "Made in Jakarta"]
    },
    {
        id: 2,
        name: "Urban Tactical Joggers",
        price: 385000,
        category: "Pants",
        images: [
            "https://images.unsplash.com/photo-1552902865-b72c031ac5ea?auto=format&fit=crop&q=80&w=800",
            "https://images.unsplash.com/photo-1584865288642-42078afe6942?auto=format&fit=crop&q=80&w=800"
        ],
        description: "Celana tactical dengan banyak saku fungsional. Material stretch yang nyaman untuk mobilitas tinggi.",
        details: ["Stretch Ripstop", "6 Functional Pockets", "Water Repellent", "Adjustable Cuff"]
    },
    {
        id: 3,
        name: "Neon Nights Graphic Tee",
        price: 185000,
        category: "T-Shirt",
        images: [
            "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&q=80&w=800",
            "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&q=80&w=800"
        ],
        description: "T-shirt katun 24s dengan sablon plastisol high-density. Grafis ikonik TKTM.",
        details: ["Cotton Combed 24s", "Plastisol Print", "Shoulder to Shoulder Tape", "Regular Fit"]
    },
    {
        id: 4,
        name: "Stealth Windbreaker",
        price: 525000,
        category: "Outerwear",
        images: [
            "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&q=80&w=800",
            "https://images.unsplash.com/photo-1544022613-e87f17a7845c?auto=format&fit=crop&q=80&w=800"
        ],
        description: "Jaket ringan tahan angin dan air. Cocok untuk pengendara motor dan aktivitas outdoor malam hari.",
        details: ["Taslan Milky", "YKK Zippers", "Inner Mesh Lining", "Packable Design"]
    }
];

// --- COMPONENTS ---

// Optimized Lucide icon rendering to prevent full DOM scans on every icon mount
let iconTimeout = null;
const scheduleIconRender = () => {
    if (iconTimeout) return;
    iconTimeout = setTimeout(() => {
        if (window.lucide) {
            window.lucide.createIcons();
        }
        iconTimeout = null;
    }, 10); // Small delay to batch multiple icon mounts
};

const LucideIcon = ({ name, size = 24, className = "" }) => {
    useEffect(() => {
        scheduleIconRender();
    }, [name]);

    return (
        <i
            data-lucide={name}
            style={{ width: size, height: size }}
            className={`inline-block shrink-0 ${className}`}
        ></i>
    );
};

const formatIDR = (price) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    }).format(price).replace('Rp', 'Rp ');
};

// --- ANIMATION VARIANTS ---
const fadeInScale = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: { duration: 0.4, ease: "easeOut" }
    },
    exit: {
        opacity: 0,
        scale: 0.95,
        transition: { duration: 0.3, ease: "easeIn" }
    }
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

// --- MAIN APP ---

const App = () => {
    const [cart, setCart] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [toasts, setToasts] = useState([]);

    const addToast = (message) => {
        const id = Date.now();
        setToasts(prev => [...prev, { id, message }]);
        setTimeout(() => {
            setToasts(prev => prev.filter(t => t.id !== id));
        }, 3000);
    };

    const addToCart = (product) => {
        setCart(prev => [...prev, product]);
        addToast(`${product.name} ditambahkan ke keranjang`);
    };

    const removeFromCart = (index) => {
        setCart(prev => prev.filter((_, i) => i !== index));
    };

    const totalPrice = useMemo(() => {
        return cart.reduce((sum, item) => sum + item.price, 0);
    }, [cart]);

    const handleCheckout = () => {
        if (cart.length === 0) return;

        const message = `Halo TKTM, saya ingin memesan:\n\n` +
            cart.map((item, index) => `${index + 1}. ${item.name} - ${formatIDR(item.price)}`).join('\n') +
            `\n\nTotal: ${formatIDR(totalPrice)}\n\nTerima kasih!`;

        const encodedMessage = encodeURIComponent(message);
        window.open(`https://wa.me/${CONFIG.WHATSAPP_NUMBER}?text=${encodedMessage}`, '_blank');

        setCart([]);
        setIsCartOpen(false);
        addToast("Pesanan dikirim! Mengalihkan ke WhatsApp...");
    };

    const buyNow = (product) => {
        const message = `Halo TKTM, saya ingin memesan ${product.name} seharga ${formatIDR(product.price)}.\n\nTerima kasih!`;
        const encodedMessage = encodeURIComponent(message);
        window.open(`https://wa.me/${CONFIG.WHATSAPP_NUMBER}?text=${encodedMessage}`, '_blank');
        addToast("Mengalihkan ke WhatsApp...");
    };

    return (
        <div className="min-h-screen">
            {/* Navbar */}
            <nav className="fixed top-0 w-full z-50 bg-brand/80 backdrop-blur-lg border-b border-white/5 px-6 py-4">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-2xl font-black text-accent tracking-tighter"
                    >
                        TKTM
                    </motion.div>
                    <div className="hidden md:flex gap-8 font-semibold text-sm uppercase tracking-widest">
                        {['koleksi', 'terbaru', 'kontak'].map((item) => (
                            <a
                                key={item}
                                href={`#${item}`}
                                className="hover:text-accent transition-colors relative group"
                            >
                                {item}
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all group-hover:w-full"></span>
                            </a>
                        ))}
                    </div>
                    <div className="flex items-center gap-4">
                         <button
                            className="relative p-2 hover:text-accent transition-colors"
                            aria-label="Keranjang"
                            onClick={() => setIsCartOpen(true)}
                        >
                            <LucideIcon name="shopping-cart" />
                            <AnimatePresence>
                                {cart.length > 0 && (
                                    <motion.span
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        exit={{ scale: 0 }}
                                        className="absolute top-0 right-0 bg-accent text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold text-white"
                                    >
                                        {cart.length}
                                    </motion.span>
                                )}
                            </AnimatePresence>
                        </button>
                        <button
                            className="md:hidden p-2 hover:text-accent transition-colors"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            aria-label="Menu"
                        >
                            <LucideIcon name={isMobileMenuOpen ? "x" : "menu"} />
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Drawer */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: '100%' }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: '100%' }}
                        className="fixed inset-0 z-40 bg-brand flex flex-col items-center justify-center gap-8 md:hidden"
                    >
                        {['koleksi', 'terbaru', 'kontak'].map((item) => (
                            <a
                                key={item}
                                href={`#${item}`}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="text-4xl font-black uppercase italic hover:text-accent transition-colors"
                            >
                                {item}
                            </a>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>

            <main className="pt-24 pb-20">
                {/* Hero Section */}
                <section id="home" className="px-6 py-20 md:py-32 flex flex-col items-center text-center overflow-hidden">
                    <motion.h1
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-6xl md:text-9xl font-black mb-6 tracking-tighter italic leading-none"
                    >
                        CINEMATIC<br />
                        <span className="text-accent">STREETWEAR</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto mb-10"
                    >
                        TKTM menghadirkan estetika dark sinematik ke dalam pakaian sehari-hari. Dirancang untuk mereka yang berani tampil beda di bawah cahaya neon kota.
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 }}
                    >
                        <a href="#koleksi" className="btn-primary text-lg px-10">LIHAT KOLEKSI</a>
                    </motion.div>
                </section>

                {/* Product Grid Section */}
                <section id="koleksi" className="px-6 max-w-7xl mx-auto py-20">
                    <div className="flex justify-between items-end mb-12">
                        <div>
                            <h2 className="text-sm uppercase tracking-[0.3em] text-accent font-bold mb-2">Signature Series</h2>
                            <p className="text-4xl font-black italic uppercase">Koleksi Terbaru</p>
                        </div>
                    </div>

                    <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
                    >
                        {PRODUCT_DATA.map((product) => (
                            <motion.div
                                key={product.id}
                                variants={fadeInScale}
                                className="group"
                            >
                                <div className="relative aspect-[3/4] overflow-hidden rounded-2xl mb-4 bg-white/5">
                                    <img
                                        src={product.images[0]}
                                        alt={product.name}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 cursor-pointer"
                                        onClick={() => setSelectedProduct(product)}
                                    />
                                    <div className="absolute top-4 left-4">
                                        <span className="bg-brand/60 backdrop-blur-md text-[10px] font-bold px-3 py-1 rounded-full border border-white/10 uppercase tracking-widest">
                                            {product.category}
                                        </span>
                                    </div>
                                    <div className="absolute bottom-4 right-4 flex gap-2 translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                                        <button
                                            className="p-3 bg-white text-brand rounded-full hover:bg-accent hover:text-white transition-colors"
                                            onClick={() => addToCart(product)}
                                            aria-label={`Tambah ${product.name} ke keranjang`}
                                        >
                                            <LucideIcon name="shopping-cart" size={20} />
                                        </button>
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <h3 className="font-bold text-lg group-hover:text-accent transition-colors cursor-pointer" onClick={() => setSelectedProduct(product)}>
                                        {product.name}
                                    </h3>
                                    <p className="text-white/60 font-semibold">{formatIDR(product.price)}</p>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </section>
            </main>

            {/* Footer */}
            <footer id="kontak" className="px-6 py-20 border-t border-white/5 bg-brand">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
                    <div className="space-y-6">
                        <div className="text-3xl font-black text-accent italic">TKTM</div>
                        <p className="text-white/40 max-w-xs">Estetika sinematik untuk gaya hidup urban. Kualitas premium, desain visioner.</p>
                        <div className="flex gap-4">
                            {['instagram', 'twitter', 'facebook'].map(social => (
                                <a key={social} href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-accent transition-colors">
                                    <LucideIcon name={social} size={18} />
                                </a>
                            ))}
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-8 md:col-span-2">
                        <div className="space-y-4">
                            <h4 className="font-bold uppercase tracking-widest text-sm">Navigasi</h4>
                            <ul className="space-y-2 text-white/40 text-sm">
                                <li><a href="#home" className="hover:text-accent">Home</a></li>
                                <li><a href="#koleksi" className="hover:text-accent">Koleksi</a></li>
                                <li><a href="#terbaru" className="hover:text-accent">Terbaru</a></li>
                            </ul>
                        </div>
                        <div className="space-y-4">
                            <h4 className="font-bold uppercase tracking-widest text-sm">Bantuan</h4>
                            <ul className="space-y-2 text-white/40 text-sm">
                                <li><a href="#" className="hover:text-accent">FAQ</a></li>
                                <li><a href="#" className="hover:text-accent">Pengiriman</a></li>
                                <li><a href="#" className="hover:text-accent">Size Guide</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-white/5 text-center text-white/20 text-xs">
                    © 2026 {CONFIG.BRAND_NAME} STUDIO. ALL RIGHTS RESERVED.
                </div>
            </footer>

            {/* Product Modal */}
            <AnimatePresence>
                {selectedProduct && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[60] flex items-center justify-center p-4 md:p-6"
                    >
                        <div className="absolute inset-0 bg-brand/90 backdrop-blur-xl" onClick={() => setSelectedProduct(null)}></div>
                        <motion.div
                            variants={fadeInScale}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            className="relative w-full max-w-5xl glass-panel overflow-hidden flex flex-col md:flex-row max-h-[90vh]"
                        >
                            <button
                                className="absolute top-4 right-4 z-10 p-2 bg-brand/50 rounded-full hover:bg-accent transition-colors"
                                onClick={() => setSelectedProduct(null)}
                                aria-label="Tutup"
                            >
                                <LucideIcon name="x" />
                            </button>

                            <div className="w-full md:w-1/2 bg-black flex flex-col">
                                <div className="flex-1 overflow-hidden">
                                    <ProductGallery images={selectedProduct.images} />
                                </div>
                            </div>

                            <div className="w-full md:w-1/2 p-8 md:p-12 overflow-y-auto space-y-8">
                                <div>
                                    <span className="text-accent font-bold uppercase tracking-widest text-xs">{selectedProduct.category}</span>
                                    <h2 className="text-4xl font-black italic uppercase mt-2">{selectedProduct.name}</h2>
                                    <p className="text-2xl text-white/60 font-semibold mt-2">{formatIDR(selectedProduct.price)}</p>
                                </div>

                                <p className="text-white/60 leading-relaxed">{selectedProduct.description}</p>

                                <div className="space-y-4">
                                    <h4 className="font-bold uppercase tracking-wider text-sm">Spesifikasi:</h4>
                                    <ul className="grid grid-cols-1 gap-2">
                                        {selectedProduct.details.map((detail, i) => (
                                            <li key={i} className="flex items-center gap-3 text-white/40 text-sm">
                                                <span className="w-1.5 h-1.5 bg-accent rounded-full"></span>
                                                {detail}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                                    <button
                                        className="btn-primary flex-1"
                                        onClick={() => buyNow(selectedProduct)}
                                    >
                                        BELI SEKARANG
                                    </button>
                                    <button
                                        className="btn-outline flex-1"
                                        onClick={() => {
                                            addToCart(selectedProduct);
                                            setSelectedProduct(null);
                                        }}
                                    >
                                        <LucideIcon name="shopping-cart" size={18} />
                                        TAMBAH KE KERANJANG
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Cart Overlay */}
            <AnimatePresence>
                {isCartOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[70]"
                    >
                        <div className="absolute inset-0 bg-brand/60 backdrop-blur-sm" onClick={() => setIsCartOpen(false)}></div>
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="absolute right-0 top-0 bottom-0 w-full max-w-md bg-brand border-l border-white/5 flex flex-col"
                        >
                            <div className="p-6 border-b border-white/5 flex justify-between items-center">
                                <h2 className="text-xl font-black italic uppercase tracking-wider">Keranjang ({cart.length})</h2>
                                <button
                                    onClick={() => setIsCartOpen(false)}
                                    className="p-2 hover:text-accent"
                                    aria-label="Tutup"
                                >
                                    <LucideIcon name="x" />
                                </button>
                            </div>

                            <div className="flex-1 overflow-y-auto p-6 space-y-6">
                                {cart.length === 0 ? (
                                    <div className="h-full flex flex-col items-center justify-center text-white/20 space-y-4">
                                        <LucideIcon name="shopping-bag" size={64} />
                                        <p className="font-bold uppercase tracking-widest">Keranjang Kosong</p>
                                    </div>
                                ) : (
                                    cart.map((item, index) => (
                                        <div key={index} className="flex gap-4 group">
                                            <div className="w-20 h-24 bg-white/5 rounded-lg overflow-hidden shrink-0">
                                                <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover" />
                                            </div>
                                            <div className="flex-1 min-w-0 py-1">
                                                <h3 className="font-bold text-sm truncate uppercase tracking-tight">{item.name}</h3>
                                                <p className="text-white/40 text-xs mt-1">{formatIDR(item.price)}</p>
                                                <button
                                                    onClick={() => removeFromCart(index)}
                                                    className="text-[10px] text-accent font-bold uppercase mt-2 opacity-0 group-hover:opacity-100 transition-opacity"
                                                >
                                                    Hapus
                                                </button>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>

                            {cart.length > 0 && (
                                <div className="p-6 border-t border-white/5 space-y-4 bg-white/5">
                                    <div className="flex justify-between items-center font-bold">
                                        <span className="text-white/40 uppercase tracking-widest text-xs">Total</span>
                                        <span className="text-xl">{formatIDR(totalPrice)}</span>
                                    </div>
                                    <button
                                        className="btn-primary w-full py-4 text-sm tracking-[0.2em]"
                                        onClick={handleCheckout}
                                    >
                                        CHECKOUT VIA WHATSAPP
                                    </button>
                                </div>
                            )}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Toast System */}
            <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] flex flex-col gap-2 w-full max-w-xs pointer-events-none px-4">
                <AnimatePresence>
                    {toasts.map(toast => (
                        <motion.div
                            key={toast.id}
                            initial={{ opacity: 0, y: 20, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="bg-white text-[#0a0a0a] px-6 py-3 rounded-full font-bold text-sm shadow-2xl flex items-center justify-center text-center"
                        >
                            {toast.message}
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </div>
    );
};

// --- SUB-COMPONENTS ---

const ProductGallery = ({ images }) => {
    const [activeIdx, setActiveIdx] = useState(0);

    return (
        <div className="h-full flex flex-col">
            <div className="flex-1 relative overflow-hidden">
                <AnimatePresence mode="wait">
                    <motion.img
                        key={activeIdx}
                        src={images[activeIdx]}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                </AnimatePresence>
            </div>
            <div className="p-4 flex gap-2 overflow-x-auto bg-black/50 backdrop-blur-md">
                {images.map((img, i) => (
                    <button
                        key={i}
                        onClick={() => setActiveIdx(i)}
                        className={`w-16 h-20 rounded-md overflow-hidden border-2 transition-all shrink-0 ${activeIdx === i ? 'border-accent scale-105' : 'border-transparent opacity-50'}`}
                    >
                        <img src={img} className="w-full h-full object-cover" />
                    </button>
                ))}
            </div>
        </div>
    );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
