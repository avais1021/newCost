import barChartData from './barChartData.js'

let { newBarChartData,
    customBarChartLabel,
    mobVerticalChartData,
    totalNumberOfDays,
    mobileVerticalChartColor,
    staticBackDropData,
    staticBackDropColor,
    staticBacDropBorderColor,
    maxYAxis,
    xAxisFontWeight
} = barChartData;

const mobileViewCurrentColor = mobileVerticalChartColor;

const ctxv = document.getElementById("myfloatingchart");
const mobilePopUp = document.getElementById("mobile-view-floating-chart-clickedData")
// const labelAdjusted = newBarChartLabel.map(label => label.split(' '));

const chartCanvas = new Chart(ctxv, {
    type: "bar",
    data: {
        labels: customBarChartLabel,
        customData: mobVerticalChartData,
        totalNumberOfDays: totalNumberOfDays,
        datasets: [
            {
                data: newBarChartData,
                borderWidth: 1,
                fill: false,
                backgroundColor: mobileViewCurrentColor,
                borderColor: mobileViewCurrentColor,
                borderWidth: 1,
                borderSkipped: false,
                barPercentage: 0.7
            },
            {
                data: staticBackDropData,
                grouped: false,
                borderWidth: 1,
                fill: false,
                backgroundColor: staticBackDropColor,
                borderColor: staticBacDropBorderColor,
                borderWidth: 1,
                borderSkipped: false,
                barPercentage: 1.25
            },
        ],
    },
    options: {
        scales: {
            y: {
                grid: {
                    tickColor: 'rgba(0, 0, 0, 0)'
                },
                ticks: {
                    callback: (value, index, values) => {
                        if(index === values.length-1) {
                            return null
                        }
                        return value
                    },
                    crossAlign: 'near',
                    align: 'end',
                    padding: 10,
                    textStrokeColor: 'black',
                    labelOffset: -20
                },
                max: maxYAxis,
            },
            x: {
                grid: {
                    tickColor: 'rgba(0, 0, 0, 0)'
                },
                position: 'top',
                backgroundColor: '#FCF797',
                ticks: {
                    crossAlign: 'center',
                    align: 'center',
                    padding: 10,
                    textStrokeWidth: xAxisFontWeight,
                    textStrokeColor: 'black'
                },
            },
        },
        plugins: {
            tooltip: {
                enabled: false
            },
            legend: {
                display: false
            },
        },
        // onClick: (evt, element) => showModal(evt, element)
    },
});

function moveToVerticalChart(){
    var element = document.getElementById('mobile-view-floating-chart-clickedData');
    var headerOffset = 45;
    var elementPosition = element.getBoundingClientRect().top;
    var offsetPosition = elementPosition + window.scrollY-480;
  
    window.scrollTo({
         top: offsetPosition,
         behavior: "smooth"
    });
}

function showModal(click) {

    const points = chartCanvas.getElementsAtEventForMode(click, 'nearest', { intersect: true }, true);

    const color = mobileViewCurrentColor.map(item => "rgba(255, 242, 0, 1)");
    const backDropColorBorder = mobileViewCurrentColor.map(item => 'rgba(0, 0, 0, 0)');
    const backDropBackgroundColor = mobileViewCurrentColor.map(item => 'rgba(0, 0, 0, 0)');
    const xAxisCurrentFontWeight = xAxisFontWeight.map(item => 0);
    
    
    if (points[0]) {
        chartCanvas.options.scales.x.ticks.textStrokeWidth = xAxisCurrentFontWeight;
        chartCanvas.data.datasets[1].borderColor = backDropColorBorder;
        chartCanvas.data.datasets[1].backgroundColor = backDropBackgroundColor;
        chartCanvas.data.datasets[0].backgroundColor = color;
        chartCanvas.data.datasets[0].borderColor = color;
        chartCanvas.options.scales.x.ticks.textStrokeWidth[points[0].index] = 0.6

        chartCanvas.data.datasets[1].borderColor[points[0].index] = 'rgba(0, 0, 0, 0.3)';
        if (points[0].datasetIndex) {
            chartCanvas.data.datasets[1].backgroundColor[points[0].index] = 'rgba(255, 255, 240, 0.5)';
        } else {
            chartCanvas.data.datasets[1].backgroundColor[points[0].index] = 'rgba(255, 255, 210, 0.5)';
        }
        chartCanvas.data.datasets[0].backgroundColor[points[0].index] = 'rgba(200, 201, 213, 0.65)';

        mobilePopUp.innerHTML = `
        <div class="mobile-view-floating-chart-clickedData-child1">
            <div>${chartCanvas.data.customData[points[0].index].customLabel}</div>
            <div>
                <div class="add-custom-line">${chartCanvas.data.customData[points[0].index].days} Days</div>
                <div>₹ ${chartCanvas.data.customData[points[0].index].cost}</div>
            </div>
        </div>
        <div class="mobile-view-floating-chart-clickedData-child2">
            <div>Total No.of Days  <span>${chartCanvas.data.totalNumberOfDays} Days</span></div>
        </div>
        `
        moveToVerticalChart()
    }
    chartCanvas.update()
}

ctxv.onclick = showModal;

window.onload = () => {
    mobilePopUp.innerHTML = `
        <div class="mobile-view-floating-chart-clickedData-child1">
            <div>${chartCanvas.data.customData[0].customLabel}</div>
            <div>
                <div class="add-custom-line">${chartCanvas.data.customData[0].days} Days</div>
                <div>₹ ${chartCanvas.data.customData[0].cost}</div>
            </div>
        </div>
        <div class="mobile-view-floating-chart-clickedData-child2">
            <div>Total No.of Days  <span>${chartCanvas.data.totalNumberOfDays} Days</span></div>
        </div>
        `
}
