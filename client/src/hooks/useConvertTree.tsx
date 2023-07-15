import { treeItems } from "../components/Interface";
import { IMenuItems } from "../components/Interface";
const useConvertTree = () => {
  let id = 0;
  let i = 0;
  let level = 0;
  let flattenarr: IMenuItems[] = [];
  const zerotreetoarr = (tree: treeItems[], parentId: number[]) => {
    id = 0;
    treetoarr(tree, parentId);

    delpar(flattenarr);
  };

  const treetoarr = (tree: treeItems[], pid: number[]) => {
    tree &&
      tree.map((t, j) => {
        flattenarr.push({
          name: t.name,
          id: ++id,
          pid: pid[i],
          level: level,
          nextlevel: 0,
        });
        if (t.children) {
          flattenarr[flattenarr.length - 1].nextlevel = 1;
          level++;
          pid.push(id);
          ++i;
          treetoarr(t.children, pid);
        }
        return t;
      });

    level--;

    if (i < 1) i = 0;
    else {
      pid.pop();
      --i;
    }
  };

  const arrtotree = (list1: IMenuItems[]) => {
    let list: treeItems[] = [];
    i = 0;
    var byDate = list1.slice(0);
    list1 = byDate.sort(function (a, b) {
      return a.id - b.id;
    });
    //
    for (i = 0; i < list.length; i += 1) {
      list[i].children = []; // initialize the children
    }
    let temp: any = list;
    for (let i = 0; i < list.length; i++) {
      fillarr(temp[i], list1);
    }
    for (let i = temp.length - 1; i > 0; i--)
      if (temp[i].pid !== 0) temp.splice(i, 1);
    let flattenarr = delpar(temp);
    console.log("..........................." + JSON.stringify(flattenarr)); // if you have dangling branches check that map[node.parentId] exists

    return flattenarr;
  };

  const fillarr = (list: any, array: IMenuItems[]) => {
    let y = array.filter((t) => {
      return t.pid === list.id && t;
    });

    for (let i = 0; i < y.length; i++) {
      list.children &&
        list.children.push({
          name: y[i].name,
          id: y[i].id,
          pid: y[i].pid,
          children: [],
        });
      list.children && fillarr(list.children[i], array);
    }
  };

  const delpar = (flattenarr: IMenuItems[]) => {
    return flattenarr.map((t) => {
      if (t.children && t.children.length === 0) delete t.children;
      if (t.children) delpar(t.children);
      return t;
    });
  };
  return { flattenarr, zerotreetoarr, arrtotree };
};
export { useConvertTree };
