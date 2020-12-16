const ResultsTrackerProvider = ({
  headline,
  race,
  total,
  candidates,
  children,
}) => {
  return (
    <results-tracker
      headline={headline}
      race={race}
      total={total}
      candidates={candidates}
    >
      {children}
    </results-tracker>
  );
};

export default ResultsTrackerProvider;
