import React, { FC } from 'react';
import styles from './PickChannelsByBouquet.module.scss';
import { useSelector } from 'react-redux';
import { StoreSelectorsBouquets } from '@/domain/store/bouquets/selector';
import Box from '@mui/joy/Box';
import CircularProgress from '@mui/joy/CircularProgress';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import IconButton from '@mui/joy/IconButton';
import Checkbox from '@mui/joy/Checkbox';
import ListItemButton from '@mui/joy/ListItemButton';
import ArrowDownwardRounded from '@mui/icons-material/ArrowDownwardRounded';

interface PickChannelsByBouquetProps {

  bouquet: string
}

const PickChannelsByBouquet: FC<PickChannelsByBouquetProps> = (props) => {
  const stateChannels = useSelector(StoreSelectorsBouquets.channelsByBouquet(props.bouquet));

  const [checked, setChecked] = React.useState<string[]>([]);
  // const originalArray = [1];//[1, 2, 3, 4, 5];


  // const newArray = originalArray.slice(0, 0).concat(originalArray.slice(4,5));

  // console.log(newArray); // [3, 4]

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
    if (index >= 0) {
      checked.splice(index, 1);
      setChecked(checked.slice())

    } else {

      checked.push(channelName);
      setChecked(checked)
    }
    // var filterItemUpdated =Object.assign({}, channelName,  {
    //   isEnabled: event.target.checked
    // })
    // filterItem
    // filterItemUpdated.isEnabled = event.target.checked
    // dispatch(StoreActionConfiguration.updateFilter(filterItemUpdated));



  };

  return (
    <div className={styles.PickChannelsByBouquet}>

      <Box sx={{
        display: "flex",
        flexDirection: "column"
      }}>



        {!stateChannels && <Box sx={{
          height: 56,
          alignSelf: 'center',
          justifySelf: 'center'
        }}>
          <CircularProgress />
        </Box>}

        {stateChannels && <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
          {stateChannels.map((value) => {
            const labelId = `checkbox-list-label-${value}`;

            return (
              <ListItem
                key={value}

              >
                <ListItemButton role={undefined} onClick={() => {


                }} >

                  <Checkbox
                    checked={checked.indexOf(value) !== -1}
                    onChange={
                      handleChecked(value)

                      // setStatus({ ...status, declinedPayment: event.target.checked })
                    }
                  />

                  <ol id={labelId} >{value}</ol>
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>}
      </Box>
    </div>
  );
}

// handleToggle(value)

export default PickChannelsByBouquet;
