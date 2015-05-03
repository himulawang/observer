/**
 * Created by ila on 5/9/2015.
 */
"use strict";
class Profile {
    constructor(arr) {
        this._logs = [];
        this.socketID = -1;

        if (arr !== undefined) this.fromArray(arr);
    }
    get id() { return this._id; }
    get type() { return this._type; }
    get name() { return this._name; }
    get host() { return this._host; }
    get port() { return this._port; }
    get password() { return this._password; }
    get socketID() { return this._socketID; }
    get label() { return this._label; }

    get logs() { return this._logs; }

    set id(v) { this._id = v.toString(); }
    set type(v) { this._type = v; }
    set name(v) { this._name = v; }
    set host(v) { this._host = v; }
    set port(v) { this._port = parseInt(v); }
    set password(v) { this._password = v; }
    set socketID(v) { this._socketID = v; }
    set label(v) { this._label = v; }

    append(content) {
        this._logs.push(content);
    }

    clear() {
        this._logs.splice(0);
    }

    toArray() {
        return {
            id: this.id,
            type: this.type,
            name: this.name,
            host: this.host,
            port: this.port,
            password: this.password,
            label: this.label,
        };
    }

    fromArray(arr) {
        this.id = arr.id;
        this.type = arr.type;
        this.name = arr.name;
        this.host = arr.host;
        this.port = arr.port;
        this.password = arr.password;
        this.label = arr.label;
    }
}
