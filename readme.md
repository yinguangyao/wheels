## 轮子库
这个项目用来记录自己实现的各种库和框架。
### $.js
这是一个轻量的类jQuery库，目前仅支持选择器、链式调用、on事件绑定以及一些工具方法，后续会实现更多功能。
```
$.ready(() => {
    const tpl = $("#tpl").get(0).html()
    render(tpl, data, "#tabs");
    new Tabs({
        root: "#tabs",
        defaultKey: 1,
        onSelect: function(index) {
            console.log("this is index: " + index);
        }
    })
})
```
### Redux.js
这是一个轻量版的Redux-like库，几乎实现了Redux所有的功能，目前还没在实际项目使用，也不建议用到生产环境。
### Route.js
这是一个原生JS的前端路由，需要配合服务端使用。
使用方法： 
```
new Route({
    "/": function() { 
        //
    },
    "/user": function() { 
        //
    }
})
```
### template.js
这是一个简单的模板引擎。
语法和underscore和template保持一致，支持预编译，支持自定义语法和html实体编码。
```
<ul class="tab-nav-list">
    <%for(var i=0;i<tabs.length;i++) {%>
        <li class="tab-nav-item" data-index="<%=i%>"><%=tabs[i].nav%></li>
    <%}%>
</ul>
```