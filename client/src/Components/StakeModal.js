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
  height: 35%;
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
  padding: 0.375rem 0.75rem;
  border: 1px solid #00c2bd;
  border-radius: 10px;
  width: 10em;
  cursor: pointer;
  margin: 0 auto 5px auto;
`;

const TextInput = styled.input.attrs(props => ({
  type: props.type
}))`
  height: 33px;
  padding-left: 10px;
  border: 1px solid grey;
  border-radius: 7px;
  margin-bottom: 15px;
`;

const Alert = styled.h2`
  margin-bottom: 5px;
`;

const StakeModal = ({setIsStakeClicked}) => {
  const [amount, setAmount] = useState(0);

  const cookies = new Cookies();

  const stake = async () => {
	const userObjectId = cookies.get("userObjectId");
	await axios.post('/stake', {userObjectId, amount});
	setIsStakeClicked(false);
  }

  const unstake = async () => {
	const userObjectId = cookies.get("userObjectId");
	await axios.post('/unstake', {userObjectId, amount});
	setIsStakeClicked(false);
  }

  return (
	<>
	  <ModalBackdrop>
		<ModalView>
		  <Alert>Amount</Alert>
		  <TextInput type={'text'} onChange={(e) => {setAmount(e.target.value);}}/>
		  <ModalButton onClick={() => {stake();}}>Stake</ModalButton>
		  <ModalButton onClick={() => {unstake();}}>Unstake</ModalButton>
		  <ModalButton onClick={() => setIsStakeClicked(false)}>Close</ModalButton>
		</ModalView>
	  </ModalBackdrop>
	</>
  );
}

export default StakeModal;
