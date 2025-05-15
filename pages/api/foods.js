import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const safeFloat = (value) => {
  const parsed = parseFloat(value);
  return isNaN(parsed) ? null : parsed;
};

const safeInt = (value) => {
  const parsed = parseInt(value);
  return isNaN(parsed) ? null : parsed;
};

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const foods = await prisma.food.findMany({
        orderBy: { id: 'desc' },
      });
      return res.status(200).json(foods);
    } catch (error) {
      console.error("GET ERROR:", error);
      return res.status(500).json({ error: "Failed to fetch foods" });
    }
  }

  if (req.method === 'POST') {
    try {
      const {
        brand,
        name,
        species,
        lifeStage,
        size,
        tags,
        protein,
        fat,
        fiber,
        sodium,
        magnesium,
        calcium,
        phosphorus,
        kcalPerKg,
        gramsPerKg,
      } = req.body;

      const food = await prisma.food.create({
        data: {
          brand,
          name,
          species,
          lifeStage,
          size,
          tags,
          protein: safeFloat(protein),
          fat: safeFloat(fat),
          fiber: safeFloat(fiber),
          sodium: safeFloat(sodium),
          magnesium: safeFloat(magnesium),
          calcium: safeFloat(calcium),
          phosphorus: safeFloat(phosphorus),
          kcalPerKg: safeInt(kcalPerKg),
          gramsPerKg: safeInt(gramsPerKg),
        },
      });

      res.status(200).json(food);
    } catch (error) {
      console.error("POST ERROR:", error);
      res.status(500).json({ error: 'Something went wrong.', details: error.message });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
