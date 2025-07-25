'use client';
import {useState} from 'react';
import AddNewCategory from '../_Services/AddNewCategory';
import {Loader2} from 'lucide-react';
import {Button} from './shadCn/button';
import {Input} from './shadCn/input';
import {Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger} from './shadCn/dialog';

const AddCategoryButton = () => {
  const [name, setName] = useState('');
  const [open, setOpen] = useState(false);
  const {mutate: addCategory, isPending} = AddNewCategory();
  function handleOnClick() {
    if (!name) return;
    addCategory(name);
    setName('');
    setOpen(false);
  }
  return (
    <Dialog open={open} onOpenChange={val => setOpen(val)}>
      <DialogTrigger className='w-full' asChild>
        <Button>Add New Category</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogTitle>New Category {name}</DialogTitle>
        <DialogDescription></DialogDescription>
        <label>
          Category Name
          <Input value={name} onChange={e => setName(e.target.value)} />
        </label>
        <Button disabled={isPending} onClick={handleOnClick}>
          {isPending ? <Loader2 className='animate-spin' /> : 'Add ' + name}
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default AddCategoryButton;
