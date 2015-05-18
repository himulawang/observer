/**
 * Created by ila on 5/18/2015.
 */
"use strict"
class SettingStore {
    static set(object) {
        const KEY = 'Setting';
        return localforage.setItem(KEY, object.toArray());
    }

    static get() {
        const KEY = 'Setting';
        return localforage.getItem(KEY).then(function (v) {
            return new Promise(function (resolve, reject) {
                let setting = new Setting();
                if (v) setting.fromArray(v);
                resolve(setting);
            });
        });
    }
}
