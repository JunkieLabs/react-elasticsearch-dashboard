import React, { FC } from 'react';
import styles from './SwitchTopSlow.module.scss';
import Stack from '@mui/joy/Stack';
import Switch from '@mui/joy/Switch';
import Typography from '@mui/joy/Typography';

interface SwitchTopSlowProps { }

const SwitchTopSlow: FC<SwitchTopSlowProps> = () => {

  const [dark, setDark] = React.useState<boolean>(false);
  return (
    <div className={styles.SwitchTopSlow}>
      {/* <Stack direction="row" spacing={2}> */}
      <Switch
        color={dark ? 'success' : 'warning'}
        slotProps={{ input: { 'aria-label': 'dark mode' } }}
        startDecorator={
          <Typography
            sx={{ color: dark ? 'text.tertiary' : 'warning.600' }}
          >Slow
          </Typography>
        }
        endDecorator={
          <Typography sx={{ color: dark ? 'success.500' : 'text.tertiary' }} >
            Top
          </Typography>
        }
        checked={dark}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          setDark(event.target.checked)
        }
      />

      {/* </Stack> */}
    </div>
  );
}

export default SwitchTopSlow;
