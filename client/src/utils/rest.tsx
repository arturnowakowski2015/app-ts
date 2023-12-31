import { DataAny, Lenghts, RecordData } from "../model/Interface";
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
const getFilteredStr = async (url: string) => {
  let y: any = await api.get<any>(url, {
    method: "GET",
  });

  return y;
};
const updateRecord = async (url: string, data: RecordData) => {
  return (
    await api.patch<RecordData>(url, data),
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );
};
export { getRec, getLength, getRecord, updateRecord, getFilteredStr };
