// 用于连接数据库
// 数据库连接配置
let mysql = require('mysql')
let option = {
	host: "localhost", // 新建数据库连接时的 主机名或ID地址 内容
	user: "root",
	password: "123456", // root 密码
	database: "keshe", // 数据库名
	port: "3306",
}
let con = mysql.createConnection(option)
con.connect((err) => {
	if(err){
		console.log(err)
	}else{
		console.log('数据库连接成功')
	}
})
//  强制数据库连接

setInterval(function () {
    con.query('SELECT 1');
}, 5000);
// 数据库操作
function sqlQuery(strSql,arr){
	return new Promise((reslove,reject) => {
		con.query(strSql,arr,(err,result) => {
			if(err){
				reject(err)
			}else{
				reslove(result)
			}
		})
	})
}

module.exports = sqlQuery;