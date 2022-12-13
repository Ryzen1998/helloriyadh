import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from "@mui/material"

interface props{
    options:any[];
    onChange:(e:any)=>void;
    selectedValue:string;
}
const RadioButtonGroup = ({options,onChange,selectedValue}:props )=> {
  return (
    <FormControl component="fieldset">
    <FormLabel component="legend">Sort by</FormLabel>
    <RadioGroup onChange={onChange} value={selectedValue}>
      {options.map(({ value, label }) => (
        <FormControlLabel
          value={value}
          control={<Radio />}
          label={label}
          key={value}
        />
      ))}
    </RadioGroup>
  </FormControl>
  )
}

export default RadioButtonGroup