import { baza } from "../model/baza1.js";
export const load = async (req, res) => {
  const { database } = req.params;
  try {
    res.status(200).json(baza[database]);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const sortData = (req, res) => {
  const { database, actcategory, column, sortDirection, from, to } = req.params;
  try {
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

    res.status(200).json({ [actcategory]: ss });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
export const paginate = async (req, res) => {
  const { database, actcategory, from, to } = req.params;
  console.log("llllllllllllllllllllllllllll");
  try {
    let ss = baza[database][actcategory].filter((t, i) => {
      return i >= from && i < to && t;
    });

    res.status(200).json({
      len: baza[database][actcategory].length,

      [actcategory]: ss,
    });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const remove = async (req, res) => {
  const { database, actcategory, id } = req.params;
  console.log(
    id + "  ggggggggggggggggggggggg" + baza[database][actcategory].length
  );
  try {
    const y = baza[database][actcategory].filter((t) => {
      return Number(t.id) !== Number(id) && t;
    });
    console.log("ggg                      gggggg" + y.length);
    baza[database][actcategory] = y;
    res.status(200).json({ [actcategory]: y });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
