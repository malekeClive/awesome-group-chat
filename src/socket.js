import socketIOClient from 'socket.io-client';
import { URL, PORT } from './utils/url';

const socket = socketIOClient(`${URL}:${PORT}`);
export default socket;