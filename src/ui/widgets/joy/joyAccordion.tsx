'use client';

import * as React from "react";
import * as Accordion from "@radix-ui/react-accordion";
import { keyframes } from "@mui/system";
import Box, { BoxProps } from "@mui/joy/Box";
import ListItemButton, { ListItemButtonProps } from "@mui/joy/ListItemButton";
import ListItemContent from "@mui/joy/ListItemContent";
import Sheet from "@mui/joy/Sheet";
import ArrowDownwardRounded from '@mui/icons-material/ArrowDownwardRounded';
// import { ChevronDownIcon } from "@radix-ui/react-icons";

const slideDown = keyframes({
  from: { height: 0 },
  to: { height: "var(--radix-accordion-content-height)" }
});

const slideUp = keyframes({
  from: { height: "var(--radix-accordion-content-height)" },
  to: { height: 0 }
});

export const AccordionHeader = ({
  children,
  isFirst,
  isLast,
  sx,
  ...props
}: ListItemButtonProps & {
  /**
   * If `true`, the top border-radius is applied
   */
  isFirst?: boolean;
  /**
   * If `true`, the bottom border-radius is applied when closed
   */
  isLast?: boolean;
}) => (
  // <Box >{children}</Box>
  <ListItemButton 
  // className="td-rounded-lg"

    component={Accordion.Trigger}
    {...props}
    sx={[
      {
        width: "100%",
        color: "text.secondary",
        fontWeight: "md",
        "&:hover": {
          bgcolor: "background.surface"
        },
        ...(isFirst && {
          borderTopLeftRadius: "0.75rem",
          borderTopRightRadius: "0.75rem"
        }),
        ...(isLast && {
          '&[data-state="closed"]': {
            borderBottomLeftRadius: "0.75rem",
            borderBottomRightRadius: "0.75rem"
          }
        })
      },
      {
        '&[data-state="open"] > svg:last-child': {
          transform: "rotate(180deg)"
        }
      },
      ...(Array.isArray(sx) ? sx : [sx])
    ]}
  >
    <ListItemContent>{children}</ListItemContent>
    <ArrowDownwardRounded />
  </ListItemButton>
);

export const AccordionContent = ({
  children,
  isLast
}: BoxProps & {
  /**
   * If `true`, the bottom border-radius is applied
   */
  isLast?: boolean;
}) => (
  <Box
    component={Accordion.Content}
    sx={{
      borderRadius:"0.75rem",
      overflow: "hidden",
      // p: 1.5, ⚠️ Cannot use padding here, otherwise the animation is lagging. Not sure why.
      '&[data-state="open"]': {
        animation: `${slideDown} 300ms cubic-bezier(0.87, 0, 0.13, 1)`,
        ...(isLast && {
          "& > div": {
            borderBottomLeftRadius: "0.75rem",
            borderBottomRightRadius: "0.75rem",
            
          }
        })
      },
      '&[data-state="closed"]': {
        animation: `${slideUp} 300ms cubic-bezier(0.87, 0, 0.13, 1)`
      }
    }}
  >
    <Box
      //   variant="soft"
      sx={{
        borderTop: "1px solid",
        borderColor: "divider",
        p: 1.5
      }}
    >
      {children}
    </Box>
  </Box>
);
