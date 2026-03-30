//  * 合并多个对象的属性到目标对象
// fixme Object.assign(target, ...sources);
// 创建一个新对象，指定其原型为第一个参数 proto，第二个参数可选（配置新对象的属性，格式同 Object.defineProperties* 创建一个新对象，使用现有对象作为新对象的原型
// fixme Object.create(proto, propertiesObject);

// 获取指定对象的原型（即 obj.__proto__，但推荐用这个方法，更规范），返回原型对象（无原型则返回 null）。
// fixme Object.getPrototypeOf(obj)
// 给对象定义 / 修改单个属性，并精细配置属性的行为（如是否可改、可枚举、可删除）。对比普通赋值：obj.prop = value 等价于 defineProperty 但所有配置默认 true；而 defineProperty 配置默认 false。
// 注意 value/writable 配置项 不能和 访问器（get/set） 共存
// 注意 defineProperty直接在 obj 自身（own property）上定义或修改属性, 拦截不到
// fixme Object.defineProperty(obj, prop, descriptor)
// 批量定义 / 修改对象的多个属性，语法是 defineProperty 的批量版。
// fixme Object.defineProperties(obj, props)
// 创建一个对象的代理，拦截并自定义该对象的基本操作（如取值、赋值、删除、遍历等），返回代理对象（原对象不变，操作代理对象触发拦截）。
// 注意: 对于逆向来说需要在原对象上劫持, 毕竟你创建的代理对象不会被站点调用(除非将obj替换为proxyObj)
// fixme Proxy
// 强化版的 Object
// fixme Reflect



const obj = {};

// 用 defineProperties 定义多个属性，包含 get/set
Object.defineProperties(obj, {
  // 第一个属性：_age（普通数据属性，存实际值）
  _age: {
    value: 18,
    writable: true,
    enumerable: false, // 设为不可枚举，避免暴露
    configurable: true
  },
  // 第二个属性：age（访问器属性，封装读写逻辑）
  age: {
    get() {
      return this._age;
    },
    set(val) {
      if (typeof val === 'number' && val >= 0) {
        this._age = val;
      } else {
        throw new Error('年龄必须是非负数字');
      }
    },
    enumerable: true, // 可枚举
    configurable: true
  }
});

console.log("=========================");

const A = {
  a: 1
}

const B = Object.create(A)

// 此时还没 defineProperty
console.log(B.a) // 1 （来自原型 A）

Object.defineProperty(B, 'a', {
  get() {
    console.log('访问了 a')
    return 100
  },
  set(v) {
    console.log('设置了 a:', v)
  },
  configurable: true,
  enumerable: true
})

// 访问
console.log(B.a)
// 👉 访问了 a
// 👉 100

// 赋值
B.a = 200
// 👉 设置了 a: 200
