import { NextApiRequest, NextApiResponse } from "next";
import { NextHandler } from "next-connect";
import { generateApolloClient } from "../config/apollo";
import { VerifyData, VerifyParams } from "../models/Auth/auth.model";
import { VERIFY } from "../queries/auth";

type ExtendedRequest  = {
  canvasState: string
  meme: string
} & NextApiRequest

export const verifyToken = async (req: ExtendedRequest, res: NextApiResponse, next: NextHandler) => {
  const apolloClient = generateApolloClient()
  const jwt = req.headers.authorization
  if(!jwt) {
      res.status(401).send('UNAUTHORIZED')
      return;
  }
  const accessToken = jwt?.split(' ')[1]
  const { data } = await apolloClient.query<VerifyData, VerifyParams>({
      query: VERIFY,
      variables: {
          request: {
              accessToken
          }
      },
  })
  if(data.verify) {
      next()
      return;
  }
  res.status(401).send('UNAUTHORIZED')
}
