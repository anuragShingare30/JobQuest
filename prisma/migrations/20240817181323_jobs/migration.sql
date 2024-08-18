/*
  Warnings:

  - Added the required column `clerkId` to the `Jobs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `company` to the `Jobs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `location` to the `Jobs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mode` to the `Jobs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `position` to the `Jobs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `Jobs` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Jobs" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "clerkId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "position" TEXT NOT NULL,
    "company" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "mode" TEXT NOT NULL
);
INSERT INTO "new_Jobs" ("createdAt", "id", "updatedAt") SELECT "createdAt", "id", "updatedAt" FROM "Jobs";
DROP TABLE "Jobs";
ALTER TABLE "new_Jobs" RENAME TO "Jobs";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
