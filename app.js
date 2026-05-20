/* ==========================================================================
   PETAL PANTRY CORE CLIENT ENGINE
   ========================================================================== */

// 1. PRODUCT DATABASE
const PRODUCTS = [
    {
        id: "c-rose",
        name: "Blushing Crochet Rose",
        department: "crochet",
        price: 8.50,
        unit: "stem",
        character: "🌸",
        material: "Organic Combed Cotton Yarn",
        dimensions: "32cm stem, 7cm blossom diameter",
        weight: "24g",
        care: "Gently wipe with a soft dry cloth. Keep away from intense open dampness.",
        desc: "A premium, hand-knitted garden rose stitched using high-grade organic cotton yarn. Featuring structural petals that hold their shape indefinitely and a flexible wired green stem for custom posing."
    },
    {
        id: "p-peony",
        name: "Crepe Peony Royale",
        department: "paper",
        price: 12.00,
        unit: "stem",
        character: "🌺",
        material: "Italian Double-Crepe Paper",
        dimensions: "40cm stem, 12cm blossom diameter",
        weight: "15g",
        care: "Keep away from direct moisture, wet areas, or constant high humidity.",
        desc: "An incredibly luxurious crepe paper peony with layers of delicate hand-scalloped petals. Displays a stunning realistic gradient from deep magenta at the core to soft blush pink at the outer rim."
    },
    {
        id: "f-lavender",
        name: "Felt Lavender Bunch",
        department: "felt",
        price: 14.50,
        unit: "bundle (5 stems)",
        character: "🌿",
        material: "Pure New Zealand Felted Wool",
        dimensions: "30cm length per stem cluster",
        weight: "45g",
        care: "Gently blow away dust on a cool fan setting. Clean with dry sponge if needed.",
        desc: "A cozy, charming bundle of 5 felted wool lavender stems. Each lavender bud is hand-rolled and securely bound to a natural paper-wrapped branch, releasing a rustic, cozy, handmade atmosphere."
    },
    {
        id: "c-tulip",
        name: "Stitched Sunshine Tulip",
        department: "crochet",
        price: 9.00,
        unit: "stem",
        character: "🌷",
        material: "Soft Acrylic & Cotton Blend",
        dimensions: "30cm stem, 6cm bloom height",
        weight: "20g",
        care: "Wipe clean with a damp microfiber cloth and allow to air dry.",
        desc: "Bring everlasting morning sun into your rooms. Handcrafted in a beautiful peach-orange color gradient, featuring double-stitch foliage details and a sturdy inner wire stem."
    },
    {
        id: "f-eucalyptus",
        name: "Felted Sage Eucalyptus",
        department: "felt",
        price: 7.20,
        unit: "stem",
        character: "🍃",
        material: "Merino Wool Felt & Wire",
        dimensions: "38cm length",
        weight: "18g",
        care: "Avoid squeezing or crushing. Reshape easily with light steam.",
        desc: "A beautifully understated sage green eucalyptus branch with individual hand-cut merino felt coins. Makes a highly organic textured filler for bouquets or can stand elegantly alone in a ceramic jar."
    },
    {
        id: "p-breath",
        name: "Crepe Baby's Breath",
        department: "paper",
        price: 10.50,
        unit: "bundle",
        character: "✿",
        material: "Crepe Paper & Textured Tape",
        dimensions: "35cm cluster bunch",
        weight: "10g",
        care: "Keep dry. Dust off lightly with a soft brush.",
        desc: "Meticulously shaped cluster of tiny cream-white floral starlets. Adds a soft, ethereal cloud-like layering texture to any everlasting florist arrangement."
    },
    {
        id: "c-hydrangea",
        name: "Croft Hydrangea Bloom",
        department: "crochet",
        price: 18.00,
        unit: "head",
        character: "❀",
        material: "Fine Mercerized Cotton Thread",
        dimensions: "35cm stem, 14cm flower ball",
        weight: "60g",
        care: "Extremely durable. Can be steam ironed on low settings to fluff.",
        desc: "An absolute masterpiece of hand-crocheting. Over 100 individual tiny blossoms in soft pink, cream, and lavender tones carefully hand-assembled into a single spectacular, heavy floral cloud."
    },
    {
        id: "p-poppy",
        name: "Crepe Crimson Poppy",
        department: "paper",
        price: 11.00,
        unit: "stem",
        character: "🌸",
        material: "Waterproof Treated Crepe Paper",
        dimensions: "42cm stem, 10cm cup",
        weight: "12g",
        care: "Avoid direct prolonged sunlight to prevent coloring fade.",
        desc: "A stunning structural poppy in a bold rose-red shade. Features a textured dark wooly core, detailed paper stamens, and an organic-looking fuzzy stem that sways gracefully."
    }
];

// Florist bin items for the Bouquet Builder
const FLORIST_STEMS = [
    { id: "stem-rose", name: "Rose Stem", price: 6.00, char: "🌸", color: "#FF6B8B" },
    { id: "stem-tulip", name: "Tulip Stem", price: 5.50, char: "🌷", color: "#FF8E9C" },
    { id: "stem-peony", name: "Peony Stem", price: 8.00, char: "🌺", color: "#FD79A8" },
    { id: "stem-lavender", name: "Lavender Stem", price: 3.50, char: "🌿", color: "#9B59B6" },
    { id: "stem-eucalyptus", name: "Eucalyptus Stem", price: 3.00, char: "🍃", color: "#81C784" },
    { id: "stem-daisy", name: "Daisy Stem", price: 4.00, char: "✿", color: "#FFE082" }
];

// STATE CONTROLLERS
let cart = [];
let bouquet = [];
let currentFilter = "all";
let currentSort = "popular";
let activeProductModal = null;
let checkoutStep = 1;

// ==========================================================================
// 2. ANTIGRAVITY FLOATING BLOOM CANVAS BACKDROP (PARTICLE ENGINE)
// ==========================================================================
const canvas = document.getElementById("antigravity-canvas");
const ctx = canvas.getContext("2d");

let particles = [];
const particleCount = 60; // Rich field of floating craft items

// Floral symbols including keychain, flower petals, bouquet shapes, and leaves
const floralSymbols = ["✿", "❀", "🌸", "🌺", "🌷", "💐", "🍃", "🌿"];
// Custom hex color palette: blush pink, rose red, sage green, cream, gold
const particleColors = ["#f2c4b0", "#c9736a", "#6b8f5e", "#fdf6f0", "#c9a86c"];

// Particle types: 'emoji', 'petal' (ellipse), 'keychain' (canvas-drawn icon)
const PARTICLE_TYPES = ["emoji", "petal", "keychain"];

// Helper: draw a tiny keychain icon using canvas paths
function drawKeychainIcon(ctx, size, color) {
    // Ring at top
    const ringRadius = size * 0.28;
    const ringCenterY = -size * 0.38;
    ctx.strokeStyle = color;
    ctx.lineWidth = size * 0.08;
    ctx.beginPath();
    ctx.arc(0, ringCenterY, ringRadius, 0, Math.PI * 2);
    ctx.stroke();

    // Connector bar
    const barTop = ringCenterY + ringRadius;
    const barBottom = barTop + size * 0.18;
    ctx.fillStyle = color;
    ctx.fillRect(-size * 0.04, barTop, size * 0.08, barBottom - barTop);

    // Tag / charm body (rounded rectangle)
    const tagW = size * 0.48;
    const tagH = size * 0.52;
    const tagX = -tagW / 2;
    const tagY = barBottom;
    const tagR = size * 0.08;
    ctx.beginPath();
    ctx.moveTo(tagX + tagR, tagY);
    ctx.lineTo(tagX + tagW - tagR, tagY);
    ctx.quadraticCurveTo(tagX + tagW, tagY, tagX + tagW, tagY + tagR);
    ctx.lineTo(tagX + tagW, tagY + tagH - tagR);
    ctx.quadraticCurveTo(tagX + tagW, tagY + tagH, tagX + tagW - tagR, tagY + tagH);
    ctx.lineTo(tagX + tagR, tagY + tagH);
    ctx.quadraticCurveTo(tagX, tagY + tagH, tagX, tagY + tagH - tagR);
    ctx.lineTo(tagX, tagY + tagR);
    ctx.quadraticCurveTo(tagX, tagY, tagX + tagR, tagY);
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.fill();

    // Small heart or star on the charm tag
    const centerX = 0;
    const centerY = tagY + tagH * 0.48;
    const heartSize = size * 0.12;
    ctx.fillStyle = "rgba(255,255,255,0.5)";
    ctx.beginPath();
    ctx.moveTo(centerX, centerY + heartSize * 0.4);
    ctx.bezierCurveTo(centerX - heartSize, centerY - heartSize * 0.4, centerX - heartSize * 0.5, centerY - heartSize, centerX, centerY - heartSize * 0.4);
    ctx.bezierCurveTo(centerX + heartSize * 0.5, centerY - heartSize, centerX + heartSize, centerY - heartSize * 0.4, centerX, centerY + heartSize * 0.4);
    ctx.fill();
}

class BloomParticle {
    constructor(isInitial = false) {
        this.reset(isInitial);
    }

    reset(isInitial) {
        this.x = Math.random() * canvas.width;
        // Start below the screen, or randomly distributed if it's the initial page load
        this.y = isInitial ? Math.random() * canvas.height : canvas.height + 30;
        
        // Pure upward Y velocity (0.5 to 1.8) - zero gravity
        this.speed = Math.random() * (1.8 - 0.5) + 0.5;
        
        // Sinusoidal X drift variables
        this.oscillate = Math.random() * Math.PI * 2;
        this.oscillateSpeed = Math.random() * 0.02 + 0.008; // gentle frequency
        this.oscillateAmplitude = Math.random() * 0.6 + 0.5; // sway amplitude
        
        // Rotation and scale
        this.angle = Math.random() * Math.PI * 2;
        this.rotSpeed = (Math.random() - 0.5) * 0.018; // slow rotation
        this.scale = Math.random() * 0.55 + 0.5; // varied scale sizing
        
        // Soft opacity (0.15 to 0.5) so it does not block the main content
        this.alpha = Math.random() * (0.5 - 0.15) + 0.15;
        
        // Select custom color from requested palette
        this.color = particleColors[Math.floor(Math.random() * particleColors.length)];
        
        // Determine particle type: emoji, petal (ellipse), or keychain
        const typeRoll = Math.random();
        if (typeRoll < 0.45) {
            this.type = "emoji";
            this.symbol = floralSymbols[Math.floor(Math.random() * floralSymbols.length)];
            this.fontSize = Math.floor(Math.random() * 10) + 16;
        } else if (typeRoll < 0.75) {
            this.type = "petal";
            // Custom rendered soft ellipse petal shape
            this.ellipseRx = Math.random() * 6 + 5;
            this.ellipseRy = this.ellipseRx * (Math.random() * 0.5 + 1.1);
        } else {
            this.type = "keychain";
            this.keychainSize = Math.random() * 10 + 14; // keychain icon size
        }
    }

    update() {
        this.y -= this.speed; // Pure upward Y velocity (zero gravity)
        
        // Sinusoidal X drift - gentle left/right sway using sine wave motion
        this.oscillate += this.oscillateSpeed;
        this.x += Math.sin(this.oscillate) * this.oscillateAmplitude;
        
        // Slow rotation
        this.angle += this.rotSpeed;

        // Reset condition: On reaching top, reset to bottom at random X position
        if (this.y < -60) {
            this.reset(false);
        }
    }

    draw() {
        ctx.save();
        
        // Apply position, rotation, scaling
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        ctx.scale(this.scale, this.scale);

        // Apply soft alpha transparency (0.15 - 0.5)
        ctx.globalAlpha = this.alpha;

        if (this.type === "emoji") {
            // Draw standard emoji/character
            ctx.fillStyle = this.color;
            ctx.font = `${this.fontSize}px 'Outfit', sans-serif`;
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText(this.symbol, 0, 0);
        } else if (this.type === "petal") {
            // Draw custom rendered soft ellipse petal shape
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.ellipse(0, 0, this.ellipseRx, this.ellipseRy, 0, 0, Math.PI * 2);
            ctx.fill();
        } else if (this.type === "keychain") {
            // Draw tiny keychain icon
            drawKeychainIcon(ctx, this.keychainSize, this.color);
        }

        ctx.restore();
    }
}

function initCanvas() {
    resizeCanvas();
    particles = [];
    for (let i = 0; i < particleCount; i++) {
        particles.push(new BloomParticle(true)); // distribute initially
    }
}

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

function animateCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Render and update each float particle
    particles.forEach(p => {
        p.update();
        p.draw();
    });

    requestAnimationFrame(animateCanvas);
}

// Initialize canvas and start animation after the DOM is ready
window.addEventListener('DOMContentLoaded', () => {
    initCanvas();
    animateCanvas();
});


// ==========================================================================
// 3. PRODUCT CATALOG RENDERING & FILTERING
// ==========================================================================
const productsContainer = document.getElementById("products-container");
const productsCountEl = document.getElementById("displayed-products-count");

function renderProducts() {
    productsContainer.innerHTML = "";

    // Apply Filter
    let filteredList = PRODUCTS.filter(p => {
        if (currentFilter === "all") return true;
        return p.department === currentFilter;
    });

    // Apply Sort
    if (currentSort === "price-low") {
        filteredList.sort((a, b) => a.price - b.price);
    } else if (currentSort === "price-high") {
        filteredList.sort((a, b) => b.price - a.price);
    } else if (currentSort === "name") {
        filteredList.sort((a, b) => a.name.localeCompare(b.name));
    }
    // "popular" retains custom listing sequence

    productsCountEl.textContent = filteredList.length;

    if (filteredList.length === 0) {
        productsContainer.innerHTML = `
            <div class="empty-results text-center" style="grid-column: 1/-1; padding: 40px; color: var(--light-text);">
                <i class="fa-solid fa-basket-shopping" style="font-size: 3rem; color: var(--primary-light); margin-bottom: 12px;"></i>
                <p>No floral products found matching that filter.</p>
            </div>
        `;
        return;
    }

    filteredList.forEach(product => {
        const card = document.createElement("div");
        card.className = "product-card";
        card.setAttribute("data-id", product.id);

        card.innerHTML = `
            <span class="product-card-badge badge-${product.department}">
                <i class="fa-solid ${product.department === 'crochet' ? 'fa-circle-nodes' : product.department === 'paper' ? 'fa-scissors' : 'fa-clover'}"></i>
                ${product.department}
            </span>
            <button class="product-card-wish" aria-label="Add to Wishlist"><i class="fa-regular fa-heart"></i></button>
            
            <div class="product-card-media" onclick="openProductModal('${product.id}')">
                <div class="product-media-placeholder">
                    <i class="fa-solid fa-seedling"></i>
                    <span>${product.character}</span>
                </div>
            </div>
            
            <div class="product-card-info">
                <h3 onclick="openProductModal('${product.id}')">${product.name}</h3>
                <p class="product-card-desc">${product.desc.substring(0, 80)}...</p>
                
                <div class="product-meta-details">
                    <span><i class="fa-solid fa-leaf"></i> ${product.material.split(" ")[0]}</span>
                    <span><i class="fa-solid fa-scale-balanced"></i> ${product.weight}</span>
                </div>
                
                <div class="product-card-footer">
                    <div class="product-price-tag">
                        <span class="price-desc">Fresh per ${product.unit}</span>
                        <span class="price-val">$${product.price.toFixed(2)}</span>
                    </div>
                    <button class="add-to-basket-btn" onclick="addToCart('${product.id}')" aria-label="Add to basket">
                        <i class="fa-solid fa-plus"></i>
                    </button>
                </div>
            </div>
        `;
        productsContainer.appendChild(card);
    });
}

// Global Search
const globalSearchInput = document.getElementById("global-search");
globalSearchInput.addEventListener("input", (e) => {
    const query = e.target.value.toLowerCase().trim();
    const allCards = productsContainer.querySelectorAll(".product-card");

    allCards.forEach(card => {
        const id = card.getAttribute("data-id");
        const product = PRODUCTS.find(p => p.id === id);
        if (product) {
            const matchesSearch = product.name.toLowerCase().includes(query) || 
                                  product.desc.toLowerCase().includes(query) || 
                                  product.material.toLowerCase().includes(query);
            card.style.display = matchesSearch ? "flex" : "none";
        }
    });
});

// Category Filter buttons
const filterBtns = document.querySelectorAll(".filter-btn");
filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        filterBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        currentFilter = btn.getAttribute("data-filter");
        renderProducts();
    });
});

// Sort Selector
const sortProductsSelect = document.getElementById("sort-products");
sortProductsSelect.addEventListener("change", (e) => {
    currentSort = e.target.value;
    renderProducts();
});

// ==========================================================================
// 4. PRODUCT DETAILS MODAL
// ==========================================================================
const productModalOverlay = document.getElementById("product-modal-overlay");
const productDetailModal = document.getElementById("product-detail-modal");
const modalProductContent = document.getElementById("modal-product-content");

function openProductModal(id) {
    const product = PRODUCTS.find(p => p.id === id);
    if (!product) return;

    modalProductContent.innerHTML = `
        <div class="modal-gallery">
            <div class="product-media-placeholder">
                <i class="fa-solid fa-seedling"></i>
                <span style="font-size: 5rem; margin-top: 10px;">${product.character}</span>
            </div>
        </div>
        <div class="modal-info">
            <span class="product-card-badge badge-${product.department}">${product.department}</span>
            <h2>${product.name}</h2>
            
            <div class="modal-price-row">
                <span class="modal-price-val">$${product.price.toFixed(2)}</span>
                <span class="modal-price-desc">Freshly harvested per ${product.unit}</span>
            </div>
            
            <p class="modal-desc">${product.desc}</p>
            
            <div class="modal-specs">
                <div class="spec-item"><i class="fa-solid fa-fingerprint"></i> <strong>Material:</strong> ${product.material}</div>
                <div class="spec-item"><i class="fa-solid fa-expand"></i> <strong>Dimensions:</strong> ${product.dimensions}</div>
                <div class="spec-item"><i class="fa-solid fa-weight-hanging"></i> <strong>Weight:</strong> ${product.weight}</div>
                <div class="spec-item"><i class="fa-solid fa-heart-pulse"></i> <strong>Care:</strong> ${product.care}</div>
            </div>
            
            <button class="btn btn-primary" onclick="addToCart('${product.id}'); closeProductModal();">
                <i class="fa-solid fa-basket-shopping"></i> Add to Grocery Basket
            </button>
        </div>
    `;

    productModalOverlay.classList.add("active");
    productDetailModal.classList.add("active");
    activeProductModal = id;
}

function closeProductModal() {
    productModalOverlay.classList.remove("active");
    productDetailModal.classList.remove("active");
    activeProductModal = null;
}

document.getElementById("close-product-modal").addEventListener("click", closeProductModal);
productModalOverlay.addEventListener("click", closeProductModal);

// ==========================================================================
// 5. SHOPPING BASKET DRAWER
// ==========================================================================
const cartDrawer = document.getElementById("cart-drawer");
const drawerOverlay = document.getElementById("drawer-overlay");
const cartItemsContainer = document.getElementById("cart-items-container");
const cartCountEl = document.getElementById("cart-count");
const cartSubtotalEl = document.getElementById("cart-subtotal");
const cartTotalEl = document.getElementById("cart-total");
const giftWrapToggle = document.getElementById("gift-wrap-toggle");
const wrappingLine = document.getElementById("wrapping-line");
const cartWrappingEl = document.getElementById("cart-wrapping");

function toggleCartDrawer() {
    cartDrawer.classList.toggle("active");
    drawerOverlay.classList.toggle("active");
}

document.getElementById("cart-toggle").addEventListener("click", toggleCartDrawer);
document.getElementById("close-cart").addEventListener("click", toggleCartDrawer);
drawerOverlay.addEventListener("click", toggleCartDrawer);

function addToCart(id, customData = null) {
    let item;
    
    if (customData) {
        // Special custom bouquet
        item = {
            id: customData.id,
            name: customData.name,
            price: customData.price,
            character: "💐",
            department: "custom",
            unit: "unique piece",
            quantity: 1,
            desc: customData.desc
        };
        cart.push(item);
    } else {
        // Standard catalog product
        const product = PRODUCTS.find(p => p.id === id);
        if (!product) return;

        const existingItem = cart.find(item => item.id === id);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                ...product,
                quantity: 1
            });
        }
    }

    updateCartUI();
    
    // Add micro-bounce to basket icon
    const cartIcon = document.getElementById("cart-toggle");
    cartIcon.classList.add("animate-pulse");
    setTimeout(() => cartIcon.classList.remove("animate-pulse"), 400);
}

function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    updateCartUI();
}

function adjustQuantity(id, amount) {
    const item = cart.find(item => item.id === id);
    if (!item) return;

    item.quantity += amount;
    if (item.quantity <= 0) {
        removeFromCart(id);
    } else {
        updateCartUI();
    }
}

function updateCartUI() {
    cartItemsContainer.innerHTML = "";

    let totalItems = 0;
    let subtotal = 0;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `
            <div class="empty-cart-state">
                <i class="fa-solid fa-basket-shopping"></i>
                <p>Your basket is currently empty.</p>
                <a href="#aisles" class="btn btn-primary" onclick="toggleCartDrawer()">Browse the Aisles</a>
            </div>
        `;
        cartCountEl.textContent = "0";
        cartSubtotalEl.textContent = "$0.00";
        cartTotalEl.textContent = "$0.00";
        wrappingLine.style.display = "none";
        return;
    }

    cart.forEach(item => {
        totalItems += item.quantity;
        subtotal += item.price * item.quantity;

        const cartItemEl = document.createElement("div");
        cartItemEl.className = "cart-item";
        
        cartItemEl.innerHTML = `
            <div class="cart-item-img">
                <span>${item.character}</span>
            </div>
            <div class="cart-item-details">
                <h4>${item.name}</h4>
                <div class="cart-item-desc">${item.department} | ${item.unit}</div>
                <div class="cart-item-price">$${item.price.toFixed(2)}</div>
            </div>
            <div class="cart-item-controls">
                <button class="remove-cart-item" onclick="removeFromCart('${item.id}')" aria-label="Remove item">
                    <i class="fa-regular fa-trash-can"></i>
                </button>
                <div class="quantity-spin">
                    <button onclick="adjustQuantity('${item.id}', -1)">-</button>
                    <span>${item.quantity}</span>
                    <button onclick="adjustQuantity('${item.id}', 1)">+</button>
                </div>
            </div>
        `;
        cartItemsContainer.appendChild(cartItemEl);
    });

    cartCountEl.textContent = totalItems;
    cartSubtotalEl.textContent = `$${subtotal.toFixed(2)}`;

    // Wrap option calculations
    const isGiftWrapped = giftWrapToggle.checked;
    const wrapPrice = 3.50;
    let finalTotal = subtotal;

    if (isGiftWrapped) {
        wrappingLine.style.display = "flex";
        finalTotal += wrapPrice;
    } else {
        wrappingLine.style.display = "none";
    }

    cartTotalEl.textContent = `$${finalTotal.toFixed(2)}`;
}

giftWrapToggle.addEventListener("change", updateCartUI);

// ==========================================================================
// 6. BUILD-A-BUNCH BOUQUET STATION
// ==========================================================================
const stemSelectorsGrid = document.getElementById("stem-selectors");
const bouquetStemsContainer = document.getElementById("bouquet-stems-container");
const bouquetAddedList = document.getElementById("bouquet-added-list");
const bouquetTotalPriceEl = document.getElementById("bouquet-total-price");
const addBouquetToCartBtn = document.getElementById("add-bouquet-to-cart");
const emptyBouquetText = document.getElementById("empty-bouquet-text");

function initBouquetBuilder() {
    stemSelectorsGrid.innerHTML = "";
    
    FLORIST_STEMS.forEach(stem => {
        const bin = document.createElement("div");
        bin.className = "stem-bin";
        bin.onclick = () => addStemToBouquet(stem.id);
        
        bin.innerHTML = `
            <div class="stem-bin-icon">${stem.char}</div>
            <h4>${stem.name}</h4>
            <div class="stem-bin-price">$${stem.price.toFixed(2)} / stem</div>
        `;
        stemSelectorsGrid.appendChild(bin);
    });
}

function addStemToBouquet(stemId) {
    const stemInfo = FLORIST_STEMS.find(s => s.id === stemId);
    if (!stemInfo) return;

    // Unique stem instanced key
    const uniqueId = `b-stem-${Date.now()}-${Math.floor(Math.random() * 100)}`;
    
    // Random positions and angles to create a beautiful naturally stacked bouquet
    const randomLeft = Math.floor(Math.random() * 120) + 70; // bounds in wrapping paper
    const randomAngle = (Math.random() - 0.5) * 45; // rotate degrees (-22 to +22)
    const randomScale = Math.random() * 0.2 + 0.9; // sizes
    
    const stemInstance = {
        uniqueId: uniqueId,
        ...stemInfo,
        left: randomLeft,
        angle: randomAngle,
        scale: randomScale
    };

    bouquet.push(stemInstance);
    updateBouquetUI();
}

function removeStemFromBouquet(uniqueId) {
    bouquet = bouquet.filter(item => item.uniqueId !== uniqueId);
    updateBouquetUI();
}

function updateBouquetUI() {
    // Clear dynamic stems except empty text notice
    const notices = bouquetStemsContainer.querySelectorAll(".empty-bouquet-notice");
    bouquetStemsContainer.innerHTML = "";
    
    if (bouquet.length === 0) {
        bouquetStemsContainer.appendChild(emptyBouquetText);
        emptyBouquetText.style.display = "flex";
        bouquetAddedList.innerHTML = `
            <div class="text-center" style="font-size: 0.8rem; color: var(--light-text); padding: 10px;">
                No flowers added yet.
            </div>
        `;
        bouquetTotalPriceEl.textContent = "$0.00";
        addBouquetToCartBtn.disabled = true;
        return;
    }

    // Hide notice
    emptyBouquetText.style.display = "none";

    let total = 0;
    bouquetAddedList.innerHTML = "";

    // 1. Render botanical stems inside paper wrapping visualizer
    bouquet.forEach((item, index) => {
        total += item.price;
        
        // Render visual stem
        const visualStem = document.createElement("div");
        visualStem.className = "bouquet-added-stem";
        // Stack stems slightly offset in vertical layered steps
        visualStem.style.left = `${item.left}px`;
        visualStem.style.transform = `rotate(${item.angle}deg) scale(${item.scale})`;
        visualStem.style.bottom = `${10 + (index * 4)}px`; // stack layers
        visualStem.style.zIndex = index + 1;

        visualStem.innerHTML = `
            <span style="font-size: ${4.2 * item.scale}rem; filter: drop-shadow(0 5px 8px rgba(0,0,0,0.12));">${item.char}</span>
        `;
        bouquetStemsContainer.appendChild(visualStem);

        // 2. Render item list rows
        const listItem = document.createElement("div");
        listItem.className = "bouquet-list-item";
        
        listItem.innerHTML = `
            <span>${item.name} (${item.char})</span>
            <div>
                <span style="margin-right: 10px;">$${item.price.toFixed(2)}</span>
                <button class="delete-stem-btn" onclick="removeStemFromBouquet('${item.uniqueId}')" aria-label="Remove item">
                    <i class="fa-solid fa-xmark"></i>
                </button>
            </div>
        `;
        bouquetAddedList.appendChild(listItem);
    });

    bouquetTotalPriceEl.textContent = `$${total.toFixed(2)}`;
    addBouquetToCartBtn.disabled = false;
}

addBouquetToCartBtn.addEventListener("click", () => {
    if (bouquet.length === 0) return;

    const totalPrice = bouquet.reduce((sum, item) => sum + item.price, 0);
    const flowerBreakdown = bouquet.map(item => item.name).join(", ");
    
    const customBouquetData = {
        id: `custom-bouquet-${Date.now()}`,
        name: "Custom Handcrafted Bouquet",
        price: totalPrice,
        desc: `A customized everlasting florist bouquet wrapped beautifully. Contains: ${flowerBreakdown}.`
    };

    addToCart(null, customBouquetData);
    
    // Reset builder
    bouquet = [];
    updateBouquetUI();
    
    // Toggle cart open to show custom item added
    toggleCartDrawer();
});

// ==========================================================================
// 7. STEPS CHECKOUT WIZARD
// ==========================================================================
const checkoutTrigger = document.getElementById("checkout-trigger");
const checkoutModalOverlay = document.getElementById("checkout-modal-overlay");
const checkoutModal = document.getElementById("checkout-modal");
const closeCheckoutBtn = document.getElementById("close-checkout-modal");
const cancelCheckoutBtn = document.getElementById("cancel-checkout");
const stepIndicators = document.querySelectorAll(".step-indicator");
const stepPanes = document.querySelectorAll(".checkout-step-pane");

function openCheckout() {
    if (cart.length === 0) {
        alert("Please add some items to your grocery basket first!");
        return;
    }
    
    // Close cart drawer
    cartDrawer.classList.remove("active");
    drawerOverlay.classList.remove("active");
    
    // Reset wizard steps
    setCheckoutStep(1);
    
    checkoutModalOverlay.classList.add("active");
    checkoutModal.classList.add("active");
}

function closeCheckout() {
    checkoutModalOverlay.classList.remove("active");
    checkoutModal.classList.remove("active");
}

checkoutTrigger.addEventListener("click", openCheckout);
closeCheckoutBtn.addEventListener("click", closeCheckout);
cancelCheckoutBtn.addEventListener("click", closeCheckout);
checkoutModalOverlay.addEventListener("click", closeCheckout);

function setCheckoutStep(stepNumber) {
    checkoutStep = stepNumber;
    
    // Sync indicator lights
    stepIndicators.forEach(ind => {
        const stepVal = parseInt(ind.getAttribute("data-step"));
        ind.classList.remove("active", "completed");
        if (stepVal === checkoutStep) {
            ind.classList.add("active");
        } else if (stepVal < checkoutStep) {
            ind.classList.add("completed");
        }
    });

    // Toggle content panes
    stepPanes.forEach(pane => {
        pane.classList.remove("active");
    });
    document.getElementById(`checkout-step-${checkoutStep}`).classList.add("active");

    // Prepopulate/update review or summaries
    if (checkoutStep === 1) {
        renderReviewStep();
    } else if (checkoutStep === 3) {
        // Sync final pricing
        let subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        if (giftWrapToggle.checked) subtotal += 3.50;
        document.getElementById("checkout-btn-price").textContent = `$${subtotal.toFixed(2)}`;
    }
}

// Step 1: Review Itemization
function renderReviewStep() {
    const container = document.getElementById("checkout-items-review");
    container.innerHTML = "";
    
    let subtotal = 0;
    cart.forEach(item => {
        const row = document.createElement("div");
        row.className = "review-item-row";
        const rowTotal = item.price * item.quantity;
        subtotal += rowTotal;

        row.innerHTML = `
            <span>${item.name} (${item.character}) × ${item.quantity}</span>
            <span>$${rowTotal.toFixed(2)}</span>
        `;
        container.appendChild(row);
    });

    if (giftWrapToggle.checked) {
        subtotal += 3.50;
        const row = document.createElement("div");
        row.className = "review-item-row";
        row.innerHTML = `
            <span><i class="fa-solid fa-gift"></i> Gourmet Wrapping & Bow</span>
            <span>$3.50</span>
        `;
        container.appendChild(row);
    }

    const totalRow = document.createElement("div");
    totalRow.className = "review-item-row";
    totalRow.style.borderTop = "2px dashed var(--border-color)";
    totalRow.style.paddingTop = "12px";
    totalRow.style.marginTop = "8px";
    totalRow.innerHTML = `
        <strong>Estimated Grand Total:</strong>
        <strong>$${subtotal.toFixed(2)}</strong>
    `;
    container.appendChild(totalRow);
}

// Navigation Actions
document.getElementById("goto-step-2").addEventListener("click", () => setCheckoutStep(2));
document.getElementById("backto-step-1").addEventListener("click", () => setCheckoutStep(1));
document.getElementById("backto-step-2").addEventListener("click", () => setCheckoutStep(2));

// Step 2: Shipping Form submission
const deliveryForm = document.getElementById("delivery-form");
deliveryForm.addEventListener("submit", (e) => {
    e.preventDefault();
    setCheckoutStep(3);
});

// Step 3: Payment Verification & card sync
const cardHolderInput = document.getElementById("card-holder");
const cardNumberInput = document.getElementById("card-number");
const cardExpiryInput = document.getElementById("card-expiry");
const cardCvvInput = document.getElementById("card-cvv");
const cardMockup = document.getElementById("credit-card-mockup");

const mockCardName = document.getElementById("mock-card-name");
const mockCardNumber = document.getElementById("mock-card-number");
const mockCardExpiry = document.getElementById("mock-card-expiry");
const mockCardCvv = document.getElementById("mock-card-cvv");

// Name syncing
cardHolderInput.addEventListener("input", (e) => {
    mockCardName.textContent = e.target.value.toUpperCase() || "YOUR NAME";
});

// Number spacing and syncing
cardNumberInput.addEventListener("input", (e) => {
    let val = e.target.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    let matches = val.match(/\d{4,16}/g);
    let match = matches && matches[0] || '';
    let parts = [];

    for (let i=0, len=match.length; i<len; i+=4) {
        parts.push(match.substring(i, i+4));
    }

    if (parts.length > 0) {
        cardNumberInput.value = parts.join(' ');
        mockCardNumber.textContent = parts.join(' ');
    } else {
        cardNumberInput.value = val;
        mockCardNumber.textContent = val || "•••• •••• •••• ••••";
    }
});

// Expiry MM/YY sync
cardExpiryInput.addEventListener("input", (e) => {
    let val = e.target.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (val.length >= 2) {
        cardExpiryInput.value = val.substring(0, 2) + '/' + val.substring(2, 4);
        mockCardExpiry.textContent = cardExpiryInput.value;
    } else {
        cardExpiryInput.value = val;
        mockCardExpiry.textContent = val || "MM/YY";
    }
});

// CVV flip behavior
cardCvvInput.addEventListener("focus", () => {
    cardMockup.classList.add("flipped");
});
cardCvvInput.addEventListener("blur", () => {
    cardMockup.classList.remove("flipped");
});
cardCvvInput.addEventListener("input", (e) => {
    mockCardCvv.textContent = e.target.value ? "•".repeat(e.target.value.length) : "•••";
});

// Payment Form Submit
const paymentForm = document.getElementById("payment-form");
paymentForm.addEventListener("submit", (e) => {
    e.preventDefault();
    
    // Complete Order Success details sync
    const buyerName = document.getElementById("shipping-name").value;
    const deliveryAddress = `${document.getElementById("shipping-address").value}, ${document.getElementById("shipping-city").value}`;
    const orderRef = `#PP-${Math.floor(Math.random() * 800000) + 100000}`;
    
    document.getElementById("success-buyer-name").textContent = buyerName;
    document.getElementById("success-address").textContent = deliveryAddress;
    document.getElementById("success-ref").textContent = orderRef;
    
    // Trigger Success Step
    setCheckoutStep(4);
    
    // Shower dynamic flower petals confetti
    triggerVisualBloomConfetti();
    
    // Empty primary cart
    cart = [];
    updateCartUI();
});

// Success Step dismissal
document.getElementById("success-dismiss").addEventListener("click", () => {
    closeCheckout();
});

// Client-Side Invoice Viewer/Download (Simulated PDF download)
document.getElementById("download-invoice-btn").addEventListener("click", () => {
    const buyerName = document.getElementById("shipping-name").value;
    const deliveryAddress = `${document.getElementById("shipping-address").value}, ${document.getElementById("shipping-city").value}`;
    const orderRef = document.getElementById("success-ref").textContent;
    
    let invoiceContent = `
========================================
       PETAL PANTRY - INVOICE RECEIPT
========================================
Order Reference: ${orderRef}
Date: ${new Date().toLocaleDateString()}
Status: PAID (Demo Verification)

Recipient Details:
------------------
Name: ${buyerName}
Shipping: ${deliveryAddress}

Thank you for selecting Petal Pantry. 
Your everlasting flowers will be handcrafted 
with the utmost botanical care by our local artisans.
========================================
`;
    
    // Open in a text-based blob URL to view immediately
    const blob = new Blob([invoiceContent], { type: 'text/plain' });
    const blobURL = URL.createObjectURL(blob);
    window.open(blobURL, '_blank');
});

// ==========================================================================
// 8. PETAL CONFETTI SUCCESS BLOOM ANIMATION
// ==========================================================================
function triggerVisualBloomConfetti() {
    // We can spawn lots of temporary particles in our floating canvas that drift faster and burst out!
    const burstCount = 60;
    for (let i = 0; i < burstCount; i++) {
        setTimeout(() => {
            const burstParticle = new BloomParticle(false);
            // Spawn at random locations on the canvas screen
            burstParticle.x = Math.random() * canvas.width;
            burstParticle.y = canvas.height + 20; // launch from bottom
            // Shoot up super fast!
            burstParticle.speed = Math.random() * 3 + 2; 
            burstParticle.scale = Math.random() * 1.2 + 0.6;
            particles.push(burstParticle);
        }, i * 40); // sequenced delay bloom
    }
}

// ==========================================================================
// 9. INITIALIZE ON DOM LOAD
// ==========================================================================
document.addEventListener("DOMContentLoaded", () => {
    // 1. Floating Canvas Effect
    initCanvas();
    animateCanvas();
    
    // 2. Load Aisle Products
    renderProducts();
    
    // 3. Setup Bouquet bin stems
    initBouquetBuilder();
    updateBouquetUI();
    
    // 4. Update initial Cart badges
    updateCartUI();
});
