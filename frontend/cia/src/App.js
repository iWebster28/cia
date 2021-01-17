import './App.css';
import React, {useEffect, useState} from "react";
import { Button } from '@material-ui/core';

import FetchFlask from './Components/FetchFlask';
import Card from './Components/Card';
import ComboBox from './Components/ComboBox'

//To be replaced
// const makeAndModel = [
//   { make: 'Alfa Romeo', model: 'GT V6 2.5', vehicle_id: 1984},
//   { make: 'Audi', model: '4000', vehicle_id: 19854},
//   { make: 'BMW', model: '3 Series', vehicle_id: 19854},
// ];

function App() {
  const [comboValue, setComboValue] = React.useState('');
  const [flaskData, setFlaskData] = React.useState('');

  return (
    <div className="App">
      <header className="App-header">
        <h1>CIA</h1>
        {/* <h1>{JSON.stringify(comboValue)}</h1> */}
        {/* <b>A React App to compare fuel economy and environmental impact of various cars on the North American market.</b> */}
        <p>Car Impact Associator</p>

        <FetchFlask url="http://localhost:5013/data" flaskData={flaskData} setFlaskData={setFlaskData} />

        <div>
          <ComboBox list={flaskData} comboValue={comboValue} setComboValue={setComboValue} />
          {/* <h1> {makeAndModel}</h1> */}


        {/* This should be moved to later. i.e. on button click, add this text. Use data[0] indexed at the corresponding vehicle id, and extract the gas mileage/etcc....
          <h1>You'll consume -- barrels of fuel per annum.</h1>
          <h1>That's the same as --some equivalent surprising comparison--</h1> */}
        
        
        </div>

        {/* <br></br>
        <Button variant="contained" color="primary">Find impact</Button> */}
        <br></br>

        <Card comboValue={comboValue}/>

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
