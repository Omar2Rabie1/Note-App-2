import React, { useState } from 'react';
import { Button } from './ui/button';
import { Edit2, Trash2 } from 'lucide-react';
import type { Note, NoteFormData } from '../types/note';
import NoteForm from './NoteForm';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

interface NoteCardInfo {
  note: Note;
  onUpdate: (id: string, data: NoteFormData) => void;
  onDelete: (id: string) => void;
  isLoading?: boolean;
}

const NoteCard: React.FC<NoteCardInfo> = ({ note, onUpdate, onDelete, isLoading }) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => setIsEditing(true);
  const handleUpdate = async (data: NoteFormData) => {
    await onUpdate(note.id, data);
    setIsEditing(false);
  };
  const handleDelete = () => onDelete(note.id);

  if (isEditing) {
    return (
      <NoteForm
        onSubmit={handleUpdate}
        onCancel={() => setIsEditing(false)}
        initialData={{ title: note.title, content: note.content }}
        isEditing={true}
        isLoading={isLoading}
      />
    );
  }

  return (
    <Card className="min-w-[280px] max-w-full rounded-2xl bg-white shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col h-full">
      <CardHeader className="pb-3 border-b border-gray-200 flex-shrink-0">
        <div className="flex justify-between items-start gap-3">
          <CardTitle className="text-lg font-semibold text-gray-800 line-clamp-2 flex-1 min-w-0 break-words">
            {note.title}
          </CardTitle>
          <div className="flex space-x-1 flex-shrink-0">
            <Button
              onClick={handleEdit}
              disabled={isLoading}
              variant="outline"
              className="h-8 w-8 p-0 bg-blue-500 hover:bg-blue-600 border-blue-500 text-white transition-colors flex items-center justify-center"
            >
              Edit
            </Button>
            <Button
              onClick={handleDelete}
              disabled={isLoading}
              variant="outline"
              className="h-8 w-8 p-0 bg-red-500 hover:bg-red-600 border-red-500 text-white flex items-center justify-center"
            >
              trash
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col pt-4 pb-4 px-4 min-h-0">
        <div className="flex-1 overflow-hidden">
          <p className="text-gray-600 whitespace-pre-wrap text-sm leading-relaxed break-words overflow-y-auto max-h-32">
            {note.content}
          </p>
        </div>
        <div className="flex-shrink-0 mt-3 pt-3 border-t border-gray-100">
          <p className="text-xs text-gray-400">
            Updated: {new Date(note.updatedAt).toLocaleString()}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default NoteCard;