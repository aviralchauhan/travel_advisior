import axios from "axios";


// const URL='https://travel-advisor.p.rapidapi.com/restaurants/list-in-boundary';



export const getPlacesData=async (type,sw,ne)=>{
    try{
        const {data:{data}}=await axios.get(`https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`,{
            params: {         
            bl_latitude:sw.lat,
            tr_latitude:ne.lat,
            bl_longitude:sw.lng,
            tr_longitude:ne.lng
            
          },
          headers: {
            'X-RapidAPI-Key': '04ad7f2733mshc44f8a47eaa2db8p16b786jsncdb2ac494ea0',
            'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
          }});
        return data;
    }catch(error){
        console.log(error);
    }
}