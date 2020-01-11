import * as React from "react";
import {
  Cmd,
  useElmLikeReducer,
  noCmd,
  genRandom,
  delayed
} from "./elmLikeHook";

const randomInt: Cmd<Msg> = genRandom(n => ({
  type: "GotRandomInt",
  value: Math.floor(n * 11)
}));

// MODEL

type Model = { count: number };

const init: [Model, Cmd<Msg>] = [{ count: 0 }, noCmd];

// UPDATE

type Msg = { type: "RandomCountUp" } | { type: "GotRandomInt"; value: number };

const update: (msg: Msg, model: Model) => [Model, Cmd<Msg>] = (msg, model) => {
  switch (msg.type) {
    case "RandomCountUp":
      return [model, randomInt];
    case "GotRandomInt":
      return [{ ...model, count: msg.value + model.count }, noCmd];
  }
};

const Main: React.FC = () => {
  const [model, dispatch] = useElmLikeReducer(update, init);
  return (
    <div>
      <p>Random countup: {model.count}</p>
      <button onClick={() => dispatch({ type: "RandomCountUp" })}>
        randomCount
      </button>
    </div>
  );
};

export const main: JSX.Element = <Main></Main>;
