import axios from "axios"


// Token with which the API-calls are performed
const TOKEN = "cck3rviad3i2ngrq3ot0cck3rviad3i2ngrq3otg"

const finnhubClient = axios.create({
    // URL to be extended for the various API-Calls
    baseURL: "https://finnhub.io/api/v1",
    //Automatically sets token on the instance
    params: {token: TOKEN},
})

export default finnhubClient