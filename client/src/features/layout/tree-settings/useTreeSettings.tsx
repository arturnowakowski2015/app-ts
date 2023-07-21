import { useState } from "react";
import { IMenuItems } from "../../../Interface";

export interface Element {
  old?: IMenuItems;
  act?: IMenuItems;
}

const useTreeSettings = () => {
  const [idroot, setIdroot] = useState<string | null>("");
  const [treedata, setTreedata] = useState<IMenuItems[]>([]);
  const [el, setEl] = useState<Element>({});
  const findel = (el: string) => {
    return treedata.filter((t) => {
      return t.name.indexOf(el) !== -1;
    });
  };
  const findarrayindex = (array: IMenuItems[], str: string | undefined) => {
    return array.findIndex((t) => {
      return t.name.indexOf(str as string) !== -1 && t;
    });
  };
  const findinarray = (array: IMenuItems[], str: string | undefined) => {
    return array.findIndex((t) => {
      return t.name === str && t;
    });
  };

  const handleDragStart = (
    event: React.DragEvent<HTMLDivElement>,
    name: string
  ) => {
    treedata.map((t) => {
      let yy = t.name.indexOf(".XX");
      if (yy !== -1) {
        t.name = t.name.slice(5);
      }
      return t;
    });
    setTreedata(treedata);

    event.dataTransfer.setData("text", event.currentTarget.id);
    let acti: IMenuItems[] = findel(name);

    setEl({ act: undefined, old: { ...acti[0] } });
    treedata.map((t) => {
      if (acti[0] && acti[0].id === t.id) t.name = ".XX  " + t.name;
      return t;
    });
    setTreedata(treedata);

    return { el, treedata };
  };

  const enableDropping = (
    event: React.DragEvent<HTMLDivElement>,
    name: string
  ) => {
    event.preventDefault();

    setIdroot(event.currentTarget.getAttribute("id"));
    console.log(name);
    setEl({ ...el, act: { ...findel(name)[0] } });
  };

  const cutText = (str: string) => {
    let str1 = str;
    if (str.indexOf(">") !== -1) {
      str1 = str.split(">")[1];
      str1 = str1.slice(0, str1.indexOf("<") + 1);
      return str1 && str1.slice(0, str1.indexOf("<"));
    }
    return str;
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    let sections: HTMLElement[] = [];
    sections = document.querySelectorAll(".node") as unknown as HTMLElement[];
    let array: IMenuItems[] = [];
    // 1 setting pid and id

    const push = (section: HTMLElement, i: number) => {
      console.log(section);
      array.push({
        name: cutText(section.innerHTML),
        level:
          parseInt(
            section.style.marginLeft.slice(
              0,
              section.style.marginLeft.indexOf("p")
            )
          ) / 10,
        id: i,
        pid: parseInt(
          section.innerHTML.slice(
            section.innerHTML.indexOf(" p") + 2,
            section.innerHTML.indexOf("/")
          )
        ),
        nextlevel: 0,
      });
    };
    for (let i = 0; i < sections.length; i++) {
      push(sections[i], i);
    }
    let act = findinarray(array, el.old && el.old.name);
    let old = findarrayindex(array, ".XX");
    let lev = 0;
    if (old > act) {
      array.map((t, i) => {
        if (i > old && t.level >= array[old].level) t.level = t.level - 1;

        return t;
      });
    } else
      for (let i = 0; i < array.length; i++) {
        if (i > old && array[i].level > array[old].level) {
          lev = array[i].level;
          if (
            array.filter((t) => {
              return el.old && t.pid === el.old.id && t;
            }).length > 0
          )
            array[i].level = array[i].level - 1;

          if (
            array[i + 1] &&
            array[i + 1].level < lev && //level greater then next level
            el.old &&
            array[i + 1].level === el.old.level //old level equal next level
          ) {
            break;
          }
        }
      }
    array.splice(old, 1);
    array.map((t, i) => {
      t.id = i + 1;
      return t;
    });

    let pidarr: number[] = [];
    pidarr.push(array[0].pid);

    const reindex = (
      array: IMenuItems[],
      ii: number,
      pid: number[],
      j: number
    ) => {
      if (ii < 1)
        for (let i = 0; i < array.length; i++)
          if (i === ii) {
            array[i].pid = pid[j];
            if (array[i + 1] && array[i + 1].level > array[i].level) {
              pid.push(array[i].id);
              ++j;
            }
            if (array[i + 1] && array[i + 1].level < array[i].level) {
              let yy = array[i].level - array[i + 1].level;
              while (yy > 0) {
                pid.pop();
                --j;
                --yy;
              }
            }

            reindex(array, ++ii, pid, j);
          }

      return array;
    };
    setEl((el) => ({
      old: undefined,
      act: undefined,
    }));
    setIdroot("");
    array = reindex(array, 0, pidarr, 0);
    array.map((t, i) => {
      array.map((tt) => {
        if (tt.pid === t.id) {
          t.nextlevel = 1;
        }
        return tt;
      });
      return t;
    });
    setTreedata(array);
  };

  return {
    idroot,
    treedata,
    setTreedata,
    el,
    handleDragStart,
    enableDropping,
    handleDrop,
  };
};
export { useTreeSettings };
