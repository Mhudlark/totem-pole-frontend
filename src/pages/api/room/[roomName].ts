import type { NextApiRequest, NextApiResponse } from 'next';

import { RequestMethod } from '@/backend/api/helpers';
import type { RoomPayload } from '@/backend/api/room/helpers';
import { getRoom } from '@/backend/api/room/methods/get';
import { updateRoom } from '@/backend/api/room/methods/update';

export type Handler = (req: NextApiRequest, res: NextApiResponse) => void;

const handler: Handler = async (req, res) => {
  try {
    const method = req.method as RequestMethod;
    const roomName = req.query.roomName as string;

    // =============== GET ===============
    if (method === RequestMethod.GET) {
      const room = await getRoom(roomName);

      res.status(200).json({ room });
    }
    // =============== PUT ===============
    else if (method === RequestMethod.PUT) {
      const roomPayload = req.body as RoomPayload;
      const room = updateRoom(roomName, roomPayload);

      res.status(200).json({ room });
    }
    // ============ UNHANDLED ============
    throw new Error(`Unhandled method ${method}`);
  } catch (error) {
    res.status(500).send(error);
  }
};

export default handler;
