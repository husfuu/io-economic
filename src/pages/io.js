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
        basics: {
          name: "Basic IO Analysis",
          submenu: {
            items: [
              {
                key: "basic:01",
                name: "Leontief Inverse",
              },
              {
                key: "basic:02",
                name: "Ghosian Inverse",
              },
              {
                key: "basic:03",
                name: "Impact Analysis",
              },
              {
                key: "basic:04",
                name: "Input Multiplier",
              },
              {
                key: "basic:05",
                name: "Output Multiplier",
              },
              {
                key: "basic:06",
                name: "Income Multiplier",
              },
              {
                key: "basic:07",
                name: "Employment Multiplier",
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
              },
              {
                key: "advance:02",
                name: "Decomposition",
              },
              {
                key: "advance:03",
                name: "MPM Analysis",
              },
              {
                key: "advance:04",
                name: "Extraction Method",
              },
              {
                key: "advance:05",
                name: "Pull Analysis",
              },
              {
                key: "advance:06",
                name: "Push Analysis",
              },
              {
                key: "advance:07",
                name: "FOI1",
              },
            ],
          },
        },
        separator2: ContextMenu.SEPARATOR,
        exportas_csv: {
          name: "Export as csv",
          callback: function () {
            exportPlugin.downloadFile("csv", {
              bom: false,
              columnDelimiter: ",",
              columnHeaders: false,
              exportHiddenColumns: true,
              exportHiddenRows: true,
              fileExtension: "csv",
              filename: "Handsontable-CSV-file_[YYYY]-[MM]-[DD]",
              mimeType: "text/csv",
              rowDelimiter: "\r\n",
              rowHeaders: true,
            });
          },
        },
        exportas_txt: {
          name: "Export as txt",
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
