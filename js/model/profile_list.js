/**
 * Created by ila on 5/9/2015.
 */
"use strict"
class ProfileList {
    constructor(listArr) {
        this._redisList = new Map();

        if (Array.isArray(listArr)) this.fromArray(listArr);
    }

    add(profile) {
        this._redisList.set(profile.id, profile);
    }

    del(id) {
        return this._redisList.delete(id);
    }

    get(id) {
        return this._redisList.get(id);
    }

    redisProfileNodeList() {
        let nodeList = [];
        for (let profile of this._redisList.values()) {
            if (profile.type === 'Redis') nodeList.push(profile);
        }
        return nodeList;
    }

    sshProfileNodeList() {
        let nodeList = [];
        for (let profile of this._redisList.values()) {
            if (profile.type === 'SSH') nodeList.push(profile);
        }
        return nodeList;
    }

    toArray() {
        let listArr = [];
        for(let profile of this._redisList.values()) {
            listArr.push(profile.toArray());
        }
        return listArr;
    }

    fromArray(listArr) {
        for(let i in listArr) {
            let arr = listArr[i];
            if (arr['type'] === 'Redis') {
                this.add(new RedisProfile(arr));
            } else if (arr['type'] === 'SSH') {
                this.add(new SSHProfile(arr));
            }
        }
    }
}
