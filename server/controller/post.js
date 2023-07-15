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
  const { database, actcategory, column, sortDirection } = req.params;
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
    res.status(200).json(baza[database]);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
