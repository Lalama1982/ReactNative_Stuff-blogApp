import axios from 'axios';

export default axios.create({    
    baseURL: 'http://922b05e68963.ngrok.io'// Need to update whenever the "jsonserver" is restarted
});