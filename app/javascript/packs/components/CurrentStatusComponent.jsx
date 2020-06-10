import React, { Component } from "react";
import { connect } from "react-redux";
import { Table, Header } from "semantic-ui-react";
const uuidv4 = require("uuid/v4");
import Moment from "react-moment";


class CurrentStatus extends Component {
  state = {
  services: []
  }


  handleClick = serviceId => {
    this.props.getServiceId(serviceId);
  };

  getReason = service => {
    if (service.outages && service.outages.length !== 0) {
      const foundOutage = this.props.outages.find(
        (outage) =>
          outage.service_id === service.id &&
          new Date(outage.start_time) < new Date()
      );
        if (foundOutage !== undefined) {
          return foundOutage.reason
        } else {
          null;
        };
    } else {
      null; 
    };
  };

  getEndTime = (service) => {
      if (service.outages && service.outages.length !== 0) {
        const foundOutage= this.props.outages.find(
          (outage) =>
            outage.service_id === service.id &&
            new Date(outage.start_time) < new Date()
        )
        if (foundOutage !== undefined) {
        return foundOutage.end_time
        } else {
          null;
        };
      } else {
        null;
      };
  }

  render() {
    console.log(this.props, this.state)
    return (
      <>
        <Table celled padded>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell singleLine>Service</Table.HeaderCell>
              <Table.HeaderCell>Status</Table.HeaderCell>
              <Table.HeaderCell>Reason</Table.HeaderCell>
              <Table.HeaderCell>ETA</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {this.props.services.map(service => (
              <Table.Row key={uuidv4()}>
                <Table.Cell onClick={() => this.handleClick(service.id)}>
                  <Header as="h3" textAlign="center">
                    {service.name}
                  </Header>
                </Table.Cell>
                <Table.Cell textAlign="center">
                  {service.is_down ? (
                    <h4 style={{ color: "red" }}>Down</h4>
                  ) : (
                    <h4 style={{ color: "green" }}>Up</h4>
                  )}
                </Table.Cell>
                <Table.Cell>{service.is_down ? this.getReason(service) : null}</Table.Cell>

                <Table.Cell>
                  {service.is_down && service.outages.length !== 0 ?
                  <Moment
                    date={this.getEndTime(service)}
                    durationFromNow
                    interval={1000}
                  /> : null }
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    services: state.services.services,
    outages: state.outages.outages,
    currentUser: state.currentUser.currentUser,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getServiceNotes: (serviceId, currentUser) =>
      dispatch(getServiceNotes(serviceId, currentUser)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CurrentStatus);
