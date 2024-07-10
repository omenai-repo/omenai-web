"use client";
import {
  Card,
  Typography,
} from "@/app/material_tailwind/MaterialTailwindExports";

const TABLE_HEAD = ["Transaction", "Transaction Date", "Amount", "Status"];

const TABLE_ROWS = [
  {
    name: "John Michael",
    job: "Manager",
    date: "23/04/18",
    status: "Paid",
  },
  {
    name: "Alexa Liras",
    job: "Developer",
    date: "23/04/18",
    status: "Paid",
  },
  {
    name: "Laurent Perrier",
    job: "Executive",
    date: "19/09/17",
    status: "Paid",
  },
  {
    name: "Michael Levi",
    job: "Developer",
    date: "24/12/08",
    status: "Paid",
  },
  {
    name: "Richard Gran",
    job: "Manager",
    date: "04/10/21",
    status: "Paid",
  },
];

export function TransactionTable() {
  return (
    <Card placeholder="" className="h-full w-full overflow-scroll">
      <table className="w-full min-w-max table-auto text-left">
        <thead>
          <tr>
            {TABLE_HEAD.map((head) => (
              <th
                key={head}
                className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
              >
                <p className="font-bold text-[14px]">{head}</p>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {TABLE_ROWS.map(({ name, job, date, status }, index) => {
            const isLast = index === TABLE_ROWS.length - 1;
            const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

            return (
              <tr key={name}>
                <td className={classes}>
                  <p className="font-normal text-[14px]">{name}</p>
                </td>
                <td className={classes}>
                  <p className="font-normal text-[14px]">{job}</p>
                </td>
                <td className={classes}>
                  <p className="font-notmal text-[14px]">{date}</p>
                </td>
                <td className={classes}>
                  <p className="font-normal text-[14px]">{status}</p>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </Card>
  );
}
