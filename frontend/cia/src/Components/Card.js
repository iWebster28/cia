import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
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

  return (
    <Card className={classes.root}>
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
          {props.comboValue.make + ' ' + props.comboValue.model}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          Vehicle ID {props.comboValue.vehicle_id}
        </Typography>
        <Typography variant="body2" component="p">
          Consumes
            <br></br>
        </Typography>
        <Typography variant="h4" component="h2">
            {props.comboValue.barrels} Barrels
        </Typography>
        <Typography variant="body2" component="p">
            of fuel per annum.        
            <br></br>
            <br></br>
            That's the same as
        </Typography>
        <Typography variant="h4" component="h2">
            --some equivalent surprising comparison--
        </Typography>
      </CardContent>
      {/* <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions> */}
    </Card>
  );
}
