/*
  Warnings:

  - You are about to drop the column `gramsPerKg` on the `Food` table. All the data in the column will be lost.
  - You are about to drop the column `kcalPerKg` on the `Food` table. All the data in the column will be lost.
  - You are about to drop the column `species` on the `Food` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Food" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "brand" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "quality" TEXT,
    "size" TEXT,
    "lifeStage" TEXT,
    "tags" TEXT,
    "animalSource" TEXT,
    "protein" REAL,
    "fat" REAL,
    "fiber" REAL,
    "ash" REAL,
    "moisture" REAL,
    "sodium" REAL,
    "calcium" REAL,
    "magnesium" REAL,
    "phosphorus" REAL
);
INSERT INTO "new_Food" ("brand", "calcium", "fat", "fiber", "id", "lifeStage", "magnesium", "name", "phosphorus", "protein", "size", "sodium", "tags") SELECT "brand", "calcium", "fat", "fiber", "id", "lifeStage", "magnesium", "name", "phosphorus", "protein", "size", "sodium", "tags" FROM "Food";
DROP TABLE "Food";
ALTER TABLE "new_Food" RENAME TO "Food";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
