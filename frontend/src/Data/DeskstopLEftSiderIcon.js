import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import ExploreOutlinedIcon from "@mui/icons-material/ExploreOutlined";
import VideocamOutlinedIcon from "@mui/icons-material/VideocamOutlined";
import MailOutlinedIcon from "@mui/icons-material/MailOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import ProfileIcon from "@mui/icons-material/PersonOutlineOutlined";
import SettingsIcon from '@mui/icons-material/Settings';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';


const DeskstopLEftSiderIcon = [
  { name: "Home", icon: HomeIcon }, // Use the component reference instead of JSX
  { name: "Search", icon: SearchIcon },
  { name: "Explore", icon: ExploreOutlinedIcon },
  { name: "Reels", icon: VideocamOutlinedIcon },
  { name: "Messages", icon: MailOutlinedIcon },
  { name: "Notifications", icon: NotificationsNoneOutlinedIcon },
  { name: "Create", icon: AddOutlinedIcon },
  { name: "Profile", icon: ProfileIcon },
];
 
const bottomIcon = [
    { name: "Settings", icon: SettingsIcon },
    { name: "AI Studio", icon: AutoFixHighIcon },
]


export {DeskstopLEftSiderIcon, bottomIcon };
