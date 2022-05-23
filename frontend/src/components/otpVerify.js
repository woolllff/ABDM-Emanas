import React from 'react';
import { FormControl } from '@chakra-ui/react'
import { Button } from '@chakra-ui/react'
import { Input } from '@chakra-ui/react'
import axios from 'axios';

export default class Otp extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            otp: ""
        }
        this.message = "enter otp"
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit() {
        console.log(this.state)
        axios
            .post('http://localhost:5050/consentRequest', this.state)
            .then(res => {
                console.log(res.data)
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
                   <Input id='otp' type="text" placeholder='otp' name="otp" value={this.state.otp} onChange={e => this.handleChange(e)} />
                </FormControl>
                <Button colorScheme='blue' type='submit' onClick={this.handleSubmit} >Submit</Button>
            </div>
        )
    }

}
