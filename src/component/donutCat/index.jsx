import { schemeSet3 } from "d3-scale-chromatic";
import { Doughnut } from 'react-chartjs-2';
import {Chart, ArcElement, Tooltip, Legend} from 'chart.js';
import './styles.css';

Chart.register(ArcElement, Tooltip);

function DonutCat({data, title}) {
    const valuesArray = data.reduce((accumulator, obj) => {
        Object.values(obj).forEach(value => {
            if (value.includes(",")) {
                const splitValues = value.split(", ");
                accumulator.push(...splitValues);
                } else {
                accumulator.push(value);
                }
        });
        return accumulator;
    }, []);
    const valueCounts = {};
    valuesArray.forEach((item) => {
        if (valueCounts[item]) {
        valueCounts[item]++;
        } else {
        valueCounts[item] = 1;
        }
    });
        
    const colorScale = schemeSet3;
    const colors = colorScale.slice(0, Object.keys(valueCounts).length);

    const chartData = {
        labels: Object.keys(valueCounts),
        datasets: [
        {
            data: Object.values(valueCounts),
            backgroundColor: colors,
            hoverBackgroundColor: colors,
        },
        ],
    };
    return (
        <div className='donut'>
            <Doughnut data={chartData} />
            <span>{title}</span>
        </div>
    );
}

export default DonutCat;