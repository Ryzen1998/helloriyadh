import { FormGroup, FormLabel, FormControlLabel, Checkbox } from "@mui/material"
import { useState } from 'react';

interface props{
items:string[],
checked?:string[],
onChange:(items:string[])=>void,
label:string,
}

const CheckBoxGroup = ({items,checked,onChange,label}:props) => {

    const [checkedItems,setCheckedItems]=useState(checked||[]);

    const handleChecked =(value:string)=>{

        const currentIndex =checkedItems.findIndex(item=>item===value);
        let newCheckedItems:string[]=[];
        if(currentIndex === -1) newCheckedItems=[...checkedItems,value];
        else newCheckedItems = checkedItems.filter(item=>item!==value);
        setCheckedItems(newCheckedItems);
        onChange(newCheckedItems);
    }

  return (
    <FormGroup>
    <FormLabel component="legend">{label}</FormLabel>
    {items.map((item, index) => (
      <FormControlLabel
        control={
        <Checkbox  checked={checkedItems.indexOf(item)!==-1}
        onClick={()=>handleChecked(item)}/>
    }
        label={item}
        key={index}
      />
    ))}
  </FormGroup>
  )
}

export default CheckBoxGroup