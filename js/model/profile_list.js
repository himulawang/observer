/**
 * Created by ila on 5/9/2015.
 */
"use strict"
class ProfileList {
    constructor(listArr) {
        this._list = new Map();

        if (Array.isArray(listArr)) this.fromArray(listArr);
    }

    add(profile) {
        this._list.set(profile.id, profile);
    }

    del(id) {
        return this._list.delete(id);
    }

    get(id) {
        return this._list.get(id);
    }

    nodeList() {
        let nodeList = [];
        for (let profile of this._list.values()) {
            nodeList.push(profile);
        }
        return nodeList;
    }

    toArray() {
        let listArr = [];
        for(let profile of this._list.values()) {
            listArr.push(profile.toArray());
        }
        return listArr;
    }

    fromArray(listArr) {
        for(let i in listArr) {
            let arr = listArr[i];
            if (arr['type'] === 'Redis') {
                this.add(new RedisProfile(arr));
            }
        }
    }
}
