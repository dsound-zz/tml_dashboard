import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Card, Button, Icon } from 'semantic-ui-react';
import CreateOutage from './CreateOutageComponent';
import EditOutage from './EditOutageComponent';
import { deleteOutage } from '../actions/deleteOutageAction'
const uuidv4 = require("uuid/v4");
import Moment from 'react-moment';
class KnownOutagesComponent extends Component {
  
  handleDelete = (e, outageId) => {
    if (confirm("Are you sure you want to delete this outage?")) {
      this.props.deleteOutage(outageId)
    }
    return 
  } 

  pickColor = (outage) => {
    outage.is_recurring ? "olive" : "teal";
  }
  
  render() {
  
    return (
      <>
        <Container>
          <CreateOutage services={this.props.services} />
          {this.props.outages && this.props.outages.map((outage) => (
            <Card key={uuidv4()} id="outage-card" raised={true} color="teal">
              <Card.Description>
                service: {outage.service.name}
              </Card.Description>
              <Card.Description>
                start_time:{" "}
                <Moment format="LLL">{outage.start_time}</Moment>
              </Card.Description>
              <Card.Description>
                end_time:{" "}
                {outage.end_time === null ? (
                  outage.end_time
                ) : (
                  <Moment format="LLL">{outage.end_time}</Moment>
                )}
              </Card.Description>
              {outage.is_recurring ? (
                <Card.Description>
                  Recurring: {outage.frequency}
                </Card.Description>
              ) : null}
              <div>
                <EditOutage outage={outage} services={this.props.services} />
                <Icon
                  name="trash alternate outline"
                  size="small"
                  onClick={(e) => this.handleDelete(e, outage.id)}
                ></Icon>
              </div>
            </Card>
          ))}
        </Container>
      </>
    );
  }
};

const mapStateToProps = state => {
    return {
        outages: state.outages.outages,
        services: state.services.services
    }
};

const mapDispatchToProps = dispatch => {
  return {
    deleteOutage: (outageId) => dispatch(deleteOutage(outageId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(KnownOutagesComponent);
