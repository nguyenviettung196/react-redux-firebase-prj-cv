import React from 'react';
import { useSelector } from 'react-redux';
import LoginForm from '../../../features/auth/LoginForm';
import RegisterForm from '../../../features/auth/RegisterForm';
import TestModal from '../../../features/sanbox/TestModal';

export default function ModalManager() {
  const modalLookup = {
    TestModal,
    LoginForm,
    RegisterForm

  }; //check type of modal want to open
  const currentModal = useSelector(state => state.modals); // useSelector to find out current modal is
  let renderedModal;
  if (currentModal) {
    const { modalType, modalProps } = currentModal; // if currentmoda exist then access to the modal type and modal props
    const ModalComponent = modalLookup[modalType]; // create a new modal component,and set it to the type of modal going to be opening
    renderedModal = <ModalComponent {...modalProps} />;// create a rendered modal,that pass in modal component with any properties
  }
  return (
    <span>{renderedModal}</span> // when open a modal,then something inside state.modals
  );
}
