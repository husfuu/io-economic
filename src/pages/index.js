import { HotTable } from "@handsontable/react";

export default function Home() {
  const hotData = [
    ["Tesla", "Volvo", "Toyota", "Honda"],
    ["2020", 10, 11, 12],
    ["2021", 20, 11, 14],
    ["2022", 30, 15, 12],
  ];
  const colHeaders = ["Company name", "Country", "Name", "Sell date"];
  const rowHeaders = ["Name", "Country", "Name", "Sell date"];
  return (
    <>
      <div>
        {typeof window !== "undefined" ? (
          <HotTable
            settings={{
              data: hotData,
              autoColumnSize: true,
              AutoRowSize: true,
              colHeaders: colHeaders,
              rowHeaders: rowHeaders,
              height: "auto",
              licenseKey: "non-commercial-and-evaluation",
            }}
          />
        ) : (
          "false"
        )}
      </div>
    </>
  );
}
