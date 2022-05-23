import React from 'react';
import { FormControl } from '@chakra-ui/react'
import { Button } from '@chakra-ui/react'
import { Input } from '@chakra-ui/react'
import axios from 'axios';

export default class ConsentRequest extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            pid: "",
            hiuid: "",
            hipid: "",
            requestor: ""
        }
        this.message = "enter patient info"
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit() {
        console.log(this.state)
        axios
            .post('http://localhost:5050/consentRequest', this.state)
            .then(res => {
                console.log(res.data)
                if(res.data.message == "success")
                {

                }
            })
            .catch(error => {
                console.error(error)
            })

    }


    handleChange(event) {
        var prevState = this.state;
        prevState[event.target.name] = event.target.value
        this.setState(prevState);
    }

    render() {
        return (
            <div className='login'>
                <h1>{this.message }</h1>
                <FormControl>
                    <Input id='pid' type='text' placeholder="pid" name="pid" value={this.state.pid} onChange={e => this.handleChange(e)} />
                    <Input id='hipid' type="text" placeholder='hip id' name="hipid" value={this.state.hipid} onChange={e => this.handleChange(e)} />
                    <Input id='hiuid' type="text" placeholder='hiu id' name="hiuid" value={this.state.hiuid} onChange={e => this.handleChange(e)} />
                    <Input id='requestor' type="text" placeholder='requestor' name="requestor" value={this.state.requestor} onChange={e => this.handleChange(e)} />
                </FormControl>
                <Button colorScheme='blue' type='submit' onClick={this.handleSubmit} >Submit</Button>
            </div>
        )
    }

}
