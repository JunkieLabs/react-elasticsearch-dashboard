import React, { FC, useEffect, useState } from 'react';
import styles from './Filters.module.scss';
import { useDebounce } from 'use-debounce';

import List from '@mui/joy/List';
import { Autocomplete, AutocompleteOption, Box, Button, Chip, Slider, SvgIcon, ToggleButtonGroup, Typography } from '@mui/joy';
import * as Accordian from '@radix-ui/react-accordion';
import { AccordionContent, AccordionHeader } from '@/ui/widgets/joy/joyAccordion';
import ChipsInput from '@/ui/widgets/inputs/ChipsInput/ChipsInput';
import { RootState } from '@/domain/store/store';
import { useDispatch, useSelector } from 'react-redux';
import { StoreActionTopSlowChannelGeo } from '@/domain/store/topSlowChannelGeo/reducer';
import { ModelElasticCity } from '@/types/elastic/cities/cities';
import { StoreActionPincodes } from '@/domain/store/pincodes/reducer';
import { ModelTopSlowChannelGeoFilters } from '@/types/store/topSlowChannelGeo';
import { StoreActionBouquets } from '@/domain/store/bouquets/reducer';
import { StoreConstants } from '@/domain/store/store.constants';
import { subDays } from 'date-fns';
import { StoreActionCommonFilters } from '@/domain/store/commonFilters/reducer';
import DateRangeInput from '@/ui/widgets/inputs/DateRangeInput/DateRangeInput';
import SwitchTopSlow from '../SwitchTopSlow/SwitchTopSlow';

interface FiltersProps { }

const Filters: FC<FiltersProps> = () => {

  const stateAgeRangeDefault = useSelector((state: RootState) => state.CommonFilters.ageRange);
  const stateConfigurationFilters = useSelector((state: RootState) => state.Configuration.filters);

  const stateDefaultRegions = useSelector((state: RootState) => state.Cities.values);
  const stateDefaultBouquets = useSelector((state: RootState) => state.Bouquets.items);

  const stateSubFilter = useSelector((state: RootState) => state.TopSlowChannelGeo.subFilter);

  const [dateRange, setDateRange] = useState<Date[]>([subDays(new Date(), 7), new Date()]);

  const [filterGender, setFilterGender] = useState<string>(StoreConstants.filterCommon.gender.all);
  const [filterAgeRange, setFilterAgeRange] = useState<number[]>([0, 100]);// useState([30, 50]);
  const [filterPincode, setFilterPincode] = useState<string[]>([]);
  const [filterRegion, setFilterRegion] = useState<ModelElasticCity | null>(null);
  const [filterBouquet, setFilterBouquet] = useState<string | null>(null);
  const [filterIsTop, setFilterIsTop] = useState<boolean>(true);
  const [pincodeInputText, setPincodeInputText] = useState<string>('');


  const pincodesAutoComplete = useSelector((state: RootState) => state.Pincodes.items);

  const [filterAgeRangeDebaunced] = useDebounce(filterAgeRange, 1000);


  const dispatch = useDispatch();
  useEffect(() => {
    // console.log("filterAgeRange: ", filterAgeRange, filterAgeDefaultRange, filterAgeDefaultRange === filterAgeRange)

    dispatch(StoreActionBouquets.init())
    return () => { }

  }, []);


  useEffect(() => {

    dispatch(StoreActionCommonFilters.commonFilterSet(dateRange))
    return () => { }

  }, [dateRange]);

  useEffect(() => {
    // filterGender.
    setFilterRegion(stateSubFilter.region ?? null)
    setFilterPincode(stateSubFilter.pincodes ?? [])
    setFilterGender(stateSubFilter.gender)
    setFilterBouquet(stateSubFilter.bouquet ?? null)
    setFilterIsTop(stateSubFilter.isTop)
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


  const handleStoreChange = async (topSlowChannelGeoFilters: ModelTopSlowChannelGeoFilters) => {
    // return (){}

    console.log("handleStoreChange: ", topSlowChannelGeoFilters)
    dispatch(StoreActionTopSlowChannelGeo.setSubFilter(topSlowChannelGeoFilters))
    // dispatch(StoreActionTopSlowChannelGeo.setSubFilter({
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

  const handleBouquetChange = async (bouquet: string | undefined) => {
    console.log("handleBouquetChange: ", bouquet);
    if (bouquet) {
      let i = stateDefaultBouquets.findIndex(val => val == bouquet);
      if (i >= 0) {
        setFilterBouquet(stateDefaultBouquets[i]);

      }
    } else {
      console.log("handleBouquetChange 2: ");

      setFilterBouquet(null)
    }
    handleStoreChange({ ...stateSubFilter, bouquet: bouquet })
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

  const handleAgeChange = async (newAge: number[]) => {

    if (newAge && newAge.length > 0) {

      setFilterAgeRange(newAge);

    }

    handleStoreChange({ ...stateSubFilter, ageRange: newAge })
  }

  const handleIsTop = async (isTop: boolean) => {

    if (isTop) {

      setFilterIsTop(isTop);

    }

    handleStoreChange({ ...stateSubFilter, isTop: isTop })
  }


  // console.log("debounce filterPincode: ", filterPincode)


  return (
    <Box id='e4' className={styles.Filters} sx={{ display: "flex", flexDirection: "column" }}>
      <Box sx={{ p: { xs: 1, sm: 1, md: 1 } }} ></Box>



      <Box sx={{
        display: "flex",
        alignItems: "center",
        flexDirection: "row"
      }}>

        <Box sx={{ flex: "1 1 0%" }}>
          {/* <h4 className="td-text-lg td-font-medium">Filters</h4> */}
          <SwitchTopSlow onChange={handleIsTop} input={filterIsTop}></SwitchTopSlow>

        </Box>
        <DateRangeInput setDateRange={setDateRange}></DateRangeInput>
      </Box>

      <Box sx={{ p: { xs: 1, sm: 1, md: 1 } }} ></Box>
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

              {filterBouquet && <Chip
                key={"Bouquet"}
                size="sm"
                variant="soft"
                color="neutral"
              >
                Bouquet: {filterBouquet}
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
                {stateConfigurationFilters.entities[StoreConstants.configuration.filters.filterGender].isEnabled &&

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
                      <Button value={StoreConstants.filterCommon.gender.all}>All</Button>
                      <Button value={StoreConstants.filterCommon.gender.male}>Male</Button>
                      <Button value={StoreConstants.filterCommon.gender.female}>Female</Button>
                      <Button value={StoreConstants.filterCommon.gender.other}>Others</Button>
                    </ToggleButtonGroup>
                  </Box>
                }

                {stateConfigurationFilters.entities[StoreConstants.configuration.filters.filterAge].isEnabled &&

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
                        handleAgeChange(newValue as number[])
                        // setFilterAgeRange((newValue as number[]) ?? stateAgeRangeDefault);
                      }}
                      valueLabelDisplay="auto"
                    // getAriaValueText={valueText}
                    />
                  </Box>

                }


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

                {stateConfigurationFilters.entities[StoreConstants.configuration.filters.filterRegion].isEnabled &&


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

                }
                {stateConfigurationFilters.entities[StoreConstants.configuration.filters.filterPincode].isEnabled &&

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
                }

                {stateConfigurationFilters.entities[StoreConstants.configuration.filters.filterBouquet].isEnabled &&

                  <Box
                    sx={{
                      maxWidth: { xs: "unset", sm: "50%" },
                      flex: "1 1 0%",
                      display: "flex", flexDirection: "column",
                      gap: `0.5rem`
                    }}>

                    <h4 className='td-text-xs td-font-medium'>Select Bouquet</h4>

                    <Autocomplete

                      onChange={(event, values) => {

                        console.log("auto onChange: ", values)
                        // onChange(values);
                        handleBouquetChange(values ?? undefined);
                      }}
                      // defaultValue={filterRegion}
                      value={filterBouquet}


                      getOptionLabel={(option) => option}
                      // freeSolo={false}
                      // placeholder="Region"
                      options={stateDefaultBouquets}
                      renderOption={(props, option) => {
                        var { key, ...propsExc } = props as any;
                        return (
                          <AutocompleteOption variant="soft" key={"op" + option}  {...propsExc}>
                            {option}
                          </AutocompleteOption>
                        );
                      }}

                    // sx={{ width: 300 }}
                    />
                  </Box>
                }

              </Box>




            </Box>
          </AccordionContent>
        </Accordian.Item>
      </List>

      <Box sx={{ p: { xs: 1, sm: 1, md: 1 } }} ></Box>
    </Box>
  )
};


export default Filters;
