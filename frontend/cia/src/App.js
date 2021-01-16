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
const makeAndModel = [];


// const barrels = 59; //temp demo


//Eventually move this to Components folder

function FetchFlask({ url }) {
  const [data, setData] = useState(null); 
  useEffect(() => { //  useEffect fetches from 'url' and sets data
    fetch(`${url}`, {method: "GET", headers: {"Content-Type": "application/json", "Accept": "application/json"}})
      .then(res => res.json())
      .then(data => console.log(data))
      .then(setData)
      .catch(console.error);
  }, []);

  console.log('hi');

  // Separate the make and model information to put in the combo box

  if (data) {
    console.log("HI");
    return (
      <div>
        {/* <ComboBox list={makeAndModel.map(x => x['make'] + ' ' + x['model'])} />
        <ComboBox list={makeAndModel.map(x => x['year'])} /> */}
        <ComboBox list={makeAndModel}/>
        <h1> {data["0"]} was fetched</h1>
        <h1>You'll consume -- barrels of fuel per annum.</h1>
        <h1>That's the same as --some equivalent surprising comparison--</h1>
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
        </a>
      </header>
    </div>
  );
}

function ComboBox(props) {
  return <Autocomplete
    id="car-combo-box"
    options={makeAndModel}
    getOptionLabel={(option) => option.make + ' ' + option.model}
    style={{ width: 300 }}
    renderInput={(params) => <TextField {...params} label={"Vehicle Selection"} variant="outlined" />}
  />;
}

export default App;
