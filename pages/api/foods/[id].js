import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === 'GET') {
    try {
      const food = await prisma.food.findUnique({ where: { id: parseInt(id) } });
      return res.status(200).json(food);
    } catch (err) {
      return res.status(500).json({ error: 'Failed to fetch food.' });
    }
  }

  if (req.method === 'PUT') {
    try {
      const data = req.body;
      const updated = await prisma.food.update({
        where: { id: parseInt(id) },
        data: {
          ...data,
          protein: data.protein ? parseFloat(data.protein) : null,
          fat: data.fat ? parseFloat(data.fat) : null,
          fiber: data.fiber ? parseFloat(data.fiber) : null,
          sodium: data.sodium ? parseFloat(data.sodium) : null,
          magnesium: data.magnesium ? parseFloat(data.magnesium) : null,
          calcium: data.calcium ? parseFloat(data.calcium) : null,
          phosphorus: data.phosphorus ? parseFloat(data.phosphorus) : null,
          kcalPerKg: data.kcalPerKg ? parseInt(data.kcalPerKg) : null,
          gramsPerKg: data.gramsPerKg ? parseInt(data.gramsPerKg) : null,
        }
      });
      return res.status(200).json(updated);
    } catch (err) {
      return res.status(500).json({ error: 'Failed to update food.' });
    }
  }

  if (req.method === 'DELETE') {
    try {
      await prisma.food.delete({ where: { id: parseInt(id) } });
      return res.status(200).json({ message: 'Deleted.' });
    } catch (err) {
      return res.status(500).json({ error: 'Failed to delete food.' });
    }
  }

  return res.status(405).json({ message: 'Method not allowed' });
}
