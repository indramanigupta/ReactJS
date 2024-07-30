import React from "react";
//import React, { useContext } from "react";
import "./App.css";
//import { TreesContext } from "./";
import { useTrees } from "./";

/* function App({ name }) {
  return (
    <div className="App">
      <h1>Hello {name} !</h1>
    </div>
  );
}
 */

/* Practice 5 -3
function App() {
  const { trees } = useContext(TreesContext);
  return (
    <div>
      <h1>Trees I've heared Of: </h1>
      <ul>
        {trees.map((tree) => (
          <li key={tree.id}>{tree.type}</li>
        ))}
      </ul>
    </div>
  );
} */

function App() {
  const { trees } = useTrees();
  return (
    <div>
      <h1>Trees I've heared Of: </h1>
      <ul>
        {trees.map((tree) => (
          <li key={tree.id}>{tree.type}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
