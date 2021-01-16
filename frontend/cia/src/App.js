import './App.css';
import { Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

const makeAndModel = [
  { make: 'Alfa Romeo', model: 'GT V6 2.5'},
  { make: 'Audi', model: '4000'},
  { make: 'BMW', model: '3 Series' },
];

function App() {
  return (
    <div className="App">
      <header className="App-header">
        
        <Autocomplete
          id="combo-box-demo"
          options={makeAndModel}
          getOptionLabel={(option) => option.make + ' ' + option.model}
          style={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="Combo box" variant="outlined" />}
        />

        <br></br>
        <Button color="primary">Find me a car</Button>

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
