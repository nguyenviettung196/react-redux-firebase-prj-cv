import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'semantic-ui-react';
import { openModal } from '../../app/common/modals/modalReducer';
import { decrement, increment } from './testReducer';

const Sandbox = () => {
  const data = useSelector(state => state.test.data);
  const dispatch = useDispatch();
  return (
    <>
      <h1>Testing 123</h1>
      <h3>The data is: {data}</h3>
      <Button content='Increment' color='green' onClick={() => dispatch(increment(10))} />
      <Button content='Decrement' color='red' onClick={() => dispatch(decrement(5))} />
      <Button
        content='Open modal'
        color='teal'
        onClick={() => dispatch(
          openModal({
            modalType: 'TestModal',
            modalProps: { data }
          }))} /> {/*when open a modal,then hit a open modal function and executed,
          and get modal type and model props from payload and 
          return they're going to be part of store state.And inside modalManager,
          have something in currentModal listening what inside the state modals of store,
          then create ModalComponent and return renderedModal*/}
    </>
  );
};

export default Sandbox;
