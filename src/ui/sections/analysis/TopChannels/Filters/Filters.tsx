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
import { ModelElasticCity } from '@/types/elastic/cities/cities';
import { StoreActionPincodes } from '@/domain/store/pincodes/reducer';
import { ModelTopChannelFilters } from '@/types/store/topChannel';

interface FiltersProps { }

const Filters: FC<FiltersProps> = () => {

  const stateAgeRangeDefault = useSelector((state: RootState) => state.CommonFilters.ageRange);

  const stateDefaultRegions = useSelector((state: RootState) => state.Cities.values);

  const stateSubFilter = useSelector((state: RootState) => state.TopChannel.subFilter);

  const [filterGender, setFilterGender] = useState<string>('all');
  const [filterAgeRange, setFilterAgeRange] = useState<number[]>([0, 100]);// useState([30, 50]);
  const [filterPincode, setFilterPincode] = useState<string[]>([]);
  const [filterRegion, setFilterRegion] = useState<ModelElasticCity | null>(null);
  const [pincodeInputText, setPincodeInputText] = useState<string>('');


  const pincodesAutoComplete = useSelector((state: RootState) => state.Pincodes.items);

  const [filterAgeRangeDebaunced] = useDebounce(filterAgeRange, 1000);


  const dispatch = useDispatch();
  useEffect(() => {
    // filterGender.
    setFilterRegion(stateSubFilter.region ?? null)
    setFilterPincode(stateSubFilter.pincodes??[])
    setFilterGender(stateSubFilter.gender)
    // = stateSubFilter.region

  }, [stateSubFilter])

  useEffect(() => {
    setFilterAgeRange(stateAgeRangeDefault)

  }, [stateAgeRangeDefault])

  useEffect(() => {
    // setFilterAgeRange(filterAgeDefaultRange)
    // console.log("filterAgeRangeDebaunced: ", filterAgeRangeDebaunced)

  }, [filterAgeRangeDebaunced])

  useEffect(() => {

    console.log("Pincodes in: ", pincodeInputText);
    dispatch(StoreActionPincodes.search(pincodeInputText))
    return () => { }

  }, [pincodeInputText])

  /*
    useEffect(() => {
      console.log("filterAgeRange: ", filterAgeRange, filterAgeDefaultRange, filterAgeDefaultRange === filterAgeRange)
  
      // console.log("filterAgeRange: ", filterAgeRange, filterAgeDefaultRange, filterAgeDefaultRange === filterAgeRange)
  
      dispatch(StoreActionTopChannel.setSubFilter({
        gender: filterGender,
        pincodes: filterPincode,
        ageRange: filterAgeRangeDebaunced,
        region: filterRegion
  
      }))
      return () => { }
  
    }, [filterGender, filterAgeRangeDebaunced, filterPincode, filterRegion]);
  */

  const handleStoreChange = async (topChannelFilters: ModelTopChannelFilters) => {
    // return (){}

    console.log("handleStoreChange: ", topChannelFilters)
    dispatch(StoreActionTopChannel.setSubFilter(topChannelFilters))
    // dispatch(StoreActionTopChannel.setSubFilter({
    //   gender: filterGender,
    //   pincodes: filterPincode,
    //   ageRange: filterAgeRangeDebaunced,
    //   region: filterRegion??undefined

    // }))

  }
  const handleRegionChange = async (region: ModelElasticCity | undefined) => {
    console.log("handleRegionChange: ", region);
    if (region) {
      let i = stateDefaultRegions.findIndex(val => val.city == region.city);
      if (i >= 0) {
        setFilterRegion(stateDefaultRegions[i]);

      }
    } else {
      console.log("handleRegionChange 2: ");

      setFilterRegion(null)
    }
    handleStoreChange({ ...stateSubFilter, region: region })
  }

  const handlePincodesChange = async (pincodes: string[]) => {

    setFilterPincode(pincodes)

    handleStoreChange({ ...stateSubFilter, pincodes: pincodes })
  }
  const handleGenderChange = async (gender: string | null) => {
    if (!gender) {
      return;
    }

    setFilterGender(gender)

    handleStoreChange({ ...stateSubFilter, gender: gender })
  }


  // console.log("debounce filterPincode: ", filterPincode)


  return (
    <Box id='e4' className={styles.Filters}>
      <List id='232'
        variant="outlined"
        className='td-bg-white td-shadow-sm '
        component={Accordian.Root}
        type="multiple"
        defaultValue={[]}
        sx={{
          borderRadius: "lg",
          "--ListDivider-gap": "0px",
          "--focus-outline-offset": "-2px"
        }}
      >
        <Accordian.Item key={1221} value="filtersAccordian" >
          <AccordionHeader isFirst={true} isLast={true} >
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
                Region: {filterRegion.city}
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
                      handleGenderChange(newValue);
                      // setFilterGender(newValue ?? 'all');
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
                    defaultValue={stateAgeRangeDefault.length > 0 ? stateAgeRangeDefault : [0, 90]}

                    max={stateAgeRangeDefault.length > 1 ? stateAgeRangeDefault[1] : 100}
                    min={stateAgeRangeDefault.length > 1 ? stateAgeRangeDefault[0] : 0}

                    onChange={(event, newValue) => {
                      // setValue(newValue);
                      // console.log("ToggleButtonGroup age: ", newValue, filterAgeDefaultRange);
                      setFilterAgeRange((newValue as number[]) ?? stateAgeRangeDefault);
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
                  {/* <Autocomplete

                    onChange={(event, values) => {

                      console.log("auto onChange: ", values)
                      // onChange(values);
                    }}
                    inputValue={filterRegion?.city??""}
                    onInputChange={(event, newInputValue) => {
                      handleRegionChange(newInputValue);
                    }}

                    getOptionLabel={(option) => option.city}
                    freeSolo={false}
                    placeholder="Region"
                    options={regions}
                    renderOption={(props, option) => {
                      var { key, ...propsExc } = props as any;
                      return (
                        <AutocompleteOption variant="soft" key={"op" + option.city}  {...propsExc}>
                          {option.city}
                        </AutocompleteOption>
                      );
                    }}

                  /> */}

                  <Autocomplete

                    onChange={(event, values) => {

                      console.log("auto onChange: ", values)
                      // onChange(values);
                      handleRegionChange(values ?? undefined);
                    }}
                    // defaultValue={filterRegion}
                    value={filterRegion}
                    // isOptionEqualToValue={(option ,  val) => option.city == val.city}
                    // defaultValue={filterRegion?.city ?? ""}
                    // onInputChange={(event, newInputValue) => {
                    //   handleRegionChange(newInputValue);
                    // }}

                    getOptionLabel={(option) => option.city}
                    // freeSolo={false}
                    // placeholder="Region"
                    options={stateDefaultRegions}
                    renderOption={(props, option) => {
                      var { key, ...propsExc } = props as any;
                      return (
                        <AutocompleteOption variant="soft" key={"op" + option.city}  {...propsExc}>
                          {option.city}
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
                  <ChipsInput chips={filterPincode}

                    onChipsChange={handlePincodesChange}
                    onTextChange={setPincodeInputText}
                    options={pincodesAutoComplete}
                    placeholder='type pincode '></ChipsInput>
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
