-- CreateTable
CREATE TABLE "Food" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "brand" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "species" TEXT NOT NULL,
    "lifeStage" TEXT NOT NULL,
    "size" TEXT NOT NULL,
    "tags" TEXT NOT NULL,
    "protein" REAL NOT NULL,
    "fat" REAL NOT NULL,
    "fiber" REAL NOT NULL,
    "sodium" REAL NOT NULL,
    "magnesium" REAL NOT NULL,
    "calcium" REAL NOT NULL,
    "phosphorus" REAL NOT NULL,
    "kcalPerKg" INTEGER NOT NULL,
    "gramsPerKg" INTEGER NOT NULL
);
