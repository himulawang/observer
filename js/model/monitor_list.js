/**
 * Created by ila on 5/9/2015.
 */
"use strict"
class MonitorList {
    constructor() {
        this._orderList = [];
        this._redisList = new Map();
        this._sshList = new Map();
    }

    addRedis(monitor) {
        let socketID = monitor.socketID;
        this._orderList.push(this._getRedisOrderKey(socketID));
        this._redisList.set(socketID, monitor);
    }
    delRedis(socketID) {
        let key = this._getRedisOrderKey(socketID);
        this._deleteFromOrderList(key);
        this._redisList.delete(socketID);
    }
    getRedis(socketID) {
        return this._redisList.get(socketID);
    }
    _getRedisOrderKey(v) {
        return 'Redis' + v;
    }
    _getSocketIDByRedisKey(k) {
        return k.substr(5);
    }

    addSSH(monitor) {
        let sessionID = monitor.sessionID;
        this._orderList.push(this._getSSHOrderKey(sessionID));
        this._sshList.set(sessionID, monitor);
    }
    delSSH(sessionID) {
        let key = this._getSSHOrderKey(sessionID);
        this._deleteFromOrderList(key);
        this._sshList.delete(sessionID);
    }
    getSSH(sessionID) {
        return this._sshList.get(sessionID);
    }
    _getSSHOrderKey(v) {
        return 'SSH' + v;
    }
    _getSessionIDBySSHKey(k) {
        return k.substr(3);
    }

    _deleteFromOrderList(key) {
        let index = this._orderList.indexOf(key);
        if (index === -1) return;
        this._orderList.splice(index, 1);
    }

    nodeList() {
        let nodeList = [];
        this._orderList.forEach(function(key) {
            if (key.startWith('Redis')) {
                let socketID = this._getSocketIDByRedisKey(key);
                nodeList.push(this.getRedis(socketID));
            } else if (key.startWith('SSH')) {
                let sessionID = this._getSessionIDBySSHKey(key);
                nodeList.push(this.getSSH(sessionID));
            }
        }.bind(this));
        return nodeList;
    }
}
