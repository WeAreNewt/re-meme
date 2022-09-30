// @ts-ignore
import type { NextApiRequest, NextApiResponse } from 'next';
// @ts-ignore
import dynamodb from '../../lib/dynamodb';

export default async function handler (_req: NextApiRequest, res: NextApiResponse) {
  const now = new Date().getTime();

  switch (_req.method) {
    case 'POST':
      return handlePost(
        String(_req.body.postId),
        String(_req.body.option),
        String(_req.body.info),
        now,
        res);
    case 'GET':
      const { postId } = _req.query;
      return handleGet(String(postId), res);
    default:
      res.status(405);
  }
};

const handlePost = async (postId: string, option: string, info: string, unixtime: number, res: NextApiResponse) => {
  const params = {
    TableName: 'Memixer',
    Item: {
      postId,
      unixtime,
      option,
      info
    },
    ConditionExpression: 'attribute_not_exists(postId)',
  };

  try {
    await dynamodb.put(params).promise();
    return res.status(200).json({ postId: postId, date: unixtime, blacklisted: false });
  } catch (error : any) { 
    if(error.code === 'ConditionalCheckFailedException')
      return res.status(200).json({ postId: postId, date: unixtime, blacklisted: false });
    return res.status(500).json(error);
  }
};

export const getBlacklistedFromDb = async (postId: string) => {
  const params = {
    TableName: 'Memixer',
    Key: {
      postId,
    },
  };
  return dynamodb.get(params).promise().then(result => {
    const unixtime = new Date().getTime();
    if (unixtime - result.Item?.unixtime > 1000 * 60 * 10) {
      return {
        postId: postId,
        date: result.Item?.unixtime,
        blacklisted: true,
      } // blacklisted
    } else {
      return {
        postId: postId,
        date: result.Item?.unixtime,
        blacklisted: false,
      }; // no blacklist
    }
  });
}

const handleGet = async (postId: string, res: NextApiResponse) => {
  try {
    const result = await getBlacklistedFromDb(postId);
    res.status(200).json(result)
  } catch (error) {
    return res.status(404);
  }
};
