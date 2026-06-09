const { useState, useEffect, useMemo, useRef } = React;
const { motion, AnimatePresence } = window.Motion || { motion: { div: 'div' }, AnimatePresence: ({children}) => children };

// --- CONFIG & CONSTANTS ---
const CONFIG = {
    brandName: 'TKTM',
    tagline: 'Toko Koleksi Terlengkap',
    whatsappNumber: '6288973262022',
    currency: 'Rp',
};

const PRODUCTS = [
    {
        id: 1,
        name: 'Action Figure Alpha',
        category: 'Figure',
        price: 150000,
        description: 'Detail tinggi, artikulasi sempurna untuk koleksi Anda.',
        images: [
            'https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?auto=format&fit=crop&q=80&w=800',
            'https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?auto=format&fit=crop&q=80&w=800'
        ]
    },
    {
        id: 2,
        name: 'Hoodie Crimson Edition',
        category: 'Fashion',
        price: 350000,
        description: 'Bahan premium dengan aksen merah anime yang ikonik.',
        images: [
            'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=800'
        ]
    },
    {
        id: 3,
        name: 'Poster Eksklusif Cyberpunk',
        category: 'Art',
        price: 75000,
        description: 'Cetak kualitas tinggi pada kertas art premium.',
        images: [
            'https://images.unsplash.com/photo-1614728263952-84ea256f9679?auto=format&fit=crop&q=80&w=800'
        ]
    },
    {
        id: 4,
        name: 'Gantungan Kunci Neon',
        category: 'Aksesori',
        price: 25000,
        description: 'Gantungan kunci akrilik dengan efek glow-in-the-dark.',
        images: [
            'https://images.unsplash.com/photo-1619134771231-970679789311?auto=format&fit=crop&q=80&w=800'
        ]
    },
    {
        id: 5,
        name: 'Kaos Oversize TKTM',
        category: 'Fashion',
        price: 185000,
        description: 'Desain minimalis dengan logo TKTM yang elegan.',
        images: [
            'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&q=80&w=800'
        ]
    },
    {
        id: 6,
        name: 'Model Kit Mecha-X',
        category: 'Hobi',
        price: 550000,
        description: 'Model kit tingkat lanjut dengan detail mekanik yang luar biasa.',
        images: [
            'https://images.unsplash.com/photo-1531693251400-38df35776dc7?auto=format&fit=crop&q=80&w=800'
        ]
    }
];

// --- COMPONENTS ---

const LucideIcon = ({ name, className = "w-6 h-6", strokeWidth = 2 }) => {
    const iconRef = useRef(null);

    useEffect(() => {
        if (window.lucide) {
            const timeoutId = setTimeout(() => {
                window.lucide.createIcons({
                    nameAttr: 'data-lucide',
                    attrs: {
                        'stroke-width': strokeWidth,
                        class: className
                    }
                });
            }, 0);
            return () => clearTimeout(timeoutId);
        }
    }, [name, className, strokeWidth]);

    return <i data-lucide={name} ref={iconRef} className={className}></i>;
};

const formatPrice = (price) => {
    return `${CONFIG.currency} ${price.toLocaleString('id-ID')}`;
};

function App() {
    const [cart, setCart] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [toasts, setToasts] = useState([]);

    const filteredProducts = useMemo(() => {
        return PRODUCTS.filter(p =>
            p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.category.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [searchQuery]);

    const addToCart = (product) => {
        setCart(prev => {
            const existing = prev.find(item => item.id === product.id);
            if (existing) {
                return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
            }
            return [...prev, { ...product, quantity: 1 }];
        });
        showToast(`Berhasil menambahkan ${product.name} ke keranjang!`);
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

    const showToast = (message) => {
        const id = Date.now();
        setToasts(prev => [...prev, { id, message }]);
        setTimeout(() => {
            setToasts(prev => prev.filter(t => t.id !== id));
        }, 3000);
    };

    const cartTotal = useMemo(() => {
        return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    }, [cart]);

    const handleCheckout = () => {
        if (cart.length === 0) return;

        const message = `Halo TKTM, saya ingin memesan:\n\n` +
            cart.map(item => `- ${item.name} (${item.quantity}x) - ${formatPrice(item.price * item.quantity)}`).join('\n') +
            `\n\nTotal: ${formatPrice(cartTotal)}\n\nTerima kasih!`;

        const encodedMessage = encodeURIComponent(message);
        window.open(`https://wa.me/${CONFIG.whatsappNumber}?text=${encodedMessage}`, '_blank');

        setCart([]);
        setIsCartOpen(false);
        showToast('Pembelian berhasil! Anda akan diarahkan ke WhatsApp.');
    };

    const buyNow = (product) => {
        const message = `Halo TKTM, saya ingin membeli ${product.name} - ${formatPrice(product.price)}`;
        const encodedMessage = encodeURIComponent(message);
        window.open(`https://wa.me/${CONFIG.whatsappNumber}?text=${encodedMessage}`, '_blank');
    };

    const CartDrawer = ({ isOpen, onClose }) => {
        return (
            <motion.div
                initial={{ x: '100%' }}
                animate={{ x: isOpen ? 0 : '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="fixed top-0 right-0 z-[70] w-full max-w-md h-full bg-brand border-l border-white/10 shadow-2xl flex flex-col"
                id="cart-drawer"
            >
                <div className="p-6 border-b border-white/10 flex items-center justify-between">
                    <h3 className="text-2xl font-bold flex items-center gap-2">
                        <LucideIcon name="shopping-cart" />
                        Keranjang
                    </h3>
                    <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                        <LucideIcon name="x" />
                    </button>
                </div>

                <div className="flex-grow overflow-y-auto p-6 space-y-6">
                    {cart.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-gray-500 gap-4">
                            <LucideIcon name="shopping-bag" className="w-16 h-16 opacity-20" />
                            <p>Keranjang Anda masih kosong</p>
                            <button onClick={onClose} className="text-accent font-bold hover:underline">Mulai Belanja</button>
                        </div>
                    ) : (
                        cart.map(item => (
                            <div key={item.id} className="flex gap-4 group">
                                <div className="w-20 h-20 rounded-xl overflow-hidden bg-white/5 flex-shrink-0">
                                    <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover" />
                                </div>
                                <div className="flex-grow">
                                    <div className="flex justify-between mb-1">
                                        <h4 className="font-bold text-sm line-clamp-1">{item.name}</h4>
                                        <button onClick={() => removeFromCart(item.id)} className="text-gray-500 hover:text-accent">
                                            <LucideIcon name="trash-2" className="w-4 h-4" />
                                        </button>
                                    </div>
                                    <div className="text-xs text-gray-400 mb-3">{formatPrice(item.price)}</div>
                                    <div className="flex items-center gap-3">
                                        <div className="flex items-center border border-white/10 rounded-lg">
                                            <button onClick={() => updateQuantity(item.id, -1)} className="px-2 py-1 hover:bg-white/5">-</button>
                                            <span className="w-8 text-center text-sm font-bold">{item.quantity}</span>
                                            <button onClick={() => updateQuantity(item.id, 1)} className="px-2 py-1 hover:bg-white/5">+</button>
                                        </div>
                                        <div className="text-sm font-bold ml-auto">{formatPrice(item.price * item.quantity)}</div>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {cart.length > 0 && (
                    <div className="p-6 border-t border-white/10 bg-white/5 space-y-4">
                        <div className="flex justify-between text-gray-400">
                            <span>Subtotal</span>
                            <span>{formatPrice(cartTotal)}</span>
                        </div>
                        <div className="flex justify-between text-xl font-bold">
                            <span>Total</span>
                            <span className="text-accent">{formatPrice(cartTotal)}</span>
                        </div>
                        <button
                            onClick={handleCheckout}
                            className="w-full btn-primary py-4 flex items-center justify-center gap-3 text-lg"
                        >
                            <LucideIcon name="whatsapp" className="w-6 h-6" />
                            Checkout via WhatsApp
                        </button>
                    </div>
                )}
            </motion.div>
        );
    };

    const ProductModal = ({ product, onClose }) => {
        const [activeImg, setActiveImg] = useState(0);

        if (!product) return null;

        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[60] flex items-center justify-center p-4 md:p-8"
            >
                <div className="absolute inset-0 bg-brand/90 backdrop-blur-md" onClick={onClose}></div>
                <motion.div
                    initial={{ scale: 0.9, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.9, opacity: 0, y: 20 }}
                    className="relative w-full max-w-5xl bg-brand border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]"
                >
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 z-10 p-2 bg-brand/50 hover:bg-accent rounded-full transition-colors"
                    >
                        <LucideIcon name="x" className="w-6 h-6" />
                    </button>

                    <div className="md:w-1/2 bg-white/5 p-4 flex flex-col gap-4 overflow-y-auto">
                        <div className="aspect-square rounded-2xl overflow-hidden">
                            <img
                                src={product.images[activeImg]}
                                alt={product.name}
                                className="w-full h-full object-cover animate-in"
                            />
                        </div>
                        {product.images.length > 1 && (
                            <div className="grid grid-cols-4 gap-4">
                                {product.images.map((img, idx) => (
                                    <div
                                        key={idx}
                                        onClick={() => setActiveImg(idx)}
                                        className={`aspect-square rounded-lg overflow-hidden cursor-pointer border-2 transition-colors ${activeImg === idx ? 'border-accent' : 'border-transparent'}`}
                                    >
                                        <img src={img} alt={`${product.name} ${idx}`} className="w-full h-full object-cover" />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="md:w-1/2 p-8 md:p-12 overflow-y-auto">
                        <div className="text-sm font-bold text-accent uppercase tracking-widest mb-4">{product.category}</div>
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">{product.name}</h2>
                        <div className="text-2xl font-medium text-white mb-8">{formatPrice(product.price)}</div>

                        <div className="space-y-6 mb-10">
                            <div>
                                <h4 className="text-gray-400 text-sm font-bold uppercase mb-2">Deskripsi</h4>
                                <p className="text-gray-300 leading-relaxed">{product.description}</p>
                            </div>
                            <div className="flex gap-4 items-center">
                                <div className="flex items-center gap-2 text-yellow-500">
                                    <LucideIcon name="star" className="fill-current w-5 h-5" />
                                    <span className="font-bold text-white">4.9</span>
                                </div>
                                <span className="text-gray-500">|</span>
                                <span className="text-gray-400">120+ Terjual</span>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <button
                                onClick={() => {
                                    addToCart(product);
                                    onClose();
                                }}
                                className="flex-grow bg-white text-[#0a0a0a] hover:bg-gray-200 py-4 rounded-xl flex items-center justify-center gap-3 transition-colors font-bold text-lg"
                            >
                                <LucideIcon name="shopping-cart" className="w-6 h-6" />
                                Masukkan Keranjang
                            </button>
                            <button
                                onClick={() => buyNow(product)}
                                className="bg-accent hover:bg-rose-700 py-4 px-8 rounded-xl flex items-center justify-center gap-3 transition-colors font-bold text-lg"
                            >
                                <LucideIcon name="zap" className="w-6 h-6" />
                                Beli Sekarang
                            </button>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        );
    };

    return (
        <div className="min-h-screen flex flex-col font-sans">
            {/* Navbar Placeholder for next steps */}
            <nav className="fixed top-0 w-full z-50 glass-panel border-b border-white/10">
                <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-2 cursor-pointer">
                        <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center font-black text-xl">T</div>
                        <span className="text-2xl font-bold tracking-tighter">{CONFIG.brandName}</span>
                    </div>

                    <div className="hidden md:flex items-center gap-8 text-sm font-medium">
                        <a href="#koleksi" className="hover:text-accent transition-colors">Koleksi</a>
                        <a href="#terbaru" className="hover:text-accent transition-colors">Terbaru</a>
                        <a href="#kontak" className="hover:text-accent transition-colors">Kontak</a>
                    </div>

                    <div className="flex items-center gap-4">
                        <button onClick={() => setIsCartOpen(true)} className="relative p-2 hover:bg-white/10 rounded-full transition-colors" aria-label="Keranjang">
                            <LucideIcon name="shopping-cart" className="w-6 h-6" />
                            {cart.length > 0 && (
                                <span className="absolute top-0 right-0 w-5 h-5 bg-accent rounded-full text-[10px] flex items-center justify-center font-bold border-2 border-brand">
                                    {cart.reduce((a, b) => a + b.quantity, 0)}
                                </span>
                            )}
                        </button>
                        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-2 hover:bg-white/10 rounded-full transition-colors">
                            <LucideIcon name={isMenuOpen ? "x" : "menu"} className="w-6 h-6" />
                        </button>
                    </div>
                </div>
            </nav>

            <main className="flex-grow pt-20">
                {/* Hero Section */}
                <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 z-0">
                        <img
                            src="https://images.unsplash.com/photo-1560972550-aba3456b5564?auto=format&fit=crop&q=80&w=1600"
                            className="w-full h-full object-cover opacity-30 grayscale"
                            alt="Hero Background"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-brand via-transparent to-transparent"></div>
                    </div>

                    <div className="relative z-10 text-center px-4 max-w-4xl">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-5xl md:text-8xl font-black mb-6 tracking-tighter"
                        >
                            ELEVANSI <span className="text-accent italic">KOLEKSI</span>
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-xl md:text-2xl text-gray-400 mb-10 max-w-2xl mx-auto"
                        >
                            Eksplorasi kurasi item terbaik mulai dari fashion hingga koleksi terbatas yang mendefinisikan gaya hidup Anda.
                        </motion.p>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            <a href="#koleksi" className="btn-primary inline-block text-lg px-10 py-4">Mulai Belanja</a>
                        </motion.div>
                    </div>
                </section>

                {/* Search & Filter */}
                <section id="koleksi" className="max-w-7xl mx-auto px-4 py-20">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                        <div>
                            <h2 className="text-4xl font-bold mb-2">Semua Produk</h2>
                            <p className="text-gray-400">Temukan sesuatu yang spesial untuk Anda hari ini.</p>
                        </div>
                        <div className="relative w-full md:w-96">
                            <LucideIcon name="search" className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                            <input
                                type="text"
                                placeholder="Cari produk..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:border-accent transition-colors"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredProducts.map(product => (
                            <motion.div
                                key={product.id}
                                layoutId={`product-${product.id}`}
                                className="glass-panel rounded-2xl overflow-hidden group hover:border-accent/50 transition-colors"
                            >
                                <div className="aspect-square overflow-hidden cursor-pointer" onClick={() => setSelectedProduct(product)}>
                                    <img
                                        src={product.images[0]}
                                        alt={product.name}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                    />
                                </div>
                                <div className="p-6">
                                    <div className="text-xs font-bold text-accent uppercase tracking-widest mb-2">{product.category}</div>
                                    <h3 className="text-xl font-bold mb-2 group-hover:text-accent transition-colors">{product.name}</h3>
                                    <div className="text-lg font-medium mb-6">{formatPrice(product.price)}</div>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => addToCart(product)}
                                            className="flex-grow bg-white/10 hover:bg-white/20 py-3 rounded-lg flex items-center justify-center gap-2 transition-colors font-semibold"
                                        >
                                            <LucideIcon name="shopping-cart" className="w-5 h-5" />
                                            + Keranjang
                                        </button>
                                        <button
                                            onClick={() => buyNow(product)}
                                            className="bg-accent hover:bg-rose-700 p-3 rounded-lg transition-colors"
                                            title="Beli Langsung"
                                        >
                                            <LucideIcon name="zap" className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>
            </main>

            <footer className="bg-white/5 border-t border-white/10 py-12">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <div className="flex items-center justify-center gap-2 mb-6">
                        <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center font-black">T</div>
                        <span className="text-xl font-bold tracking-tighter">{CONFIG.brandName}</span>
                    </div>
                    <p className="text-gray-500 text-sm mb-8">© 2024 {CONFIG.brandName}. Hak cipta dilindungi undang-undang.</p>
                    <div className="flex justify-center gap-6">
                        <a href="#" className="text-gray-400 hover:text-accent transition-colors"><LucideIcon name="instagram" /></a>
                        <a href="#" className="text-gray-400 hover:text-accent transition-colors"><LucideIcon name="facebook" /></a>
                        <a href="#" className="text-gray-400 hover:text-accent transition-colors"><LucideIcon name="twitter" /></a>
                    </div>
                </div>
            </footer>

            {/* Modal & Cart Overlay */}
            <AnimatePresence>
                {isCartOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-[65] bg-black/60 backdrop-blur-sm"
                            onClick={() => setIsCartOpen(false)}
                        />
                        <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
                    </>
                )}
                {selectedProduct && (
                    <ProductModal
                        product={selectedProduct}
                        onClose={() => setSelectedProduct(null)}
                    />
                )}
            </AnimatePresence>

            {/* Notifications */}
            <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] flex flex-col gap-2 w-full max-w-sm px-4">
                <AnimatePresence>
                    {toasts.map(toast => (
                        <motion.div
                            key={toast.id}
                            initial={{ opacity: 0, y: 50, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="bg-white text-[#0a0a0a] px-6 py-4 rounded-xl shadow-2xl font-bold flex items-center gap-3 border-l-4 border-accent"
                        >
                            <LucideIcon name="check-circle" className="text-accent" />
                            {toast.message}
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </div>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
