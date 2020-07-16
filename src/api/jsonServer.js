import axios from 'axios';

export default axios.create({    
    baseURL: 'http://76c177aa1b6f.ngrok.io'// Need to update whenever the "jsonserver" is restarted
});