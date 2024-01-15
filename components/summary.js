// <!-- summary.js -->
class Summary extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });

        this.shadowRoot.innerHTML = `
        
        <style>
            * {box-sizing: border-box;}
            #summary{
                display:flex;
                flex-direction: column;
                // min-width:375px;
                height:50%;
                padding: 0rem 1.5rem 0rem 1.5rem;
                
            }
            #summary h1 {
                font-size:2.5rem;
                text-align: left;                
                color: var(--dark-gray-blue);
                
            }
            #items-wrapper{
                display: flex;
                flex-direction: column;
                gap:5px;
            }            
        </style>
        <div id="summary">
            <h1>Summary</h1>
            <div id="items-wrapper">
                
            </div>
        </div>
        `
        this.loadData(`${window.location.href}/data.json`);

    }

    loadData = async (filePath) => {
        try {
            const response = await fetch(filePath);
            if (!response.ok) {
                throw new Error(`Deu erro aqui: ${response.status}`);
            }
            const data = await response.json();
            this.populateSummaryItems(data);
        } catch (error) {
            console.error(`Erro: ${error.message}`);
        }
    }

    populateSummaryItems = (dataItems) => {
        const fragment = document.createDocumentFragment();
        dataItems.forEach(dataItem => {
            const { category, score, icon } = dataItem;
            const summaryItem = document.createElement("summary-item");
            summaryItem.setAttribute('category', category);
            summaryItem.setAttribute('score', String(score).toString().padStart(2, '0'));
            summaryItem.setAttribute('icon-src', icon);
            summaryItem.setAttribute('text-color', this.colorItem(category));

            fragment.appendChild(summaryItem);
        });
        this.shadowRoot.querySelector("#items-wrapper").appendChild(fragment);
    }

    colorItem = (category) => {
        switch (category.toLowerCase()) {
            case 'reaction':
                return "--light-red";
            case 'memory':
                return "--orangey-yellow";
            case 'verbal':
                return "--green-teal";
            case 'visual':
                return "--cobalt-blue";
        }

    }
}

customElements.define('summary-group', Summary);

export default Summary;
