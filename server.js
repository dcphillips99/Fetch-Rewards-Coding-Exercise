const express = require("express");
const app = express();
import { v4 as uuidv4 } from "uuid";

app.use(express.json());

const receipts = new Map();

//remove this before submit! !!!!!!!!!!
app.get("/", (req, res) => 
{
  res.send("Hello");
});

//transaction add should check the incoming POST request and
//ensure that the data recieved is an ARRAY carrying OBJECTS of form
// "payer": x "points": x "timestamp": x
//AKA the format for transactions.
//Should also add new transactions to current list
app.post("/receipts/process", (req, res) => 
{
  let data = req.body;
  let totalPoints =
    retailName(data.retailer) +
    checkRoundDollar(data.total) +
    checkMultiple(data.total);
  totalPoints +=
    numItems(data.items.length) +
    purchaseDay(data.purchaseDate) +
    purchaseTime(data.purchaseTime);

  data.items.forEach((item) => 
  {
    totalPoints += checkDescription(item);
  });
});

function purchaseTime(time)
{
  let points = 0;
  let splitTime = time.split(':');
  let earlyTime, lateTime, receiptTime = new Date();
  earlyTime.setHours(14,0,0);
  lateTime.setHours(16,0,0);
  receiptTime.setHours(splitTime[0], splitTime[1], 0);

  if (receiptTime >= earlyTime && receiptTime <= lateTime)
  {
    points = 10;
  }
  return points;
}
//function to check if the purchase date is odd
//and rewards points if so.
//returns  6 points if odd, 0 points if not
function purchaseDate(date)
{
  let points = 0;
  let splitDate = date.split('-');

  if (splitDate[2] % 2 != 0)
  {
    points = 6;
  }
  return points;
}
//returns 5 points for every 2 items on the receipt
function numItems(itemsLength)
{ 
    return Math.floor(itemsLength / 2) * 5;
}
//Takes in the total spent from receipt data
//and checks of it is a round dollar amount.
//returns 50 points if a round amount is found,
//if not sends no points.
function checkRoundDollar(total) 
{
  let points = 0;
  if (total % 1 != 0) 
  {
    points = 50;
  }
  return points;
}

//takes in the name of the retailer and counts each
//alphanumeric character.
// rName = string (retail name)
// returns # of points awarded
function retailName(rName) 
{
  let retail = rName.replace(/[^\w\s]/gi, "");
  let points = 0;
  retail.forEach((character) => {
    if (character !== " ") 
    {
      points += 1;
    }
  });

  return points;
}

//checks that the total is a multiple of .25
//by doing total (modulo) 0.25.
//returns 25 points if it is a multiple,
//and no points if it is not
function checkMultiple(total) 
{
  let points = 0;

  if (total % 0.25 == 0) 
  {
    points = 25;
  }
  return points;
}

app.listen(3000);
