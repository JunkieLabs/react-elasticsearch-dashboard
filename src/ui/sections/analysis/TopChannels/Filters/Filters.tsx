import React, { FC, useEffect, useState } from 'react';
import styles from './Filters.module.scss';
import { useDebounce } from 'use-debounce';

import List from '@mui/joy/List';
import { Autocomplete, AutocompleteOption, Box, Button, Chip, ChipDelete, Link, ListItem, Slider, SvgIcon, ToggleButtonGroup, Typography } from '@mui/joy';
import * as Accordian from '@radix-ui/react-accordion';
import { AccordionContent, AccordionHeader } from '@/ui/widgets/joy/joyAccordion';
import ChipsInput from '@/ui/widgets/inputs/ChipsInput/ChipsInput';
import { RootState } from '@/domain/store/store';
import { useDispatch, useSelector } from 'react-redux';
import { StoreActionTopChannel } from '@/domain/store/topChannel/reducer';

interface FiltersProps { }

const Filters: FC<FiltersProps> = () => {

  const filterAgeDefaultRange = useSelector((state: RootState) => state.CommonFilters.ageRange);

  const [filterGender, setFilterGender] = useState<string>('all');
  const [filterAgeRange, setFilterAgeRange] = useState<number[]>([0, 100]);// useState([30, 50]);
  const [filterPincode, setFilterPincode] = useState<string[]>([]);
  const [filterRegion, setFilterRegion] = useState<string>('');

  const [filterAgeRangeDebaunced] = useDebounce(filterAgeRange, 1000);
  const section = useSelector((state: RootState) => state.ChannelPerformance.subFilter);

  const dispatch = useDispatch();
  useEffect(() => {
    // filterGender.

  }, [section])

  useEffect(()=>{
    setFilterAgeRange(filterAgeDefaultRange)

  }, [filterAgeDefaultRange])

  useEffect(()=>{
    // setFilterAgeRange(filterAgeDefaultRange)
    // console.log("filterAgeRangeDebaunced: ", filterAgeRangeDebaunced)

  }, [filterAgeRangeDebaunced])


  useEffect(() => {
    // console.log("filterAgeRange: ", filterAgeRange, filterAgeDefaultRange, filterAgeDefaultRange === filterAgeRange)

    dispatch(StoreActionTopChannel.setSubFilter({
      gender: filterGender,
      pincodes: filterPincode,
      ageRange: filterAgeRangeDebaunced,
      region: filterRegion

    }))



    return () => { }

  }, [filterGender, filterAgeRangeDebaunced, filterPincode, filterRegion]);

  console.log("debounce filterPincode: ", filterPincode)

 
  return (
    <Box id='e4' className={styles.Filters}>
      <List id='232'
        variant="outlined"
        component={Accordian.Root}
        type="multiple"
        defaultValue={[]}
        sx={{
          borderRadius: "xs",
          "--ListDivider-gap": "0px",
          "--focus-outline-offset": "-2px"
        }}
      >
        <Accordian.Item key={1221} value="filtersAccordian" >
          <AccordionHeader isFirst={true} >
            <Box className="wase" sx={{
              display: 'flex',
              flexFlow: "row wrap",
              gap: "1rem"

            }}>

              <Chip
                id={"Gender"}
                size="sm"
                variant="soft"
                color="neutral"
                className="td-capitalize"
              >{`Gender: ` + filterGender} </Chip>

              {filterAgeRange && <Chip
                key={"Age"}
                size="sm"
                variant="soft"
                color="neutral"
              >
                Age: {filterAgeRange?.join("-")}
              </Chip>}

              {filterRegion && <Chip
                key={"Region"}
                size="sm"
                variant="soft"
                color="neutral"
              >
                Region: {filterRegion}
              </Chip>}


              {
                filterPincode.map((item, index) => {
                  return (<Chip
                    key={`Pin-${index}`}
                    size="sm"
                    variant="soft"
                    color="neutral"
                  >
                    Pin: {item}
                  </Chip>)
                })
              }



            </Box>
          </AccordionHeader>
          <AccordionContent className='td-bg-white'>

            <Box sx={{
              display: "flex",
              flexDirection: "column",
              gap: {
                xs: "1.5rem", sm: "1.5rem"
              },
            }}>

              {/* Filter age , gender */}


              <Box sx={{
                display: "flex",
                // flexDirection: "row"
                gap: {
                  xs: "1.5rem", sm: "1.5rem"
                },
                flexDirection: { xs: "column", sm: "row" },
              }}>

                <Box
                  sx={{
                    maxWidth: { xs: "unset", sm: "50%" },
                    flex: "1 1 0%",
                    display: "flex", flexDirection: "column",
                    gap: `0.5rem`
                  }}>

                  <h4 className='td-text-xs td-font-medium'>Select Gender</h4>
                  <ToggleButtonGroup

                    value={filterGender}
                    onChange={(event, newValue) => {
                      // setValue(newValue);
                      console.log("ToggleButtonGroup gender: ", newValue);
                      setFilterGender(newValue ?? 'all');
                    }}
                  >
                    <Button value="all">All</Button>
                    <Button value="male">Male</Button>
                    <Button value="female">Female</Button>
                    <Button value="others">Others</Button>
                  </ToggleButtonGroup>
                </Box>



                <Box
                  sx={{
                    maxWidth: { xs: "unset", sm: "50%" },
                    flex: "1 1 0%",
                    display: "flex", flexDirection: "column",
                    gap: `0.5rem`
                  }}>

                  <h4 className='td-text-xs td-font-medium'>Select Age</h4>
                  <Slider
                    getAriaLabel={() => 'Age range'}
                    value={filterAgeRange}
                    defaultValue={filterAgeDefaultRange.length > 0 ? filterAgeDefaultRange : [0, 90]}

                    max={filterAgeDefaultRange.length > 1 ? filterAgeDefaultRange[1] : 100}
                    min={filterAgeDefaultRange.length > 1 ? filterAgeDefaultRange[0] : 0}

                    onChange={(event, newValue) => {
                      // setValue(newValue);
                      // console.log("ToggleButtonGroup age: ", newValue, filterAgeDefaultRange);
                      setFilterAgeRange((newValue as number[]) ?? filterAgeDefaultRange);
                    }}
                    valueLabelDisplay="auto"
                  // getAriaValueText={valueText}
                  />
                </Box>




              </Box>


              {/* Filter region , pincode */}





              <Box sx={{
                display: "flex",
                // flexDirection: "row"
                gap: {
                  xs: "1.5rem", sm: "1.5rem"
                },
                flexDirection: { xs: "column", sm: "row" },
              }}>

                <Box
                  sx={{
                    maxWidth: { xs: "unset", sm: "50%" },
                    flex: "1 1 0%",
                    display: "flex", flexDirection: "column",
                    gap: `0.5rem`
                  }}>

                  <h4 className='td-text-xs td-font-medium'>Select Region</h4>
                  <Autocomplete

                    onChange={(event, values) => {

                      console.log("auto onChange: ", values)
                      // onChange(values);
                    }}
                    inputValue={filterRegion}
                    onInputChange={(event, newInputValue) => {
                      setFilterRegion(newInputValue);
                    }}
                    freeSolo={true}
                    placeholder="Region"
                    options={top7Region}
                    renderOption={(props, option) => {
                      var { key, ...propsExc } = props as any;
                      return (
                        <AutocompleteOption variant="soft" key={"op" + option.label}  {...propsExc}>
                          {option.label}
                        </AutocompleteOption>
                      );
                    }}

                  // sx={{ width: 300 }}
                  />
                </Box>



                <Box
                  sx={{
                    maxWidth: { xs: "unset", sm: "50%" },
                    flex: "1 1 0%",
                    display: "flex", flexDirection: "column",
                    gap: `0.5rem`
                  }}>

                  <h4 className='td-text-xs td-font-medium'>Select Pincode</h4>
                  <ChipsInput chips={filterPincode} setChips={setFilterPincode} placeholder='type pincode '></ChipsInput>
                </Box>




              </Box>




            </Box>
          </AccordionContent>
        </Accordian.Item>
      </List>
    </Box>
  )
};

const top7Region = [
  { label: 'ZX9876307', },
  { label: 'ZX9876308', },
  { label: 'ZX9876309', },
  { label: 'ZX9876310', },
  { label: 'ZX9876312', },
  { label: 'ZX9876311', },
  { label: 'ZX9876313', },
]

export default Filters;
