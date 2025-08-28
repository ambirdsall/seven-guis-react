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
};
