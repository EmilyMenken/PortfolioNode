import express from 'express';

const app = express();

app.use(express.static('public'));

const PORT = 3000;

//create the default route
app.get('/', (req, res) =>{

res.sendFile(`${import.meta.dirname}/views/home.html`);
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});