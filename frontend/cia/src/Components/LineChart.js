import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import {
    ArgumentAxis,
    ValueAxis,
    Chart,
    Title,
    LineSeries,
  } from '@devexpress/dx-react-chart-material-ui';
import { Animation } from '@devexpress/dx-react-chart';

function LineChart(props) {
    return (
        <div style={{width: props.width}}>
            <Paper>
            <Chart data={props.data}>
                <ArgumentAxis max={10} />
                <ValueAxis max={10} />

                <LineSeries valueField={props.valueF} argumentField={props.argF} />
            
                <Title text={props.title} />
                <Animation />
            </Chart>
        </Paper>
        </div>
    );
} 


export default LineChart;
