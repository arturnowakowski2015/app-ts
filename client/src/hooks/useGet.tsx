import { Data, fetchActionSet } from "../components/Interface";

import { useState, useEffect } from "react";
const useGet = (ac: fetchActionSet) => {
  const [res, setRes] = useState<any>();

  return [res] as const;
};

export default useGet;
