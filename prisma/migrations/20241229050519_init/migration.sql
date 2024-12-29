-- CreateTable
CREATE TABLE "Registro" (
    "id" SERIAL NOT NULL,
    "titulo" TEXT NOT NULL,
    "contenido" TEXT NOT NULL,

    CONSTRAINT "Registro_pkey" PRIMARY KEY ("id")
);
