import { Set, Column, DataAny, Lenghts } from "../model/Interface";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { api } from "./api";
const getRec = async (url: string) => {
  let y: any = await api.get<DataAny>(url, {
    method: "GET",
  });

  return y;
};

const getLength = async (url: string) => {
  let y: any = await api.get<Lenghts>(url, {
    method: "GET",
  });

  return y;
};
const getRecord = async (url: string) => {
  let y: any = await api.get<any>(url, {
    method: "GET",
  });

  return y;
};
export { getRec, getLength, getRecord };
