
import PropTypes from 'prop-types';
import React from 'react';
import { Controller } from 'react-hook-form';
import { FormControl, InputLabel, OutlinedInput } from "@mui/material";
import { useState } from 'react';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { FormHelperText , InputAdornment ,IconButton} from '@mui/material'
PasswordField.propTypes = {
  form: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,

  label: PropTypes.string,
};

function PasswordField(props) {
  const { form, name, label } = props;
  const { formState } = form;
  const hasError = !!formState.errors[`${name}`];

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
      setShowPassword((x) => !x);
  };

  return (
      <FormControl error={hasError} fullWidth margin="normal" variant="outlined">
          <InputLabel htmlFor={name}>{label}</InputLabel>
          <Controller
              name={name}
              control={form.control}
              id={name}
              render={({ field: { onChange } }) => (
                  <OutlinedInput
                      variant="outlined"
                      autoComplete="true"
                      label={label}
                      onChange={onChange}
                      fullWidth
                      defaultValue=""
                      type={showPassword ? 'text' : 'password'}
                      endAdornment={
                          <InputAdornment position="end">
                              <IconButton
                                  aria-label="toggle password visibility"
                                  onClick={handleClickShowPassword}
                                  edge="end"
                              >
                                  {showPassword ? <VisibilityOff /> : <Visibility />}
                              </IconButton>
                          </InputAdornment>
                      }
                  />
              )}
          />
          <FormHelperText>
              {formState.errors[`${name}`] ? formState.errors[`${name}`].message : ''}
          </FormHelperText>
      </FormControl>
  );
}
export default PasswordField;
