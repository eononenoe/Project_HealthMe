import { AppBar, Toolbar, Typography, IconButton, Box } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";

const logoSrc = "/img/carrot.png"; // public 폴더 기준

export default function Topbar() {
  return (
    <AppBar
      position="fixed"
      color="default"
      elevation={1}
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <Toolbar sx={{ minHeight: "64px" }}>
        <Box display="flex" alignItems="center" flexGrow={1}>
          <img
            src={logoSrc}
            alt="Healthy Me Logo"
            style={{ height: 32, marginRight: 8 }}
          />
          <Typography variant="h6" fontWeight="bold" sx={{ color: "#FFA500" }}>
            HEALTHY_ME
          </Typography>
        </Box>
        <IconButton>
          <LogoutIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

