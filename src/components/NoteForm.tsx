// components/NoteForm.tsx
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Loader2, X } from 'lucide-react';
import type { NoteFormProps } from '@/types/note';
import { noteSchema, type NoteFormInput } from '@/schemas/noteSchema';

const NoteForm: React.FC<NoteFormProps> = ({
  onSubmit,
  onCancel,
  initialData,
  isEditing = false,
  isLoading = false,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<NoteFormInput>({
    resolver: zodResolver(noteSchema),
    defaultValues: initialData || {
      title: '',
      content: '',
    },
  });

  // Handle form submission
  const handleFormSubmit = (data: NoteFormInput) => {
    onSubmit(data);
    if (!isEditing) {
      reset();
    }
  };

  // Handle cancel
  const handleCancel = () => {
    reset();
    onCancel?.();
  };

  return (
    <Dialog open={true} onOpenChange={handleCancel}>
      <DialogContent className="sm:max-w-2xl bg-white rounded-xl shadow-2xl">
        <DialogHeader>
          <div  className="border-b border-gray-200 pb-4">
          <div className="flex items-center justify-between">
            <DialogTitle >
              <div className="text-2xl font-bold text-gray-800">
              {isEditing ? 'Edit Note' : 'Create New Note'}
              </div>
            </DialogTitle>
            <Button
      
              onClick={handleCancel}
              className="h-8 w-8 p-0 hover:bg-gray-100 rounded-full"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="p-6 space-y-6">
          {/* Title Field */}
          <div className="space-y-3">
            <label htmlFor="title" className="text-sm font-semibold text-gray-700 block">
              Note Title *
            </label>
            <Input
              id="title"
              placeholder="Enter a descriptive title for your note..."
              {...register('title')}
              className="w-full border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-lg py-3"
            />
            {errors.title && (
              <p className="text-sm text-red-600 mt-1">{errors.title.message}</p>
            )}
          </div>

          {/* Content Field */}
          <div className="space-y-3">
            <label htmlFor="content" className="text-sm font-semibold text-gray-700 block">
              Content *
            </label>
            <Textarea
              id="content"
              placeholder="Write your thoughts, ideas, or important information here..."
              rows={8}
              {...register('content')}
              className="w-full border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-lg resize-vertical min-h-[200px]"
            />
            {errors.content && (
              <p className="text-sm text-red-600 mt-1">{errors.content.message}</p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
              disabled={isLoading}
              className="px-6 py-2 border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg font-medium"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium shadow-sm hover:shadow-md transition-all"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  {isEditing ? 'Updating...' : 'Creating...'}
                </>
              ) : (
                isEditing ? 'Update Note' : 'Create Note'
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NoteForm;