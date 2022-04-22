
function auth(username,password) {
    axios
        .post('http://3.111.8.53:8080/MHMS_FHIR/fhir/hiu/authenticate', {
            hiu_username: username,
            hiu_password: password
        })
        .then(res => {
            console.log(`statusCode: ${res.body}`)
            if (res.errors == null) {
                token = res.response;
            }
            console.log(token);
        })
        .catch(error => {
            console.error(error)
        })
}


function consentGen() {
    axios
        .post('{SERVER_URL}/MHMS_FHIR/fhir/Hiu/authenticate', {
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
                    "name": "Dr. Manju",
                    "identifier": {
                        "type": "REGNO",
                        "value": " MHP emanas ID",
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

        })
        .then(res => {
            console.log(`statusCode: ${res.status}`)
            console.log(res)
            if (res.errors == null) {
                token = res.response.token;
            }
        })
        .catch(error => {
            console.error(error)
        })
}



function main() {
    auth();
    console.log(token);


}
