import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from "@tremor/react";
import React from "react";

const TableWidget: React.FC<{ data: any }> = ({ data }) => (
  <Table>
    <TableHead>
      <TableRow>
        {data.data.datasets.map((a: any) => (
          <TableHeaderCell key={a.label}>{a.label}</TableHeaderCell>
        ))}
      </TableRow>
    </TableHead>
    <TableBody>
      {data.data.datasets[0].data.map((item: any, i: number) => (
        <TableRow key={i + ""}>
          {data.data.datasets.map((a: any, j: number) => (
            <TableCell key={"cell-" + i + "-" + j}>{a.data[i]}</TableCell>
          ))}
        </TableRow>
      ))}
    </TableBody>
  </Table>
);

export default TableWidget;
