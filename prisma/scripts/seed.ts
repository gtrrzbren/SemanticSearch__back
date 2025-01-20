import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function seed() {
  // Insertar 10 registros de prueba
  await prisma.registro.createMany({
    data: [
      {
        searchTerm: 'crisis energética',
        media: 'GRANMA',
        autor: 'Juan Pérez',
        publicationDate: new Date('2023-10-01'),
        section: 'ECONOMIA',
        contenido: `
          La crisis energética en Cuba ha generado un impacto significativo en la economía del país. 
          Los cortes de electricidad se han vuelto frecuentes en varias provincias, afectando a hogares, 
          industrias y servicios públicos. El gobierno ha implementado medidas para mitigar la situación, 
          pero la población sigue enfrentando dificultades. Expertos señalan que la solución a largo plazo 
          requiere inversiones en infraestructura y energías renovables.
        `,
      },
      {
        searchTerm: 'turismo en Cuba',
        media: 'JUVENTUD_REBELDE',
        autor: 'Ana López',
        publicationDate: new Date('2023-09-15'),
        section: 'TURISMO',
        contenido: `
          El turismo en Cuba ha experimentado un crecimiento notable en los últimos meses. 
          La isla ha recibido un aumento significativo de visitantes, especialmente de Europa y Canadá. 
          Las playas de Varadero y los hoteles de La Habana han reportado una ocupación casi total. 
          Sin embargo, algunos expertos advierten sobre la necesidad de mejorar la infraestructura 
          turística para sostener este crecimiento a largo plazo.
        `,
      },
      {
        searchTerm: 'avances científicos',
        media: 'CUBADEBATE',
        autor: 'Carlos Martínez',
        publicationDate: new Date('2023-08-20'),
        section: 'CIENCIA_Y_TECNOLOGIA',
        contenido: `
          Científicos cubanos han logrado avances significativos en el campo de la biotecnología. 
          Recientemente, se anunció el desarrollo de una nueva vacuna contra el dengue, que ha mostrado 
          resultados prometedores en ensayos clínicos. Este logro refuerza la reputación de Cuba como 
          líder en investigación médica en América Latina. Además, se espera que este avance tenga un 
          impacto positivo en la salud pública a nivel regional.
        `,
      },
      {
        searchTerm: 'cultura cubana',
        media: 'TRABAJADORES',
        autor: 'María González',
        publicationDate: new Date('2023-07-10'),
        section: 'CULTURA',
        contenido: `
          La cultura cubana es reconocida mundialmente por su riqueza y diversidad. Desde la música 
          tradicional como el son y la rumba, hasta el arte contemporáneo, Cuba ha sido cuna de grandes 
          artistas. Recientemente, se celebró el Festival Internacional de Ballet de La Habana, que 
          atrajo a bailarines y espectadores de todo el mundo. Este evento refuerza la importancia de 
          Cuba como centro cultural en el Caribe.
        `,
      },
      {
        searchTerm: 'deportes en Cuba',
        media: 'BOHEMIA',
        autor: 'Luis Rodríguez',
        publicationDate: new Date('2023-06-05'),
        section: 'DEPORTES',
        contenido: `
          Los deportes en Cuba han alcanzado un alto nivel de desarrollo en los últimos años. 
          Atletas cubanos han destacado en competencias internacionales, especialmente en boxeo, 
          atletismo y béisbol. Recientemente, el equipo nacional de béisbol ganó el Campeonato 
          Centroamericano, consolidando su posición como uno de los mejores de la región. 
          El gobierno continúa invirtiendo en la formación de jóvenes talentos para mantener 
          este éxito en el futuro.
        `,
      },
      {
        searchTerm: 'medio ambiente',
        media: 'PRENSA_LATINA',
        autor: 'Elena Fernández',
        publicationDate: new Date('2023-05-12'),
        section: 'MEDIO_AMBIENTE',
        contenido: `
          Cuba ha implementado políticas efectivas para la protección del medio ambiente. 
          Recientemente, se lanzó un programa nacional para la reforestación y la conservación 
          de áreas naturales. Además, se han establecido nuevas regulaciones para reducir la 
          contaminación en las ciudades. Expertos internacionales han elogiado estos esfuerzos, 
          destacando el compromiso de Cuba con el desarrollo sostenible.
        `,
      },
      {
        searchTerm: 'educación en Cuba',
        media: 'ADELANTE',
        autor: 'Roberto Sánchez',
        publicationDate: new Date('2023-04-18'),
        section: 'EDUCACION',
        contenido: `
          El sistema educativo cubano es reconocido por su calidad y accesibilidad. 
          Recientemente, se graduaron más de 10,000 nuevos maestros, quienes se incorporarán 
          a las escuelas de todo el país. Además, se ha implementado un nuevo programa de 
          educación digital para mejorar el acceso a la tecnología en las aulas. 
          Estos esfuerzos buscan garantizar que todos los niños y jóvenes tengan acceso 
          a una educación de calidad.
        `,
      },
      {
        searchTerm: 'salud pública',
        media: 'VANGUARDIA',
        autor: 'Laura Díaz',
        publicationDate: new Date('2023-03-22'),
        section: 'SALUD',
        contenido: `
          Cuba ha logrado avances significativos en el campo de la salud pública. 
          Recientemente, se inauguró un nuevo hospital especializado en enfermedades 
          crónicas en La Habana. Este centro cuenta con tecnología de última generación 
          y personal altamente capacitado. Además, se ha lanzado una campaña nacional 
          para promover la vacunación contra la influenza, lo que ha sido bien recibido 
          por la población.
        `,
      },
      {
        searchTerm: 'política internacional',
        media: 'AHORA',
        autor: 'Pedro Gómez',
        publicationDate: new Date('2023-02-14'),
        section: 'INTERNACIONAL',
        contenido: `
          Cuba mantiene una política internacional activa y comprometida con la paz. 
          Recientemente, el gobierno cubano participó en una cumbre regional sobre 
          cooperación económica en América Latina. Durante el evento, se firmaron 
          varios acuerdos bilaterales para fortalecer las relaciones comerciales y 
          culturales con otros países. Además, Cuba ha reiterado su compromiso con 
          la no intervención en los asuntos internos de otros estados.
        `,
      },
      {
        searchTerm: 'historia de Cuba',
        media: 'RADIO_REBELDE',
        autor: 'Sofía Ramírez',
        publicationDate: new Date('2023-01-30'),
        section: 'HISTORIA',
        contenido: `
          La historia de Cuba es rica en eventos que han marcado el desarrollo del país. 
          Desde la lucha por la independencia en el siglo XIX hasta la Revolución Cubana 
          en 1959, la isla ha sido escenario de importantes transformaciones sociales y 
          políticas. Recientemente, se inauguró un nuevo museo en Santiago de Cuba 
          dedicado a la historia de la Revolución, que ha atraído a miles de visitantes 
          interesados en conocer más sobre este período crucial.
        `,
      },
    ],
  }).catch((e) => {
    console.error(e);
    process.exit(1);
  })
    .finally(async () => {
      await prisma.$disconnect();
    });;
}