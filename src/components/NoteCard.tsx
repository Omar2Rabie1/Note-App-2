// components/NoteCard.tsx
import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from './ui/card';
import { Button } from './ui/button';
import { Edit2, Trash2, Calendar, Clock } from 'lucide-react';
import NoteForm from './NoteForm';
import type { Note, NoteFormData } from '@/types/note';

interface NoteCardProps {
  note: Note;
  onUpdate: (id: string, data: NoteFormData) => void;
  onDelete: (id: string) => void;
  isLoading?: boolean;
}

const NoteCard: React.FC<NoteCardProps> = ({
  note,
  onUpdate,
  onDelete,
  isLoading
}) => {
  const [isEditing, setIsEditing] = useState(false);

  // Open edit mode
  const handleEdit = () => {
    setIsEditing(true);
  };

  // Update note
  const handleUpdate = async (data: NoteFormData) => {
    await onUpdate(note.id, data);
    setIsEditing(false);
  };

  // Delete note
  const handleDelete = () => {
    onDelete(note.id);
  };

  // Format date
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  // Format time
  const formatTime = (date: Date) => {
    return new Date(date).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // If in edit mode, return the form
  if (isEditing) {
    return (
      <NoteForm
        onSubmit={handleUpdate}
        onCancel={() => setIsEditing(false)}
        initialData={{
          title: note.title,
          content: note.content,
        }}
        isEditing={true}
        isLoading={isLoading}
      />
    );
  }

  // Return the card in view mode
  return (
    <Card className="w-full h-full bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200 hover:border-blue-200">
      <CardHeader className="pb-4">
        <div className="flex justify-between items-start gap-4">
          <div className="flex-1 min-w-0">
            <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2 leading-tight">
              {note.title}
            </h3>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-1 flex-shrink-0">
            <Button
            
              onClick={handleEdit}
              disabled={isLoading}
              className="h-9 w-9 p-0 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg"
              title="Edit note"
            >
              <Edit2 className="h-4 w-4" />
            </Button>
            <Button
           
              onClick={handleDelete}
              disabled={isLoading}
              className="h-9 w-9 p-0 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg"
              title="Delete note"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        {/* Note Content */}
        <div className="mb-6">
          <p className="text-gray-600 whitespace-pre-wrap leading-relaxed text-sm line-clamp-4">
            {note.content}
          </p>
        </div>

        {/* Date Information */}
        <div className="flex items-center justify-between text-xs text-gray-500 border-t pt-4">
          <div className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            <span>{formatDate(note.createdAt)}</span>
          </div>

          {note.updatedAt > note.createdAt && (
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              <span>{formatTime(note.updatedAt)}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default NoteCard;