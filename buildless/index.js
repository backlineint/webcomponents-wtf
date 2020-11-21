class ResultsTracker extends HTMLElement {
  // Specify observed attributes so that attributeChangedCallback will work
  static get observedAttributes() {
    return ['headline'];
  }

  constructor() {
    // Always call super first in constructor
    super();

    // Create a shadow root
    const shadow = this.attachShadow({mode: 'open'}); // sets and returns 'this.shadowRoot'

    // Create wrapping element
    // Should all elements be associated with .this?
    const wrapper = document.createElement('div');
    wrapper.setAttribute('class', 'results-tracker');

    // Headline - we'll use this to demonstrate approaches to global styling
    this.headline = document.createElement('h2');
    // We don't need to do this because of attributeChangedCallback
    // this.headline.textContent = this.getAttribute('headline');
    wrapper.appendChild(this.headline);

    const race = document.createElement('div');
    race.setAttribute('class', 'results-tracker__race');
    race.textContent = this.getAttribute('race');
    wrapper.appendChild(race);

    const trackerThreshold = this.getAttribute('threshold');
    const threshold = document.createElement('div');
    threshold.setAttribute('class', 'results-tracker__threshold');
    threshold.textContent = `${trackerThreshold} to win`;
    wrapper.appendChild(threshold);

    const candidates = JSON.parse(this.getAttribute('candidates'));

    // TODO - Update to use a map
    const candidate1 = document.createElement('p');
    candidate1.setAttribute('class', 'results-tracker__candidate1');
    candidate1.textContent = `${candidates[0].name} ${candidates[0].primary} / ${candidates[0].secondary} votes`;
    wrapper.appendChild(candidate1);

    const candidate2 = document.createElement('p');
    candidate2.setAttribute('class', 'results-tracker__candidate2');
    candidate2.textContent = `${candidates[1].name} ${candidates[1].primary} / ${candidates[1].secondary} votes`;
    wrapper.appendChild(candidate2);

    const trackerTotal = this.getAttribute('total');
    const primaryMetric = this.getAttribute('primary');
    const secondaryMetric = this.getAttribute('secondary');

    console.log({ trackerTotal, primaryMetric, secondaryMetric })

    shadow.appendChild(wrapper);
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      // Case statement?
      if (name === 'headline') {
        this.headline.textContent = newValue;
      }
    }
  }
}

// Define the new element
customElements.define('results-tracker', ResultsTracker);