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
### observer.js
一个简单的发布订阅系统，支持在同一个页面的不同文件下使用，如下：
```
// hotelList/view.js
Observer("hotelList").subscribe("render", () => {});
// hotelList/controller.js
Observer("hotelList").publish("render");
```
### 基于react的Tab组件 ###
Tab组件接受defaultKey和onSelect两个参数。<br>
defaultKey是指默认的指定key值，用于第一次渲染的时候激活指定的tab。onSelect是一个函数，参数是当前激活状态tab的key值。<br>
TabPane组件作为Tab组件的插槽使用，接受currentKey和title两个参数。<br>
currentKey是指当前tab的key，title则是当前tab头部的名称。<br>
TabPane组件还会接受用户自定义的插槽，这个会当做tab的主体内容进行渲染，用户可以传入字符串或者自定义的DOM结构。<br>
代码链接：[Tab组件](https://github.com/yinguangyao/components) <br>
使用方式如下：
```javascript
const TabPage = () => {
    return (
        <Tabs 
            defaultKey={"b"} 
            isCirculate={true}
            auto={2000}
            speed={300}
        >
            <TabPane currentKey={"a"} title="选项卡1">
                <div className="pane-content">
                    这是选项卡1
                </div>
            </TabPane>
            <TabPane currentKey={"b"} title="选项卡2">
                <div className="pane-content">
                    这是选项卡2
                </div>
            </TabPane>
            <TabPane currentKey={"c"} title="选项卡3">
                <div className="pane-content">
                    这是选项卡3
                </div>
            </TabPane>
        </Tabs>
    )
}
```
