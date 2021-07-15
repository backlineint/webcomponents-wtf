slide-transition: true

# **Web components** through the eyes

# of a newcomer

### Decoupled Days - July 15, 2021

### [https://bit.ly/wcdd](https://bit.ly/wcdd)

---

[.column]

## Brian Perry

- Sr. Technology Consultant, Decoupled Architectures @ Pantheon
- Initiative Coordinator: Decoupled Menus Initiative
- Rocking the Chicago ‘burbs

[.column]

- Lover of all things components... and Nintendo

d.o: brianperry
@bricomedy
brianperry.dev

---

![](images/pantheon.png)

---

![](images/bounteous.jpg)

---

# [fit] Components

# [fit] have taken over the web

![right fit](images/atomic-design.png)

---

# We're here to talk about

# [fit] Web

# [fit] Components

---

## [fit] Like React and Angular, right?

---

[.build-lists: true]

# Web components

**A set of web platform APIs**, not tied to a specific framework

- Custom elements
- Shadow DOM
- HTML Templates

---

# I :heart: components.

<br>
# So I should :heart: Web Components.
<br>
# So why weren't they part of my workflow? :cold_sweat:

---

# [fit] Warning: not an expert

![](images/Picture1.png)

---

# I look to:

[.column]

![fit](images/cast.png)

### [fit] @castastrophee

[.column]

![fit](images/salem.png)

### [fit] @salem_cobalt

[.column]

![fit](images/btopro.png)

### @btopro

[.column]

![fit](images/bloom.png)

### @illepic

---

## Can I Use Web Components? [^1]

![fit inline](images/custom_elements.png)
![fit inline](images/shadow_dom.png)

[^1]: IE 11 can be supported using polyfills

---

# [fit] Can Can I Use Use Web Components? [^2]

![fit inline](images/caniuse.png)

[^2]: Find many more examples at https://wild.open-wc.org/

---

# I should build an example web component.

<br>
But what could be a relevant example in November 2020?

---

![fit](images/globe_tracker.png)

---

![fit](images/cnn_tracker.png)

---

![fit](images/cnn_tracker.png)![fit](images/cnn_tracker.png)

---

![fit](images/cnn_tracker.png)![fit](images/cnn_tracker.png)![fit](images/cnn_tracker.png)

---

![fit](images/cnn_tracker.png)![fit](images/cnn_tracker.png)![fit](images/cnn_tracker.png)![fit](images/cnn_tracker.png)

---

![fit](images/cnn_tracker.png)![fit](images/cnn_tracker.png)![fit](images/cnn_tracker.png)![fit](images/cnn_tracker.png)![fit](images/cnn_tracker.png)

---

![fit](images/cnn_tracker.png)![fit](images/cnn_tracker.png)![fit](images/cnn_tracker.png)![fit](images/cnn_tracker.png)![fit](images/cnn_tracker.png)![fit](images/cnn_tracker.png)![fit](images/cnn_tracker.png)![fit](images/cnn_tracker.png)![fit](images/cnn_tracker.png)![fit](images/cnn_tracker.png)

---

![fit](images/nytimes_tracker.png)

---

## My own personal election tracker

![inline autoplay loop](images/storybook.mp4)

---

# Using <election-tracker>

- Import script as JS module. Could be:
  - local file
  - NPM dependency (@backlineint/results-tracker)
- Use your custom element in markup
- Pass data in using attributes

Note: If your component has external dependencies, you'll need to use a bundler (Webpack, Rollup, Parcel, etc.)

---

## Custom Elements [^3]

![fit inline](images/codepen.png)

[^3]: [https://codepen.io/brianperry/pen/RwGPLBx](https://codepen.io/brianperry/pen/RwGPLBx)

---

[.build-lists: true]

# Shadow DOM

- Encapsulated DOM Tree
- Separate from main DOM
- Elements won't collide
- Scoped styles
- Super spooky

![](images/shadows.jpg)
![original fit](images/shadow_dom_example.png)

---

# [fit] Building <election-tracker><br>Take 1: Vanilla JS

---

Rendering a Headline
index.html

```html
<html>
  <head>
    <title>Results Tracker Heading</title>
    <meta charset="UTF-8" />
  </head>

  <body>
    <results-tracker headline="Race Between Old Men Too Close To Call" />

    <script type="module" src="src/results-tracker.js"></script>
  </body>
</html>
```

---

results-tracker.js

```javascript
class ResultsTracker extends HTMLElement {
  constructor() {
    // Always call super first in constructor
    super();

    // Create a shadow root
    const shadow = this.attachShadow({ mode: "open" }); // sets and returns 'this.shadowRoot'

    // Create wrapping element
    const wrapper = document.createElement("div");
    wrapper.setAttribute("class", "results-tracker");

    this.headlineElement = document.createElement("h2");
    this.headlineElement.setAttribute("class", "results-tracker__headline");
    this.headlineElement.textContent = this.getAttribute("headline");
    wrapper.appendChild(this.headlineElement);

    // Attach the results tracker to the shadow DOM.
    shadow.appendChild(wrapper);
  }
}

// Define the new element
customElements.define("results-tracker", ResultsTracker);
```

---

Refactoring to use <template>

```javascript
class ResultsTracker extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });

    // Templates are not referenced in the DOM, but can be referenced / cloned using js
    const template = document.createElement("template");

    template.innerHTML = `
      <div class="results-tracker">
        <div class="results-tracker__headline">
          <h2>${this.getAttribute("headline")}</h2>
        </div>
      </div>
    `;

    // Attach the template to the Shadow DOM
    this.shadow.appendChild(template.content);
  }
}

customElements.define("results-tracker", ResultsTracker);
```

---

Add scoped styling

```javascript
class ResultsTracker extends HTMLElement {
  constructor() {
    super();
    /* Removed for brevity... */

    // Create CSS to apply to the shadow dom
    const style = document.createElement("style");

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
    `;

    // Attach the styles to the shadow dom
    shadow.appendChild(style);

    /* Removed for brevity... */
  }
}
```

---

Observe attributes and re-render if changed

```javascript
class ResultsTracker extends HTMLElement {
  // Specify observed attributes for attributeChangedCallback
  static get observedAttributes() {
    return ["headline"];
  }

  constructor() {
    /* Removed for brevity */
  }

  // Custom element lifecycle callback function
  attributeChangedCallback(name, oldValue, newValue) {
    // Compare old to new to prevent unnecessary re-rendering
    if (oldValue !== newValue && name === "headline") {
      this.shadow.querySelector(".results-tracker__headline h2").textContent =
        newValue;
    }
  }
}

// Define the new element
customElements.define("results-tracker", ResultsTracker);
```

---

# [fit] That was too much work for a headline...[^4]

# [fit] Shouldn't this be easier?

![](images/vanilla_headline.png)

[^4]: [https://codesandbox.io/s/results-tracker-heading-vanilla-js-lunes](https://codesandbox.io/s/results-tracker-heading-vanilla-js-lunes)

---

# [fit] Wait for it...

---

# [fit] So.

# [fit] Many.

# [fit] Libraries.

---

- Lit
- Stencil
- FastElement
- Haunted
- Hybrids
- Many more...

# Aren't we just back where we started?

---

Only one way to find out...
<br>

<br>
# [fit] Building <election-tracker><br>Take 2: Lit :fire:

---

Rendering a headline (Lit version)
index.html

```html
<html>
  <head>
    <title>Results Tracker Heading - Lit</title>
    <meta charset="UTF-8" />
  </head>

  <body>
    <results-tracker headline="Race Between Old Men Too Close To Call" />

    <script type="module" src="src/results-tracker.js"></script>
  </body>
</html>
```

(same as vanilla js version)

---

results-tracker.js

```javascript
import { LitElement, html } from "lit";

export class ResultsTracker extends LitElement {
  static get properties() {
    return {
      headline: { type: String },
    };
  }

  render() {
    return html`
      <div class="results-tracker">
        <div class="results-tracker__headline">
          <h2>${this.headline}</h2>
        </div>
      </div>
    `;
  }
}

window.customElements.define("results-tracker", ResultsTracker);
```

---

# A lot with less

- Renders custom element
- Templating
- Observes updates to attributes

Just need to add scoped styles.

---

Add scoped styling

```javascript
import { LitElement, html, css } from "lit";

export class ResultsTracker extends LitElement {
  static get styles() {
    return css`
      :host {
        font-family: "Libre Franklin", helvetica, arial, sans-serif;
      }
      .results-tracker__headline h2 {
        margin: 0.5rem 0;
        font-family: "Domine", serif;
        font-weight: 700;
        font-size: 36px;
        text-align: center;
      }
    `;
  }

  // Properties...

  // Render method...
}

window.customElements.define("results-tracker", ResultsTracker);
```

---

Converting attributes

```javascript
// Vanilla JS - have to manually transform string attributes
processCandidates() {
    this.candidates = JSON.parse(this.getAttribute('candidates'));
    // ...
}

// Define the type of your property, and LitElement will automatically
// handle conversion for you.
static get properties() {
  return {
    /**
     * An array of objects containing data for each candidate
     */
    candidates: {type: Array},
  };
}
```

(And many other DX niceties)

---

Feels like a more appropriate amount of work for a headline... and especially the full results-tracker [^5]

![fit inline](images/full_sandbox.png)

[^5]: [https://codesandbox.io/s/election-results-tracker-thk26](https://codesandbox.io/s/election-results-tracker-thk26)

---

# Stencil

> Compiler that generates web components

Provides extra capabilities on top of Web Components:

- Prerendering
- Objects-as-properties
- Virtual DOM
- JSX
- Async Rendering

![fit right](images/stencil.png)

---

# Vue

Supports web components as a build target.

But...

It still requires the Vue library as a global dependency.

# :disappointed:

![fit right](images/vue.png)

---

# [fit] Odds N' Ends

---

# Scoped Styles [^6]

![inline](images/scoped_styles.png)

[^6]: [https://codesandbox.io/s/election-results-tracker-global-styling-options-w0i3e?file=/src/styles.css](https://codesandbox.io/s/election-results-tracker-global-styling-options-w0i3e?file=/src/styles.css)

---

[.build-lists: true]

# Here's how I've been making sense of this...

- **Only inherited properties pierce the shadow DOM**
- Everything else requires the component to expose a styling hook:
  - CSS custom properties (variables)
  - Classes
  - Shadow Parts
  - Slots

---

## Using web components with a framework

[custom-elements-everywhere.com](https://custom-elements-everywhere.com/) outlines support for many frameworks.

Support is pretty solid across the board.

React has some notable limitations. :disappointed:

![fit right](images/everywhere.png)

---

# React + Custom Elements [^7]

![inline](images/react_wc.png)

[^7]: [https://codesandbox.io/s/web-components-with-react-tvnwd](https://codesandbox.io/s/web-components-with-react-tvnwd)

---

# @lit-labs/react [^8]

![inline](images/lit-react.png)

[^8]: [https://codesandbox.io/s/lit-react-358ez](https://codesandbox.io/s/lit-react-358ez)

## Managing Application state

- Didn't come across any clear pattern or best practice.
- Could roll your own.
- Could use any JS based framework or state management library.
- Would be nice if a default standard existed (think React context)
- Maybe this is an unreasonable expectation...

---

[.build-lists: true]

# My (slightly) more educated views on web components

- This was pretty hard to learn!
- I'd turn to this for special purpose components today.
- Close to getting comfortable enough to use this for a full app/design system.
- I would use a library, but one close to the vanilla API.

---

[.build-lists: true]

# On an infinite timescale...

- I think some version of this concept will win out.
- But how infinite is that timescale?
- And will it be this take on web components?
- Things are looking better every day...

---

Generic Drupal Web Components (GDWC)

![inline](images/gdwc.png)

---

# Thanks!

brian.perry@pantheon.io
d.o: brianperry
@bricomedy
brianperry.dev
