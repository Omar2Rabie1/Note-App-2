
export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt:string;
  updatedAt:string;
}

export type NoteFormData = Omit<Note, 'id' | 'createdAt' | 'updatedAt'>;
export interface NoteFormProps {
  onSubmit: (data: NoteFormData) => void;
  onCancel: ()=>void;
  initialData?: NoteFormData;
  isEditing?: boolean;
  isLoading?: boolean;
}