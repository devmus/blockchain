import { blockchain } from '../startup.mjs';
import { ErrorResponse } from '../utilities/ErrorResponseModel.mjs';
import { ResponseModel } from '../utilities/ResponseModel.mjs';

export const listMembers = (req, res, next) => {
  res.status(200).json(
    new ResponseModel({
      statusCode: 200,
      data: [blockchain.nodeUrl, ...blockchain.memberNodes],
    })
  );
};

export const registerNode = (req, res, next) => {
  const node = req.body;

  if (
    blockchain.memberNodes.indexOf(node.nodeUrl) === -1 &&
    blockchain.nodeUrl !== node.nodeUrl
  ) {
    blockchain.memberNodes.push(node.nodeUrl);

    syncMembers(node.nodeUrl);

    res.status(201).json(
      new ResponseModel({
        statusCode: 201,
        data: { message: `Noden ${node.nodeUrl} är registrerad` },
      })
    );
  } else {
    return next(
      new ErrorResponse(`Noden ${node.nodeUrl} är redan registrerad`, 400)
    );
  }
};

const syncMembers = async (url) => {
  const members = [...blockchain.memberNodes, blockchain.nodeUrl];

  try {
    for (const member of members) {
      const body = { nodeUrl: member };

      await fetch(`${url}/api/v1/members/register-node`, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      await fetch(`${url}/api/v1/blockchain/consensus`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }
  } catch (error) {
    console.log('Error during node synchronization:', error);
  }
};
