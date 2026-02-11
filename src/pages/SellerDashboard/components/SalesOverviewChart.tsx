import Chart from "react-apexcharts";
import type { ApexOptions } from "apexcharts";

interface SalesOverviewChartProps {
  orders: number[];
  sales: number[];
}

const SalesOverviewChart = ({ orders, sales }: SalesOverviewChartProps) => {
  const series = [
    {
      name: "Vendas",
      data: sales,
    },
    {
      name: "Pedidos",
      data: orders,
    },
  ];

  const seriesFormat = [
    { type: "currency", label: "BRL" },
    { type: "count", label: "pedidos" },
  ] as const;

  const options: ApexOptions = {
    chart: {
      type: "line",
      toolbar: { show: false },
    },
    stroke: {
      curve: "smooth",
      width: 3,
    },
    xaxis: {
      categories: ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"],
    },
    dataLabels: {
      enabled: false,
    },
    grid: {
      strokeDashArray: 4,
    },
    tooltip: {
      y: {
        formatter: (value: number, { seriesIndex }) => {
          const config = seriesFormat[seriesIndex];

          if (config?.type === "currency") {
            return value.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            });
          }

          if (config?.type === "count") {
            return `${value} ${config.label}`;
          }

          return String(value);
        },
      },
    },
  };
  return <Chart options={options} series={series} type="line" height={250} />;
};

export default SalesOverviewChart;
