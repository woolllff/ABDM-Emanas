const express = require('express');
// const os = require('os');
// const path = require("path");
const axios = require('axios');
const cors = require('cors')
var token = null;


//Instantiate an express app,
const app = express();
// const corsOptions ={
//     origin:'http://localhost:3000', 
//     credentials:true,            //access-control-allow-credentials:true
//     optionSuccessStatus:200
// }

app.use(express.json())
app.use(express.urlencoded())
app.use(cors());
// the port number where server will be listening 
const port = 5050;





function auth(username,password) {
    axios
        .post('http://3.111.8.53:8080/MHMS_FHIR/fhir/hiu/authenticate', {
            hiu_username: username,
            hiu_password: password
        })
        .then(res => {
            console.log(res.body)
            if (res.errors == null) {
                token = res.response;
            }
            // console.log(token);
        })
        .catch(error => {
            console.error(error)
        })
}










app.get('/', (req, res) => {
    res.sendFile('index.html', { root: __dirname });

});

app.post('/login', (req, res) => {
    console.log(req.body)
    console.log(req.body.username)
    auth(req.body.username, req.body.password)
    res.send({message : "asjdnl"})

});

app.listen(port, () => {
    console.log(`Now listening on port ${port}`);
});



