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

    const labelsElement = document.createElement('div');
    labelsElement.setAttribute('class', 'results-tracker__counts');
    this.label1Element = document.createElement('span');
    this.label2Element = document.createElement('span');
    this.label1Element.setAttribute('class', 'results-tracker__count-label label1');
    this.label2Element.setAttribute('class', 'results-tracker__count-label label2');
    labelsElement.appendChild(this.label1Element);
    labelsElement.appendChild(this.label2Element);
    wrapper.appendChild(labelsElement);

    const barsElement = document.createElement('div');
    barsElement.setAttribute('class', 'results-tracker__bars');
    this.controlLabelElement = document.createElement('div');
    this.controlLabelElement.setAttribute('class', 'results-tracker__control-label');
    this.suffixElement = document.createElement('span');
    this.suffixElement.setAttribute('class', 'results-tracker__control-label-suffix');
    this.suffixElement.textContent = 'To win';
    this.controlLabelElement.appendChild(this.suffixElement);
    this.bar1Element = document.createElement('div');
    this.bar2Element = document.createElement('div');
    this.bar1Element.setAttribute('class', 'results-tracker__bar bar1');
    this.bar2Element.setAttribute('class', 'results-tracker__bar bar2');
    barsElement.appendChild(this.bar1Element);
    barsElement.appendChild(this.controlLabelElement);
    barsElement.appendChild(this.bar2Element);
    wrapper.appendChild(barsElement);

    // TODO - this should eventually be removed.
    this.thresholdElement = document.createElement('div');
    this.thresholdElement.setAttribute('class', 'results-tracker__threshold');

    const candidatesElement = document.createElement('div');
    candidatesElement.setAttribute('class', 'results-tracker__candidates');
    this.candidateElements = [];
    JSON.parse(this.getAttribute('candidates')).map((candidate, index) => {
      this.candidateElements[index] = {
        wrapper: document.createElement('div'),
        name: document.createElement('div'),
        votes: document.createElement('div'),
        color: candidate.color
      }
      this.candidateElements[index].wrapper.setAttribute('class', 'results-tracker__candidate');
      this.candidateElements[index].name.setAttribute('class', 'results-tracker__name');
      this.candidateElements[index].votes.setAttribute('class', 'results-tracker__votes');
      this.candidateElements[index].wrapper.appendChild(this.candidateElements[index].name);
      this.candidateElements[index].wrapper.appendChild(this.candidateElements[index].votes);
      candidatesElement.appendChild(this.candidateElements[index].wrapper);
    });
    wrapper.appendChild(candidatesElement);

    // Create some CSS to apply to the shadow dom
    const style = document.createElement('style');

    // Todo - allow candidate color to be overriden as prop
    style.textContent = `
      :host {
        font-family: 'Libre Franklin', helvetica, arial, sans-serif;
      }
      h2 {
        margin: .5rem 0;
        font-family: 'Domine', serif;
        font-weight: 700;
        font-size: 36px;
        text-align: center;
      }
      .results-tracker__race {
        margin-bottom: 2px;
        font-size: 14px;
        font-weight: 700;
      }
      .results-tracker__race::after {
        content: "›";
        display: inline-block;
        position: relative;
        top: -2px;
        padding-left: 4px;
        transform: scale(1.5);
      }
      .results-tracker__counts {
        display: flex;
        justify-content: space-between;
      }
      .results-tracker__count-label {
        font-size: 44px;
        font-weight: 700;
      }
      .results-tracker__count-label:first-of-type {
        color: ${this.candidateElements[0].color};
      }
      .results-tracker__count-label:last-of-type {
        color: ${this.candidateElements[1].color};
      }
      .results-tracker__bars {
        display: flex;
        position: relative;
        justify-content: space-between;
        height: 20px;
        width: 100%;
        margin-bottom: 6px;
        background: #ebebeb;
      }
      .results-tracker__control-label {
        position: absolute;
        bottom: 0;
        left: 50%;
        width: 100px;
        margin-left: -50px;
        z-index: 10;
        text-align: center;
        color: #777;
        font-size: .9em;
        font-size: 11.5px;
        font-weight: normal;
      }
      .results-tracker__control-label-suffix {
        display: block;
        font-size: 9.5;
        text-transform: uppercase;
      }
      .results-tracker__control-label::after {
        content: "";
        display: block;
        width: 1px;
        height: 23px;
        margin: 2px auto 0 49px;
        background: #333;
      }
      .results-tracker__bar:first-of-type {
        background-color: ${this.candidateElements[0].color};
      }
      .results-tracker__bar:last-of-type {
        background-color: ${this.candidateElements[1].color};
      }
      .results-tracker__candidates {
        display: flex;
        justify-content: space-between;
      }
      .results-tracker__candidate:last-of-type {
        text-align: right;
      }
      .results-tracker__name {
        margin-bottom: 3px;
        font-size: 15px;
        font-weight: 600;
      }
      .results-tracker__candidate:first-of-type .results-tracker__name {
        color: ${this.candidateElements[0].color};
      }
      .results-tracker__candidate:last-of-type .results-tracker__name {
        color: ${this.candidateElements[1].color};
      }
      .results-tracker__votes {
        font-size: 13px;
        color: #777;
      }
    `;

    // Attach the styles to the shadow dom
    shadow.appendChild(style);
    // Attach the results tracker to the shadow DOM.
    shadow.appendChild(wrapper);
    // If we instead wanted to opt out of the shadow DOM, this would be:
    // this.appendChild(wrapper);
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
          this.calculatePrimaryThreshold();
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

  calculatePrimaryThreshold() {
    const threshold = this.total % 2 ? Math.round(this.total / 2) : this.total / 2 + 1;
    this.controlLabelElement.textContent = threshold;
    this.controlLabelElement.appendChild(this.suffixElement);
  }

  calculateSecondaryTotal() {
    let secondaryTotal = 0;
    this.candidates.forEach(candidate => {
      secondaryTotal += candidate.secondary;
    });
    return secondaryTotal;
  }

  getVotePercentage(votes, totalVotes) {
    return Math.round(votes/totalVotes * 100);
  }

  processCandidates() {
    this.candidates = JSON.parse(this.getAttribute('candidates'));
    this.secondaryTotal = this.calculateSecondaryTotal();
    this.candidates.map((candidate, index) => {
      this.candidateElements[index].name.textContent = candidate.name;
      this.candidateElements[index].votes.textContent = `${candidate.secondary} votes (${this.getVotePercentage(candidate.secondary, this.secondaryTotal)}%)`;
      this.candidateElements[index].color = candidate.color;
      this.candidateElements[index].primaryPercentage = this.getVotePercentage(candidate.primary, this.total);
    });
    this.label1Element.textContent = this.candidates[0].primary;
    this.bar1Element.style.width = `${this.candidateElements[0].primaryPercentage}%`;
    this.label2Element.textContent = this.candidates[1].primary;
    this.bar2Element.style.width = `${this.candidateElements[1].primaryPercentage}%`;
  }

}

// Define the new element
customElements.define('results-tracker', ResultsTracker);