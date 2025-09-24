// Script para integração do Decap CMS com o site principal
// Este script carrega os dados do CMS e atualiza o site dinamicamente

class CMSIntegration {
    constructor() {
        this.productsData = [];
        this.siteInfo = {};
        this.carouselImages = [];
        this.init();
    }

    async init() {
        try {
            await this.loadSiteInfo();
            await this.loadProducts();
            await this.loadCarouselImages();
            this.updateSite();
        } catch (error) {
            console.log('CMS não configurado ainda, usando dados padrão');
            this.loadDefaultData();
        }
    }

    async loadSiteInfo() {
        try {
            const response = await fetch('/_data/site_info.yml');
            if (response.ok) {
                const yamlText = await response.text();
                this.siteInfo = this.parseYAML(yamlText);
            }
        } catch (error) {
            console.log('Usando informações padrão do site');
        }
    }

    async loadProducts() {
        try {
            // Carregar produtos do diretório _produtos
            const productFiles = await this.getProductFiles();
            this.productsData = await Promise.all(
                productFiles.map(file => this.loadProductFile(file))
            );
        } catch (error) {
            console.log('Usando produtos padrão');
        }
    }

    async loadCarouselImages() {
        try {
            // Carregar imagens do carrossel do diretório _carrossel
            const carouselFiles = await this.getCarouselFiles();
            this.carouselImages = await Promise.all(
                carouselFiles.map(file => this.loadCarouselFile(file))
            );
        } catch (error) {
            console.log('Usando imagens padrão do carrossel');
        }
    }

    parseYAML(yamlText) {
        // Parser YAML simples para as configurações básicas
        const lines = yamlText.split('\n');
        const result = {};
        
        for (const line of lines) {
            if (line.includes(':')) {
                const [key, value] = line.split(':').map(s => s.trim());
                if (value && !value.startsWith('#')) {
                    result[key] = value.replace(/['"]/g, '');
                }
            }
        }
        
        return result;
    }

    async getProductFiles() {
        // Em um ambiente real, isso seria feito via API do GitHub
        // Por enquanto, retornamos uma lista vazia
        return [];
    }

    async getCarouselFiles() {
        // Em um ambiente real, isso seria feito via API do GitHub
        // Por enquanto, retornamos uma lista vazia
        return [];
    }

    loadDefaultData() {
        // Carregar dados padrão quando o CMS não estiver configurado
        this.siteInfo = {
            company_name: "Visual Art Studio",
            tagline: "Transforme sua marca com comunicação visual impactante",
            whatsapp: "5542999152224",
            email: "t.rogato@gmail.com"
        };
    }

    updateSite() {
        // Atualizar elementos do site com dados do CMS
        if (this.siteInfo.company_name) {
            const titleElements = document.querySelectorAll('h1, .company-name');
            titleElements.forEach(el => {
                if (el.textContent.includes('Visual Art Studio')) {
                    el.textContent = el.textContent.replace('Visual Art Studio', this.siteInfo.company_name);
                }
            });
        }

        if (this.siteInfo.tagline) {
            const taglineElements = document.querySelectorAll('.tagline, .hero-subtitle');
            taglineElements.forEach(el => {
                if (el.textContent.includes('comunicação visual impactante')) {
                    el.textContent = this.siteInfo.tagline;
                }
            });
        }

        // Atualizar informações de contato
        if (this.siteInfo.whatsapp) {
            const whatsappElements = document.querySelectorAll('[href*="wa.me"], [href*="whatsapp"]');
            whatsappElements.forEach(el => {
                el.href = el.href.replace(/\d+/, this.siteInfo.whatsapp);
            });
        }

        if (this.siteInfo.email) {
            const emailElements = document.querySelectorAll('[href^="mailto:"]');
            emailElements.forEach(el => {
                el.href = `mailto:${this.siteInfo.email}`;
            });
        }
    }

    // Método para adicionar produtos dinamicamente (se carregados do CMS)
    renderProducts() {
        if (this.productsData.length > 0) {
            const productsContainer = document.querySelector('.products-grid');
            if (productsContainer) {
                productsContainer.innerHTML = '';
                this.productsData.forEach(product => {
                    const productElement = this.createProductElement(product);
                    productsContainer.appendChild(productElement);
                });
            }
        }
    }

    createProductElement(product) {
        const productDiv = document.createElement('div');
        productDiv.className = 'product-card';
        productDiv.innerHTML = `
            <div class="product-image">
                <img src="${product.image}" alt="${product.title}">
                <div class="discount-badge">-${product.discount_percent}%</div>
            </div>
            <div class="product-info">
                <span class="product-category">${product.category}</span>
                <h3 class="product-title">${product.title}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-price">
                    <span class="original-price">R$ ${product.original_price}</span>
                    <span class="sale-price">R$ ${product.sale_price}</span>
                </div>
                <div class="product-actions">
                    <button class="btn-details" onclick="openProductModal('${product.title}')">Ver Detalhes</button>
                    <button class="btn-add-cart" onclick="addToCart('${product.title}', ${product.sale_price})">Adicionar</button>
                </div>
            </div>
        `;
        return productDiv;
    }
}

// Inicializar integração do CMS quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    new CMSIntegration();
});

// Função para acessar o painel administrativo
function openAdminPanel() {
    window.open('/admin/', '_blank');
}

// Adicionar botão de acesso ao admin (apenas para desenvolvimento)
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    document.addEventListener('DOMContentLoaded', () => {
        const adminButton = document.createElement('button');
        adminButton.textContent = '⚙️ Admin';
        adminButton.style.cssText = `
            position: fixed;
            top: 10px;
            right: 10px;
            z-index: 9999;
            background: #6366f1;
            color: white;
            border: none;
            padding: 10px 15px;
            border-radius: 5px;
            cursor: pointer;
            font-size: 14px;
        `;
        adminButton.onclick = openAdminPanel;
        document.body.appendChild(adminButton);
    });
}

