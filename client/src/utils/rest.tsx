import { Set, Column, DataAny } from "../model/Interface";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { api } from "./api";
export const getRec = async (url: string) => {
  let y: any = await api.get<DataAny>(url, {
    method: "GET",
  });

  return y;
};
