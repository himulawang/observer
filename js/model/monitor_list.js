/**
 * Created by ila on 5/9/2015.
 */
"use strict"
class MonitorList {
    constructor() {
        this._list = new Map();
    }

    add(monitor) {
        this._list.set(monitor.socketID, monitor);
    }

    del(socketID) {
        return this._list.delete(socketID);
    }

    get(socketID) {
        return this._list.get(socketID);
    }

    nodeList() {
        let nodeList = [];
        for (let monitor of this._list.values()) {
            nodeList.push(monitor);
        }
        return nodeList;
    }
}