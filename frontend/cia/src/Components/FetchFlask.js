import React, {useEffect, useState} from "react";
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { createFilterOptions } from '@material-ui/lab/Autocomplete';


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

function ComboBox(props) {
    return <Autocomplete
      id="car-combo-box"
      options={props.list}
      filterOptions={filterOptions}
      getOptionLabel={(option) => option.make + ' ' + option.model + ' - ' + option.vehicle_id}
      style={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label={"Vehicle Selection"} variant="outlined" />}
    />;
}

// Limit how many items in the Combo Box dropdown are shown
const filterOptions = createFilterOptions({
    limit: 10,
});

export default FetchFlask;