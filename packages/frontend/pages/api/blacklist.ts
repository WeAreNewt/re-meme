// @ts-ignore
import type { NextApiRequest, NextApiResponse } from 'next';
// @ts-ignore
import dynamodb from '../../lib/dynamodb';

export default async function handler (_req: NextApiRequest, res: NextApiResponse) {
  const now = new Date().getTime();

  const {
    body: { postId },
    method,
  } = _req;

  switch (method) {
    case 'POST':
      return handlePost(Number(postId), now, res);
    case 'GET':
      return handleGet(Number(postId), now, res);
    default:
      res.status(405);
  }
};

const handlePost = async (postId: number, unixtime: number, res: NextApiResponse) => {
  const params = {
    TableName: 'Memixer',
    Item: {
      postId,
      unixtime,
    },
    ConditionExpression: 'attribute_not_exists(postId)',
  };

  try {
    await dynamodb.put(params).promise();
    return res.status(200).json({ postId: postId, date: unixtime, blacklisted: false });
  } catch (error) {
    return res.status(500).json(error);
  }
};

const handleGet = async (postId: number, unixtime: number, res: NextApiResponse) => {
  const params = {
    TableName: 'Memixer',
    Key: {
      postId,
    },
  };

  try {
    console.log('hit1');
    const result = await dynamodb.get(params).promise();
    console.log('hit2');
    if (unixtime - result.Item?.unixtime > 1000 * 60 * 10) {
      res.status(200).json({
        postId: postId,
        date: result.Item?.unixtime,
        blacklisted: true,
      }); // blacklist
    } else {
      res.status(200).json({
        postId: postId,
        date: result.Item?.unixtime,
        blacklisted: false,
      }); // no blacklist
    }
  } catch (error) {
    return res.status(404);
  }
};