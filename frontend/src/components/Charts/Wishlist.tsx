import React from "react";
import ReactApexChart from "react-apexcharts";

interface WishlistProps {
  data: {
    name: string;
    wishlistCount: number;
  }[];
}

interface WishlistState {
  series: number[];
  options: ApexCharts.ApexOptions;
}

class Wishlist extends React.Component<WishlistProps, WishlistState> {
  constructor(props: WishlistProps) {
    super(props);

    this.state = {
      series: props.data.map((game) => game.wishlistCount),
      options: {
        chart: {
          type: "pie",
        },
        labels: props.data.map((game) => game.name),
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
