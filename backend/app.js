const express = require('express');
// const os = require('os');
// const path = require("path");
const axios = require('axios');
const cors = require('cors')

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



var token = null;
var consentRequestID = null;
var consentID = null;

function auth(username,password) {
    axios
        .post('http://3.111.8.53:8080/MHMS_FHIR/fhir/hiu/authenticate', {
            "hiu_username": username,
            "hiu_password": password
        }, {
            headers: {
                'Content-Type': 'application/json',
                'X-Forwarded-Host': '3.111.8.53:8080'
              }
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


function consentGen(pid,hiu,hip,name) {
    axios
        .post('http://3.111.8.53:8080/MHMS_FHIR/fhir/hiu/consentRequest', {
            "timestamp": "2021-03-23T06:07:42.331Z",
            "AuthorizationType": "SMSOTP",
            "consent": {
                "purpose": {
                    "text": "string",
                    "code": "CAREMGT",
                    "refUri": "string"
                },
                "patient": {
                    "id": pid
                },
                "hip": {
                    "id": hip
                },
                "hiu": {
                    "id": hiu
                },
                "requester": {
                    "name": "name",
                    "identifier": {
                        "type": "REGNO",
                        "value": name,
                        "system": " https://e-manas.karnataka.gov.in/"
                    }
                },
                "hiTypes": [
                    "OPBMR", "IPBMR", "AdvanceDirective"
                ],
                "permission": {
                    "accessMode": " STORE or VIEW ",
                    "dateRange": {
                        "from": "2016-03-23T06:07:42.331Z",
                        "to": "2021-03-23T06:07:42.331Z"
                    }
                }
            }

        }, {
            headers: {
                'Content-Type': 'multipart/form-data'
              }
        })
        .then(res => {
            console.log(`statusCode: ${res.status}`)
            console.log(res)
            if (res.errors == null) {
                consentRequestID = res.response.ConsentRequestID;
            }
        })
        .catch(error => {
            console.error(error)
        })
}


function otpVerify(otp)
{
    axios
    .post('http://3.111.8.53:8080/MHMS_FHIR/fhir/hiu/authenticate', {
        "Otp" : otp ,
        "ConsentRequestID" : consentRequestID
    }, {
        headers: {
            'Content-Type': 'multipart/form-data'
          }
    })
    .then(res => {
        console.log(res.body)
        if (res.errors == null) {
            consentID = res.response.consentID;
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
    res.send({message : "success"})

});

app.post('/consentRequest', (req, res) => {
    console.log(req.body)
    // console.log(req.body.username)
    consentGen(req.body.pid, req.body.hiuid, req.body.hipid, req.body.requestor)
    res.send({message : "success"})

});

app.post('/otp', (req, res) => {
    console.log(req.body)
    // console.log(req.body.username)
    otpVerify(otp)
    res.send({message : "success"})

});

app.listen(port, () => {
    console.log(`Now listening on port ${port}`);
});



