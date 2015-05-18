/**
 * Created by ila on 5/18/2015.
 */
"use strict"
class Util {
    static isInt(s) {
        if (s != null) {
            let r, re;
            re = /\d*/i;
            r = s.match(re);
            return r == s;
        }
        return false;
    }
}