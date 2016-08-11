import SQLite from 'react-native-sqlite-storage';
    


var db = null;

export default class Navigate {


	constructor(dbname) {
		db = SQLite.openDatabase(dbname+".db", "1.0", "Demo", -1);
	}

	getUserTbleResult = () =>{
		return this._userTbleResult;
	};
	getRecentC2CMsgResult = () =>{
		return this._recentC2CMsgResult;
	};
	getC2CMsgResult = () =>{
		return this._C2CMsgResult;
	};


	//通讯录相关操作
	createUsersTable = () => {
		db.sqlBatch([
		  'DROP TABLE IF EXISTS tb_users',
		  'CREATE TABLE IF NOT EXISTS tb_users (`id` varchar(50) NOT NULL,`username` varchar(255) NOT NULL,`password` varchar(255) NOT NULL,`avatar` text NOT NULL)',
		  [ 'INSERT INTO `tb_users` (`id`, `username`, `password`, `avatar`) VALUES(?, ?, ?, ?);', ['S001','导调员001','111111','./../img/avatars/1.png'] ],
		  [ 'INSERT INTO `tb_users` (`id`, `username`, `password`, `avatar`) VALUES(?, ?, ?, ?);', ['S002','导调员002','222222','./../img/avatars/2.png'] ],
		  [ 'INSERT INTO `tb_users` (`id`, `username`, `password`, `avatar`) VALUES(?, ?, ?, ?);', ['S007','导调员007','777777','./../img/avatars/7.png'] ],
		], function() {
		  console.log('create and insert init success');
		}, function(error) {
		  console.log('create and insert init error: ' + error.message);
		});
	};
	
	insertUsersTable = (id,username,password,avatars) =>{
		db.transaction(function (tx) {
	    	tx.executeSql("INSERT INTO `tb_users` (`id`, `username`, `password`, `avatar`) VALUES(?, ?, ?, ?)" , [id , username , password , avatars]);
		}, function (error) {
	    	console.log('insertUserTable error: ' + error.message);
		}, function () {
	    	console.log('insertUserTable ok');
		});
	};

	queryUsersTable = ()=>{
		that = this;
		return new Promise((resolve, reject) => {
			db.readTransaction(function(tx) {
			  tx.executeSql("SELECT * FROM `tb_users` ", [], function(tx, resultSet) {
			    console.log(resultSet);
			    that._userTbleResult = resultSet;
			  }, function(tx, error) {
			    console.log('SELECT error: ' + error.message);
			  });
			}, function(error) {
			  console.log('SELECT transaction error: ' + error.message);
			}, function() {
			  console.log('SELECT transaction ok');
			  resolve();
			});
		});
	};
	

	//最近联系人操作
	queryRecentC2CMsg = ()=> {
		that = this;
		return new Promise((resolve, reject) => {
			db.readTransaction(function(tx) {
			  tx.executeSql("SELECT * FROM `tb_recentC2CMsg` ", [], function(tx, resultSet) {
			  	//console.log(resultSet);
			    that._recentC2CMsgResult = resultSet;
			  }, function(tx, error) {
			    console.log('SELECT error: ' + error.message);
			  });
			}, function(error) {
			  console.log('SELECT transaction error: ' + error.message);
			}, function() {
			  console.log('SELECT transaction ok');
			  resolve();
			});
		});
	};
	updateRecentC2CMsg = (userid,username,text) => {
		db.sqlBatch([
		  //'DROP TABLE IF EXISTS tb_recentC2CMsg',
		  'CREATE TABLE IF NOT EXISTS tb_recentC2CMsg (`userid` varchar(50) NOT NULL, `username` varchar(255) NOT NULL, `text` varchar(255))',
		  [ 'DELETE FROM `tb_recentC2CMsg` WHERE userid=?',[userid]],
		  [ 'INSERT INTO `tb_recentC2CMsg` (`userid`, `username`, `text`) VALUES(?, ?, ?);', [userid,username,text] ],
		], function() {
		  console.log('create and insert init success');
		}, function(error) {
		  console.log('create and insert init error: ' + error.message);
		});
	};

	//最近聊天记录相关操作
	queryC2CMsg = (userid) =>{
		that = this;
		return new Promise((resolve, reject) => {
			
			db.readTransaction((tx) => {
			  tx.executeSql("SELECT * FROM tb_C2CMsg_"+userid, [], function(tx, resultSet) {
			  	//console.log(resultSet);
			    that._C2CMsgResult = resultSet;
			  }, function(tx, error) {
			    console.log('SELECT error: ' + error.message);
			  });
			}, function(error) {
			  console.log('SELECT transaction error: ' + error.message);
			}, function() {
			  console.log('SELECT transaction ok');
			  resolve();
			});
		});
	};
	updateC2CMsg = (userid,message) => {
		let msgId = message.key;
		let userType= message.userType;
		let timestamp = message.timestamp;
		let msgType = message.msgType;
		let msgContent = message.msgContent;
		let tableName = 'tb_C2CMsg_'+userid;
		
		db.sqlBatch([
		    //'DROP TABLE IF EXISTS '+tableName +';',
			'CREATE TABLE IF NOT EXISTS '+tableName +' (`msgId` varchar(255) NOT NULL,`userType` varchar(1) NOT NULL,`timestamp` timestamp NOT NULL ,`msgType` varchar(10) NOT NULL,`msgContent` text NOT NULL)',
		  	`INSERT INTO ${tableName} (msgId, userType, timestamp, msgType, msgContent) VALUES('${msgId}', ${userType}, ${timestamp}, '${msgType}', '${msgContent}');`,
		], function() {
		  console.log('create and insert init success');
		}, function(error) {
		  console.log('create and insert init error: ' + error.message);
		});
	};



};