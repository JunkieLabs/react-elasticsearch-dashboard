import React, { FC, MouseEventHandler, useEffect, useRef, useState } from 'react';
import styles from './DateRangeInput.module.scss';

import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import '@/resources/styles/datepicker-fix.css'
import Box from '@mui/joy/Box';
import { Button } from '@mui/joy';
import { DateRangePicker, RangeKeyDict, createStaticRanges } from 'react-date-range';
import { Popper, PopperPlacementType } from '@mui/base/Popper';
import { subDays, isSameDay, format } from 'date-fns';

import { ClickAwayListener } from '@mui/base/ClickAwayListener';
import ArrowDropDownRounded from '@mui/icons-material/ArrowDropDownRounded';

// TODO https://dev.to/nasreenkhalid/react-date-range-picker-1m1c

const dateRangeDefineds = {
  last7Days: subDays(new Date(), 7),
  last30Days: subDays(new Date(), 30),
  // endOfWeek: endOfWeek(new Date()),
  // startOfLastWeek: startOfWeek(addDays(new Date(), -7)),
  // endOfLastWeek: endOfWeek(addDays(new Date(), -7)),
  // startOfToday: startOfDay(new Date()),
  // endOfToday: endOfDay(new Date()),
  // startOfYesterday: startOfDay(addDays(new Date(), -1)),
  // endOfYesterday: endOfDay(addDays(new Date(), -1)),
  // startOfMonth: startOfMonth(new Date()),
  // endOfMonth: endOfMonth(new Date()),
  // startOfLastMonth: startOfMonth(addMonths(new Date(), -1)),
  // endOfLastMonth: endOfMonth(addMonths(new Date(), -1)),
};

const defaultStaticRanges = createStaticRanges([
  {
    label: 'Last 7 days',
    range: () => ({
      startDate: new Date(),
      endDate: dateRangeDefineds.last7Days,
    }),
  },
  {
    label: 'Last 30 days',
    range: () => ({
      startDate: new Date(),
      endDate: dateRangeDefineds.last30Days,
    }),
  },
] as any);

interface DateRangePickerState {
  startDate: Date
  endDate: Date
  key: string
}

interface DateRangeInputProps { }

const DateRangeInput: FC<DateRangeInputProps> = () => {

  // const [startDate, setStartDate] = useState(new Date());
  // const [endDate, setEndDate] = useState(new Date());

  const [state, setState] = useState<DateRangePickerState[]>([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const [selectedLabel, setSelectedLabel] = useState<string>()

  const anchorRef = useRef(null)
  const [anchorEl, setAnchorEl] = useState<HTMLAnchorElement | null>()
  const [isOpen, setIsOpen] = useState<boolean>(false)
  // const datePickerRef = useRef(null);
  // const anchorRef = useRef<HTMLAnchorElement |null>(null);
  // 


  // console.log("date: ", new Date(), subDays(new Date(), 20))

  useEffect(() => {

    var currentState = state[0];

    var filtered = defaultStaticRanges.filter((val) => {

      var range = val.range()
      var isSame = isSameDay(range.startDate ?? (new Date()), currentState.startDate)
      isSame = isSame ? isSameDay(range.endDate ?? (new Date()), currentState.endDate) : false
      return isSame;

    })

    if (filtered.length > 0) {
      setSelectedLabel(filtered[0].label ?? "");
    } else {
      setSelectedLabel(format(currentState.startDate, "dd/MM/yyyy") + " - " + format(currentState.endDate, "dd/MM/yyyy")
      );

    }


  }, state)

  // useEffect(() => {
  //   setStartDate(new Date());
  //   setEndDate(new Date());
  // }, []);

  useEffect(() => {

    if (anchorRef.current) {
      console.log("anchorEl", anchorRef.current)
      setAnchorEl((anchorRef.current ?? null as HTMLCanvasElement | null));
    }
    // setTimeout(() => setAnchorEl(anchorRef?.current), 1) 

  }, [anchorRef])

  const handleClick = () => {

    console.log("handleClick: ", isOpen)
    // if(!isOpen){
    setIsOpen(isOpen => !isOpen)

    // }

    // console.log("datePickerRef?.curren", datePickerRef?.current)
    // datePickerRef?.current?.open();
  };

  const clickAwayHandler = (event: MouseEvent | TouchEvent) => {

    console.log("clickAwayHandler: ", isOpen)

    // event.stopPropagation()
    // if(isOpen){
    setIsOpen(false)
    // }

  }

  return (
    <div className={styles.DateRangeInput}>


      <ClickAwayListener onClickAway={clickAwayHandler}>
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

          >{selectedLabel}</Button>
          {anchorEl &&

            <Popper
              // id="placement-popper"
              className="td-z-10"
              open={isOpen}
              anchorEl={anchorEl}
              placement={'bottom-end'}



            >
              <Box className="td-shadow-2xl td-bg-white td-rounded-sm td-outline-1"

                sx={{ display: 'flex' }}>
                <DateRangePicker
                  inputRanges={[]}
                  staticRanges={defaultStaticRanges}


                  onChange={(item: RangeKeyDict) => {
                    // item  
                    setState([item[`selection`] as DateRangePickerState])
                    console.log("onDateChange: ", item)

                  }}

                  // showSelectionPreview={true}
                  moveRangeOnFirstSelection={false}
                  months={2}
                  ranges={state}
                  direction="horizontal"
                // staticRanges={[]}
                // ref={datePickerRef}

                // startDate={startDate}
                // endDate={endDate}
                // onDateChange={({ startDate, endDate }) => {
                //   setStartDate(startDate);
                //   setEndDate(endDate);
                // }}
                />
              </Box>

            </Popper>}

        </Box>
      </ClickAwayListener>
    </div>
  );
}



export default DateRangeInput;
