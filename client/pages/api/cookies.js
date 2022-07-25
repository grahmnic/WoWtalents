// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getCookies } from 'cookies-next';

export default async function handler(req, res) {
  return res.json(getCookies({ req, res }));
}
