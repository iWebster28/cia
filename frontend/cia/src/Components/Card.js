import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

// let getImage = require('./getImage');

import BarChart from './BarChart';

const useStyles = makeStyles({
  root: {
    minWidth: 465,
    maxWidth: 500
  },
  media: {
      height: 0,
      paddingTop: '56.25%', 
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function SimpleCard(props) {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  const fields = ["class", "fuel_type_1", "fuel_type2", "annual_consumption_in_barrels_ft1", 
  "annual_consumption_in_barrels_ft2", "city_electricity_consumption", "highway_electricity_consumption", "wh_ft1", 
      "wh_ft_2", "tailpipe_co2_ft1", "tailpipe_co2_ft2"];

  return (
    <Card className={classes.root} style={{padding:0}}>
      <CardContent>
        <CardMedia
            className={classes.media}
            image="https://www.tesla.com/xNVh4yUEc3B9/04_Desktop.jpg"
            title="NAME_CAR"
        />
        <Typography className={classes.title} color="textSecondary" gutterBottom>
            <br></br>
          Results for
        </Typography>
        <Typography variant="h5" component="h2">
          {props.comboValue ? props.comboValue.make + ' ' + props.comboValue.model : ""}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          Vehicle ID {props.comboValue ? props.comboValue.vehicle_id : ""}
        </Typography>
        <Typography variant="body2" component="p">
          Consumes
            <br></br>
        </Typography>
        <Typography variant="h4" component="h2">
            {props.comboValue ? props.comboValue.barrels : ""} Barrels
        </Typography>
        <Typography variant="body2" component="p">
            of fuel per annum.        
            <br></br>
            <br></br>
            That's the same as
        </Typography>
        <Typography variant="h4" component="h2">
            {props.comboValue ? parseInt(props.comboValue.barrels*158.987/200) : 0} Bathtubs
        </Typography>
        
        <Typography variant="body2" component="b">
            Additional Stats:
        </Typography>

        {/* {fields.map((field) => (
            <Typography variant="body2" component="p">
                {props.comboValue ? field + ': ' + parseInt(props.comboValue[field]) : 0}
            </Typography>
        ))} */}


        {/* <BarChart width={468}/> */}

      </CardContent>
      {/* <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions> */}
    </Card>
  );
}
