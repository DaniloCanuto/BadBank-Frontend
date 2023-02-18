import Router from "./routes/router";
import Header from "./components/header/header";

function App() {
  return (
    <div className="App">
      <Header />
      <div style={{ padding: "30px", minHeight: "92vh" }}>
        <Router />
      </div>
    </div>
  );
}

export default App;
