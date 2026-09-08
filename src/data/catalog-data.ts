/**
 * Filas fuente del catálogo (sin URLs de imagen).
 * Las fotos se resuelven en runtime desde `src/assets/products/` por `imageCode`.
 * Varias fotos del mismo producto: `codigo`, `codigo_1`, `codigo_2`, …
 */
export interface CatalogSourceRow {
  id: string;
  title: string;
  description: string;
  /** Si no está, la ficha muestra «Consultar precio». */
  price?: number;
  /** Prefijo de archivos en assets/products */
  imageCode: string;
  badge?: string;
  highlights?: string[];
}

/** Precios confirmados: historial del catálogo + los 4 que pasaste. */
const CONFIRMED_PRICES: Partial<Record<string, number>> = {
  step_de_madera: 115_000,
  caja_inclinada: 150_000,
  caja_mediana_50x30_y_25cm_altura: 110_000,
  caja_grande_50x40_y_50cm_altura: 220_000,
  set_de_cajas_de_saltos: 470_000,
  colchoneta: 80_000,
  colchoneta_yoga: 120_000,
  tatami: 160_000,
  rodillo_abdominal_premiun: 80_000,
  rodillo_abdominal_basic: 65_000,
  pelota_pilate_x65: 95_000,
  pelota_pilate_x75: 120_000,
  protector_barras_top: 100_000,
  protector_barra: 80_000,
  tobillera_1kg: 100_000,
  tobillera_2kg: 105_000,
  tobillera_3kg: 115_000,
  tobillera_4kg: 120_000,
  tobillera_5kg: 125_000,
  tobillera_6kg: 130_000,
  tobillera_7kg: 140_000,
  tobillera_8kg: 150_000,
  tobillera_9kg: 155_000,
  tobillera_10kg: 170_000,
  munequera_500: 100_000,
  munequera_700: 110_000,
  munequera_1kg: 120_000,
  escalera_plastico: 90_000,
  set_gomas: 40_000,
  combo_bolsa_mas_step_de_madera: 250_000,
  combo_gluteos: 180_000,
  bolsa_con_peso_5kg: 160_000,
  bolsa_con_peso_10kg: 160_000,
  bolsa_con_peso_15kg: 160_000,
  bolsa_con_peso_20kg: 180_000,
  bolsa_con_peso_25kg: 200_000,
  bolsa_con_peso_30kg: 220_000,
  banco_plano: 350_000,
  banco_plano_premium: 700_000,
  banco_reclinable_premium: 780_000,
  sentadilla_bulgara: 380_000,
  maquina_de_hip_thrust: 950_000,
  trineo: 285_000,
  porta_discos: 890_000,
  pelota_medicinal_3k: 160_000,
  pelota_medicinal_4k: 190_000,
  pelota_medicinal_5k: 190_000,
  pelota_medicinal_6k: 220_000,
  pelota_medicinal_7k: 220_000,
  pelota_medicinal_8k: 235_000,
  pelota_medicinal_9k: 235_000,
  pelota_medicinal_10k: 250_000,
  chaleco_con_peso_5kg: 215_000,
  chaleco_con_peso_12kg: 250_000,
  chaleco_con_peso_20kg: 320_000,
  bolsa_boxeo_100cm: 210_000,
  bolsa_boxeo_150cm: 290_000,
  bolsa_boxeo_180cm: 360_000,
  cinta_trx: 130_000,
  set_de_poleas: 165_000,
};

const RAW_CATALOG_SOURCE: CatalogSourceRow[] = [
  {
    id: "step_de_madera",
    title: "Step de madera",
    description:
      "Step de madera maciza con superficie antideslizante.",
    price: 115_000,
    imageCode: "step_de_madera",
  },
  {
    id: "caja_inclinada",
    title: "Caja inclinada",
    description:
      "Tabla / caja inclinada de madera con superficie antideslizante. Ideal para estirar gemelos, sentadillas en pendiente y trabajo de movilidad.",
    price: 150_000,
    imageCode: "caja_inclinada",
  },
  {
    id: "caja_mediana_50x30_y_25cm_altura",
    title: "Caja de salto mediana — 50 × 30 × 25 cm",
    description:
      "Caja de salto mediana para pliometría y trabajo de potencia. Medidas aproximadas 50 × 30 cm y 25 cm de altura.",
    price: 110_000,
    imageCode: "caja_mediana_50x30_y_25cm_altura",
  },
  {
    id: "caja_grande_50x40_y_50cm_altura",
    title: "Caja de salto grande — 50 × 40 × 50 cm",
    description:
      "Caja de salto de mayor volumen para rutinas intensas y boxes. Medidas aproximadas 50 × 40 cm y 50 cm de altura.",
    price: 220_000,
    imageCode: "caja_grande_50x40_y_50cm_altura",
  },
  {
    id: "set_de_cajas_de_saltos",
    title: "Set de cajas de saltos",
    description:
      "Set de cajas / escalera de salto de madera con superficies antideslizantes. Varios niveles para progresar en pliometría y rehabilitación.",
    price: 470_000,
    imageCode: "set_de_cajas_de_saltos",
    badge: "Set",
  },
  {
    id: "colchoneta",
    title: "Colchoneta",
    description:
      "Colchoneta de cuerina que no absorbe el sudor. Medidas aproximadas 1,0 × 0,6 m.",
    price: 80_000,
    imageCode: "colchoneta",
  },
  {
    id: "colchoneta_yoga",
    title: "Colchoneta para yoga",
    description: "Colchoneta para yoga y estiramientos.",
    price: 120_000,
    imageCode: "colchoneta_yoga",
  },
  {
    id: "tatami",
    title: "Piso Tatami por m²",
    description:
      "Textura 5 líneas, uniones tipo rompecabezas. Material EVA — densidad 90 kg × 1 m³ — medidas 100 × 100 × 2,5 cm (aprox.).",
    price: 160_000,
    imageCode: "tatami",
    highlights: [
      "Piezas encastrables tipo puzzle",
      "Uso en gym, boxes y áreas de entrenamiento",
    ],
  },
  {
    id: "rodillo_abdominal_premiun",
    title: "Rodillo abdominal premium",
    description:
      "Agarre suave de espuma antideslizante. Material polímero ABS, tubo de acero inoxidable con alta capacidad de carga.",
    price: 80_000,
    imageCode: "rodillo_abdominal_premiun",
    highlights: [
      "Espuma antideslizante",
      "Tubo de acero inoxidable",
    ],
  },
  {
    id: "rodillo_abdominal_basic",
    title: "Rodillo abdominal básico",
    description:
      "Rodillo abdominal para trabajo de core y estabilidad.",
    price: 65_000,
    imageCode: "rodillo_abdominal_basic",
  },
  {
    id: "pelota_pilate_x65",
    title: "Pelota Pilates — 65 cm",
    description: "Pelota para Pilates, estabilidad y trabajo de core.",
    price: 95_000,
    imageCode: "pelota_pilate_x65",
  },
  {
    id: "pelota_pilate_x75",
    title: "Pelota Pilates — 75 cm",
    description: "Pelota para Pilates, estabilidad y trabajo de core.",
    price: 120_000,
    imageCode: "pelota_pilate_x75",
  },
  {
    id: "protector_barras_top",
    title: "Protector para barras",
    description:
      "Protector para barras de gimnasio — almohadilla de protección para levantamiento en rack.",
    price: 100_000,
    imageCode: "protector_barras_top",
  },
  {
    id: "protector_barra",
    title: "Protector de barra",
    description: "Protector acolchado para barra en rack o suelo.",
    price: 80_000,
    imageCode: "protector_barra",
  },
  ...[
    [1, 100_000],
    [2, 105_000],
    [3, 115_000],
    [4, 120_000],
    [5, 125_000],
    [6, 130_000],
    [7, 140_000],
    [8, 150_000],
    [9, 155_000],
    [10, 170_000],
  ].map(([kg, pyg]) => ({
    id: `tobillera_${kg}kg`,
    title: `Tobilleras con peso — ${kg} kg`,
    description:
      "Par de tobilleras con peso fijo para caminar, trotes suaves y trabajo funcional.",
    price: pyg as number,
    imageCode: `tobillera_${kg}kg`,
  })),
  {
    id: "munequera_500",
    title: "Muñequeras con peso — 500 g",
    description:
      "Muñequeras con peso para sumar resistencia al entrenamiento.",
    price: 100_000,
    imageCode: "munequera_500",
  },
  {
    id: "munequera_700",
    title: "Muñequeras con peso — 700 g",
    description:
      "Muñequeras con peso para sumar resistencia al entrenamiento.",
    price: 110_000,
    imageCode: "munequera_700",
  },
  {
    id: "munequera_1kg",
    title: "Muñequeras con peso — 1 kg",
    description:
      "Muñequeras con peso para sumar resistencia al entrenamiento.",
    price: 120_000,
    imageCode: "munequera_1kg",
  },
  {
    id: "escalera_plastico",
    title: "Escalera de plástico",
    description: "Cinta con plásticos regulables — hasta 5 metros.",
    price: 90_000,
    imageCode: "escalera_plastico",
  },
  {
    id: "set_gomas",
    title: "Set de gomas",
    description: "Set de bandas elásticas para fuerza y movilidad.",
    price: 40_000,
    imageCode: "set_gomas",
  },
  {
    id: "combo_bolsa_mas_step_de_madera",
    title: "Combo bolsa + step de madera",
    description:
      "Bolsa con peso más step de madera con superficie antideslizante.",
    price: 250_000,
    imageCode: "combo_bolsa_mas_step_de_madera",
    badge: "Combo",
  },
  {
    id: "combo_gluteos",
    title: "Combo Glúteos",
    description:
      "Combo que incluye una colchoneta + un par de tobilleras de 2 kg. Todo lo que necesitás para trabajar glúteos desde casa.",
    price: 180_000,
    imageCode: "combo_gluteos",
    badge: "Combo",
    highlights: [
      "Colchoneta incluida",
      "Par de tobilleras de 2 kg",
      "Ideal para entrenamiento en casa",
    ],
  },
  {
    id: "bolsa_con_peso_5kg",
    title: "Bolsa con peso — 5 kg",
    description: "Bolsa lastrada para entrenamiento funcional y cardio.",
    price: 160_000,
    imageCode: "bolsa_con_peso_5kg",
  },
  {
    id: "bolsa_con_peso_10kg",
    title: "Bolsa con peso — 10 kg",
    description: "Bolsa lastrada para entrenamiento funcional y cardio.",
    price: 160_000,
    imageCode: "bolsa_con_peso_10kg",
  },
  {
    id: "bolsa_con_peso_15kg",
    title: "Bolsa con peso — 15 kg",
    description: "Bolsa lastrada para entrenamiento funcional y cardio.",
    price: 160_000,
    imageCode: "bolsa_con_peso_15kg",
  },
  {
    id: "bolsa_con_peso_20kg",
    title: "Bolsa con peso — 20 kg",
    description: "Bolsa lastrada para entrenamiento funcional y cardio.",
    price: 180_000,
    imageCode: "bolsa_con_peso_20kg",
  },
  {
    id: "bolsa_con_peso_25kg",
    title: "Bolsa con peso — 25 kg",
    description: "Bolsa lastrada para entrenamiento funcional y cardio.",
    price: 200_000,
    imageCode: "bolsa_con_peso_25kg",
  },
  {
    id: "bolsa_con_peso_30kg",
    title: "Bolsa con peso — 30 kg",
    description: "Bolsa lastrada para entrenamiento funcional y cardio.",
    price: 220_000,
    imageCode: "bolsa_con_peso_30kg",
  },
  {
    id: "banco_plano",
    title: "Banco plano",
    description:
      "Banco plano para press, remos apoyados y trabajo con mancuernas.",
    price: 350_000,
    imageCode: "banco_plano",
  },
  {
    id: "banco_plano_premium",
    title: "Banco plano premium",
    description:
      "Banco plano premium de mayor robustez y acabado profesional, ideal para press y trabajo con mancuernas.",
    price: 700_000,
    imageCode: "banco_plano_premium",
  },
  {
    id: "banco_reclinable_premium",
    title: "Banca Ajustable Premium",
    description:
      "Banca ajustable premium para press de banca, mancuernas, abdominales y rutinas de fuerza.",
    imageCode: "banco_reclinable_premium",
    badge: "Nuevo",
    highlights: [
      "Múltiples posiciones: respaldo y asiento totalmente ajustables (inclinación y plano).",
      "Confort superior: acolchado de alta densidad con tapicería de cuerina sintética premium.",
      "Estabilidad total: base ancha y estructura de metal reforzado para mayor seguridad.",
      "Uso versátil: press de banca, ejercicios con mancuernas, abdominales y rutinas de fuerza.",
    ],
  },
  {
    id: "sentadilla_bulgara",
    title: "Soporte Profesional para Sentadilla Búlgara",
    description:
      "Soporte profesional para sentadilla búlgara, desplantes y trabajo de fuerza y equilibrio. Construcción compacta para gym o casa.",
    imageCode: "sentadilla_bulgara",
    badge: "Nuevo",
    highlights: [
      "Construcción robusta: metal de alta resistencia con acabado en pintura mate, para uso intensivo en gimnasios comerciales o en casa.",
      "Rodillo ergonómico: cojín acolchado grueso y duradero para el pie trasero, evitando molestias y rozaduras.",
      "Estabilidad superior: base ancha y sólida para que el soporte no se mueva durante el ejercicio.",
      "Diseño compacto: ocupa poco espacio en cualquier rincón de entrenamiento.",
      "Ideal para sentadillas búlgaras a una pierna, desplantes (lunges) y entrenamiento de fuerza y equilibrio.",
    ],
  },
  {
    id: "maquina_de_hip_thrust",
    title: "Máquina de Hip Thrust Profesional",
    description:
      "Estructura especializada para entrenamiento de glúteos y fuerza de cadera con diseño compacto y seguro.",
    imageCode: "maquina_de_hip_thrust",
    badge: "Nuevo",
    highlights: [
      "Plataforma antideslizante: base texturizada para un posicionamiento firme de los pies durante el ejercicio.",
      "Respaldo acolchado: cojín ergonómico de alta densidad que protege la espalda y asegura una postura correcta.",
      "Estructura de metal: robusta en color negro mate, diseñada para soportar entrenamientos de alta intensidad.",
    ],
  },
  {
    id: "trineo",
    title: "Trineo de peso",
    description:
      "Trineo de peso compacto fabricado en acero de alta resistencia con acabado en color negro mate, diseñado para potenciar la fuerza, la velocidad y la resistencia cardiovascular.",
    imageCode: "trineo",
    badge: "Nuevo",
    highlights: [
      "Estructura robusta: base metálica plana con poste central vertical para la carga segura de discos de pesas.",
      "Sistema de arnés acolchado: arnés ajustable con refuerzo de alta comodidad y correas de nylon de alta resistencia con anillas de acero tipo D para tracción fluida.",
    ],
  },
  {
    id: "porta_discos",
    title: "Rack Porta Discos de Carga Pesada",
    description:
      "Rack porta discos de carga pesada para organizar discos olímpicos en gym comercial o home gym.",
    price: 890_000,
    imageCode: "porta_discos",
    badge: "Nuevo",
    highlights: [
      "Estructura robusta: fabricado en metal de alta resistencia con acabado mate.",
      "Diseño triangular de alta estabilidad: base sólida y bien equilibrada para soportar cargas pesadas sin riesgo de volcadura.",
      "Múltiples pines de carga: varios soportes distribuidos de manera accesible.",
      "Uso versátil: ideal tanto para gimnasios comerciales como para zonas de entrenamiento en casa (home gyms).",
    ],
  },
  {
    id: "pelota_medicinal_3k",
    title: "Pelota medicinal — 3 kg",
    description:
      "Pelota medicinal para lanzamientos, core y trabajo metabólico.",
    price: 160_000,
    imageCode: "pelota_medicinal_3k",
  },
  {
    id: "pelota_medicinal_4k",
    title: "Pelota medicinal — 4 kg",
    description:
      "Pelota medicinal para lanzamientos, core y trabajo metabólico.",
    price: 190_000,
    imageCode: "pelota_medicinal_4k",
  },
  {
    id: "pelota_medicinal_5k",
    title: "Pelota medicinal — 5 kg",
    description:
      "Pelota medicinal para lanzamientos, core y trabajo metabólico.",
    price: 190_000,
    imageCode: "pelota_medicinal_5k",
  },
  {
    id: "pelota_medicinal_6k",
    title: "Pelota medicinal — 6 kg",
    description:
      "Pelota medicinal para lanzamientos, core y trabajo metabólico.",
    price: 220_000,
    imageCode: "pelota_medicinal_6k",
  },
  {
    id: "pelota_medicinal_7k",
    title: "Pelota medicinal — 7 kg",
    description:
      "Pelota medicinal para lanzamientos, core y trabajo metabólico.",
    price: 220_000,
    imageCode: "pelota_medicinal_7k",
  },
  {
    id: "pelota_medicinal_8k",
    title: "Pelota medicinal — 8 kg",
    description:
      "Pelota medicinal para lanzamientos, core y trabajo metabólico.",
    price: 235_000,
    imageCode: "pelota_medicinal_8k",
  },
  {
    id: "pelota_medicinal_9k",
    title: "Pelota medicinal — 9 kg",
    description:
      "Pelota medicinal para lanzamientos, core y trabajo metabólico.",
    price: 235_000,
    imageCode: "pelota_medicinal_9k",
  },
  {
    id: "pelota_medicinal_10k",
    title: "Pelota medicinal — 10 kg",
    description:
      "Pelota medicinal para trabajo intenso de potencia y core.",
    price: 250_000,
    imageCode: "pelota_medicinal_10k",
  },
  {
    id: "chaleco_con_peso_5kg",
    title: "Chaleco con peso — 5 kg",
    description: "Chaleco lastrado con pesos regulables según modelo.",
    price: 215_000,
    imageCode: "chaleco_con_peso_5kg",
  },
  {
    id: "chaleco_con_peso_12kg",
    title: "Chaleco con peso — 12 kg",
    description: "Chaleco lastrado con pesos regulables según modelo.",
    price: 250_000,
    imageCode: "chaleco_con_peso_12kg",
  },
  {
    id: "chaleco_con_peso_20kg",
    title: "Chaleco con peso — 20 kg",
    description: "Chaleco lastrado con pesos regulables según modelo.",
    price: 320_000,
    imageCode: "chaleco_con_peso_20kg",
  },
  {
    id: "bolsa_boxeo_100cm",
    title: "Bolsa de boxeo — 1 m",
    description:
      "Bolsa de boxeo cargada, lista para colgar y entrenar.",
    price: 210_000,
    imageCode: "bolsa_boxeo",
  },
  {
    id: "bolsa_boxeo_150cm",
    title: "Bolsa de boxeo — 1,50 m",
    description:
      "Bolsa de boxeo cargada, lista para colgar y entrenar.",
    price: 290_000,
    imageCode: "bolsa_boxeo",
  },
  {
    id: "bolsa_boxeo_180cm",
    title: "Bolsa de boxeo — 1,80 m",
    description:
      "Bolsa de boxeo cargada, lista para colgar y entrenar.",
    price: 360_000,
    imageCode: "bolsa_boxeo",
  },
  {
    id: "cinta_trx",
    title: "Cinta TRX",
    description:
      "Cinta tipo suspensión TRX para entrenamiento funcional en cualquier anclaje seguro.",
    price: 130_000,
    imageCode: "cinta_trx",
  },
  {
    id: "set_de_poleas",
    title: "Set de poleas",
    description:
      "Set de poleas para entrenamiento de fuerza y trabajo de cable en casa o gym.",
    price: 165_000,
    imageCode: "set_de_poleas",
  },
];

export const RAW_CATALOG: CatalogSourceRow[] = RAW_CATALOG_SOURCE.map((row) => ({
  ...row,
  price: CONFIRMED_PRICES[row.id],
}));
