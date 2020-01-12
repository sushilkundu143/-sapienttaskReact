import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';

const useStyles = makeStyles({
    card: {
        maxWidth: 345
    },
    media: {
        height: 250
    }
});


export default function CardMemes(props) {
    const classes = useStyles()
    const apidatas = props.datas
    return (
        <Grid container spacing={1}>
            {apidatas.length > 0 ? apidatas.map(data => (
                <Grid key={data.id} item xs={6} lg={3}>
                    <Card className={classes.card}>
                        <GridListTile>
                            <img src={data.image} alt={data.name} className={classes.media}/>
                            <GridListTileBar
                                title={data.name}
                                subtitle={<span> id : {
                                data.id
                            }
                             <span style={{paddingLeft: 5}}>Created</span> {data.created} </span>}/>
                        </GridListTile>
                        <CardContent>
                            <ul className="listitem">
                                <li>
                                    <Typography className="small">
                                        <span>STATUS:</span> <span className="textright">{data.status}</span>
                                    </Typography>
                                </li>
                                <li>
                                    <Typography className="small">
                                    <span>SPECIES:</span> <span className="textright">{data.species}</span>
                                    </Typography>
                                </li>
                                <li>
                                    <Typography className="small">
                                    <span>GENDER:</span> <span className="textright">{data.gender}</span>
                                    </Typography>
                                </li>
                                <li>
                                    <Typography className="small">
                                    <span>ORIGIN:</span> <span className="textright">{data.origin.name}</span>
                                    </Typography>
                                </li>
                                <li>
                                    <Typography className="small">
                                    <span>LAST LOCATION:</span> <span className="textright">{data.location.name}</span>
                                    </Typography>
                                </li>
                            </ul>
                        </CardContent>

                    </Card>
                </Grid>
            )): (
                <Grid item sm={12} className="text-center">
                    <h1>OOPS!</h1>
                    <Typography>
                        Looks like we couldn't find any matches. Try again or browse on Cloests.
                    </Typography>
                </Grid>
            )}
        </Grid>
    )
}