import {MainController} from './controllers/main.js';
export function BootstrapControllers (controllerModule) {
    controllerModule
        .controller('MainController', MainController);
}