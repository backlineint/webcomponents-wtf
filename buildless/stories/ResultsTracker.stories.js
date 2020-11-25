import { html } from "lit-html"
import "../index.js"

export default {
  title: 'Components/Results Tracker',
  component: "results-tracker",
}

export const Primary = () => html`
  <results-tracker 
    headline="Race Between Old Men Too Close To Call"
    race="President"
    total="538"
    threshold="270"
    primary="electoral"
    secondary="popular"
    candidates='[
        {"name": "Joseph R. Biden Jr.", "primary": 253, "secondary": 73879622},
        {"name": "Donald J. Trump", "primary": 214, "secondary": 69772905}
      ]' 
    />
  `;