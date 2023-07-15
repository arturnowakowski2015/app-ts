export type fetchActionKind = "get" | "patch" | "post" | "";

export interface fetchActionSet {
  type: fetchActionKind;
  url?: RequestInfo | URL;
  token?: string;
  data?: Data;
}
export interface treeItems {
  name: string;
  children: treeItems[];
}
export interface categoryurl {
  str: string;
}
export interface DataTable {
  [id: string | number]: string | number;
}
export interface Record {
  rec: Array<string | number | Boolean | undefined>;
}
export interface Data {
  [category: string]: DataTable[];
}

interface ColumnsHeader {
  title: string;
  disp: boolean;
}
export interface IMenuItems {
  name: string;
  level: number;
  id: number;
  pid: number;
  nextlevel: number;
  children?: IMenuItems[];
}
export interface Set {
  actcategory: string;
  database: string;
  host: string;
}
export interface Column {
  col: ColumnsHeader;
}
export interface Lenghts {
  new: number;
  postponed: number;
}
export interface Chevron {
  atall: Boolean;
  down: Boolean;
  title: string;
  class: string[];
}
