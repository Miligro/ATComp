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

export async function deleteAxios(url){
    try{
        res = await axios.delete(url);
        return 'success';
    }catch(err){
        console.log(err);
        return 'error';
    }
}

export async function updateAxios(url, item){
    try{
        res = await axios.put(url, item);
        return 'success';
    }catch(err){
        console.log(err);
        return 'error';
    }
}