import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { Button, Container, Menu, MenuItem } from "semantic-ui-react";
import SignedInMenu from "./SignedInMenu";
import SignedOutMenu from "./SignedOutMenu";

const NavBar = () => {
  const { authenticated } = useSelector(state => state.auth);

  return (
    <Menu inverted fixed="top">
      <Container>
        <MenuItem as={NavLink} exact to="/" header>
          <img src="/assets/logo.png" alt="logo" style={{ marginRight: 20 }} />
          Re-vents
        </MenuItem>
        <MenuItem as={NavLink} to="/events" name="Events" />
        <MenuItem as={NavLink} to="/sandbox" name="Sandbox" />
        {authenticated && (
          <MenuItem>
            <Button
              as={NavLink}
              to="/createEvent"
              positive
              inverted
              content="Create Events"
            />
          </MenuItem>
        )}

        {authenticated ? (
          <SignedInMenu  />
        ) : (
          <SignedOutMenu />
        )}
      </Container>
    </Menu>
  );
};

export default NavBar;
