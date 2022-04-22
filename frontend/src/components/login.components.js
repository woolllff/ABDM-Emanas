import React from 'react';
import { FormControl } from '@chakra-ui/react'
import { Button } from '@chakra-ui/react'
import { Input } from '@chakra-ui/react'
import axios from 'axios';

export default class Login extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            username: "",
            password: ""
        }
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit() {
        console.log(this.state)
        axios
            .post('http://localhost:5050/login', this.state)
            .then(res => {
                console.log(res.data)
            })
            .catch(error => {
                console.error(error)
            })

    }

    handleChangeUsername(event) {
        this.setState({ username: event.target.value });
    }

    handleChangePassword(event) {
        this.setState({ password: event.target.value });
    }

    render() {
        return (
            <div className='login'>
                <h1>Login to ABDM-Emanas</h1>
                <FormControl>
                    <Input id='username' type='text' placeholder="Username" name="username" value={this.state.username} onChange={e => this.handleChangeUsername(e)} />
                    <Input id='password' type="password" placeholder='Password' name="username" value={this.state.password} onChange={e => this.handleChangePassword(e)} />
                </FormControl>
                <Button colorScheme='blue' type='submit' onClick={this.handleSubmit} >Submit</Button>
            </div>
        )
    }

}
