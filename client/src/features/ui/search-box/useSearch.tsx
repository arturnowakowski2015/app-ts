import { useState } from "react";
let data = ["a", "aa", "aaa"];
const useSearch = () => {
  const [options, setOptions] = useState<string[]>([""]);
  const [query, setQuery] = useState("");
  const filteredOptions = (str: string) => {
    let opt: string[] = data.filter((t) => t.indexOf(str) !== -1 && t);
    if (options.length === 0) data.splice(0, 0, str);
    setOptions(opt);
  };
  const reset = () => {
    setOptions([""]);
  };
  return [options, query, filteredOptions, setQuery, reset] as const;
};
export { useSearch };
