const express = require('express');
const app = express();
const port = 3000;
const { kMaxLength } = require('buffer');
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://tiklupisatitan:5HO46T1CfOWJSwAE@pkcluster.t7k53yl.mongodb.net/?retryWrites=true&w=majority";
// Replace the following with your Atlas connection string                                                                                                                                        
const client = new MongoClient(uri);
const dbName="test";

// For parsing application/json
app.use(express.json());
 
// For parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('Hello World!');
  });

app.get('/addProductToCart',async (req,res)=>{

    let requestBody=req.body;
    console.log(requestBody);
    await saveNewProduct(requestBody).then(()=>res.send("Data Stored Successfully")).catch(()=>{"Error Failed"});
})

async function saveNewProduct(newProduct) {
    try {
        await client.connect();
        console.log("Connected correctly to server");
        const db=client.db(dbName);
        // Use the collection "people"
        const col = db.collection("pkcollection");

        let addToCartProduct = newProduct;

         // Insert a single document, wait for promise so we can read it back
         const p = await col.insertOne(addToCartProduct);
         // Find one document
         //  const myDoc = await col.findOne();
         // Print to the console
        //  console.log(myDoc);

    } catch (err) {
        console.log(err.stack);
    }
    finally {
        await client.close();
    }
}


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  });
