import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  Image,
  MenuItem,
} from "semantic-ui-react";
import { signOutUser } from "../auth/authActions";

const SignedInMenu = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector(state => state.auth);
  const history = useHistory();
  return (
    <MenuItem position="right">
      <Image avatar spaced="right" src={currentUser.photoURL || "/assets/user.png"} />
      <Dropdown pointing="top left" text={currentUser.email}>
        <DropdownMenu>
          <DropdownItem
            as={Link}
            to="/createEvent"
            text="Create Event"
            icon="plus"
          />
          <DropdownItem text="My profile" icon="user" />
          <DropdownItem onClick={() => {
            dispatch(signOutUser());
            history.push('/');
          }} text="Sign out" icon="power" />
        </DropdownMenu>
      </Dropdown>
    </MenuItem>
  );
};

export default SignedInMenu;
