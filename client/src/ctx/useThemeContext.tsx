import * as React from "react";
import { createContext, useContext } from "react";
export interface AppStateContextInterface {
  state: {
    i: number;
    theme: string;
  };
  setState: Function;
}

export const AppStateContext = React.createContext({
  state: { i: 0, theme: ["1", "2", "3"] },
  setState: (state: any) => {
    console.log("dummy function");
  },
});

export type GlobalContent = {
  sets: string[];
  i: number;
  setI: (i: number) => void;
  setSets: (c: string[]) => void;
};
export const MyGlobalContext = createContext<GlobalContent>({
  sets: ["1", "2", "3"], // set a default value
  i: 1,
  setI: () => {},
  setSets: () => {},
});
export const useGlobalContext = () => useContext(MyGlobalContext);
export {};
