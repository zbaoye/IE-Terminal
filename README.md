# IE-Terminal
一个模仿微信的完整React-Native项目，使用WebSocket实现后台数据传输。

## TODO:
* 数据库表单设计
* 最近聊天对话框
* 最近聊天记录数据存储


## Installation
1. npm install
2. React-Native-Webview-Crosswalk项目配置[GitHub](https://github.com/jordansexton/react-native-webview-crosswalk)
3. React-Native-Splashscreen[GitHub](https://github.com/remobile/react-native-splashscreen)
4. React-Native-Sqlite-Storage[GitHub](https://github.com/andpor/react-native-sqlite-storage)

## Tips & Tricks
### Database
* [react-native-sqlite-storage](https://github.com/andpor/react-native-sqlite-storage)
* [Cordova-sqlite-storage](https://github.com/jbrodriguez/react-native-android-sqlite)

### React-Native-Socket.io
使用原生socket.io-client[stackoverflow](http://stackoverflow.com/questions/29408492/is-it-possible-to-combine-react-native-with-socket-io)  
>踩了两个GitHub坑，[坑1](https://github.com/qiepeipei/react-native-socket.io)连接不上服务器，返回isConnect==false。[坑2](https://github.com/gcrabtree/react-native-socketio)只适配到0.25.0，在0.28.0版本中socket.initialize函数被弃用，导致无法连接。

## Pitfalls
1. Passing keys to children in React.js [stackoverflow](http://stackoverflow.com/questions/30465651/passing-keys-to-children-in-react-js)
2. TODO

## Others
不知道怎么分类。囧
### Java于JavaScript通信
由于项目需求，需要内嵌一个类似WebView以复用以前项目，CrossWalk基于Chromium


### 
## Reference
1. [awesome-react-native](https://github.com/jondot/awesome-react-native)