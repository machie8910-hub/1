const { useState, useEffect, useMemo, useCallback } = React;
const { motion, AnimatePresence } = window.Motion || { motion: ({children}) => <div>{children}</div>, AnimatePresence: ({children}) => <>{children}</> };

// --- Constants & Config ---
const CONFIG = {
    PHONE: "6288973262022",
    BRAND_NAME: "TKTM",
    CURRENCY: "Rp"
};

// --- Components ---

const LucideIcon = ({ name, size = 24, className = "" }) => {
    const iconRef = React.useRef(null);

    useEffect(() => {
        if (window.lucide) {
            // Use a slight delay to batch icon creation if many components mount at once
            const timer = setTimeout(() => {
                window.lucide.createIcons({
                    attrs: {
                        'stroke-width': 2,
                        'size': size,
                        'class': className
                    },
                    nameAttr: 'data-lucide'
                });
            }, 0);
            return () => clearTimeout(timer);
        }
    }, [name, size, className]);

    return <i data-lucide={name} ref={iconRef} className={className} style={{ width: size, height: size }}></i>;
};

const Button = ({ children, onClick, variant = "primary", className = "", icon, ariaLabel }) => {
    const baseStyles = "inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-bold transition-all active:scale-95 disabled:opacity-50 disabled:pointer-events-none";
    const variants = {
        primary: "bg-accent text-white hover:bg-rose-700 shadow-lg shadow-rose-900/20",
        outline: "border-2 border-zinc-800 text-white hover:border-zinc-700 hover:bg-zinc-900",
        ghost: "text-zinc-400 hover:text-white hover:bg-zinc-900",
        icon: "p-2 rounded-full hover:bg-zinc-900 text-zinc-400 hover:text-white"
    };

    return (
        <button
            onClick={onClick}
            className={`${baseStyles} ${variants[variant]} ${className}`}
            aria-label={ariaLabel}
        >
            {icon && <LucideIcon name={icon} size={20} />}
            {children}
        </button>
    );
};

// --- Mock Data ---
const PRODUCTS = [
    {
        id: 1,
        name: "TKTM Stealth Hoodie",
        price: 450000,
        category: "Outerwear",
        images: [
            "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=800&auto=format&fit=crop"
        ],
        description: "Premium oversized hoodie dengan aksen minimalis. Material cotton fleece 330gsm yang tebal namun tetap adem."
    },
    {
        id: 2,
        name: "Cyber Jogger Pant",
        price: 380000,
        category: "Bottoms",
        images: [
            "https://images.unsplash.com/photo-1552902865-b72c031ac5ea?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1542272604-787c3835535d?q=80&w=800&auto=format&fit=crop"
        ],
        description: "Celana jogger cargo dengan banyak saku fungsional. Cocok untuk tampilan techwear yang futuristik."
    },
    {
        id: 3,
        name: "Noir Tech Tee",
        price: 185000,
        category: "Tops",
        images: [
            "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=800&auto=format&fit=crop"
        ],
        description: "Kaos basic dengan potongan boxy. Sablon high-density logo TKTM di bagian dada."
    },
    {
        id: 4,
        name: "TKTM Signature Cap",
        price: 125000,
        category: "Accessories",
        images: [
            "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=800&auto=format&fit=crop"
        ],
        description: "Baseball cap dengan bordir 3D logo TKTM. Adjustable strap dengan buckle metal."
    },
    {
        id: 5,
        name: "Urban Vest 'Ronin'",
        price: 520000,
        category: "Outerwear",
        images: [
            "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=800&auto=format&fit=crop"
        ],
        description: "Tactical vest dengan lapisan water-repellent. Dilengkapi dengan modular attachments."
    },
    {
        id: 6,
        name: "Cargo Short 'Drift'",
        price: 295000,
        category: "Bottoms",
        images: [
            "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1565084888279-aca607ecad0c?q=80&w=800&auto=format&fit=crop"
        ],
        description: "Celana pendek kargo untuk aktifitas outdoor harian. Material ripstop yang kuat."
    }
];

// --- Main App ---
const App = () => {
    const [cart, setCart] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [toast, setToast] = useState(null);

    // Helpers
    const formatCurrency = (val) => `${CONFIG.CURRENCY} ${val.toLocaleString('id-ID')}`;

    const addToCart = (product) => {
        setCart(prev => {
            const existing = prev.find(item => item.id === product.id);
            if (existing) {
                return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
            }
            return [...prev, { ...product, quantity: 1 }];
        });
        showToast(`"${product.name}" ditambahkan ke keranjang`);
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

    const totalCartItems = useMemo(() => cart.reduce((acc, item) => acc + item.quantity, 0), [cart]);
    const totalPrice = useMemo(() => cart.reduce((acc, item) => acc + (item.price * item.quantity), 0), [cart]);

    const showToast = (message) => {
        setToast(message);
        setTimeout(() => setToast(null), 3000);
    };

    const handleCheckout = () => {
        if (cart.length === 0) return;

        const message = `Halo TKTM, saya ingin memesan:\n\n` +
            cart.map(item => `- ${item.name} (${item.quantity}x) @ ${formatCurrency(item.price)}`).join('\n') +
            `\n\nTotal: ${formatCurrency(totalPrice)}\n\nTerima kasih!`;

        const encoded = encodeURIComponent(message);
        window.open(`https://wa.me/${CONFIG.PHONE}?text=${encoded}`, '_blank');

        // Finalize
        setCart([]);
        setIsCartOpen(false);
        showToast("Pembelian berhasil diproses!");
    };

    const filteredProducts = PRODUCTS.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="min-h-screen flex flex-col font-sans">
            {/* --- Navbar --- */}
            <nav className="sticky top-0 z-40 w-full glass-effect border-b">
                <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <button
                            className="md:hidden text-zinc-400 hover:text-white"
                            onClick={() => setIsMenuOpen(true)}
                            aria-label="Menu"
                        >
                            <LucideIcon name="menu" />
                        </button>
                        <h1 className="text-2xl font-black tracking-tighter text-accent italic">TKTM</h1>
                    </div>

                    <div className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-400">
                        <a href="#koleksi" className="hover:text-white transition-colors">Koleksi</a>
                        <a href="#terbaru" className="hover:text-white transition-colors">Terbaru</a>
                        <a href="#kontak" className="hover:text-white transition-colors">Kontak</a>
                    </div>

                    <div className="flex items-center gap-2">
                        <div className="relative hidden sm:block">
                            <input
                                type="text"
                                placeholder="Cari produk..."
                                className="bg-zinc-900 border border-zinc-800 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-accent w-48 transition-all focus:w-64"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <LucideIcon name="search" size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500" />
                        </div>
                        <button
                            className="relative p-2 text-zinc-400 hover:text-white transition-colors"
                            onClick={() => setIsCartOpen(true)}
                            aria-label="Keranjang"
                        >
                            <LucideIcon name="shopping-bag" />
                            {totalCartItems > 0 && (
                                <span className="absolute top-0 right-0 bg-accent text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-brand">
                                    {totalCartItems}
                                </span>
                            )}
                        </button>
                    </div>
                </div>
            </nav>

            {/* --- Mobile Menu --- */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ x: "-100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "-100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed inset-0 z-50 bg-brand p-6 md:hidden"
                    >
                        <div className="flex justify-between items-center mb-12">
                            <h1 className="text-2xl font-black text-accent italic">TKTM</h1>
                            <button onClick={() => setIsMenuOpen(false)} aria-label="Tutup Menu">
                                <LucideIcon name="x" />
                            </button>
                        </div>
                        <div className="flex flex-col gap-6 text-2xl font-bold">
                            <a href="#koleksi" onClick={() => setIsMenuOpen(false)}>Koleksi</a>
                            <a href="#terbaru" onClick={() => setIsMenuOpen(false)}>Terbaru</a>
                            <a href="#kontak" onClick={() => setIsMenuOpen(false)}>Kontak</a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* --- Hero --- */}
            <section className="relative h-[70vh] flex items-center justify-center overflow-hidden bg-zinc-900">
                <img
                    src="https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2000&auto=format&fit=crop"
                    className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-overlay"
                    alt="Hero background"
                />
                <div className="relative z-10 text-center px-4">
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-block text-accent font-bold tracking-widest uppercase text-sm mb-4"
                    >
                        Summer Drop 2024
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-8xl font-black tracking-tighter mb-6 uppercase"
                    >
                        Redefine <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-rose-400">Streetwear</span>
                    </motion.h2>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <Button onClick={() => document.getElementById('koleksi').scrollIntoView({ behavior: 'smooth' })}>
                            Belanja Sekarang
                        </Button>
                    </motion.div>
                </div>
            </section>

            {/* --- Product Grid --- */}
            <main id="koleksi" className="flex-grow max-w-7xl mx-auto px-4 py-20 w-full">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                    <div>
                        <h2 className="text-3xl font-black uppercase tracking-tight">Koleksi Terkini</h2>
                        <p className="text-zinc-500 mt-2">Didesain untuk kenyamanan dan gaya urban maksimal.</p>
                    </div>
                    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                        {["Semua", "Outerwear", "Tops", "Bottoms", "Accessories"].map(cat => (
                            <button
                                key={cat}
                                className="whitespace-nowrap px-6 py-2 rounded-full text-sm font-semibold border border-zinc-800 hover:border-accent transition-colors"
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredProducts.map(product => (
                        <div
                            key={product.id}
                            className="group relative flex flex-col animate-in"
                        >
                            <div
                                className="aspect-[4/5] overflow-hidden bg-zinc-900 rounded-2xl cursor-pointer"
                                onClick={() => setSelectedProduct(product)}
                            >
                                <img
                                    src={product.images[0]}
                                    alt={product.name}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                                    <Button variant="outline" className="bg-brand/80" onClick={(e) => { e.stopPropagation(); setSelectedProduct(product); }}>
                                        Detail
                                    </Button>
                                    <Button onClick={(e) => { e.stopPropagation(); addToCart(product); }} icon="shopping-cart" ariaLabel="Tambah produk ke keranjang" />
                                </div>
                            </div>
                            <div className="mt-4 flex justify-between items-start">
                                <div>
                                    <p className="text-xs text-accent font-bold uppercase tracking-wider mb-1">{product.category}</p>
                                    <h3 className="text-lg font-bold group-hover:text-accent transition-colors">{product.name}</h3>
                                    <p className="text-zinc-400 font-medium">{formatCurrency(product.price)}</p>
                                </div>
                                <Button
                                    variant="ghost"
                                    className="p-2 h-auto"
                                    icon="heart"
                                    ariaLabel="Tambah ke favorit"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </main>

            {/* --- Footer --- */}
            <footer id="kontak" className="bg-zinc-950 border-t border-zinc-900 pt-20 pb-10">
                <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12">
                    <div className="col-span-1 md:col-span-2">
                        <h2 className="text-3xl font-black text-accent italic mb-6">TKTM</h2>
                        <p className="text-zinc-500 max-w-sm mb-8 leading-relaxed">
                            Membawa estetika urban ke level berikutnya. Kualitas premium, desain visioner, dan dedikasi pada kultur streetwear.
                        </p>
                        <div className="flex gap-4">
                            {['instagram', 'twitter', 'facebook', 'youtube'].map(icon => (
                                <a key={icon} href="#" className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center text-zinc-400 hover:bg-accent hover:text-white transition-all">
                                    <LucideIcon name={icon} size={18} />
                                </a>
                            ))}
                        </div>
                    </div>
                    <div>
                        <h4 className="font-bold uppercase text-xs tracking-widest text-zinc-300 mb-6">Navigasi</h4>
                        <ul className="flex flex-col gap-4 text-zinc-500 text-sm">
                            <li><a href="#" className="hover:text-white">Tentang Kami</a></li>
                            <li><a href="#" className="hover:text-white">Koleksi Terbaru</a></li>
                            <li><a href="#" className="hover:text-white">Kolaborasi</a></li>
                            <li><a href="#" className="hover:text-white">Blog</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold uppercase text-xs tracking-widest text-zinc-300 mb-6">Bantuan</h4>
                        <ul className="flex flex-col gap-4 text-zinc-500 text-sm">
                            <li><a href="#" className="hover:text-white">FAQ</a></li>
                            <li><a href="#" className="hover:text-white">Pengiriman</a></li>
                            <li><a href="#" className="hover:text-white">Kebijakan Retur</a></li>
                            <li><a href="#" className="hover:text-white">Cek Pesanan</a></li>
                        </ul>
                    </div>
                </div>
                <div className="max-w-7xl mx-auto px-4 mt-20 pt-8 border-t border-zinc-900 flex flex-col md:flex-row justify-between items-center gap-4 text-zinc-600 text-xs">
                    <p>© 2024 TKTM Streetwear. Hak Cipta Dilindungi.</p>
                    <div className="flex gap-6">
                        <a href="#">Privacy Policy</a>
                        <a href="#">Terms of Service</a>
                    </div>
                </div>
            </footer>

            {/* --- Cart Drawer --- */}
            <AnimatePresence>
                {isCartOpen && (
                    <div className="fixed inset-0 z-50 overflow-hidden">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                            onClick={() => setIsCartOpen(false)}
                        />
                        <motion.div
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            id="cart-drawer"
                            className="absolute right-0 top-0 bottom-0 w-full max-w-md bg-brand border-l border-zinc-800 flex flex-col shadow-2xl"
                        >
                            <div className="p-6 border-b border-zinc-800 flex items-center justify-between">
                                <h2 className="text-xl font-bold flex items-center gap-2">
                                    <LucideIcon name="shopping-bag" /> Keranjang ({totalCartItems})
                                </h2>
                                <button onClick={() => setIsCartOpen(false)} className="p-2 hover:bg-zinc-900 rounded-full transition-colors" aria-label="Tutup Keranjang">
                                    <LucideIcon name="x" />
                                </button>
                            </div>

                            <div className="flex-grow overflow-y-auto p-6 custom-scrollbar">
                                {cart.length === 0 ? (
                                    <div className="h-full flex flex-col items-center justify-center text-zinc-500 gap-4">
                                        <LucideIcon name="package-open" size={48} />
                                        <p>Keranjangmu masih kosong</p>
                                        <Button variant="outline" onClick={() => setIsCartOpen(false)}>Mulai Belanja</Button>
                                    </div>
                                ) : (
                                    <div className="flex flex-col gap-6">
                                        {cart.map(item => (
                                            <div key={item.id} className="flex gap-4">
                                                <div className="w-20 h-20 bg-zinc-900 rounded-lg overflow-hidden flex-shrink-0">
                                                    <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover" />
                                                </div>
                                                <div className="flex-grow">
                                                    <div className="flex justify-between items-start">
                                                        <h4 className="font-bold text-sm">{item.name}</h4>
                                                        <button onClick={() => removeFromCart(item.id)} className="text-zinc-600 hover:text-accent">
                                                            <LucideIcon name="trash-2" size={16} />
                                                        </button>
                                                    </div>
                                                    <p className="text-zinc-500 text-sm mt-1">{formatCurrency(item.price)}</p>
                                                    <div className="flex items-center gap-3 mt-3">
                                                        <button
                                                            onClick={() => updateQuantity(item.id, -1)}
                                                            className="w-8 h-8 rounded-full border border-zinc-800 flex items-center justify-center hover:bg-zinc-900"
                                                        >
                                                            <LucideIcon name="minus" size={14} />
                                                        </button>
                                                        <span className="text-sm font-bold w-4 text-center">{item.quantity}</span>
                                                        <button
                                                            onClick={() => updateQuantity(item.id, 1)}
                                                            className="w-8 h-8 rounded-full border border-zinc-800 flex items-center justify-center hover:bg-zinc-900"
                                                        >
                                                            <LucideIcon name="plus" size={14} />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {cart.length > 0 && (
                                <div className="p-6 border-t border-zinc-800 bg-zinc-950/50">
                                    <div className="flex justify-between mb-2">
                                        <span className="text-zinc-400">Subtotal</span>
                                        <span className="font-bold">{formatCurrency(totalPrice)}</span>
                                    </div>
                                    <div className="flex justify-between mb-6">
                                        <span className="text-zinc-400">Pengiriman</span>
                                        <span className="text-emerald-500 font-medium text-sm">Gratis (Promo)</span>
                                    </div>
                                    <div className="flex justify-between mb-6 text-xl font-black border-t border-zinc-800 pt-4">
                                        <span>Total</span>
                                        <span className="text-accent">{formatCurrency(totalPrice)}</span>
                                    </div>
                                    <Button className="w-full py-4 text-lg" onClick={handleCheckout}>Checkout via WhatsApp</Button>
                                </div>
                            )}
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* --- Product Modal --- */}
            <AnimatePresence>
                {selectedProduct && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-black/80 backdrop-blur-md"
                            onClick={() => setSelectedProduct(null)}
                        />
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="relative w-full max-w-4xl bg-brand border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]"
                        >
                            <button
                                className="absolute top-4 right-4 z-10 p-2 bg-brand/50 backdrop-blur rounded-full hover:bg-zinc-900"
                                onClick={() => setSelectedProduct(null)}
                                aria-label="Tutup detail produk"
                            >
                                <LucideIcon name="x" />
                            </button>

                            <div className="md:w-1/2 bg-zinc-900 h-64 md:h-auto">
                                <ProductGallery images={selectedProduct.images} name={selectedProduct.name} />
                            </div>

                            <div className="md:w-1/2 p-8 md:p-12 overflow-y-auto custom-scrollbar">
                                <p className="text-accent font-bold uppercase tracking-widest text-sm mb-2">{selectedProduct.category}</p>
                                <h2 className="text-3xl font-black mb-4">{selectedProduct.name}</h2>
                                <p className="text-2xl font-medium text-zinc-300 mb-6">{formatCurrency(selectedProduct.price)}</p>

                                <div className="space-y-6 mb-8">
                                    <div>
                                        <h4 className="font-bold text-xs uppercase tracking-widest text-zinc-500 mb-3">Deskripsi</h4>
                                        <p className="text-zinc-400 leading-relaxed">{selectedProduct.description}</p>
                                    </div>

                                    <div>
                                        <h4 className="font-bold text-xs uppercase tracking-widest text-zinc-500 mb-3">Ukuran</h4>
                                        <div className="flex gap-2">
                                            {['S', 'M', 'L', 'XL', 'XXL'].map(size => (
                                                <button key={size} className="w-12 h-12 rounded-lg border border-zinc-800 flex items-center justify-center font-bold hover:border-accent hover:text-accent transition-colors">
                                                    {size}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex gap-4 pt-6 border-t border-zinc-900">
                                    <Button className="flex-grow py-4" onClick={() => { addToCart(selectedProduct); setSelectedProduct(null); }}>
                                        Tambah ke Keranjang
                                    </Button>
                                    <Button variant="outline" icon="heart" ariaLabel="Tambah ke favorit" />
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* --- Toast --- */}
            <AnimatePresence>
                {toast && (
                    <motion.div
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 50, opacity: 0 }}
                        className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[60] bg-white text-[#0a0a0a] px-6 py-3 rounded-full font-bold shadow-2xl flex items-center gap-3 border border-zinc-200"
                    >
                        <LucideIcon name="check-circle-2" className="text-emerald-500" />
                        {toast}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

// --- Gallery Helper ---
const ProductGallery = ({ images, name }) => {
    const [mainImage, setMainImage] = useState(images[0]);

    return (
        <div className="h-full flex flex-col">
            <div className="flex-grow overflow-hidden">
                <img src={mainImage} alt={name} className="w-full h-full object-cover" />
            </div>
            <div className="flex p-4 gap-4 bg-zinc-950/50">
                {images.map((img, idx) => (
                    <button
                        key={idx}
                        onClick={() => setMainImage(img)}
                        className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors ${mainImage === img ? 'border-accent' : 'border-transparent'}`}
                    >
                        <img src={img} alt={`${name} thumb ${idx}`} className="w-full h-full object-cover" />
                    </button>
                ))}
            </div>
        </div>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
