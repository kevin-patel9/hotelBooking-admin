import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { Hotel, RoomOutlined } from "@mui/icons-material";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import SettingsSystemDaydreamOutlinedIcon from "@mui/icons-material/SettingsSystemDaydreamOutlined";
import PsychologyOutlinedIcon from "@mui/icons-material/PsychologyOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { dark, light, loginFail } from '../../context/SearchContext'

const Sidebar = () => {

  const dispatch = useDispatch()

  const handleClick = () => {
    dispatch(loginFail())
  }

  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">lamadmin</span>
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">MAIN</p>
          <li>
            <DashboardIcon className="icon" />
            <span>Dashboard</span>
          </li>
          <p className="title">LISTS</p>
          <Link to="/admin/user" style={{ textDecoration: "none" }}>
            <li>
              <PersonOutlineIcon className="icon" />
              <span>Users</span>
            </li>
          </Link>
          <Link to="/admin/hotel" style={{ textDecoration: "none" }}>
            <li>
              <Hotel className="icon" />
              <span>Hotels</span>
            </li>
          </Link>
          <Link to="/admin/room" style={{ textDecoration: "none" }}>
          <li>
            <RoomOutlined className="icon" />
            <span>Rooms</span>
          </li>
          </Link>
          <p className="title">USEFUL</p>
          <li>
            <InsertChartIcon className="icon" />
            <span>Stats</span>
          </li>
          <li>
            <NotificationsNoneIcon className="icon" />
            <span>Notifications</span>
          </li>
          <p className="title">SERVICE</p>
          <li>
            <SettingsSystemDaydreamOutlinedIcon className="icon" />
            <span>System Health</span>
          </li>
          <li>
            <PsychologyOutlinedIcon className="icon" />
            <span>Logs</span>
          </li>
          <li>
            <SettingsApplicationsIcon className="icon" />
            <span>Settings</span>
          </li>
          <p className="title">USER</p>
          <li>
            <AccountCircleOutlinedIcon className="icon" />
            <span>Profile</span>
          </li>
          <li>
            <ExitToAppIcon className="icon" />
            <span onClick={()=> handleClick()}>Logout</span>
          </li>
        </ul>
      </div>
      <div className="bottom">
        <div
          className="colorOption"
          onClick={() => dispatch(light())}
        ></div>
        <div
          className="colorOption"
          onClick={() => dispatch(dark())}
        ></div>
      </div>
    </div>
  );
};

export default Sidebar;
