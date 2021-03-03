# TS 类型系统

## 函数定义

- 函数被称作泛型操作符，其定义的简单方式是使用 type 关键字

```
type foo<T> = T;
// 转换成JS代码
function foo(T) { return T }
```

## 高级类型 

### Record：将K中每个属性([P in K])转为T类型，K可为联合类型、对象和枚举，此类型包含一组指定的属性且都是必填  

- 源码

```
/**
 * Construct a type with a set of properties K of type T
 */
type Record<K extends keyof any, T> = {
    [P in K]: T;
}; 
```

- 常用格式  

```
type proxyKType = Record<K,T>
```

- 用法示例1 

```
type pets = 'dog' | 'cat';
interface IPetInfo {
    name: string;
    age: number;
}
type IPets1 = Record<pets, IPetInfo>;
const animals: IPets1 = {
    dog: {
        name: 'Sporty',
        age: 1,
    },
    cat: {
        name: 'Meow',
        age: 1,
    }
}
type IPets2 = Record<pets | 'lion', IPetInfo>;
const animals: IPets2 = {
    dog: {
        name: 'Sporty',
        age: 1,
    },
    cat: {
        name: 'Meow',
        age: 1,
    },
    lion: {
        name: 'Simba',
        age: 1,
    }
}
```  

- 用法示例2  

```
enum IHttpMethods {
    GET = 'get',
    POST = 'post',
    DELETE = 'delete',
    PUT = 'put',
}

const methods = ["get","post","delete","put"];

interface IHttpFn {
    <T = any>(url: string, config?: AxiosRequestConfig): Promise<T>
}

type IHttp = Record<IHttpMethods, IHttpFn>;

const httpMethods: IHttp = methods.reduce((map: any, method: string) => {
    map[method] = (url: string, options: AxiosRequestConfig = {}) => {
        const { data, ...config } = options;
        return (axios as any)[method](url, data, config)
            .then((res: AxiosResponse) => {
                if (res.data.errCode) {
                    // todo sth
                } else {
                    // todo sth
                }
            });  
    }
    return map;
}, {})

export default httpMethods;
```

### Partial：将类型定义的所有属性都修改为可选

- 源码  

```
/**
* Make all properties in T optional
*/
type Partial<T> = {
    [P in keyof T]?: T[P]; 
};
```

- 用法示例1

```
type Coord = Partial<Record<'x' | 'y', number>>;

// 等同于  
type Coord = {
    x?: number;
    y?: number;
}
```

### Readonly：将所有属性定义为只读  

- 源码  

```
/**
 * Make all properties in T readonly
 */
type Readonly<T> = {
    readonly [P in keyof T]: T[P];
}
```

- 用法示例1  

```
type Coord = Readonly<Record<'x' | 'y', number>>;

// 等同于 
type Coord = {
    readonly x: number;
    readonly y: number;   
}
```

### Pick：从类型定义的属性中选取指定一组属性返回一个新的类型定义

- 源码 

```
/**
 * From T, pick a set of properties whose keys are in the union K
 */
type Pick<T, K extends keyof T> = {
    [P in K]: T[P];
}
```

- 用法示例1

```
type Coord = Record<'x' | 'y', number>;
type CoordX = Pick<Coord, 'x'>;

// 等同于  
type CoordX = {
    x: number;
}
```





