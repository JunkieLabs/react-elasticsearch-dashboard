import React, { ChangeEvent, FC, FormEvent, useEffect, useState } from 'react';
import styles from './Configuration.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { format, subDays } from 'date-fns';
import { Container, Box, FormControl, Input, FormHelperText, Button, Checkbox } from '@mui/joy';
import { RootState } from '@/domain/store/store';
import { ModelStoreConfigurationFilter } from '@/types/store/configuration';
import { StoreActionConfiguration } from '@/domain/store/configuration/reducer';
import { StoreSelectorsConfiguration } from '@/domain/store/configuration/selector';
import { TransformHelper } from '@/tools/parserTools';

interface ConfigurationProps { }

const Configuration: FC<ConfigurationProps> = () => {




  const dispatch = useDispatch()

  // const filtersState = useSelector((state: RootState) => state.Configuration.filters);
  const filtersState = useSelector(StoreSelectorsConfiguration.filters);

  const channelsCountState = useSelector(StoreSelectorsConfiguration.selectTotalCounts);
  
  const [formData, setFormData] = useState({ topChannelCounts: "", slowChannelCounts: "" });

  const [error, setError] = useState({ topChannelCounts: "", slowChannelCounts: "" });
  const [loading, setLoding] = useState<boolean>(false);


  useEffect(() => {
    // filterGender.
    setFormData({
      topChannelCounts:`${channelsCountState.top}`, 
      slowChannelCounts: `${channelsCountState.slow}`
    })
    // = stateSubFilter.region

  }, [channelsCountState])

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {


    console.log("handleSubmit", formData)

    event.preventDefault();
    if (!formData.topChannelCounts) {
      setError({ ...error, topChannelCounts: "Start Date Required" })
      return;
    }
    if (!formData.slowChannelCounts) {
      setError({ ...error, slowChannelCounts: "End Date required" })
      return;
    }

    setLoding(true);

  }

  const handleFormTopChannel = async (e: ChangeEvent<HTMLInputElement>) => {

    var number = TransformHelper.toNumber(e.target.value, {
      default:5
    })

    setFormData({ ...formData, topChannelCounts: e.target.value })
    dispatch(StoreActionConfiguration.topChannelCounts(number))


  }

  const handleFormSlowChannel = async (e: ChangeEvent<HTMLInputElement>) => {

    var number = TransformHelper.toNumber(e.target.value, {
      default:5
    })

    setFormData({ ...formData, slowChannelCounts: e.target.value })
    dispatch(StoreActionConfiguration.slowChannelCounts(number))


  }

  

  const handleFilterSelection = (filterItem: ModelStoreConfigurationFilter) => (event: { target: { checked: boolean; }; }) => {
    // const newSelections = [...filterItem.selections];

    console.log("handleSelection: ", filterItem, event.target.checked)

    // var index = filtersState.findIndex(val => val.name == filterItem.name);
    // if(index >= 0){
    //   var updatedFilter = filtersState[index];

    //   updatedFilter.isEnabled = event.target.checked??true;
    //   // dispatch(StoreActionConfiguration.setFilterState(updatedFilter));
    // }
    var filterItemUpdated =Object.assign({},filterItem,  {
      isEnabled: event.target.checked
    })
    // filterItem
    // filterItemUpdated.isEnabled = event.target.checked
    dispatch(StoreActionConfiguration.updateFilter(filterItemUpdated));


    // newSelections[index] = event.target.checked;
    // props.setSelectedVerticals(newSelections);

  };

  console.log("new Date().toUTCString()", format(new Date(), "dd-MM-yyyy"));


  return (
    <div className={styles.Configuration}>
      <Container className={"tb-position--relative"}>
        <Box className="td-px-4 td-py-3" sx={{
          display: "flex",
          flexDirection: "column"
        }}>

          <Box sx={{ p: { xs: 2, sm: 3, md: 4 } }} ></Box>
          <h3 className='td-text-lg td-font-bold'>Configuration Options</h3>


          <Box sx={{ p: { xs: 2, sm: 2, md: 3 } }} ></Box>

          <h3 className='td-text-sm td-font-medium'>Enter Number of Channels</h3>

          <Box sx={{ p: 2 }} ></Box>
          <Box className="td-space-y-4 md:td-space-y-6 md:td-max-w-screen-md td-flex td-flex-col" >

            <Box sx={{
              display: "flex",
              alignItems: "center",
              flexDirection: "row"
            }}>
              <Box sx={{
                flex: {
                  sx: "unset",
                  md: "1 1 40%",
                  lg: "1 1 30%"
                },
                maxWidth: {
                  sx: "unset",
                  md: "40%",
                  lg: "30%"
                }
              }}>
                <h4 className='td-text-sm'>
                  For Top Channels:
                </h4>

              </Box>
              <FormControl required sx={{
                flex: {
                  sx: "unset",
                  md: "1 1 0%",
                },

              }}>
                {/* <FormLabel>Email</FormLabel> */}
                <Input
                  type="number"
                  name="topChannelCounts"
                  slotProps={{
                    input: {
                      min: 5
                    },
                  }}
                  value={formData.topChannelCounts}
                  onChange={handleFormTopChannel}
                />
                {/* <FormHelperText >This is a helper text.</FormHelperText> */}
                {error.topChannelCounts && <FormHelperText className="td-red-500">{error.topChannelCounts}</FormHelperText>}
              </FormControl>

            </Box>
            <Box sx={{
              alignItems: "center",
              display: "flex",
              flexDirection: "row"
            }}>
              <Box sx={{
                flex: {
                  sx: "unset",
                  md: "1 1 40%",
                  lg: "1 1 30%"
                },
                maxWidth: {
                  sx: "unset",
                  md: "40%",
                  lg: "30%"
                }
              }}>
                <h4 className='td-text-sm'>
                  For Slow Channels:
                </h4>

              </Box>
              <FormControl required sx={{
                flex: {
                  sx: "unset",
                  md: "1 1 0%",
                },

              }}>
                {/* <FormLabel>Password</FormLabel> */}
                <Input
                  type="number"
                  name="slowChannelCounts"
                  value={formData.slowChannelCounts}
                  slotProps={{
                    input: {
                      min: 5
                    },
                  }}
                  onChange={handleFormSlowChannel}
                  // /onChange={(e) => setFormData({ ...formData, slowChannelCounts: e.target.value })}


                />
                {error.slowChannelCounts && <FormHelperText className="td-red-500">{error.slowChannelCounts}</FormHelperText>}
              </FormControl>

            </Box>

            <Box sx={{ p: { xs: 2, sm: 2, md: 3 } }} ></Box>

            <h4 className='td-text-sm'>
              Enable Filter
            </h4>

            {filtersState.map((filterItem, index) => {

              return (
                <Box key={filterItem.name}>
                  <Checkbox
                    size="sm"
                    label={filterItem.label}

                    // overlay
                    variant='solid'
                    checked={filterItem.isEnabled}
                    onChange={handleFilterSelection(filterItem)}


                    // slotProps={{
                    //   label: { className: "tb-color--black-87 current-typo--h5-medium current-font--big-john" },
                    //   root: { className: styles[`checkbox-root`] },
                    //   checkbox: { className: styles[`checkbox`] }



                    // }}
                  />
                </Box>
              );
            })}



          </Box>

          <Box sx={{ p: { xs: 2, sm: 4, md: 6 } }} ></Box>

        </Box>
      </Container>
    </div>
  );
}

export default Configuration;
