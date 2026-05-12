/**
 * TKTM - Topiku Topimu
 * Core Logic
 */

const CONFIG = {
    whatsappNumber: "6288973262022",
    currency: "IDR",
    products: [
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
            gambar: [
                "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?q=80&w=1000&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1572307480813-ceb0e59d8325?q=80&w=1000&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1556306535-0f09a537f0a3?q=80&w=1000&auto=format&fit=crop"
            ]
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
            gambar: [
                "https://images.unsplash.com/photo-1575425186775-b8de9a427e67?q=80&w=1000&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1521119989659-a83eee488004?q=80&w=1000&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1459156212016-c812468e2115?q=80&w=1000&auto=format&fit=crop"
            ]
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
            gambar: [
                "https://images.unsplash.com/photo-1521369909029-2afed882baee?q=80&w=1000&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1611601322175-ef8ec8c85f01?q=80&w=1000&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1534215754734-18e55d13e346?q=80&w=1000&auto=format&fit=crop"
            ]
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
            gambar: [
                "https://images.unsplash.com/photo-1596455607563-ad6193f76b17?q=80&w=1000&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1556306535-0f09a537f0a3?q=80&w=1000&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1572307480813-ceb0e59d8325?q=80&w=1000&auto=format&fit=crop"
            ]
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
            gambar: [
                "https://images.unsplash.com/photo-1618354691792-d1d42acfd860?q=80&w=1000&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1621072156002-e2fcced0b170?q=80&w=1000&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1618354691792-d1d42acfd860?q=80&w=1000&auto=format&fit=crop"
            ]
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
            gambar: [
                "https://images.unsplash.com/photo-1514327605112-b887c0e61c0a?q=80&w=1000&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1517423568366-8b83523034fd?q=80&w=1000&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1514327605112-b887c0e61c0a?q=80&w=1000&auto=format&fit=crop"
            ]
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
            gambar: [
                "https://images.unsplash.com/photo-1572307480813-ceb0e59d8325?q=80&w=1000&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1533055640609-24b498dfd74c?q=80&w=1000&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1572307480813-ceb0e59d8325?q=80&w=1000&auto=format&fit=crop"
            ]
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
            gambar: [
                "https://images.unsplash.com/photo-1556306535-0f09a537f0a3?q=80&w=1000&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1596455607563-ad6193f76b17?q=80&w=1000&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1556306535-0f09a537f0a3?q=80&w=1000&auto=format&fit=crop"
            ]
        }
    ]
};

/**
 * Modal & Gallery Logic
 */
const openModalById = (id) => {
    const product = CONFIG.products.find(p => p.id === id);
    if (!product) return;

    const modal = document.getElementById('product-modal');
    const overlay = document.getElementById('modal-overlay');

    // Clear previous content but keep the close button
    const closeBtn = modal.querySelector('#close-modal');
    modal.innerHTML = '';
    modal.appendChild(closeBtn);

    const content = document.createElement('div');
    content.className = 'modal-layout';
    content.style.display = 'flex';
    content.style.flexDirection = 'column';
    content.style.width = '100%';

    const topSection = document.createElement('div');
    topSection.style.display = 'flex';
    topSection.style.flexDirection = window.innerWidth > 768 ? 'row' : 'column';

    // Gallery
    const gallery = document.createElement('div');
    gallery.className = 'modal-gallery';
    gallery.style.flex = '1';
    gallery.style.background = '#1a1a1a';

    const mainImg = document.createElement('img');
    mainImg.src = product.gambar[0];
    mainImg.style.width = '100%';
    mainImg.style.aspectRatio = '1';
    mainImg.style.objectFit = 'cover';
    mainImg.id = 'modal-main-img';

    const thumbs = document.createElement('div');
    thumbs.style.display = 'flex';
    thumbs.style.gap = '10px';
    thumbs.style.padding = '15px';
    thumbs.style.justifyContent = 'center';

    product.gambar.forEach((src, index) => {
        const thumb = document.createElement('img');
        thumb.src = src;
        thumb.style.width = '60px';
        thumb.style.height = '60px';
        thumb.style.objectFit = 'cover';
        thumb.style.borderRadius = '8px';
        thumb.style.cursor = 'pointer';
        thumb.style.border = index === 0 ? '2px solid var(--accent)' : '2px solid transparent';
        thumb.onclick = () => {
            mainImg.src = src;
            Array.from(thumbs.children).forEach(t => t.style.border = '2px solid transparent');
            thumb.style.border = '2px solid var(--accent)';
        };
        thumbs.appendChild(thumb);
    });

    gallery.appendChild(mainImg);
    gallery.appendChild(thumbs);

    // Info
    const info = document.createElement('div');
    info.style.flex = '1';
    info.style.padding = '40px';
    info.innerHTML = `
        <span style="color: var(--accent); font-weight: 800; text-transform: uppercase; font-size: 0.8rem;">${product.kategori}</span>
        <h2 style="font-size: 2.5rem; font-weight: 900; margin: 10px 0;">${product.nama}</h2>
        <p style="font-size: 1.5rem; font-weight: 800; color: var(--accent); margin-bottom: 20px;">Rp ${product.harga.toLocaleString('id-ID')}</p>
        <p style="color: var(--text-secondary); margin-bottom: 30px;">${product.deskripsi}</p>
        <div style="margin-bottom: 30px;">
            <div style="display: flex; justify-content: space-between; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 10px; margin-bottom: 10px;">
                <span style="color: var(--text-secondary);">Bahan</span>
                <span style="font-weight: 600;">${product.info.bahan}</span>
            </div>
            <div style="display: flex; justify-content: space-between; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 10px;">
                <span style="color: var(--text-secondary);">Ukuran</span>
                <span style="font-weight: 600;">${product.info.ukuran}</span>
            </div>
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
            <button class="btn-primary" onclick="addToCart(${product.id}); closeModal();">Tambah Keranjang</button>
            <button class="btn-primary" style="background: #25d366;" onclick="buyNow(${product.id})"><i class="fa-brands fa-whatsapp"></i> Beli Sekarang</button>
        </div>
    `;

    topSection.appendChild(gallery);
    topSection.appendChild(info);
    content.appendChild(topSection);
    modal.appendChild(content);

    overlay.style.display = 'flex';
    document.body.style.overflow = 'hidden';
};

const closeModal = () => {
    document.getElementById('modal-overlay').style.display = 'none';
    document.body.style.overflow = 'auto';
};

document.getElementById('close-modal').onclick = closeModal;
document.getElementById('modal-overlay').onclick = (e) => {
    if (e.target.id === 'modal-overlay') closeModal();
};

/**
 * Search & Rendering Logic
 */
const renderProducts = (filter = "") => {
    const grid = document.getElementById('product-grid');
    grid.innerHTML = '';

    const filtered = CONFIG.products.filter(p =>
        p.nama.toLowerCase().includes(filter.toLowerCase()) ||
        p.kategori.toLowerCase().includes(filter.toLowerCase())
    );

    filtered.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card animate-in';

        const img = document.createElement('img');
        img.src = product.gambar[0];
        img.className = 'product-image';
        img.onclick = () => openModalById(product.id);

        const info = document.createElement('div');
        info.className = 'product-info';
        info.innerHTML = `
            <p class="product-category">${product.kategori}</p>
            <h3 class="product-name">${product.nama}</h3>
            <p class="product-price">Rp ${product.harga.toLocaleString('id-ID')}</p>
            <div class="product-actions">
                <button class="btn-sm btn-cart" onclick="addToCart(${product.id})">Keranjang</button>
                <button class="btn-sm btn-buy" onclick="buyNow(${product.id})">Beli</button>
            </div>
        `;

        card.appendChild(img);
        card.appendChild(info);
        grid.appendChild(card);
    });
};

document.getElementById('search-input').oninput = (e) => {
    renderProducts(e.target.value);
};

// Initial Render
renderProducts();

/**
 * Cart Logic
 */
let cart = [];

const addToCart = (id) => {
    const product = CONFIG.products.find(p => p.id === id);
    const existing = cart.find(item => item.id === id);

    if (existing) {
        existing.qty++;
    } else {
        cart.push({ ...product, qty: 1 });
    }

    updateCartUI();
    showToast(`${product.nama} ditambahkan ke keranjang!`);
};

const removeFromCart = (id) => {
    cart = cart.filter(item => item.id !== id);
    updateCartUI();
};

const updateCartUI = () => {
    const cartItems = document.getElementById('cart-items');
    const cartCount = document.getElementById('cart-count');
    const cartTotal = document.getElementById('cart-total');

    cartItems.innerHTML = '';
    let total = 0;
    let count = 0;

    cart.forEach(item => {
        total += item.harga * item.qty;
        count += item.qty;

        const div = document.createElement('div');
        div.style.display = 'flex';
        div.style.gap = '15px';
        div.style.marginBottom = '20px';
        div.style.alignItems = 'center';
        div.innerHTML = `
            <img src="${item.gambar[0]}" style="width: 60px; height: 60px; object-fit: cover; border-radius: 8px;">
            <div style="flex: 1;">
                <h4 style="font-size: 0.9rem; margin-bottom: 5px;">${item.nama}</h4>
                <p style="font-size: 0.8rem; color: var(--text-secondary);">${item.qty} x Rp ${item.harga.toLocaleString('id-ID')}</p>
            </div>
            <button onclick="removeFromCart(${item.id})" style="background: none; border: none; color: #ff4d4d; cursor: pointer;">
                <i class="fa-solid fa-trash"></i>
            </button>
        `;
        cartItems.appendChild(div);
    });

    cartCount.innerText = count;
    cartTotal.innerText = `Rp ${total.toLocaleString('id-ID')}`;
};

const buyNow = (id) => {
    const product = CONFIG.products.find(p => p.id === id);
    const message = `Halo TKTM, saya ingin membeli produk berikut:\n\nNama: ${product.nama}\nHarga: Rp ${product.harga.toLocaleString('id-ID')}\n\nTerima kasih!`;
    const url = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
};

const checkout = () => {
    if (cart.length === 0) {
        showToast("Keranjang Anda masih kosong!");
        return;
    }

    let message = "Halo TKTM, saya ingin memesan:\n\n";
    let total = 0;

    cart.forEach(item => {
        message += `- ${item.nama} (${item.qty}x) - Rp ${(item.harga * item.qty).toLocaleString('id-ID')}\n`;
        total += item.harga * item.qty;
    });

    message += `\nTotal: Rp ${total.toLocaleString('id-ID')}\n\nMohon info selanjutnya untuk pembayaran. Terima kasih!`;

    const url = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');

    // Success flow
    showToast("Pembelian berhasil! Menghubungi WhatsApp...");
    cart = [];
    updateCartUI();
    closeCart();
};

document.getElementById('checkout-btn').onclick = checkout;

/**
 * UI Interactions
 */
const cartDrawer = document.getElementById('cart-drawer');
const overlay = document.getElementById('overlay');

const openCart = () => {
    cartDrawer.classList.add('open');
    overlay.style.display = 'block';
};

const closeCart = () => {
    cartDrawer.classList.remove('open');
    overlay.style.display = 'none';
};

document.getElementById('cart-trigger').onclick = openCart;
document.getElementById('close-cart').onclick = closeCart;
overlay.onclick = closeCart;

/**
 * Toast System
 */
const showToast = (message) => {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerText = message;

    container.appendChild(toast);

    setTimeout(() => {
        toast.style.animation = 'slideIn 0.3s forwards reverse';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
};
