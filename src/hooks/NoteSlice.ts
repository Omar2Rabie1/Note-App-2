
import { useState, useCallback } from 'react';
import { type Note, type NoteFormData } from '@/types/note';

export const useNotes = () => {
  const [notes, setNotes] = useState<Note[]>(() => {

    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('savedNotes');
      if (saved) {
        try {
          const parsedNotes = JSON.parse(saved);
  
          if (Array.isArray(parsedNotes)) {
       
            return parsedNotes.map(note => ({
              ...note,
              createdAt: new Date(note.createdAt),
              updatedAt: new Date(note.updatedAt)
            }));
          }
        } catch (err) {
          console.error('Error parsing saved notes:', err);
        }
      }
    }
    return []; 
  });
  
  const [isLoading, setIsLoading] = useState(false);

  // حفظ البيانات في localStorage عند كل تغيير
  const updateNotes = useCallback((newNotes: Note[]) => {
    setNotes(newNotes);
    localStorage.setItem('savedNotes', JSON.stringify(newNotes));
  }, []);


  const mimicLoading = useCallback(async (duration: number = 500) => {
    setIsLoading(true);
    return new Promise((resolve) => {
      setTimeout(() => {
        setIsLoading(false);
        resolve(true);
      }, duration);
    });
  }, []);


  const addNote = useCallback(async (noteData: NoteFormData) => {
    await mimicLoading();
    const newNote: Note = {
      id: Math.random().toString(36).substring(2, 10), 
      ...noteData,
      createdAt: new Date(), 
      updatedAt: new Date(),
    };
    updateNotes([...notes, newNote]);
  }, [mimicLoading, notes, updateNotes]);


  const updateNote = useCallback(async (id: string, noteData: NoteFormData) => {
    await mimicLoading();
    const updatedNotes = notes.map((note) =>
      note.id === id
        ? { 
            ...note, 
            ...noteData, 
            updatedAt: new Date()
          }
        : note
    );
    updateNotes(updatedNotes);
  }, [mimicLoading, notes, updateNotes]);


  const deleteNote = useCallback(async (id: string) => {
    await mimicLoading(300);
    const filteredNotes = notes.filter((note) => note.id !== id);
    updateNotes(filteredNotes);
  }, [mimicLoading, notes, updateNotes]);

  return {
    notes,
    isLoading,
    addNote,
    updateNote,
    deleteNote,
  };
};