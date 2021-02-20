## arrayObject.slice(start,end)

- start:开始选取的位置，负数则尾部开始算起
- end:结束选取的位置+1，负数则尾部开始算起
- return:新数组（从 start 到 end - 1）
- 无副作用，不改变原数组

## every some forEach map for 循环的迭代终止

- every():判断数组中每一项是否都满足条件，只有所有项都满足条件返回 true，当 every 内部返回 false 时跳出整个循环

  > var arr = [1,2,3,4,5];  
  > var arr1 = arr.every(function(x) {  
  >   console.log(x); // 1 2 3  
  >   return x < 3;  
  > });  
  > console.log(arr1); // false

- some():判断数组中是否存在满足条件的项，只要有一项满足条件返回 true，当 some 内部返回 true 时跳出整个循环

  > var arr = [1,2,3,4,5];  
  > var arr2 = arr.some(function(x) {
  >   console.log(x); // 1
  >   return x < 3;  
  > });
  > console.log(arr2); // true

- forEach():无返回值，对数组每一项调用函数处理，return false 无法终止循环

  > var arr = [11,22,33,44,55];  
  > arr.forEach(function(x) {
  >   console.log(x); // 11 22 33 44 55
  >   if (x === 11) return false  
  > });

- map():返回一个新数组，该数组每个元素为调用函数处理后的值，return false 无法终止循环

  > var arr = [1,2,3,4,5];
  > var arr3 = arr.map(function(item) {
  >   if (item === 2) return false
  >   return item \* item;
  > });

- for():遍历数组，通过 return false 或 break 终止循环
  > var arr = [11,22,33,44,55];
  > for(let i = 0;i < arr.length;i++) {
  >   console.log(arr[i]); // 11
  >   if (arr[i] === 11) return false
  > }
