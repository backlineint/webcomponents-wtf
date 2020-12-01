# Results Tracker

An election results tracker, created as an exploration of web components. Based on the New York Times election results tracker.

## Installing

```bash
npm i @backlineint/results-tracker
```

## Importing

In a JavaScript module:

```js
import 'results-tracker';
```

In an HTML page:

```html
<script type="module" src="./path-to/results-tracker/results-tracker.js"></script>
```

## Using:

The custom element can be used with the following attributes:

```html
<results-tracker
  headline="Race Between Old Men Too Close To Call"
  race="President"
  total="538"
  candidates='[
      {"name": "Joseph R. Biden Jr.", "primary": 253, "secondary": 73879622, "color": "#1375b7"},
      {"name": "Donald J. Trump", "primary": 214, "secondary": 69772905, "color": "#c93135"}
    ]'
>
  <p>Nation tired of hitting reload in their web browsers.</p>
</results-tracker>
```