import { useRef, useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { Home } from "../../home/Home";
import { Nav } from "../../../features/layout/nav";
import { useConvertTree } from "../../../api/useConvertTree";
import { useTreeSettings } from "../../../features/layout/tree-settings/api/useTreeSettings";
import { Route, useNavigate, Routes, useLocation } from "react-router-dom";
import { data, tree } from "../../../data/dummy";
import { Lenghts, Set } from "../../../model/Interface";
import { getLength, getRec } from "../../../utils/rest";
import { useTable } from "../../../features/layout/table/api/useTableView";
import { Settings } from "../../../pages/settings";
import { SearchPage } from "../../../pages/search";
import { Recordpage } from "../../../pages/record";
import { api } from "../../../utils/api";

import { useRecord } from "../../record/api/useRecord";
const useLength = (isLen: boolean, set: Set) => {
  let {
    data: result,
    isFetching,
    isLoading,
    refetch,
  } = useQuery(
    ["l", isLen],
    async () => {
      let url: string =
        set.host + set.database + "/" + set.actcategory + "/len";
      //"http://localhost:3001/comments/new/len";
      let y: any = await api.get<Lenghts>(url, {
        mode: 'cors',
        method: "GET",
      });
      return await y;
    }
    //{ keepPreviousData: true, staleTime: 10000000000 }
  );

  return { result, isLoading, isFetching, refetch };
};
export { useLength };
