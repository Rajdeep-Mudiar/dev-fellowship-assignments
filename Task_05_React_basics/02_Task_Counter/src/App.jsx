import Counter from "./Counter";
import "./App.css";
function App() {
  return (
    <main className="app-shell">
      <section className="hero">
        <p className="eyebrow">React basics</p>
        <h1>Counter App</h1>
      </section>

      <Counter />
    </main>
  );
}

export default App;
