import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Input, Form } from "semantic-ui-react";
import { updateNote } from "../actions/updateNoteAction";

class EditNote extends Component {

  state = {
    entry: this.props.note.entry,
    isPublic: this.props.note.isPublic 
  }

    handleChange = (e, { name, value }) => this.setState({ [name]: value })
    
    handleSubmit = e => {
       e.preventDefault();
      this.props.updateNote(
        this.state.entry,
        this.state.isPublic, 
        this.props.note.service_id,
        this.props.currentUser.id,
        this.props.note.id,
      )
      this.setState({ entry: "", isPublic: false })
    }

    render() {
        return (
            <div>
            <Form onSubmit={(e) => this.handleSubmit(e)}>
            <Form.Input value={this.state.entry} name="entry" onChange={this.handleChange}></Form.Input>
            <Button type="submit">Update</Button>
            </Form>
            </div>
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
    updateNote: (entry, isPublic, serviceId, userId, noteId) => dispatch(updateNote(entry, isPublic, serviceId, userId, noteId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditNote);
