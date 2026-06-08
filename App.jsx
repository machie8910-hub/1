const { useState, useEffect, useMemo } = React;
const Motion = window.Motion || { motion: { div: 'div', nav: 'nav', button: 'button', h1: 'h1', p: 'p', section: 'section' } };
const { motion, AnimatePresence } = Motion;

// Lucide Icon Helper
const LucideIcon = ({ name, className = "" }) => {
    useEffect(() => {
        if (window.lucide) {
            const timer = setTimeout(() => {
                window.lucide.createIcons({
                    attrs: { class: className },
                    nameAttr: 'data-lucide'
                });
            }, 0);
            return () => clearTimeout(timer);
        }
    }, [name, className]);

    return <i data-lucide={name} className={className}></i>;
};

const App = () => {
    const [cart, setCart] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [activeImageIndex, setActiveImageIndex] = useState(0);
    const [toasts, setToasts] = useState([]);

    useEffect(() => {
        if (selectedProduct) {
            setActiveImageIndex(0);
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [selectedProduct]);

    const products = [
        {
            id: 1,
            name: "Vanguard Tech Jacket",
            price: 1250000,
            category: "Outerwear",
            images: [
                "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=2000&auto=format&fit=cover",
                "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?q=80&w=2000&auto=format&fit=cover"
            ],
            description: "Jaket teknis dengan material water-resistant dan desain modular untuk mobilitas urban maksimal."
        },
        {
            id: 2,
            name: "Neo-Tokyo Oversized Hoodie",
            price: 850000,
            category: "Streetwear",
            images: [
                "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=2000&auto=format&fit=cover",
                "https://images.unsplash.com/photo-1509948914842-aee44befb39b?q=80&w=2000&auto=format&fit=cover"
            ],
            description: "Hoodie premium dengan bahan fleece berat dan grafis minimalis yang terinspirasi dari estetika masa depan."
        },
        {
            id: 3,
            name: "Cyber-Link Cargo Pants",
            price: 950000,
            category: "Bottoms",
            images: [
                "https://images.unsplash.com/photo-1624372933342-6aee3bc354d5?q=80&w=2000&auto=format&fit=cover",
                "https://images.unsplash.com/photo-1517441581617-1471d241743f?q=80&w=2000&auto=format&fit=cover"
            ],
            description: "Celana kargo dengan saku multifungsi dan potongan tapered yang modern."
        },
        {
            id: 4,
            name: "Obsidian Stealth Backpack",
            price: 1500000,
            category: "Accessories",
            images: [
                "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=2000&auto=format&fit=cover",
                "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?q=80&w=2000&auto=format&fit=cover"
            ],
            description: "Tas punggung ergonomis dengan kompartemen laptop terlindungi dan material anti-gores."
        },
        {
            id: 5,
            name: "Phantom Mesh Sneakers",
            price: 2100000,
            category: "Footwear",
            images: [
                "https://images.unsplash.com/photo-1552346154-21d32810aba3?q=80&w=2000&auto=format&fit=cover",
                "https://images.unsplash.com/photo-1514989940723-e8e51635b782?q=80&w=2000&auto=format&fit=cover"
            ],
            description: "Sneakers ultra-ringan dengan sol responsif dan desain breathability tinggi."
        },
        {
            id: 6,
            name: "Titanium Frame Sunglasses",
            price: 650000,
            category: "Accessories",
            images: [
                "https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=2000&auto=format&fit=cover",
                "https://images.unsplash.com/photo-1511499767390-a73359586721?q=80&w=2000&auto=format&fit=cover"
            ],
            description: "Kacamata dengan bingkai titanium ringan dan lensa polarized anti-UV."
        }
    ];

    const filteredProducts = useMemo(() => {
        return products.filter(p =>
            p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.category.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [searchQuery, products]);

    const addToCart = (product) => {
        setCart(prev => [...prev, { ...product, cartId: Date.now() }]);
        addToast(`"${product.name}" ditambahkan ke keranjang`);
    };

    const addToast = (message) => {
        const id = Date.now();
        setToasts(prev => [...prev, { id, message }]);
        setTimeout(() => {
            setToasts(prev => prev.filter(t => t.id !== id));
        }, 3000);
    };

    const formatPrice = (price) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(price);
    };

    const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);

    const generateWhatsAppMessage = (items) => {
        const phone = "6288973262022";
        let message = "Halo TKTM, saya ingin memesan:\n\n";
        items.forEach((item, index) => {
            message += `${index + 1}. ${item.name} - ${formatPrice(item.price)}\n`;
        });
        message += `\nTotal: ${formatPrice(items.reduce((sum, i) => sum + i.price, 0))}\n\nMohon informasi selanjutnya. Terima kasih!`;
        return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    };

    const checkout = () => {
        if (cart.length === 0) return;
        window.open(generateWhatsAppMessage(cart), '_blank');
        setCart([]);
        setIsCartOpen(false);
        addToast("Pesanan dikirim! Keranjang telah dikosongkan.");
    };

    const removeFromCart = (cartId) => {
        setCart(prev => prev.filter(item => item.cartId !== cartId));
    };

    return (
        <div className="min-h-screen flex flex-col">
            {/* Navbar */}
            <nav className="sticky top-0 z-50 glass-panel border-b border-white/5 py-4 px-6">
                <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center rotate-3">
                            <LucideIcon name="shopping-bag" className="text-white w-6 h-6" />
                        </div>
                        <span className="text-2xl font-black tracking-tighter text-white">TKTM</span>
                    </div>

                    <div className="flex-1 max-w-md hidden md:block">
                        <div className="relative">
                            <LucideIcon name="search" className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40 w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Cari koleksi terbaik..."
                                className="w-full bg-white/5 border border-white/10 rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <button
                            aria-label="Keranjang"
                            className="relative p-2 hover:bg-white/10 rounded-full transition-colors"
                            onClick={() => setIsCartOpen(true)}
                        >
                            <LucideIcon name="shopping-cart" className="w-6 h-6" />
                            {cart.length > 0 && (
                                <span className="absolute -top-1 -right-1 bg-accent text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-brand">
                                    {cart.length}
                                </span>
                            )}
                        </button>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <header className="relative h-[70vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand/80 to-brand z-10"></div>
                    <img
                        src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=cover"
                        className="w-full h-full object-cover opacity-40 scale-105"
                        alt="Hero background"
                    />
                </div>

                <div className="relative z-20 max-w-4xl px-6 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-widest uppercase bg-accent/10 text-accent border border-accent/20 rounded-full">
                            Koleksi Premium 2026
                        </span>
                        <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
                            GAYA <span className="text-accent italic">CINEMATIC</span><br/>UNTUK JIWA YANG BERANI
                        </h1>
                        <p className="text-lg md:text-xl text-white/60 mb-10 max-w-2xl mx-auto font-medium">
                            Temukan kurasi produk terbaik dengan sentuhan desain minimalis dan kualitas tanpa kompromi.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <a href="#koleksi" className="btn-accent text-lg px-10 py-4 w-full sm:w-auto">
                                Belanja Sekarang
                            </a>
                            <button className="px-10 py-4 rounded-full font-bold bg-white/5 hover:bg-white/10 transition-all border border-white/10 w-full sm:w-auto">
                                Lihat Katalog
                            </button>
                        </div>
                    </motion.div>
                </div>
            </header>

            <main id="koleksi" className="flex-1 max-w-7xl mx-auto px-6 py-12 w-full">
                <div className="flex items-center justify-between mb-12">
                    <div>
                        <h2 className="text-3xl font-black mb-2 tracking-tight">KOLEKSI TERBARU</h2>
                        <div className="h-1 w-20 bg-accent"></div>
                    </div>
                    <div className="flex gap-2">
                        {['Semua', 'Outerwear', 'Streetwear', 'Bottoms', 'Footwear', 'Accessories'].map(cat => (
                            <button
                                key={cat}
                                onClick={() => setSearchQuery(cat === 'Semua' ? '' : cat)}
                                className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                                    (cat === 'Semua' && searchQuery === '') || searchQuery === cat
                                    ? 'bg-accent text-white'
                                    : 'bg-white/5 hover:bg-white/10 text-white/60'
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {filteredProducts.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredProducts.map((product, idx) => (
                            <motion.div
                                key={product.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                className="group relative glass-panel rounded-2xl overflow-hidden animate-in"
                            >
                                <div
                                    className="aspect-[4/5] overflow-hidden cursor-pointer relative"
                                    onClick={() => setSelectedProduct(product)}
                                >
                                    <img
                                        src={product.images[0]}
                                        alt={product.name}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-brand/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                                        <div className="w-12 h-12 bg-white text-brand rounded-full flex items-center justify-center">
                                            <LucideIcon name="eye" className="w-6 h-6" />
                                        </div>
                                    </div>
                                    <div className="absolute top-4 left-4">
                                        <span className="bg-brand/80 backdrop-blur-md text-[10px] font-bold px-3 py-1 rounded-full border border-white/10 uppercase tracking-widest">
                                            {product.category}
                                        </span>
                                    </div>
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-bold mb-1 group-hover:text-accent transition-colors">{product.name}</h3>
                                    <p className="text-white/40 text-sm mb-4 line-clamp-1">{product.description}</p>
                                    <div className="flex items-center justify-between">
                                        <span className="text-lg font-black text-white">{formatPrice(product.price)}</span>
                                        <button
                                            aria-label="Tambah produk ke keranjang"
                                            onClick={() => addToCart(product)}
                                            className="w-10 h-10 bg-accent hover:bg-accent-hover rounded-full flex items-center justify-center transition-all active:scale-90"
                                        >
                                            <LucideIcon name="plus" className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-40 text-white/20">
                        <LucideIcon name="search-slash" className="w-20 h-20 mb-4 opacity-50" />
                        <p className="text-2xl font-black">Produk tidak ditemukan</p>
                        <button
                            onClick={() => setSearchQuery('')}
                            className="mt-4 text-accent font-bold hover:underline"
                        >
                            Lihat semua koleksi
                        </button>
                    </div>
                )}
            </main>

            {/* Footer */}
            {/* Toast Notifications */}
            <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] flex flex-col gap-3 pointer-events-none">
                <AnimatePresence>
                    {toasts.map(toast => (
                        <motion.div
                            key={toast.id}
                            initial={{ opacity: 0, y: 20, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="bg-white text-[#0a0a0a] px-6 py-3 rounded-full shadow-2xl font-bold flex items-center gap-3 border border-white/10"
                        >
                            <LucideIcon name="check-circle" className="w-5 h-5 text-accent" />
                            {toast.message}
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {/* Product Details Modal */}
            <AnimatePresence>
                {selectedProduct && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedProduct(null)}
                            className="fixed inset-0 bg-brand/95 backdrop-blur-xl z-[80]"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="fixed inset-4 md:inset-12 lg:inset-24 bg-white/5 border border-white/10 rounded-3xl z-[90] overflow-hidden flex flex-col md:flex-row"
                        >
                            <button
                                onClick={() => setSelectedProduct(null)}
                                className="absolute top-6 right-6 w-12 h-12 bg-brand/50 hover:bg-accent rounded-full flex items-center justify-center z-10 transition-colors"
                            >
                                <LucideIcon name="x" className="w-6 h-6" />
                            </button>

                            <div className="md:w-1/2 h-[40vh] md:h-full bg-brand/20 relative group">
                                <img
                                    src={selectedProduct.images[activeImageIndex]}
                                    alt={selectedProduct.name}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3">
                                    {selectedProduct.images.map((img, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => setActiveImageIndex(idx)}
                                            className={`w-3 h-3 rounded-full transition-all ${idx === activeImageIndex ? 'bg-accent w-8' : 'bg-white/20'}`}
                                        />
                                    ))}
                                </div>
                            </div>

                            <div className="flex-1 p-8 md:p-12 overflow-y-auto">
                                <div className="max-w-md">
                                    <span className="text-accent font-black uppercase tracking-widest text-xs mb-4 block">
                                        {selectedProduct.category}
                                    </span>
                                    <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight uppercase tracking-tighter">
                                        {selectedProduct.name}
                                    </h2>
                                    <div className="text-3xl font-black mb-8 text-white">
                                        {formatPrice(selectedProduct.price)}
                                    </div>
                                    <p className="text-white/60 text-lg mb-12 leading-relaxed">
                                        {selectedProduct.description}
                                    </p>

                                    <div className="flex flex-col sm:flex-row gap-4">
                                        <button
                                            onClick={() => {
                                                addToCart(selectedProduct);
                                                setSelectedProduct(null);
                                            }}
                                            className="btn-accent flex-1 py-4 flex items-center justify-center gap-3"
                                        >
                                            <LucideIcon name="shopping-cart" className="w-5 h-5" />
                                            Tambah ke Keranjang
                                        </button>
                                        <button
                                            onClick={() => {
                                                window.open(generateWhatsAppMessage([selectedProduct]), '_blank');
                                                addToast("Membuka WhatsApp...");
                                            }}
                                            className="px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full font-bold transition-all flex items-center justify-center gap-3"
                                        >
                                            <LucideIcon name="zap" className="w-5 h-5" />
                                            Beli Sekarang
                                        </button>
                                    </div>

                                    <div className="mt-12 pt-12 border-t border-white/5 grid grid-cols-2 gap-8">
                                        <div className="flex gap-4">
                                            <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0">
                                                <LucideIcon name="truck" className="w-5 h-5 text-accent" />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-xs uppercase mb-1">Pengiriman Cepat</h4>
                                                <p className="text-white/40 text-[10px]">2-3 hari kerja nasional</p>
                                            </div>
                                        </div>
                                        <div className="flex gap-4">
                                            <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0">
                                                <LucideIcon name="shield-check" className="w-5 h-5 text-accent" />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-xs uppercase mb-1">Garansi Produk</h4>
                                                <p className="text-white/40 text-[10px]">100% Original & Berkualitas</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </>
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
                            className="fixed inset-0 bg-brand/80 backdrop-blur-sm z-[60]"
                        />
                        <motion.div
                            id="cart-drawer"
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="fixed right-0 top-0 h-full w-full max-w-md bg-brand border-l border-white/10 z-[70] flex flex-col"
                        >
                            <div className="p-6 border-b border-white/10 flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <LucideIcon name="shopping-cart" className="w-6 h-6 text-accent" />
                                    <h2 className="text-xl font-black">KERANJANG</h2>
                                </div>
                                <button
                                    onClick={() => setIsCartOpen(false)}
                                    className="p-2 hover:bg-white/5 rounded-full transition-colors"
                                >
                                    <LucideIcon name="x" className="w-6 h-6" />
                                </button>
                            </div>

                            <div className="flex-1 overflow-y-auto p-6 space-y-6">
                                {cart.length === 0 ? (
                                    <div className="h-full flex flex-col items-center justify-center text-white/20">
                                        <LucideIcon name="shopping-bag" className="w-20 h-20 mb-4 opacity-50" />
                                        <p className="text-xl font-bold">Keranjang kosong</p>
                                        <button
                                            onClick={() => setIsCartOpen(false)}
                                            className="mt-4 text-accent font-bold hover:underline"
                                        >
                                            Mulai belanja
                                        </button>
                                    </div>
                                ) : (
                                    cart.map((item) => (
                                        <div key={item.cartId} className="flex gap-4 group">
                                            <div className="w-20 h-24 rounded-lg overflow-hidden flex-shrink-0 border border-white/5">
                                                <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover" />
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="font-bold text-sm mb-1">{item.name}</h4>
                                                <p className="text-accent font-black">{formatPrice(item.price)}</p>
                                                <button
                                                    onClick={() => removeFromCart(item.cartId)}
                                                    className="text-[10px] uppercase font-bold text-white/30 hover:text-white mt-2 transition-colors"
                                                >
                                                    Hapus
                                                </button>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>

                            {cart.length > 0 && (
                                <div className="p-6 border-t border-white/10 glass-panel">
                                    <div className="flex items-center justify-between mb-6">
                                        <span className="text-white/40 font-bold uppercase text-xs">Total Pembayaran</span>
                                        <span className="text-2xl font-black text-white">{formatPrice(totalPrice)}</span>
                                    </div>
                                    <button
                                        onClick={checkout}
                                        className="w-full btn-accent py-4 flex items-center justify-center gap-3"
                                    >
                                        <LucideIcon name="message-circle" className="w-5 h-5" />
                                        Checkout via WhatsApp
                                    </button>
                                    <p className="text-[10px] text-center text-white/30 mt-4">
                                        Harga sudah termasuk pajak. Pengiriman dihitung saat konfirmasi WhatsApp.
                                    </p>
                                </div>
                            )}
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            <footer className="py-12 px-6 border-t border-white/5 glass-panel mt-auto">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
                    <div className="col-span-1 md:col-span-2">
                        <div className="flex items-center gap-2 mb-6">
                            <div className="w-8 h-8 bg-accent rounded flex items-center justify-center">
                                <LucideIcon name="shopping-bag" className="text-white w-5 h-5" />
                            </div>
                            <span className="text-xl font-black tracking-tighter text-white">TKTM</span>
                        </div>
                        <p className="text-white/40 max-w-sm mb-8">
                            Toko Koleksi Terlengkap (TKTM) menghadirkan produk kurasi terbaik dengan standar kualitas global untuk memenuhi kebutuhan gaya hidup modern Anda.
                        </p>
                        <div className="flex gap-4">
                            {['instagram', 'twitter', 'facebook', 'youtube'].map(social => (
                                <button key={social} className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-accent transition-colors">
                                    <LucideIcon name={social} className="w-5 h-5" />
                                </button>
                            ))}
                        </div>
                    </div>
                    <div>
                        <h4 className="font-bold mb-6 uppercase text-xs tracking-widest text-accent">Navigasi</h4>
                        <ul className="space-y-4 text-white/60">
                            <li><a href="#" className="hover:text-white transition-colors">Beranda</a></li>
                            <li><a href="#koleksi" className="hover:text-white transition-colors">Koleksi</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Terbaru</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Tentang Kami</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold mb-6 uppercase text-xs tracking-widest text-accent">Kontak</h4>
                        <ul className="space-y-4 text-white/60">
                            <li className="flex items-center gap-3">
                                <LucideIcon name="mail" className="w-4 h-4" /> info@tktm.shop
                            </li>
                            <li className="flex items-center gap-3">
                                <LucideIcon name="phone" className="w-4 h-4" /> +62 889 7326 2022
                            </li>
                            <li className="flex items-center gap-3">
                                <LucideIcon name="map-pin" className="w-4 h-4" /> Jakarta, Indonesia
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="max-w-7xl mx-auto pt-12 mt-12 border-t border-white/5 text-center text-white/20 text-sm">
                    &copy; 2026 TKTM - Toko Koleksi Terlengkap. All rights reserved.
                </div>
            </footer>
        </div>
    );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
