import React, { Component } from "react";
import { Button, Modal, Form, Icon, Dropdown, Checkbox } from "semantic-ui-react";
import { connect } from "react-redux";
import { updateOutage } from "../actions/updateOutageAction";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const initialState = {
  startTime: "",
  endTime: "",
  frequency: "",
  service: "",
  isRecurring: false,
  reason: "",
};

class EditOutage extends Component {
  state = {
    startTime: new Date(this.props.outage.start_time),
    endTime: new Date(this.props.outage.end_time),
    service: this.props.outage.service,
    isRecurring: this.props.outage.isRecurring,
    frequency: this.props.outage.frequency,
    reason: this.props.outage.reason,
    outageId: this.props.outage.id,
    showModal: false,
  };

  handleShowModal = () => this.setState({ showModal: true });

  handleClose = () => this.setState({ ...initialState, showModal: false });

  handleChange = (e, { name, value }) => this.setState({ [name]: value });

  // onChange for setting start date/time
  handleStartTime = (date) => this.setState({ startTime: date });
  // onChange for setting end date/time
  handleEndTime = (date) => this.setState({ endTime: date });

  handleCheck = (e) => {
    this.setState({ isRecurring: this.state.isRecurring ? false : true });
  };

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

  getServices = () => {
    const services = [];
    this.props.services &&
      this.props.services.map((service) => {
        services.push({ key: service.id, text: service.name, value: service });
      });
    return services;
  };

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

    this.props.updateOutage(
      startTime,
      endTime,
      frequency,
      isRecurring,
      reason,
      service.id,
      outageId
    );
    this.handleClose();
  };

  render() {
  
    return (
      <>
        <Icon name="edit" size="small" onClick={this.handleShowModal} />
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
                selected={this.state.endTime}
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

              <Form.Field>
                <Dropdown
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
                  value={this.state.isRecurring}
                  onChange={(e) => this.handleCheck(e)}
                />
              </Form.Field>
              {this.state.isRecurring ? (
                <Dropdown
                  placeholder="Select Outage Frequency"
                  value={this.state.frequency}
                  name="frequency"
                  fluid
                  selection
                  onChange={this.handleChange}
                  options={this.getFrequency()}
                />
              ) : null}
              <Form.TextArea
                label="Reason"
                name="reason"
                value={this.state.reason}
                placeholder="Reason..."
                onChange={this.handleChange}
              />
              <Form.Button fluid color="blue" type="submit">
                Update
              </Form.Button>
            </Form>
          </Modal.Content>
        </Modal>
      </>
    );
  }
}

const mapDispatchToProps = dispatch => {
    return {
      updateOutage: (
        startTime,
        endTime,
        frequency,
        isRecurring,
        reason,
        serviceId,
        outageId
      ) =>
        dispatch(
          updateOutage(
            startTime,
            endTime,
            frequency,
            isRecurring,
            reason,
            serviceId,
            outageId
          )
        ),
    };
}

export default (connect)(null, mapDispatchToProps)(EditOutage);
