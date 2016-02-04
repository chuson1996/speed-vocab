import {socket} from './factories/socket.js';
export function BootstrapFactories (factoryModule) {
    factoryModule
        .factory('socket', socket);
}