import express from 'express';

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

app.post('/signed', (req, res) => {
    
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

    signatures.push(sign);

    console.log(signatures);

//render using ejs
    res.render('signed', { sign });
});

//render using ejs
app.get('/admin', (req, res) => {
    res.render('admin', { signatures });
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});