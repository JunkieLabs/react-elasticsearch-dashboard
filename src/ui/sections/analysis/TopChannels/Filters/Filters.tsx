import React, { FC, useState } from 'react';
import styles from './Filters.module.scss';
import List from '@mui/joy/List';
import ListItemContent from '@mui/joy/ListItemContent';
import ListItemButton from '@mui/joy/ListItemButton';
import { Autocomplete, Box, Button, Chip, ChipDelete, Link, ListItem, Slider, SvgIcon, ToggleButtonGroup, Typography } from '@mui/joy';
import * as Accordian from '@radix-ui/react-accordion';
import { AccordionContent, AccordionHeader } from '@/ui/widgets/joy/joyAccordion';

interface FiltersProps { }

const Filters: FC<FiltersProps> = () => {


  const [filterGender, setFilterGender] = useState<string>('all');
  const [filterAgeRange, setFilterAgeRange] = useState([30, 50]);
  return (
    <div className={styles.Filters}>
      <List
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
        <Accordian.Item value="filtersAccordian" >
          <AccordionHeader isFirst={true}>
            <Box sx={{
              display: 'flex',
              flexFlow: "row wrap",
              gap: "1rem"

            }}>

              <Chip
                size="sm"
                variant="soft"
                color="neutral"
                endDecorator={<ChipDelete onDelete={() => alert('Delete')} />}
              >
                Gender: <span className='td-capitalize'>{filterGender}</span>
              </Chip>

              <Chip
                size="sm"
                variant="soft"
                color="neutral"
                endDecorator={<ChipDelete onDelete={() => alert('Delete')} />}
              >
                Age: {filterAgeRange.join("-")}
              </Chip>
            </Box>
          </AccordionHeader>
          <AccordionContent className='td-bg-white'>

            {/* Filter age , gender */}
            <Box sx={{
              display: "flex",
              flexDirection: "column"

            }}>

              <Box sx={{
                display: "flex",
                // flexDirection: "row"
                gap: {
                  xs: "1.5rem", sm: 0
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
                    placeholder="Region"
                    options={top7Region}
                    sx={{ width: 300 }}
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
                  <Slider
                    getAriaLabel={() => 'Age range'}
                    value={filterAgeRange}
                    defaultValue={[0, 90]}

                    onChange={(event, newValue) => {
                      // setValue(newValue);
                      console.log("ToggleButtonGroup gender: ", newValue);
                      setFilterAgeRange((newValue as number[]) ?? [30, 50]);
                    }}
                    valueLabelDisplay="auto"
                  // getAriaValueText={valueText}
                  />
                </Box>




              </Box>


            </Box>

            {/* Filter region , pincode */}
            <Box sx={{
              display: "flex",
              flexDirection: "column"

            }}>

              <Box sx={{
                display: "flex",
                // flexDirection: "row"
                gap: {
                  xs: "1.5rem", sm: 0
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

                  <h4 className='td-text-xs td-font-medium'>Select Gender</h4>
                  <Slider
                    getAriaLabel={() => 'Age range'}
                    value={filterAgeRange}
                    defaultValue={[0, 90]}

                    onChange={(event, newValue) => {
                      // setValue(newValue);
                      console.log("ToggleButtonGroup gender: ", newValue);
                      setFilterAgeRange((newValue as number[]) ?? [30, 50]);
                    }}
                    valueLabelDisplay="auto"
                  // getAriaValueText={valueText}
                  />
                </Box>




              </Box>


            </Box>
          </AccordionContent>
        </Accordian.Item>
      </List>
    </div>
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
