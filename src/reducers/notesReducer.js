import { ADD_NOTE } from '../actions/actions';

function notesReducer(notes=[], action) {
  switch (action.type) {
    case ADD_NOTE:
      return [
        ...notes,
        {
          title: action.title,
          content: action.content,
        }
      ]
    default:
      return notes;
  }
}


export default notesReducer;