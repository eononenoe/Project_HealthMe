import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import HistoryIcon from "@mui/icons-material/History";
import { Link } from "react-router-dom";

const drawerWidth = 240;

export default function Sidebar() {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: "border-box",
          mt: "64px", // Topbar만큼 내려줌
        },
      }}
    >
      <List>
        <ListItem button component={Link} to="/">
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="대시 보드" />
        </ListItem>
        <ListItem button component={Link} to="/products">
          <ListItemIcon>
            <Inventory2Icon />
          </ListItemIcon>
          <ListItemText primary="상품 관리" />
        </ListItem>
        <ListItem button component={Link} to="/transactions">
          <ListItemIcon>
            <HistoryIcon />
          </ListItemIcon>
          <ListItemText primary="거래 내역 관리" />
        </ListItem>
      </List>
    </Drawer>
  );
}
