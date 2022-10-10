import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { Button } from 'react-bootstrap';
import { BsGraphUp, BsLightbulb, BsLightbulbOff } from 'react-icons/bs';
import { useContext } from 'react';
import { Context } from '../Context/ContextProvider';
import { useNavigate } from 'react-router';


export default function SiteHeader() {

  const navigate = useNavigate()

  const { theme, changeTheme } = useContext(Context)

  let buttonStyle = theme === "dark" ? "light" : "dark"

  return (
    <Navbar bg={theme} variant={theme}>
      <Container>
        <Navbar.Brand style={{ cursor: "pointer" }} onClick={() => { navigate("/StockTracker") }}>
          <div style={{display:"flex", alignItems: "center"}}>
            <BsGraphUp
              size="30px"
            />
            <span style={{ fontSize: "30px", marginLeft: "12px" }}>Stock Tracker</span>
          </div>
        </Navbar.Brand>
        <Nav className="justify-content-end">
          <Nav.Link style={{ cursor: "pointer" }} onClick={() => { navigate("/StockTracker/about") }}>About</Nav.Link>
          <Button
            style={{ marginLeft: "12px" }}
            onClick={() => {
              changeTheme();
            }}
            variant={`outline-${buttonStyle}`}
          >
            {theme !== "dark" ? <BsLightbulbOff /> : <BsLightbulb />}
          </Button>
        </Nav>
      </Container>
    </Navbar>
  );
}