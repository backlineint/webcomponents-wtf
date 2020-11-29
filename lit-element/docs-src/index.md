---
layout: page.11ty.cjs
title: <results-tracker> ⌲ Home
---

# &lt;results-tracker>

`<results-tracker>` is an awesome element. It's a great introduction to building web components with LitElement, with nice documentation site as well.

## As easy as HTML

<section class="columns">
  <div>

`<results-tracker>` is just an HTML element. You can it anywhere you can use HTML!

```html
<results-tracker></results-tracker>
```

  </div>
  <div>

<results-tracker></results-tracker>

  </div>
</section>

## Configure with attributes

<section class="columns">
  <div>

`<results-tracker>` can be configured with attributed in plain HTML.

```html
<results-tracker name="HTML"></results-tracker>
```

  </div>
  <div>

<results-tracker name="HTML"></results-tracker>

  </div>
</section>

## Declarative rendering

<section class="columns">
  <div>

`<results-tracker>` can be used with declarative rendering libraries like Angular, React, Vue, and lit-html

```js
import {html, render} from 'lit-html';

const name="lit-html";

render(html`
  <h2>This is a &lt;results-tracker&gt;</h2>
  <results-tracker .name=${name}></results-tracker>
`, document.body);
```

  </div>
  <div>

<h2>This is a &lt;results-tracker&gt;</h2>
<results-tracker name="lit-html"></results-tracker>

  </div>
</section>
