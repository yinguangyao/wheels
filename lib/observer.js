/**
 * params: name（string）
 * 用法：支持在相同页面的不同文件下使用，使用之前一定要传相同的name参数，否则发布和订阅无法关联到一起！！！
 * 例如在hotelList/view.js里面Observer("hotelList").subscribe("click", () => {})，在hotelList/controller.js里面Observer("hotelList").publish("click")
 */
const _ = {
    "each": function(arr, iterator) {
        if(!arr) {
            return;
        }
        arr.forEach(iterator);
    }
}
class Observer {
    static pageNames = [];
    static instance = null;
    static getInstance(name) {
        if (!name || typeof name !== "string") {
            throw "Observer's constructor need a param, and its type must be string";
        }
        if (Observer.pageNames.indexOf(name) >= 0) {
            return Observer.instance;
        }
        Observer.pageNames.push(name);
        return Observer.instance = new Observer(name);
    }
    _listeners = {};
    constructor(name) {
        if (!name || typeof name !== "string") {
            throw "Observer's constructor need a param, and its type must be string";
        }
        this.pageName = name;
        this._listeners[this.pageName] = {}
    }
    subscribe(event, cb) {
        (this._listeners[this.pageName][event] || (this._listeners[this.pageName][event] = [])).push(cb);
    }
    unsubscribe(event, cb) {
        if (!cb) {
            delete this._listeners[this.pageName][event];
            return;
        }
        _.each(this._listeners[this.pageName][event], (listener, index) => {
            if (listener === cb) {
                this._listeners[this.pageName][event].splice(index, 1);
            }
        });
    }
    publish(event, data) {
        _.each(this._listeners[this.pageName][event], (listener, index) => {
            if (typeof listener !== "function") {
                return;
            }
            listener(data);
        });
    }
}
// 避免用户直接用new来构造observer
const observerFactory = (pageName) => {
    return Observer.getInstance(pageName);
}
export default observerFactory;