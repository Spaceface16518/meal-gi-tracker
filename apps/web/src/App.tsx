import { Navigate, Route, Router } from "@solidjs/router";
import { AnalysisPage, EntryPage, LogPage, TrackerApp } from "@/components/tracker-app";

export default function App() {
  return (
    <Router root={TrackerApp}>
      <Route path="/" component={LogPage} />
      <Route path="/analysis" component={AnalysisPage} />
      <Route path="/entries/:entryKind/:entryId" component={EntryPage} />
      <Route path="*404" component={() => <Navigate href="/" />} />
    </Router>
  );
}
