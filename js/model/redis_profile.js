/**
 * Created by ila on 5/9/2015.
 */
"use strict";
class RedisProfile extends Profile {
    constructor(arr) {
        super(arr);

        this.type = 'Redis';
        if (arr !== undefined) this.fromArray(arr);
    }

    get db() { return this._db; }

    set db(v) { this._db = v; }

    toArray() {
        let arr = super.toArray();
        arr['db'] = this.db;
        return arr;
    }

    fromArray(arr) {
        this.db = arr.db;
        super.fromArray(arr);
    }
}
