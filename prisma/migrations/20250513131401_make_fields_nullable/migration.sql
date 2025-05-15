-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Food" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "brand" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "species" TEXT NOT NULL,
    "lifeStage" TEXT NOT NULL,
    "size" TEXT NOT NULL,
    "tags" TEXT NOT NULL,
    "protein" REAL,
    "fat" REAL,
    "fiber" REAL,
    "sodium" REAL,
    "magnesium" REAL,
    "calcium" REAL,
    "phosphorus" REAL,
    "kcalPerKg" INTEGER,
    "gramsPerKg" INTEGER
);
INSERT INTO "new_Food" ("brand", "calcium", "fat", "fiber", "gramsPerKg", "id", "kcalPerKg", "lifeStage", "magnesium", "name", "phosphorus", "protein", "size", "sodium", "species", "tags") SELECT "brand", "calcium", "fat", "fiber", "gramsPerKg", "id", "kcalPerKg", "lifeStage", "magnesium", "name", "phosphorus", "protein", "size", "sodium", "species", "tags" FROM "Food";
DROP TABLE "Food";
ALTER TABLE "new_Food" RENAME TO "Food";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
