// components/NotesApp.tsx
import React, { useState } from 'react';
import { Loader2, Plus } from 'lucide-react';
import { Button } from './ui/button';
import NoteCard from './NoteCard';
import NoteForm from './NoteForm';
import { useNotes } from '@/hooks/NoteSlice';
import type { NoteFormData } from '@/types/note';

const NotesApp: React.FC = () => {
  // Changed 'loading' to 'isLoading'
  const { notes, isLoading, addNote, updateNote, deleteNote } = useNotes();
  const [isFormOpen, setIsFormOpen] = useState(false);

  // Handle adding new note
  const handleAddNote = async (data: NoteFormData) => {
    await addNote(data);
    setIsFormOpen(false);
  };

  // Handle updating note
  const handleUpdateNote = async (id: string, data: NoteFormData) => {
    await updateNote(id, data);
  };

  // Handle deleting note
  const handleDeleteNote = async (id: string) => {
    await deleteNote(id);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">My Notes</h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Organize your thoughts and ideas in one place. Create, edit, and
            manage your notes effortlessly.
          </p>
        </div>

        {/* Toolbar Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            {/* Notes Counter */}
            <div className="text-center sm:text-left">
              <div className="text-2xl font-bold text-blue-600">
                {notes.length}
              </div>
              <div className="text-gray-600 text-sm">Total Notes</div>
            </div>

            {/* Add Note Button */}
            <Button
              onClick={() => setIsFormOpen(true)}
              disabled={isLoading}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors shadow-md hover:shadow-lg"
            >
              <Plus className="h-5 w-5 mr-2" />
              Add New Note
            </Button>
          </div>
        </div>

        {/* Notes Grid Section */}
        {isLoading && notes.length === 0 ? (
          // Loading State
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-xl shadow-sm border border-gray-200">
            <Loader2 className="h-12 w-12 animate-spin text-blue-500 mb-4" />
            <p className="text-gray-600 text-lg">Loading your notes...</p>
          </div>
        ) : notes.length > 0 ? (
          // Notes Grid
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map((note) => (
              <NoteCard
                key={note.id}
                note={note}
                onUpdate={handleUpdateNote}
                onDelete={handleDeleteNote}
                isLoading={isLoading}
              />
            ))}
          </div>
        ) : (
          // Empty State
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
            <div className="max-w-md mx-auto">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Plus className="h-10 w-10 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">
                No notes yet
              </h3>
              <p className="text-gray-600 mb-8 text-lg">
                Start organizing your thoughts by creating your first note!
              </p>
              <Button
                onClick={() => setIsFormOpen(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg font-semibold rounded-lg transition-colors"
              >
                Create Your First Note
              </Button>
            </div>
          </div>
        )}

        {/* Note Form Modal */}
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
