import React, { Component } from "react";
import { connect } from "react-redux";
import {  Modal, Button, Checkbox, Form, Dropdown } from "semantic-ui-react";
import { createOutage } from "../actions/createOutageAction";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


// reset forms to inital state if modal is closed before submit 
const initialState = {
  startTime: "",
  endTime: "",
  frequency: "",
  service: "",
  isRecurring: false,
  reason: ""
};

class CreateOutage extends Component {
  state = {
    showModal: false,
    startTime: "",
    endTime: "",
    isRecurring: "",
    frequency: "",
    reason: "",
    service: ""
  
  };


  handleShowModal = () => this.setState({ showModal: true });

  handleClose = () => { 
    this.setState({ ...initialState, showModal: false });
  }

  handleChange = (e, { name, value }) => this.setState({ [name]: value });

  // onChange for setting start date/time
  handleStartTime = (date) => this.setState({ startTime: date });
  // onChange for setting end date/time
  handleEndTime = (date) => this.setState({ endTime: date });

  handleCheck = e => {
    this.setState({ isRecurring: this.state.isRecurring ? false : true })
  }
  // iterate over frequencies to be used in Semantic-ui-React dropdown
  getFrequency = () => {
    const frequencies = [
      { id: 1, text: "Hourly", value: "Hourly" },
      { id: 2, text: "Daily", value: "Daily" },
      { id: 3, text: "Weekly", value: "Weekly" },
      { id: 4, text: "Monthly", value: "Monthly" },
      { id: 5, text: "Yearly", value: "Yearly" },
      { id: 6, text: "None", value: "None" },
    ];
    return frequencies;
  };

  // iterate over services to be used in Semantic-ui-React dropdown
  getServices = () => {
    const services = [];
    this.props.services &&
      this.props.services.map((service) => {
        services.push({ key: service.id, text: service.name, value: service });
      });
    return services;
  };

  handleTimeError = () => {
    return <div style={{ color: "red"}}>End time cannot be earlier than start time!</div>
  }


  handleSubmit = (e) => {
    e.preventDefault();
    const {
      startTime,
      endTime,
      frequency,
      isRecurring,
      reason,
      service,
      outageId,
    } = this.state;

    this.props.createOutage(
      startTime,
      endTime,
      frequency,
      isRecurring,
      reason,
      service.id,
      outageId
    );

    // close modal
    this.handleClose();
  };

  render() {
    return (
      <>
        {this.props.currentUser !== null  ? (
          <Button onClick={this.handleShowModal}>Create Outage</Button>
        ) : null}
        <Modal
          open={this.state.showModal}
          onClose={this.handleClose}
          centered={true}
          size="small"
        >
          <Modal.Header>Create Outage</Modal.Header>
          <Modal.Content>
            <Form onSubmit={(e) => this.handleSubmit(e)}>
              <DatePicker
                selected={this.state.startTime}
                onChange={this.handleStartTime}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={15}
                timeCaption="time"
                dateFormat="MMMM d, yyyy h:mm aa"
                placeholderText={
                  this.state.startTime === ""
                    ? "Choose start time"
                    : this.state.startTime
                }
              />

              <DatePicker
                selected={
                  this.state.endTime === ""
                    ? this.state.startTime
                    : this.state.endTime
                }
                onChange={this.handleEndTime}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={15}
                timeCaption="time"
                dateFormat="MMMM d, yyyy h:mm aa"
                placeholderText={
                  this.state.endTime === ""
                    ? "Choose end time"
                    : this.state.endTime
                }
              />
              {this.state.startTime > this.state.endTime
                ? this.handleTimeError()
                : null}
              <Form.Field>
                <Dropdown
                  placeholder="Select Service"
                  value={this.state.service}
                  name="service"
                  fluid
                  selection
                  onChange={this.handleChange}
                  options={this.getServices()}
                />
              </Form.Field>
              <Form.Field>
                <Checkbox
                  label="Outage Recurring?"
                  onChange={(e) => this.handleCheck(e)}
                />
              </Form.Field>
              {this.state.isRecurring ? (
                <Dropdown
                  placeholder="Select Outage Frequency"
                  value={this.state.isRecurring ? this.state.frequency : "None"}
                  name="frequency"
                  fluid
                  selection
                  onChange={this.handleChange}
                  options={this.getFrequency()}
                />
              ) : null}
              <Form.TextArea
                label="Reason (10 characters or more...)"
                name="reason"
                placeholder="Reason..."
                onChange={this.handleChange}
              />
              <Form.Button
                fluid
                color="blue"
                type="submit"
                disabled={
                  !this.state.startTime ||
                  !this.state.endTime ||
                  !this.state.reason ||
                  this.state.reason.length < 10
                } // Don't allow submit unless these fields are filled
              >
                Create
              </Form.Button>
            </Form>
          </Modal.Content>
        </Modal>
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
    createOutage: (
      startTime,
      endTime,
      frequency,
      isRecurring,
      reason,
      serviceId
    ) =>
      dispatch(
        createOutage(
          startTime,
          endTime,
          frequency="None",
          isRecurring,
          reason,
          serviceId
        )
      ),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateOutage);