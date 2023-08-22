import React, { FC, FormEvent, useState } from 'react';
import styles from './Configuration.module.scss';
import { useDispatch } from 'react-redux';
import { format, subDays } from 'date-fns';
import { Container, Box, FormControl, Input, FormHelperText, Button } from '@mui/joy';

interface ConfigurationProps { }

const Configuration: FC<ConfigurationProps> = () => {




  const dispatch = useDispatch()
  const [formData, setFormData] = useState({ topChannelCounts: "", slowChannelCounts: "" });

  const [error, setError] = useState({ topChannelCounts: "", slowChannelCounts: "" });
  const [loading, setLoding] = useState<boolean>(false);

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

                  onChange={(e) => setFormData({ ...formData, topChannelCounts: e.target.value })}


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
                  onChange={(e) => setFormData({ ...formData, slowChannelCounts: e.target.value })}


                />
                {error.slowChannelCounts && <FormHelperText className="td-red-500">{error.slowChannelCounts}</FormHelperText>}
              </FormControl>

            </Box>

            <Box sx={{ p: { xs: 2, sm: 2, md: 3 } }} ></Box>

            <h4 className='td-text-sm'>
              Enable Filter
            </h4>



          </Box>

          <Box sx={{ p: { xs: 2, sm: 4, md: 6 } }} ></Box>

        </Box>
      </Container>
    </div>
  );
}

export default Configuration;
