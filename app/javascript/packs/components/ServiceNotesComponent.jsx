import React, { Component } from "react";
import { connect } from "react-redux";
import { Comment, Table, Form, Checkbox, Icon, Input } from "semantic-ui-react";
import { createNote } from "../actions/createNoteAction";
import { deleteNote } from "../actions/deleteNoteAction";
import EditNote from "./EditNoteComponent";
const uuidv4 = require("uuid/v4");
import Moment from "react-moment";

class ServiceNotesComponent extends Component {
  state = {
    entry: "",
    isPublic: true,
    showEditInput: false,
    editNotes: null,
    itemId: null,
  };

  handleChange = (e, { name, value }) => this.setState({ [name]: value });

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.createNote(
      this.state.entry,
      this.state.isPublic,
      this.props.serviceId,
      this.props.currentUser.id
    );
    this.setState({ entry: "" });
  };

  handleUpdate = (e, note) => {
    debugger 
    this.setState({
      showEditInput: true,
      editNotes: note,
      itemId: parseInt(e.target.id),
    });
  };

  handleDelete = (e, noteId) => {
    if (confirm("Are you sure you want to delete this note?")) {
      this.props.deleteNote(noteId, this.props.currentUser);
    } else {
      return;
    }
  };

  filterNotes = () => {
      const publicNotes = this.props.notes.filter(
        note => note.service_id === this.props.serviceId && note.is_public === true
      );
      if (this.props.currentUser !== null) {
        const privateNotes = this.props.notes.filter(
          note =>
            note.service_id === this.props.serviceId && note.is_public ===
              false && note.user_id === this.props.currentUser.id
        );
        const combinedNotes = publicNotes.concat(privateNotes);
        return this.sortedNotes(combinedNotes);
      } else {
        return publicNotes;
      }
  };

  sortedNotes(combinedNotes) {
    const sortedNotes = combinedNotes.sort((a, b) => {
      return a.id - b.id 
    });
    return sortedNotes;
  }

  showServiceName = serviceId => {
    if (serviceId !== null) {
    const foundService = this.props.services.find(service => service.id === serviceId)
    return foundService.name 
    }
  };


  handleIsPublic = e => {
    this.setState({ isPublic: this.state.isPublic ? false : true });
  };

  //   renderContent(serviceNote) {
  //       debugger
  //     if (!this.state.showEditInput) {
  //         return <div>{serviceNote.entry}</div>
  //     } else if (this.state.itemId === this.state.editNotes.id) {
  //         return <EditNote serviceNote={serviceNote} />
  //     }
  //   };

  render() {
    console.log(this.state, this.props)
    return (
      <>
        <Table style={{ display: this.props.showServiceLogs }} striped>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell style={{ background: "lightSteelBlue" }}>
                <h4>Service: {this.showServiceName(this.props.serviceId)}</h4>
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            <Comment>
              {this.filterNotes().map((note) => (
               
                  <Comment.Group>
                    <Comment.Content>
                      <Table.Row>
                        <Table.Cell>
                          <Comment.Author as="a">
                            <Moment format="LLL">{note.created_at}</Moment>
                          </Comment.Author>
                        </Table.Cell>
                        <Table.Cell>
                          <Comment.Metadata>
                            {note.user.username}
                          </Comment.Metadata>
                        </Table.Cell>
                        {this.props.currentUser &&
                        this.props.currentUser.id === note.user.id ? (
                          <Table.Cell>
                            <Icon
                              id={note.id}
                              name="edit outline"
                              onClick={(e) => this.handleUpdate(e, note)}
                            />
                            <Icon
                              name="trash alternate outline"
                              onClick={(e) => this.handleDelete(e, note.id)}
                            />
                          </Table.Cell>
                        ) : null}
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell>{note.entry}</Table.Cell>
                      </Table.Row>
                    </Comment.Content>
                  </Comment.Group>
          
              ))}
              {this.props.currentUser ? (
                <Form onSubmit={(e) => this.handleSubmit(e)}>
                  <Form.TextArea
                    style={{ height: "50px" }}
                    onChange={this.handleChange}
                    name="entry"
                    value={this.state.entry}
                  />
                  <Form.Field>
                    <Checkbox
                      label="private"
                      onChange={(e) => this.handleIsPublic(e)}
                    />
                  </Form.Field>
                  <Form.Button
                    type="submit"
                    content="Add Note"
                    labelPosition="left"
                    icon="edit"
                    primary
                    disabled={this.state.entry.length < 4}
                  />
                </Form>
              ) : null}
            </Comment>
          </Table.Body>
        </Table>
        <div>
          {this.state.showEditInput ? (
            <EditNote note={this.state.editNotes} />
          ) : null}
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    services: state.services.services,
    notes: state.notes.notes,
    currentUser: state.currentUser.currentUser,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createNote: (entry, isPublic, serviceId, userId) =>
      dispatch(createNote(entry, isPublic, serviceId, userId)),
    deleteNote: (noteId) => dispatch(deleteNote(noteId)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ServiceNotesComponent);
