import { Box } from "@mui/material"
import { Link } from "react-router-dom"

const rightLink = {
    fontSize: 16,
    color: 'common.white',
    ml: 3,
  };
  
export const LoginButtons = () => {
    return (
    <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
    <Link
      color="inherit"
      variant="h6"
      underline="none"
      href="/sign-in/"
      sx={rightLink}
    >
      {'Iniciar sesión'}
    </Link>
    <Link
      variant="h6"
      underline="none"
      href="/sign-up/"
      sx={{ ...rightLink, color: 'secondary.main' }}
    >
      {'Regístrate'}
    </Link>
  </Box>
    )
}