import { baza } from "../model/baza1.js";
export const load = async (req, res) => {
  const { database } = req.params;
  try {
    console.log("dddddddddddddddddddddddddddddddddddd");
    res.status(200).json(baza[database]);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
  console.log("log");
};

export const sortData = (req, res) => {
  const { database, actcategory, column, sortDirection, from, to } = req.params;
  try {
    console.log(sortDirection);
    sortDirection === "DESC"
      ? baza &&
        baza[database][actcategory].sort(function (a, b) {
          return typeof a[column] === "string"
            ? a[column].localeCompare(b[column])
            : a[column] - b[column];
        })
      : baza &&
        baza[database][actcategory].sort(function (a, b) {
          return typeof a[column] === "string"
            ? b[column].localeCompare(a[column])
            : b[column] - a[column];
        });
    let ss = baza[database][actcategory].filter((t, i) => {
      return i >= from && i < to && t;
    });
    console.log(actcategory + ":::" + JSON.stringify(ss));
    res.status(200).json({ [actcategory]: ss });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
export const paginate = async (req, res) => {
  const { database, actcategory, from, to } = req.params;
  console.log(9999);
  try {
    let ss = baza[database][actcategory].filter((t, i) => {
      return i >= from && i < to && t;
    });
    console.log(from + ":::" + to);
    res.status(200).json({
      len: baza[database][actcategory].length,

      [actcategory]: ss,
    });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
