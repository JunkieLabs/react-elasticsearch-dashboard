## Environment dependence


Node.js Runtime: 18.x or newer; 


## UI check

- Every thing is made of @mui/joy and tailwindcss.
- For css styling, here most of the files are in scss. For 3rd party library css is used.


## Elastic Search API

- Verify that the Elastic Search Url and the index key for events and cities are according to elastic search db.

- Implement proper error handling and logging to diagnose issues with data retrieval or aggregation.


### Device Monitor Check

- if one device's last received timestamp matches with 2 hours +/- with current time, then, that device is connected state.

- if one device's last received timestamp is less than 168 hours +/- with current time, then, that device is active state.

- if one device's last received timestamp is greater than 168 hours +/- with current time, then, that device is inactive state.



## Dummy Auth API

- Remember that the Dummy Auth API is for development and testing purposes only. Replace it with a robust authentication system in future.

- Ensure that the email addresses should be there in the [`api.constants.ts`](\src\app\api\api.contants.ts).

---

This document serves as a reference for potential issues and considerations related to different parts of the project.