/**
 * Created by ila on 5/9/2015.
 */
"use strict";
class SessionIDStore {
    constructor() {
        this.id = 0;
    }
    incr() {
        return ++this.id;
    }
}
