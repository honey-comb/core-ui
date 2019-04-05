import Request from "./helpers/Request";
import Helpers from "./helpers/Helpers";
import Validation from "./helpers/Validation";
import UserService from "./services/UserService";
import Messages from "./helpers/Messages";

import Trans from "./helpers/Trans";
import ApiClient from "./helpers/ApiClient";

import AppConfig from "./config/App";
import AuthConfig from "./config/Auth";
import ViewConfig from "./config/View";

import ComponentsHolder from "./helpers/ComponentsHolder";
import ViewService from "./services/ViewService";

export const App = {
    init: function () {
        let client = new ApiClient();

        client.get(AppConfig.INITIAL_CONFIG_URL)
            .then(response => {
                App.services.view.set(response.data);

                App.render();
            });
    },

    config: {
        app: AppConfig,
        auth: AuthConfig,
        view: ViewConfig,
    },

    request: new Request(),
    helpers: new Helpers(),
    messageBag: new Messages(),
    validation: new Validation(),

    trans: (string, args, def) => Trans(string, args, def),

    services: {
        user: new UserService(),
        view: new ViewService(),
    },

    formFields: new ComponentsHolder('form-fields'),

    render: function () {
        console.log('render application');
    }
}
