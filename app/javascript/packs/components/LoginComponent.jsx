import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { Form, Button} from 'semantic-ui-react';
import { setCurrentUser } from '../actions/setCurrentUserAction';
class LoginComponent extends Component {
    state = {
        username: "",
        password: ""
    }

    handleChange = (e, { name, value }) => {
     
      this.setState({ [name]: value })
    }

    handleSubmit = e => {
        e.preventDefault();
        const { username, password } = this.state 
        this.props.setCurrentUser(username, password)
        this.props.history.push("/");
    } 
    render() {
        
        return (
          <>
            <Form onSubmit={e => this.handleSubmit(e)}>
              <Form.Field>
                
                <Form.Input
                  label="Username"
                  placeholder="Username"
                  name="username"
                  onChange={this.handleChange}
                />
              </Form.Field>
              <Form.Field>
              
                <Form.Input 
                  label="Password"
                  placeholder="Password"
                  name="password"
                  type="password"
                  onChange={this.handleChange}
                />
              </Form.Field>
              <Button type="submit">Submit</Button>
            </Form>
          </>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setCurrentUser: (username, password) => dispatch(setCurrentUser(username, password))
    }
}

export default connect(null, mapDispatchToProps)(withRouter(LoginComponent));