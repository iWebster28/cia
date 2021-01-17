import React, {useEffect, useState} from "react";

function FetchFlask({ url, flaskData, setFlaskData }) {
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
      setFlaskData(data[0]); //we're not supposed to do this here....
    }
    return null;
}

export default FetchFlask;