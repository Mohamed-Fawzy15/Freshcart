import { createContext, useState } from "react";

export const CounterContext = createContext(0); //intial value for the counter

export default function CounterContextProvider(props) {
  const [counter, setCounter] = useState(0);
  return (
    <CounterContext.Provider value={{ counter, setCounter }}>
      {props.children}
    </CounterContext.Provider>
  );
}
