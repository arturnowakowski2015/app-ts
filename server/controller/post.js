import { baza } from "../model/baza1.js";
export const increase = async (req, res) => {
  for (let i = baza["comments"]["new"].length; i < 130000; i++)
    baza["comments"]["new"].push({
      postId: 1,
      id: baza["comments"]["new"].length + i,
      name: "id labore ex et quam laborum",
      email: "Eliseo@gardner.biz",
      body: "laudantium enim quasi est quidem magnam voluptate ipsam eos\ntempora quo necessitatibus\ndolor quam autem quasi\nreiciendis et nam sapiente accusantium",
    });
  for (let i = baza["photos"]["new"].length; i < 130000; i++)
    baza["photos"]["new"].push({
      albumId: 100,
      id: 4971,
      title: "officiis exercitationem quia",
      url: "https://via.placeholder.com/600/34ac70",
      thumbnailUrl: "https://via.placeholder.com/150/34ac70",
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
    console.log(baza[database][actcategory].length);
    let obj = {};
    for (var k in baza[database]) {
      obj = { ...obj, [k]: baza[database][k].length };
    }

    res.status(200).json({ data: p, obj });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
export const paginate = async (req, res) => {
  const { database, actcategory, page, limit } = req.params;
  console.log(baza[database][actcategory].length);
  const startIndex = (Number(page) - 1) * Number(limit);
  const endIndex = startIndex + Number(limit);
  const p = baza[database][actcategory].slice(startIndex, endIndex);
  let obj = {};
  for (var k in baza[database]) {
    obj = { ...obj, [k]: baza[database][k].length };
  }

  try {
    res.status(200).json({ data: p, obj });
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

    let obj = {};
    for (var k in baza[database]) {
      obj = { ...obj, [k]: baza[database][k].length };
    }
    console.log(JSON.stringify(obj));
    res.status(200).json({ data: y, obj });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const dataLength = async (req, res) => {
  const { database, actcategory } = req.params;

  try {
    console.log("ggg                      gggggg" + y.length);
    baza[database][actcategory] = y;
    res.status(200).json(baza[database][actcategory]);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
