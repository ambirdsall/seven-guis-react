import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import jsx from "react-syntax-highlighter/dist/esm/languages/prism/jsx";
import syntaxTheme from "react-syntax-highlighter/dist/esm/styles/prism/one-dark";
import shinySyntaxTheme from "react-syntax-highlighter/dist/esm/styles/prism/synthwave84";

SyntaxHighlighter.registerLanguage("jsx", jsx);

export function Gui({ title, challenges, example, shiny, children }) {
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
        <SyntaxHighlighter
          language="jsx"
          style={shiny ? shinySyntaxTheme : syntaxTheme}
        >
          {sourceCode}
        </SyntaxHighlighter>
      </details>
    </div>
  );
}
