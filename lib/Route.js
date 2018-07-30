// 一个简单的路由
/* 使用方法： 
new Route({
    "/": function() { // },
    "/user": function() { // }
})
*/
(function() {
    const root = this;
    function noop() {}
    class Route {
        constructor(routeOptions = {}) {
            this.route = []
            $.each(routeOptions, (fn = noop, route = "") => {
                this.route[route] = fn;
            })
            this._init()
        }
        reflash() {
            const hash = this.getHash();
            this.route[hash]();
        }
        _init() {
            $(window).on("hashchange", () => {
                this.reflash();
            })
        }
        getHash() {
            return location.hash.slice(1) || "/"
        }
    }
    root.Route = Route
}.call(this))