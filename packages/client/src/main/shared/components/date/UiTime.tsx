import { FC } from "react";
import { formatISO, parseJSON } from "date-fns";
import { Typography } from "@mui/material";

import { formatTime } from "./time";
import { DateLike } from "./types";

interface IProps {
  time: DateLike;
}

/**
 * Ui component for render time.
 */
export const UiTime: FC<IProps> = ({ time }) => (
  <Typography
    variant="caption"
    component="time"
    title={formatISO(parseJSON(time))}
    dateTime={formatTime(parseJSON(time))}
  >
    {formatTime(parseJSON(time))}
  </Typography>
);
