import "./App.css";
import { Counter } from "./Counter.jsx";
import { Gui } from "./Gui.jsx";

function App() {
  return (
    <>
      <h1>7 react GUIs</h1>
      <p>
        The descriptions for all tasks are taken from{" "}
        <a href="https://eugenkiss.github.io/7guis/tasks/">
          https://eugenkiss.github.io/7guis/tasks/
        </a>
      </p>
      <Gui
        title="First GUI: Counter"
        example={Counter}
        challenges={["Understanding the basic ideas of a language/toolkit."]}
      >
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
      </Gui>
    </>
  );
}

export default App;
