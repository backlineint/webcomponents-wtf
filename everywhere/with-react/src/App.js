import React, { useState } from 'react';

import ResultsTrackerProvider from "./ResultsTrackerProvider";
import SwitchProvider from "./SwitchProvider";

function App() {
  const candidatesPolitics = [
    {
      name: "Joseph R. Biden Jr.",
      primary: 253,
      secondary: 73879622,
      color: "#1375b7",
    },
    {
      name: "Donald J. Trump",
      primary: 214,
      secondary: 69772905,
      color: "#c93135",
    },
  ];

  const metaPolitics = {
    headline: "Race Between Old Men Too Close To Call",
    subheadline: "Nation tired of hitting reload in their web browsers.",
    race: "President",
    total: "538"
  };

  const candidatesBros = [
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

  const metaBros = {
    headline: "Battle Of The Bros!",
    subheadline: "Vote for-a-me.",
    race: "Mushroom King",
    total: "999"
  };

  const [candidates, setCandidates] = useState(candidatesPolitics);
  const [meta, setMeta] = useState(metaPolitics);

  const togglePolitics = (isPolitics) => {
    if (isPolitics) {
      setCandidates(candidatesPolitics);
      setMeta(metaPolitics);
    }
    else {
      setCandidates(candidatesBros);
      setMeta(metaBros);
    }
  }

  return (
    <div className="App" style={{ margin: '1rem' }}>
      <ResultsTrackerProvider
        headline={meta.headline}
        race={meta.race}
        total={meta.total}
        candidates={JSON.stringify(candidates)}
      >
        <p>{meta.subheadline}</p>
      </ResultsTrackerProvider>
      <div style={{ marginTop: '1rem' }}>
        <SwitchProvider checked handleToggle={togglePolitics}>Politics:</SwitchProvider>
      </div>
    </div >
  );
}

export default App;
