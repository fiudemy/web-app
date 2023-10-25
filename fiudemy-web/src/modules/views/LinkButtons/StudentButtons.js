import { Box } from "@mui/material"
import { Link } from "react-router-dom"

const rightLink = {
    fontSize: 16,
    color: 'common.white',
    ml: 3,
  };
  
export const StudentButtons = () => {
    return (
    <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
    <Link
      color="inherit"
      variant="h6"
      underline="none"
      href="/student-home/"
      sx={rightLink}
    >
      {'Mis cursos'}
    </Link>
    <Link
      variant="h6"
      underline="none"
      href="/marketplace/"
      sx={{ ...rightLink, color: 'secondary.main' }}
    >
      {'Marketplace'}
    </Link>
  </Box>
    )
}