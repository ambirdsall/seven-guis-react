import "./App.css";
import { Gui } from "./Gui.jsx";
import { Counter } from "./Counter.jsx";
import { TemperatureConverter } from "./TemperatureConverter.jsx";

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
      <Gui
        title="Temperature Converter"
        challenges={["bidirectional data flow", "user-provided text input"]}
        example={TemperatureConverter}
      >
        The task is to build a frame containing two textfields{" "}
        <code>
          T<sub>C</sub>
        </code>{" "}
        and{" "}
        <code>
          T<sub>F</sub>
        </code>{" "}
        representing the temperature in Celsius and Fahrenheit, respectively.
        Initially, both{" "}
        <code>
          T<sub>C</sub>
        </code>{" "}
        and{" "}
        <code>
          T<sub>F</sub>
        </code>{" "}
        are empty. When the user enters a numerical value into{" "}
        <code>
          T<sub>C</sub>
        </code>{" "}
        the corresponding value in{" "}
        <code>
          T<sub>F</sub>
        </code>{" "}
        is automatically updated and vice versa. When the user enters a
        non-numerical string into{" "}
        <code>
          T<sub>C</sub>
        </code>{" "}
        the value in{" "}
        <code>
          T<sub>F</sub>
        </code>{" "}
        is not updated and vice versa. The formula for converting a temperature{" "}
        <code>C</code> in Celsius into a temperature <code>F</code> in
        Fahrenheit is <code>C = (F - 32) * (5/9)</code> and the dual direction
        is <code>F = C * (9/5) + 32</code>. Temperature Converter increases the
        complexity of Counter by having bidirectional data flow between the
        Celsius and Fahrenheit inputs and the need to check the user input for
        validity. A good solution will make the bidirectional dependency very
        clear with minimal boilerplate code. Temperature Converter is inspired
        by the{" "}
        <a href="https://www.artima.com/pins1ed/gui-programming.html#32.4">
          Celsius/Fahrenheit converter
        </a>{" "}
        from the book <em>Programming in Scala</em>. It is such a widespread
        example—sometimes also in the form of a currency converter—that one
        could give a thousand references. The same is true for the Counter task.
      </Gui>
    </>
  );
}

export default App;
