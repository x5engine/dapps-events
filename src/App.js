import React, { useState, useEffect } from 'react';
import logo from './blockchain.svg';
import './App.css';
import { useToasts } from 'react-toast-notifications'

import Web3 from "web3"
import abi from "./abis/contract"

var EventGridClient = require("azure-eventgrid");
var msRestAzure = require('ms-rest-azure');
var uuid = require('uuid').v4;


const rpc = "https://x5engine.blockchain.azure.com:3200/E-FlUTqcGM65Si6SaBQwe6sg"

const web3 = new Web3(new Web3.providers.HttpProvider(rpc));



var myContract = new web3.eth.Contract(abi, '0xD40E842007B4Ec0421eF5CfB73AB8bB143d373e1');

let topicCreds = new msRestAzure.TopicCredentials('vKmSeQ7majfqJvA/eBGY/6PB9aD/swJcHHJhI2bRn2I=');
let EGClient = new EventGridClient(topicCreds, 'ca1f67a4-c5b3-43e7-9d3d-00cd0a0f4760');
let topicHostName = 'https://eventsgrid.westeurope-1.eventgrid.azure.net/api/events';
let events = [
  {
    id: uuid(),
    subject: 'TestSubject',
    dataVersion: '1.0',
    eventType: 'Microsoft.MockPublisher.TestEvent',
    data: {
      field1: 'value1',
      filed2: 'value2'
    }
  }
];

function App() {
  const [count, setCount] = useState(0);
  const [error, setError] = useState("");
  const { addToast } = useToasts()

  useEffect(() => {
    subscribe2Events()
  }, []);

  // 0x8fbf346523616c015d34c71713ea41bb98008282341b0f191f578d20d7ed26e2
  

  const subscribe2Events =  () => {

    // EGClient.publishEvents(topicHostName, events).then((result) => {
    //   return Promise.resolve(console.log('Published events successfully.', result));
    // }).catch((err) => {
    //   console.log('An error ocurred');
    //   console.dir(err, { depth: null, colors: true });
    // });

  }

  const onSubmit = async value => {

    if (error) {
      addToast(error.message, { appearance: 'error' })
    } else {
      addToast('Saved Successfully', { appearance: 'success' })
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          dApps Event
        </p>
        <a
          className="App-link"
          onClick={() => onSubmit("fgfddvvfdg")}
        >
          Azure Ethereum Blockchain
        </a>
      </header>
    </div>
  );
}

export default App;
