const { useState, useEffect, useMemo, useRef, useCallback } = React;
const { motion, AnimatePresence } = window.Motion || {
    motion: {
        div: (props) => <div {...props} />,
        nav: (props) => <nav {...props} />,
        button: (props) => <button {...props} />,
        header: (props) => <header {...props} />,
        section: (props) => <section {...props} />,
        img: (props) => <img {...props} />,
        span: (props) => <span {...props} />,
        h1: (props) => <h1 {...props} />,
        h2: (props) => <h2 {...props} />,
        h3: (props) => <h3 {...props} />,
        p: (props) => <p {...props} />,
        form: (props) => <form {...props} />,
        input: (props) => <input {...props} />,
        ul: (props) => <ul {...props} />,
        li: (props) => <li {...props} />,
        footer: (props) => <footer {...props} />,
        aside: (props) => <aside {...props} />
    },
    AnimatePresence: ({children}) => children
};

// --- CONFIGURATION ---
const CONFIG = {
    BRAND_NAME: 'TKTM',
    WHATSAPP_NUMBER: '6288973262022',
    CURRENCY: 'IDR',
    CATEGORIES: ['Semua', 'Outerwear', 'Tops', 'Accessories'],
};

// --- CORE HELPERS ---
let lucideTimeout;
const LucideIcon = ({ name, size = 24, className = "" }) => {
    const iconRef = useRef(null);

    useEffect(() => {
        if (window.lucide) {
            clearTimeout(lucideTimeout);
            lucideTimeout = setTimeout(() => {
                window.lucide.createIcons();
            }, 10);
        }
    }, [name]);

    return (
        <i
            data-lucide={name}
            className={className}
            style={{ width: size, height: size }}
            ref={iconRef}
        ></i>
    );
};

const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    }).format(price).replace('Rp', 'Rp ');
};

// --- PRODUCT DATA ---
const PRODUCTS = [
    {
        id: 1,
        name: 'Midnight Tech-Jacket',
        price: 1250000,
        category: 'Outerwear',
        description: 'Jaket teknikal dengan material water-resistant dan detail reflektif untuk gaya urban yang futuristik.',
        images: [
            'https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=1000&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1544022613-e879a7998da2?q=80&w=1000&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=1000&auto=format&fit=crop'
        ],
        featured: true
    },
    {
        id: 2,
        name: 'Crimson Edge Hoodie',
        price: 750000,
        category: 'Outerwear',
        description: 'Hoodie oversized dengan aksen merah anime yang tajam, memberikan kesan dramatis pada setiap penampilan.',
        images: [
            'https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=1000&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1513789172161-136119cc7c7a?q=80&w=1000&auto=format&fit=crop'
        ],
        featured: true
    },
    {
        id: 3,
        name: 'Shadow Over-Shirt',
        price: 450000,
        category: 'Tops',
        description: 'Shirt minimalis dengan potongan rileks, cocok untuk layering dalam berbagai kondisi.',
        images: [
            'https://images.unsplash.com/photo-1617137968427-85924c800a22?q=80&w=1000&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1598033129183-c4f50c717658?q=80&w=1000&auto=format&fit=crop'
        ],
        featured: false
    },
    {
        id: 4,
        name: 'Obsidian Cargo Pants',
        price: 890000,
        category: 'Tops',
        description: 'Celana kargo dengan banyak saku fungsional dan fit yang modern.',
        images: [
            'https://images.unsplash.com/photo-1624282158511-9310034a2e57?q=80&w=1000&auto=format&fit=crop'
        ],
        featured: false
    },
    {
        id: 5,
        name: 'Neo-Tokyo Cap',
        price: 250000,
        category: 'Accessories',
        description: 'Topi premium dengan bordir eksklusif TKTM.',
        images: [
            'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?q=80&w=1000&auto=format&fit=crop'
        ],
        featured: false
    }
];

// --- COMPONENTS ---

const Navbar = ({ cartCount, onCartClick }) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { label: 'Terbaru', href: '#terbaru' },
        { label: 'Koleksi', href: '#koleksi' },
        { label: 'Kontak', href: '#kontak' },
    ];

    return (
        <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-brand/90 backdrop-blur-md py-4' : 'bg-transparent py-6'}`}>
            <div className="container mx-auto px-6 flex justify-between items-center">
                <a href="#" className="text-2xl font-bold text-accent tracking-tighter">
                    {CONFIG.BRAND_NAME}
                </a>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map(link => (
                        <a key={link.label} href={link.href} className="text-sm font-medium hover:text-accent transition-colors">
                            {link.label}
                        </a>
                    ))}
                </div>

                <div className="flex items-center gap-4">
                    <button
                        onClick={onCartClick}
                        className="relative p-2 hover:bg-accent/10 rounded-full transition-colors"
                        aria-label="Keranjang"
                    >
                        <LucideIcon name="shopping-bag" size={20} />
                        {cartCount > 0 && (
                            <span className="absolute top-0 right-0 w-4 h-4 bg-accent text-[10px] flex items-center justify-center rounded-full">
                                {cartCount}
                            </span>
                        )}
                    </button>
                    <button
                        className="md:hidden p-2"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-label="Menu"
                    >
                        <LucideIcon name={isMenuOpen ? "x" : "menu"} size={24} />
                    </button>
                </div>
            </div>

            {/* Mobile Nav */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="md:hidden bg-brand border-b border-white/10"
                    >
                        <div className="flex flex-col p-6 gap-4">
                            {navLinks.map(link => (
                                <a
                                    key={link.label}
                                    href={link.href}
                                    className="text-lg font-medium"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    {link.label}
                                </a>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

const Hero = () => (
    <header className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
            <img
                src="https://images.unsplash.com/photo-1555680202-c86f0e12f086?q=80&w=2000&auto=format&fit=crop"
                className="w-full h-full object-cover opacity-30 scale-105 animate-pulse"
                alt="Hero Background"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand via-brand/50 to-transparent"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10 text-center">
            <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-6xl md:text-8xl font-black mb-6 tracking-tighter italic"
            >
                BEYOND THE <span className="text-accent">LIMIT.</span>
            </motion.h1>
            <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-lg md:text-xl text-white/60 mb-10 max-w-2xl mx-auto"
            >
                Koleksi fashion premium dengan sentuhan estetika sinematik dan kualitas tanpa kompromi.
            </motion.p>
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
            >
                <a href="#koleksi" className="bg-accent hover:bg-accent/80 text-white px-10 py-4 rounded-full font-bold transition-all inline-block">
                    Lihat Koleksi
                </a>
            </motion.div>
        </div>
    </header>
);

const ProductCard = ({ product, onClick }) => (
    <motion.div
        layout
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="group cursor-pointer"
        onClick={() => onClick(product)}
    >
        <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-white/5 mb-4">
            <img
                src={product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-brand/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                <span className="text-sm font-bold tracking-widest border border-white px-6 py-2 rounded-full transform translate-y-4 group-hover:translate-y-0 transition-transform">
                    LIHAT DETAIL
                </span>
            </div>
            {product.featured && (
                <div className="absolute top-4 left-4 bg-accent text-[10px] font-bold px-3 py-1 rounded-full">
                    BEST SELLER
                </div>
            )}
        </div>
        <h3 className="text-lg font-bold mb-1 group-hover:text-accent transition-colors">{product.name}</h3>
        <p className="text-accent font-medium">{formatPrice(product.price)}</p>
    </motion.div>
);

const ProductModal = ({ product, isOpen, onClose, onAddToCart }) => {
    const [activeImage, setActiveImage] = useState(0);

    useEffect(() => {
        if (product) setActiveImage(0);
    }, [product]);

    if (!product) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-brand/95 backdrop-blur-xl"
                        onClick={onClose}
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="bg-brand border border-white/10 rounded-3xl w-full max-w-5xl max-h-full overflow-hidden flex flex-col md:flex-row relative z-10"
                    >
                        <button
                            onClick={onClose}
                            className="absolute top-6 right-6 z-20 p-2 bg-brand/50 rounded-full hover:bg-accent/20 transition-colors"
                        >
                            <LucideIcon name="x" />
                        </button>

                        {/* Image Section */}
                        <div className="w-full md:w-1/2 p-6 md:p-10">
                            <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-white/5 mb-4">
                                <img
                                    src={product.images[activeImage]}
                                    alt={product.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="flex gap-4 overflow-x-auto pb-2 custom-scrollbar">
                                {product.images.map((img, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setActiveImage(idx)}
                                        className={`w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-all ${activeImage === idx ? 'border-accent' : 'border-transparent'}`}
                                    >
                                        <img src={img} className="w-full h-full object-cover" />
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Content Section */}
                        <div className="w-full md:w-1/2 p-6 md:p-10 md:pl-0 flex flex-col justify-center">
                            <span className="text-accent text-sm font-bold tracking-widest mb-2">{product.category.toUpperCase()}</span>
                            <h2 className="text-4xl font-bold mb-4">{product.name}</h2>
                            <p className="text-3xl font-light text-white/90 mb-6">{formatPrice(product.price)}</p>
                            <p className="text-white/60 mb-8 leading-relaxed">
                                {product.description}
                            </p>

                            <div className="space-y-4">
                                <button
                                    onClick={() => onAddToCart(product)}
                                    className="w-full bg-white text-brand hover:bg-accent hover:text-white py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-3"
                                >
                                    <LucideIcon name="shopping-cart" size={20} />
                                    TAMBAH KE KERANJANG
                                </button>
                                <button
                                    className="w-full border border-white/20 hover:border-accent hover:text-accent py-4 rounded-xl font-bold transition-all"
                                    onClick={() => {
                                        const msg = encodeURIComponent(`Halo TKTM, saya ingin beli ${product.name} seharga ${formatPrice(product.price)}.`);
                                        window.open(`https://wa.me/${CONFIG.WHATSAPP_NUMBER}?text=${msg}`, '_blank');
                                    }}
                                >
                                    BELI SEKARANG
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

const CartDrawer = ({ isOpen, onClose, cart, onRemove, onCheckout }) => {
    const total = cart.reduce((sum, item) => sum + item.price, 0);

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[110] flex justify-end">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-brand/80 backdrop-blur-sm"
                        onClick={onClose}
                    />

                    <motion.aside
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="relative w-full max-w-md bg-brand border-l border-white/10 h-full flex flex-col"
                    >
                        <div className="p-6 border-b border-white/10 flex justify-between items-center">
                            <h2 className="text-xl font-bold">KERANJANG ({cart.length})</h2>
                            <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full">
                                <LucideIcon name="x" />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
                            {cart.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-white/40 gap-4">
                                    <LucideIcon name="shopping-bag" size={48} />
                                    <p>Keranjang Anda masih kosong.</p>
                                </div>
                            ) : (
                                <div className="space-y-6">
                                    {cart.map((item, idx) => (
                                        <div key={idx} className="flex gap-4">
                                            <div className="w-20 h-24 rounded-lg overflow-hidden bg-white/5 flex-shrink-0">
                                                <img src={item.images[0]} className="w-full h-full object-cover" />
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="font-bold text-sm mb-1">{item.name}</h3>
                                                <p className="text-accent text-sm mb-3">{formatPrice(item.price)}</p>
                                                <button
                                                    onClick={() => onRemove(idx)}
                                                    className="text-[10px] font-bold text-white/40 hover:text-accent transition-colors tracking-widest"
                                                >
                                                    HAPUS
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {cart.length > 0 && (
                            <div className="p-6 border-t border-white/10 bg-white/[0.02]">
                                <div className="flex justify-between items-center mb-6">
                                    <span className="text-white/60">Total</span>
                                    <span className="text-xl font-bold text-accent">{formatPrice(total)}</span>
                                </div>
                                <button
                                    onClick={onCheckout}
                                    className="w-full bg-accent hover:bg-accent/80 text-white py-4 rounded-xl font-bold transition-all shadow-lg shadow-accent/20"
                                >
                                    CHECKOUT VIA WHATSAPP
                                </button>
                            </div>
                        )}
                    </motion.aside>
                </div>
            )}
        </AnimatePresence>
    );
};

const Toast = ({ message, type = 'success' }) => (
    <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 50, scale: 0.9 }}
        className={`fixed bottom-10 left-1/2 -translate-x-1/2 z-[200] px-6 py-3 rounded-full font-bold shadow-2xl flex items-center gap-3 ${type === 'success' ? 'bg-white text-[#0a0a0a]' : 'bg-accent text-white'}`}
    >
        <LucideIcon name={type === 'success' ? "check-circle" : "alert-circle"} size={18} />
        {message}
    </motion.div>
);

// --- MAIN APP ---
const App = () => {
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [activeCategory, setActiveCategory] = useState('Semua');
    const [searchQuery, setSearchQuery] = useState('');
    const [cart, setCart] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [toasts, setToasts] = useState([]);

    const addToast = (message) => {
        const id = Date.now();
        setToasts(prev => [...prev, { id, message }]);
        setTimeout(() => {
            setToasts(prev => prev.filter(t => t.id !== id));
        }, 3000);
    };

    const filteredProducts = useMemo(() => {
        return PRODUCTS.filter(p => {
            const matchesCategory = activeCategory === 'Semua' || p.category === activeCategory;
            const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesCategory && matchesSearch;
        });
    }, [activeCategory, searchQuery]);

    const addToCart = (product) => {
        setCart(prev => [...prev, product]);
        addToast(`Berhasil menambahkan ${product.name}`);
        setSelectedProduct(null);
    };

    const removeFromCart = (index) => {
        setCart(prev => prev.filter((_, i) => i !== index));
    };

    const handleCheckout = () => {
        const total = cart.reduce((sum, item) => sum + item.price, 0);
        const itemDetails = cart.map(item => `- ${item.name} (${formatPrice(item.price)})`).join('\n');
        const message = encodeURIComponent(`Halo TKTM,\nSaya ingin memesan:\n\n${itemDetails}\n\nTotal: ${formatPrice(total)}\n\nTerima kasih!`);

        window.open(`https://wa.me/${CONFIG.WHATSAPP_NUMBER}?text=${message}`, '_blank');

        // Checkout success
        addToast('Pembelian berhasil!');
        setCart([]);
        setIsCartOpen(false);
    };

    return (
        <div className="min-h-screen bg-brand overflow-x-hidden">
            <Navbar cartCount={cart.length} onCartClick={() => setIsCartOpen(true)} />
            <Hero />

            {/* Search & Filter */}
            <section id="koleksi" className="py-20 container mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16">
                    <div>
                        <h2 className="text-4xl font-bold mb-4">KOLEKSI KAMI</h2>
                        <div className="flex flex-wrap gap-4">
                            {CONFIG.CATEGORIES.map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => setActiveCategory(cat)}
                                    className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${activeCategory === cat ? 'bg-accent text-white' : 'bg-white/5 text-white/60 hover:bg-white/10'}`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="relative w-full md:w-80">
                        <LucideIcon name="search" className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" size={18} />
                        <input
                            type="text"
                            placeholder="Cari produk..."
                            className="w-full bg-white/5 border border-white/10 rounded-full py-3 pl-12 pr-6 focus:border-accent outline-none transition-all"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>

                {/* Grid */}
                {filteredProducts.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {filteredProducts.map(product => (
                            <ProductCard key={product.id} product={product} onClick={setSelectedProduct} />
                        ))}
                    </div>
                ) : (
                    <div className="py-20 text-center text-white/40 italic">
                        Tidak ada produk yang ditemukan.
                    </div>
                )}
            </section>

            {/* Footer */}
            <footer id="kontak" className="py-20 border-t border-white/5">
                <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
                    <div>
                        <h3 className="text-2xl font-bold text-accent mb-6">{CONFIG.BRAND_NAME}</h3>
                        <p className="text-white/40">Gaya sinematik untuk jiwa yang berani. Dibuat dengan presisi, dipakai dengan bangga.</p>
                    </div>
                    <div>
                        <h4 className="font-bold mb-6 tracking-widest text-sm">NAVIGASI</h4>
                        <ul className="space-y-4 text-white/60">
                            <li><a href="#" className="hover:text-accent">Home</a></li>
                            <li><a href="#koleksi" className="hover:text-accent">Koleksi</a></li>
                            <li><a href="#terbaru" className="hover:text-accent">Terbaru</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold mb-6 tracking-widest text-sm">HUBUNGI KAMI</h4>
                        <p className="text-white/60 mb-4">Butuh bantuan? Tim kami siap melayani Anda melalui WhatsApp.</p>
                        <a
                            href={`https://wa.me/${CONFIG.WHATSAPP_NUMBER}`}
                            target="_blank"
                            className="inline-flex items-center gap-2 text-accent font-bold hover:gap-4 transition-all"
                        >
                            CHAT SEKARANG <LucideIcon name="arrow-right" size={18} />
                        </a>
                    </div>
                </div>
                <div className="mt-20 pt-8 border-t border-white/5 text-center text-white/20 text-xs">
                    &copy; 2026 {CONFIG.BRAND_NAME} STUDIO. ALL RIGHTS RESERVED.
                </div>
            </footer>

            <ProductModal
                product={selectedProduct}
                isOpen={!!selectedProduct}
                onClose={() => setSelectedProduct(null)}
                onAddToCart={addToCart}
            />

            <CartDrawer
                isOpen={isCartOpen}
                onClose={() => setIsCartOpen(false)}
                cart={cart}
                onRemove={removeFromCart}
                onCheckout={handleCheckout}
            />

            <AnimatePresence>
                {toasts.map(t => (
                    <Toast key={t.id} message={t.message} />
                ))}
            </AnimatePresence>
        </div>
    );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
