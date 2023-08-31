import React, { FC, useEffect } from 'react';
import styles from './PickChannelsByBouquet.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { StoreSelectorsBouquets } from '@/domain/store/bouquets/selector';
import Box from '@mui/joy/Box';
import CircularProgress from '@mui/joy/CircularProgress';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import Checkbox from '@mui/joy/Checkbox';
import { StoreActionBouquets } from '@/domain/store/bouquets/reducer';
import Typography from '@mui/joy/Typography';

export interface PickChannelsByBouquetProps {

  bouquet: string

  checked: string[]
  setChecked: (bouquet: string, channels: string[]) => void

}

const PickChannelsByBouquet: FC<PickChannelsByBouquetProps> = (props) => {

  const dispatch = useDispatch();
  const stateChannels = useSelector(StoreSelectorsBouquets.channelsByBouquet(props.bouquet));

  const [checked, setChecked] = React.useState<string[]>(props.checked);
  // const originalArray = [1];//[1, 2, 3, 4, 5];


  // const newArray = originalArray.slice(0, 0).concat(originalArray.slice(4,5));

  // console.log(newArray); // [3, 4]

  // console.log("PickChannelsByBouquet stateChannels: ", stateChannels)

  useEffect(() => {
    // console.log("filterAgeRange: ", filterAgeRange, filterAgeDefaultRange, filterAgeDefaultRange === filterAgeRange)

    // console.log("PickChannelsByBouquet dispatch initChannelsForBouquet: ", props.bouquet)
    dispatch(StoreActionBouquets.initChannelsForBouquet(props.bouquet))
    return () => { }

  }, []);

  const handleChecked = (channelName: string) => (event: { target: { checked: boolean; }; }) => {
    // const newSelections = [...filterItem.selections];

    console.log("handleChecked: ", channelName, event.target.checked)

    // var index = filtersState.findIndex(val => val.name == filterItem.name);
    // if(index >= 0){
    //   var updatedFilter = filtersState[index];

    //   updatedFilter.isEnabled = event.target.checked??true;
    //   // dispatch(StoreActionConfiguration.setFilterState(updatedFilter));
    // }

    var index = checked.indexOf(channelName)

    var newChecked = checked.slice()

    if (index >= 0) {
      newChecked.splice(index, 1);
      // props.setChecked(newChecked)

    } else {

      newChecked.push(channelName);
      // props.setChecked(newChecked)
    }
    setChecked(newChecked);

    props.setChecked(props.bouquet, newChecked);


    // var filterItemUpdated =Object.assign({}, channelName,  {
    //   isEnabled: event.target.checked
    // })
    // filterItem
    // filterItemUpdated.isEnabled = event.target.checked
    // dispatch(StoreActionConfiguration.updateFilter(filterItemUpdated));



  };

  return (
    <Box className={styles.PickChannelsByBouquet} sx={{
      width: `100%`,
      flex: `1 1 0%`,
      display: 'flex',
      overflow: 'auto',
      flexDirection: "column"
    }}>




      {(stateChannels.length == 0) && <Box sx={{
        width: `100%`,
        flex: `1 1 0%`,
        alignItems: "center",
        display: 'flex',
        justifyContent: 'center'
      }}>
        <CircularProgress />
      </Box>}

      {(stateChannels.length > 0) &&

        <Box sx={{
          width: `100%`,
          flex: `1 1 0%`,
          overflowY: 'scroll',
        }}>
          <List sx={{ display: "flex", flexDirection: "column", width: '100%', bgcolor: 'background.paper' }}>
            {stateChannels.map((value) => {
              const labelId = `checkbox-list-label-${value}`;

              return (
                <ListItem
                  key={value}
                  sx={{
                    gap: 2
                  }}

                >


                  <Checkbox
                    checked={checked.indexOf(value) !== -1}
                    onChange={
                      handleChecked(value)

                      // setStatus({ ...status, declinedPayment: event.target.checked })
                    }
                  />
                  <Typography id={labelId} sx={{
                    flex: '1 1 0%'
                  }} >{value}</Typography>
                  {/* <ol id={labelId} >{value}</ol> */}

                </ListItem>
              );
            })}
          </List>
        </Box>}
    </Box>
  );
}

// handleToggle(value)

export default PickChannelsByBouquet;
