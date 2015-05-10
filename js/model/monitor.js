/**
 * Created by ila on 5/9/2015.
 */
"use strict"
class Monitor {
    constructor() {
        this._logs = [];
    }

    get profile() { return this._profile; }
    get socketID() { return this._socketID; }

    get logs() { return this._logs; }

    set profile(v) { this._profile = v; }
    set socketID(v) { this._socketID = v; }

    append(content) {
        content = this.parseTimeLog(content);
        this._logs.unshift(content);
    }

    clear() {
        this._logs.splice(0);
    }

    parseTimeLog(content) {
        var regexp = /^(\d{10})(\.)(\d{6})(.*)/;

        if (!regexp.test(content)) return content;

        var timestamp = RegExp.$1;
        var ms = RegExp.$3;

        var d = new Date(timestamp * 1000);
        var hh = d.getHours().toString();
        var mm = d.getMinutes().toString();
        var ss = d.getSeconds().toString();

        if (hh.length === 1) hh = '0' + hh;
        if (mm.length === 1) mm = '0' + mm;
        if (ss.length === 1) ss = '0' + ss;

        return hh + ':' + mm + ':' + ss + '.' + ms + RegExp.$4;
    }
}