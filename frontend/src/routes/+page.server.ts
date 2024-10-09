import axios from "axios";

export async function load() {
    
    return {items : await axios.get("http://localhost:3000/products").then(resp => resp.data)};
}