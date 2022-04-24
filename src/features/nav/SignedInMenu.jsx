import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { toast } from "react-toastify";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  Image,
  MenuItem,
} from "semantic-ui-react";
import { signOutFirebase } from "../../app/firestore/firebaseService";
import { signOutUser } from "../auth/authActions";


const SignedInMenu = () => {
  const dispatch = useDispatch();
  const { currentUserProfile } = useSelector(state => state.profile);
  const history = useHistory();

  const handleSignOut = async () => {
    try {
      history.push('/');
      await signOutFirebase();
      dispatch(signOutUser());
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <MenuItem position="right">
      <Image avatar spaced="right" src={currentUserProfile.photoURL || "/assets/user.png"} />
      <Dropdown pointing="top left" text={currentUserProfile.displayName}>
        <DropdownMenu>
          <DropdownItem
            as={Link}
            to="/createEvent"
            text="Create Event"
            icon="plus"
          />
          <DropdownItem as={Link} to={`/profile/${ currentUserProfile.id }`} text="My profile" icon="user" />
          <DropdownItem as={Link} to='/account' text="My account" icon="settings" />
          <DropdownItem onClick={handleSignOut} text="Sign out" icon="power" />
        </DropdownMenu>
      </Dropdown>
    </MenuItem>
  );
};

export default SignedInMenu;
