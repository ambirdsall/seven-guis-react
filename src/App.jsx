import "./App.css";
import { Counter } from "./Counter.jsx";

function App() {
  const { GUI: CounterGui, sourceCode: counterSource } = Counter;
  return (
    <>
      <h1>7 react GUIs</h1>
      <p></p>
      <div className="card">
        <h2>First GUI: Counter</h2>
        <p>
          <em>Challenge:</em> Understanding the basic ideas of a
          language/toolkit.
        </p>
        <CounterGui />
        <p>
          The task is to build a frame containing a label or read-only textfield{" "}
          <code>T</code> and a button <code>B</code>. Initially, the value in{" "}
          <code>T</code> is “0” and each click of <code>B</code> increases the
          value in <code>T</code> by one.
        </p>
        <p>
          Counter serves as a gentle introduction to the basics of the language,
          paradigm and toolkit for one of the simplest GUI applications
          imaginable. Thus, Counter reveals the required scaffolding and how the
          very basic features work together to build a GUI application. A good
          solution will have almost no scaffolding.
        </p>
        <pre>{counterSource}</pre>
      </div>
    </>
  );
}

export default App;
