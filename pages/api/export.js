import { PrismaClient } from '@prisma/client';
import xlsx from 'xlsx';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).end();

  try {
    const foods = await prisma.food.findMany();

    const data = foods.map((f) => ({
      BRAND: f.brand,
      name: f.name,
      level: f.quality,
      size: f.size,
      age: f.lifeStage,
      tags: f.tags,
      'animal protein': f.animalSource,
      protein: f.protein,
      fat: f.fat,
      fibres: f.fiber,
      ash: f.ash,
      moisture: f.moisture,
      na: f.sodium,
      ca: f.calcium,
      mag: f.magnesium,
      phos: f.phosphorus,
    }));

    const worksheet = xlsx.utils.json_to_sheet(data);
    const workbook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(workbook, worksheet, 'Foods');

    const buffer = xlsx.write(workbook, { type: 'buffer', bookType: 'xlsx' });

    res.setHeader('Content-Disposition', 'attachment; filename=foods_export.xlsx');
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.status(200).send(buffer);
  } catch (error) {
    console.error('❌ Export error:', error);
    res.status(500).json({ error: 'Export failed.' });
  }
}
