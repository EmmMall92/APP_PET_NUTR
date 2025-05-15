import formidable from 'formidable';
import fs from 'fs';
import xlsx from 'xlsx';
import { PrismaClient } from '@prisma/client';

export const config = {
  api: {
    bodyParser: false,
  },
};

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const form = formidable({
    multiples: false,
    keepExtensions: true,
    uploadDir: './tmp'
  });

  form.parse(req, async (err, fields, files) => {
    if (err) return res.status(500).json({ error: 'Upload failed' });

    const file = files.file;
    const filePath = Array.isArray(file) ? file[0].filepath : file?.filepath;
    if (!filePath) return res.status(400).json({ error: 'No file path found.' });

    const data = fs.readFileSync(filePath);
    const workbook = xlsx.read(data, { type: 'buffer' });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const rows = xlsx.utils.sheet_to_json(sheet);

    const inserted = [];

    for (const row of rows) {
      try {
        const food = await prisma.food.create({
          data: {
            brand: row.BRAND,
            name: row.name,
            quality: row.level,
            size: row.size,
            lifeStage: row.age?.toLowerCase(),
            tags: row.tags,
            animalSource: row['animal protein'],
            protein: parseFloat(row.protein) || null,
            fat: parseFloat(row.fat) || null,
            fiber: parseFloat(row.fibres) || null,
            ash: parseFloat(row.ash) || null,
            moisture: parseFloat(row.moisture) || null,
            sodium: parseFloat(row.na) || null,
            calcium: parseFloat(row.ca) || null,
            magnesium: parseFloat(row.mag) || null,
            phosphorus: parseFloat(row.phos) || null,
          },
        });
        inserted.push(food.name);
      } catch (e) {
        console.error('❌ Σφάλμα καταχώρησης:', row.name, e.message);
      }
    }

    res.status(200).json({ message: `✅ Προστέθηκαν ${inserted.length} τροφές.` });
  });
}
