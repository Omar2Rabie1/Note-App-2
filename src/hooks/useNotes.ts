  import { type Note, type NoteFormData } from '@/types/note';
import { useCallback, useState } from 'react';

  export const useNotes = () => {
    const [notes, setNotes] = useState<Note[]>(()=>{
  //  saved data by dafault when open
  if (typeof window!=="undefined") {
    const savedNotes= localStorage.getItem("savedNotes")
    if (savedNotes) {
      const parsedNotes= JSON.parse(savedNotes);
      if (Array.isArray(parsedNotes)) {
        return parsedNotes;
        
      }
      
    }
    
  }
  return [];
    });

    const [isLoading, setIsLoading] = useState(false);

    const updateNotes = useCallback((newNotes: Note[]) => {
      setNotes(newNotes);
      localStorage.setItem('savedNotes', JSON.stringify(newNotes));
    }, []);

    // Mimic loading function
    const mimicLoading = useCallback(async (duration: number = 500) => {
      setIsLoading(true);
      return new Promise((resolve) => {
        setTimeout(() => {
          setIsLoading(false);
          resolve(true);
        }, duration);
      });
    }, []);

    // Add note
    const addNote = useCallback(async (noteData: NoteFormData) => {
      await mimicLoading();
      const newNote: Note = {
        id: Math.random().toString(20).substring(2, 10),
        ...noteData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
        updateNotes([...notes,newNote])
    }, [mimicLoading,notes,updateNotes]);

    // Update note
    const updateNote = useCallback(async (id: string, noteData: NoteFormData) => {
      await mimicLoading();
      const updatedNotes= notes.map((note)=>note.id===id?{...note,...noteData,updatedAt:new Date().toISOString()}:note)
    
      updateNotes(updatedNotes)
    }, [mimicLoading,notes,updateNotes]);

    // Delete note
    const deleteNote = useCallback(async (id: string) => {
      await mimicLoading(300);
          const filterNotes= notes.filter((note)=>{
            note.id!==id
          })
          updateNotes(filterNotes)
    }, [mimicLoading,notes,updateNotes]);

    return {
      notes,
      isLoading,
      addNote,
      updateNote,
      deleteNote,
    };
  };
