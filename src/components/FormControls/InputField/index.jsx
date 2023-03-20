import {
  FormControl,
  InputLabel,
  OutlinedInput,
  FormHelperText,
} from "@mui/material";
import { Controller } from 'react-hook-form';
import PropTypes from "prop-types";
import React from "react";

InputField.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  form: PropTypes.object.isRequired,
};

function InputField(props) {
  const { form, name, label } = props;
  const { formState } = form;
  const hasError = !!formState.errors[`${name}`];

  return (
    <FormControl error={hasError} fullWidth margin="normal" variant="outlined">
      <InputLabel htmlFor={name}>{label}</InputLabel>
      <Controller
        name={name}
        control={form.control}
        id={name}
        render={({ field: { onChange } }) => (
          <OutlinedInput name={name}  onChange={onChange} type="text" label={label} />
        )}
      />
      <FormHelperText>
        {formState.errors[`${name}`] ? formState.errors[`${name}`].message : ""}
      </FormHelperText>
    </FormControl>
  );
}

export default InputField;
