import React, { useState } from "react";
import {
  Grid2 as Grid,
  MenuItem,
  Select,
  styled,
  Tooltip,
  Typography,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { StickerModel } from "../../../ApiConnect/Models";
import { useAppDispatch } from "../../../../hooks";
import { updateStickerOnServer } from "../../../../Store/Redusers/stickersSlice";

const priorityColors: Record<number, string> = {
  0: "#F5001D", // Overdue
  1: "#FFAA00", // Actively
  2: "#59EA3A", // Done
  3: "#3F8FD2", // Deadline
};

interface PriorityCircleProps {
  priority: number;
}

const PriorityCircle = styled("div")<PriorityCircleProps>(({ priority }) => ({
  width: 20,
  height: 20,
  borderRadius: "50%",
  backgroundColor: priorityColors[priority],
  display: "inline-block",
  marginRight: 8,
  border: "none",
}));

const StyledSelect = styled(Select)(({ theme }) => ({
  "& .MuiOutlinedInput-notchedOutline": {
    border: "none",
  },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    border: "none",
  },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    border: "none",
  },
  "& .MuiSelect-icon": {
    display: "none",
  },
}));

export const Sticker = (globalSticker: StickerModel) => {
  const dispatch = useAppDispatch();
  const [sticker, setLocalSticker] = useState(globalSticker);

  const handlePriorityChange = (event: any) => {
    const newPriority = event.target.value;
    setLocalSticker({ ...sticker, priority: newPriority });
    handleSave();
  };

  const handleSave = () => {
    dispatch(updateStickerOnServer(sticker));
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Grid
        container
        direction={"column"}
        sx={{
          width: "250px",
          height: "350px",
          borderRadius: "20px",
          background: "#60D6A7",
          padding: "15px",
        }}
      >
        <Grid
          container
          direction={"row"}
          sx={{
            alignContent: "flex-start",
            width: "100%",
            mb: 1,
            borderBottom: 1,
            borderColor: "grey.300",
          }}
        >
          <Grid size={11}>
            <Typography variant="h6" width={"100%"}>
              {sticker.header}
            </Typography>
          </Grid>
          <Grid size={1}>
            <StyledSelect
              name="priority"
              sx={{ border: "none" }}
              value={sticker.priority}
              onChange={handlePriorityChange}
              renderValue={(selected) => (
                <Tooltip title="Priority Level">
                  <PriorityCircle priority={selected as number} />
                </Tooltip>
              )}
            >
              <MenuItem value={0}>
                <PriorityCircle priority={0} /> Overdue
              </MenuItem>
              <MenuItem value={1}>
                <PriorityCircle priority={1} /> Actively
              </MenuItem>
              <MenuItem value={2}>
                <PriorityCircle priority={2} /> Done
              </MenuItem>
              <MenuItem value={3}>
                <PriorityCircle priority={3} /> Is nearing the deadline
              </MenuItem>
            </StyledSelect>
          </Grid>
        </Grid>
        <Grid
          size={12}
          sx={{
            width: "100%",
            height: "150px",
            mb: 1,
            borderBottom: 1,
            borderColor: "grey.300",
          }}
        >
          <Typography>{sticker.text}</Typography>
        </Grid>
        <Grid container direction={"row"} sx={{ mt: 2 }}>
          <Grid size={12}>
            <DatePicker label="End Date" value={dayjs(sticker.dateEnd)} />
          </Grid>
        </Grid>
      </Grid>
    </LocalizationProvider>
  );
};
