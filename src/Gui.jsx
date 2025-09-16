export function Gui({ title, challenges, example, children }) {
  const { GUI: ExampleGui, sourceCode } = example;
  const challenge = (
    <p>
      <em>Challenge{challenges.length > 1 ? "s" : null}:</em>
      {" " + challenges.join(", ")}.
    </p>
  );

  return (
    <div className="card">
      <h2>{title}</h2>
      {challenge}
      <div className="center-contents">
        <ExampleGui />
      </div>
      {children}
      <details>
        <summary>Source code</summary>
        <pre>{sourceCode}</pre>
      </details>
    </div>
  );
}
