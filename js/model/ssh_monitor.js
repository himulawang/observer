/**
 * Created by ila on 5/9/2015.
 */
"use strict"
class SSHMonitor {
    constructor() {
        this._logs = [];
    }

    get profile() { return this._profile; }
    get handler() { return this._handler; }
    get sessionID() { return this._sessionID; }
    get title() { return this._title; }

    get logs() { return this._logs; }

    set profile(v) { this._profile = v; }
    set sessionID(v) { this._sessionID = v; }
    set title(v) { this._title = v; }
    set handler(v) { this._handler = v; }

    append(content) {
        while(this.logs.length >= CoreStyle.g.logLimitation) {
            this._logs.pop();
        }
        let contents = this.parseLog(content);
        contents.forEach(function(n) {
            this._logs.unshift(n);
        }.bind(this));
    }

    clear() {
        this._logs.splice(0);
    }

    parseLog(content) {
        let contents = content.split("\n");
        return contents;
    }
}