import React, { FC } from 'react';
import styles from './ExpansonPanel.module.scss';
import * as Accordian from '@radix-ui/react-accordion';
import { AccordionContent, AccordionHeader } from '@/ui/widgets/joy/joyAccordion';
import Box from '@mui/joy/Box';
import List from '@mui/joy/List';


interface ExpansonPanelProps { }

const ExpansonPanel: FC<ExpansonPanelProps> = () => (
  <div className={styles.ExpansonPanel}>
    <List
      variant="outlined"
      className='td-bg-white'
      component={Accordian.Root}
      type="multiple"
      defaultValue={[]}
      sx={{
        borderRadius: "lg",
        "--ListDivider-gap": "0px",
        "--focus-outline-offset": "-2px"
      }}
    ><Accordian.Item key={1221} value="filtersAccordian" >
        <AccordionHeader isFirst={true} isLast={true} >
          <Box className="wase" sx={{
            display: 'flex',
            flexFlow: "row wrap",
            gap: "1rem"

          }}>
            <Box sx={{ height: 56 }}></Box>
          </Box>
        </AccordionHeader>

        <AccordionContent className='td-bg-white'>

          <Box sx={{
            display: "flex",
            flexDirection: "column",
            gap: {
              xs: "1.5rem", sm: "1.5rem"
            },
          }}>
          </Box>
        </AccordionContent>
      </Accordian.Item>
    </List>
  </div>
);

export default ExpansonPanel;
