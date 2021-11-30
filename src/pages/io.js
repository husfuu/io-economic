import dynamic from "next/dynamic";
import nj from "numjs";
import { ContextMenu } from "handsontable/plugins/contextMenu";
import { registerAllModules } from "handsontable/registry";
import { HotTable } from "@handsontable/react";

// const HotTable = dynamic(() => import("@handsontable/react"), {
//   ssr: false,
// });

export default function IO() {
  registerAllModules();
  const matrix = nj.random([50, 50]);
  const hotData = matrix.tolist();

  const hotSettings = {
    data: hotData,
    autoColumnSize: true,
    AutoRowSize: true,
    autoWrapRow: true,
    colHeaders: true,
    rowHeaders: true,
    height: "auto",
    contextMenu: {
      items: {
        row_above: {},
        row_below: {},
        col_left: {},
        col_right: {},
        separator1: ContextMenu.SEPARATOR,
        basic: {
          name: "Basic IO Analysis",
          submenu: {
            items: [
              {
                key: "basic:01",
                name: "Leontief Inverse",
                callback: () => {
                  alert("This is a Leontief Inverse function");
                },
              },
              {
                key: "basic:02",
                name: "Ghosian Inverse",
                callback: () => {
                  alert("This is a Ghosian Inverse function");
                },
              },
              {
                key: "basic:03",
                name: "Impact Analysis",
                callback: () => {
                  alert("This is a Impact Analysis function");
                },
              },
              {
                key: "basic:04",
                name: "Input Multiplier",
                callback: () => {
                  alert("This is a Input Multiplier function");
                },
              },
              {
                key: "basic:05",
                name: "Output Multiplier",
                callback: () => {
                  alert("This is a Output Multiplier function");
                },
              },
              {
                key: "basic:06",
                name: "Income Multiplier",
                callback: () => {
                  alert("This is a Income Multiplier function");
                },
              },
              {
                key: "basic:07",
                name: "Employment Multiplier",
                callback: () => {
                  alert("This is a Employment Multiplier function");
                },
              },
            ],
          },
        },
        advance: {
          name: "Advance IO Analysis",
          submenu: {
            items: [
              {
                key: "advance:01",
                name: "Key Sector",
                callback: () => {
                  alert("This is a Key Sector function");
                },
              },
              {
                key: "advance:02",
                name: "Decomposition",
                callback: () => {
                  alert("This is a Decomposition function");
                },
              },
              {
                key: "advance:03",
                name: "MPM Analysis",
                callback: () => {
                  alert("This is a MPM Analysis function");
                },
              },
              {
                key: "advance:04",
                name: "Extraction Method",
                callback: () => {
                  alert("This is a Extraction Method function");
                },
              },
              {
                key: "advance:05",
                name: "Pull Analysis",
                callback: () => {
                  alert("This is a Pull Analysis function");
                },
              },
              {
                key: "advance:06",
                name: "Push Analysis",
                callback: () => {
                  alert("This is a Push Analysis function");
                },
              },
              {
                key: "advance:07",
                name: "FOI1",
                callback: () => {
                  alert("This is a FOI1 function");
                },
              },
            ],
          },
        },
        separator2: ContextMenu.SEPARATOR,
        exportas_csv: {
          name: "Export as csv",
          callback: () => {
            alert("This is a Export as csv function");
          },
        },
        exportas_txt: {
          name: "Export as txt",
          callback: () => {
            alert("This is a Export as txt function");
          },
        },
      },
    },
    licenseKey: "non-commercial-and-evaluation",
  };
  return (
    <>
      <div className="w-full">
        <HotTable settings={hotSettings} />
      </div>
    </>
  );
}
