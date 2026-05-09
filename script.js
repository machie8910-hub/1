// CONFIG
const CONFIG = {
    WA_NUMBER: "6288973262022",
    PRODUCTS: [
        {
            id: 1,
            nama: "Classic Snapback",
            harga: 150000,
            kategori: "Snapback",
            deskripsi: "Topi snapback klasik dengan desain minimalis namun elegan. Cocok untuk penggunaan sehari-hari maupun acara kasual.",
            info: {
                bahan: "Cotton Twill Premium",
                ukuran: "All Size (Adjustable)",
                fitur: "Flat brim, 6 panels, Adjustable snap closure"
            },
            gambar: {
                depan: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?q=80&w=1000&auto=format&fit=crop",
                samping: "https://images.unsplash.com/photo-1572307480813-ceb0e59d8325?q=80&w=1000&auto=format&fit=crop",
                belakang: "https://images.unsplash.com/photo-1556306535-0f09a537f0a3?q=80&w=1000&auto=format&fit=crop"
            }
        },
        {
            id: 2,
            nama: "Urban Beanie",
            harga: 120000,
            kategori: "Beanie",
            deskripsi: "Beanie rajut hangat dengan material lembut yang tidak gatal di kulit. Pilihan tepat untuk cuaca dingin atau gaya streetwear.",
            info: {
                bahan: "Acrylic Knit Wool",
                ukuran: "Stretch (One size fits most)",
                fitur: "Soft texture, Breathable, Foldable cuff"
            },
            gambar: {
                depan: "https://images.unsplash.com/photo-1575425186775-b8de9a427e67?q=80&w=1000&auto=format&fit=crop",
                samping: "https://images.unsplash.com/photo-1521119989659-a83eee488004?q=80&w=1000&auto=format&fit=crop",
                belakang: "https://images.unsplash.com/photo-1459156212016-c812468e2115?q=80&w=1000&auto=format&fit=crop"
            }
        },
        {
            id: 3,
            nama: "Trucker Mesh",
            harga: 135000,
            kategori: "Trucker",
            deskripsi: "Topi trucker dengan jaring di bagian belakang untuk sirkulasi udara maksimal. Nyaman digunakan di bawah sinar matahari.",
            info: {
                bahan: "Polyester Mesh & Cotton",
                ukuran: "All Size (Adjustable)",
                fitur: "Breathable mesh back, Curved brim, Snap closure"
            },
            gambar: {
                depan: "https://images.unsplash.com/photo-1521369909029-2afed882baee?q=80&w=1000&auto=format&fit=crop",
                samping: "https://images.unsplash.com/photo-1611601322175-ef8ec8c85f01?q=80&w=1000&auto=format&fit=crop",
                belakang: "https://images.unsplash.com/photo-1534215754734-18e55d13e346?q=80&w=1000&auto=format&fit=crop"
            }
        },
        {
            id: 4,
            nama: "Vintage Dad Hat",
            harga: 145000,
            kategori: "Dad Hat",
            deskripsi: "Topi bergaya vintage dengan kesan 'washed' yang memberikan karakter unik. Material katun berkualitas tinggi.",
            info: {
                bahan: "Washed Cotton",
                ukuran: "All Size (Metal strap)",
                fitur: "Unstructured crown, Curved peak, Vintage look"
            },
            gambar: {
                depan: "https://images.unsplash.com/photo-1596455607563-ad6193f76b17?q=80&w=1000&auto=format&fit=crop",
                samping: "https://images.unsplash.com/photo-1556306535-0f09a537f0a3?q=80&w=1000&auto=format&fit=crop",
                belakang: "https://images.unsplash.com/photo-1572307480813-ceb0e59d8325?q=80&w=1000&auto=format&fit=crop"
            }
        },
        {
            id: 5,
            nama: "Explorer Bucket Hat",
            harga: 160000,
            kategori: "Bucket Hat",
            deskripsi: "Topi bucket yang trendi dan serbaguna, memberikan perlindungan maksimal dari sinar matahari dengan gaya yang santai.",
            info: {
                bahan: "Canvas Cotton",
                ukuran: "Medium/Large",
                fitur: "Wide brim, Foldable, Lightweight"
            },
            gambar: {
                depan: "https://images.unsplash.com/photo-1618354691792-d1d42acfd860?q=80&w=1000&auto=format&fit=crop",
                samping: "https://images.unsplash.com/photo-1621072156002-e2fcced0b170?q=80&w=1000&auto=format&fit=crop",
                belakang: "https://images.unsplash.com/photo-1618354691792-d1d42acfd860?q=80&w=1000&auto=format&fit=crop"
            }
        },
        {
            id: 6,
            nama: "Classic Fedora",
            harga: 250000,
            kategori: "Fedora",
            deskripsi: "Sentuhan klasik untuk penampilan formal maupun semi-formal. Dibuat dengan presisi untuk kenyamanan sepanjang hari.",
            info: {
                bahan: "Wool Felt",
                ukuran: "Fixed (58cm)",
                fitur: "Stiff brim, Ribbon band, Elegant lining"
            },
            gambar: {
                depan: "https://images.unsplash.com/photo-1514327605112-b887c0e61c0a?q=80&w=1000&auto=format&fit=crop",
                samping: "https://images.unsplash.com/photo-1517423568366-8b83523034fd?q=80&w=1000&auto=format&fit=crop",
                belakang: "https://images.unsplash.com/photo-1514327605112-b887c0e61c0a?q=80&w=1000&auto=format&fit=crop"
            }
        },
        {
            id: 7,
            nama: "Performance Sport Cap",
            harga: 175000,
            kategori: "Sport",
            deskripsi: "Topi olahraga dengan teknologi 'moisture-wicking' untuk menjaga kepala tetap kering saat beraktivitas berat.",
            info: {
                bahan: "Micro-Polyester",
                ukuran: "All Size (Adjustable)",
                fitur: "Breathable, Sweatband, Reflective detail"
            },
            gambar: {
                depan: "https://images.unsplash.com/photo-1572307480813-ceb0e59d8325?q=80&w=1000&auto=format&fit=crop",
                samping: "https://images.unsplash.com/photo-1533055640609-24b498dfd74c?q=80&w=1000&auto=format&fit=crop",
                belakang: "https://images.unsplash.com/photo-1572307480813-ceb0e59d8325?q=80&w=1000&auto=format&fit=crop"
            }
        },
        {
            id: 8,
            nama: "Premium Corduroy",
            harga: 185000,
            kategori: "Lifestyle",
            deskripsi: "Topi corduroy dengan tekstur unik yang memberikan kesan retro namun tetap modern. Pilihan gaya untuk semua musim.",
            info: {
                bahan: "Premium Corduroy",
                ukuran: "All Size (Metal Buckle)",
                fitur: "Soft texture, Durable, Retro design"
            },
            gambar: {
                depan: "https://images.unsplash.com/photo-1556306535-0f09a537f0a3?q=80&w=1000&auto=format&fit=crop",
                samping: "https://images.unsplash.com/photo-1596455607563-ad6193f76b17?q=80&w=1000&auto=format&fit=crop",
                belakang: "https://images.unsplash.com/photo-1556306535-0f09a537f0a3?q=80&w=1000&auto=format&fit=crop"
            }
        }
    ]
};

// State
let cart = [];
let activeSlide = 0;
let searchKeyword = "";

// Elements
const navbar = document.getElementById('navbar');
const searchInput = document.getElementById('searchInput');
const searchInputMobile = document.getElementById('searchInputMobile');
const cartBtn = document.getElementById('cartBtn');
const closeCart = document.getElementById('closeCart');
const cartSidebar = document.getElementById('cartSidebar');
const cartOverlay = document.getElementById('cartOverlay');
const cartItems = document.getElementById('cartItems');
const cartCount = document.getElementById('cartCount');
const totalPrice = document.getElementById('totalPrice');
const productGrid = document.getElementById('productGrid');
const sliderTrack = document.getElementById('sliderTrack');
const sliderDots = document.getElementById('sliderDots');
const prevSlide = document.getElementById('prevSlide');
const nextSlide = document.getElementById('nextSlide');
const menuBtn = document.getElementById('menuBtn');
const closeDrawer = document.getElementById('closeDrawer');
const drawer = document.getElementById('drawer');
const drawerOverlay = document.getElementById('drawerOverlay');
const modal = document.getElementById('productModal');
const modalOverlay = document.getElementById('modalOverlay');
const closeModal = document.getElementById('closeModal');
const modalContent = document.getElementById('modalContent');
const toastContainer = document.getElementById('toastContainer');
const checkoutBtn = document.getElementById('checkoutBtn');

// Functions
function init() {
    renderProducts();
    renderRecommendations();
    updateCart();
    setupEventListeners();
}

function setupEventListeners() {
    // Scroll navbar effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('glass');
        } else {
            navbar.classList.add('glass'); // Keep glass based on design
        }
    });

    // Search
    const handleSearch = (e) => {
        searchKeyword = e.target.value.toLowerCase();
        renderProducts();
    };
    searchInput.addEventListener('input', handleSearch);
    if(searchInputMobile) searchInputMobile.addEventListener('input', handleSearch);

    // Cart Sidebar
    cartBtn.addEventListener('click', () => toggleSidebar(cartSidebar, cartOverlay, true));
    closeCart.addEventListener('click', () => toggleSidebar(cartSidebar, cartOverlay, false));
    cartOverlay.addEventListener('click', () => toggleSidebar(cartSidebar, cartOverlay, false));

    // Mobile Drawer
    menuBtn.addEventListener('click', () => toggleSidebar(drawer, drawerOverlay, true));
    closeDrawer.addEventListener('click', () => toggleSidebar(drawer, drawerOverlay, false));
    drawerOverlay.addEventListener('click', () => toggleSidebar(drawer, drawerOverlay, false));

    // Slider Nav
    prevSlide.addEventListener('click', () => moveSlider(-1));
    nextSlide.addEventListener('click', () => moveSlider(1));

    // Modal
    closeModal.addEventListener('click', closeModalUI);
    modalOverlay.addEventListener('click', closeModalUI);

    // Checkout
    checkoutBtn.addEventListener('click', handleCheckout);
}

function toggleSidebar(el, overlay, show) {
    if (show) {
        el.classList.add('active');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    } else {
        el.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

function renderProducts() {
    const filtered = CONFIG.PRODUCTS.filter(p => p.nama.toLowerCase().includes(searchKeyword));
    productGrid.innerHTML = '';

    if (filtered.length === 0) {
        productGrid.innerHTML = '<p class="text-center" style="grid-column: 1/-1; padding: 3rem; color: #666;">Produk tidak ditemukan.</p>';
        return;
    }

    filtered.forEach(p => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <div class="product-img" onclick="openModalById(${p.id})">
                <img src="${p.gambar.depan}" alt="${p.nama}">
            </div>
            <div class="product-info">
                <span class="product-category">${p.kategori}</span>
                <h4 class="product-name">${p.nama}</h4>
                <p class="product-price">Rp ${p.harga.toLocaleString('id-ID')}</p>
                <div class="product-actions">
                    <button class="btn btn-secondary btn-sm" onclick="addToCart(${p.id})">
                        <i class="fas fa-cart-plus"></i>
                    </button>
                    <button class="btn btn-whatsapp btn-sm" onclick="buyNowWA(${p.id})">
                        Beli
                    </button>
                </div>
            </div>
        `;
        productGrid.appendChild(card);
    });
}

function renderRecommendations() {
    const recs = CONFIG.PRODUCTS.slice(0, 3);
    sliderTrack.innerHTML = '';
    sliderDots.innerHTML = '';

    recs.forEach((p, index) => {
        const item = document.createElement('div');
        item.className = 'slider-item';
        item.onclick = () => openModalById(p.id);
        item.innerHTML = `
            <img src="${p.gambar.depan}" alt="${p.nama}">
            <div class="slider-info">
                <span class="badge">REKOMENDASI</span>
                <h3>${p.nama}</h3>
                <p>Rp ${p.harga.toLocaleString('id-ID')}</p>
            </div>
        `;
        sliderTrack.appendChild(item);

        const dot = document.createElement('div');
        dot.className = `dot ${index === 0 ? 'active' : ''}`;
        dot.onclick = () => goToSlide(index);
        sliderDots.appendChild(dot);
    });
}

function moveSlider(dir) {
    const count = CONFIG.PRODUCTS.slice(0, 3).length;
    activeSlide = (activeSlide + dir + count) % count;
    updateSliderUI();
}

function goToSlide(index) {
    activeSlide = index;
    updateSliderUI();
}

function updateSliderUI() {
    sliderTrack.style.transform = `translateX(-${activeSlide * 100}%)`;
    const dots = sliderDots.querySelectorAll('.dot');
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === activeSlide);
    });
}

function openModalById(id) {
    const p = CONFIG.PRODUCTS.find(item => item.id === id);
    if (!p) return;

    modalContent.innerHTML = `
        <div class="modal-gallery">
            <div class="main-img-container">
                <img id="modalMainImg" src="${p.gambar.depan}" alt="${p.nama}">
            </div>
            <div class="thumb-strip">
                ${Object.entries(p.gambar).map(([key, url]) => `
                    <img class="thumb ${key === 'depan' ? 'active' : ''}" src="${url}"
                         onclick="swapModalImg(this, '${url}')" alt="${key}">
                `).join('')}
            </div>
        </div>
        <div class="modal-details">
            <span class="badge">${p.kategori}</span>
            <h3>${p.nama}</h3>
            <p class="modal-price">Rp ${p.harga.toLocaleString('id-ID')}</p>
            <p class="modal-desc">${p.deskripsi}</p>

            <div class="specs">
                <div class="spec-item"><span class="spec-label">Bahan</span><span class="spec-value">${p.info.bahan}</span></div>
                <div class="spec-item"><span class="spec-label">Ukuran</span><span class="spec-value">${p.info.ukuran}</span></div>
                <div class="spec-item" style="flex-direction:column; border:none; gap:5px;">
                    <span class="spec-label">Fitur</span>
                    <span class="spec-value" style="font-size:0.85rem; color:#888;">${p.info.fitur}</span>
                </div>
            </div>

            <div style="display:grid; grid-template-columns: 1fr 1fr; gap:15px;">
                <button class="btn btn-secondary" onclick="addToCart(${p.id})">Tambah Keranjang</button>
                <button class="btn btn-whatsapp" onclick="buyNowWA(${p.id})">Beli Sekarang</button>
            </div>
        </div>
    `;

    modal.classList.add('active');
    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function swapModalImg(el, url) {
    document.getElementById('modalMainImg').src = url;
    const thumbs = document.querySelectorAll('.thumb');
    thumbs.forEach(t => t.classList.remove('active'));
    el.classList.add('active');
}

function closeModalUI() {
    modal.classList.remove('active');
    modalOverlay.classList.remove('active');
    document.body.style.overflow = 'auto';
}

function addToCart(id) {
    const p = CONFIG.PRODUCTS.find(item => item.id === id);
    const existing = cart.find(item => item.id === id);

    if (existing) {
        existing.qty++;
    } else {
        cart.push({ ...p, qty: 1 });
    }

    updateCart();
    showToast(`${p.nama} ditambahkan ke keranjang`);
}

function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    updateCart();
}

function updateCart() {
    cartItems.innerHTML = '';
    let total = 0;
    let count = 0;

    cart.forEach(item => {
        total += item.harga * item.qty;
        count += item.qty;

        const el = document.createElement('div');
        el.className = 'cart-item';
        el.innerHTML = `
            <img class="cart-item-img" src="${item.gambar.depan}" alt="${item.nama}">
            <div class="cart-item-info">
                <h4 class="cart-item-name">${item.nama}</h4>
                <p class="cart-item-price">${item.qty} x Rp ${item.harga.toLocaleString('id-ID')}</p>
            </div>
            <button class="remove-item" onclick="removeFromCart(${item.id})"><i class="fas fa-trash"></i></button>
        `;
        cartItems.appendChild(el);
    });

    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="text-center" style="padding:2rem; color:#666;">Keranjang kosong</p>';
    }

    cartCount.textContent = count;
    totalPrice.textContent = `Rp ${total.toLocaleString('id-ID')}`;
}

function showToast(msg) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = msg;
    toastContainer.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(20px)';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

function buyNowWA(id) {
    const p = CONFIG.PRODUCTS.find(item => item.id === id);
    const msg = `Halo TKTM, saya ingin membeli produk berikut:\n\nNama: ${p.nama}\nHarga: Rp ${p.harga.toLocaleString('id-ID')}\n\nTerima kasih!`;
    const url = `https://wa.me/${CONFIG.WA_NUMBER}?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
}

function handleCheckout() {
    if (cart.length === 0) return;

    let msg = `Halo TKTM, saya ingin memesan:\n\n`;
    let total = 0;
    cart.forEach(item => {
        msg += `- ${item.nama} (${item.qty}x) : Rp ${(item.harga * item.qty).toLocaleString('id-ID')}\n`;
        total += item.harga * item.qty;
    });
    msg += `\nTotal: Rp ${total.toLocaleString('id-ID')}\n\nTerima kasih!`;

    const url = `https://wa.me/${CONFIG.WA_NUMBER}?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');

    showToast('Pembelian berhasil');
    cart = [];
    updateCart();
    toggleSidebar(cartSidebar, cartOverlay, false);
}

// Run
init();
