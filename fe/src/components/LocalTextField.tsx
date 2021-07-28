import React from "react";
import { TextField } from "@material-ui/core";
import colors from "../constants/colors";

interface Props {
  placeholder?: string;
  name: string;
  type?: string;
  label?: string;
  onChange: () => void;
  value: string;
  error?: boolean;
  className?: string;
  endAdornment?: React.ReactElement;
}

const LocalTextField = ({
  placeholder,
  name,
  type,
  label,
  value,
  error,
  className,
  onChange,
  endAdornment,
}: Props) => {
  return (
    <TextField
      placeholder={placeholder}
      name={name}
      type={type}
      label={label}
      value={value}
      error={error}
      onChange={onChange}
      className={className}
      variant="outlined"
      InputProps={{
        endAdornment: endAdornment,
        style: {
          color: colors.darkBlueGrey,
        },
      }}
    />
  );
};

export default LocalTextField;
