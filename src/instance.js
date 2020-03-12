import axios from 'axios';

const request = (name)=>{
    return axios({
        url: `https://devorizon.firebaseio.com/`
    })
}

export default request;