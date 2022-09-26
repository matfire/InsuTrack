import { useEffect, useMemo, useState } from "react";
import {
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useRecoilValue } from "recoil";

import samplingsAtom from "../../atoms/samplings.atom";

export default function Dashboard() {
  const samplings = useRecoilValue(samplingsAtom);
  const [dailyAvgs, setDailyAvgs] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const tmp = [];
    const data = [];
    samplings.forEach((e) => {
      const date = new Date(e.date);
      const dateString = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
      if (tmp.findIndex((p) => p === dateString) < 0) {
        const sameDateElems = samplings.filter((p) => {
          const tmpSearch = new Date(p.date);
          return (
            date.getFullYear() === tmpSearch.getFullYear() &&
            date.getMonth() === tmpSearch.getMonth() &&
            date.getDate() === tmpSearch.getDate()
          );
        });
        const totalGlycemie = sameDateElems.reduce(
          (acc, current) => acc + current.glycemie,
          0
        );
        const totalInsuline = sameDateElems.reduce(
          (acc, current) => acc + current.insuline,
          0
        );
        data.push({
          date: dateString,
          glycemie: (totalGlycemie / sameDateElems.length).toFixed(2),
          insuline: (totalInsuline / sameDateElems.length).toFixed(2),
        });
        tmp.push(dateString);
      }
    });
    setDailyAvgs(data);
    setLoading(false);
  }, [samplings]);

  if (loading) {
    return <div>loading...</div>;
  }
  return (
    <div className="w-full h-full">
      <div className="card w-1/3 bg-base-100 shadow-xl">
        <h2 className="card-title">Average Values</h2>
        <div className="card-body h-[300px]">
          <ResponsiveContainer>
            <LineChart data={dailyAvgs}>
              <XAxis
                dataKey="date"
                tickFormatter={(value) => new Date(value).toLocaleDateString()}
              />
              <YAxis />
              <Tooltip
                labelFormatter={(label, payload) => {
                  return new Date(label).toLocaleDateString();
                }}
                formatter={(value, name, props) => [value, name]}
              />
              <Line type="monotone" dataKey="glycemie" />
              <Line type="monotone" dataKey="insuline" stroke="red" />
              <Legend />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
