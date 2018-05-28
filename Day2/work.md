## 问答题
### 1、babel 是什么，我们为什么要使用 babel？
1）Babel 是一个JavaScript 编译器，可以将 ES6 代码转为 ES5 代码；  
2）因为使用babel对代码进行转码，既能保证浏览器兼容性，还能提升JavaScript的执行速度，此外，babel还支持许多不同的构建&测试系统，使开发者很容易将它集成到自己的工具链中。

### 2、我们使用 babel 把 es6 的代码编译为 es5代码后，为什么还需要引入 polyfill？
因为Babel 默认只转换新的 JavaScript 句法（syntax），而不转换新的 API，比如Iterator、Generator、Set、Maps、Proxy、Reflect、Symbol、Promise等全局对象，以及一些定义在全局对象上的方法（比如Object.assign）都不会转码。

### 3、如下代码输出是什么？为什么？请写出js解释器实际执行的等效代码
```
 var v='Hello World';
 (function(){
     console.log(v)
     var v='I love you'
 })()
 ```
 **输出：** 
  ```
  undefined
```
 **原因：** 变量v用var申明，会发生”变量提升“。导致内层的v变量覆盖了外层的v变量。  
 **等效代码：**
 ```
var v='Hello World';
(function(){
    var v
    console.log(v)
    v='I love you'
})()
 ```
### 4、如下代码输出是什么？为什么？请写出js解释器实际执行的等效代码
```
 function main(){ 
     console.log(foo)      // ?
     var foo = 10
     console.log(foo)      // ?
     function foo(){ 
         console.log("我来自 foo")
     }
     console.log(foo)      // ?
 }
 main()
 ```
**输出：** 
  ```
   [Function: foo] 
   10 
   10   
  ```
**原因：** 因为在main函数内申明的foo函数会被提升到函数的头部  
**等效代码：**
 ```
function main(){ 
  function foo(){ 
    console.log("我来自 foo")
}
  console.log(foo)      // ?
  var foo = 10
  console.log(foo)      // ?
  console.log(foo)      // ?
}
main()
 ```
### 5、如下代码输出是什么？为什么？请写出js解释器实际执行的等效代码
```
 var a = 10;
 function main(){
     console.log(a);        // ?
     var a = 20;
     console.log(a);        // ?
     (function(){
         console.log(a);     // ?
         var a = 30;
         console.log(a);     // ?
     })()
     console.log(a);        // ?
 }
 main()
 ```
**输出：** 
```
  undefined
  20
  undefined
  30
  20
```
**原因：** 在main函数内部用var申明的a变量会覆盖外层变量，提升到函数头部，所以第一打印的是undefined，然后a被赋值，所以第二次打印的是20，而在立即执行函数里面申明的a变量也会提升到函数头部，所以第三次打印的也是undefined，但立即执行函数内部的变量不会污染外层的变量a，所以最后一次打印的还是20.  
**等效代码：**
 ```
var a = 10;
function main(){
    var a
    console.log(a);        // undefined
    a = 20;
    console.log(a);        // 20
    (function(){
        var a
        console.log(a);     // undefined
        a = 30;
        console.log(a);     // 30
    })()
    console.log(a);        // 20
}
main()
 ```
### 6、为什么点击所有的button打印出来的都是5而非0,1,2,3,4？要怎么修改？
```
 <!DOCTYPE html>
 <html>
 <head>
 <meta charset="utf-8">
 <meta name="viewport" content="width=device-width">
 <title>JS Bin</title>
 <script src="https://code.jquery.com/jquery-3.1.0.js"></script>
 </head>
 <body>
 <ul>
     <li><button>0</button></li>
     <li><button>1</button></li>
     <li><button>2</button></li>
     <li><button>3</button></li>
     <li><button>4</button></li>
 </ul>
 <script>
 var buttons = $("button")
 for(var i=0;i<buttons.length;i++){
     buttons[i].onclick = function(){
         console.log(i)
     }
 }
 </script>
 </body>
 </html>
 ```
**原因：** 因为用来计数的循环变量 i 泄露为了全局变量  
**等效代码：**
 ```
 <!DOCTYPE html>
 <html>
 <head>
 <meta charset="utf-8">
 <meta name="viewport" content="width=device-width">
 <title>JS Bin</title>
 <script src="https://code.jquery.com/jquery-3.1.0.js"></script>
 </head>
 <body>
 <ul>
     <li><button>0</button></li>
     <li><button>1</button></li>
     <li><button>2</button></li>
     <li><button>3</button></li>
     <li><button>4</button></li>
 </ul>
 <script>
 var buttons = $("button")
 for(let i=0;i<buttons.length;i++){
     buttons[i].onclick = function(){
         console.log(i)
     }
 }
 </script>
 </body>
 </html>
 ```
### 7、什么是解构？数组解构是什么？
ES6 允许按照一定模式，从数组和对象中提取值，对变量进行赋值，这被称为解构（Destructuring）。  
如下面代码所示，从数组中提取值，按照对应位置，对变量赋值称为数组解构.
```
let [a, b, c] = [1, 2, 3];
```

### 8、什么是解构默认值？怎样使用？
解构赋值允许指定默认值,只有当一个数组成员严格等于undefined，默认值才会生效。如果默认值是一个表达式，那么这个表达式是惰性求值的，即只有在用到的时候，才会求值。

### 9、下面代码执行会报错吗？为什么？
```
 let foo;
 let {foo} = {foo: 1}
 ```
 **解答：** 会报错，因为let不允许在相同作用域内，重复声明同一个变量，此处的foo被重复申明。
### 10、下面代码执行结果是什么？会报错吗？
```
const {"0": a,"1": b} = ["foo", "bar"];
```
**解答：** 不会报错,因为数组的元素是按次序排列的，变量的取值由它的位置决定；此处数组的键值为字符串"0","1"，所以可以解构。  
**输出：** 
```
  a="foo"
  b="bar"
```
### 11、下面代码声明了几个变量？值是多少？
```
let { a: { b: { c }}} = { a: { b: { c: "1",d: "2"}}}
```
**解答：** 只声明了一个变量c，值是1，a和b是匹配模式  
### 12、数组解构的核心是什么？请自学 Generator 函数回答下面代码返回什么
```
function* count() {
    let i = 1
    while (true) {
        yield i++;
    }
}
let [first, second, third, fourth, fifth, sixth] = count();
```
**解答：** 数组解构的核心：数据结构必须具有 Iterator 接口。  
**输出：** 
```
first = 1
second = 2
third = 3
fourth = 4
fifth = 5
sixth = 6
```
### 13、字符串可以解构吗？结合下面代码说说为什么？
```
const [a, b, c, d, e] = 'hello';
```
**解答：** 字符串也可以解构赋值，因为字符串被转换成了一个类似数组的对象。
**输出：** 
```
a="h"
b="e"
c="l"
d="l"
e="o"
```
### 14、什么是箭头函数？它和 function 声明的函数有什么区别？
**解答：** ES6 允许使用“箭头”（=>）定义函数。这样定义的函数我们称为箭头函数，如下所示：  
```
var f = v => v;

// 等同于
var f = function (v) {
  return v;
};
```
箭头函数和function申明的函数的区别：  
（1）箭头函数体内的this对象，就是定义时所在的对象，而不是使用时所在的对象。  
（2）箭头函数不可以当作构造函数，也就是说，不可以使用new命令，否则会抛出一个错误。  
（3）箭头函数不可以使用arguments对象，该对象在函数体内不存在。如果要用，可以用 rest 参数代替。  
（4）箭头函数不可以使用yield命令，因此箭头函数不能用作 Generator 函数。  

### 15、下面代码输出的是什么？为什么？
```
var a = 2
var obj = {
    a : 1,
    fun : function () {
        console.log(this.a)
    }
}
var obj2 ={
    a : 3
}
obj.fun()          // ?
var fun = obj.fun;
fun()              // ?
obj2.fun = obj.fun
obj2.fun()         // ?
```
**输出和原因：** 
```
var a = 2
var obj = {
    a : 1,
    fun : function () {
        console.log(this.a)
    }
}
var obj2 ={
    a : 3
}
obj.fun()          // 1，this指向的是obj
var fun = obj.fun;
fun()              // 2，this指向的是全局对象window
obj2.fun = obj.fun
obj2.fun()         // 3，this指向obj2
```
### 16、下面代码输出的是什么？为什么？
```
var a = 2
var obj = {
    a : 1,
    fun : () => {
        console.log(this.a)
    }
}
var obj2 ={
    a : 3
}
obj.fun()          // ?
var fun = obj.fun;
fun()              // ?
obj2.fun = obj.fun
obj2.fun()         // ?
```
**输出：** 
```
2
2
2
```
**原因：** 因为this在箭头函数中是静态绑定的

### 17、箭头函数的this静态绑定是什么含义？和this的动态绑定有什么区别？请写出示例代码说明区别
箭头函数的this静态绑定是指this指向的是创建函数时的域。  
this的动态绑定是指向执行函数时所在的域。  
**代码说明** 
```
var a = 2
var obj = {
    a : 1,
    static_fun : ()=> {
        console.log(this.a)
    },
    dynmaic_fun: function() {
        console.log(this.a)
    }

}
var obj2 ={
    a : 3
}
obj.static_fun()          // 1，this指向的是obj
obj.dynmaic_fun()        // 2，this指向的是全局对象window
```


### 18、下面代码输出是什么？结合前几题，试理解this静态绑定的绑定规则。
```
var id = 2;
function foo() {
    return () => {
        console.log('id:', this.id);
    };
}
foo.call({id: 1})()
```
**输出：**  
```
id: 1
```
**理解：** this静态绑定的规则：就是在创建时就绑定了，数据和参数不可变。
### 19、对于function声明的函数，如果想实现箭头函数的this静态绑定，需要怎么做？
**解答:** 使用 call() 方法即可实现  
```
var id = 2;
function fun() {
    console.log('id:', this.id);
    }
fun.call({id: 1})()   //id: 1
```

### 20、什么是柯里化(currying)，它有什么作用？
函数柯里化简单来说是将多参数的函数转换成单参数的形式。  
作用:提高了函数的复用性。

### 21、下面代码输出的是什么？为什么？
```
let fun1 = i => i*2
let fun2 = i => {i*2}
console.log(fun1(1))   // ?
console.log(fun2(1))   // ?
```
**输出和原因** 
```
let fun1 = i => i*2
let fun2 = i => {i*2}
console.log(fun1(1))    // 2，执行箭头函数fun1
console.log(fun2(1))    // undefined，因为引擎认为{i*2}的大括号是代码块，所以执行了一行语句a: 1，然后函数就结束了，没有返回值。
```
### 22、以下递归函数在调用 factorial(50000) 时会报错吗？如果会，应该如何修改此函数（改造后的函数还需为递归函数），使其满足尾递归性质而不会栈溢出。
```
function factorial(n) {
    if (n === 1) return 1;
    return n * factorial(n - 1);
}
```
**解答** 报错Maximum call stack size exceeded
**修改代码** 
```
function factorial(n, total) {
  if (n === 1) return total;
  return factorial(n - 1, n * total);
}
```
## 代码题
### 1、请使用解构语法实现交换两个数
**代码** 
```
let a=1;
let b=2;
[a, b]= [b, a]
console.log(a)  //2
console.log(b)  //1
```
### 2、请使用解构语法实现获取斐波那契数列前10个数
**代码** 
```
let a =0;
let b = 1;
for (let i = 0; i < 10; ++i) {
    console.log(a);
    [a, b] = [b, a+b];
}
```
### 3、对于单参数函数，如果通过解构语法设置默认值，修改代码实现默认值b = 10
 ```
 function test({a,b}){
     console.log(a,b)
 }
 ```
 **修改后代码** 
  ```
 function test({a,b = 10}){
     console.log(a,b)
 }
 ```

### 4、请把下列代码改写成箭头函数的写法
 ```
 [1,2,3].map(function (x) {
     return x * x;
 });
 ```
  **箭头函数的写法** 
  ```
[1,2,3].map(x => x * x);
 ```
### 5、请将下面函数柯里化(currying)，需要写出箭头函数和非箭头函数两种答案
 ```
 function cala(add, mul, origin) {
     return (origin + add) * mul
 }
 ```
 **箭头函数写法**
  ```
let cala = add => mul => origin => (origin + add) * mul
 ```
  **非箭头函数形式**
  ```
let cala2 = function (add) {
  return function (mul) {
    return function (origin) {
      return (origin + add) * mul
    }
  }
}
 ```
### 6、请自学 Set 相关内容，并使用 Set 一行代码实现数组去重
**代码如下**
```
//方法一
const set = new Set([1, 2, 3, 4, 4]);
[...set]
// [1, 2, 3, 4]

//方法二
function dedupe(array) {
  return Array.from(new Set(array));
}
dedupe([1, 1, 2, 3]) // [1, 2, 3]
```