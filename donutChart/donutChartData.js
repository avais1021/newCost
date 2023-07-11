let donutMobileViewTable = document.querySelector('#donutMobileViewTable');
import handleCustomClickTable from './donut.js'

let donutChartData = [
    { percentage: 13, name: 'Roof Slab' },
    { percentage: 10, name: 'RCC Work - Columns & Slabs' },
    { percentage: 10, name: 'Footing & Foundation' },
    { percentage: 10, name: 'Excavation' },
    { percentage: 10, name: 'Home Design & Approvals' },
    { percentage: 17, name: 'Brickwork and Plastering' },
    { percentage: 10, name: 'Flooring & Tiling' },
    { percentage: 8, name: 'Electric Wiring' },
    { percentage: 10, name: 'Water Supply & Plumbing' },
    { percentage: 10, name: 'Door & Windows' },
]

let arrDesktopData = []; // [{y: 13, label: 13, color: '#FCF8B0', exploded: false, indexLabel: 'Roof Slab'}, {..}, ..]

let arrLabel = [];  // ['Roof Slab', 'RCC Work - Columns & Slabs', 'Footing & Foundation', ...]
let arrMobData = [] // [{ y: 13, customLabel: 13, color: '#FCF8B0', exploded: false, value: "Roof Slab"  },...]

let counter = 1;

for (let i = 0; i < donutChartData.length; i++) {
    arrDesktopData.push({
        y: donutChartData[i].percentage,
        label: donutChartData[i].percentage,
        color: '#FCF8B0',
        exploded: false,
        indexLabel: donutChartData[i].name
    })
    arrLabel.push(donutChartData[i].name)
    arrMobData.push({
        y: donutChartData[i].percentage,
        customLabel: donutChartData[i].percentage,
        indexLabel: donutChartData[i].name,
        value: donutChartData[i].name,
        color: i == 0 ? 'rgba(200, 201, 213, 0.65)' : '#FCF8B0',
        exploded: i == 0 ? true : false,
    })

    // adding table to the ui
    let newChild = `
        <div class="col-3 phase">
            <p>Phase ${counter}</p>
        </div>
        <div class="col-7 phase-head">
            <p>${donutChartData[i].name}</p>
        </div>
        <div class="col-2 phase-per">
            <p>${donutChartData[i].percentage} %</p>
        </div>
    `
    let childContainer = document.createElement('div');
    childContainer.classList.add('row');
    childContainer.innerHTML += newChild
    childContainer.setAttribute('value', counter);
    childContainer.setAttribute('style', 'padding: 0 20px; background-color:#FFFFF0')
    childContainer.addEventListener('click', handleCustomClickTable)
    i==0 ? childContainer.style.backgroundColor = "yellow" : 'white'
    donutMobileViewTable.append(childContainer)
    counter++;
}


export default {
    arrDesktopData, arrLabel, arrMobData, donutChartData
}