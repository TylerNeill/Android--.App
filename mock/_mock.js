const userList = [{ account: 'aaa', password: '123' }, { account: 'admin', password: '123' }]
const URL = require('url');

const recordList = [];

// Mock:生成随机数据，拦截ajax请求

// 启动服务器
// mock -p port -f 目录路径/_mock.js

// http://ip:port/path
// 模拟的后端接口 ,调用Mock.mock(url, template)
Mock.mock('/test', { 'code': 2, 'message': '操作成功', 'data': 123 });
Mock.mock('/record', { 'code': 2, 'message': '操作成功', 'data': recordList })

// 登录接口 /sys/login
Mock.mock('/sys/login', function (options) {
    // console.log('options:', options, options.body, options.type, options.url, options.request);
    // console.log(options);
    let urlObj = URL.parse(options.request.url, true);
    console.log(urlObj);

    let res = userList.find((item) => {
        // console.log(item)        
        return item.account == urlObj.query.account && item.password == urlObj.query.password
    })
    // console.log(res, 'res')
    let rawContent = '';
    options.response.res.on('data', function (chunk) {
        rawContent += chunk.toString();
        // console.log('1111',chunk);
    })
    return res ? { 'code': 2, 'message': '登录成功', 'data': { token: 20191115111512 } } : { 'code': 4, 'message': '账号或密码错误' };
})

Mock.mock('/record/add', function (options) {
    let urlObj = URL.parse(options.request.url, true);
    // console.log(urlObj);
    // recordList.push({...urlObj.query, id: Mock.mock('@integer'), name: Mock.mock('@cname')});
    recordList.push({ ...urlObj.query, id: Mock.mock('@id') });
    console.log(recordList);
    
    return { 'code': 2, 'message': '记账成功', 'data': recordList };
})

Mock.mock('/record/date', function (options) {
    let urlObj = URL.parse(options.request.url, true);
    // console.log(urlObj);
    const start = urlObj.query.start
    const end = urlObj.query.end
    // console.log(start, end)
    // console.log(recordList);
    let arr = recordList.filter(item => {
        let date = new Date(item.date)
        // console.log(date);
        return date.getTime() >= start && date.getTime() <= end
    })
    console.log(arr);

    return { 'code': 2, 'message': '查询成功', 'data': arr };
})


Mock.mock('/record/del', function(options){
    let urlObj = URL.parse(options.request.url, true);
    console.log(urlObj);
    let id=urlObj.query.id
    let index;
    for(var i in recordList){
        if(recordList[i].id==id){//在数组arr里找到这个id
            console.log(i)
            index=i;
            recordList.splice(index,1)//把这个id对应的对象从数组里删除
        }
    }
    return {'code':2, 'message': '删除成功', 'data': recordList};
})
// , name: Mock.mock('@cname')
// Mock.mock('/record/check',{'code': 2, 'message': '查看成功', 'data': recordList })