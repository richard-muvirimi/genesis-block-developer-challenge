import base64 from "base-64";

export default class Utils {

    static get pathTask() {
        let path = window.location.pathname;

        return path.match(/.*[\\/](\d+)/)?.pop() || null;
    }

    static get token() {
        return sessionStorage.getItem("token") || "";
    }

    static set token(token) {
        sessionStorage.setItem("token", token);
    }

    static get userName() {
        let token = Utils.token;

        if (token.length != 0) {
            token = base64.decode(token);

            if (token.includes(":")) {
                return token.split(":")[0];
            }
        }
        return "";
    }

}