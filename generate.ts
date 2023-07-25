import { prisma } from "@/app/libs/prisma";

async function generate() {
  await prisma.$refresh();
}

generate();
