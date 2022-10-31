const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

//username dbuser2
//pass lnF8Fi97zvdypnYo

const uri = "mongodb+srv://dbuser2:lnF8Fi97zvdypnYo@cluster0.3njemyu.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        const userCollection = client.db('NodeMongoCrud').collection('users');

        app.get('/users', async (req, res) => {
            const query = {};
            const cursor = userCollection.find(query);
            const users = await cursor.toArray();
            res.send(users);
        });

        app.post('/users', async (req, res) => {
            const user = req.body;
            console.log(user);
            const result = await userCollection.insertOne(user);
            res.send(result);
        });

        app.delete ('/users/:id', async (req, res) => {
            const id = req.params.id;
            const user = req.body;
            console.log(`delete user with id: ${id}`);
        })
    }
    finally {
        // await client.close();
    }
}
run().catch(err => console.log(err));

app.get('/', (req, res) => {
    res.send('Hello World!');
});


app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});