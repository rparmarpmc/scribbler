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
        return this.input.value.trim()
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