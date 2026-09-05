-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateEnum
CREATE TYPE "DampReportStatus" AS ENUM ('RECEIVED', 'INSPECTION_BOOKED', 'INSPECTED', 'REPAIRS_STARTED', 'CLOSED');

-- CreateEnum
CREATE TYPE "EvacuationPlan" AS ENUM ('STAY_PUT', 'SIMULTANEOUS_EVACUATION');

-- CreateEnum
CREATE TYPE "CheckType" AS ENUM ('GAS_SERVICE', 'ELECTRICAL_INSPECTION', 'FLAT_FIRE_DOOR', 'SMOKE_ALARM', 'CO_ALARM');

-- CreateTable
CREATE TABLE "PageFeedback" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "helpful" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PageFeedback_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DampReport" (
    "id" TEXT NOT NULL,
    "reference" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT,
    "addressLine" TEXT NOT NULL,
    "postcode" TEXT NOT NULL,
    "rooms" TEXT[],
    "severity" TEXT NOT NULL,
    "duration" TEXT NOT NULL,
    "household" TEXT[],
    "details" TEXT,
    "status" "DampReportStatus" NOT NULL DEFAULT 'RECEIVED',
    "investigateBy" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "addressId" TEXT,

    CONSTRAINT "DampReport_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Building" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "storeys" INTEGER,
    "heightMetres" DOUBLE PRECISION,
    "higherRisk" BOOLEAN NOT NULL DEFAULT false,
    "evacuationPlan" "EvacuationPlan" NOT NULL DEFAULT 'STAY_PUT',
    "lastFireRiskAssessment" TIMESTAMP(3),
    "lastCommunalFireDoorCheck" TIMESTAMP(3),

    CONSTRAINT "Building_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Address" (
    "id" TEXT NOT NULL,
    "uprn" TEXT NOT NULL,
    "line1" TEXT NOT NULL,
    "postcode" TEXT NOT NULL,
    "postcodeKey" TEXT NOT NULL,
    "buildingId" TEXT,

    CONSTRAINT "Address_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SafetyCheck" (
    "id" TEXT NOT NULL,
    "addressId" TEXT NOT NULL,
    "type" "CheckType" NOT NULL,
    "lastDone" TIMESTAMP(3),
    "nextDue" TIMESTAMP(3),

    CONSTRAINT "SafetyCheck_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AsbestosRecord" (
    "id" TEXT NOT NULL,
    "externalId" TEXT NOT NULL,
    "addressId" TEXT,
    "buildingId" TEXT,
    "location" TEXT NOT NULL,
    "material" TEXT NOT NULL,
    "condition" TEXT NOT NULL,
    "lastInspected" TIMESTAMP(3),
    "syncedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AsbestosRecord_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "PageFeedback_slug_idx" ON "PageFeedback"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "DampReport_reference_key" ON "DampReport"("reference");

-- CreateIndex
CREATE INDEX "DampReport_postcode_idx" ON "DampReport"("postcode");

-- CreateIndex
CREATE INDEX "DampReport_status_idx" ON "DampReport"("status");

-- CreateIndex
CREATE UNIQUE INDEX "Address_uprn_key" ON "Address"("uprn");

-- CreateIndex
CREATE INDEX "Address_postcodeKey_idx" ON "Address"("postcodeKey");

-- CreateIndex
CREATE UNIQUE INDEX "SafetyCheck_addressId_type_key" ON "SafetyCheck"("addressId", "type");

-- CreateIndex
CREATE UNIQUE INDEX "AsbestosRecord_externalId_key" ON "AsbestosRecord"("externalId");

-- CreateIndex
CREATE INDEX "AsbestosRecord_addressId_idx" ON "AsbestosRecord"("addressId");

-- CreateIndex
CREATE INDEX "AsbestosRecord_buildingId_idx" ON "AsbestosRecord"("buildingId");

-- AddForeignKey
ALTER TABLE "DampReport" ADD CONSTRAINT "DampReport_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "Address"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_buildingId_fkey" FOREIGN KEY ("buildingId") REFERENCES "Building"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SafetyCheck" ADD CONSTRAINT "SafetyCheck_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "Address"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AsbestosRecord" ADD CONSTRAINT "AsbestosRecord_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "Address"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AsbestosRecord" ADD CONSTRAINT "AsbestosRecord_buildingId_fkey" FOREIGN KEY ("buildingId") REFERENCES "Building"("id") ON DELETE SET NULL ON UPDATE CASCADE;

