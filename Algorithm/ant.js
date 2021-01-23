// 查找一个字符串中在字母表上连续最长的一段，如果有相同长度的则返回第一串，如
// "abcefsaefghajjj" 
function findLetters(str) {
    if (typeof str !== 'string' || !str) return "";
    const alphabet = "abcdefghijklmnopqrstuvwxyz";
    const arr = [];
    str = str.toLowerCase();
    let pos = 0;
    let ret = '';
    for (let i = pos;i<str.length;i++) {
        let temp = "";
        for(let j=i;j<str.length;j++) {
            temp += str[j];
            if (temp.length > 1) {
                console.log(temp);
                if (alphabet.indexOf(temp) > -1) {
                    arr.push(temp);
                } else {
                    pos += temp.length;
                    break;
                }
            }
        }
    }
    switch(arr.length) {
        case 0:
            ret = str[0];
            break;
        case 1:
            ret = arr[0];
            break;
        default:
            let maxLength = Math.max(...arr.map(_ => _.length));
            ret = arr.find(_ => _.length === maxLength);
    }
    console.log(arr);
    return ret;
}
findLetters("aaaabbbbcccc")

// aaaabbbbcccc => {a:4,b:4,c:4} 
const str = "aaaabbbbcccc";
const arr = str.match(/(\w)\1*/g);
console.log(arr)  // "aaaabbbbcccc"
const ret = arr.reduce((pre,cur) => {
    pre[cur[0]] = cur.length;
    return pre;
},{})
console.log(ret)

// 快速排序（类似合并排序）
// 相同点(分治策略)：
// 1.先拆解问题
// 2.然后分别处理
// 3.平均执行时间O(nlgn)
// 不同点：
// 1.快速排序空间复杂度O(1)
// 2.快速排序常数时间更少
// 3.合并排序更适合并发环境
// 关键子问题：
// 根据中心点拆分数组
// 选取一个中心点，把<=中心点的值放到中心点左边，大于中心点的值放到右边
