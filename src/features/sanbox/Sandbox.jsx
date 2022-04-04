import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'semantic-ui-react';
import { openModal } from '../../app/common/modals/modalReducer';
import { decrement, increment } from './testReducer';

const Sandbox = () => {
  const data = useSelector(state => state.test.data);
  const [target, setTarget] = useState(null);
  const dispatch = useDispatch();
  const { loading } = useSelector(state => state.async);
  return (
    <>
      <h1>Testing 123</h1>
      <h3>The data is: {data}</h3>
      <Button name='increment' loading={loading && target === 'increment'} content='Increment' color='green' onClick={(e) => {
        dispatch(increment(10));
        setTarget(e.target.name);
      }} />
      <Button name='decrement' loading={loading && target === 'decrement'} content='Decrement' color='red' onClick={(e) => {
        dispatch(decrement(5));
        setTarget(e.target.name);
      }} />
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
