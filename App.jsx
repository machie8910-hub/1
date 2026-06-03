const { useState, useEffect, useMemo, useRef } = React;

const CONFIG = {
    BRAND_NAME: 'TKTM',
    WHATSAPP_NUMBER: '6288973262022',
    CURRENCY: 'IDR',
    CATEGORY_LIST: ['Semua', 'Streetwear', 'Aksesoris', 'Koleksi'],
};

const INITIAL_PRODUCTS = [
    {
        id: 1,
        name: 'Noir Oversized Hoodie',
        price: 450000,
        category: 'Streetwear',
        image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=800&auto=format&fit=crop',
        images: [
            'https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=800&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=800&auto=format&fit=crop'
        ],
        description: 'Hoodie oversized dengan bahan cotton fleece premium. Desain minimalis untuk tampilan urban yang modern.',
        rating: 4.9,
        reviews: 128
    },
    {
        id: 2,
        name: 'Cyberpunk Tech Runner',
        price: 850000,
        category: 'Koleksi',
        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=800&auto=format&fit=crop',
        images: [
            'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=800&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?q=80&w=800&auto=format&fit=crop'
        ],
        description: 'Sepatu lari dengan desain futuristik dan teknologi bantalan terbaru untuk kenyamanan maksimal.',
        rating: 4.8,
        reviews: 85
    },
    {
        id: 3,
        name: 'Midnight Cargo Pants',
        price: 380000,
        category: 'Streetwear',
        image: 'https://images.unsplash.com/photo-1552912858-040244db3b5c?q=80&w=800&auto=format&fit=crop',
        images: [
            'https://images.unsplash.com/photo-1552912858-040244db3b5c?q=80&w=800&auto=format&fit=crop'
        ],
        description: 'Celana cargo dengan banyak kantong fungsional dan potongan slim-fit yang stylish.',
        rating: 4.7,
        reviews: 56
    },
    {
        id: 4,
        name: 'Phantom Graphite Cap',
        price: 150000,
        category: 'Aksesoris',
        image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?q=80&w=800&auto=format&fit=crop',
        images: [
            'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?q=80&w=800&auto=format&fit=crop'
        ],
        description: 'Topi baseball dengan material berkualitas dan bordir logo TKTM yang eksklusif.',
        rating: 4.9,
        reviews: 210
    },
    {
        id: 5,
        name: 'Eclipse Leather Wallet',
        price: 250000,
        category: 'Aksesoris',
        image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?q=80&w=800&auto=format&fit=crop',
        images: [
            'https://images.unsplash.com/photo-1627123424574-724758594e93?q=80&w=800&auto=format&fit=crop'
        ],
        description: 'Dompet kulit asli dengan desain tipis dan kompartemen kartu yang terorganisir.',
        rating: 4.6,
        reviews: 42
    },
    {
        id: 6,
        name: 'Vortex Graphic Tee',
        price: 180000,
        category: 'Streetwear',
        image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=800&auto=format&fit=crop',
        images: [
            'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=800&auto=format&fit=crop'
        ],
        description: 'Kaos cotton combed 30s dengan sablon desain grafis yang bold dan tahan lama.',
        rating: 4.8,
        reviews: 195
    }
];

// Helper for Lucide Icons with batched rendering
const LucideIcon = ({ name, className = '', size = 24 }) => {
    const iconRef = useRef(null);

    useEffect(() => {
        if (window.lucide) {
            const timeout = setTimeout(() => {
                window.lucide.createIcons({
                    attrs: {
                        class: className,
                        'stroke-width': 2,
                        width: size,
                        height: size,
                    },
                    nameAttr: 'data-lucide',
                });
            }, 0);
            return () => clearTimeout(timeout);
        }
    }, [name, className, size]);

    return <i data-lucide={name} ref={iconRef} className={className}></i>;
};

// Framer Motion helper
const Motion = window.Motion || {
    div: ({ children, ...props }) => <div {...props}>{children}</div>,
    button: ({ children, ...props }) => <button {...props}>{children}</button>,
    section: ({ children, ...props }) => <section {...props}>{children}</section>,
    nav: ({ children, ...props }) => <nav {...props}>{children}</nav>,
};

const App = () => {
    const [products] = useState(INITIAL_PRODUCTS);
    const [cart, setCart] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('Semua');
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [toast, setToast] = useState(null);
    const [activeImageIdx, setActiveImageIdx] = useState(0);

    const filteredProducts = useMemo(() => {
        return products.filter(p => {
            const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesCategory = selectedCategory === 'Semua' || p.category === selectedCategory;
            return matchesSearch && matchesCategory;
        });
    }, [products, searchQuery, selectedCategory]);

    const formatPrice = (price) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(price);
    };

    const showToast = (message) => {
        setToast(message);
        setTimeout(() => setToast(null), 3000);
    };

    const addToCart = (product) => {
        setCart(prev => {
            const existing = prev.find(item => item.id === product.id);
            if (existing) {
                return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
            }
            return [...prev, { ...product, quantity: 1 }];
        });
        showToast(`${product.name} ditambahkan ke keranjang`);
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
    const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

    const handleCheckout = () => {
        if (cart.length === 0) return;
        const itemsList = cart.map(item => `- ${item.name} (x${item.quantity})`).join('\n');
        const message = `Halo TKTM, saya ingin memesan:\n\n${itemsList}\n\nTotal: ${formatPrice(cartTotal)}\n\nTerima kasih!`;
        const encodedMessage = encodeURIComponent(message);
        window.open(`https://wa.me/${CONFIG.WHATSAPP_NUMBER}?text=${encodedMessage}`, '_blank');
        setCart([]);
        setIsCartOpen(false);
        showToast('Pembelian berhasil!');
    };

    const buyNow = (product) => {
        const message = `Halo TKTM, saya ingin memesan:\n- ${product.name} (x1)\n\nTotal: ${formatPrice(product.price)}\n\nTerima kasih!`;
        const encodedMessage = encodeURIComponent(message);
        window.open(`https://wa.me/${CONFIG.WHATSAPP_NUMBER}?text=${encodedMessage}`, '_blank');
    };

    useEffect(() => {
        if (selectedProduct) {
            setActiveImageIdx(0);
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    }, [selectedProduct]);

    return (
        <div className="min-h-screen flex flex-col font-sans">
            {/* Navigation */}
            <nav className="sticky top-0 z-40 bg-brand/80 backdrop-blur-lg border-b border-white/5">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center gap-8">
                            <h1 className="text-2xl font-black tracking-tighter text-white">
                                {CONFIG.BRAND_NAME}<span className="text-accent">.</span>
                            </h1>
                            <div className="hidden md:flex items-center gap-6">
                                {['Shop', 'Koleksi', 'Kontak'].map(link => (
                                    <a key={link} href={`#${link.toLowerCase()}`} className="text-sm font-medium text-gray-400 hover:text-white transition-colors">
                                        {link}
                                    </a>
                                ))}
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="relative hidden sm:block">
                                <LucideIcon name="search" className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                                <input
                                    type="text"
                                    placeholder="Cari produk..."
                                    className="bg-white/5 border border-white/10 rounded-full py-1.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 w-64 transition-all"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                            <button
                                onClick={() => setIsCartOpen(true)}
                                aria-label="Keranjang"
                                className="relative p-2 text-gray-400 hover:text-white transition-colors"
                            >
                                <LucideIcon name="shopping-cart" />
                                {cartCount > 0 && (
                                    <span className="absolute top-0 right-0 bg-accent text-white text-[10px] font-bold h-4 w-4 flex items-center justify-center rounded-full">
                                        {cartCount}
                                    </span>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section id="shop" className="relative h-[70vh] flex items-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2000&auto=format&fit=crop"
                        className="w-full h-full object-cover opacity-40 scale-105"
                        alt="Hero background"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand via-brand/20 to-transparent"></div>
                </div>
                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left">
                    <h2 className="text-5xl sm:text-7xl font-extrabold tracking-tight mb-4 animate-in">
                        ESTETIKA <span className="text-accent">URBAN</span>
                    </h2>
                    <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mb-8 animate-in" style={{ animationDelay: '0.1s' }}>
                        Temukan koleksi eksklusif streetwear yang menggabungkan kenyamanan maksimal dengan desain sinematik yang berani.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 animate-in" style={{ animationDelay: '0.2s' }}>
                        <a href="#koleksi" className="btn-primary">Lihat Koleksi</a>
                        <button className="btn-secondary">Tentang Kami</button>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <main id="koleksi" className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                {/* Category Tabs */}
                <div className="flex items-center gap-2 mb-12 overflow-x-auto pb-4 no-scrollbar">
                    {CONFIG.CATEGORY_LIST.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={`px-6 py-2 rounded-full text-sm font-semibold transition-all whitespace-nowrap ${
                                selectedCategory === cat
                                ? 'bg-accent text-white shadow-lg shadow-accent/20'
                                : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/5'
                            }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Product Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredProducts.map((product, idx) => (
                        <div
                            key={product.id}
                            className="glass-card group animate-in"
                            style={{ animationDelay: `${idx * 0.1}s` }}
                        >
                            <div
                                className="relative aspect-[4/5] overflow-hidden cursor-pointer"
                                onClick={() => setSelectedProduct(product)}
                            >
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-brand/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                <button
                                    onClick={(e) => { e.stopPropagation(); addToCart(product); }}
                                    aria-label="Tambah ke keranjang"
                                    className="absolute bottom-4 right-4 p-3 bg-white text-brand rounded-full translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 hover:bg-accent hover:text-white"
                                >
                                    <LucideIcon name="plus" size={20} />
                                </button>
                                <div className="absolute top-4 left-4 bg-accent/90 text-white text-[10px] font-black px-2 py-1 rounded uppercase tracking-widest">
                                    {product.category}
                                </div>
                            </div>
                            <div className="p-6">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="font-bold text-lg group-hover:text-accent transition-colors">
                                        {product.name}
                                    </h3>
                                    <div className="flex items-center gap-1 text-xs text-yellow-500 font-bold">
                                        <LucideIcon name="star" size={12} className="fill-current" />
                                        {product.rating}
                                    </div>
                                </div>
                                <p className="text-gray-400 text-sm mb-4 line-clamp-2">{product.description}</p>
                                <div className="flex items-center justify-between">
                                    <span className="text-xl font-black text-white">{formatPrice(product.price)}</span>
                                    <button
                                        onClick={() => buyNow(product)}
                                        className="text-xs font-bold uppercase tracking-widest text-accent hover:text-white transition-colors"
                                    >
                                        Beli Sekarang
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </main>

            {/* Shopping Cart Drawer */}
            {isCartOpen && (
                <div className="fixed inset-0 z-50 flex justify-end">
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsCartOpen(false)}></div>
                    <div className="relative w-full max-w-md bg-brand h-full shadow-2xl border-l border-white/5 flex flex-col animate-in">
                        <div className="p-6 border-b border-white/5 flex justify-between items-center">
                            <h2 className="text-xl font-black">KERANJANG ({cartCount})</h2>
                            <button onClick={() => setIsCartOpen(false)} className="p-2 hover:bg-white/5 rounded-full transition-colors">
                                <LucideIcon name="x" />
                            </button>
                        </div>

                        <div className="flex-grow overflow-y-auto p-6 space-y-6">
                            {cart.length === 0 ? (
                                <div className="text-center py-20">
                                    <LucideIcon name="shopping-bag" className="mx-auto mb-4 text-gray-700" size={64} />
                                    <p className="text-gray-500 font-medium">Keranjang Anda kosong</p>
                                    <button
                                        onClick={() => setIsCartOpen(false)}
                                        className="mt-4 text-accent text-sm font-bold uppercase tracking-widest"
                                    >
                                        Mulai Belanja
                                    </button>
                                </div>
                            ) : (
                                cart.map(item => (
                                    <div key={item.id} className="flex gap-4">
                                        <div className="w-20 h-24 rounded-lg overflow-hidden flex-shrink-0">
                                            <img src={item.image} className="w-full h-full object-cover" alt={item.name} />
                                        </div>
                                        <div className="flex-grow">
                                            <h4 className="font-bold text-sm mb-1">{item.name}</h4>
                                            <p className="text-accent text-sm font-black mb-3">{formatPrice(item.price)}</p>
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-3 bg-white/5 rounded-full px-3 py-1">
                                                    <button onClick={() => updateQuantity(item.id, -1)} className="text-gray-400 hover:text-white"><LucideIcon name="minus" size={14} /></button>
                                                    <span className="text-xs font-bold w-4 text-center">{item.quantity}</span>
                                                    <button onClick={() => updateQuantity(item.id, 1)} className="text-gray-400 hover:text-white"><LucideIcon name="plus" size={14} /></button>
                                                </div>
                                                <button onClick={() => removeFromCart(item.id)} className="text-gray-500 hover:text-red-500 transition-colors">
                                                    <LucideIcon name="trash-2" size={16} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        {cart.length > 0 && (
                            <div className="p-6 border-t border-white/5 space-y-4 bg-white/5 backdrop-blur-xl">
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-400 font-medium">Total</span>
                                    <span className="text-2xl font-black">{formatPrice(cartTotal)}</span>
                                </div>
                                <button onClick={handleCheckout} className="btn-primary w-full py-4 text-lg">
                                    Checkout via WhatsApp
                                </button>
                                <p className="text-[10px] text-center text-gray-500 uppercase tracking-widest font-bold">
                                    Pengiriman seluruh Indonesia
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Product Detail Modal */}
            {selectedProduct && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={() => setSelectedProduct(null)}></div>
                    <div className="relative w-full max-w-4xl bg-brand rounded-3xl overflow-hidden border border-white/10 shadow-2xl flex flex-col md:flex-row animate-in">
                        <button
                            onClick={() => setSelectedProduct(null)}
                            className="absolute top-4 right-4 z-10 p-2 bg-brand/50 hover:bg-brand rounded-full text-white backdrop-blur-md border border-white/10"
                        >
                            <LucideIcon name="x" />
                        </button>

                        <div className="w-full md:w-1/2 bg-black flex flex-col">
                            <div className="relative aspect-[4/5] overflow-hidden">
                                <img
                                    src={selectedProduct.images[activeImageIdx]}
                                    className="w-full h-full object-cover animate-in"
                                    key={activeImageIdx}
                                    alt={selectedProduct.name}
                                />
                            </div>
                            {selectedProduct.images.length > 1 && (
                                <div className="flex gap-2 p-4 overflow-x-auto bg-white/5">
                                    {selectedProduct.images.map((img, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => setActiveImageIdx(idx)}
                                            className={`w-16 h-20 rounded-lg overflow-hidden border-2 transition-all ${activeImageIdx === idx ? 'border-accent' : 'border-transparent opacity-50'}`}
                                        >
                                            <img src={img} className="w-full h-full object-cover" alt={`${selectedProduct.name} ${idx}`} />
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
                            <div className="mb-6">
                                <span className="text-accent text-xs font-black uppercase tracking-widest mb-2 block">{selectedProduct.category}</span>
                                <h2 className="text-3xl font-black mb-2">{selectedProduct.name}</h2>
                                <div className="flex items-center gap-4 text-sm text-gray-400">
                                    <div className="flex items-center gap-1 text-yellow-500">
                                        <LucideIcon name="star" size={14} className="fill-current" />
                                        <span className="font-bold">{selectedProduct.rating}</span>
                                    </div>
                                    <span>•</span>
                                    <span>{selectedProduct.reviews} Ulasan</span>
                                </div>
                            </div>

                            <p className="text-gray-400 leading-relaxed mb-8">{selectedProduct.description}</p>

                            <div className="mb-8">
                                <span className="text-3xl font-black text-white">{formatPrice(selectedProduct.price)}</span>
                            </div>

                            <div className="flex flex-col gap-4">
                                <button
                                    onClick={() => { addToCart(selectedProduct); setSelectedProduct(null); }}
                                    className="btn-primary w-full py-4 text-lg"
                                >
                                    Tambah ke Keranjang
                                </button>
                                <button
                                    onClick={() => buyNow(selectedProduct)}
                                    className="btn-secondary w-full py-4"
                                >
                                    Beli Langsung via WA
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Footer */}
            <footer className="bg-white/5 border-t border-white/5 py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-2xl font-black tracking-tighter mb-4 text-white">
                        {CONFIG.BRAND_NAME}<span className="text-accent">.</span>
                    </h2>
                    <p className="text-gray-500 text-sm max-w-md mx-auto mb-8">
                        Melayani kebutuhan streetwear sinematik Anda dengan kualitas tanpa kompromi.
                    </p>
                    <div className="flex justify-center gap-6 mb-8">
                        {['instagram', 'twitter', 'facebook'].map(social => (
                            <a key={social} href="#" className="p-2 text-gray-500 hover:text-accent transition-colors">
                                <LucideIcon name={social} size={20} />
                            </a>
                        ))}
                    </div>
                    <p className="text-gray-600 text-[10px] uppercase tracking-widest font-bold">
                        &copy; 2024 {CONFIG.BRAND_NAME} Studio. All Rights Reserved.
                    </p>
                </div>
            </footer>

            {/* Toast Notification */}
            {toast && (
                <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[60] animate-in">
                    <div className="bg-white text-[#0a0a0a] px-6 py-3 rounded-full font-bold shadow-2xl flex items-center gap-3">
                        <LucideIcon name="check-circle" size={18} className="text-green-600" />
                        {toast}
                    </div>
                </div>
            )}
        </div>
    );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
