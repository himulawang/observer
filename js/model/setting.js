/**
 * Created by ila on 5/18/2015.
 */
"use strict"
class Setting {
    constructor() {
        this.columns = 3;
        this.height = 230;
        this.logLimitation = 500;
    }
    get columns() { return this._columns; }
    get height() { return this._height + 'px'; }
    get heightNoUnit() { return this._height; }
    get logLimitation() { return this._logLimitation; }

    set columns(v) { this._columns = v.toString(); }
    set height(v) { this._height = v.toString(); }
    set heightNoUnit(v) { this._height = v.toString(); }
    set logLimitation(v) { this._logLimitation = v.toString(); }

    toArray() {
        return {
            columns: this.columns,
            height: this.heightNoUnit,
            logLimitation: this.logLimitation,
        }
    }

    fromArray(arr) {
        this.columns = arr.columns;
        this.height = arr.height;
        this.logLimitation = arr.logLimitation;
    }
}