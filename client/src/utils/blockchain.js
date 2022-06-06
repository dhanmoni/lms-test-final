import {ethers} from 'ethers'
import { alchemyUrl, contractABI, contractAddress } from './constants';
const {ethereum} = window;

let provider;
let signer
let appContract

if(!ethereum){
    console.log('Please install metamask!');
} else {
    provider = new ethers.providers.Web3Provider(window.ethereum)
    signer = provider.getSigner();
    appContract = new ethers.Contract(contractAddress, contractABI, signer)
}

export {
    provider,
    signer,
    appContract
}
