
import { Inter } from 'next/font/google'
import { Box } from '@mui/system'

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (

  
        <Box className={`td-relative td-min-h-screen`}
        sx={{
            display:"flex",
            alignItems:"center",
            justifyContent:"center"
        }}
        >
          {/* <WaterMark /> */}
          <Box>

          </Box>
          <Box className={`td-relative td-w-full sm:td-max-w-md`}>{children}</Box>

        </Box>
  )
}
