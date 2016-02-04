/*global angular*/
    
export class MainController {
    constructor(socket) {
        socket.on('news', (data) => {
            console.log(data);
        });
    }
}