// Shared shoe catalog used across the storefront.
const products = [
  {
    id: 1,
    name: 'Air Runner',
    category: 'Running',
    price: 129,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80',
    featured: true,
    bestSeller: true,
    newArrival: true,
    favorite: false,
  },
  {
    id: 2,
    name: 'Urban Classic',
    category: 'Lifestyle',
    price: 148,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=800&q=80',
    featured: true,
    bestSeller: false,
    newArrival: true,
    favorite: false,
  },
  {
    id: 3,
    name: 'Street Force',
    category: 'Casual',
    price: 110,
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=800&q=80',
    featured: false,
    bestSeller: true,
    newArrival: false,
    favorite: false,
  },
  {
    id: 4,
    name: 'Sport Max',
    category: 'Training',
    price: 138,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1600269452121-4f2416e55c28?auto=format&fit=crop&w=800&q=80',
    featured: true,
    bestSeller: true,
    newArrival: false,
    favorite: false,
  },
  {
    id: 5,
    name: 'Cloud Walk',
    category: 'Lifestyle',
    price: 119,
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1543508282-6319a3e2621f?auto=format&fit=crop&w=800&q=80',
    featured: false,
    bestSeller: false,
    newArrival: true,
    favorite: false,
  },
  {
    id: 6,
    name: 'Classic White',
    category: 'Casual',
    price: 96,
    rating: 4.4,
    image: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=800&q=80',
    featured: false,
    bestSeller: false,
    newArrival: true,
    favorite: false,
  },
  {
    id: 7,
    name: 'Black Runner',
    category: 'Running',
    price: 136,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?auto=format&fit=crop&w=800&q=80',
    featured: false,
    bestSeller: true,
    newArrival: false,
    favorite: false,
  },
  {
    id: 8,
    name: 'Speed Pro',
    category: 'Training',
    price: 154,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=800&q=80',
    featured: true,
    bestSeller: true,
    newArrival: true,
    favorite: false,
  },
  {
    id: 9,
    name: 'Daily Comfort',
    category: 'Casual',
    price: 104,
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1543508282-6319a3e2621f?auto=format&fit=crop&w=800&q=80',
    featured: false,
    bestSeller: true,
    newArrival: false,
    favorite: false,
  },
  {
    id: 10,
    name: 'Retro High',
    category: 'Lifestyle',
    price: 142,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=800&q=80',
    featured: true,
    bestSeller: false,
    newArrival: false,
    favorite: false,
  },
  {
    id: 11,
    name: 'City Sneaker',
    category: 'Lifestyle',
    price: 121,
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1607677686474-ad91fc94f5ae?auto=format&fit=crop&w=800&q=80',
    featured: false,
    bestSeller: false,
    newArrival: true,
    favorite: false,
  },
  {
    id: 12,
    name: 'Flex Trainer',
    category: 'Training',
    price: 132,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=800&q=80',
    featured: false,
    bestSeller: true,
    newArrival: false,
    favorite: false,
  },
];

const cartKey = 'stepup-cart';
const favoriteKey = 'stepup-favorites';

// Helper to safely read localStorage values.
function readStorage(key, fallback) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch (error) {
    return fallback;
  }
}

function saveStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function formatPrice(value) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value);
}

function getCart() {
  return readStorage(cartKey, []);
}

function getFavorites() {
  return readStorage(favoriteKey, []);
}

function updateCartBadge() {
  const cart = getCart();
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const badges = document.querySelectorAll('.cart-count');
  badges.forEach((badge) => {
    badge.textContent = totalItems;
    badge.style.display = totalItems > 0 ? 'flex' : 'none';
  });
}

function updateFavoritesBadge() {
  const favorites = getFavorites();
  const badges = document.querySelectorAll('.favorite-count');
  badges.forEach((badge) => {
    badge.textContent = favorites.length;
    badge.style.display = favorites.length > 0 ? 'flex' : 'none';
  });
}

function toggleFavorite(productId) {
  const favorites = getFavorites();
  const index = favorites.indexOf(productId);

  if (index === -1) {
    favorites.push(productId);
  } else {
    favorites.splice(index, 1);
  }

  saveStorage(favoriteKey, favorites);
  updateFavoritesBadge();
  renderProductGrid();
}

function addToCart(productId) {
  const cart = getCart();
  const existingItem = cart.find((item) => item.id === productId);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ id: productId, quantity: 1 });
  }

  saveStorage(cartKey, cart);
  updateCartBadge();
  renderCart();
}

function changeCartQuantity(productId, change) {
  const cart = getCart();
  const item = cart.find((entry) => entry.id === productId);

  if (!item) return;

  item.quantity += change;

  if (item.quantity <= 0) {
    removeFromCart(productId);
    return;
  }

  saveStorage(cartKey, cart);
  updateCartBadge();
  renderCart();
}

function removeFromCart(productId) {
  const cart = getCart().filter((item) => item.id !== productId);
  saveStorage(cartKey, cart);
  updateCartBadge();
  renderCart();
}

function getProductById(productId) {
  return products.find((product) => product.id === productId);
}

function renderProductCard(product) {
  const favorites = getFavorites();
  const isFavorite = favorites.includes(product.id);

  return `
    <article class="product-card">
      <div class="product-image-wrap">
        <button class="favorite-btn ${isFavorite ? 'active' : ''}" data-favorite="${product.id}" aria-label="Favorite ${product.name}">
          <i class="${isFavorite ? 'fas' : 'far'} fa-heart"></i>
        </button>
        <img src="${product.image}" alt="${product.name}" />
      </div>
      <div class="product-body">
        <div class="product-topline">
          <span class="category-tag">${product.category}</span>
          <span class="rating"><i class="fas fa-star"></i> ${product.rating}</span>
        </div>
        <h3 class="product-name">${product.name}</h3>
        <div class="product-footer">
          <span class="price">${formatPrice(product.price)}</span>
          <button class="add-cart-btn" data-add-cart="${product.id}">Add to Cart</button>
        </div>
      </div>
    </article>
  `;
}

function renderProductGrid() {
  const shopGrid = document.getElementById('shopGrid');
  const homeFeatured = document.getElementById('home-featured');
  const homeNewArrivals = document.getElementById('home-new-arrivals');
  const homeBestSellers = document.getElementById('home-best-sellers');

  if (!shopGrid && !homeFeatured && !homeNewArrivals && !homeBestSellers) return;

  const selectedCategory = document.querySelector('.category-btn.active')?.dataset.category || 'all';
  const searchQuery = document.getElementById('searchInput')?.value.trim().toLowerCase() || '';
  const sortValue = document.getElementById('sortSelect')?.value || 'default';

  let filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch = !searchQuery || product.name.toLowerCase().includes(searchQuery);
    return matchesCategory && matchesSearch;
  });

  if (sortValue === 'low-high') {
    filteredProducts = filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sortValue === 'high-low') {
    filteredProducts = filteredProducts.sort((a, b) => b.price - a.price);
  }

  if (shopGrid) {
    shopGrid.innerHTML = filteredProducts.map(renderProductCard).join('');
  }

  if (homeFeatured) {
    homeFeatured.innerHTML = products.filter((product) => product.featured).slice(0, 4).map(renderProductCard).join('');
  }

  if (homeNewArrivals) {
    homeNewArrivals.innerHTML = products.filter((product) => product.newArrival).slice(0, 4).map(renderProductCard).join('');
  }

  if (homeBestSellers) {
    homeBestSellers.innerHTML = products.filter((product) => product.bestSeller).slice(0, 4).map(renderProductCard).join('');
  }

  bindProductActions();
}

function bindProductActions() {
  document.querySelectorAll('[data-add-cart]').forEach((button) => {
    button.addEventListener('click', () => addToCart(Number(button.dataset.addCart)));
  });

  document.querySelectorAll('[data-favorite]').forEach((button) => {
    button.addEventListener('click', () => toggleFavorite(Number(button.dataset.favorite)));
  });
}

function renderCart() {
  const cartItems = document.getElementById('cartItems');
  if (!cartItems) return;

  const cart = getCart();

  if (cart.length === 0) {
    cartItems.innerHTML = `
      <div class="empty-cart">
        <h3>Your cart is empty</h3>
        <p>Add a few pairs to get started.</p>
      </div>
    `;
    updateTotals(0, 0, 0);
    return;
  }

  let subtotal = 0;

  cartItems.innerHTML = cart
    .map((item) => {
      const product = getProductById(item.id);
      if (!product) return '';

      const lineTotal = product.price * item.quantity;
      subtotal += lineTotal;

      return `
        <div class="cart-item" data-product-id="${product.id}">
          <img src="${product.image}" alt="${product.name}" />
          <div>
            <h3>${product.name}</h3>
            <div class="item-meta">
              <span>${product.category}</span>
              <span class="item-price">${formatPrice(lineTotal)}</span>
            </div>
            <div class="item-controls">
              <div class="quantity-controls">
                <button class="decrease-qty" data-product-id="${product.id}" aria-label="Decrease quantity">-</button>
                <span>${item.quantity}</span>
                <button class="increase-qty" data-product-id="${product.id}" aria-label="Increase quantity">+</button>
              </div>
              <button class="remove-item" data-remove-id="${product.id}">Remove</button>
            </div>
          </div>
        </div>
      `;
    })
    .join('');

  const shipping = subtotal > 0 ? 18 : 0;
  updateTotals(subtotal, shipping, subtotal + shipping);

  document.querySelectorAll('.decrease-qty').forEach((button) => {
    button.addEventListener('click', () => changeCartQuantity(Number(button.dataset.productId), -1));
  });

  document.querySelectorAll('.increase-qty').forEach((button) => {
    button.addEventListener('click', () => changeCartQuantity(Number(button.dataset.productId), 1));
  });

  document.querySelectorAll('.remove-item').forEach((button) => {
    button.addEventListener('click', () => removeFromCart(Number(button.dataset.removeId)));
  });
}

function updateTotals(subtotal, shipping, total) {
  const subtotalValue = document.getElementById('subtotalValue');
  const shippingValue = document.getElementById('shippingValue');
  const totalValue = document.getElementById('totalValue');

  if (subtotalValue) subtotalValue.textContent = formatPrice(subtotal);
  if (shippingValue) shippingValue.textContent = formatPrice(shipping);
  if (totalValue) totalValue.textContent = formatPrice(total);
}

function setupCategoryFilters() {
  const categoryButtons = document.querySelectorAll('.category-btn');
  categoryButtons.forEach((button) => {
    button.addEventListener('click', () => {
      categoryButtons.forEach((item) => item.classList.remove('active'));
      button.classList.add('active');
      renderProductGrid();
    });
  });
}

function setupSearchFilter() {
  const searchInput = document.getElementById('searchInput');
  if (!searchInput) return;

  searchInput.addEventListener('input', renderProductGrid);
}

function setupSortFilter() {
  const sortSelect = document.getElementById('sortSelect');
  if (!sortSelect) return;

  sortSelect.addEventListener('change', renderProductGrid);
}

function setupNewsletterForm() {
  const form = document.getElementById('newsletterForm');
  if (!form) return;

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const emailInput = document.getElementById('newsletterEmail');
    if (!emailInput.value.trim()) {
      emailInput.focus();
      return;
    }

    emailInput.value = '';
    alert('Thanks for subscribing to STEPUP updates!');
  });
}

function setupContactFormValidation() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  const fullName = document.getElementById('fullName');
  const email = document.getElementById('email');
  const phone = document.getElementById('phone');
  const message = document.getElementById('message');

  const errorIdMap = {
    fullName: 'nameError',
    email: 'emailError',
    phone: 'phoneError',
    message: 'messageError',
  };

  const setError = (field, messageText) => {
    const errorElement = document.getElementById(errorIdMap[field.id]);
    if (errorElement) {
      errorElement.textContent = messageText;
    }
  };

  function validateField(field) {
    const value = field.value.trim();
    if (!value) {
      setError(field, `${field.name === 'fullName' ? 'Full name' : field.name === 'email' ? 'Email' : field.name === 'phone' ? 'Phone number' : 'Message'} is required.`);
      return false;
    }

    if (field.id === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      setError(field, 'Please enter a valid email address.');
      return false;
    }

    if (field.id === 'phone' && value.length < 8) {
      setError(field, 'Phone number should be at least 8 characters.');
      return false;
    }

    if (field.id === 'message' && value.length < 10) {
      setError(field, 'Message must be at least 10 characters long.');
      return false;
    }

    setError(field, '');
    return true;
  }

  [fullName, email, phone, message].forEach((field) => {
    field.addEventListener('blur', () => validateField(field));
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const isValid = [fullName, email, phone, message].every(validateField);

    const successMessage = document.getElementById('formSuccess');
    if (isValid) {
      successMessage.textContent = 'Your message has been sent successfully!';
      form.reset();
    } else {
      successMessage.textContent = '';
    }
  });
}

function setupMobileNav() {
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');

  if (!navToggle || !navMenu) return;

  navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('open');
  });

  navMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => navMenu.classList.remove('open'));
  });
}

function setupRevealAnimations() {
  const revealItems = document.querySelectorAll(
    '.feature-card, .section-heading, .product-card, .testimonial-card, .newsletter-content, .info-card, .contact-card, .mission-card, .story-image, .story-content, .hero-text, .hero-visual'
  );

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  revealItems.forEach((item) => {
    item.classList.add('reveal');
    observer.observe(item);
  });
}

function initializePage() {
  updateCartBadge();
  updateFavoritesBadge();
  renderProductGrid();
  renderCart();
  setupCategoryFilters();
  setupSearchFilter();
  setupSortFilter();
  setupNewsletterForm();
  setupContactFormValidation();
  setupMobileNav();
  setupRevealAnimations();
}

document.addEventListener('DOMContentLoaded', initializePage);
