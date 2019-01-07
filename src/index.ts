export { default as Config } from './Config';
export { default as Api } from './Library/Api';
export { default as ResponseInterface } from './Library/API/ResponseInterface';

/*
 * Models.
 */
import NotificationModel from './Library/App/State/Models/Notification';

export namespace Models {
    export class Notification extends NotificationModel {}
}

import App from './App';
export default App;
