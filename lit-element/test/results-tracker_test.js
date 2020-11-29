import {ResultsTracker} from '../results-tracker.js';
import {fixture, html} from '@open-wc/testing';

const assert = chai.assert;

suite('results-tracker', () => {
  test('is defined', () => {
    const el = document.createElement('results-tracker');
    assert.instanceOf(el, ResultsTracker);
  });

  test('renders with default values', async () => {
    const el = await fixture(html`<results-tracker></results-tracker>`);
    assert.shadowDom.equal(
      el,
      `
      <h1>Hello, World!</h1>
      <button part="button">Click Count: 0</button>
      <slot></slot>
    `
    );
  });

  test('renders with a set name', async () => {
    const el = await fixture(html`<results-tracker name="Test"></results-tracker>`);
    assert.shadowDom.equal(
      el,
      `
      <h1>Hello, Test!</h1>
      <button part="button">Click Count: 0</button>
      <slot></slot>
    `
    );
  });

  test('handles a click', async () => {
    const el = await fixture(html`<results-tracker></results-tracker>`);
    const button = el.shadowRoot.querySelector('button');
    button.click();
    await el.updateComplete;
    assert.shadowDom.equal(
      el,
      `
      <h1>Hello, World!</h1>
      <button part="button">Click Count: 1</button>
      <slot></slot>
    `
    );
  });
});
