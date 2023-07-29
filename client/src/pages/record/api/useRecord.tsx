import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";

import {
  Column,
  DataTable,
  Enabled,
  IMenuItems,
} from "../../../model/Interface";
const useRecord = () => {
  const update = (url: string, rec: DataTable) => {};
  const deleteRec = (str: string, rec: DataTable) => {};
  return { update, deleteRec } as const;
};
export { useRecord };
