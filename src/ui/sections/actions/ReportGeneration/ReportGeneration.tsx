import React, { FC, FormEvent, useEffect, useState } from 'react';
import styles from './ReportGeneration.module.scss';
import Box from '@mui/joy/Box';
import { useDispatch, useSelector } from 'react-redux';
import Done from '@mui/icons-material/Done';
import { format, subDays } from 'date-fns';
import { FormControl, FormLabel, Input, FormHelperText, Checkbox, Button, Container } from '@mui/joy';
import error from 'next/error';
import Link from 'next/link';
import { RootState } from '@/domain/store/store';
import { StoreConstants } from '@/domain/store/store.constants';
import { StoreActionReportGeneration } from '@/domain/store/reportGeneration/reducer';
import {  exportToCsv2 } from '@/tools/csvDownload';

// import ObjectToCSV from 'objects-to-csv';

interface ReportGenerationProps { }

const ReportGeneration: FC<ReportGenerationProps> = () => {


  const dispatch = useDispatch()
  const [formData, setFormData] = useState({ startDate: "", endDate: "" });

  const [error, setError] = useState({ startDate: "", endDate: "" });
  // const [loading, setLoding] = useState<boolean>(false);
  const stateLogs = useSelector((state: RootState) => state.ReportGeneration.logs);


  const stateStage = useSelector((state: RootState) => state.ReportGeneration.stage);
  const stateFitlerDateRange = useSelector((state: RootState) => state.ReportGeneration.filterDateRange);

  useEffect(() => {

    if (stateFitlerDateRange.length > 0) {


      setFormData({
        startDate: `${format(stateFitlerDateRange[0], "yyyy-MM-dd")}`,
        endDate: `${format(stateFitlerDateRange[1], "yyyy-MM-dd")}`
      })
    }


  }, stateFitlerDateRange)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {


    console.log("handleSubmit", formData)

    event.preventDefault();

    if(stateStage == StoreConstants.reportGeneration.stage.initial){
      if (!formData.startDate) {
        setError({ ...error, startDate: "Start Date Required" })
        return;
      }
      if (!formData.endDate) {
        setError({ ...error, endDate: "End Date required" })
        return;
      }
  
      // var dateStart = Date.parse(formData.startDate);
      // console.log("DateStart: ", dateStart)
      dispatch(StoreActionReportGeneration.filterDateRange([new Date(Date.parse(formData.startDate)), new Date(Date.parse(formData.endDate))]))
      console.log("StoreActionReportGeneration: ")
  
    }else {

      downloadCSV();

    }
   
    // setLoding(true);

  }


  const downloadCSV = async () => {

    // let csv: any[] = [];
    const hits = stateLogs.map(log => log._source).map(log =>{
      
      var logw = Object.assign({}, log)
       logw = Object.assign(logw, {location: log.location.coordinates.join(","), 
       users_age: log.users_age.join(","),
       users_gender: log.users_gender.join(",")})
      return logw;
    } );
    // // [
    // //   { name: 'Alex', age: 25 },
    // //   { name: 'John', age: 30 },
    // //   { name: 'Mary', age: 20 },
    // // ];

    // hits.forEach((hit) => {
    //   let row: any[] = [];

    //   Object.keys(hit).forEach((key) => {
    //     row.push((hit as any)[key]);
    //   });

    //   csv.push(row.join(','));
    // });
    // const csv = new ObjectToCSV(hits);
 
    // const blob = new Blob([csv.join('\n')], { type: 'text/csv' });
    // const link = document.createElement('a');
    // link.href = window.URL.createObjectURL(blob);
    // link.download = 'data.csv';
    // document.body.appendChild(link);
    // link.click();

    exportToCsv2(`${formData.startDate}_${formData.endDate}`, hits);
    dispatch(StoreActionReportGeneration.clear())
    
    // await csv.toDisk('./test.csv');
  };

  console.log("new Date().toUTCString()", formData,);
  //  format(new Date(), "dd-MM-yyyy")
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
              <FormControl required disabled={stateStage != StoreConstants.reportGeneration.stage.initial} sx={{
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
                  value={formData.startDate}


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
              <FormControl required disabled={stateStage != StoreConstants.reportGeneration.stage.initial} sx={{
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
                  value={formData.endDate}
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

              <Button loading={stateStage == StoreConstants.reportGeneration.stage.loading} type="submit"   >{stateStage == StoreConstants.reportGeneration.stage.initial ? "Generate Report" : "Download Report"}</Button>
            </Box>

          </form>

          <Box sx={{ p: { xs: 2, sm: 4, md: 6 } }} ></Box>

        </Box>
      </Container>
    </div>
  );
}

export default ReportGeneration;
