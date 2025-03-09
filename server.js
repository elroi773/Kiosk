const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // MySQL 사용자 이름
    password: 'Mysql4344!', // MySQL 비밀번호
    database: 'cafe_kiosk'
});

db.connect(err => {
    if (err) {
        console.error('MySQL 연결 실패:', err);
    } else {
        console.log('MySQL 연결 성공!');
    }
});

// ✅ MySQL에서 메뉴 불러오는 API
app.get('/menu', (req, res) => {
    db.query('SELECT * FROM menu', (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
});

app.listen(3000, () => {
    console.log('서버 실행: http://localhost:3000');
});
