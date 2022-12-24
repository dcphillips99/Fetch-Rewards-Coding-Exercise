const itemSchema = 
{
    type: "object",
    properties: {

        shortDescription: {type: "string"},
        price: {type: "string"}
    }, 
    required: ["shortDescription", "price"],
    additionalProperties: false
}

const innerSchema = 
{
    type: "array",
    minItems: 1,
    items: itemSchema
}
const receiptSchema = 
{
    type: "object",
    properties : 
    {
        retailer: {type: "string"},
        purchaseDate: {type: "string"},
        purchaseTime: {type: "string"},
        total: {type: "string"},
        items: innerSchema
    },
    required: ["retailer", "purchaseDate", "purchaseTime","total"],
    additionalProperties: false
}

module.exports = {
    itemSchema,
    innerSchema, 
    receiptSchema
  }