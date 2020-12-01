import {LitElement, html, css} from 'lit-element';
import {styleMap} from 'lit-html/directives/style-map';

function getVotePercentage(votes, totalVotes) {
  return Math.round((votes / totalVotes) * 100) + '%';
}

function countLabelTemplate(candidate) {
  return html`<div
    class="results-tracker__count-label"
    style=${styleMap({color: candidate.color})}
  >
    ${candidate.primary}
  </div>`;
}

function barTemplate(candidate, total) {
  return html`<div
    class="results-tracker__bar"
    style=${styleMap({
      width: getVotePercentage(candidate.primary, total),
      background: candidate.color,
      transition: 'width 2s ease',
    })}
  ></div>`;
}

function candidateTemplate(candidate, total) {
  return html`<div class="results-tracker__candidate">
    <div
      class="results-tracker__name"
      style=${styleMap({color: candidate.color})}
    >
      ${candidate.name}
    </div>
    <div class="results-tracker__votes">
      ${candidate.secondary.toLocaleString()} votes
      (${getVotePercentage(candidate.secondary, total)})
    </div>
  </div>`;
}

/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
export class ResultsTracker extends LitElement {
  static get styles() {
    return css`
      :host {
        font-family: 'Libre Franklin', helvetica, arial, sans-serif;
      }
      .results-tracker__headline h2 {
        margin: 0.5rem 0;
        font-family: 'Domine', serif;
        font-weight: 700;
        font-size: 36px;
        text-align: center;
      }
      ::slotted(*) {
        text-align: center;
      }
      .results-tracker__race {
        margin-bottom: 2px;
        font-size: 14px;
        font-weight: 700;
      }
      .results-tracker__race::after {
        content: '›';
        display: inline-block;
        position: relative;
        top: -2px;
        padding-left: 2px;
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
        font-size: 0.9em;
        font-size: 11.5px;
        font-weight: normal;
      }
      .results-tracker__control-label-suffix {
        display: block;
        font-size: 9.5px;
        text-transform: uppercase;
      }
      .results-tracker__control-label::after {
        content: '';
        display: block;
        width: 1px;
        height: 23px;
        margin: 2px auto 0 49px;
        background: #333;
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
      .results-tracker__votes {
        font-size: 13px;
        color: #777;
      }
    `;
  }

  static get properties() {
    return {
      /**
       * Headline for the results tracker.
       */
      headline: {type: String},

      /**
       * Label for race being tracked.
       */
      race: {type: String},

      /**
       * Total for primary metric
       */
      total: {type: Number},

      /**
       * An array of objects containing data for each candidate
       */
      candidates: {type: Array},
    };
  }

  constructor() {
    super();
    // Todo - should this be initalized, even though data should be passed via an attribute?
    this.headline = 'Election Results';
    this.race = 'President';
    this.total = 538;
    this.candidates = [];
  }

  calculatePrimaryThreshold() {
    return this.total % 2 ? Math.round(this.total / 2) : this.total / 2 + 1;
  }

  calculateSecondaryTotal() {
    let secondaryTotal = 0;
    this.candidates.forEach((candidate) => {
      secondaryTotal += candidate.secondary;
    });
    return secondaryTotal;
  }

  render() {
    return html`
      <link
        href="https://fonts.googleapis.com/css2?family=Domine:wght@700&family=Libre+Franklin:wght@500;600;700&display=swap"
        rel="stylesheet"
      />
      <div class="results-tracker">
        <div class="results-tracker__headline" part="headline">
          <h2>${this.headline}</h2>
        </div>
        <div class="results-tracker__sub-headline">
          <slot></slot>
        </div>
        <div class="results-tracker__race">
          ${this.race}
        </div>
        <div class="results-tracker__counts">
          ${this.candidates.map((candidate) => {
            return countLabelTemplate(candidate);
          })}
        </div>
        <div class="results-tracker__bars">
          ${barTemplate(this.candidates[0], this.total)}
          <div class="results-tracker__control-label">
            ${this.calculatePrimaryThreshold()}
            <span class="results-tracker__control-label-suffix">To win</span>
          </div>
          ${barTemplate(this.candidates[1], this.total)}
        </div>
        <div class="results-tracker__candidates">
          ${this.candidates.map((candidate) => {
            return candidateTemplate(candidate, this.calculateSecondaryTotal());
          })}
        </div>
      </div>
    `;
  }
}

window.customElements.define('results-tracker', ResultsTracker);
