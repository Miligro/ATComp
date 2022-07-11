import axios from "axios";

export async function get(url) {
  try {
    res = await axios.get(url);
    return res.data;
  } catch (err) {
    console.log(err);
    return null;
  }
}

export async function deleteAxios(url) {
  try {
    res = await axios.delete(url);
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
}

export async function updateAxios(url, item) {
  try {
    res = await axios.put(url, item);
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
}
