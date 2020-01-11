import { main } from "./main.tsx";
import ReactDOM from "react-dom";
import { Elm } from "./Main.elm";

ReactDOM.render(main, document.getElementById("react-app"));

Elm.Main.init({ node: document.getElementById("elm-app") });
