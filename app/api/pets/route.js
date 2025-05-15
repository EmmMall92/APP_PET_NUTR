import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request) {
  const body = await request.json();

  const {
    species,
    age,
    weight,
    breedSize,
    lifeStage,
    activityLevel,
    healthIssues = []
  } = body;

  try {
    const pet = await prisma.pet.create({
      data: {
        species,
        age,
        weight,
        breedSize,
        lifeStage,
        activityLevel,
        healthIssues
      }
    });

    return Response.json({ message: 'Κατοικίδιο δημιουργήθηκε', pet });
  } catch (error) {
    console.error(error);
    return new Response('Σφάλμα κατά την αποθήκευση του κατοικιδίου', { status: 500 });
  }
}
