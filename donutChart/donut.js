import donutChartData from "./donutChartData.js";
let { arrDesktopData, arrLabel, arrMobData } = donutChartData

const chartHeight = window.innerWidth > 990 ? 500 : 250;
const fontSize = window.innerWidth > 990 ? 16 : 10;

// desktop view donut chart
var chart1 = new CanvasJS.Chart("chartContainerDesktop", {
    title: {},
    height: chartHeight,
    legend: {
        horizontalAlign: "right",
        verticalAlign: "center",
    },
    data: [{
        color: "LightSeaGreen",
        indexLabelPlacement: "outside",
        startAngle: 85,
        indexLabel: "{label} - #percent%",
        toolTipContent: "<b>{label} %</b>",
        // showInLegend: true,
        mousemove: onMouseOver,
        mouseout: onMouseOut,
        click: onClick,
        type: "doughnut",
        innerRadius: "60%",
        indexLabelLineColor: "#E5E4E5",
        indexLabelLineThickness: 1.7,
        indexLabelFontSize: fontSize,
        dataPoints: arrDesktopData
    }],
});
// chart.render();

var options = {
    // other chart options...

    responsive: true,
    innerRadius: "70%",
};

chart1.render();

function onMouseOver(e) {
    let currentIndex = e.dataPointIndex;
    let arr = e.dataSeries.dataPoints;
    for (let i = 0; i < arr.length; i++) {
        if (currentIndex == i) {
            e.dataSeries.dataPoints[i].color = "rgba(200, 201, 213, 0.65)";
        } else if (!e.dataSeries.dataPoints[i].exploded) {
            e.dataSeries.dataPoints[i].color = "#FCF8B0";
        }
    }
    chart1.render();
}

function onMouseOut(e) {
    let arr = e.dataSeries.dataPoints;
    for (let i = 0; i < arr.length; i++) {
        if (!e.dataSeries.dataPoints[i].exploded) {
            e.dataSeries.dataPoints[i].color = "#FCF8B0";
        }
    }
    chart1.render();
}

function onClick(e) {
    let currentIndex = e.dataPointIndex;
    let arr = e.dataSeries.dataPoints;
    let currentSeleted = e.dataPoint.exploded;
    for (let i = 0; i < arr.length; i++) {
        if (currentIndex == i || e.dataSeries.dataPoints[i].exploded === true) {
            e.dataSeries.dataPoints[i].color = "rgba(200, 201, 213, 0.65)";
        } else {
            e.dataSeries.dataPoints[i].color = "#FCF8B0";
        }
    }
    chart1.render();
}

// mobile view donut chart
var chart2 = new CanvasJS.Chart("chartContainerMob", {
    title: {},
    height: chartHeight,
    legend: {
        horizontalAlign: "right",
        verticalAlign: "center",
    },
    data: [
        {
            color: "LightSeaGreen",
            indexLabelPlacement: "outside",
            startAngle: 85,
            toolTipContent: "<b>{customLabel}</b>",
            type: "doughnut",
            click: mobileViewOnClck,
            innerRadius: "60%",
            indexLabelLineColor: "#E5E4E5",
            indexLabelLineThickness: 1.7,
            indexLabelFontSize: fontSize,
            dataPoints: arrMobData
        },
    ],
});

chart2.render();

function mobileViewOnClck(e) {
    let currentIndex = e.dataPointIndex;
    let arr = e.dataSeries.dataPoints;
    let currentSeleted = e.dataPoint.exploded;

    let donutMobileViewTable = document.querySelector('#donutMobileViewTable');

    let domChildNodes = donutMobileViewTable.childNodes;

    for (let i = 0; i < arr.length; i++) {
        if (currentIndex == i && arr[i].exploded === true) {
            arr[i].color = "rgba(200, 201, 213, 0.65)";
            domChildNodes[currentIndex + 1].style.backgroundColor = 'yellow'
        }
        else if (currentIndex == i && arr[i].exploded === false) {
            arr[i].color = "rgba(200, 201, 213, 0.65)";
            arr[i].exploded = true;
        }
        else {
            domChildNodes[i + 1].style.backgroundColor = '#FFFFF0';
            arr[i].exploded = false;
            arr[i].color = "#FCF8B0";
        }
    }
    chart2.render();
}


export default function handleCustomClickTable(e) {
    let currentIndex = e.currentTarget.getAttribute('value');

    let arr = chart2.data[0].dataPoints;


    let domChildNodes = e.currentTarget.parentNode.childNodes;

    for (let i = 1; i <= domChildNodes.length; i++) {
        if (domChildNodes[i] && arr && arr.length > 0) {

            if (i == currentIndex) {
                domChildNodes[currentIndex].style.backgroundColor = 'yellow'
                arr[currentIndex - 1].color = "rgba(200, 201, 213, 0.65)";
                // arr[i].indexLabel = arr[i].value
                arr[currentIndex - 1].exploded = true;
            }
            else {
                domChildNodes[i].style.backgroundColor = '#FFFFF0';
                arr[i - 1].color = "#FCF8B0";
                arr[i - 1].exploded = false;
            }
        }
    }
    moveTo()
    chart2.render()

}

function moveTo() {
    let domEle = document.getElementById('chartContainerMob');
    domEle.scrollIntoView({
        block: 'center',
        behavior: 'smooth',
        inline: 'start'
    });
}