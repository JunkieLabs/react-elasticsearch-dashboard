
import { Inter } from 'next/font/google'
import { Box } from '@mui/system'

const inter = Inter({ subsets: ['latin'] })


export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (


        <Box className={`td-relative`}>
          {/* <WaterMark /> */}
          <Box>

          </Box>
          <Box className={`td-relative`}>{children}</Box>

        </Box>
  )
}
