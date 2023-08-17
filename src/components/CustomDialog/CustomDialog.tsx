import { SubjectManager } from '../../models';
import Dialog from '@mui/material/Dialog';
import { useEffect, useState } from 'react';
import { Subscription } from 'rxjs';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material';

interface Props {
  children: React.ReactNode;
}

export const dialogOpenSubject$ = new SubjectManager<boolean>();
export const dialogCloseSubject$ = new SubjectManager<boolean>();

export const CustomDialog = ({ children }: Props) => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  let openSubject$ = new Subscription();
  let closeSubject$ = new Subscription();

  useEffect(() => {
    openSubject$ = dialogOpenSubject$.getSubject.subscribe(() => handleClickOpen());
    closeSubject$ = dialogCloseSubject$.getSubject.subscribe(() => handleClose());
    return () => {
      openSubject$.unsubscribe();
      closeSubject$.unsubscribe();
    };
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
        PaperProps={{
          sx: {
            padding: theme.spacing(2),
          }
        }}
      >
        <Box>
          {children}
        </Box>
      </Dialog>
    </div>
  );
};

export default CustomDialog;
