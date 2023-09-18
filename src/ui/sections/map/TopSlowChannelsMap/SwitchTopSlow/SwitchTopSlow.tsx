import React, { FC } from 'react';
import styles from './SwitchTopSlow.module.scss';
import Stack from '@mui/joy/Stack';
import Switch from '@mui/joy/Switch';
import Typography from '@mui/joy/Typography';

interface SwitchTopSlowProps {
  onChange: (isTop: boolean) => void

  input: boolean
}

const SwitchTopSlow: FC<SwitchTopSlowProps> = (props) => {

  // const [dark, setDark] = React.useState<boolean>(props.input);
  return (
    <div className={styles.SwitchTopSlow}>
      {/* <Stack direction="row" spacing={2}> */}
      <Switch
        color={props.input ? 'success' : 'warning'}
        slotProps={{ input: { 'aria-label': 'dark mode' } }}
        startDecorator={
          <Typography
            sx={{ color: props.input ? 'text.tertiary' : 'warning.600' }}
          >Slow
          </Typography>
        }
        endDecorator={
          <Typography sx={{ color: props.input ? 'success.500' : 'text.tertiary' }} >
            Top
          </Typography>
        }
        checked={props.input}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          // setDark(event.target.checked)
          props.onChange(event.target.checked)
        }
        }
      />

      {/* </Stack> */}
    </div>
  );
}

export default SwitchTopSlow;
