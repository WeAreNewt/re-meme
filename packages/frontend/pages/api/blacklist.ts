// @ts-ignore
import type { NextApiRequest, NextApiResponse } from 'next';
// @ts-ignore
import dynamodb from '../../lib/dynamodb';

export default async function handler (_req: NextApiRequest, res: NextApiResponse) {
  const now = new Date().getTime();

  switch (_req.method) {
    case 'POST':
      return handlePost(String(_req.body.postId), now, res);
    case 'GET':
      const { postId } = _req.query;
      return handleGet(String(postId), now, res);
    default:
      res.status(405);
  }
};

const handlePost = async (postId: string, unixtime: number, res: NextApiResponse) => {
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

const handleGet = async (postId: string, unixtime: number, res: NextApiResponse) => {
  const params = {
    TableName: 'Memixer',
    Key: {
      postId,
    },
  };

  try {
    const result = await dynamodb.get(params).promise();
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