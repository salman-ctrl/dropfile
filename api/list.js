import { list } from '@vercel/blob';

export default async function handler(req, res) {
  try {
    const { blobs } = await list({ prefix: 'share/', limit: 1000 });
    blobs.sort((a, b) => new Date(b.uploadedAt) - new Date(a.uploadedAt));
    res.setHeader('Cache-Control', 'no-store');
    res.status(200).json(blobs);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
