import './App.css';
import { Button } from '@material-ui/core';

import FetchFlask from './Components/FetchFlask';
import Card from './Components/Card';

//To be replaced
// const makeAndModel = [
//   { make: 'Alfa Romeo', model: 'GT V6 2.5', vehicle_id: 1984},
//   { make: 'Audi', model: '4000', vehicle_id: 19854},
//   { make: 'BMW', model: '3 Series', vehicle_id: 19854},
// ];

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>CIA</h1>
        {/* <b>A React App to compare fuel economy and environmental impact of various cars on the North American market.</b> */}
        <p>Car Impact Associator</p>

        <FetchFlask url="http://localhost:5013/data" />

        <br></br>
        <Button variant="contained" color="primary">Find impact</Button>
        <br></br>
        <Card/>

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
