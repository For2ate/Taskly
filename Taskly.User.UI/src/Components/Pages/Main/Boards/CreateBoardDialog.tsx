import { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useAppDispatch } from "../../../../hooks";
import { addBoard } from "../../../../Store/Redusers/boardsSlice";

interface CreateBoardDialogProps {
  open: boolean;
  onClose: () => void;
}

export const CreateBoardDialog: React.FC<CreateBoardDialogProps> = ({
  open,
  onClose,
}) => {
  const dispatch = useAppDispatch();

  const [boardName, setBoardName] = useState("");
  const [boardColor, setBoardColor] = useState("");
  const handleCreateBoard = async () => {
    const userId = localStorage[`userId`];
    const data = {
      userId,
      name: boardName,
      color: boardColor,
    };

    try {
      await dispatch(addBoard(data));
      onClose();
    } catch (error) {
      console.error("Error creating board:", error);
    }
  };
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Create New Board</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Board Name"
          type="text"
          fullWidth
          value={boardName}
          onChange={(e) => setBoardName(e.target.value)}
        />
        <input
          type="color"
          value={boardColor}
          onChange={(e) => setBoardColor(e.target.value)}
          style={{ width: "100%", marginTop: "8px", marginBottom: "8px" }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleCreateBoard}>Create</Button>
      </DialogActions>
    </Dialog>
  );
};
