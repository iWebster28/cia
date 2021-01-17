import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import {
  Chart,
  BarSeries,
  Title,
  ArgumentAxis,
  ValueAxis,
} from '@devexpress/dx-react-chart-material-ui';

import { Animation } from '@devexpress/dx-react-chart';

export default function BarChart(props) {
    const chartData = props.data;

    return (
        <div style={{width: props.width}}>
        <Paper>
            <Chart
            data={chartData}
            >
                <ArgumentAxis />
                <ValueAxis max={7} />

                <BarSeries
                    valueField={props.valueF}
                    argumentField={props.argF}
                />
                <Title text={props.title} />
                <Animation />
            </Chart>
        </Paper>
        </div>
    );
}