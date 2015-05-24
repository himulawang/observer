/**
 * Created by ila on 5/9/2015.
 */
"use strict";
class IDStore {
    static incr(step) {
        const KEY = 'ID';
        step = step || 0;
        return localforage.getItem(KEY).then(function (v) {
            return new Promise(function (resolve, reject) {
                    // init
                    if (v === null) {
                        return localforage.setItem(KEY, step).then(function() {
                            resolve(step);
                        });
                    }

                    // incr
                    let newV = parseInt(v) + step;
                    localforage.setItem(KEY, newV).then(function () {
                        resolve(newV);
                    });
                }
            );
        })
    }
}
