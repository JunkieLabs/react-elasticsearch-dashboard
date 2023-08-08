
import { Inter } from 'next/font/google'
import { Box } from '@mui/system'
import SideNav from '@/ui/common/side-nav/side-nav'

const inter = Inter({ subsets: ['latin'] })


export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (


    <Box  sx={{ display: 'flex', minHeight: '100dvh' }}>
      {/* <WaterMark /> */}

      <SideNav />

      {/* <Box>

      </Box> */}
      <Box component="main" className="MainContent" flex={1}>

        <Box className={`td-relative`}>{children}</Box>
      </Box>
    </Box>
  )
}
