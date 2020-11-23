class ResultsTracker extends HTMLElement {
  // Specify observed attributes so that attributeChangedCallback will work
  static get observedAttributes() {
    return [
      'headline',
      'race',
      'threshold',
      'total',
      'primary',
      'secondary',
      'candidates',
    ];
  }

  constructor() {
    // Always call super first in constructor
    super();

    // Create a shadow root
    // Would it be possible to not use the shadow root here?
    const shadow = this.attachShadow({mode: 'open'}); // sets and returns 'this.shadowRoot'

    // Create wrapping element
    // TODO - is there any non-library way to do templating here?
    const wrapper = document.createElement('div');
    wrapper.setAttribute('class', 'results-tracker');

    // Headline - we'll use this to demonstrate approaches to global styling
    this.headlineElement = document.createElement('h2');
    this.headlineElement.setAttribute('class', 'results-tracker__headline');
    wrapper.appendChild(this.headlineElement);

    this.raceElement = document.createElement('div');
    this.raceElement.setAttribute('class', 'results-tracker__race');
    wrapper.appendChild(this.raceElement);

    this.thresholdElement = document.createElement('div');
    this.thresholdElement.setAttribute('class', 'results-tracker__threshold');
    wrapper.appendChild(this.thresholdElement);

    this.candidateElements = [];
    JSON.parse(this.getAttribute('candidates')).map((candidate, index) => {
      this.candidateElements[index] = document.createElement('p');
      this.candidateElements[index].setAttribute('class', 'results-tracker__candidate');
      wrapper.appendChild(this.candidateElements[index]);
    });

    shadow.appendChild(wrapper);
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      switch(name) {
        case 'headline':
          this.headlineElement.textContent = newValue;
          break;
        case 'race':
          this.raceElement.textContent = newValue;
          break;
        case 'threshold':
          this.thresholdElement.textContent = `${newValue} to win`;
          break;
        case 'total':
          this.total = newValue;
          break;
        case 'primary':
          this.primary = newValue;
          break;
        case 'secondary':
          this.secondary = newValue;
          break;
        case 'candidates':
          this.processCandidates();
          break;
      }
    }
  }

  calculateSecondaryTotal() {
    let secondaryTotal = 0;
    this.candidates.forEach(candidate => {
      secondaryTotal += candidate.secondary;
    });
    return secondaryTotal;
  }

  getVotePercentage(candidate) {
    return Math.round(candidate.secondary/this.secondaryTotal * 100);
  }

  processCandidates() {
    this.candidates = JSON.parse(this.getAttribute('candidates'));
    this.secondaryTotal = this.calculateSecondaryTotal();
    this.candidates.map((candidate, index) => {
      this.candidateElements[index].textContent = `${candidate.name}
      ${candidate.primary} / ${candidate.secondary} votes
      (${this.getVotePercentage(candidate)}%)`;
    });
  }

}

// Define the new element
customElements.define('results-tracker', ResultsTracker);