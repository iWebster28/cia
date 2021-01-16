import './App.css';
import React, {useEffect, useState} from "react";
import { Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

//To be replaced
// const makeAndModel = [
//   { make: 'Alfa Romeo', model: 'GT V6 2.5', vehicle_id: 1984},
//   { make: 'Audi', model: '4000', vehicle_id: 19854},
//   { make: 'BMW', model: '3 Series', vehicle_id: 19854},
// ];


// const barrels = 59; //temp demo


//Eventually move this to Components folder

function FetchFlask({ url }) {
  const [data, setData] = useState(null); 
  useEffect(() => { //  useEffect fetches from 'url' and sets data
    fetch(`${url}`, {method: "GET", headers: {"Content-Type": "application/json", "Accept": "application/json"}})
      .then(res => res.json())
      .then(data => setData(data))
      .catch(console.error);
  }, []);

  // console.log('hi' + JSON.stringify(data));

  // Separate the make and model information to put in the combo box
  if (data) {
    // const makeAndModel = data[0].map(x => [x.make, x.model, x.vehicle_id]);
    // console.log(makeAndModel);
    console.log(data[0]);
    return (
      <div>
        <ComboBox list={data[0]} />
        {/* <h1> {makeAndModel}</h1> */}


{/* This should be moved to later. i.e. on button click, add this text. Use data[0] indexed at the corresponding vehicle id, and extract the gas mileage/etcc....
        <h1>You'll consume -- barrels of fuel per annum.</h1>
        <h1>That's the same as --some equivalent surprising comparison--</h1> */}
      
      
      </div>
    );
  }
  return null;
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>CIA</h1>
        <h5>Car Impact Associator</h5>

        <FetchFlask url="http://localhost:5012/data" />

        <br></br>
        <Button variant="contained" color="primary">Find impact</Button>

        <br></br>
        <a
          className="App-link"
          href="https://github.com/iWebster28/cia"
          target="_blank"
          rel="noopener noreferrer"
        >
          Git Repo
        </a>-
      </header>
    </div>
  );
}

function ComboBox(props) {
  return <Autocomplete
    id="car-combo-box"
    options={props.list}
    getOptionLabel={(option) => option.make + ' ' + option.model + ' - ' + option.vehicle_id}
    style={{ width: 300 }}
    renderInput={(params) => <TextField {...params} label={"Vehicle Selection"} variant="outlined" />}
  />;
}

export default App;
