import React from "react";
import ReactApexChart from "react-apexcharts";

interface ApexChartState {
  series: number[];
  options: ApexCharts.ApexOptions;
}

class Wishlist extends React.Component<object, ApexChartState> {
  constructor(props: object) {
    super(props);

    this.state = {
      series: [25, 20, 25, 22, 28, 32, 30, 25], // Datos de wishlist de cada FIFA
      options: {
        chart: {
          type: "pie",
        },
        labels: [
          "FIFA 18",
          "FIFA 19",
          "FIFA 20",
          "FIFA 21",
          "FIFA 22",
          "FIFA 23",
          "FIFA 24",
          "FIFA 25",
        ],
        title: {
          text: "Distribución de Wishlists por Juego",
          align: "center",
          style: {
            fontSize: "20px",
            fontWeight: "bold",
            color: "#263238",
          },
        },
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 200,
              },
              legend: {
                position: "bottom",
              },
            },
          },
        ],
        colors: [
          "#008FFB",
          "#00E396",
          "#FEB019",
          "#FF4560",
          "#775DD0",
          "#546E7A",
          "#26a69a",
          "#D10CE8",
        ],
      },
    };
  }

  render() {
    return (
      <div id="chart">
        <ReactApexChart
          options={this.state.options}
          series={this.state.series}
          type="pie"
          height={350}
        />
      </div>
    );
  }
}

export default Wishlist;
