import { Query } from "appwrite";
import { useEffect, useMemo, useState } from "react";
import { useTable, useSortBy, usePagination } from "react-table";
import { useRecoilValue } from "recoil";
import categoriesAtom from "../../../atoms/categories.atom";
import userAtom from "../../../atoms/user.atom";
import { database } from "../../../utils/client";

export default function Samplings() {
  const [samplings, setSamplings] = useState([]);
  const user = useRecoilValue(userAtom);
  const categories = useRecoilValue(categoriesAtom);
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
      {
        Header: "Category",
        accessor: "category",
      },
    ],
    []
  );
  const rows = useMemo(() => {
    return samplings.map((e) => ({
      date: new Date(e.date).toLocaleString(),
      glycemie: e.glycemie,
      insuline: e.insuline,
      category: categories.find((v) => v.$id == e.category)["name"],
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

  const table = useTable({ columns, data: rows }, useSortBy, usePagination);
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    pageOptions,
    pageCount,
    page,
    state: { pageIndex, pageSize },
    gotoPage,
    previousPage,
    nextPage,
    setPageSize,
    canPreviousPage,
    canNextPage,
  } = table;

  if (!samplings) return <div>no samplings</div>;

  return (
    <div className="w-full h-full">
      <table {...getTableProps()} className="table w-full">
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render("Header")}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? " 🔽"
                        : " 🔼"
                      : ""}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {
            // Loop over the table rows
            page.map((row) => {
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
      <div className="w-full flex justify-center">
        <div className="btn-group">
          <button
            className="btn"
            onClick={() => gotoPage(0)}
            disabled={!canPreviousPage}
          >
            {"<<"}
          </button>{" "}
          <button
            className="btn"
            onClick={() => previousPage()}
            disabled={!canPreviousPage}
          >
            {"<"}
          </button>{" "}
          <button className="btn">
            Page{" "}
            <strong>
              {pageIndex + 1} of {pageOptions.length}
            </strong>{" "}
          </button>
          <button
            className="btn"
            onClick={() => nextPage()}
            disabled={!canNextPage}
          >
            {">"}
          </button>{" "}
          <button
            className="btn"
            onClick={() => gotoPage(pageCount - 1)}
            disabled={!canNextPage}
          >
            {">>"}
          </button>{" "}
          <select
            className="select"
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
            }}
          >
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
