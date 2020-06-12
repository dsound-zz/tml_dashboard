import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { Container, Grid, Image } from "semantic-ui-react";
import { connect } from 'react-redux';
import logo from "../../images/logo-2-dashboard";
import { clearCurrentUser } from "../actions/clearCurrentUserAction";

class Header extends Component {
 

  logout = () => {
    localStorage.clear();
    this.props.clearCurrentUser()
    this.props.history.push("/");
  }

  render() {
  
    return (
      <>
        <Container fluid>
          <Grid divided>
            <Grid.Row columns={2}>
              <Grid.Column>
                <Image
                  src={logo}
                  size="large"
                  style={{ margin: "3px", padding: "2px" }}
                ></Image>
              </Grid.Column>
              <Grid.Column>
                {/* {this.props.currentUser === null ?
                 (
                  <Link
                    to={"/login"}
                    onClick={this.props.login}
                    style={{ marginLeft: "200px" }}
                  >
                    Login
                  </Link>
                ) : (
                  <Link
                    to={"/"}
                    onClick={this.logout}
                    style={{ marginLeft: "200px" }}
                  >
                    Logout
                  </Link>
                )} */}
                {this.props.currentUser && this.props.currentUser !== null ?
                
                  <div>Logged in as: {this.props.currentUser.username}</div>
                 : null}
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </>
    );
  }
}

const mapStateToProps = state => {
    return {
        currentUser: state.currentUser.currentUser
    }
}

const mapDispatchToProps = dispatch => {
  return {
    clearCurrentUser: () => dispatch(clearCurrentUser())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header));
