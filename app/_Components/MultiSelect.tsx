'use client';

import * as React from 'react';
import {X} from 'lucide-react';

import {CommandGroup, CommandItem, CommandList, Command as CommandPrimitive} from 'cmdk';
import {Badge} from './shadCn/badge';
import {Command} from './shadCn/command';

export type SelectedItems = Record<'value' | 'id', string>;

export function MultiSelect({SelectedOptions, SelectLabel, Selected, setValues, disabled = false}: {SelectedOptions: SelectedItems[]; Selected?: SelectedItems[]; SelectLabel: string; setValues: React.Dispatch<React.SetStateAction<SelectedItems[]>>; disabled: boolean}) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState<SelectedItems[]>([]);
  const [inputValue, setInputValue] = React.useState('');
  React.useEffect(() => {
    if (Selected && Selected?.length > 0) {
      setSelected(Selected);
    }
  }, [Selected]);
  const handleUnselect = React.useCallback((SelectedItems: SelectedItems) => {
    setSelected(prev => prev.filter(s => s.value !== SelectedItems.value));
  }, []);

  const handleKeyDown = React.useCallback((e: React.KeyboardEvent<HTMLDivElement>) => {
    const input = inputRef.current;
    if (input) {
      if (e.key === 'Delete' || e.key === 'Backspace') {
        if (input.value === '') {
          setSelected(prev => {
            const newSelected = [...prev];
            newSelected.pop();
            return newSelected;
          });
        }
      }
      // This is not a default behaviour of the <input /> field
      if (e.key === 'Escape') {
        input.blur();
      }
    }
  }, []);
  React.useEffect(() => {
    console.log('add');
    setValues(selected);
  }, [selected, setValues]);
  const SelectId = selected.map(({id}) => id);
  const selectables = React.useMemo(() => SelectedOptions.filter(({id}) => !SelectId.includes(id)), [SelectId, SelectedOptions]);

  console.log(selectables);

  return (
    <Command onKeyDown={handleKeyDown} className='overflow-visible bg-transparent'>
      <div className='group rounded-md border border-input px-3 py-2 text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2'>
        <div className='flex flex-wrap gap-1'>
          {selected.map(SelectedItems => {
            return (
              <Badge key={SelectedItems.value} variant='secondary'>
                {SelectedItems.value}
                <button
                  disabled={disabled}
                  className='ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2'
                  onKeyDown={e => {
                    if (e.key === 'Enter') {
                      handleUnselect(SelectedItems);
                    }
                  }}
                  onMouseDown={e => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  onClick={() => handleUnselect(SelectedItems)}
                >
                  <X className='h-3 w-3 text-muted-foreground hover:text-foreground' />
                </button>
              </Badge>
            );
          })}
          <CommandPrimitive.Input disabled={disabled} ref={inputRef} value={inputValue} onValueChange={setInputValue} onBlur={() => setOpen(false)} onFocus={() => setOpen(true)} placeholder={'Select ' + SelectLabel + '...'} className='ml-2 flex-1 bg-transparent outline-none placeholder:text-muted-foreground' />
        </div>
      </div>
      <div className='relative mt-2'>
        <CommandList>
          {open && selectables.length > 0 ? (
            <div className='absolute top-0 z-10 w-full rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in'>
              <CommandGroup className='h-full overflow-auto'>
                {selectables.map(SelectedItems => {
                  return (
                    <CommandItem
                      key={SelectedItems.id}
                      onMouseDown={e => {
                        e.preventDefault();
                        e.stopPropagation();
                      }}
                      onSelect={() => {
                        setInputValue('');
                        setSelected(prev => [...prev, SelectedItems]);
                      }}
                      className={'cursor-pointer'}
                    >
                      {SelectedItems.value}
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            </div>
          ) : null}
        </CommandList>
      </div>
    </Command>
  );
}
