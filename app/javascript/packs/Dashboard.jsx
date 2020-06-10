import React, { Component } from "react";
import { connect } from "react-redux";
import { Switch, Route, Link, withRouter } from "react-router-dom";
import { Container, Grid, Image } from "semantic-ui-react";
import CurrentStatus from "./components/CurrentStatusComponent";
import KnownOutages from "./components/KnownOutagesComponent";
import ServiceNotes from "./components/ServiceNotesComponent";
import Login from "./components/LoginComponent";
import Header from "./components/Header";
import { getServices } from "./actions/getServicesAction";
import { getOutages } from "./actions/getOutagesAction";
import { getNotes } from "./actions/getNotesAction";
import { getCurrentUser } from "./actions/getCurrentUserAction";

class Dashboard extends Component {
  state = {
    serviceNotes: null,
    serviceOutages: null,
    showNotes: "none",
    serviceId: null,
    serviceReason: null, 
    serviceEta: null
  };

  componentDidMount() {
    let token = localStorage.getItem("token");
    if (token) {
      this.props.getCurrentUser(token);
    } else {
      null;
    }
    this.props.getServices();
    this.props.getOutages();
    this.props.getNotes();
  }

  displayNotes = () => {
    this.setState({ showNotes: "none" ? "block" : "none" });
  };

  setServiceId = e => {
    this.setState({ serviceId: e });
    this.displayNotes();
  };

  getServiceNotes = e => {
    console.log(e)
  }


  render() {
   
    return (
      <>
        <Header login={this.login} />
        <Container fluid>
          <Switch>
            <Route
              path="/login"
              render={(routerProps) => <Login {...routerProps} />}
            />
            <Route
              path="/logout"
              render={(routerProps) => <Logout {...routerProps} />}
            />
            <Route
              path="/"
              render={
                (routerProps) => (
                  <Grid columns={3} divided>
                    <Grid.Row>
                      <Grid.Column width={5}>
                        <h2>Service Notes</h2>
                      </Grid.Column>
                      <Grid.Column width={6}>
                        <h2>Current Status</h2>
                      </Grid.Column>
                      <Grid.Column width={3}>
                        <h2>Known Outages</h2>
                      </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                      <Grid.Column width={5}>
                        <ServiceNotes
                          {...routerProps}
                          showNotes={this.state.showNotes}
                          serviceId={this.state.serviceId}
                        />
                      </Grid.Column>
                      <Grid.Column width={6}>
                        <CurrentStatus
                          {...routerProps}
                          getServiceId={e => this.setServiceId(e)}
                      
                        />
                      </Grid.Column>
                      <Grid.Column width={3}>
                        <KnownOutages {...routerProps} />
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                )
                // End of <Route> Dashboard
              }
            />
          </Switch>
        </Container>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    services: state.services.services,
    notes: state.notes.notes,
    currentUser: state.currentUser.currentUser
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getCurrentUser: token => dispatch(getCurrentUser(token)),
    getServices: () => dispatch(getServices()),
    getNotes: () => dispatch(getNotes()),
    getOutages: () => dispatch(getOutages()),    
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Dashboard));
