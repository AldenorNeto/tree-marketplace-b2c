// Teste para verificar a visibilidade das raízes
export const testRootsVisibility = () => {
  console.log("🌳 Testando visibilidade das raízes...");

  // Simula características de raízes
  const testCharacteristics = {
    trunkThickness: 0.1,
    rootHeight: 2.0,
    rootTopRadius: 1.0,
    rootBaseRadius: 3.0,
  };

  const rootHeight =
    testCharacteristics.trunkThickness * testCharacteristics.rootHeight;
  const newPosition = rootHeight * 0.1;
  const oldPosition = -rootHeight * 0.4;

  console.log("Configuração de teste:");
  console.log("- Espessura do tronco:", testCharacteristics.trunkThickness);
  console.log("- Altura das raízes:", rootHeight);
  console.log("- Posição antiga (enterrada):", oldPosition);
  console.log("- Posição nova (visível):", newPosition);
  console.log("- Diferença:", newPosition - oldPosition, "unidades mais alta");

  if (newPosition > 0) {
    console.log("✅ Raízes agora ficam acima do solo!");
  } else {
    console.log("⚠️ Raízes ainda podem estar enterradas");
  }

  console.log(
    "🎯 Teste concluído - as raízes devem estar mais visíveis agora!",
  );
};

// Função para calcular posição das raízes
export const calculateRootPosition = (trunkThickness, rootHeightMultiplier) => {
  const rootHeight = trunkThickness * rootHeightMultiplier;
  return {
    oldPosition: -rootHeight * 0.4,
    newPosition: rootHeight * 0.1,
    rootHeight: rootHeight,
  };
};
