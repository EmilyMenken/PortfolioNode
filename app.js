import express from 'express';

const app = express();

app.use(express.urlencoded({extended: true}));

const signatures = [];

app.use(express.static('public'));

const PORT = 3000;

//create the default route
app.get('/', (req, res) =>{

res.sendFile(`${import.meta.dirname}/views/home.html`);
});

app.get('/signed', (req, res) =>{

    res.sendFile(`${import.meta.dirname}/views/signed.html`);
    });

 app.post('/signed', (req, res) =>{

const sign = {
    fname: req.body.fname,
    lname: req.body.lname,
    jobTitle: req.body.jobTitle,
    co: req.body.co,
    linkedInURL: req.body.linkedInURL,
    eAddress: req.body.eAddress,
    other: req.body.other,
    message: req.body.message,
    mailingList: req.body.mailingList ? "Yes" : "No", //kept getting undefined and had to search up the issue, this fixes it by defining what should happen when someone doesn't check the mailingList
    emailFormat: req.body.emailFormat || "Not specified" //also got undefined with this one
};//end order

  signatures.push(sign);
  
  console.log(signatures);

  res.sendFile(`${import.meta.dirname}/views/signed.html`)
});

app.get('/admin/signatures', (req, res) => {
    let html = '<h1>Signed! Thank you!</h1><ul>';
    for(const sign of signatures) {
        html += `<li>${sign.fname} ${sign.lname} - ${sign.jobTitle} - ${sign.co} - ${sign.linkedInURL} - ${sign.eAddress} - ${sign.other} - ${sign.message} - ${sign.mailingList} - ${sign.emailFormat}</li>`;

    }
html += '</ul>';
res.send(html);
// res.send(signatures);
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});