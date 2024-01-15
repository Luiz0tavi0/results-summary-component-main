class SummaryItem extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.renderInitialContent();
    }

    connectedCallback() {
        this.renderStyle(this.getAttribute('text-color'));
        this.fillAll()
    }

    renderStyle(color) {

        this.shadowRoot.innerHTML = `
        <style>
        * {box-sizing: border-box;}
        
        #item {                    
            display: flex;
            align-items: center;            
            font-size: 1.5rem;            
            height: 5.5rem;            
            border-radius: 10px;
            padding: 1rem;
            border: none;
            position: relative;
        }
        #icon {            
            color: var(${color});
            margin: 0rem 2rem 0rem 2rem;
        }
        #category-label {
            color: var(${color});            
        }
        #percent {
            font-weight: 900;
            color: var(--light-lavender);
            position: absolute;
            right: 1rem;

        }
        #score {
            color: var(--dark-gray-blue) !important;
        }
        </style>` + this.shadowRoot.innerHTML;
        this.calckBackgroundColor(color);
    }

    renderInitialContent = () => {
        this.shadowRoot.innerHTML = `
            <div id="item"><img id="icon" src="">
                <h3 id="category-label"></h3>
                <div id="percent"><span id="score"></span> / 100</div>
            </div>
        `
    }
    calckBackgroundColor() {
        const item = this.shadowRoot.getElementById('item');
        const colorAttribute = this.getAttribute('text-color');
        const regex = /([\d])(?=\))/;
        const valueActualColor = getComputedStyle(item).getPropertyValue(colorAttribute);
        item.style.backgroundColor = valueActualColor.replace(regex, .13);

    }
    fillAll() {
        const iconImage = this.shadowRoot.getElementById('icon');
        iconImage.setAttribute('src', this.getAttribute('icon-src'));
        const category = this.shadowRoot.getElementById("category-label");
        category.innerText = this.getAttribute("category");

        const score = this.shadowRoot.getElementById("score");
        score.innerText = this.getAttribute("score");
    }
}

customElements.define('summary-item', SummaryItem);

export default SummaryItem;