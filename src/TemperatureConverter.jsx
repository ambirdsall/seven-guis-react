import { useReducer } from "react";
import { match, P } from "ts-pattern";

function isValidTemp({ newTemp }) {
  return match(newTemp)
    .with(P.number, () => true)
    .with(P.string, (temp) => {
      const restrung = String(Number(temp));
      return restrung !== "NaN" && restrung === temp;
    })
    .otherwise(false);
}

const cToF = (newTempC) => (newTempC * (9 / 5) + 32).toFixed(1);
const fToC = (newTempF) => ((newTempF - 32) * (5 / 9)).toFixed(1);

const reducer = (state, action) => {
  return match(action)
    .with(
      { type: "updatedTempF", newTemp: P._ },
      isValidTemp,
      ({ newTemp }) => {
        const temp = Number(newTemp);
        return {
          tempC: fToC(temp),
          tempCClassName: "",
          tempF: temp,
          tempFClassName: "",
        };
      },
    )
    .with({ type: "updatedTempF", newTemp: P._ }, ({ newTemp }) => ({
      ...state,
      tempF: newTemp,
      tempFClassName: "input-error",
    }))
    .with(
      { type: "updatedTempC", newTemp: P._ },
      isValidTemp,
      ({ newTemp }) => {
        const temp = Number(newTemp);
        return {
          tempC: temp,
          tempCClassName: "",
          tempF: cToF(temp),
          tempFClassName: "",
        };
      },
    )
    .with({ type: "updatedTempC", newTemp: P._ }, ({ newTemp }) => ({
      ...state,
      tempC: newTemp,
      tempCClassName: "input-error",
    }))
    .run();
};

const initialState = {
  tempF: -40,
  tempFClassName: "",
  tempC: -40,
  tempCClassName: "",
};

export const TemperatureConverter = {
  GUI() {
    const [{ tempF, tempFClassName, tempC, tempCClassName }, dispatch] =
      useReducer(reducer, initialState);

    const handleNewF = (event) => {
      const { value } = event.target;
      dispatch({ type: "updatedTempF", newTemp: value });
    };
    const handleNewC = (event) => {
      const { value } = event.target;
      dispatch({ type: "updatedTempC", newTemp: value });
    };
    return (
      <>
        <input
          type="number"
          className={tempCClassName}
          value={tempC}
          onChange={handleNewC}
        />
        Celsius ={" "}
        <input
          type="text"
          className={tempFClassName}
          value={tempF}
          onChange={handleNewF}
        />
        Fahrenheit
      </>
    );
  },

  sourceCode: `
import { useReducer } from "react";
import { match, P } from "ts-pattern";

function isValidTemp({ newTemp }) {
  return match(newTemp)
    .with(P.number, () => true)
    .with(P.string, (temp) => {
      const restrung = String(Number(temp));
      return restrung !== "NaN" && restrung === temp;
    })
    .otherwise(false);
}

const cToF = (newTempC) => (newTempC * (9 / 5) + 32).toFixed(1);
const fToC = (newTempF) => ((newTempF - 32) * (5 / 9)).toFixed(1);

const reducer = (state, action) => {
  return match(action)
    .with(
      { type: "updatedTempF", newTemp: P._ },
      isValidTemp,
      ({ newTemp }) => {
        const temp = Number(newTemp);
        return {
          tempC: fToC(temp),
          tempCClassName: "",
          tempF: temp,
          tempFClassName: "",
        };
      },
    )
    .with({ type: "updatedTempF", newTemp: P._ }, ({ newTemp }) => ({
        ...state,
        tempF: newTemp,
        tempFClassName: "input-error",
      }
    ))
    .with(
      { type: "updatedTempC", newTemp: P._ },
      isValidTemp,
      ({ newTemp }) => {
        const temp = Number(newTemp);
        return {
          tempC: temp,
          tempCClassName: "",
          tempF: cToF(temp),
          tempFClassName: "",
        };
      },
    )
    .with({ type: "updatedTempC", newTemp: P._ }, ({ newTemp }) => ({
      ...state,
      tempC: newTemp,
      tempCClassName: "input-error",
    }))
    .run();
};

const initialState = {
  tempF: -40,
  tempFClassName: "",
  tempC: -40,
  tempCClassName: "",
};

export function TemperatureConverter() {
  const [{ tempF, tempFClassName, tempC, tempCClassName }, dispatch] =
    useReducer(reducer, initialState);

  const handleNewF = (event) => {
    const { value } = event.target;
    dispatch({ type: "updatedTempF", newTemp: value });
  };
  const handleNewC = (event) => {
    const { value } = event.target;
    dispatch({ type: "updatedTempC", newTemp: value });
  };
  return (
    <>
      <input
        type="number"
        className={tempCClassName}
        value={tempC}
        onChange={handleNewC}
      />
      Celsius ={" "}
      <input
        type="text"
        className={tempFClassName}
        value={tempF}
        onChange={handleNewF}
      />
      Fahrenheit
    </>
  );
}
`,
  notes: (
    <>
      <p>
        I did not try to optimize this implementation for length or to avoid
        boilerplate; I probably could have gotten something a fair bit shorter
        with a more imperative approach. But I didn't <em>want</em> to manually
        deal with all the bookkeeping around valid vs invalid states; I wanted a
        clean, declarative definition for all its behaviors. So: I decided to
        set up a little{" "}
        <a href="https://en.wikipedia.org/wiki/Finite-state_machine">
          state machine
        </a>
        . The state is a plain js object with four properties:
      </p>
      <ul>
        <li>current temperature (whether user-input or generated) Celsius</li>
        <li>whether the current Celsius temperature is valid or not</li>
        <li>
          current temperature (whether user-input or generated) Fahrenheit
        </li>
        <li>whether the current Fahrenheit temperature is valid or not</li>
      </ul>
      <p>
        Similarly, four transitions must be defined to handle all the required
        behaviors when the user updates a temperature field:
      </p>
      <ul>
        <li>handling a valid number for the Celsius temperature</li>
        <li>handling some bullshit for the Celsius temperature</li>
        <li>handling a valid number for the Fahrenheit temperature</li>
        <li>handling some bullshit for the Fahrenheit temperature</li>
      </ul>
      <p>
        It frontloads all the boilerplate, but it very cleanly isolates the
        logic for each different case so they can be coded up straighforwardly,
        without imposing any coupling or conditionals on any other case. It's{" "}
        <a href="https://en.wikipedia.org/wiki/Turtles_all_the_way_down">
          tradeoffs all the way turtle
        </a>
        , after all; I often find that particular tradeoff to be the right one.
        YMMV.
      </p>
      <p>
        In react, the built-in way to make a state machine looks a bit like
        this:{" "}
        <code>
          const [state, dispatchFn] = useReducer(reducerFn, initialState)
        </code>
        . You define your own <code>reducerFn</code>, which accepts two
        arguments (one for the current state, and another to pass arbitrary data
        representing some update) and returns a new state value; under the hood,
        react handles calling <code>reducerFn(state, foo)</code>, updating the
        reducer state to your return value, and all downstream rerenders
        whenever an update comes in; and you manually trigger those updates by
        calling the returned dispatch function with the aforementioned arbitrary
        data, like
        <code>dispatchFn(foo)</code>. The baseline complexity of implementing a
        reducer is a lot higher than slapping together a <code>useState</code>{" "}
        or two, but it (i.e. the implementation complexity) scales beautifully
        with the complexity of your business logic.
      </p>
      <p>
        One last thing: in general, I want to stick to the "vanilla" version of
        each framework I put through these 7 paces, but I'm more than happy to
        make pragmatic exceptions. Ecosystems matter quite a lot, in practice,
        and there are plenty of libraries which are totally orthogonal to
        fundamental GUI concerns like rendering or tracking state over time. I
        like the semantics of pattern matching a <em>lot</em>, and{" "}
        <code>ts-pattern</code> is a very small, render-independent utility
        library providing exactly that.
      </p>
    </>
  ),
};
