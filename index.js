let express = require("express");
var bodyParser = require('body-parser');

let sqlQuery = require("./dbmysql");

let app = express();


// create application/json parser
var jsonParser = bodyParser.json()
 
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

// 解决跨域
app.all("*", function(req, res, next) {
	// 设置允许跨域的域名，*代表允许任意域名跨域
	res.header("Access-Control-Allow-Origin", "*");
	// 允许的header类型
	res.header("Access-Control-Allow-Headers", "content-type");
	// 跨域允许的请求方式
	res.header("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS");
	if (req.method.toLowerCase() === "options") {
		res.sendStatus(200); // 让options尝试请求快速结束
	} else {
		next();
	}
});

// 登录
app.post("/login",jsonParser,async(req,res) => {
	let sql = `select * from admin where username = ? and passwd = ? `
	let arr = []
	arr[0] = req.body.username
	arr[1] = req.body.pass
	
	let result =await sqlQuery(sql,arr);
	if(result.length>0){
		res.json({
			message: '登录成功！',
			code: 1000,
			token: result[0].token,
		})
	}else{
		res.json({
			message: '账户或密码错误！',
			code: 2000
		})
	}
})

// 获取用户信息
app.post('/getinfo',jsonParser,async(req,res) => {
	let sql = `select * from admin where token = ? `
	let arr = []
	arr[0] = req.body.token
	let result =await sqlQuery(sql,arr);
	if(result.length>0){
		res.json({
			nickname: result[0].nickname,
			avatar: result[0].avatar,
			position: result[0].position
		})
	}else{
		res.json({
			message: '账户或密码错误！',
		})
	}
})

// 获取全部学生信息
app.get("/select/allstudent/:page", async (req, res) => {
	// 获取总页数
	let strSql0 = "select count(*) as pagenum from student;";
	let result = await sqlQuery(strSql0);
	// 每页包含的条数
	let itemPerPage = 8;
	let pageAll = Math.ceil(result[0].pagenum / itemPerPage);
	let currentPage = parseInt(req.params.page)
	// console.log(currentPage*itemPerPage +"," +(currentPage+1)*itemPerPage +" ;")
	// 获取学生详细信息
	let strSql1 = `SELECT ` +
		`student.studentid, ` +
		`student.NAME AS name, ` +
		`sex, ` +
		`birthday, ` +
		`native_place, ` +
		`class.NAME AS classname, ` +
		`department.NAME AS xueyuan,` +
		`GROUP_CONCAT( punishment.DESCRIPTION ) AS punishstatus, ` +
		`GROUP_CONCAT( reward.DESCRIPTION ) AS rewardstatus ` +
		`FROM ` +
		`student ` +
		`INNER JOIN class ON ( student.class = class.id ) ` +
		`INNER JOIN department ON ( student.department = department.id ) ` +
		`LEFT JOIN punishment ON ( student.studentid = punishment.studentid ) ` +
		`LEFT JOIN reward ON ( student.studentid = reward.STUDENTID ) ` +
		`GROUP BY ` +
		`student.STUDENTID ` +
		`ORDER BY ` +
		`student.STUDENTID ` +
		`LIMIT ` +
		currentPage * itemPerPage +
		"," +
		itemPerPage +
		" ;";
	let result1 = await sqlQuery(strSql1);
	res.json({
		data: Array.from(result1),
		pageAll
	});
});
// 搜索框查找 查找姓名
app.get("/select/:stuname/page/:page", async (req, res) => {
	// console.log(req.params.stuname);
	// console.log(req.params.page);
	// 获取总页数
	let strSql0 =
		"select count(*) as pagenum from student where (name like '%" +
		req.params.stuname +
		"%')";
	let result1 = await sqlQuery(strSql0);
	// console.log(pageAll);

	// 每页包含的条数
	let itemPerPage = 8;
	let pageAll = Math.ceil(result1[0].pagenum / itemPerPage);
	let currentPage = parseInt(req.params.page)
	let strSql =
		`SELECT ` +
			`student.studentid, ` +
			`student.NAME AS name, ` +
			`sex, ` +
			`birthday, ` +
			`native_place, ` +
			`class.NAME AS classname, ` +
			`department.NAME AS xueyuan,` +
			`GROUP_CONCAT( punishment.DESCRIPTION ) AS punishstatus, ` +
			`GROUP_CONCAT( reward.DESCRIPTION ) AS rewardstatus ` +
			`FROM ` +
			`student ` +
			`INNER JOIN class ON ( student.class = class.id ) ` +
			`INNER JOIN department ON ( student.department = department.id ) ` +
			`LEFT JOIN punishment ON ( student.studentid = punishment.studentid ) ` +
			`LEFT JOIN reward ON ( student.studentid = reward.STUDENTID ) ` +
			`WHERE student.name like '%` + req.params.stuname + `%'` +
			`GROUP BY ` +
			`student.STUDENTID ` +
			`ORDER BY ` +
			`student.STUDENTID ` +
			`LIMIT ` +
			currentPage * itemPerPage +
			"," +
			itemPerPage +
			" ;";
	let result2 = await sqlQuery(strSql);
	res.json({
		data: Array.from(result2),
		pageAll
	});
});

// 搜索，学号搜索
app.get("/selectid/:stuid/page/:page", async (req, res) => {
	// console.log(req.params.stuname);
	// console.log(req.params.page);
	// 获取总页数
	let strSql0 =
		"select count(*) as pagenum from student where (studentid like '%" +
		req.params.stuid +
		"%')";
	let result1 = await sqlQuery(strSql0);
	// console.log(pageAll);

	// 每页包含的条数
	let itemPerPage = 8;
	let pageAll = Math.ceil(result1[0].pagenum / itemPerPage);
	let currentPage = parseInt(req.params.page)
	let strSql =
		`SELECT ` +
			`student.studentid, ` +
			`student.NAME AS name, ` +
			`sex, ` +
			`birthday, ` +
			`native_place, ` +
			`class.NAME AS classname, ` +
			`department.NAME AS xueyuan,` +
			`GROUP_CONCAT( punishment.DESCRIPTION ) AS punishstatus, ` +
			`GROUP_CONCAT( reward.DESCRIPTION ) AS rewardstatus ` +
			`FROM ` +
			`student ` +
			`INNER JOIN class ON ( student.class = class.id ) ` +
			`INNER JOIN department ON ( student.department = department.id ) ` +
			`LEFT JOIN punishment ON ( student.studentid = punishment.studentid ) ` +
			`LEFT JOIN reward ON ( student.studentid = reward.STUDENTID ) ` +
			`WHERE student.studentid like '%` + req.params.stuid + `%'` +
			`GROUP BY ` +
			`student.STUDENTID ` +
			`ORDER BY ` +
			`student.STUDENTID ` +
			`LIMIT ` +
			currentPage * itemPerPage +
			"," +
			itemPerPage +
			" ;";
	let result2 = await sqlQuery(strSql);
	res.json({
		data: Array.from(result2),
		pageAll
	});
});
// 插入学生信息

// 获取学生总数，学院总数，班级，奖励
app.get('/overview', async (req, res) => {
	let sqlstr0 = 'select count(*) as num from '

	let result1 = await sqlQuery(sqlstr0 + 'student')
	let result2 = await sqlQuery(sqlstr0 + 'department')
	let result3 = await sqlQuery(sqlstr0 + 'class')
	let result4 = await sqlQuery(sqlstr0 + 'reward')

	result1[0].name = '学生总数'
	result2[0].name = '学院总数'
	result3[0].name = '班级总数'
	result4[0].name = '奖励记录'
	res.json({
		data: [
			result1[0],
			result2[0],
			result3[0],
			result4[0]
		]
	})
})

// 查看违纪情况
app.get('/selcetpunish/:stuid',async(req,res) => {
	let sql = `SELECT ` +
	`punishment.description, `+
	`punish_levels.DESCRIPTION,punishment.REC_TIME `+
`FROM `+
	`punishment `+
	`INNER JOIN punish_levels ON (LEVELS = CODE) `+
	`where STUDENTID = ` + req.params.stuid
	
	let result1 = await sqlQuery(sql)
	res.json(result1)
})
// 查看获奖情况
app.get('/selcetreward/:stuid',async(req,res) => {
	let sql = `SELECT ` +
	`reward.description, `+
	`reward_levels.DESCRIPTION,reward.REC_TIME `+
`FROM `+
	`reward `+
	`INNER JOIN reward_levels ON (LEVELS = CODE) `+
	`where STUDENTID = ` + req.params.stuid
	
	let result1 = await sqlQuery(sql)
	res.json(result1)
})

// 获取每个班级的人数
app.get('/getclassnum',async(req,res) => {
	// 查找数目多少
	let sql0 = `SELECT count(*) as value FROM student WHERE student.CLASS = `
	// 查找student的class 对应 class的name
	let sql1 = `select name from class where CLASS.id = `
	
	let result = []
	for (let i=0 ; i<12 ; i++){
		result[i] = await sqlQuery(sql0 + i)
		let classname = await sqlQuery(sql1 + i)
		result[i][0].name = classname[0].name
	}
	res.json({
		data: [
			result[0][0],
			result[1][0],
			result[2][0],
			result[3][0],
			result[4][0],
			result[5][0],
			result[6][0],
			result[7][0],
			result[8][0],
			result[9][0],
			result[10][0],
			result[11][0],		
		]
	})
})

// 获取每个省份人数
app.get('/getnative',async(req,res) => {
	let sql = `select count(*) as "value", NATIVE_PLACE as "name" from student GROUP BY NATIVE_PLACE;`
	let result = await sqlQuery(sql)
	res.json(result)
})

// 获取奖学金情况
app.get('/getreward',async(req,res) => {
	let sql = `SELECT count(*) as value, reward_levels.DESCRIPTION as name `+
			`FROM reward `+
			`INNER JOIN reward_levels `+
			`WHERE LEVELS = CODE GROUP BY (LEVELS) `
	let result = await sqlQuery(sql)
	res.json(result)
})
// 获取处罚情况
app.get('/getpunish',async(req,res) => {
	let sql = `SELECT count(*) as value, punish_levels.DESCRIPTION as name `+
			`FROM punishment `+
			`INNER JOIN punish_levels `+
			`WHERE LEVELS = CODE GROUP BY (LEVELS) `
	let result = await sqlQuery(sql)
	res.json(result)
})

// 学籍变更情况
app.get('/getchange',async(req,res) => {
	let sql = `SELECT count(*) as value, change_code.DESCRIPTION as name `+
			`FROM \`change_\` `+
			`INNER JOIN \`change_code\` `+
			`WHERE \`CODE\` = \`CHANGE\` GROUP BY (\`CHANGE\`) `
	let result = await sqlQuery(sql)
	res.json(result)
})

// 各班高数平均成绩
app.get('/getgradeavg',async(req,res) => {
	let sql = `SELECT avg( grade ) AS value, class.NAME as name `+
`FROM grade INNER JOIN class ` +
`WHERE grade.class = class.id ` +
`GROUP BY (grade.class) `
	let result = await sqlQuery(sql)
	res.json(result)
})

// 获取全部学生学籍情况
app.get("/select/allstudentstatus/:page", async (req, res) => {
	// 获取总页数
	let strSql0 = "select count(*) as pagenum from change_;";
	let result = await sqlQuery(strSql0);
	// 每页包含的条数
	let itemPerPage = 8;
	let pageAll = Math.ceil(result[0].pagenum / itemPerPage);
	let currentPage = parseInt(req.params.page)
	// console.log(currentPage*itemPerPage +"," +(currentPage+1)*itemPerPage +" ;")
	// 获取详细信息
	let strSql1 = `SELECT ` +
		`change_.studentid , ` +
		`student.NAME AS name, ` +
		`sex, ` +
		`birthday, ` +
		`native_place, ` +
		`class.NAME AS classname, ` +
		`department.NAME AS xueyuan, ` +
		`REC_TIME AS change_time, ` + 
		`change_.DESCRIPTION AS stu_status ` +
		`FROM ` +
		`change_ ` + 
		`INNER JOIN student ON (change_.STUDENTID = student.STUDENTID) `+
		`INNER JOIN class ON ( student.class = class.id ) ` +
		`INNER JOIN department ON ( student.department = department.id ) ` +
		`ORDER BY ` +
		`change_.STUDENTID ` +
		`LIMIT ` +
		currentPage * itemPerPage +
		"," +
		itemPerPage +
		" ;";
	let result1 = await sqlQuery(strSql1);
	res.json({
		data: Array.from(result1),
		pageAll
	});
});

// 查看某个学号是否存在
app.get("/isexist/:stuid",async(req,res) => {
	let sql = `select * from student where STUDENTID = ` + req.params.stuid
	let result = await sqlQuery(sql)
	res.json(result)
})

// 更改新增
app.post('/update',jsonParser,async(req,res) => {
	let sql = `UPDATE \`student\` `+ 
		`SET STUDENTID = ? , student.NAME =  ?,sex= ?, `+
		`student.class = ( SELECT class.id FROM class WHERE class.NAME = ? ),`+
		`student.DEPARTMENT = ( SELECT department.id FROM department WHERE department.NAME = ? ) `+
		`WHERE STUDENTID = ? `
	let arr = []
	arr[0] = req.body.studentid
	arr[1] = req.body.name
	arr[2] = req.body.sex
	arr[3] = req.body.classname
	arr[4] = req.body.xueyuan
	arr[5] = req.body.studentid
	
	let result =await sqlQuery(sql,arr);
	res.end()
})

// 删除操作
app.post('/delete',jsonParser,async(req,res) => {
	let sql = `delete from student where studentid = ?`
	let arr = []
	arr[0] = req.body.studentid
	
	let result =await sqlQuery(sql,arr);
	res.end()
})

// admin查找
app.get('/admin',async(req,res) => {
	let sql = `select * from admin`
	let result = await sqlQuery(sql)
	res.json(result)
})
app.listen(3000);
console.log("success listen at port:8080......");
