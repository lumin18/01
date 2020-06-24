/**
 * let const 模板字符串(超级字符串) 扩展运算符... 深浅拷贝
 */

// var 有哪些特点：变量提升；可以重复赋值；会污染全局变量；

let str = 'heima'
let str = 100
console.log(str) // Identifier 'str' has already been declared 不能定义多次


console.log(a)
var a = 1

var a = undefined
console.log(a) // 变量提升: 提升的是声明位置，赋值的位置不变
a = 1

console.log(b)
let b = 10 // Cannot access 'b' before initialization 使用变量之前，必须先声明

// 作用域：全局作用域；函数级作用局；let const -> 块级作用域 {}, 一个大括号就是一个块级作用域，超出大括号无效

{
     let a = 100
}
console.log(a)
// 用var声明的变量是全局生效的可以解释；
// 所有的代码执行：同步 > 回调 > 异步
for (let i = 0; i < 10; i++) {
     setTimeout(() => {
          console.log(i)
     })
}

// const let let具有的功能，const都具有，const更适合去声明常量(不变的量)
const school = 'heima'
school = 'zlc'
console.log(school) // Assignment to constant variable.   config/constant

const obj = {}
obj.name = 'heima'
console.log(obj) // 对基础数据类型而言，不能重新赋值；对于引用类型来说，只要地址不变，即可

const obj = {}
obj = { a: 1 }
console.log(obj) // Assignment to constant variable.

// var let const 禁止使用var，尽量先使用const，如果这个值需要变化的时候再用let

// 解构 -> {} []
/**
 * 1、等号两边的格式要保持一致
 * 2、解构的属性，必须属于右边的自身属性 -> 否则：undefined
 * 3、可以用 = 给默认值，如果右边对象本身具有，就按具有的属性，如果没有则按默认的来
 * 4、可以用 ：给属性进行取一个别名
 * 
 */
const name = 'zs'
let obj = {
     name: 'heima',
     age: 10,
     age1: 30
}
let { name: cName, age1 = '20' } = obj
console.log(cName, age1)

// 模板字符串 `` 一对反引号
// 1、普通字符串带来的不好的体验：不能换行
// 2、实用模板字符串可以使用 ${} 进行嵌入变量
const name = '黑马'
let str = '<div><div><span>' + name + '</span><ul><li>1</li><li>2</li></ul></div></div>'

let str1 = `<div>
               <div>
                    <span>${name}</span>
                    <ul>
                         <li>1</li>
                         <li>2</li>
                    </ul>
               </div>
          </div>`


// 扩展运算符 ...

let arr1 = [1, 2, 3]
let arr2 = [2, 3, 4]
let arr3 = arr1.concat(arr2)
let arr4 = [...arr1, ...arr2]
console.log(arr4)
// 去重 Set 
console.log([...new Set(arr4)])
// Set es6新的数据结构(不是类型) 特点：里面的值不能重复

let set = new Set()
set.add(1) // 可以用add朝set里面进行添加数据
set.add(1)
set.add(2) // 可以用has去判断当前数据是否存在set结构里面
set.clear() // 可以清空set结构里面所有的数据
console.log(set.size)

console.log(set.has(2))

// 深拷贝：拷贝前后没有关系
let obj = {
     name: 'heima',
     age: 10,
}
// 最常用的进行深拷贝 stringify  parse 这两个进行配合
let newObj = JSON.parse(JSON.stringify(obj))
newObj.age = 11
console.log(obj, newObj)

// 自己实现一个深拷贝
let obj = {
     name: 'heima',
     age: 10,
     address: {
          x: 100,
          y: 200
     }
}
// {} [] WeakMap 键可以是一个对象，hash 表
function deepClone(obj) {
     // 很多判断 null undefined
     if (obj == null) return obj
     if (typeof obj !== 'object') return obj
     if (obj instanceof Date) return new Date(obj)

     // ... 正则对象
     // let instance = Object.prototype.toString.call(obj) === '[object Object]' ? {} : []
     // if (hash.get(obj)) {
     //      return hash.get(obj)
     // }
     let instance = new obj.constructor
     // hash.set(obj, instance)
     for (let key in obj) {
          // 先过滤掉原型上的属性
          if (obj.hasOwnProperty(key)) {
               instance[key] = deepClone(obj[key])
          }
     }

     return instance
}
let newObj = deepClone(obj)
// 循环引用的问题
newObj.a = newObj
console.log(newObj)

// 爆栈
