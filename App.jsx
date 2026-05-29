const { useState, useEffect, useMemo } = React;
const { motion, AnimatePresence } = window.Motion || { motion: { div: 'div' }, AnimatePresence: ({children}) => children };

const CONFIG = {
    brandName: 'TKTM',
    merchantPhone: '6288973262022',
    currency: 'IDR',
    products: [
        {
            id: 1,
            name: 'Kuro Overload Hoodie',
            price: 549000,
            category: 'Koleksi',
            images: [
                'https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=800&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1578681994506-b8f463449011?q=80&w=800&auto=format&fit=crop'
            ],
            description: 'Premium heavy cotton hoodie with cinematic cyberpunk aesthetics. Features oversized fit and reinforced stitching.',
            tags: ['Premium', 'Cyberpunk', 'Oversized']
        },
        {
            id: 2,
            name: 'Aka Oni Techwear Jacket',
            price: 899000,
            category: 'Terbaru',
            images: [
                'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?q=80&w=800&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1544022613-e87ce7526a60?q=80&w=800&auto=format&fit=crop'
            ],
            description: 'Water-resistant techwear jacket with crimson accents. Multiple utility pockets and adjustable straps.',
            tags: ['Techwear', 'Waterproof', 'New Drop']
        },
        {
            id: 3,
            name: 'Void Minimalist Tee',
            price: 249000,
            category: 'Koleksi',
            images: [
                'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=800&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=800&auto=format&fit=crop'
            ],
            description: 'Essential high-quality tee with a subtle TKTM chest embroidery. Perfect for everyday cinematic layering.',
            tags: ['Minimalist', 'Cotton', 'Essential']
        },
        {
            id: 4,
            name: 'Cyber Jogger V1',
            price: 429000,
            category: 'Koleksi',
            images: [
                'https://images.unsplash.com/photo-1552346154-21d32810aba3?q=80&w=800&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=800&auto=format&fit=crop'
            ],
            description: 'Tapered joggers with functional cargo pockets and elastic cuffs. Durable material for urban exploration.',
            tags: ['Urban', 'Cargo', 'Tapered']
        },
        {
            id: 5,
            name: 'Neon District Beanie',
            price: 159000,
            category: 'Terbaru',
            images: [
                'https://images.unsplash.com/photo-1576822441718-417abb931bc1?q=80&w=800&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1605348532760-6753d2c43329?q=80&w=800&auto=format&fit=crop'
            ],
            description: 'Soft knit beanie with reflective TKTM tag. Keeps you warm in the cold night city streets.',
            tags: ['Accessory', 'Reflective', 'Warm']
        },
        {
            id: 6,
            name: 'Shogun Cargo Shorts',
            price: 379000,
            category: 'Koleksi',
            images: [
                'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?q=80&w=800&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1565041719182-875f67b2c040?q=80&w=800&auto=format&fit=crop'
            ],
            description: 'Relaxed fit cargo shorts with modular pocket system. Tactical look for summer vibes.',
            tags: ['Tactical', 'Summer', 'Utility']
        }
    ]
};

// Helper: Format Price
const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    }).format(price);
};

// Sub-component: LucideIcon
const LucideIcon = ({ name, className = "w-5 h-5", size, color, strokeWidth }) => {
    const iconRef = React.useRef(null);

    useEffect(() => {
        if (window.lucide) {
            window.lucide.createIcons();
        }
    }, [name]);

    return (
        <i
            data-lucide={name}
            className={className}
            style={{
                width: size,
                height: size,
                color: color,
                strokeWidth: strokeWidth
            }}
        ></i>
    );
};

const App = () => {
    const [cart, setCart] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [toasts, setToasts] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState('Semua');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Toast logic
    const addToast = (message, type = 'success') => {
        const id = Date.now();
        setToasts(prev => [...prev, { id, message, type }]);
        setTimeout(() => {
            setToasts(prev => prev.filter(t => t.id !== id));
        }, 3000);
    };

    // Cart logic
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

    const clearCart = () => setCart([]);

    const cartTotal = useMemo(() => {
        return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    }, [cart]);

    const cartCount = useMemo(() => {
        return cart.reduce((sum, item) => sum + item.quantity, 0);
    }, [cart]);

    // Filtering logic
    const filteredProducts = useMemo(() => {
        return CONFIG.products.filter(p => {
            const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                 p.description.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesCategory = activeCategory === 'Semua' || p.category === activeCategory;
            return matchesSearch && matchesCategory;
        });
    }, [searchQuery, activeCategory]);

    // Checkout Logic
    const handleCheckout = () => {
        if (cart.length === 0) return;

        const message = `Halo TKTM, saya ingin memesan:\n\n` +
            cart.map(item => `- ${item.name} (x${item.quantity}) - ${formatPrice(item.price * item.quantity)}`).join('\n') +
            `\n\nTotal: ${formatPrice(cartTotal)}\n\nTerima kasih!`;

        const encodedMessage = encodeURIComponent(message);
        window.open(`https://wa.me/${CONFIG.merchantPhone}?text=${encodedMessage}`, '_blank');

        addToast('Pembelian berhasil! Dialihkan ke WhatsApp...');
        clearCart();
        setIsCartOpen(false);
    };

    const handleQuickBuy = (product) => {
        const message = `Halo TKTM, saya ingin membeli ${product.name} seharga ${formatPrice(product.price)}.\n\nTerima kasih!`;
        const encodedMessage = encodeURIComponent(message);
        window.open(`https://wa.me/${CONFIG.merchantPhone}?text=${encodedMessage}`, '_blank');
        addToast('Pembelian berhasil! Dialihkan ke WhatsApp...');
    };

    return (
        <div className="min-h-screen flex flex-col">
            {/* Navbar */}
            <nav className="fixed top-0 left-0 right-0 z-50 glass h-20 flex items-center">
                <div className="container mx-auto px-6 flex justify-between items-center">
                    <div className="flex items-center gap-8">
                        <a href="#" className="text-3xl font-extrabold tracking-tighter text-accent italic">TKTM</a>
                        <div className="hidden md:flex gap-6">
                            {['Semua', 'Koleksi', 'Terbaru'].map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => setActiveCategory(cat)}
                                    className={`text-sm font-semibold uppercase tracking-widest transition-colors hover:text-accent ${activeCategory === cat ? 'text-accent' : 'text-neutral-400'}`}
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
                                placeholder="Cari..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                aria-label="Cari produk"
                                className="bg-neutral-800/50 border border-white/10 rounded-full py-2 px-10 text-sm focus:outline-none focus:border-accent w-48 transition-all"
                            />
                            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500">
                                <LucideIcon name="search" size={16} />
                            </div>
                        </div>

                        <button
                            onClick={() => setIsCartOpen(true)}
                            aria-label="Keranjang belanja"
                            className="relative p-2 hover:bg-white/5 rounded-full transition-colors"
                        >
                            <LucideIcon name="shopping-cart" />
                            {cartCount > 0 && (
                                <span className="absolute -top-1 -right-1 bg-accent text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full">
                                    {cartCount}
                                </span>
                            )}
                        </button>

                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            aria-label="Menu navigasi"
                            className="md:hidden p-2 hover:bg-white/5 rounded-full transition-colors"
                        >
                            <LucideIcon name={isMobileMenuOpen ? 'x' : 'menu'} />
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Drawer */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: 300 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 300 }}
                        className="fixed inset-y-0 right-0 w-64 glass z-[60] p-10 flex flex-col gap-8"
                    >
                        <button onClick={() => setIsMobileMenuOpen(false)} className="self-end p-2">
                            <LucideIcon name="x" />
                        </button>
                        <div className="flex flex-col gap-6">
                            {['Semua', 'Koleksi', 'Terbaru'].map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => { setActiveCategory(cat); setIsMobileMenuOpen(false); }}
                                    className={`text-xl font-bold uppercase text-left ${activeCategory === cat ? 'text-accent' : 'text-neutral-400'}`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                        <div className="mt-auto">
                            <p className="text-xs text-neutral-500 uppercase tracking-widest mb-4">Socials</p>
                            <div className="flex gap-4">
                                <LucideIcon name="instagram" className="w-6 h-6 text-neutral-400" />
                                <LucideIcon name="twitter" className="w-6 h-6 text-neutral-400" />
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Hero */}
            <header className="relative h-screen flex items-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1555680202-c86f0e12f086?q=80&w=2000&auto=format&fit=crop"
                        alt="Hero background"
                        className="w-full h-full object-cover opacity-40 scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-brand/20 via-brand/60 to-brand"></div>
                </div>

                <div className="container mx-auto px-6 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="max-w-3xl"
                    >
                        <span className="inline-block px-4 py-1.5 bg-accent/20 border border-accent/30 rounded-full text-accent text-xs font-bold uppercase tracking-widest mb-6">
                            New Collection 2024
                        </span>
                        <h1 className="text-6xl md:text-8xl font-black italic tracking-tighter leading-none mb-6">
                            CINEMATIC <br /> <span className="text-accent">STREETWEAR</span>
                        </h1>
                        <p className="text-lg md:text-xl text-neutral-400 mb-10 max-w-xl font-light">
                            Crafted for the shadows. TKTM brings cinematic aesthetics to the street. Engineered for the bold and the restless.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <button
                                onClick={() => document.getElementById('shop').scrollIntoView({ behavior: 'smooth' })}
                                className="bg-accent hover:bg-accent/90 text-white px-8 py-4 rounded-none font-bold uppercase tracking-widest transition-all hover:translate-y-[-4px]"
                            >
                                Shop Now
                            </button>
                            <button className="border border-white/20 hover:border-white text-white px-8 py-4 rounded-none font-bold uppercase tracking-widest transition-all glass">
                                Our Story
                            </button>
                        </div>
                    </motion.div>
                </div>

                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-30">
                    <LucideIcon name="chevron-down" size={32} />
                </div>
            </header>

            {/* Shop Section */}
            <main id="shop" className="flex-grow bg-brand py-20">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                        <div>
                            <h2 className="text-4xl font-black italic tracking-tighter mb-2 uppercase">The Collection</h2>
                            <p className="text-neutral-500 font-medium">Menampilkan {filteredProducts.length} produk pilihan</p>
                        </div>
                        <div className="flex gap-2">
                            {['Semua', 'Koleksi', 'Terbaru'].map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => setActiveCategory(cat)}
                                    className={`px-6 py-2 text-xs font-bold uppercase tracking-widest transition-all ${activeCategory === cat ? 'bg-white text-black' : 'bg-neutral-900 text-white hover:bg-neutral-800 border border-white/5'}`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>

                    {filteredProducts.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filteredProducts.map(product => (
                                <motion.div
                                    layout
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    key={product.id}
                                    className="group relative"
                                >
                                    <div className="aspect-[3/4] overflow-hidden bg-neutral-900 relative">
                                        <img
                                            src={product.images[0]}
                                            alt={product.name}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-6 gap-3">
                                            <button
                                                onClick={() => setSelectedProduct(product)}
                                                className="w-full bg-white text-black py-3 text-xs font-bold uppercase tracking-widest hover:bg-neutral-200 transition-colors"
                                            >
                                                Quick View
                                            </button>
                                            <button
                                                onClick={() => addToCart(product)}
                                                className="w-full bg-accent text-white py-3 text-xs font-bold uppercase tracking-widest hover:bg-accent/90 transition-colors"
                                            >
                                                Add To Cart
                                            </button>
                                        </div>
                                        {product.category === 'Terbaru' && (
                                            <div className="absolute top-4 left-4 bg-accent text-white text-[10px] font-black px-3 py-1 uppercase tracking-tighter">
                                                New Drop
                                            </div>
                                        )}
                                    </div>
                                    <div className="mt-4 flex justify-between items-start">
                                        <div>
                                            <h3 className="font-bold text-lg leading-tight group-hover:text-accent transition-colors">{product.name}</h3>
                                            <p className="text-neutral-500 text-sm mt-1">{product.category}</p>
                                        </div>
                                        <p className="font-bold text-accent">{formatPrice(product.price)}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-40 border border-white/5 glass">
                            <LucideIcon name="package-search" size={48} className="mx-auto mb-4 text-neutral-700" />
                            <h3 className="text-xl font-bold mb-2 uppercase">Produk tidak ditemukan</h3>
                            <p className="text-neutral-500">Coba kata kunci lain atau pilih kategori berbeda.</p>
                        </div>
                    )}
                </div>
            </main>

            {/* Product Modal */}
            <AnimatePresence>
                {selectedProduct && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedProduct(null)}
                            className="absolute inset-0 bg-brand/90 backdrop-blur-sm"
                        ></motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="relative w-full max-w-5xl glass max-h-[90vh] overflow-hidden flex flex-col md:flex-row"
                        >
                            <button
                                onClick={() => setSelectedProduct(null)}
                                className="absolute top-4 right-4 z-10 p-2 hover:bg-white/10 rounded-full transition-colors"
                            >
                                <LucideIcon name="x" />
                            </button>

                            <div className="w-full md:w-1/2 h-80 md:h-auto overflow-hidden bg-neutral-900 group">
                                <img
                                    src={selectedProduct.images[0]}
                                    alt={selectedProduct.name}
                                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                                />
                            </div>

                            <div className="w-full md:w-1/2 p-8 md:p-12 overflow-y-auto flex flex-col">
                                <div className="mb-8">
                                    <span className="text-accent text-xs font-bold uppercase tracking-widest">{selectedProduct.category}</span>
                                    <h2 className="text-3xl md:text-4xl font-black italic tracking-tighter mt-2 mb-4 uppercase leading-none">{selectedProduct.name}</h2>
                                    <p className="text-2xl font-bold text-accent">{formatPrice(selectedProduct.price)}</p>
                                </div>

                                <p className="text-neutral-400 mb-8 leading-relaxed font-light">
                                    {selectedProduct.description}
                                </p>

                                <div className="flex flex-wrap gap-2 mb-10">
                                    {selectedProduct.tags.map(tag => (
                                        <span key={tag} className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 bg-white/5 border border-white/10 text-neutral-400">
                                            #{tag}
                                        </span>
                                    ))}
                                </div>

                                <div className="mt-auto flex flex-col gap-3">
                                    <button
                                        onClick={() => { addToCart(selectedProduct); setSelectedProduct(null); }}
                                        className="w-full bg-accent text-white py-4 font-bold uppercase tracking-widest hover:bg-accent/90 transition-all flex items-center justify-center gap-2"
                                    >
                                        <LucideIcon name="shopping-cart" size={18} />
                                        Add To Cart
                                    </button>
                                    <button
                                        onClick={() => handleQuickBuy(selectedProduct)}
                                        className="w-full border border-white/20 hover:border-white text-white py-4 font-bold uppercase tracking-widest transition-all glass flex items-center justify-center gap-2"
                                    >
                                        <LucideIcon name="zap" size={18} />
                                        Beli Sekarang
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
                    <div className="fixed inset-0 z-[150] overflow-hidden">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsCartOpen(false)}
                            className="absolute inset-0 bg-brand/80 backdrop-blur-sm"
                        ></motion.div>

                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="absolute inset-y-0 right-0 w-full max-w-md bg-neutral-900 shadow-2xl flex flex-col"
                        >
                            <div className="p-6 border-b border-white/5 flex justify-between items-center bg-brand">
                                <h2 className="text-xl font-black italic tracking-tighter uppercase">Shopping Cart</h2>
                                <button
                                    onClick={() => setIsCartOpen(false)}
                                    className="p-2 hover:bg-white/5 rounded-full transition-colors"
                                >
                                    <LucideIcon name="x" />
                                </button>
                            </div>

                            <div className="flex-grow overflow-y-auto p-6 flex flex-col gap-6">
                                {cart.length > 0 ? (
                                    cart.map(item => (
                                        <div key={item.id} className="flex gap-4 group">
                                            <div className="w-24 h-32 bg-neutral-800 overflow-hidden shrink-0">
                                                <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                                            </div>
                                            <div className="flex flex-col justify-between py-1 flex-grow">
                                                <div>
                                                    <h3 className="font-bold text-sm leading-tight mb-1">{item.name}</h3>
                                                    <p className="text-accent font-bold text-sm">{formatPrice(item.price)}</p>
                                                </div>
                                                <div className="flex justify-between items-center">
                                                    <div className="flex items-center border border-white/10">
                                                        <button
                                                            onClick={() => updateQuantity(item.id, -1)}
                                                            className="px-2 py-1 hover:bg-white/5 transition-colors"
                                                        >-</button>
                                                        <span className="px-3 text-xs font-bold">{item.quantity}</span>
                                                        <button
                                                            onClick={() => updateQuantity(item.id, 1)}
                                                            className="px-2 py-1 hover:bg-white/5 transition-colors"
                                                        >+</button>
                                                    </div>
                                                    <button
                                                        onClick={() => removeFromCart(item.id)}
                                                        className="text-neutral-500 hover:text-accent transition-colors"
                                                    >
                                                        <LucideIcon name="trash-2" size={16} />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="flex-grow flex flex-col items-center justify-center text-neutral-600">
                                        <LucideIcon name="shopping-bag" size={64} strokeWidth={1} className="mb-4" />
                                        <p className="font-bold uppercase tracking-widest text-sm">Cart is empty</p>
                                    </div>
                                )}
                            </div>

                            {cart.length > 0 && (
                                <div className="p-6 border-t border-white/5 bg-brand">
                                    <div className="flex justify-between items-end mb-6">
                                        <span className="text-neutral-500 text-xs font-bold uppercase tracking-widest">Total Estimasi</span>
                                        <span className="text-2xl font-black italic text-accent">{formatPrice(cartTotal)}</span>
                                    </div>
                                    <button
                                        onClick={handleCheckout}
                                        className="w-full bg-white text-black py-4 font-bold uppercase tracking-widest hover:bg-neutral-200 transition-all flex items-center justify-center gap-2"
                                    >
                                        Checkout via WhatsApp
                                        <LucideIcon name="arrow-right" size={18} />
                                    </button>
                                </div>
                            )}
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Toasts */}
            <div className="fixed bottom-6 right-6 z-[200] flex flex-col gap-3 pointer-events-none">
                <AnimatePresence>
                    {toasts.map(toast => (
                        <motion.div
                            key={toast.id}
                            initial={{ opacity: 0, x: 50, scale: 0.9 }}
                            animate={{ opacity: 1, x: 0, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="glass px-6 py-4 flex items-center gap-3 border-l-4 border-l-accent pointer-events-auto shadow-xl"
                        >
                            <div className="bg-accent text-white p-1 rounded-full">
                                <LucideIcon name="check" size={14} strokeWidth={3} />
                            </div>
                            <span className="text-sm font-bold tracking-tight text-white">{toast.message}</span>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {/* Footer */}
            <footer className="bg-brand border-t border-white/5 py-20">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
                        <div className="md:col-span-2">
                            <a href="#" className="text-4xl font-extrabold tracking-tighter text-accent italic mb-6 inline-block">TKTM</a>
                            <p className="text-neutral-500 max-w-sm font-light leading-relaxed">
                                TKTM is a cinematic streetwear label established in 2024. Inspired by the neon lights of Neo-Tokyo and the shadows of urban dystopia.
                            </p>
                        </div>
                        <div>
                            <h4 className="text-xs font-bold uppercase tracking-[0.2em] mb-6 text-white">Navigation</h4>
                            <ul className="flex flex-col gap-4 text-sm text-neutral-500 font-medium">
                                <li><a href="#" className="hover:text-accent transition-colors">Home</a></li>
                                <li><a href="#shop" className="hover:text-accent transition-colors">Shop</a></li>
                                <li><a href="#" className="hover:text-accent transition-colors">Archive</a></li>
                                <li><a href="#" className="hover:text-accent transition-colors">Contact</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-xs font-bold uppercase tracking-[0.2em] mb-6 text-white">Socials</h4>
                            <ul className="flex flex-col gap-4 text-sm text-neutral-500 font-medium">
                                <li><a href="#" className="hover:text-accent transition-colors">Instagram</a></li>
                                <li><a href="#" className="hover:text-accent transition-colors">Twitter (X)</a></li>
                                <li><a href="#" className="hover:text-accent transition-colors">TikTok</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/5 gap-4">
                        <p className="text-[10px] text-neutral-600 font-bold uppercase tracking-widest">© 2024 TKTM Cinematic Streetwear. All rights reserved.</p>
                        <div className="flex gap-8 text-[10px] text-neutral-600 font-bold uppercase tracking-widest">
                            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
