const { useState, useEffect, useMemo, useCallback } = React;
const { motion, AnimatePresence } = window.Motion || { motion: ({children}) => <div>{children}</div>, AnimatePresence: ({children}) => <>{children}</> };

// Configuration
const CONFIG = {
    brandName: 'TKTM',
    whatsappNumber: '6288973262022',
    currency: 'IDR',
    navLinks: [
        { name: 'Beranda', href: '#' },
        { name: 'Koleksi', href: '#koleksi' },
        { name: 'Terbaru', href: '#terbaru' },
        { name: 'Kontak', href: '#kontak' }
    ],
    categories: ['Semua', 'T-Shirt', 'Hoodie', 'Aksesoris'],
    products: [
        {
            id: 1,
            name: "Cyber Punk Tee",
            category: "T-Shirt",
            price: 249000,
            images: [
                "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&q=80&w=800",
                "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&q=80&w=800"
            ],
            description: "Kaos premium dengan desain futuristik. Terbuat dari katun berkualitas tinggi yang nyaman dipakai sepanjang hari.",
            isNew: true
        },
        {
            id: 2,
            name: "Midnight Hoodie",
            category: "Hoodie",
            price: 499000,
            images: [
                "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=800",
                "https://images.unsplash.com/photo-1578932750294-f5075e85f44a?auto=format&fit=crop&q=80&w=800"
            ],
            description: "Hoodie hitam pekat dengan potongan oversized. Sangat cocok untuk tampilan streetwear yang bold.",
            isNew: true
        },
        {
            id: 3,
            name: "Neon Cap",
            category: "Aksesoris",
            price: 189000,
            images: [
                "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&q=80&w=800",
                "https://images.unsplash.com/photo-1521369909029-2afed882baee?auto=format&fit=crop&q=80&w=800"
            ],
            description: "Topi dengan detail bordir neon yang menyala dalam gelap. Adjustable strap untuk kenyamanan maksimal.",
            isNew: false
        },
        {
            id: 4,
            name: "Vantage Oversize",
            category: "T-Shirt",
            price: 279000,
            images: [
                "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&q=80&w=800",
                "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&q=80&w=800"
            ],
            description: "Kaos oversize dengan nuansa vintage. Material heavy cotton yang awet dan stylish.",
            isNew: false
        },
        {
            id: 5,
            name: "Urban Cargo Pant",
            category: "Aksesoris",
            price: 549000,
            images: [
                "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&q=80&w=800",
                "https://images.unsplash.com/photo-1624371414361-e6e9ef0ed9b5?auto=format&fit=crop&q=80&w=800"
            ],
            description: "Celana cargo teknikal dengan banyak saku. Tahan lama dan fungsional untuk aktivitas urban.",
            isNew: true
        },
        {
            id: 6,
            name: "Stealth Backpack",
            category: "Aksesoris",
            price: 899000,
            images: [
                "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=800",
                "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?auto=format&fit=crop&q=80&w=800"
            ],
            description: "Ransel tahan air dengan desain minimalis. Dilengkapi kompartemen laptop dan perlindungan ekstra.",
            isNew: false
        }
    ]
};

// Lucide Icon Helper Component
const LucideIcon = ({ name, size = 24, className = "" }) => {
    useEffect(() => {
        if (window.refreshIcons) {
            const timer = setTimeout(window.refreshIcons, 0);
            return () => clearTimeout(timer);
        }
    }, [name]);

    return <i data-lucide={name} style={{ width: size, height: size }} className={className}></i>;
};

// --- Utilities ---
const formatIDR = (amount) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    }).format(amount);
};

// --- Components ---

const ProductCard = ({ product, onSelect }) => {
    return (
        <motion.div
            whileHover={{ y: -8 }}
            className="group cursor-pointer"
            onClick={() => onSelect(product)}
        >
            <div className="relative aspect-[3/4] overflow-hidden bg-zinc-900 mb-4 rounded-xl">
                <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {product.isNew && (
                    <div className="absolute top-4 left-4 bg-accent text-white text-[10px] font-bold px-2 py-1 rounded-sm uppercase tracking-widest">
                        Baru
                    </div>
                )}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="bg-white text-brand px-6 py-2 rounded-full font-bold text-sm translate-y-4 group-hover:translate-y-0 transition-transform">
                        Lihat Detail
                    </span>
                </div>
            </div>
            <div className="space-y-1">
                <p className="text-zinc-500 text-xs uppercase tracking-widest font-medium">{product.category}</p>
                <h3 className="text-lg font-bold group-hover:text-accent transition-colors">{product.name}</h3>
                <p className="text-zinc-300 font-semibold">{formatIDR(product.price)}</p>
            </div>
        </motion.div>
    );
};

const ProductModal = ({ product, onClose, onAddToCart, onBuyNow }) => {
    const [activeImage, setActiveImage] = useState(0);

    if (!product) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                className="absolute inset-0 bg-brand/90 backdrop-blur-sm"
            />
            <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="relative w-full max-w-4xl bg-zinc-900 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]"
            >
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-10 bg-brand/50 hover:bg-brand p-2 rounded-full transition-colors"
                >
                    <LucideIcon name="x" size={20} />
                </button>

                {/* Image Gallery */}
                <div className="w-full md:w-1/2 bg-zinc-800 flex flex-col">
                    <div className="flex-1 overflow-hidden">
                        <img
                            src={product.images[activeImage]}
                            alt={product.name}
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="flex p-4 gap-2 overflow-x-auto border-t border-white/5">
                        {product.images.map((img, idx) => (
                            <button
                                key={idx}
                                onClick={() => setActiveImage(idx)}
                                className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-all flex-shrink-0 ${activeImage === idx ? 'border-accent' : 'border-transparent'}`}
                            >
                                <img src={img} className="w-full h-full object-cover" />
                            </button>
                        ))}
                    </div>
                </div>

                {/* Details */}
                <div className="w-full md:w-1/2 p-8 md:p-12 overflow-y-auto">
                    <p className="text-accent font-bold text-sm tracking-widest uppercase mb-2">{product.category}</p>
                    <h2 className="text-3xl md:text-4xl font-black mb-4">{product.name}</h2>
                    <p className="text-2xl font-bold mb-6">{formatIDR(product.price)}</p>

                    <div className="prose prose-invert mb-8">
                        <p className="text-zinc-400 leading-relaxed">
                            {product.description}
                        </p>
                    </div>

                    <div className="flex flex-col gap-4 mt-auto">
                        <button
                            onClick={() => onAddToCart(product)}
                            className="w-full bg-white text-brand py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-zinc-200 transition-colors"
                        >
                            <LucideIcon name="shopping-bag" size={20} />
                            Tambah ke Keranjang
                        </button>
                        <button
                            onClick={() => onBuyNow(product)}
                            className="w-full border border-white/20 py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-white/5 transition-colors"
                        >
                            <LucideIcon name="zap" size={20} className="text-accent" />
                            Beli Sekarang
                        </button>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

const CartDrawer = ({ isOpen, onClose, items, onRemove, onUpdateQuantity, onCheckout }) => {
    const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 z-[100] bg-brand/80 backdrop-blur-sm"
                    />
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed top-0 right-0 h-full w-full max-w-md z-[101] bg-zinc-900 shadow-2xl flex flex-col"
                    >
                        <div className="p-6 flex justify-between items-center border-b border-white/5">
                            <h2 className="text-xl font-black flex items-center gap-2">
                                <LucideIcon name="shopping-bag" />
                                KERANJANG
                            </h2>
                            <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full transition-colors">
                                <LucideIcon name="x" size={24} />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-6 space-y-6">
                            {items.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-zinc-500 space-y-4">
                                    <LucideIcon name="shopping-cart" size={48} />
                                    <p>Keranjang Anda masih kosong.</p>
                                </div>
                            ) : (
                                items.map(item => (
                                    <div key={item.id} className="flex gap-4 group">
                                        <div className="w-20 h-20 bg-zinc-800 rounded-lg overflow-hidden flex-shrink-0">
                                            <img src={item.images[0]} className="w-full h-full object-cover" />
                                        </div>
                                        <div className="flex-1 space-y-1">
                                            <h3 className="font-bold text-sm">{item.name}</h3>
                                            <p className="text-zinc-500 text-xs">{formatIDR(item.price)}</p>
                                            <div className="flex items-center gap-3 mt-2">
                                                <div className="flex items-center border border-white/10 rounded-lg">
                                                    <button
                                                        onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                                                        className="px-2 py-1 hover:text-accent transition-colors"
                                                    >
                                                        <LucideIcon name="minus" size={14} />
                                                    </button>
                                                    <span className="text-xs font-bold w-6 text-center">{item.quantity}</span>
                                                    <button
                                                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                                                        className="px-2 py-1 hover:text-accent transition-colors"
                                                    >
                                                        <LucideIcon name="plus" size={14} />
                                                    </button>
                                                </div>
                                                <button
                                                    onClick={() => onRemove(item.id)}
                                                    className="text-zinc-600 hover:text-accent transition-colors ml-auto"
                                                >
                                                    <LucideIcon name="trash-2" size={16} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        {items.length > 0 && (
                            <div className="p-6 bg-zinc-950 border-t border-white/5 space-y-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-zinc-400">Total</span>
                                    <span className="text-xl font-bold text-accent">{formatIDR(total)}</span>
                                </div>
                                <button
                                    onClick={onCheckout}
                                    className="w-full bg-accent hover:bg-accent-hover text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all"
                                >
                                    <LucideIcon name="check-circle" size={20} />
                                    Checkout WhatsApp
                                </button>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

const Navbar = ({ cartCount, onOpenCart }) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'glass py-3' : 'bg-transparent py-5'}`}>
            <div className="container mx-auto px-4 md:px-8 flex justify-between items-center">
                {/* Logo */}
                <a href="#" className="text-2xl font-black tracking-tighter text-white flex items-center gap-2">
                    <span className="bg-accent p-1 rounded-sm text-brand"><LucideIcon name="flame" size={20} /></span>
                    {CONFIG.brandName}
                </a>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-8">
                    {CONFIG.navLinks.map(link => (
                        <a key={link.name} href={link.href} className="text-sm font-medium hover:text-accent transition-colors">
                            {link.name}
                        </a>
                    ))}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-4">
                    <button
                        onClick={onOpenCart}
                        className="relative p-2 hover:bg-white/10 rounded-full transition-colors"
                        aria-label="Keranjang"
                    >
                        <LucideIcon name="shopping-bag" size={22} />
                        {cartCount > 0 && (
                            <span className="absolute top-0 right-0 bg-accent text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-brand">
                                {cartCount}
                            </span>
                        )}
                    </button>

                    <button
                        className="md:hidden p-2 hover:bg-white/10 rounded-full transition-colors"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        aria-label="Menu"
                    >
                        <LucideIcon name={isMobileMenuOpen ? "x" : "menu"} size={22} />
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="absolute top-full left-0 w-full glass border-t border-white/5 py-6 flex flex-col items-center gap-6 md:hidden"
                    >
                        {CONFIG.navLinks.map(link => (
                            <a
                                key={link.name}
                                href={link.href}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="text-lg font-medium hover:text-accent transition-colors"
                            >
                                {link.name}
                            </a>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

// Main App Wrapper
const App = () => {
    const [cart, setCart] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState('Semua');

    const filteredProducts = useMemo(() => {
        return CONFIG.products.filter(product => {
            const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesCategory = activeCategory === 'Semua' || product.category === activeCategory;
            return matchesSearch && matchesCategory;
        });
    }, [searchQuery, activeCategory]);

    const addToCart = (product) => {
        setCart(prev => {
            const existing = prev.find(item => item.id === product.id);
            if (existing) {
                return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
            }
            return [...prev, { ...product, quantity: 1 }];
        });
    };

    const updateQuantity = (id, newQty) => {
        if (newQty < 1) return;
        setCart(prev => prev.map(item => item.id === id ? { ...item, quantity: newQty } : item));
    };

    const removeFromCart = (id) => {
        setCart(prev => prev.filter(item => item.id !== id));
    };

    const handleCheckout = useCallback(() => {
        if (cart.length === 0) return;

        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        let message = `Halo TKTM, saya ingin memesan:\n\n`;

        cart.forEach((item, index) => {
            message += `${index + 1}. ${item.name} (${item.quantity}x) - ${formatIDR(item.price * item.quantity)}\n`;
        });

        message += `\n*Total: ${formatIDR(total)}*`;

        const encodedMessage = encodeURIComponent(message);
        window.open(`https://wa.me/${CONFIG.whatsappNumber}?text=${encodedMessage}`, '_blank');
    }, [cart]);

    const buyNow = useCallback((product) => {
        const message = `Halo TKTM, saya ingin memesan:\n\n1. ${product.name} (1x) - ${formatIDR(product.price)}\n\n*Total: ${formatIDR(product.price)}*`;
        const encodedMessage = encodeURIComponent(message);
        window.open(`https://wa.me/${CONFIG.whatsappNumber}?text=${encodedMessage}`, '_blank');
    }, []);

    return (
        <div className="min-h-screen">
            <Navbar cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)} onOpenCart={() => setIsCartOpen(true)} />

            <main>
                {/* Hero Section */}
                <section className="h-screen flex items-center justify-center bg-zinc-950 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-b from-accent/10 to-transparent pointer-events-none" />
                    <div className="container mx-auto px-4 text-center z-10">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-6xl md:text-8xl font-black tracking-tighter mb-6"
                        >
                            STYLE IS <span className="text-accent italic">POWER.</span>
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto mb-10"
                        >
                            Koleksi eksklusif dari TKTM. Temukan gaya terbaikmu dengan kurasi produk premium kami.
                        </motion.p>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.4 }}
                        >
                            <a href="#koleksi" className="bg-accent hover:bg-accent-hover text-white px-8 py-4 rounded-full font-bold transition-all inline-flex items-center gap-2 group">
                                Jelajahi Sekarang
                                <LucideIcon name="arrow-right" size={20} className="group-hover:translate-x-1 transition-transform" />
                            </a>
                        </motion.div>
                    </div>
                </section>

                {/* Collection Section */}
                <section id="koleksi" className="py-24 bg-brand">
                    <div className="container mx-auto px-4">
                        <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16">
                            <div>
                                <h2 className="text-4xl font-black tracking-tighter mb-4">KOLEKSI KAMI</h2>
                                <div className="flex flex-wrap gap-2">
                                    {CONFIG.categories.map(cat => (
                                        <button
                                            key={cat}
                                            onClick={() => setActiveCategory(cat)}
                                            className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${activeCategory === cat ? 'bg-white text-brand' : 'bg-zinc-900 text-zinc-500 hover:bg-zinc-800'}`}
                                        >
                                            {cat.toUpperCase()}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div className="w-full md:w-80 relative">
                                <LucideIcon name="search" size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />
                                <input
                                    type="text"
                                    placeholder="Cari produk..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full bg-zinc-900 border border-white/5 rounded-full py-3 pl-12 pr-6 focus:outline-none focus:border-accent transition-colors"
                                />
                            </div>
                        </div>

                        {filteredProducts.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                                {filteredProducts.map(product => (
                                    <ProductCard
                                        key={product.id}
                                        product={product}
                                        onSelect={setSelectedProduct}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-24">
                                <LucideIcon name="package-search" size={48} className="mx-auto mb-4 text-zinc-700" />
                                <p className="text-zinc-500">Tidak ada produk yang ditemukan.</p>
                            </div>
                        )}
                    </div>
                </section>
            </main>

            <AnimatePresence mode="wait">
                {selectedProduct && (
                    <ProductModal
                        product={selectedProduct}
                        onClose={() => setSelectedProduct(null)}
                        onAddToCart={(p) => {
                            addToCart(p);
                            setSelectedProduct(null);
                        }}
                        onBuyNow={buyNow}
                    />
                )}
            </AnimatePresence>

            <CartDrawer
                isOpen={isCartOpen}
                onClose={() => setIsCartOpen(false)}
                items={cart}
                onRemove={removeFromCart}
                onUpdateQuantity={updateQuantity}
                onCheckout={handleCheckout}
            />

            <footer className="bg-zinc-950 border-t border-white/5 py-12" id="kontak">
                <div className="container mx-auto px-4 text-center">
                    <div className="text-2xl font-black mb-4">{CONFIG.brandName}</div>
                    <p className="text-zinc-500 text-sm mb-8">&copy; 2026 {CONFIG.brandName}. All rights reserved.</p>
                    <div className="flex justify-center gap-6">
                        <a href="#" className="hover:text-accent transition-colors"><LucideIcon name="instagram" /></a>
                        <a href="#" className="hover:text-accent transition-colors"><LucideIcon name="twitter" /></a>
                        <a href="#" className="hover:text-accent transition-colors"><LucideIcon name="facebook" /></a>
                    </div>
                </div>
            </footer>
        </div>
    );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
