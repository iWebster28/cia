import './App.css';
import React, {useEffect, useState} from "react";
import { Button, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import FetchFlask from './Components/FetchFlask';
import Card from './Components/Card';
import ComboBox from './Components/ComboBox';
import LineChart from './Components/LineChart';
import BarChart from './Components/BarChart';


//To be replaced
// const makeAndModel = [
//   { make: 'Alfa Romeo', model: 'GT V6 2.5', vehicle_id: 1984},
//   { make: 'Audi', model: '4000', vehicle_id: 19854},
//   { make: 'BMW', model: '3 Series', vehicle_id: 19854},
// ];

function App() {
  const [comboValue1, setComboValue1] = React.useState('');
  const [comboValue2, setComboValue2] = React.useState('');
  const [flaskData, setFlaskData] = React.useState('');

  const testdata = [
    { arg: '1950', val: 2.525 },
    { arg: '1960', val: 3.018 },
    { arg: '1970', val: 3.682 },
    { arg: '1980', val: 4.440 },
    { arg: '1990', val: 5.310 },
    { arg: '2000', val: 6.127 },
    { arg: '2010', val: 6.930 },
  ];

  return (
    <div className="App">
      <header className="App-header">
        <h1>CIA</h1>
        
        {/* <h1>{JSON.stringify(comboValue)}</h1> */}
        {/* <p>A React App to compare fuel economy and environmental impact of various cars on the North American market.</p> */}
        <p>Car Impact Associator</p>

        <FetchFlask url="http://localhost:5016/data" flaskData={flaskData} setFlaskData={setFlaskData} />
        <br></br>

        {/* <br></br>
        <Button variant="contained" color="primary">Find impact</Button> */}
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
        >
          <ComboBox id='1' list={flaskData} comboValue={comboValue1} setComboValue={setComboValue1} />
          <ComboBox id='2' list={flaskData} comboValue={comboValue2} setComboValue={setComboValue2} />
        </Grid>
        <br></br>

        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
        >
          <Card id='11' comboValue={comboValue1} />
          <Card id='22' comboValue={comboValue2} />

        </Grid>

        <br></br>
        <p>World Averages</p>

        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
        >
            <BarChart data={testdata} width={465} valueF="val" argF="arg" title="Average Fuel Economy"/>
            <LineChart data={testdata} width={465} valueF="val" argF="arg" title="Average Fuel Economy"/>
        </Grid>

        <br></br>
              
        <br></br>
        <a
          className="App-link"
          href="https://github.com/iWebster28/cia"
          target="_blank"
          rel="noopener noreferrer"
        >
          Git Repo
        </a>
        <br></br>
      </header>
    </div>
  );
}


export default App;
