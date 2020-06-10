const initialState = {
  notes: [],
};

export const notesReducer = (state = initialState, action) => {
 
  switch (action.type) {
    case "GET_NOTES":
      return { ...state, notes: action.payload  };
    case "CREATE_NOTE":
      return {
        ...state,
        notes: [...state.notes, action.payload],
      };
      case "UPDATE_NOTE": 
        let updatedNoteIndex = state.notes.findIndex(
          note => note.id === action.payload.id 
        )
        const notesCopy = state.notes.slice();
        notesCopy.splice(updatedNoteIndex, 1, action.payload);
        return { ...state, notes: notesCopy  };
      case "DELETE_NOTE":
        const filteredNotes = state.notes.filter(note => note.id !== action.payload.noteId);
        return { ...state, notes: filteredNotes };
    default:
      return state; 
  }
};
