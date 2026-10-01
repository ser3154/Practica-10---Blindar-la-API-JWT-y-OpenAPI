import 'dotenv/config';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';
import * as bcrypt from 'bcryptjs';
import { PrismaClient } from '../src/generated/prisma/client';

const adapter = new PrismaMariaDb({
  host: process.env.DB_HOST ?? 'localhost',
  port: Number(process.env.DB_PORT ?? 3306),
  user: process.env.DB_USER ?? 'root',
  password: process.env.DB_PASSWORD ?? '',
  database: process.env.DB_NAME ?? 'gimnasio',
  allowPublicKeyRetrieval: true,
});
const prisma = new PrismaClient({ adapter });

async function main() {
  const passwordHash = await bcrypt.hash('gimnasio2026', 10);

  const cuentas = [
    { correo: 'karla@itson.mx', rol: 'miembro', miembroId: 1 },
    { correo: 'ana@itson.mx', rol: 'entrenador', miembroId: null },
    { correo: 'admin@itson.mx', rol: 'admin', miembroId: null },
  ];

  for (const c of cuentas) {
    await prisma.usuario.upsert({
      where: { correo: c.correo },
      update: {},
      create: { ...c, passwordHash },
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());