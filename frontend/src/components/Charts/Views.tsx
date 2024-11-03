import React from "react";
import ReactApexChart from "react-apexcharts";
import ApexCharts from "apexcharts";

interface ViewsProps {
  data: {
    name: string;
    views: number;
  }[];
}

interface ViewsState {
  series: {
    name: string;
    data: number[];
  }[];
  options: ApexCharts.ApexOptions;
}

class Views extends React.Component<ViewsProps, ViewsState> {
  constructor(props: ViewsProps) {
    super(props);

    this.state = {
      series: [
        {
          name: "Vistas",
          data: props.data.map((game) => game.views),
        },
      ],
      options: {
        chart: {
          type: "bar",
          height: 350,
        },
        title: {
          text: "Vistas por Juego",
          align: "center",
          style: {
            fontSize: "20px",
            fontWeight: "bold",
            color: "#263238",
          },
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: "55%",
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          show: true,
          width: 2,
          colors: ["transparent"],
        },
        xaxis: {
          categories: props.data.map((game) => game.name),
        },
        yaxis: {
          title: {
            text: "Número de Vistas",
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

export default Views;
