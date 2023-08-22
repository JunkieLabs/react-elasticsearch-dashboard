import React, { FC, FormEvent, useState } from 'react';
import styles from './ReportGeneration.module.scss';
import Box from '@mui/joy/Box';
import { useDispatch } from 'react-redux';
import Done from '@mui/icons-material/Done';
import { format, subDays } from 'date-fns';
import { FormControl, FormLabel, Input, FormHelperText, Checkbox, Button, Container } from '@mui/joy';
import error from 'next/error';
import Link from 'next/link';

interface ReportGenerationProps { }

const ReportGeneration: FC<ReportGenerationProps> = () => {


  const dispatch = useDispatch()
  const [formData, setFormData] = useState({ startDate: "", endDate: "" });

  const [error, setError] = useState({ startDate: "", endDate: "" });
  const [loading, setLoding] = useState<boolean>(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {


    console.log("handleSubmit", formData)

    event.preventDefault();
    if (!formData.startDate) {
      setError({ ...error, startDate: "Start Date Required" })
      return;
    }
    if (!formData.endDate) {
      setError({ ...error, endDate: "End Date required" })
      return;
    }

    setLoding(true);
  
  }

  console.log("new Date().toUTCString()", format(new Date(), "dd-MM-yyyy"));
  return (
    <div className={styles.ReportGeneration}>

      <Container className={"tb-position--relative"}>
        <Box className="td-px-4 td-py-3" sx={{
          display: "flex",
          flexDirection: "column"
        }}>

          <Box sx={{ p: { xs: 2, sm: 3, md: 4 } }} ></Box>
          <h3 className='td-text-lg td-font-bold'>Generate Report</h3>


          <Box sx={{ p: { xs: 2, sm: 2, md: 3 } }} ></Box>

          <h3 className='td-text-sm td-font-medium'>Enter Date to create report</h3>

          <Box sx={{ p: 2 }} ></Box>
          <form onSubmit={handleSubmit} className="td-space-y-4 md:td-space-y-6 md:td-max-w-screen-md td-flex td-flex-col" action="#" >

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
                  Start Date:
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
                  type="date"
                  name="startDate"

                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}

                  slotProps={{

                    input: {
                      min: format(subDays(new Date(), 200), "yyyy-MM-dd"), 
                      max: format(new Date(), "yyyy-MM-dd")

                      // min: '2018-06-07T00:00',
                      // max: '2018-06-14T00:00',
                    },
                  }}
                />
                {/* <FormHelperText >This is a helper text.</FormHelperText> */}
                {error.startDate && <FormHelperText className="td-red-500">{error.startDate}</FormHelperText>}
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
                  End Date:
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
                  type="date"
                  name="endDate"
                  onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}

                  slotProps={{
                    input: {
                      min: format(subDays(new Date(), 200), "yyyy-MM-dd"), max: format(new Date(), "yyyy-MM-dd")
                      // min: '07/06/2022',//'2018-06-07T00:00',
                      // max: '23/08/2023'//'2023-08-23T00:00'
                      ,
                    },
                  }}
                />
                {error.endDate && <FormHelperText className="td-red-500">{error.endDate}</FormHelperText>}
              </FormControl>

            </Box>


            <Box sx={{
              alignSelf: 'flex-end'

            }}>

              <Button loading={loading} type="submit"   >Generate Report</Button>
            </Box>

          </form>

          <Box sx={{ p: { xs: 2, sm: 4, md: 6 } }} ></Box>

        </Box>
      </Container>
    </div>
  );
}

export default ReportGeneration;
