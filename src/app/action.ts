"use server";

import prisma from "@/lib/prisma";

export async function getResidentalById(id: string) {
  const residental = await prisma.residental.findUnique({
    where: {
      row_number: id,
    },
    include: {
      property_type: true,
      province: true,
    },
  });
  return residental;
}

export async function getCurrentCityTrainStation() {
  const cityTrainStation = await prisma.cityTrainStation.findMany({
    where: {
      status: "ปัจจุบัน",
    },
  });
  return cityTrainStation;
}
