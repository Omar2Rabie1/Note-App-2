// hooks/useNotes.ts
import { useState, useCallback, useEffect } from 'react';
import { type Note, type NoteFormData } from '@/types/note';

export const useNotes = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load notes from localStorage when component mounts
  useEffect(() => {
    const loadNotes = () => {
      try {
        const saved = localStorage.getItem('savedNotes');
        if (saved) {
          const parsedNotes = JSON.parse(saved);
          if (Array.isArray(parsedNotes)) {
            // Convert date strings back to Date objects
            const notesWithDates = parsedNotes.map(note => ({
              ...note,
              createdAt: new Date(note.createdAt),
              updatedAt: new Date(note.updatedAt)
            }));
            setNotes(notesWithDates);
          }
        }
      } catch (err) {
        console.error('Error loading notes from localStorage:', err);
      } finally {
        setIsInitialized(true);
      }
    };

    loadNotes();
  }, []);

  // Save notes to localStorage whenever notes change
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem('savedNotes', JSON.stringify(notes));
    }
  }, [notes, isInitialized]);

  // Simulate loading with timer
  const mimicLoading = useCallback(async (duration: number = 500) => {
    setIsLoading(true);
    return new Promise((resolve) => {
      setTimeout(() => {
        setIsLoading(false);
        resolve(true);
      }, duration);
    });
  }, []);

  // Add new note
  const addNote = useCallback(async (noteData: NoteFormData) => {
    await mimicLoading();
    const newNote: Note = {
      id: Math.random().toString(36).substring(2, 10),
      ...noteData,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setNotes(prevNotes => [...prevNotes, newNote]);
  }, [mimicLoading]);

  // Update existing note
  const updateNote = useCallback(async (id: string, noteData: NoteFormData) => {
    await mimicLoading();
    setNotes(prevNotes => prevNotes.map((note) =>
      note.id === id
        ? { 
            ...note, 
            ...noteData, 
            updatedAt: new Date()
          }
        : note
    ));
  }, [mimicLoading]);

  // Delete note
  const deleteNote = useCallback(async (id: string) => {
    await mimicLoading(300);
    setNotes(prevNotes => prevNotes.filter((note) => note.id !== id));
  }, [mimicLoading]);

  return {
    notes,
    isLoading, // Only return isLoading
    addNote,
    updateNote,
    deleteNote,
    // Remove this line: loading
  };
};