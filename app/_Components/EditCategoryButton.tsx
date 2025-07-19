'use client';
import {useState} from 'react';
import {Button} from './shadCn/button';
import {Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger} from './shadCn/dialog';
import {Input} from './shadCn/input';
import {Loader2} from 'lucide-react';
import EditCategory from '../_Services/EditCategory';

const EditCategoryButton = ({id, CategoryName}: {id: string; CategoryName: string}) => {
  const [name, setName] = useState(CategoryName);
  const [open, setOpen] = useState(false);
  const {mutate: editCategory, isPending} = EditCategory();
  return (
    <Dialog open={open} onOpenChange={val => setOpen(val)}>
      <DialogTrigger>
        <Button asChild>Edit</Button>;
      </DialogTrigger>

      <DialogContent>
        <DialogTitle>Edit Category {name}</DialogTitle>
        <DialogDescription></DialogDescription>
        <label>
          Category Name
          <Input value={name} onChange={e => setName(e.target.value)} />
        </label>
        <Button
          disabled={isPending}
          onClick={() => {
            editCategory({id, name});
            setName('');
            setOpen(false);
          }}
        >
          {isPending ? <Loader2 className='animate-spin' /> : 'Edit ' + CategoryName + ' TO ' + name}
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default EditCategoryButton;
