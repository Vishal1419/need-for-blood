window.navigator.userAgent = 'react-native';
import io from 'socket.io-client/dist/socket.io';

import { SERVER_URL } from './server';

export let socket = '';

export const connectToSocketIO = () => {
  socket = io.connect(SERVER_URL, { jsonp: true });
}

export const disconnectFromSocketIO = () => {
  socket.disconnect();
}