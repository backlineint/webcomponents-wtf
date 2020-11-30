import {html} from 'lit-html';
import '../results-tracker.js';

const ResultsTrackerTemplate = ({
  headline,
  subheadline,
  race,
  total,
  candidates,
}) => {
  const candidatesString = JSON.stringify(candidates);
  return html`
    <results-tracker
      headline=${headline}
      race=${race}
      total=${total}
      candidates=${candidatesString}
    >
      ${subheadline}
    </results-tracker>
  `;
};

const candidates = [
  {
    name: 'Joseph R. Biden Jr.',
    primary: 253,
    secondary: 73879622,
    color: '#1375b7',
  },
  {
    name: 'Donald J. Trump',
    primary: 214,
    secondary: 69772905,
    color: '#c93135',
  },
];

const bros = [
  {
    name: 'Mario Mario',
    primary: 373,
    secondary: 4987,
    color: 'red',
  },
  {
    name: 'Luigi Mario',
    primary: 413,
    secondary: 6501,
    color: 'green',
  },
];

export default {
  title: 'Components/Results Tracker',
  component: 'results-tracker',
};

const Template = (args) => ResultsTrackerTemplate(args);

export const Primary = Template.bind({});
export const NoPolitics = Template.bind({});

Primary.args = {
  headline: 'Race Between Old Men Too Close To Call',
  subheadline: html`<p>
    Nation tired of hitting reload in their web browsers.
  </p>`,
  race: 'President',
  total: '538',
  candidates: candidates,
};

NoPolitics.args = {
  headline: 'Battle of the Brothers',
  subheadline: html`<p>
    Whose a gonna win?
  </p>`,
  race: 'Mushroom King',
  total: '999',
  candidates: bros,
};
