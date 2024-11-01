import React from "react";
import ReactApexChart from "react-apexcharts";

interface ApexChartState {
  series: { name: string; data: number[] }[];
  options: ApexCharts.ApexOptions;
}

class Views extends React.Component<object, ApexChartState> {
  constructor(props: object) {
    super(props);

    const colors = [
      "#008FFB",
      "#00E396",
      "#FEB019",
      "#FF4560",
      "#775DD0",
      "#546E7A",
      "#26a69a",
      "#D10CE8",
    ];

    this.state = {
      series: [
        {
          name: "Visualizaciones",
          data: [1500, 2300, 3200, 4100, 5000, 4800, 3900, 4500],
        },
      ],
      options: {
        chart: {
          height: 350,
          type: "bar",
        },
        title: {
          text: "Visualizaciones",
          align: "center",
          style: {
            fontSize: "20px",
            fontWeight: "bold",
            color: "#263238",
          },
        },
        colors: colors,
        plotOptions: {
          bar: {
            columnWidth: "45%",
            distributed: true,
          },
        },
        dataLabels: {
          enabled: false,
        },
        tooltip: {
          y: {
            title: {
              formatter: () => "Visualizaciones",
            },
          },
        },
        legend: {
          show: false,
        },
        yaxis: {
          title: {
            text: "Número de Visualizaciones",
          },
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
          labels: {
            style: {
              colors: colors,
              fontSize: "12px",
            },
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
