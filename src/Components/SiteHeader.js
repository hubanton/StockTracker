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

  const {theme, changeTheme} = useContext(Context)

  let buttonStyle = theme === "dark" ? "light" : "dark"
  
  return (
    <Navbar bg={theme} variant={theme}>
      <Container>
        <Navbar.Brand style={{cursor: "pointer"}} onClick={() => {navigate("/StockTracker")}}>
          <BsGraphUp style={{
            width: "30",
            height: "30",
            marginLeft: "10",
            marginRight: "10"
          }}
            className="d-inline-block align-top"
          />
          Stock Tracker
        </Navbar.Brand>
        <Nav className="justify-content-end">
          <Nav.Link style={{cursor: "pointer"}} onClick={() => {navigate("/StockTracker/about")}}>About</Nav.Link>        
              <Button
                style={{marginLeft: "12px"}}
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