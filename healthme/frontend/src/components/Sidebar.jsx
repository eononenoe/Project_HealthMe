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
import CampaignIcon from "@mui/icons-material/Campaign"; // 공지 관리 아이콘
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
          top: "64px", // Topbar만큼 내려줌
        },
      }}
    >
      <List>
        <ListItem button component={Link} to="/admin">
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="대시 보드" />
        </ListItem>

        <ListItem button component={Link} to="/admin/products">
          <ListItemIcon>
            <Inventory2Icon />
          </ListItemIcon>
          <ListItemText primary="상품 관리" />
        </ListItem>

        <ListItem button component={Link} to="/admin/transactions">
          <ListItemIcon>
            <HistoryIcon />
          </ListItemIcon>
          <ListItemText primary="거래 내역 관리" />
        </ListItem>

        {/* 공지 관리 메뉴 추가 */}
        <ListItem button component={Link} to="/admin/announcements">
          <ListItemIcon>
            <CampaignIcon />
          </ListItemIcon>
          <ListItemText primary="공지 관리" />
        </ListItem>
      </List>
    </Drawer>
  );
}
