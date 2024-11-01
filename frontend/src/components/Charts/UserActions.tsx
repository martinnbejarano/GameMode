import React from "react";
import ReactApexChart from "react-apexcharts";

interface ApexChartState {
  series: { name: string; data: number[] }[];
  options: ApexCharts.ApexOptions;
}

class UserActions extends React.Component<object, ApexChartState> {
  constructor(props: object) {
    super(props);

    this.state = {
      series: [
        {
          name: "Comprados",
          data: [35, 45, 40, 50, 45, 38, 42, 45],
        },
        {
          name: "Agregados a Wishlist",
          data: [25, 20, 25, 22, 28, 32, 30, 25],
        },
        {
          name: "Sin Acción",
          data: [40, 35, 35, 28, 27, 30, 28, 30],
        },
      ],
      options: {
        chart: {
          type: "bar",
          height: 350,
          stacked: true,
          stackType: "100%",
        },
        title: {
          text: "Distribución de Acciones por Visualización",
          align: "center",
          style: {
            fontSize: "20px",
            fontWeight: "bold",
            color: "#263238",
          },
        },
        colors: ["#008FFB", "#00E396", "#546E7A"],
        plotOptions: {
          bar: {
            horizontal: false,
          },
        },
        stroke: {
          width: 1,
          colors: ["#fff"],
        },
        xaxis: {
          categories: [
            "FIFA 18",
            "FIFA 19",
            "FIFA 20",
            "FIFA 21",
            "FIFA 22",
            "FIFA 23",
            "FIFA 24",
            "FIFA 25",
          ],
        },
        tooltip: {
          y: {
            formatter: function (val) {
              return typeof val === "number" ? val.toFixed(0) + "%" : val + "%";
            },
          },
        },
        fill: {
          opacity: 1,
        },
        legend: {
          position: "right",
          offsetX: 0,
          offsetY: 50,
        },
        dataLabels: {
          enabled: true,
          formatter: function (val) {
            return typeof val === "number" ? val.toFixed(0) + "%" : val + "%";
          },
        },
      },
    };
  }

  render() {
    return (
      <div id="chart">
        <ReactApexChart
          options={this.state.options}
          series={this.state.series}
          type="bar"
          height={350}
        />
      </div>
    );
  }
}

export default UserActions;
