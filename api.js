import axios from "axios";

export async function get(url){
    try{
        res = await axios.get(url);
        return res.data;
    }catch(err){
        console.log(err);
        return null;
    }   
}