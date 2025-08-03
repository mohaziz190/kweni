// KUINI Honey Website JavaScript
// Enhanced with scalable products section and smart grid management

class KuiniWebsite {
    constructor() {
        this.config = null;
        this.isLoaded = false;
        this.products = [];
        this.currentFilter = 'all';
        this.init();
    }

    async init() {
        try {
            await this.loadConfig();
            this.setupEventListeners();
            this.renderDynamicContent();
            this.initScrollAnimations();
            this.initMobileMenu();
            this.initContactForm();
            this.initProductFilters();
            this.isLoaded = true;
            console.log('✓ KUINI website initialized successfully');
        } catch (error) {
            console.error('✗ Failed to initialize website:', error);
            this.renderFallbackContent();
        }
    }

    async loadConfig() {
        try {
            const response = await fetch('config/site-config.json');
            if (!response.ok) throw new Error('Config file not found');
            this.config = await response.json();
            this.products = this.config.content?.products || [];
            this.applyThemeFromConfig();
        } catch (error) {
            console.warn('Config file not found, using fallback configuration');
            this.config = this.getFallbackConfig();
            this.products = this.config.content?.products || [];
        }
    }

    applyThemeFromConfig() {
        if (!this.config.theme) return;

        const root = document.documentElement;
        const colors = this.config.theme.colors;

        // Apply primary colors
        if (colors.primary) {
            root.style.setProperty('--color-honey-gold', colors.primary.honey_gold || '#D4A574');
            root.style.setProperty('--color-deep-honey', colors.primary.deep_honey || '#B8925A');
            root.style.setProperty('--color-light-honey', colors.primary.light_honey || '#E6C896');
            root.style.setProperty('--color-pale-honey', colors.primary.pale_honey || '#F4E4BC');
        }

        // Apply neutral colors
        if (colors.neutral) {
            root.style.setProperty('--color-creamy-white', colors.neutral.creamy_white || '#FAF7F2');
            root.style.setProperty('--color-warm-cream', colors.neutral.warm_cream || '#F5F1E8');
            root.style.setProperty('--color-soft-beige', colors.neutral.soft_beige || '#E8E0D4');
            root.style.setProperty('--color-light-gray', colors.neutral.light_gray || '#F7F7F7');
        }

        // Apply accent colors
        if (colors.accent) {
            root.style.setProperty('--color-forest-green', colors.accent.forest_green || '#2D5016');
            root.style.setProperty('--color-sage-green', colors.accent.sage_green || '#8BA888');
            root.style.setProperty('--color-moss-green', colors.accent.moss_green || '#5C7A47');
            root.style.setProperty('--color-leaf-green', colors.accent.leaf_green || '#7D9B6A');
        }

        // Apply semantic colors
        if (colors.semantic) {
            Object.entries(colors.semantic).forEach(([key, value]) => {
                root.style.setProperty(`--color-${key.replace('_', '-')}`, value);
            });
        }

        // Apply typography
        if (this.config.theme.typography?.font_families) {
            const typography = this.config.theme.typography;
            root.style.setProperty('--font-heading', typography.font_families.heading || "'Playfair Display', serif");
            root.style.setProperty('--font-body', typography.font_families.body || "'Inter', sans-serif");
            root.style.setProperty('--font-accent', typography.font_families.accent || "'Playfair Display', serif");
        }
    }

    renderDynamicContent() {
        this.renderBrandContent();
        this.renderHeroContent();
        this.renderProducts();
        this.renderBeekeeperInfo();
        this.renderContactInfo();
    }

    renderBrandContent() {
        const brand = this.config.brand;
        if (!brand) return;

        this.updateElement('brand-name', brand.name);
        this.updateElement('site-title', `${brand.name} - ${brand.tagline}`);
        this.updateElement('footer-brand-name', brand.name);
        this.updateElement('footer-tagline', brand.tagline);

        // Update meta description
        if (this.config.site) {
            const metaDesc = document.getElementById('site-description');
            if (metaDesc) metaDesc.setAttribute('content', this.config.site.description);
        }
    }

    renderHeroContent() {
        const hero = this.config.content?.hero;
        if (!hero) return;

        this.updateElement('hero-headline', hero.headline);
        this.updateElement('hero-subheadline', hero.subheadline);
        this.updateElement('hero-cta', hero.cta_text, 'textContent');

        if (hero.background_image) {
            const heroImg = document.getElementById('hero-image');
            if (heroImg) heroImg.src = hero.background_image;
        }
    }

    renderProducts() {
        if (!this.products || this.products.length === 0) return;

        const productsGrid = document.getElementById('products-grid');
        if (!productsGrid) return;

        // Set data attribute for CSS grid optimization
        productsGrid.setAttribute('data-product-count', this.products.length);

        // Show filters if more than 6 products
        if (this.products.length > 6) {
            const filtersContainer = document.getElementById('product-filters');
            if (filtersContainer) {
                filtersContainer.style.display = 'flex';
                this.setupProductCategories();
            }
        }

        // Clear existing content
        productsGrid.innerHTML = '';

        // Render products with enhanced cards
        this.products.forEach((product, index) => {
            const productCard = this.createProductCard(product, index);
            productsGrid.appendChild(productCard);
        });

        // Initialize staggered animations
        this.initProductAnimations();
    }

    createProductCard(product, index) {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.style.animationDelay = `${index * 0.1}s`;

        // Add filter attributes for filtering functionality
        const categories = this.getProductCategories(product);
        card.setAttribute('data-categories', categories.join(','));

        card.innerHTML = `
            <div class="product-image">
                <img src="${product.image || 'assets/images/product-placeholder.jpg'}" 
                     alt="${product.name}" 
                     loading="lazy"
                     onerror="this.src='assets/images/product-placeholder.jpg'">
            </div>
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <span class="product-grade">${product.grade || ''}</span>
                <p class="product-description">${product.description}</p>

                ${product.size || product.price_range ? `
                <div class="product-meta">
                    ${product.size ? `<span class="product-size">Size: ${product.size}</span>` : ''}
                    ${product.price_range ? `<span class="product-price-range">${product.price_range}</span>` : ''}
                </div>
                ` : ''}

                ${product.features && product.features.length > 0 ? `
                <ul class="product-features">
                    ${product.features.slice(0, 4).map(feature => `<li>${feature}</li>`).join('')}
                    ${product.features.length > 4 ? `<li>+${product.features.length - 4} more benefits</li>` : ''}
                </ul>
                ` : ''}

                ${product.best_for ? `
                <p class="product-best-for"><strong>Best for:</strong> ${product.best_for}</p>
                ` : ''}

                ${product.tasting_notes ? `
                <p class="tasting-notes"><strong>Tasting Notes:</strong> ${product.tasting_notes}</p>
                ` : ''}
            </div>
        `;

        return card;
    }

    getProductCategories(product) {
        const categories = ['all'];

        // Categorize by UMF rating
        if (product.grade) {
            if (product.grade.includes('UMF 20+') || product.grade.includes('UMF 25+')) {
                categories.push('therapeutic');
            } else if (product.grade.includes('UMF 5+') || product.grade.includes('UMF 10+')) {
                categories.push('daily');
            } else if (product.grade.includes('Multi-floral') || product.grade.includes('Blend')) {
                categories.push('specialty');
            }
        }

        // Categorize by type
        if (product.name.toLowerCase().includes('blend') || product.name.toLowerCase().includes('wildflower')) {
            categories.push('specialty');
        }

        return categories;
    }

    setupProductCategories() {
        const categories = new Set(['all']);
        this.products.forEach(product => {
            this.getProductCategories(product).forEach(cat => categories.add(cat));
        });

        const filtersContainer = document.getElementById('product-filters');
        if (!filtersContainer) return;

        const categoryNames = {
            all: 'All Products',
            therapeutic: 'Therapeutic Grade',
            daily: 'Daily Use',
            specialty: 'Special Blends'
        };

        filtersContainer.innerHTML = Array.from(categories)
            .map(category => `
                <button class="filter-btn ${category === 'all' ? 'active' : ''}" 
                        data-filter="${category}">
                    ${categoryNames[category] || category}
                </button>
            `).join('');
    }

    initProductFilters() {
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('filter-btn')) {
                // Update active filter button
                document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
                e.target.classList.add('active');

                // Filter products
                const filter = e.target.getAttribute('data-filter');
                this.filterProducts(filter);
            }
        });
    }

    filterProducts(filter) {
        this.currentFilter = filter;
        const productCards = document.querySelectorAll('.product-card');

        productCards.forEach((card, index) => {
            const categories = card.getAttribute('data-categories').split(',');
            const shouldShow = filter === 'all' || categories.includes(filter);

            if (shouldShow) {
                card.classList.remove('filtered-out');
                card.style.animationDelay = `${index * 0.05}s`;
                card.classList.add('fade-in-up');
            } else {
                card.classList.add('filtered-out');
            }
        });
    }

    initProductAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in-up');
                }
            });
        }, observerOptions);

        // Observe product cards
        document.querySelectorAll('.product-card').forEach(el => {
            observer.observe(el);
        });
    }

    renderBeekeeperInfo() {
        const beekeeper = this.config.content?.beekeeper;
        if (!beekeeper) return;

        this.updateElement('beekeeper-title', beekeeper.title);
        this.updateElement('beekeeper-name', beekeeper.name);
        this.updateElement('beekeeper-role', beekeeper.title_role);
        this.updateElement('beekeeper-experience', beekeeper.experience);
        this.updateElement('beekeeper-quote', beekeeper.quote);
        this.updateElement('beekeeper-background', beekeeper.background);

        if (beekeeper.image) {
            const beekeeperImg = document.getElementById('beekeeper-image');
            if (beekeeperImg) beekeeperImg.src = beekeeper.image;
        }

        const credentialsContainer = document.getElementById('beekeeper-credentials');
        if (credentialsContainer && beekeeper.credentials) {
            credentialsContainer.innerHTML = beekeeper.credentials.map(credential => 
                `<span class="credential-badge">${credential}</span>`
            ).join('');
        }
    }

    renderContactInfo() {
        const contact = this.config.content?.contact;
        if (!contact) return;

        this.updateElement('contact-title', contact.title);
        this.updateElement('contact-subtitle', contact.subtitle);
        this.updateElement('contact-phone', contact.phone);
        this.updateElement('contact-email', contact.email);
        this.updateElement('footer-phone', contact.phone);
        this.updateElement('footer-email', contact.email);

        if (contact.address) {
            const addressText = `${contact.address.street}<br>${contact.address.city} ${contact.address.postal_code}<br>${contact.address.country}`;
            this.updateElement('contact-address', addressText, 'innerHTML');
        }
    }

    updateElement(id, content, property = 'textContent') {
        const element = document.getElementById(id);
        if (element && content) {
            element[property] = content;
        }
    }

    setupEventListeners() {
        // Smooth scrolling for navigation links
        document.addEventListener('click', (e) => {
            const link = e.target.closest('a[href^="#"]');
            if (link) {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    const offsetTop = targetElement.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });

        // Navbar scroll effect
        window.addEventListener('scroll', () => {
            const navbar = document.getElementById('navbar');
            if (navbar) {
                if (window.scrollY > 100) {
                    navbar.classList.add('scrolled');
                } else {
                    navbar.classList.remove('scrolled');
                }
            }
            this.updateActiveNavLink();
        });

        // Resize handler for responsive grid
        window.addEventListener('resize', this.debounce(() => {
            this.optimizeProductsGrid();
        }, 250));
    }

    updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 120;

        sections.forEach(section => {
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

            if (navLink) {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;

                if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                    document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
                    navLink.classList.add('active');
                }
            }
        });
    }

    optimizeProductsGrid() {
        const productsGrid = document.getElementById('products-grid');
        if (!productsGrid || !this.products.length) return;

        // Update data attribute for responsive CSS
        productsGrid.setAttribute('data-product-count', this.products.length);
    }

    initScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in-up');
                }
            });
        }, observerOptions);

        // Observe all animatable elements
        document.querySelectorAll('.benefit-card, .practice-card, .testimonial-card').forEach(el => {
            observer.observe(el);
        });
    }

    initMobileMenu() {
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const navLinks = document.querySelector('.nav-links');

        if (mobileMenuBtn && navLinks) {
            mobileMenuBtn.addEventListener('click', () => {
                navLinks.classList.toggle('active');
                mobileMenuBtn.classList.toggle('active');
            });

            // Close mobile menu when clicking on a link
            navLinks.addEventListener('click', (e) => {
                if (e.target.classList.contains('nav-link')) {
                    navLinks.classList.remove('active');
                    mobileMenuBtn.classList.remove('active');
                }
            });
        }
    }

    initContactForm() {
        const contactForm = document.getElementById('contactForm');
        if (!contactForm) return;

        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);

            // Simulate form submission
            this.showFormMessage('Thank you for your message! We\'ll get back to you soon.', 'success');
            contactForm.reset();
        });
    }

    showFormMessage(message, type = 'success') {
        const messageEl = document.createElement('div');
        messageEl.className = `form-message ${type}`;
        messageEl.textContent = message;
        messageEl.style.cssText = `
            padding: 1rem;
            margin: 1rem 0;
            border-radius: 0.5rem;
            background-color: ${type === 'success' ? 'var(--color-success)' : 'var(--color-error)'};
            color: white;
            font-weight: 500;
        `;

        const contactForm = document.getElementById('contactForm');
        if (contactForm) {
            contactForm.appendChild(messageEl);
            setTimeout(() => messageEl.remove(), 5000);
        }
    }

    // Utility function for debouncing
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    getFallbackConfig() {
        return {
            brand: {
                name: "KUINI",
                tagline: "Pure Manuka. Pure New Zealand. Discover KUINI."
            },
            theme: {
                colors: {
                    primary: {
                        honey_gold: "#D4A574",
                        deep_honey: "#B8925A"
                    },
                    accent: {
                        forest_green: "#2D5016"
                    }
                }
            },
            content: {
                hero: {
                    headline: "Pure Manuka. Pure New Zealand. Discover KUINI.",
                    subheadline: "Experience the extraordinary healing power of authentic New Zealand Manuka Honey.",
                    cta_text: "Explore Our Story"
                },
                products: [
                    {
                        name: "KUINI Classic UMF 15+",
                        grade: "UMF 15+ | MGO 514+",
                        description: "Premium New Zealand Manuka Honey",
                        image: "assets/images/product-classic.jpg",
                        features: ["UMF 15+ certified", "Raw and unfiltered"]
                    }
                ],
                contact: {
                    title: "Connect with KUINI",
                    subtitle: "We'd love to hear from you",
                    phone: "+64 9 123 4567",
                    email: "hello@kuinihoney.co.nz"
                }
            }
        };
    }

    renderFallbackContent() {
        console.log('Rendering fallback content...');
        this.renderBrandContent();
        this.renderHeroContent();
        this.renderProducts();
        this.renderContactInfo();
    }
}

// Initialize the website when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new KuiniWebsite();
});

// Export for potential module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = KuiniWebsite;
}
