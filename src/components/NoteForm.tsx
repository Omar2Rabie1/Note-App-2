// components/NoteForm.tsx
import React from 'react';




import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Loader2 } from 'lucide-react';
import type { NoteFormProps } from '@/types/note';
import { noteSchema, type NoteFormInput } from '@/schemas/noteSchema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';


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

  const handleFormSubmit = (data: NoteFormInput) => {
    onSubmit(data);
    if (!isEditing) {
      reset();
    }
  };

  const handleCancel = () => {
    reset();
    onCancel?.();
  };

  return (
    <Dialog open={true} onOpenChange={handleCancel}>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? 'Edit Note' : 'Create New Note'}
          </DialogTitle>
          <DialogDescription>
            {isEditing ? 'Update your note below.' : 'Add a new note to your collection.'}
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
          <div className="space-y-2  p-4 rounded-md ">
            <label htmlFor="title" className="text-sm  font-medium">
              Title
            </label>
            <Input
              id="title"
              placeholder="Enter note title"
              {...register('title')}
            />
            {errors.title && (
              <p className="text-sm text-red-500">{errors.title.message}</p>
            )}
          </div>

          <div className=" space-y-2  p-4 rounded-md ">
            <label htmlFor="content" className="text-sm font-medium">
              Content
            </label>
            <Textarea
              id="content"
              placeholder="Enter note content"
              rows={4}
              {...register('content')}
            />
            {errors.content && (
              <p className="text-sm text-red-500">{errors.content.message}</p>
            )}
          </div>

          <div className="flex justify-end space-x-4 text-white   py-4">
            <Button 
              
              type="button"
              variant="outline"
              onClick={handleCancel}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading} className='me-3'>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isEditing ? 'Update Note' : 'Create Note'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NoteForm;