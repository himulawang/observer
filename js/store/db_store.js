/**
 * Created by ila on 5/24/2015.
 */
"use strict"
class DBStore {
    static exportDB() {
        let waitList = [];
        let data = {};
        return localforage.keys().then(function(keys) {
            keys.forEach(function(key) {
                let promiseChild = new Promise(function(resolve, reject) {
                    localforage.getItem(key).then(function(v) {
                        data[key] = v;
                        resolve(data);
                    });
                });
                waitList.push(promiseChild);
            });

            return new Promise(function(resolve, reject) {
                return Promise.all(waitList).then(function() {
                    resolve(data);
                });
            })
        });
    }
    static importDB(data) {
        var waitList = [];
        for(let key in data) {
            let promiseChild = new Promise(function(resolve, reject) {
                localforage.setItem(key, data[key]).then(function() {
                    resolve();
                });
            });
            waitList.push(promiseChild);
        }
        return Promise.all(waitList);
    }
}
