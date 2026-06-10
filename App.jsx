const { useState, useEffect, useMemo, useRef } = React;

// --- CONFIG & DATA ---
const CONFIG = {
    whatsappNumber: "6288973262022",
    brandName: "TKTM",
    currency: "Rp",
};

const PRODUCTS = [
    {
        id: 1,
        name: "Casual Streetwear Hoodie",
        price: 350000,
        category: "Koleksi",
        description: "Hoodie premium dengan bahan katun fleece yang nyaman dan desain minimalis. Cocok untuk tampilan casual sehari-hari.",
        images: [
            "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1578587018452-892bacefd3f2?q=80&w=800&auto=format&fit=crop"
        ],
        isNew: true
    },
    {
        id: 2,
        name: "Classic Denim Jacket",
        price: 450000,
        category: "Koleksi",
        description: "Jaket denim timeless dengan detail wash yang artistik. Menambah kesan maskulin dan stylish pada penampilan Anda.",
        images: [
            "https://images.unsplash.com/photo-1576871337622-98d48d1cf021?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1551537482-f2075a1d41f2?q=80&w=800&auto=format&fit=crop"
        ],
        isNew: false
    },
    {
        id: 3,
        name: "Slim Fit Chino Pants",
        price: 275000,
        category: "Terbaru",
        description: "Celana chino slim fit yang elastis dan nyaman dipakai sepanjang hari. Pilihan tepat untuk gaya formal maupun casual.",
        images: [
            "https://images.unsplash.com/photo-1624371414361-e67094c14d6d?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?q=80&w=800&auto=format&fit=crop"
        ],
        isNew: true
    },
    {
        id: 4,
        name: "Graphic Oversized Tee",
        price: 185000,
        category: "Terbaru",
        description: "T-shirt oversized dengan desain grafis unik bertema urban. Terbuat dari bahan katun combed 24s yang sejuk.",
        images: [
            "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1562157873-818bc0726f68?q=80&w=800&auto=format&fit=crop"
        ],
        isNew: true
    },
    {
        id: 5,
        name: "Premium Leather Belt",
        price: 150000,
        category: "Koleksi",
        description: "Ikat pinggang dari kulit asli dengan buckle metal berkualitas. Aksesori wajib untuk melengkapi gaya formal Anda.",
        images: [
            "https://images.unsplash.com/photo-1624222247344-550fb8ecf75d?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=800&auto=format&fit=crop"
        ],
        isNew: false
    },
    {
        id: 6,
        name: "Canvas Totebag Large",
        price: 95000,
        category: "Terbaru",
        description: "Totebag kanvas tebal dengan kapasitas besar. Praktis untuk membawa barang belanjaan atau perlengkapan harian.",
        images: [
            "https://images.unsplash.com/photo-1544816153-12ad5d714481?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?q=80&w=800&auto=format&fit=crop"
        ],
        isNew: true
    }
];

// --- UTILS ---
const formatIDR = (price) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    }).format(price);
};

// --- COMPONENTS ---

const LucideIcon = ({ name, className = "", size = 24 }) => {
    const iconRef = useRef(null);

    useEffect(() => {
        if (window.lucide) {
            const timer = setTimeout(() => {
                window.lucide.createIcons({
                    nameAttr: 'data-lucide'
                });
            }, 0);
            return () => clearTimeout(timer);
        }
    }, [name, className]);

    return (
        <i
            data-lucide={name}
            className={className}
            style={{ width: size, height: size }}
            ref={iconRef}
        />
    );
};

const Toast = ({ message, type = "success", onClose }) => {
    useEffect(() => {
        const timer = setTimeout(onClose, 3000);
        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] animate-in">
            <div className="bg-white text-[#0a0a0a] px-6 py-3 rounded-2xl shadow-2xl flex items-center gap-3 border border-accent/20">
                <LucideIcon name={type === "success" ? "check-circle" : "alert-circle"} className="text-accent" size={20} />
                <span className="font-semibold text-sm">{message}</span>
            </div>
        </div>
    );
};

const ProductCard = ({ product, onOpen }) => {
    return (
        <div className="group relative bg-white/5 rounded-3xl overflow-hidden border border-white/5 transition-all hover:border-accent/30 animate-in">
            <div
                className="aspect-[4/5] overflow-hidden cursor-pointer"
                onClick={() => onOpen(product)}
            >
                <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {product.isNew && (
                    <div className="absolute top-4 left-4 bg-accent text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                        New
                    </div>
                )}
            </div>
            <div className="p-5">
                <h3 className="font-bold text-lg mb-1 truncate">{product.name}</h3>
                <p className="text-accent font-bold">{formatIDR(product.price)}</p>
                <button
                    onClick={() => onOpen(product)}
                    className="mt-4 w-full py-2 bg-white/10 hover:bg-white/20 rounded-xl text-xs font-bold uppercase tracking-widest transition-colors"
                >
                    Lihat Detail
                </button>
            </div>
        </div>
    );
};

const App = () => {
    const [cart, setCart] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [toasts, setToasts] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    const addToast = (message) => {
        const id = Date.now();
        setToasts(prev => [...prev, { id, message }]);
    };

    const addToCart = (product) => {
        setCart(prev => {
            const existing = prev.find(item => item.id === product.id);
            if (existing) {
                return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
            }
            return [...prev, { ...product, quantity: 1 }];
        });
        addToast("Produk ditambahkan ke keranjang");
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

    const filteredProducts = useMemo(() => {
        return PRODUCTS.filter(p =>
            p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.category.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [searchQuery]);

    const handleCheckout = () => {
        if (cart.length === 0) return;

        let message = `Halo ${CONFIG.brandName}, saya ingin memesan:\n\n`;
        cart.forEach(item => {
            message += `- ${item.name} (${item.quantity}x) : ${formatIDR(item.price * item.quantity)}\n`;
        });
        message += `\n*Total: ${formatIDR(cartTotal)}*`;

        const encoded = encodeURIComponent(message);
        window.open(`https://wa.me/${CONFIG.whatsappNumber}?text=${encoded}`, '_blank');

        // Success feedback
        setCart([]);
        setIsCartOpen(false);
        alert("Pembelian berhasil! Anda akan diarahkan ke WhatsApp.");
    };

    const buyNow = (product) => {
        const message = `Halo ${CONFIG.brandName}, saya ingin membeli:\n- ${product.name} (1x) : ${formatIDR(product.price)}\n\n*Total: ${formatIDR(product.price)}*`;
        const encoded = encodeURIComponent(message);
        window.open(`https://wa.me/${CONFIG.whatsappNumber}?text=${encoded}`, '_blank');
    };

    return (
        <div className="min-h-screen bg-brand selection:bg-accent/30">
            {/* --- NAVBAR --- */}
            <nav className="fixed top-0 left-0 right-0 z-50 bg-brand/80 backdrop-blur-md border-b border-white/5">
                <div className="max-width-[1440px] mx-auto px-6 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-8">
                        <a href="#" className="text-2xl font-black tracking-tighter text-accent">{CONFIG.brandName}</a>
                        <div className="hidden md:flex items-center gap-6">
                            <a href="#koleksi" className="text-sm font-medium hover:text-accent transition-colors">Koleksi</a>
                            <a href="#terbaru" className="text-sm font-medium hover:text-accent transition-colors">Terbaru</a>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="relative hidden sm:block">
                            <LucideIcon name="search" className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" size={18} />
                            <input
                                type="text"
                                placeholder="Cari koleksi..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="bg-white/5 border border-white/10 rounded-full pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-accent/50 w-64"
                            />
                        </div>

                        <button
                            className="relative p-2 hover:bg-white/5 rounded-full transition-colors"
                            onClick={() => setIsCartOpen(true)}
                            aria-label="Keranjang"
                        >
                            <LucideIcon name="shopping-bag" size={22} />
                            {cartCount > 0 && (
                                <span className="absolute top-1 right-1 w-4 h-4 bg-accent rounded-full text-[10px] flex items-center justify-center font-bold">
                                    {cartCount}
                                </span>
                            )}
                        </button>

                        <button
                            className="md:hidden p-2 hover:bg-white/5 rounded-full transition-colors"
                            onClick={() => setIsMenuOpen(true)}
                        >
                            <LucideIcon name="menu" size={24} />
                        </button>
                    </div>
                </div>
            </nav>

            {/* --- HERO --- */}
            <section className="pt-32 pb-20 px-6">
                <div className="max-w-6xl mx-auto">
                    <div className="relative rounded-[40px] overflow-hidden aspect-[21/9] flex items-center px-12 group">
                        <img
                            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2000&auto=format&fit=crop"
                            className="absolute inset-0 w-full h-full object-cover brightness-50 transition-transform duration-1000 group-hover:scale-105"
                            alt="Hero background"
                        />
                        <div className="relative z-10 max-w-xl">
                            <h1 className="text-5xl md:text-7xl font-black mb-6 leading-[0.9]">Style That Speaks Volume.</h1>
                            <p className="text-lg text-white/70 mb-8 max-w-md">Eksplorasi koleksi streetwear premium yang dirancang untuk ekspresi diri yang maksimal.</p>
                            <div className="flex gap-4">
                                <a href="#koleksi" className="btn-primary">Belanja Sekarang</a>
                                <a href="#terbaru" className="btn-outline">Terbaru</a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- PRODUCTS SECTION --- */}
            <main className="max-w-7xl mx-auto px-6 pb-20">
                <section id="koleksi" className="mb-20">
                    <div className="flex items-end justify-between mb-10">
                        <div>
                            <h2 className="text-3xl font-black mb-2 uppercase tracking-tighter">Koleksi Pilihan</h2>
                            <p className="text-white/50">Item paling dicari musim ini.</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredProducts.filter(p => p.category === "Koleksi").map(product => (
                            <ProductCard key={product.id} product={product} onOpen={setSelectedProduct} />
                        ))}
                    </div>
                </section>

                <section id="terbaru">
                    <div className="flex items-end justify-between mb-10">
                        <div>
                            <h2 className="text-3xl font-black mb-2 uppercase tracking-tighter">Baru Dirilis</h2>
                            <p className="text-white/50">Jangan lewatkan update terbaru kami.</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredProducts.filter(p => p.category === "Terbaru").map(product => (
                            <ProductCard key={product.id} product={product} onOpen={setSelectedProduct} />
                        ))}
                    </div>
                </section>
            </main>

            {/* --- FOOTER --- */}
            <footer className="bg-white/5 py-12 px-6 border-t border-white/5">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="text-center md:text-left">
                        <p className="text-2xl font-black tracking-tighter text-accent mb-2">{CONFIG.brandName}</p>
                        <p className="text-sm text-white/40 max-w-xs">Kurasi streetwear terbaik untuk Anda yang menghargai kualitas dan gaya.</p>
                    </div>
                    <div className="flex gap-8 text-sm font-medium text-white/60">
                        <a href="#" className="hover:text-white transition-colors">Instagram</a>
                        <a href="#" className="hover:text-white transition-colors">TikTok</a>
                        <a href="#" className="hover:text-white transition-colors">WhatsApp</a>
                    </div>
                </div>
            </footer>

            {/* --- MODALS & DRAWERS --- */}

            {/* Product Modal */}
            {selectedProduct && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setSelectedProduct(null)} />
                    <div className="relative bg-brand w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-[32px] border border-white/10 shadow-2xl animate-in">
                        <button
                            className="absolute top-6 right-6 z-10 p-2 bg-black/50 hover:bg-black rounded-full"
                            onClick={() => setSelectedProduct(null)}
                        >
                            <LucideIcon name="x" size={24} />
                        </button>

                        <div className="grid md:grid-cols-2">
                            <div className="p-2">
                                <div className="aspect-[4/5] rounded-[24px] overflow-hidden">
                                    <img src={selectedProduct.images[0]} className="w-full h-full object-cover" alt={selectedProduct.name} />
                                </div>
                                <div className="grid grid-cols-4 gap-2 mt-2">
                                    {selectedProduct.images.map((img, idx) => (
                                        <div key={idx} className="aspect-square rounded-lg overflow-hidden bg-white/5">
                                            <img src={img} className="w-full h-full object-cover opacity-50 hover:opacity-100 cursor-pointer transition-opacity" alt={`${selectedProduct.name} ${idx}`} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="p-8 flex flex-col">
                                <span className="text-accent text-xs font-bold uppercase tracking-widest mb-2">{selectedProduct.category}</span>
                                <h2 className="text-4xl font-black mb-4 leading-tight">{selectedProduct.name}</h2>
                                <p className="text-2xl font-bold mb-6">{formatIDR(selectedProduct.price)}</p>
                                <div className="bg-white/5 p-4 rounded-2xl mb-8">
                                    <p className="text-sm text-white/70 leading-relaxed">{selectedProduct.description}</p>
                                </div>

                                <div className="mt-auto space-y-4">
                                    <button
                                        onClick={() => addToCart(selectedProduct)}
                                        className="w-full btn-primary h-14 text-lg flex items-center justify-center gap-3"
                                    >
                                        <LucideIcon name="shopping-bag" size={20} />
                                        Masukkan Keranjang
                                    </button>
                                    <button
                                        onClick={() => buyNow(selectedProduct)}
                                        className="w-full btn-outline h-14 text-lg flex items-center justify-center gap-3"
                                    >
                                        <LucideIcon name="zap" size={20} />
                                        Beli Sekarang (WA)
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Cart Drawer */}
            {isCartOpen && (
                <div className="fixed inset-0 z-[70]">
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsCartOpen(false)} />
                    <div id="cart-drawer" className="absolute top-0 right-0 bottom-0 w-full max-w-md bg-brand border-l border-white/10 p-8 flex flex-col shadow-2xl animate-in">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-2xl font-black uppercase tracking-tighter">Keranjang</h2>
                            <button onClick={() => setIsCartOpen(false)} className="p-2 hover:bg-white/5 rounded-full">
                                <LucideIcon name="x" size={24} />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto pr-2 hide-scrollbar">
                            {cart.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-white/30 text-center">
                                    <LucideIcon name="shopping-cart" size={48} className="mb-4" />
                                    <p className="font-medium">Keranjang masih kosong</p>
                                </div>
                            ) : (
                                <div className="space-y-6">
                                    {cart.map(item => (
                                        <div key={item.id} className="flex gap-4 group">
                                            <div className="w-20 h-24 rounded-xl overflow-hidden bg-white/5">
                                                <img src={item.images[0]} className="w-full h-full object-cover" alt={item.name} />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h4 className="font-bold truncate text-sm">{item.name}</h4>
                                                <p className="text-accent text-sm font-bold mt-1">{formatIDR(item.price)}</p>
                                                <div className="flex items-center gap-3 mt-3">
                                                    <div className="flex items-center bg-white/5 rounded-lg border border-white/10">
                                                        <button onClick={() => updateQuantity(item.id, -1)} className="px-2 py-1 hover:text-accent">
                                                            <LucideIcon name="minus" size={14} />
                                                        </button>
                                                        <span className="w-8 text-center text-xs font-bold">{item.quantity}</span>
                                                        <button onClick={() => updateQuantity(item.id, 1)} className="px-2 py-1 hover:text-accent">
                                                            <LucideIcon name="plus" size={14} />
                                                        </button>
                                                    </div>
                                                    <button onClick={() => removeFromCart(item.id)} className="text-[10px] uppercase font-bold text-white/30 hover:text-accent tracking-widest">Hapus</button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {cart.length > 0 && (
                            <div className="mt-8 pt-8 border-t border-white/10">
                                <div className="flex justify-between items-center mb-6">
                                    <span className="text-white/50 font-medium">Subtotal</span>
                                    <span className="text-xl font-black">{formatIDR(cartTotal)}</span>
                                </div>
                                <button
                                    onClick={handleCheckout}
                                    className="w-full btn-primary h-14 text-lg flex items-center justify-center gap-3"
                                >
                                    <LucideIcon name="check-circle" size={20} />
                                    Checkout via WhatsApp
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="fixed inset-0 z-[80]">
                    <div className="absolute inset-0 bg-black/90 backdrop-blur-xl" />
                    <div className="relative h-full flex flex-col p-8">
                        <div className="flex justify-between items-center mb-16">
                            <span className="text-2xl font-black tracking-tighter text-accent">{CONFIG.brandName}</span>
                            <button onClick={() => setIsMenuOpen(false)} className="p-2">
                                <LucideIcon name="x" size={32} />
                            </button>
                        </div>
                        <div className="flex flex-col gap-8">
                            <a href="#koleksi" onClick={() => setIsMenuOpen(false)} className="text-4xl font-black hover:text-accent">KOLEKSI</a>
                            <a href="#terbaru" onClick={() => setIsMenuOpen(false)} className="text-4xl font-black hover:text-accent">TERBARU</a>
                        </div>
                        <div className="mt-auto pt-8 border-t border-white/10">
                            <p className="text-white/40 mb-4">Follow us</p>
                            <div className="flex gap-6">
                                <LucideIcon name="instagram" />
                                <LucideIcon name="twitter" />
                                <LucideIcon name="facebook" />
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Toasts */}
            {toasts.map(toast => (
                <Toast key={toast.id} message={toast.message} onClose={() => setToasts(prev => prev.filter(t => t.id !== toast.id))} />
            ))}
        </div>
    );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
