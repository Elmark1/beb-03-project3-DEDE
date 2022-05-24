// import packages
import React, {useState} from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { Cookies } from "react-cookie";

const ModalBackdrop = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4);
`;

const ModalView = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  margin: auto;
  width: 25%;
  height: 45%;
  padding: 40px;
  text-align: center;
  background-color: rgb(255, 255, 255);
  border-radius: 10px;
  box-shadow: 0 2px 3px 0 rgba(34, 36, 38, 0.15);
`;

const ModalButton = styled.button.attrs(props => ({
  onClick: props.onClick,
}))`
  color: white;
  background: #00c2bd;
  padding: .375rem .75rem;
  border: 1px solid #00c2bd;
  borderRadius: .25rem;
  fontSize: 1rem;
  lineHeight: 1.5;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  cursor: pointer;
  width: 10em;
  margin: 5px auto;
`;

const TextInput = styled.input.attrs(props => ({
  type: props.type
}))`
  border: 1px solid black;
  margin: 5px auto;
  padding: 0.5px;
`;

const Alert = styled.div`
  margin: auto;
`;

const SwapModal = ({setIsSwapClicked}) => {
  const [amount, setAmount] = useState(0);
  const [password, setPassword] = useState('');

  const cookies = new Cookies();

  const klayToDede = async () => {
	const userId = cookies.get("userObjectId");
	await axios.post('http://localhost:4000/dexes/klaytodede', {userId, password, amount});
	setIsSwapClicked(false);
  }

  const dedeToKlay = async () => {
	const userId = cookies.get('userObjectId');
	await axios.post('http://localhost:4000/dexes/dedetoklay', {userId, password, amount});
	setIsSwapClicked(false);
  }

  return (
	<>
	  <ModalBackdrop>
		<ModalView>
		  <Alert>Amount</Alert>
		  <TextInput type={'text'} onChange={(e) => {setAmount(e.target.value);}}/>
		  <Alert>Password</Alert>
		  <TextInput type={'password'} onChange={(e) => {setPassword(e.target.value);}}/>
		  <ModalButton onClick={() => {klayToDede();}}>Klay To Dede</ModalButton>
		  <ModalButton onClick={() => {dedeToKlay();}}>Dede To Klay</ModalButton>
		  <ModalButton onClick={() => setIsSwapClicked(false)}>Close</ModalButton>
		</ModalView>
	  </ModalBackdrop>
	</>
  );
}

export default SwapModal;
