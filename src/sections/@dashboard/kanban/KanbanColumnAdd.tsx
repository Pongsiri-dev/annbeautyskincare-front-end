import { useState, useRef, useEffect } from 'react';
import { useSnackbar } from 'notistack';
// @mui
import { OutlinedInput, Paper, Button, ClickAwayListener } from '@mui/material';
// redux
import { useDispatch } from '../../../redux/store';
import { createColumn } from '../../../redux/slices/kanban';
// components
import Iconify from '../../../components/Iconify';

// ----------------------------------------------------------------------

export default function KanbanColumnAdd() {
  const nameRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const [name, setName] = useState('');
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) {
      if (nameRef.current) {
        nameRef.current.focus();
      }
    }
  }, [open]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleCreateColumn = async () => {
    try {
      if (name) {
        dispatch(createColumn({ name }));
        enqueueSnackbar('Create section success', { variant: 'success' });
        setName('');
      }
      handleClose();
    } catch (error) {
      console.error(error);
    }
  };

  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleCreateColumn();
    }
  };

  return (
    <Paper sx={{ minWidth: 280, width: 280 }}>
      {!open && (
        <Button
          fullWidth
          size="large"
          color="inherit"
          variant="outlined"
          startIcon={<Iconify icon={'eva:plus-fill'} width={20} height={20} />}
          onClick={handleOpen}
        >
          Add section
        </Button>
      )}

      {open && (
        <ClickAwayListener onClickAway={handleCreateColumn}>
          <OutlinedInput
            fullWidth
            placeholder="New section"
            inputRef={nameRef}
            value={name}
            onChange={handleChangeName}
            onKeyUp={handleKeyUp}
            sx={{ typography: 'h6' }}
          />
        </ClickAwayListener>
      )}
    </Paper>
  );
}
