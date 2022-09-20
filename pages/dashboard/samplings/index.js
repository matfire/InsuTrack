import { Query } from "appwrite";
import { useEffect, useMemo, useState } from "react";
import { useTable } from "react-table";
import { useRecoilValue } from "recoil";
import userAtom from "../../../atoms/user.atom";
import { database } from "../../../utils/client";

export default function Samplings() {
  const [samplings, setSamplings] = useState([]);
  const user = useRecoilValue(userAtom);
  const columns = useMemo(
    () => [
      {
        Header: "Date",
        accessor: "date",
      },
      {
        Header: "Glycemy",
        accessor: "glycemie",
      },
      {
        Header: "Insuline",
        accessor: "insuline",
      },
    ],
    []
  );
  const rows = useMemo(() => {
    return samplings.map((e) => ({
      date: new Date(e.date).toLocaleString(),
      glycemie: e.glycemie,
      insuline: e.insuline,
    }));
  }, [samplings]);

  useEffect(() => {
    const getData = async () => {
      let offset = 0;
      let data = [];
      while (true) {
        const tmp = await database.listDocuments(
          process.env.NEXT_PUBLIC_DB_NAME,
          process.env.NEXT_PUBLIC_SAMPLING_TABLE,
          [
            Query.limit(100),
            Query.offset(100 * offset),
            Query.equal("user", user?.$id),
          ]
        );
        data = [...data, ...tmp.documents];
        if (data.length >= tmp.total) break;
        offset += 1;
      }
      setSamplings(data, user);
    };

    getData();
  }, []);

  const table = useTable({ columns, data: rows });
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows: tableRows,
    prepareRow,
  } = table;

  if (!samplings) return <div>no samplings</div>;

  return (
    <div className="w-full h-full">
      <table {...getTableProps()} className="table w-full">
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {
            // Loop over the table rows
            tableRows.map((row) => {
              // Prepare the row for display
              prepareRow(row);
              return (
                // Apply the row props
                <tr {...row.getRowProps()} className="hover">
                  {
                    // Loop over the rows cells
                    row.cells.map((cell) => {
                      // Apply the cell props
                      return (
                        <td {...cell.getCellProps()}>
                          {
                            // Render the cell contents
                            cell.render("Cell")
                          }
                        </td>
                      );
                    })
                  }
                </tr>
              );
            })
          }
        </tbody>
      </table>
    </div>
  );
}
