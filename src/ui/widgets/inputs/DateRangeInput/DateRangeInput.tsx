import React, { FC, useEffect, useRef, useState } from 'react';
import styles from './DateRangeInput.module.scss';

import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import Box from '@mui/joy/Box';
import { Button } from '@mui/joy';
import { DateRangePicker, RangeKeyDict } from 'react-date-range';
import { Popper, PopperPlacementType } from '@mui/base/Popper';

import { ClickAwayListener  } from '@mui/base/ClickAwayListener';
import ArrowDropDownRounded from '@mui/icons-material/ArrowDropDownRounded';

// TODO https://dev.to/nasreenkhalid/react-date-range-picker-1m1c
interface DateRangeInputProps { }

const DateRangeInput: FC<DateRangeInputProps> = () => {

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const anchorRef = useRef(null)
  const [anchorEl, setAnchorEl] = useState<HTMLAnchorElement | null>()
  const [isOpen, setIsOpen] = useState<boolean>(false)
  // const datePickerRef = useRef(null);
  // const anchorRef = useRef<HTMLAnchorElement |null>(null);
  // 


  useEffect(() => {
    setStartDate(new Date());
    setEndDate(new Date());
  }, []);

  useEffect(() => {

    if (anchorRef.current) {
      console.log("anchorEl", anchorRef.current)
      setAnchorEl((anchorRef.current ?? null as HTMLCanvasElement | null));
    }
    // setTimeout(() => setAnchorEl(anchorRef?.current), 1) 

  }, [anchorRef])

  const handleClick = () => {
    setIsOpen(isOpen => !isOpen)
    // console.log("datePickerRef?.curren", datePickerRef?.current)
    // datePickerRef?.current?.open();
  };

  const clickAwayHandler = () =>{
    setIsOpen(false)
  }

  return (
    <div className={styles.DateRangeInput}>

      <Box sx={{
        display: 'flex',
        flexDirection: 'row'
      }}>

        <Button
          className={styles[`button`]} sx={{
            alignSelf: "center",
            p: `0.5rem`,
            borderRadius: "4rem",
            px: { xs: "2rem", sm: "3rem" }
          }}
          variant='soft'
          ref={anchorRef}
          onClick={handleClick}
          endDecorator={<Box className={styles[`button-icon`]} >
            <ArrowDropDownRounded /></Box>}

        ><span>Today</span></Button>
        {anchorEl && 
        
       <Popper
          id="placement-popper"
          open={isOpen}
          anchorEl={anchorEl}
          placement={'bottom-end'}


        >
           <ClickAwayListener onClickAway={clickAwayHandler}>
          <Box className="td-shadow-2xl td-bg-white td-rounded-sm td-outline-1">
            <DateRangePicker
              onChange={(item: RangeKeyDict) => {
                // item  
                // setState([item.selection])
                console.log("onDateChange: ", item)

              }}

              // showSelectionPreview={true}
              moveRangeOnFirstSelection={false}
              months={2}
              ranges={state}
              direction="horizontal"
            // ref={datePickerRef}

            // startDate={startDate}
            // endDate={endDate}
            // onDateChange={({ startDate, endDate }) => {
            //   setStartDate(startDate);
            //   setEndDate(endDate);
            // }}
            />
          </Box>

        </ClickAwayListener></Popper>}

      </Box>
    </div>
  );
}

export default DateRangeInput;
