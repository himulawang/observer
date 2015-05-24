/**
 * Created by ila on 5/9/2015.
 */
"use strict";
class SSHProfile extends Profile {
    constructor(arr) {
        super(arr);

        this.type = 'SSH';
        if (arr !== undefined) this.fromArray(arr);
    }

    get user() { return this._user; }
    get filePath() { return this._filePath; }

    set user(v) { this._user = v; }
    set filePath(v) { this._filePath = v; }

    toArray() {
        let arr = super.toArray();
        arr['user'] = this.user;
        arr['filePath'] = this.filePath;
        return arr;
    }

    fromArray(arr) {
        this.user = arr.user;
        this.filePath = arr.filePath;
        super.fromArray(arr);
    }
}
