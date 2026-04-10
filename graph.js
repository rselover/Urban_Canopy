function renderTreeDBHPlot() {
  loadTreeData().then(data => {
    // Log the first record so you can confirm field names
    console.log("Sample tree record:", data[0]);

    // Filter to records with a valid DBH value
    const validData = data
      .map(d => ({ dbh: +d.DBH }))         // ← adjust "DBH" to match your field name
      .filter(d => !isNaN(d.dbh) && d.dbh > 0 && d.dbh < 200);

    const plotDiv = document.getElementById('plot');
    plotDiv.innerHTML = '';

    let plotWidth = 700;
    const parent = plotDiv.parentElement;
    if (parent) {
      plotWidth = Math.max(300, parent.clientWidth - 32);
    }

    if (validData.length === 0) {
      plotDiv.textContent = "No DBH data found. Check the field name in your GeoJSON.";
      return;
    }

    const plot = Plot.plot({
      marginLeft: 50,
      marginRight: 20,
      marginBottom: 50,
      width: plotWidth,
      height: 300,
      style: {
        background: "#222",
        color: "#eee",
        fontFamily: "sans-serif"
      },
      x: {
        label: "Diameter at Breast Height (inches) →",
        labelAnchor: "center",
      },
      y: {
        label: "↑ Tree count",
        labelAnchor: "center",
        grid: true,
      },
      marks: [
        Plot.rectY(
          validData,
          Plot.binX({ y: "count" }, { x: "dbh", fill: "#4caf7d", thresholds: 40 })
        ),
        Plot.ruleY([0], { stroke: "#888" })
      ]
    });

    plotDiv.appendChild(plot);
  });
}

window.addEventListener('DOMContentLoaded', () => {
  function waitForPlotDiv() {
    if (document.getElementById('plot')) {
      renderTreeDBHPlot();
    } else {
      setTimeout(waitForPlotDiv, 50);
    }
  }
  waitForPlotDiv();
});
