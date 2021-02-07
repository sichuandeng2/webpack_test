// import '@babel/polyfill'

import './css/image.less';
import './css/main.css';
import './Iconfont/iconfont.css';

const add = function add(a, b) {
  return a + b;
};

const promise = new Promise((resolve) => {
  setTimeout(() => {
    // eslint-disable-next-line
    console.log('定时器启动成功');
    resolve();
  }, 1000);
});
// eslint-disable-next-line
console.log(promise)
// eslint-disable-next-line
console.log(add(6, 2));
