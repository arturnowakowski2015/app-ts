import * as React from "react";

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
