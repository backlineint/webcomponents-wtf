import "@backlineint/results-tracker";

import ResultsTrackerProvider from "./ResultsTrackerProvider";

function App() {
  const candidates = [
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
  return (
    <div className="App">
      <ResultsTrackerProvider
        headline="Race Between Old Men Too Close To Call"
        race="President"
        total="538"
        candidates={JSON.stringify(candidates)}
      >
        <p>Nation tired of hitting reload in their web browsers.</p>
      </ResultsTrackerProvider>
    </div>
  );
}

export default App;
