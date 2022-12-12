const express = require("express");
const app = express();

app.use(express.json());

var transactions;

app.get('/', (req, res) => 
{
    res.send("Hello");
})

//transaction add should check the incoming POST request and 
//ensure that the data recieved is an ARRAY carrying OBJECTS of form
// "payer": x "points": x "timestamp": x
//AKA the format for transactions. Should also add new transactions to current list
app.post('/transaction-add', (req, res) => 
{
    //check that request has a body at all
    if (req.body == null) 
    {
        res.send("No transactions found.");
        return;
    }

    //check that each property is correct in each transaction object
    req.body.forEach(transaction => 
    {
        if (!("payer" in transaction && "points" in transaction && "timestamp" in transaction))
        {
            res.send("Check that transactions are in the correct format: [{\"payer\": xxxx, \"points\": xxxx, \"timestamp\": \"2022-10-31T10:00:00Z\"}]");
            return;
        }
    });

    transactions = req.body;

    res.send("transaction recieved");
    console.log(transactions);
});

app.listen(3000);

