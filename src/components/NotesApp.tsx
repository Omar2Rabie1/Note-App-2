// components/NotesApp.tsx
import React, { useState } from 'react';
import { useNotes } from '../hooks/useNotes';

import { Loader2, Plus } from 'lucide-react';
import type { NoteFormData } from '../types/note';
import NoteCard from './NoteCard';
import NoteForm from './NoteForm';
import { Button } from './ui/button';



const NotesApp: React.FC = () => {

  const { notes, isLoading, addNote, updateNote, deleteNote } = useNotes();
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleAddNote = async (data: NoteFormData) => {
    
    await addNote(data);
    setIsFormOpen(false);
  };

  const handleUpdateNote = async (id: string, data: NoteFormData) => {
    await updateNote(id, data);
  };

  const handleDeleteNote = async (id: string) => {
    await deleteNote(id);
  };

  return (
    <div className="w-full  py-8 ">
      <div className="w-full mx-auto px-4 max-w-6xl">
    
        <div className="flex justify-between gap-4 items-center mb-8">
          <div>
            <h1 className="text-3xl font-semibold text-gray-700">Notes</h1>
            <p className="text-gray-600 mt-2">Manage your notes</p>
          </div>
          
          <Button
            onClick={() => setIsFormOpen(true)}
            disabled={isLoading}
            className="flex items-center space-x-2"
          >
            <Plus className="h-4 w-4" />
            <span>Add Note</span>
          </Button>
        </div>

        
        {isLoading && notes.length === 0 ? (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map(note => (
              <NoteCard
                key={note.id}
                note={note}
                onUpdate={handleUpdateNote}
                onDelete={handleDeleteNote}
                isLoading={isLoading}
              />
            ))}
          </div>
        )}

     
        {notes.length === 0 && !isLoading && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
            
              <h3 className="text-lg font-semibold mb-2">No notes yet</h3>
              <p>Create your first note to get started</p>
            </div>
          </div>
        )}

    
        {isFormOpen && (
          <NoteForm
            onSubmit={handleAddNote}
            onCancel={() => setIsFormOpen(false)}
            isLoading={isLoading}
          />
        )}
      </div>
    </div>
  );
};

export default NotesApp;