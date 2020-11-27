import { html } from "lit-html"
import "../index.js"

const ResultsTrackerTemplate = ({ headline, race, total }) => {
  return html`
    <results-tracker
      headline=${headline}
      race=${race}
      total=${total}
      threshold="270"
      primary="electoral"
      secondary="popular"
      candidates='[
        {"name": "Joseph R. Biden Jr.", "primary": 253, "secondary": 73879622, "color": "#1375b7"},
        {"name": "Donald J. Trump", "primary": 214, "secondary": 69772905, "color": "#c93135"}
      ]'
    />
  `;
}

export default {
  title: 'Components/Results Tracker',
  component: "results-tracker",
}

const Template = (args) => ResultsTrackerTemplate(args);

export const Primary = Template.bind({});
Primary.args = {
  headline: "Race Between Old Men Too Close To Call",
  race: "President",
  total: "538",
}