import React, { FC, useEffect, useState } from 'react';
import styles from './ChipsInput.module.scss';
import Input from '@mui/joy/Input';
import { MuiChipsInput } from 'mui-chips-input'
import Autocomplete from '@mui/joy/Autocomplete';
import Chip from '@mui/joy/Chip';
import ChipDelete from '@mui/joy/ChipDelete';
import { useDebounce } from 'use-debounce';
import AutocompleteOption from '@mui/joy/AutocompleteOption';

interface ChipsInputProps {

  chips: string[]
  placeholder: string
  options?: string[]
  onTextChange?: React.Dispatch<React.SetStateAction<string>>
  onChipsChange: (chipsvalue: string[])=>{}
  // setChips: React.Dispatch<React.SetStateAction<string[]>>
}

const ChipsInput: FC<ChipsInputProps> = (props) => {

  // const [chips, setChips] = React.useState(['801102'])


  const [inputText, setInputText] = useState<string>('');


  const [inputTextDebaunced] = useDebounce(inputText, 1000);

  useEffect(() => {
    props.onTextChange?.(inputTextDebaunced)

  }, [
    inputTextDebaunced
  ]);


  const handleChange = (value: string[]) => {
    // throw new Error('Function not implemented.');
    props.onChipsChange(value)

    // props.setChips(value)
  }

  const onRemove = (option: string) => {

    // console.log("onRemove chips: ", option, props.chips)
    var newChips = props.chips.filter(ch => ch != option)
    props.onChipsChange(newChips)
    // props.setChips(newChips)
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
        props.chips ?? []
      }
      multiple
      placeholder={props.placeholder}
      // id="tags-filled"
      options={props.options ?? []}
      value={props.chips}


      freeSolo={props.options ? false : true}
      renderTags={(value, getTagProps) =>
        value.map((option, index) => {


          return (
            <Chip
              key={`ch-` + option}
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
      renderOption={(props, option) => {
        var { key, ...propsExc } = props as any;
        return (
          <AutocompleteOption variant="soft" key={ option}  {...propsExc}>
            {option}
          </AutocompleteOption>
        );
      }}
      onInputChange={(event, value) => {
        setInputText(value);
        console.log("onInputChange: ", value)
      }}
      onChange={(event, values) => {
        // onChange(values);
        // props.setChips(values)
        props.onChipsChange(values)
      }}

    />
  );

};

export default ChipsInput;


