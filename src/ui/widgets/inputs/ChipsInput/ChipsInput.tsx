import React, { FC } from 'react';
import styles from './ChipsInput.module.scss';
import Input from '@mui/joy/Input';
import { MuiChipsInput } from 'mui-chips-input'
import Autocomplete from '@mui/joy/Autocomplete';
import Chip from '@mui/joy/Chip';
import ChipDelete from '@mui/joy/ChipDelete';

interface ChipsInputProps {

  chips: string[]
  placeholder: string
  setChips: React.Dispatch<React.SetStateAction<string[]>>
}

const ChipsInput: FC<ChipsInputProps> = (props) =>{

  // const [chips, setChips] = React.useState(['801102'])


  const handleChange = (value: string[]) =>  {
    // throw new Error('Function not implemented.');

    props.setChips(value)
  } 
  
  const  onRemove = (option: string)=> {

    // console.log("onRemove chips: ", option, props.chips)
    var newChips = props.chips.filter(ch => ch != option)
    props.setChips(newChips)
    // console.log("onRemove chips 2: ",newChips)
  }


//   return (
//   <div className={styles.ChipsInput}>
   
//    <MuiChipsInput value={data.chips} 
   
//    helperText="Type pincode"
//    onChange={handleChange} ></MuiChipsInput>
//   </div>
// )

return (

  <Autocomplete
  defaultValue={
    props.chips??[]
  }
  multiple
  placeholder={props.placeholder}
  // id="tags-filled"
  options={[]}
  value={props.chips}
  

  freeSolo
  renderTags={(value, getTagProps) =>
      value.map((option, index) => {
       

        return (
          <Chip
                key={`ch-`+option}
                size="sm"
                variant="soft"
                color="neutral"
                endDecorator={<ChipDelete onDelete={() => onRemove(option)} />}
              >{option}</Chip>
          // <Chip
          //   variant="outlined"
          //   // label={option}
            // {...getTagProps({ index })}
            
            // />
        );
      })
  }
  onChange={(event, values) => {
      // onChange(values);
      props.setChips(values)
  }}
  
  />
);

};

export default ChipsInput;


