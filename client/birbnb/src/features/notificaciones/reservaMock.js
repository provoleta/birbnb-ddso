export const reservas = [
  {
    _id: '6838ea48875bf243eabe76b6',
    alojamiento: {
      id: 1,
      anfitrion: {
        nombre: 'Juan Pérez',
        email: 'juanperez@mail.com',
        tipo: 'ANFITRION',
      },
      nombre: 'Casa en la playa',
      descripcion: 'Hermosa casa frente al mar con piscina y WiFi.',
      precioPorNoche: 15000,
      moneda: 'PESO_ARG',
      horarioCheckIn: '14:00',
      horarioCheckOut: '11:00',
      direccion: {
        calle: 'Costanera',
        numero: 123,
        ciudad: 'Mar del Plata',
        pais: 'Argentina',
        lat: -38.0055,
        long: -57.5426,
      },
      cantHuespedesMax: 6,
      caracteristicas: ['WIFI', 'PISCINA', 'ESTACIONAMIENTO'],
      reservas: [],
      fotos: [
        {
          descripcion: 'Vista al mar',
          path: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb',
        },
      ],
    },
    createdAt: '2025-05-29T23:14:16.580Z',
    estado: 'PENDIENTE',
    fechaAlta: '2025-05-10T03:00:00.000Z',
    huespedReservador: '6850e4437d3b16801538cedf',
    precioPorNoche: 120,
    rangoFechas: {
      fechaInicio: '2025-06-24T03:00:00.000Z',
      fechaFin: '2025-06-25T03:00:00.000Z',
      _id: '6838ea48875bf243eabe76b7',
    },
    updatedAt: '2025-05-29T23:14:16.580Z',
  },
]
