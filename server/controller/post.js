import { baza } from "../model/baza1.js";
const multiplyComments = (category, max) => {
  for (let i = baza["comments"][category]?.length; i < max; i++)
    baza["comments"][category]?.push({
      postId: 1,
      id: baza["comments"][category]?.length + i,
      name: "id labore ex et quam laborum",
      email: "Eliseo@gardner.biz",
      body: "laudantium enim quasi est quidem magnam voluptate ipsam eos\ntempora quo necessitatibus\ndolor quam autem quasi\nreiciendis et nam sapiente accusantium",
    });
};
const multiplyPhotos = (actcategory, max) => {
  for (let i = baza["photos"][actcategory]?.length; i < 130000; i++)
    baza["photos"][actcategory]?.push({
      albumId: 100,
      id: baza["photos"][actcategory]?.length + i,
      title: "officiis exercitationem quia",
      url: "https://via.placeholder.com/600/34ac70",
      thumbnailUrl: "https://via.placeholder.com/150/34ac70",
    });
};
export const increase = async (req, res) => {
  multiplyComments("new", 130000);
  multiplyComments("root", 4300);
  multiplyComments("labels", 900);
  multiplyComments("postponed", 2000);
  multiplyComments("selected", 9000);

  multiplyComments("removed", 4000);

  multiplyPhotos("new", 76000);
  multiplyPhotos("root", 4300);
  multiplyPhotos("labels", 3900);
  multiplyPhotos("postponed", 1000);
  multiplyPhotos("selected", 3000);

  multiplyPhotos("removed", 2000);
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
    //console.log(baza[database][actcategory].length);
    let obj = {};
    for (var k in baza[database]) {
      obj = { ...obj, [k]: baza[database][k].length };
    }

    res.status(200).json({ data: p, obj });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
export const update = async (req, res) => {
  const { database, actcategory, id } = req.params;
  const { data } = req.body;
  const y =
    baza &&
    baza[database] &&
    baza[database][actcategory].filter((t) => {
      return Number(t.id) === Number(id) && t;
    });
  console.log("ggg                      gggggg" + JSON.stringify(y));
  try {
    baza[database][actcategory].splice(
      baza[database][actcategory].findIndex((t) => {
        return Number(t.id) === Number(data.id) && t;
      }),
      1,
      data
    );
    console.log(
      JSON.stringify(
        baza &&
          baza[database] &&
          baza[database][actcategory].filter((t) => {
            return Number(t.id) === Number(data.id) && t;
          })
      )
    );
    res.status(200).json({ text: "success" });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
export const paginate = async (req, res) => {
  const { database, actcategory, page, limit } = req.params;
  // console.log(baza[database][actcategory].length);
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
////:database/filter/:actcategory/:searchedstr/:page/:limit"
export const filterstr = async (req, res) => {
  //console.log(77777);
  const { database, actcategory, searchedstr, page, limit } = req.params;
  const startIndex = (Number(page) - 1) * Number(limit);
  const endIndex = startIndex + Number(limit);
  let filtered = baza[database][actcategory].filter((t) => {
    return t.name.indexOf(searchedstr) !== -1 && t;
  });
  const p = filtered.slice(startIndex, endIndex);

  try {
    res.status(200).json({ data: p, len: filtered.length });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
export const remove = async (req, res) => {
  const { database, actcategory, id } = req.params;
  console.log("przed usunieciem " + baza[database][actcategory].length);
  try {
    const y = baza[database][actcategory].filter((t) => {
      return Number(t.id) !== Number(id) && t;
    });
    console.log("po usunieciu" + y.length);
    baza[database][actcategory] = y;

    let obj = {};
    for (var k in baza[database]) {
      console.log(
        k + ":::::::::::::::::::::::::::::" + baza[database][k].length
      );
      obj = { ...obj, [k]: baza[database][k].length };
    }
    res.status(200).json({ data: y, obj });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
export const get = async (req, res) => {
  const { database, actcategory, id } = req.params;
  // console.log(">>>>>>>>>>>>>>>>>>>>>           ");

  let rec = baza[database][actcategory].filter((t) => {
    return Number(t.id) === Number(id) && t;
  });
  // console.log(">>>>>>>>>>>>>>>>>>>>>           " + JSON.stringify(rec));
  try {
    res.status(200).json({ rec });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
export const dataLength = async (req, res) => {
  const { database, actcategory } = req.params;

  try {
    let obj = {};
    for (var k in baza[database]) {
      obj = { ...obj, [k]: baza[database][k].length };
    }
    ///console.log("llllll   " + JSON.stringify(obj));
    res.status(200).json({ obj });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
