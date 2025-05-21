const { eventNames } = require("gulp");

class PredictiveSearch extends HTMLElement {
    constructor() {
        super();
        this.input = this.querySelector('input[type="search"]');
        this.predictiveSearchResults = this.querySelector('[data-predictive-search]');
        this.setupEventListeners();
    }

    setupEventListeners() {
        const form = this.querySelector('form.search');
        form.addEventListener('submit', this.onFormSubmit.bind(this));
        this.addEventListener('input', this.onInput.bind(this));
    }

    getQuery() {
        return this.input.value.trim();
    }

    async fetchSearchResults(query) {
        if (query.length < 2) {
            this.predictiveSearchResults.innerHTML = ''; // Clear results if query is too short
            return;
        }

        try {
            const response = await fetch(`/search/suggest.json?q=${query}&resources[type]=product,variant`);
            const data = await response.json();

            console.log('API Response:', data); // Debugging: Ensure API returns SKU & inventory

            const products = data.resources.results.products || [];
            const variants = data.resources.results.variants || [];

            console.log('Products:', products);
            console.log('Variants:', variants);

            // Extract SKUs and Inventory from product variants
            let formattedProducts = products.map(product => {
                let skus = product.variants?.map(variant => ({
                    sku: variant.sku || 'N/A',
                    inventory: variant.inventory_quantity || 'Unknown'
                })).filter(item => item.sku.trim() !== '') || [];

                return {
                    title: product.title,
                    url: product.url,
                    image: product.image || '/default-image.jpg',
                    skus: skus.length > 0 ? skus.map(skuItem => skuItem.sku).join(', ') : 'N/A',
                    inventory: skus.length > 0 ? skus.map(skuItem => skuItem.inventory).join(', ') : 'Unknown',
                    body_html: this.stripHtml(product.body_html || '')
                };
            });

            // Extract SKUs and Inventory from variant results
            let formattedVariants = variants.map(variant => ({
                title: variant.product_title || 'Variant',
                url: variant.url,
                image: variant.image || variant.featured_image || '/default-image.jpg',
                skus: variant.sku && variant.sku.trim() !== '' ? variant.sku : (variant.inventory_item?.sku || 'N/A'),
                inventory: variant.inventory_quantity || (variant.inventory_item?.inventory_quantity || 'Unknown')
            }));

            // Merge product and variant results
            let combinedResults = [...formattedProducts, ...formattedVariants];

            // 🔍 **Filter by SKU (Supports Numbers, Letters, and Special Characters)**
            combinedResults = combinedResults.filter(item => 
                item.skus.toLowerCase().includes(query.toLowerCase())
            );

            console.log('Formatted Results:', combinedResults); // Debugging

            this.displaySearchResults(combinedResults);
        } catch (error) {
            console.error('Error fetching predictive search results:', error);
        }
    }

    displaySearchResults(products) {
        if (products.length === 0) {
            this.predictiveSearchResults.innerHTML = `<p>No results found</p>`;
            return;
        }

        this.predictiveSearchResults.innerHTML = products
            .map(product => `
                <div class="predictive-search-item">
                    <a href="${product.url}">
                        <img src="${product.image}" alt="${product.title}" />
                        <div>
                            <span class="title"><strong>${product.title}</strong></span>
                            <span class="sku">SKU(s): ${product.skus || 'N/A'}</span>
                            <span class="inventory">Stock: ${product.inventory || 'Unknown'}</span> 
                            <p class="description">${product.body_html.substring(0, 80)}...</p>
                        </div>
                    </a>
                </div>
            `)
            .join('');
    }

    stripHtml(html) {
        return html.replace(/(<([^>]+)>)/gi, ""); // Remove HTML tags from descriptions
    }

    onFormSubmit(event) {
        if (this.getQuery().length >= 1) {
            const queryKey = this.input.value.trim();
            window.location.href = '/search?q=' + queryKey;
        }
        event.preventDefault();
    }
    
    onInput(event) {
        if (event.code === 'ArrowUp' || event.code === 'ArrowDown') {
            event.preventDefault();
        }

        if (event.keyCode == 13) {
            event.preventDefault();
            const queryKey = this.input.value.trim();
            window.location.href = '/search?q=' + queryKey;
        } else {
            this.fetchSearchResults(this.getQuery()); // Fetch results dynamically
        }
    }
}
    
customElements.define('predictive-search', PredictiveSearch);