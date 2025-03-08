import express from 'express';
import mariadb from 'mariadb';

const pool = mariadb.createPool({
    host: 'localhost',
    user: 'root',
    password: '795594',
    database: 'guestBook'
});

async function connect() {
    try {
        const conn = await pool.getConnection();
        console.log('Connected to the database');
        return conn;
    } catch (err) {
        console.log('Error connecting to the database: ' + err)
    }
}

const app = express();

app.use(express.urlencoded({ extended: true }));

const signatures = [];

app.use(express.static('public'));

// had an error but it was because I forgot to app.set
app.set('view engine', 'ejs');
app.set('views', './views');

const PORT = 3000;

//render using ejs
app.get('/', (req, res) => {
    res.render(`home`);
});

//render using ejs
app.get('/signed', (req, res) => {
    res.render(`signed`), { async: true };
});

app.post('/signed', async (req, res) => {
    
    if (!req.body.fname || !req.body.lname || !req.body.eAddress) {
        return res.send('Invalid Input: First Name, Last Name, and Email are required.');
    }

    const sign = {
        fname: req.body.fname,
        lname: req.body.lname,
        jobTitle: req.body.jobTitle,
        co: req.body.co,
        linkedInURL: req.body.linkedInURL,
        eAddress: req.body.eAddress,
        weMetAt: req.body.weMetAt !== 'Please Select...' ? req.body.weMetAt : req.body.other || "Not specified",
        other: req.body.other,
        message: req.body.message,
        mailingList: req.body.mailingList ? "Yes" : "No",
        emailFormat: req.body.emailFormat || "Not specified",
        timestamp: new Date().toLocaleString() // Add timestamp to each submission
    };//end sign

    // signatures.push(sign);

    // console.log(signatures);

    const conn = await connect();
 
    conn.query(`
        INSERT INTO signatures (
            firstName,
            lastName,
            email,
            method,
            size
        ) VALUES (
            '${order.fname}',
            '${order.lname}',
            '${order.jobTitle}',
            '${order.co}',
            '${order.linkedInURL}',
            '${order.eAddress}',
            '${order.weMetAt}',
            '${order.other}',
            '${order.message}',
            '${order.mailingList}',
            '${order.emailFormat}'
        );
    `); //end query


//render using ejs
    res.render('signed', { sign });
});

//render using ejs
app.get('/admin', async (req, res) => {

    const conn = await connect();
 
    const signatures = await conn.query('SELECT * FROM signatures;');

    console.log(signatures);

    res.render('admin', { signatures });
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});