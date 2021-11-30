import { useEffect } from "react";

import dynamic from "next/dynamic";
import nj from "numjs";
import { registerAllModules } from "handsontable/registry";

const HotTable = dynamic(() => import("@handsontable/react"), {
  ssr: false,
});

export default function Test() {
  registerAllModules();

  const matrix = nj.random([50, 50]);
  const hotData = matrix.tolist();
  return (
    <>
      <HotTable
        data={hotData}
        colHeaders={true}
        rowHeaders={true}
        height="auto"
        licenseKey="non-commercial-and-evaluation"
      />
    </>
  );
}
