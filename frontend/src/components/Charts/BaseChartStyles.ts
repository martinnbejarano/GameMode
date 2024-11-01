export const baseChartOptions = {
  chart: {
    toolbar: {
      show: true,
      tools: {
        download: true,
        selection: false,
        zoom: false,
        zoomin: false,
        zoomout: false,
        pan: false,
        reset: false,
      },
    },
    fontFamily: "Inter, sans-serif",
  },
  title: {
    style: {
      fontSize: "18px",
      fontWeight: "600",
      color: "#1f2937",
    },
  },
  theme: {
    mode: "light",
    palette: "palette1",
  },
  grid: {
    borderColor: "#f3f4f6",
    strokeDashArray: 4,
  },
  tooltip: {
    theme: "light",
    style: {
      fontSize: "14px",
    },
    x: {
      show: true,
    },
  },
};
