import React from 'react';
import GoogleMapReact from 'google-map-react';
import {Paper,Typography,useMediaQuery} from '@material-ui/core';
import LocationOutLinedIcon from '@material-ui/icons/LocationCityOutlined';
import Rating from '@material-ui/lab/Rating';

import useStyles from './style';
const Map =({setCoordinates,setBounds,coordinates,places,setChildClicked})=>{
    const classes=useStyles();
    const isDesktop=useMediaQuery('(min-width: 600px)');
    
    return(
        <div className={classes.mapContainer}>
            <GoogleMapReact 
                bootstrapURLKeys={{key:''}}
                defaultCenter={coordinates}
                center={coordinates}
                defaultZoom={14}
                margin={[50,50,50,50]}
                options={''}
                onChange={(e)=>{
                    setCoordinates({lat:e.center.lat,lng:e.center.lng})
                    setBounds({ne:e.marginBounds.ne,sw:e.marginBounds.sw});
                }}
                onChildClick={(child)=> setChildClicked(child)}
                >
                {places?.map((place ,i)=>(
                    <div
                        className={classes.markerContainer}
                        lat={Number(place.latitude)}
                        lng={Number(place.longitude)}
                        key={i}
                    >
                        {!isDesktop ? (
                            <LocationOutLinedIcon color="primary" fontsize="large"/>
                        ): (
                            <Paper elevation={3} className={classes.paper}>
                                <Typography className={classes.typography} variant='subtitle2' gutterBottom>
                                    {place.name}
                                </Typography>
                                <img 
                                    className={classes.pointer}
                                    src={place.photo ? place.photo.images.large.url : null}
                                    alt={place.name}
                                />
                                <Rating size="small" value={Number(place.rating)} readOnly/ >
                            </Paper>
                        )}
                    </div>
                ))}
            </GoogleMapReact>
        </div>
    );
}

export default Map;