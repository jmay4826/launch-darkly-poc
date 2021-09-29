import { NextApiRequest, NextApiResponse } from "next";
import { getClient } from "../../utils/launch-darkly-server";

export default async function handler(req: NextApiRequest, res: NextApiResponse<{ldPogEditor: boolean | 'defaultValue' }>){
    const client = await getClient();
  const ldPogEditor = await client.variation(
    "ld-pog-editor",
    {
      key: "anonymous",
    },
    "defaultValue"
  );

  res.json({ldPogEditor});
}
