//// ADD YOUR DATA HERE IN THE MENTIONED FORMAT 
let barChartData = [
    { day: '46', cost: '2,15,000', label: "Home Design & Approvals" },
    { day: '14', cost: '1,05,750', label: "Excavation" },
    { day: '41', cost: '7,86,000', label: "Footing & Foundation" },
    { day: '17', cost: '5,25,000', label: "RCC Work - Columns & Slabs" },
    { day: '37', cost: '4,38,000', label: "Roof Slab" },
    { day: '08', cost: '85,500', label: "Brickwork and Plastering" },
    { day: '25', cost: '3,80,000', label: "Flooring & Tiling" },
    { day: '14', cost: '1,05,750', label: "Electric Wiring" },
    { day: '30', cost: '65,500', label: "Water Supply & Plumbing" },
    { day: '15', cost: '2,00,000', label: "Door" },
]

let maxYAxis = 300;
////////////////////////////////////////////

let newBarChartData = []; // [ [ 0, 46 ],    [ 46, 60 ],...]
let newBarChartDataLabel = []; // 00', '5,25,000', '4,38,000', '85,500',....]
let newBarChartLabel = []  // ['Home Design & Approvals', 'Excavation', 'Footing & Foundation',... ]
let daysArr = []  // [ '46', '14', '41',...]
let customBarChartLabel = []  // ['Phase 1', 'Phase 2',...]
let mobVerticalChartData = [];  // [ {label: 'Phase 1', y: [ 0, 46 ], customLabel: 'Home Design & Approvals', cost: '2,15,000', days: '46'}, ....]
let totalNumberOfDays = 0;
let mobileVerticalChartColor = []
let staticBackDropData = []
let staticBackDropColor = []
let staticBacDropBorderColor = []

let xAxisFontWeight = []

let customBarChartMob = []

let firstAddedVal = 0;
let secondAddedVal = 0;
let counter = 1;

for (let i = 0; i < barChartData.length; i++) {

    staticBackDropData.push([0, maxYAxis])
    if (i == 0) {
        xAxisFontWeight.push(0.6)
        staticBackDropColor.push('rgba(255, 255, 210, 0.5)')
        staticBacDropBorderColor.push('rgba(0, 0, 0, 0.3)');
        mobileVerticalChartColor.push("rgba(200, 201, 213, 0.65)")
    } else {
        xAxisFontWeight.push(0)
        staticBackDropColor.push('rgba(0, 0, 0, 0)')
        staticBacDropBorderColor.push('rgba(0, 0, 0, 0)');
        mobileVerticalChartColor.push("rgba(255, 242, 0, 1)")
    }

    customBarChartMob.push({
        label: `Phase ${counter}`,
        y: parseInt(barChartData[i].day)
    })

    customBarChartLabel.push(`Phase ${counter}`)
    let parsedDay = parseInt(barChartData[i].day)
    totalNumberOfDays += parseInt(barChartData[i].day);
    daysArr.push(barChartData[i].day)  // [46, 14, 41, 17,,]
    newBarChartLabel.push(barChartData[i].label) // ["Home Design & Approvals", "Excavation",,]
    if (i === 0) {
        mobVerticalChartData.push({ label: `Phase ${counter}`, y: [0, parsedDay], customLabel: barChartData[i].label, cost: barChartData[i].cost, days: barChartData[i].day })
        newBarChartData.push([0, parsedDay]) // [[0, 46]]
    }
    else if (barChartData.length !== i) {
        mobVerticalChartData.push({ label: `Phase ${counter}`, y: [firstAddedVal, secondAddedVal], customLabel: barChartData[i].label, cost: barChartData[i].cost, days: barChartData[i].day })
        firstAddedVal += parseInt(barChartData[i - 1].day)
        secondAddedVal = firstAddedVal + parsedDay;
        newBarChartData.push([firstAddedVal, secondAddedVal])
    }
    newBarChartDataLabel.push(barChartData[i].cost)
    counter++
}

export default {
    newBarChartData,
    newBarChartDataLabel,
    daysArr,
    newBarChartLabel,
    customBarChartLabel,
    mobVerticalChartData,
    totalNumberOfDays,
    mobileVerticalChartColor,
    customBarChartMob,
    staticBackDropData,
    staticBackDropColor,
    staticBacDropBorderColor,
    maxYAxis,
    xAxisFontWeight
};
