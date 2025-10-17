

import type { Note, NoteFormData } from "@/types/note";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";



interface NotesState {
  items: Note[];
  loading: boolean;
}

const initialState: NotesState = {
  items: [], 
  loading: false, 
};


const noteSlice = createSlice({
  name: 'notes', 
  initialState, 
  reducers: {

    
    
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    
 
    addNote: (state, action: PayloadAction<Note>) => {
      state.items.push(action.payload);
    },
    
    // update note already exist
    updateNote: (state, action: PayloadAction<{ id: string; data: NoteFormData }>) => {
      const { id, data } = action.payload;
      const existingNote = state.items.find(note => note.id === id);
      if (existingNote) {
        // update notes info
        Object.assign(existingNote, data);
        existingNote.updatedAt = new Date();
      }
    },
    
    // remove note with id
    deleteNote: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      state.items = state.items.filter(note => note.id !== id); // remove note from array
    },
  },
});

// بنصدر ال actions - دي ال functions اللي هنستدعيها علشان نحدث ال state
export const { setLoading, addNote, updateNote, deleteNote } = noteSlice.actions;


export default noteSlice.reducer;