const express = require("express");
const app = express();

app.use(express.json());

var transactions;
var totalPoints = 0;

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
        totalPoints += parseInt(transaction.points);
        console.log(totalPoints);
    });

    transactions = req.body;

    //this sorts the transactions array by timestamps in descending order (oldest first)
    transactions.sort(function(x, y)
    {
        return new Date(x.timestamp) - new Date(y.timestamp);
    });

    console.log(transactions);
    res.send("transaction recieved");
});

//spend POST request should subtract the oldest points from the user's account.
//First search based on oldest points (look for oldest year, month, then day)
//Then use all of those points.
app.post('/spend', (req, res) => 
{
    let spendAmount = req.body.points;

    if (spendAmount > totalPoints)
    {
        res.send("The amount of points you want to spend exceeds the current balance.");
        return;
    }

    for(var i = 0; i < transactions.length; ++i) 
    {

    }
});

app.listen(3000);

