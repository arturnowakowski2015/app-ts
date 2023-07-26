import { baza } from "../model/baza1.js";
export const increase = async (req, res) => {
  for (let i = baza["comments"]["new"].length; i < 2130000; i++)
    baza["comments"]["new"].push({
      postId: 1,
      id: baza["comments"]["new"].length + i,
      name: "id labore ex et quam laborum",
      email: "Eliseo@gardner.biz",
      body: "laudantium enim quasi est quidem magnam voluptate ipsam eos\ntempora quo necessitatibus\ndolor quam autem quasi\nreiciendis et nam sapiente accusantium",
    });
};
export const load = async (req, res) => {
  const { database } = req.params;
  try {
    res.status(200).json(baza[database]);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const sortData = (req, res) => {
  const { database, actcategory, column, sortDirection, page, limit } =
    req.params;
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
    const startIndex = (Number(page) - 1) * Number(limit);
    const endIndex = startIndex + Number(limit);
    const p = baza[database][actcategory].slice(startIndex, endIndex);
    console.log(page);
    res.status(200).json({ data: p, len: baza[database][actcategory].length });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
export const paginate = async (req, res) => {
  increase();

  const { database, actcategory, page, limit } = req.params;
  console.log(page);
  const startIndex = (Number(page) - 1) * Number(limit);
  const endIndex = startIndex + Number(limit);
  const p = baza[database][actcategory].slice(startIndex, endIndex);

  try {
    res.status(200).json({ data: p, len: baza[database][actcategory].length });
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
    res.status(200).json({ succes: "success" });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
