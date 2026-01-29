// Teste para demonstrar as variações das raízes baseadas na seed
export const testRootVariations = () => {
  console.log("🌳 Testando variações das raízes baseadas na seed...");

  // Simular diferentes seeds e suas características
  const testSeeds = [
    {
      name: "Seed A",
      characteristics: {
        rootHeight: 0.8,
        rootOvalness: 0.6,
        rootTwist: -0.3,
        rootLean: 0.0,
      },
    },
    {
      name: "Seed B",
      characteristics: {
        rootHeight: 2.5,
        rootOvalness: 1.4,
        rootTwist: 0.3,
        rootLean: 0.15,
      },
    },
    {
      name: "Seed C",
      characteristics: {
        rootHeight: 1.5,
        rootOvalness: 1.0,
        rootTwist: 0.0,
        rootLean: 0.08,
      },
    },
    {
      name: "Seed D",
      characteristics: {
        rootHeight: 2.0,
        rootOvalness: 0.7,
        rootTwist: 0.2,
        rootLean: 0.12,
      },
    },
  ];

  console.log("Variações das raízes por seed:");
  console.log("=====================================");

  testSeeds.forEach((seed) => {
    const char = seed.characteristics;
    console.log(`\n${seed.name}:`);
    console.log(
      `  Altura: ${char.rootHeight} (${char.rootHeight < 1.2 ? "baixa" : char.rootHeight > 2.0 ? "alta" : "média"})`,
    );
    console.log(
      `  Formato: ${char.rootOvalness} (${char.rootOvalness < 0.8 ? "achatada" : char.rootOvalness > 1.2 ? "alongada" : "circular"})`,
    );
    console.log(
      `  Torção: ${char.rootTwist} rad (${Math.abs(char.rootTwist) > 0.2 ? "muito torcida" : Math.abs(char.rootTwist) > 0.1 ? "torcida" : "reta"})`,
    );
    console.log(
      `  Inclinação: ${char.rootLean} rad (${char.rootLean > 0.1 ? "muito inclinada" : char.rootLean > 0.05 ? "inclinada" : "reta"})`,
    );
  });

  console.log("\n✅ Agora as raízes têm:");
  console.log("  • Alturas variáveis (0.8x a 2.5x a espessura do tronco)");
  console.log("  • Formatos ovais/irregulares");
  console.log("  • Torções baseadas na seed");
  console.log("  • Inclinações em direções aleatórias");
  console.log("  • Superfícies com irregularidades");
};

// Função para calcular características de raízes de uma seed específica
export const calculateRootCharacteristics = (seedValue) => {
  // Simula o cálculo baseado na seed (simplificado)
  const hash = seedValue
    .toString()
    .split("")
    .reduce((a, b) => {
      a = (a << 5) - a + b.charCodeAt(0);
      return a & a;
    }, 0);

  const normalize = (value, min, max) =>
    min + ((Math.abs(value) % 1000) / 1000) * (max - min);

  return {
    rootHeight: normalize(hash, 0.8, 2.5),
    rootOvalness: normalize(hash * 2, 0.6, 1.4),
    rootTwist: normalize(hash * 3, -0.3, 0.3),
    rootLean: normalize(hash * 4, 0.0, 0.15),
    rootBumpiness: normalize(hash * 5, 0.8, 1.2),
  };
};
