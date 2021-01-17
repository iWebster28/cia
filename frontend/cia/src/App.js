import './App.css';
import { Button } from '@material-ui/core';

import FetchFlask from './Components/FetchFlask';

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


export default App;
