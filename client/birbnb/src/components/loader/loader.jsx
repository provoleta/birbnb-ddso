import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'

export default function CircularIndeterminate({ fullScreen = false }) {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: fullScreen ? '100vh' : '200px',
        width: fullScreen ? '100vw' : '100%',
        position: fullScreen ? 'fixed' : 'relative',
        top: fullScreen ? 0 : 'auto',
        left: fullScreen ? 0 : 'auto',
        zIndex: fullScreen ? 1300 : 'auto',
      }}
    >
      <CircularProgress />
    </Box>
  )
}
