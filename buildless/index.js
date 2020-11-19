class ResultsTracker extends HTMLElement {
  constructor() {
    // Always call super first in constructor
    super();

    // Create a shadow root
    const shadow = this.attachShadow({mode: 'open'}); // sets and returns 'this.shadowRoot'

    // Create wrapping element
    const wrapper = document.createElement('div');
    wrapper.setAttribute('class', 'results-tracker');

    const winner = this.getAttribute('winner');

    wrapper.textContent = `ResultsTracker goes here. The winner is: ${winner}`;

    shadow.appendChild(wrapper);
  }
}

// Define the new element
customElements.define('results-tracker', ResultsTracker);