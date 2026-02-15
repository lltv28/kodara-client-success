
export interface BarChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string;
  }[];
}

export function BarChart({ data }: { data: BarChartData }) {
  const maxValue = Math.max(...data.datasets.flatMap(d => d.data));

  return (
    <div className="w-full">
      {/* Legend */}
      <div className="flex items-center gap-5 mb-4 px-1">
        {data.datasets.map((dataset, i) => (
          <div key={i} className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded ${dataset.backgroundColor}`}></div>
            <span className="text-xs text-gray-500 font-medium">{dataset.label}</span>
          </div>
        ))}
      </div>

      {/* Chart */}
      <div className="h-52 flex items-end justify-between gap-3 pt-6 pb-2 px-1">
        {data.labels.map((label, index) => (
          <div key={index} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
            <div className="w-full flex gap-1 items-end justify-center h-full">
              {data.datasets.map((dataset, datasetIndex) => {
                const value = dataset.data[index] ?? 0;
                const heightPercentage = maxValue > 0 ? (value / maxValue) * 100 : 0;

                return (
                  <div
                    key={datasetIndex}
                    className={`flex-1 max-w-10 rounded-t-md transition-all duration-500 hover:opacity-80 relative group/bar ${dataset.backgroundColor}`}
                    style={{ height: `${Math.max(heightPercentage, 2)}%` }}
                  >
                     {/* Tooltip on hover */}
                     <div className="absolute -top-7 left-1/2 -translate-x-1/2 text-gray-600 text-[10px] font-semibold whitespace-nowrap opacity-0 group-hover/bar:opacity-100 transition-opacity tabular-nums">
                        ${value.toLocaleString()}
                     </div>
                  </div>
                );
              })}
            </div>
            <span className="text-[11px] text-gray-500 font-medium">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
