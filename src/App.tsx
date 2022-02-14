import React from "react";
import {
  createSourceFile,
  InterfaceDeclaration,
  ScriptTarget,
  SyntaxKind,
} from "typescript";
import { PropertySignature } from "typescript/lib/tsserverlibrary";
import prettier from "prettier";
import parserTypeScript from "prettier/parser-typescript";

const inp = `
interface IState {
  busy: boolean;
  names: string[];
  error?: string;
}
`.trim();

function ucFirst(s: string) {
  return s[0].toUpperCase() + s.slice(1);
}

function refactorState(input: string, useState: string) {
  const source = createSourceFile("input.tsx", input, ScriptTarget.Latest);
  const syntaxList = source.getChildAt(0);
  const text: string[] = [];
  syntaxList.getChildren().forEach((child) => {
    if (child.kind === SyntaxKind.InterfaceDeclaration) {
      const idec = child as InterfaceDeclaration;
      idec.forEachChild((child) => {
        if (child.kind === SyntaxKind.PropertySignature) {
          const member = child as PropertySignature;
          const name = member.name?.getText(source);
          const isQ = member.questionToken !== undefined;
          const type = member.type?.getText(source);
          const typeP = `${type}${isQ ? " | undefined" : ""}`;
          text.push(
            `const [${name}, set${ucFirst(name)}] = ${useState}<${typeP}>();`,
          );
        }
      });
    }
  });
  return prettier.format(text.join(""), {
    parser: "typescript",
    plugins: [parserTypeScript],
  });
}

function App() {
  const [useReactPrefix, setUseReactPrefix] = React.useState(true);
  const [input, setInput] = React.useState(inp);
  const output = React.useMemo(() => {
    try {
      return refactorState(
        input,
        useReactPrefix ? "React.useState" : "useState",
      );
    } catch (err) {
      console.error(err);
      return `/**\nERROR:\n${err}\n*/`;
    }
  }, [input, useReactPrefix]);
  return (
    <>
      <div>
        <label>TypeScript state interface declaration goes here...</label>
        <textarea value={input} onChange={(e) => setInput(e.target.value)} />
      </div>
      <div>
        <label>... setState statements come out here.</label>
        <textarea value={output} readOnly />
        <label>
          <input
            type="checkbox"
            checked={useReactPrefix}
            onChange={(e) => setUseReactPrefix(e.target.checked)}
          />{" "}
          Use <code>React.</code> prefix
        </label>
      </div>
    </>
  );
}

export default App;
