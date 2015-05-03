/**
 * Created by ila on 5/9/2015.
 */
"use strict"
class ProfileListStore {
    static update(profileList) {
        const KEY = 'ProfileList';
        let listArr = profileList.toArray();
        return localforage.setItem(KEY, listArr);
    }

    static get() {
        const KEY = 'ProfileList';
        return localforage.getItem(KEY).then(function (v) {
            return new Promise(function (resolve, reject) {
                resolve(new ProfileList(v));
            });
        });
    }
}
