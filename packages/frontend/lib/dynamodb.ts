import AWS from "aws-sdk";

AWS.config.update({
  accessKeyId: process.env.accesKeyId,
  secretAccessKey: process.env.secretAccessKey,
  region: "eu-west-1",
});

const dynamodb = new AWS.DynamoDB.DocumentClient({ apiVersion: "latest" });

export default dynamodb;