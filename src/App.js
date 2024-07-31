import React ,{useState,useEffect}from 'react';
import { CssBaseline,Grid } from '@material-ui/core';

import {getPlacesData} from './api/index';
import Header from './components/Header/Header';
import List from './components/List/List';
import Map from './components/Map/Map';
import PlaceDetails from './components/PlaceDetails/PlaceDetails';

const App =()=>{
    const [places,setPlaces]=useState([]);
    const [childClicked, setChildClicked] = useState(null);
    const [filteredPlaces, setFilteredPlaces] = useState([]);

    const [coordinates,setCoordinates]=useState({});
    const [bounds,setBounds]=useState({});

    const [isLoading, setIsLoading] = useState(false);
    const [type,setType]=useState('restros');
    const [rating,setRating]=useState('');

    useEffect(() => {
        const filteredPlaces=places.filter((place)=>place.rating >rating);
        setFilteredPlaces(filteredPlaces);
    }, [rating]);
    
    useEffect(()=>{
        navigator.geolocation.getCurrentPosition(({coords:{latitude,longitude}})=>{
            setCoordinates({lat:latitude,lng:longitude});
        })
    },[]);

    useEffect(()=>{
        if(bounds.sw && bounds.ne){
        setIsLoading(true);
        getPlacesData(type ,bounds.sw,bounds.ne)
            .then((data)=>{
                setPlaces(data?.filter((place)=>place.name && place.num_reviews>0));
                setFilteredPlaces([]);
                setIsLoading(false);
                console.log(data)
            })
        }
    },[type,coordinates,bounds]);
    return(
        <>
         <CssBaseline />
         <Header setCoordinates={setCoordinates}/>
         <Grid container spacing={3} style={{width:'100%'}}>
            <Grid item xs={12} md={4}>
                <List places={filteredPlaces.length ? filteredPlaces : places}
                 childClicked={childClicked}
                 isLoading={isLoading}
                 type={type}
                 setType={setType}
                 rating={rating}
                 setRating={setRating}
                />
            </Grid>
            <Grid item xs={12} md={8}>
                <Map
                    setCoordinates={setCoordinates}
                    setBounds={setBounds}
                    coordinates={coordinates}
                    places={filteredPlaces.length ? filteredPlaces : places}
                    setChildClicked={setChildClicked}
                />
            </Grid>
         </Grid>
        </>
    );
}

export default App;