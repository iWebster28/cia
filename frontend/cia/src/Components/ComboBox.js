import React, {useEffect, useState} from "react";
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { createFilterOptions } from '@material-ui/lab/Autocomplete';
import SelectInput from "@material-ui/core/Select/SelectInput";

function ComboBox(props) {
    
    return (
    <div>
    <Autocomplete
      onChange={(event, newValue) => {
        props.setComboValue(newValue);
        console.log(JSON.stringify(newValue));
      }}
      id="car-combo-box"
      options={props.list}
      filterOptions={filterOptions}
      getOptionLabel={(option) => option.make + ' ' + option.model + ' - ' + option.vehicle_id}
      style={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label={"Vehicle Selection"} variant="outlined" />}
    />
    </div>);
}

// Limit how many items in the Combo Box dropdown are shown
const filterOptions = createFilterOptions({
    limit: 10,
});

export default ComboBox;