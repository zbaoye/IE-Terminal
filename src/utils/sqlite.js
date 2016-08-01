import SQLite from 'react-native-sqlite-storage';

var db = SQLite.openDatabase("test.db", "1.0", "Demo", -1);
    

function init(){
	db.transaction(function (tx) {
	    // ...
	    tx.executeSql('CREATE TABLE IF NOT EXISTS customerAccounts (firstname, lastname, acctNo)');
	}, function (error) {
	    console.log('transaction error: ' + error.message);
	}, function () {
	    console.log('transaction ok');
	});
}