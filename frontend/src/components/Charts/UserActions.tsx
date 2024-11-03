import React from "react";
import ReactApexChart from "react-apexcharts";
import ApexCharts from "apexcharts";

interface UserActionsProps {
  data: {
    name: string;
    totalSales: number;
    views: number;
    wishlistCount: number;
  }[];
}

interface UserActionsState {
  series: {
    name: string;
    data: number[];
  }[];
  options: ApexCharts.ApexOptions;
}

class UserActions extends React.Component<UserActionsProps, UserActionsState> {
  constructor(props: UserActionsProps) {
    super(props);

    const calculatePercentages = (game: {
      totalSales: number;
      views: number;
      wishlistCount: number;
    }) => {
      const total = game.views;
      const purchased = (game.totalSales / total) * 100;
      const wishlisted = (game.wishlistCount / total) * 100;
      const noAction = 100 - purchased - wishlisted;
      return [purchased, wishlisted, noAction];
    };

    const gameData = props.data.reduce(
      (acc, game) => {
        const [purchased, wishlisted, noAction] = calculatePercentages(game);
        acc.purchased.push(purchased);
        acc.wishlisted.push(wishlisted);
        acc.noAction.push(noAction);
        return acc;
      },
      { purchased: [], wishlisted: [], noAction: [] } as Record<
        string,
        number[]
      >
    );

    this.state = {
      series: [
        {
          name: "Comprados",
          data: gameData.purchased,
        },
        {
          name: "Agregados a Wishlist",
          data: gameData.wishlisted,
        },
        {
          name: "Sin Acción",
          data: gameData.noAction,
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
          categories: props.data.map((game) => game.name),
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
