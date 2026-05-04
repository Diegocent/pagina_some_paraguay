/**
 * Filas fuente del catálogo (sin URLs de imagen).
 * Las fotos se resuelven en runtime desde `src/assets/products/` por `imageCode`.
 */
export interface CatalogSourceRow {
  id: string;
  title: string;
  description: string;
  price: number;
  /** Prefijo de archivos en assets/products */
  imageCode: string;
  badge?: string;
  highlights?: string[];
}

export const RAW_CATALOG: CatalogSourceRow[] = [
  {
    id: "step_inclinado",
    title: "Step inclinado",
    description:
      "Step inclinado: ideal para intensificar ejercicios, mejorar la flexibilidad y asegurar la estabilidad gracias a su superficie antideslizante.",
    price: 150_000,
    imageCode: "step_inclinado",
  },
  {
    id: "caja_de_salto_50x30x15",
    title: "Caja de salto — 50 × 30 × 15 cm",
    description:
      "Caja de salto para entrenamiento pliométrico y trabajo de potencia.",
    price: 110_000,
    imageCode: "caja_de_salto",
  },
  {
    id: "caja_de_salto_160",
    title: "Caja de salto",
    description:
      "Caja de salto para saltos y trabajo funcional; elegí según disponibilidad de medidas.",
    price: 160_000,
    imageCode: "caja_de_salto",
  },
  {
    id: "caja_de_salto_220",
    title: "Caja de salto XL",
    description:
      "Caja de salto de mayor volumen para rutinas intensas y boxes.",
    price: 220_000,
    imageCode: "caja_de_salto",
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
    id: "tatami",
    title: "Piso Tatami por m²",
    description:
      "Textura 5 líneas, uniones tipo rompecabezas. Material EVA — densidad 90 kg × 1 m³ — medidas 100 × 100 × 2,5 cm (aprox.). Peso unitario aprox. 2,389 kg.",
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
      "Agarre suave de espuma antideslizante. Material polímero ABS, tubo de acero inoxidable con alta capacidad de carga. Construcción durable.",
    price: 80_000,
    imageCode: "rodillo_abdominal_premiun",
    highlights: [
      "Espuma antideslizante",
      "Tubo de acero inoxidable",
      "Mayor capacidad de carga que modelos básicos",
    ],
  },
  {
    id: "pelota_pilate_65",
    title: "Pelota Pilates — 65 cm",
    description:
      "Pelota para Pilates, estabilidad y trabajo de core.",
    price: 95_000,
    imageCode: "pelota_pilate_x65",
  },
  {
    id: "pelota_pilate_75",
    title: "Pelota Pilates — 75 cm",
    description:
      "Pelota para Pilates, estabilidad y trabajo de core.",
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
    id: "rodillo_abdominal_basic",
    title: "Rodillo abdominal básico",
    description:
      "Rodillo abdominal para trabajo de core y estabilidad.",
    price: 65_000,
    imageCode: "rodillo_abdominal_basic",
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
    id: `tobillera_peso_${kg}kg`,
    title: `Tobilleras con peso — ${kg} kg`,
    description:
      "Par de tobilleras con peso fijo para caminar, trotes suaves y trabajo funcional. Consultá disponibilidad de pesos intermedios hasta 15 kg.",
    price: pyg as number,
    imageCode: "tobillera_peso",
  })),
  {
    id: "colchoneta_yoga",
    title: "Colchoneta para yoga",
    description:
      "Colchoneta para yoga y estiramientos.",
    price: 120_000,
    imageCode: "colchoneta_yoga",
  },
  {
    id: "escalera_plastico",
    title: "Escalera de plástico",
    description:
      "Cinta con plásticos regulables — hasta 5 metros.",
    price: 90_000,
    imageCode: "escalera_plastico",
  },
  {
    id: "set_gomas",
    title: "Set de gomas",
    description:
      "Set de bandas elásticas para fuerza y movilidad.",
    price: 40_000,
    imageCode: "set_gomas",
  },
  {
    id: "combo_bolsa_step",
    title: "Combo bolsa + step de madera",
    description:
      "Bolsa con peso de 10 kg o 15 kg (a elegir) más step de madera con superficie antideslizante.",
    price: 250_000,
    imageCode: "combo_bolsa_step",
    badge: "Combo",
  },
  {
    id: "bolsa_peso_5_10_15",
    title: "Bolsa con peso — 5 / 10 / 15 kg",
    description:
      "Bolsa con peso a elegir entre 5 kg, 10 kg o 15 kg según stock.",
    price: 160_000,
    imageCode: "bolsa_peso",
  },
  {
    id: "bolsa_peso_20kg",
    title: "Bolsa con peso — 20 kg",
    description:
      "Bolsa lastrada para entrenamiento funcional y cardio.",
    price: 180_000,
    imageCode: "bolsa_peso",
  },
  {
    id: "bolsa_peso_25kg",
    title: "Bolsa con peso — 25 kg",
    description:
      "Bolsa lastrada para entrenamiento funcional y cardio.",
    price: 200_000,
    imageCode: "bolsa_peso",
  },
  {
    id: "bolsa_peso_30kg",
    title: "Bolsa con peso — 30 kg",
    description:
      "Bolsa lastrada para entrenamiento funcional y cardio.",
    price: 220_000,
    imageCode: "bolsa_peso",
  },
  {
    id: "muneca_peso_500g",
    title: "Muñequeras con peso — 500 g",
    description:
      "Muñequeras con peso para sumar resistencia al entrenamiento.",
    price: 100_000,
    imageCode: "muneca_peso",
  },
  {
    id: "muneca_peso_700g",
    title: "Muñequeras con peso — 700 g",
    description:
      "Muñequeras con peso para sumar resistencia al entrenamiento.",
    price: 110_000,
    imageCode: "muneca_peso",
  },
  {
    id: "muneca_peso_1kg",
    title: "Muñequeras con peso — 1 kg",
    description:
      "Muñequeras con peso para sumar resistencia al entrenamiento.",
    price: 120_000,
    imageCode: "muneca_peso",
  },
  {
    id: "banco_plano_estandar",
    title: "Banco plano estándar",
    description:
      "Banco plano para press, remos apoyados y trabajo con mancuernas.",
    price: 350_000,
    imageCode: "banco_plano_estandar",
  },
  {
    id: "pelota_medicinal_3kg",
    title: "Pelota medicinal — 3 kg",
    description:
      "Pelota medicinal para lanzamientos, core y trabajo metabólico.",
    price: 160_000,
    imageCode: "pelota_medicinal",
  },
  {
    id: "pelota_medicinal_4_5kg",
    title: "Pelota medicinal — 4 kg / 5 kg",
    description:
      "Pelota medicinal — consultá disponibilidad de 4 kg o 5 kg (mismo precio según lista).",
    price: 190_000,
    imageCode: "pelota_medicinal",
  },
  {
    id: "pelota_medicinal_6_7kg",
    title: "Pelota medicinal — 6 kg / 7 kg",
    description:
      "Pelota medicinal — consultá disponibilidad de 6 kg o 7 kg (mismo precio según lista).",
    price: 220_000,
    imageCode: "pelota_medicinal",
  },
  {
    id: "pelota_medicinal_8_9kg",
    title: "Pelota medicinal — 8 kg / 9 kg",
    description:
      "Pelota medicinal — consultá disponibilidad de 8 kg o 9 kg (mismo precio según lista).",
    price: 235_000,
    imageCode: "pelota_medicinal",
  },
  {
    id: "pelota_medicinal_10kg",
    title: "Pelota medicinal — 10 kg",
    description:
      "Pelota medicinal para trabajo intenso de potencia y core.",
    price: 250_000,
    imageCode: "pelota_medicinal",
  },
  {
    id: "chaleco_peso_5kg",
    title: "Chaleco con peso — 5 kg",
    description:
      "Chaleco lastrado con pesos regulables según modelo.",
    price: 215_000,
    imageCode: "chaleco_peso",
  },
  {
    id: "chaleco_peso_12kg",
    title: "Chaleco con peso — 12 kg",
    description:
      "Chaleco lastrado con pesos regulables según modelo.",
    price: 250_000,
    imageCode: "chaleco_peso",
  },
  {
    id: "chaleco_peso_20kg",
    title: "Chaleco con peso — 20 kg",
    description:
      "Chaleco lastrado con pesos regulables según modelo.",
    price: 320_000,
    imageCode: "chaleco_peso",
  },
  {
    id: "step_madera",
    title: "Step de madera",
    description:
      "Step de madera maciza con superficie antideslizante.",
    price: 115_000,
    imageCode: "step_madera",
  },
  {
    id: "tobillera_polea",
    title: "Tobilleras de polea",
    description:
      "Tobilleras con polea reforzada, cinta de agarre y medias lunas reforzadas.",
    price: 85_000,
    imageCode: "tobillera_polea",
  },
  {
    id: "protector_barra",
    title: "Protector de barra",
    description:
      "Protector acolchado para barra en rack o suelo.",
    price: 80_000,
    imageCode: "protector_barra",
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
  {
    id: "set_polea",
    title: "Set de polea",
    description:
      "Set de polea para entrenamiento funcional de fuerza.",
    price: 165_000,
    imageCode: "set_polea",
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
];
