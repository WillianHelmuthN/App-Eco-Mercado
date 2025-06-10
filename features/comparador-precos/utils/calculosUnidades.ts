import {
  DetalhesEmbalagem,
  UnidadeMedida,
} from "@/features/comparador-precos/components/UnidadeSelectorAvancado";

/**
 * Extrai valor numérico do formato de moeda R$
 * @param valorFormatado Valor formatado em moeda
 * @returns Valor numérico
 */
export const extrairValorNumerico = (valorFormatado: string): number => {
  if (!valorFormatado) return 0;
  // Remove caracteres não numéricos, exceto ponto e vírgula
  const numerico = valorFormatado.replace(/[^\d,\.]/g, "").replace(",", ".");
  return parseFloat(numerico) || 0;
};

/**
 * Determina o número de casas decimais com base no valor
 * @param valor Valor a ser avaliado
 * @returns Número de casas decimais
 */
export const determinarCasasDecimais = (valor: number): number => {
  return valor <= 0.09 ? 3 : 2;
};

/**
 * Formata um valor para exibição em moeda
 * @param valor Valor a ser formatado
 * @param casasDecimais Número de casas decimais
 * @returns Valor formatado
 */
export const formatarValor = (valor: number, casasDecimais: number): string => {
  return valor.toFixed(casasDecimais).replace(".", ",");
};

/**
 * Calcula o valor unitário para embalagens (Caixa, Pack, Fardo)
 * @param valorNumerico Valor total
 * @param quantidade Quantidade de embalagens
 * @param detalhesEmbalagem Detalhes da embalagem
 * @returns Texto formatado com valor unitário
 */
export const calcularValorUnitarioEmbalagem = (
  valorNumerico: number,
  quantidade: number,
  detalhesEmbalagem: DetalhesEmbalagem
): string => {
  const unidadesPorEmbalagem =
    parseFloat(detalhesEmbalagem.quantidadeUnidades) || 1;
  const qtdPorUnidade = parseFloat(detalhesEmbalagem.quantidadePorUnidade) || 1;
  const totalUnidades = quantidade * unidadesPorEmbalagem;
  const totalMedida = totalUnidades * qtdPorUnidade;

  // Converte para a unidade de medida adequada para comparação
  let valorUnitario = valorNumerico / totalMedida;
  const casasDecimais = determinarCasasDecimais(valorUnitario);

  // Formatação baseada na unidade interna
  if (
    detalhesEmbalagem.unidadeInterna.includes("Kilo") ||
    detalhesEmbalagem.unidadeInterna.includes("Litro")
  ) {
    return `R$ ${formatarValor(valorUnitario, casasDecimais)} por ${detalhesEmbalagem.unidadeInterna}`;
  } else if (
    detalhesEmbalagem.unidadeInterna.includes("Kilograma") ||
    detalhesEmbalagem.unidadeInterna.includes("Mililitro")
  ) {
    // Converte para kilo/litro para melhor comparação
    valorUnitario = valorUnitario * 1000;
    const unidadePadrão = detalhesEmbalagem.unidadeInterna.includes("Kilograma")
      ? "Kilo (kg)"
      : "Litro (l)";
    return `R$ ${formatarValor(valorUnitario, casasDecimais)} por ${unidadePadrão}`;
  } else {
    return `R$ ${formatarValor(valorUnitario, casasDecimais)} por ${detalhesEmbalagem.unidadeInterna}`;
  }
};

/**
 * Calcula o valor unitário para unidades simples
 * @param valorNumerico Valor total
 * @param quantidade Quantidade
 * @param unidadeSelecionada Unidade selecionada
 * @returns Texto formatado com valor unitário
 */
export const calcularValorUnitarioSimples = (
  valorNumerico: number,
  quantidade: number,
  unidadeSelecionada: UnidadeMedida
): string => {
  const valorUnitario = valorNumerico / quantidade;
  const casasDecimais = determinarCasasDecimais(valorUnitario);

  // Formatação baseada na unidade selecionada
  if (unidadeSelecionada.includes("Kilograma")) {
    // Converte para kilo para melhor comparação
    const valorPorKilo = valorUnitario * 1000;
    return `R$ ${formatarValor(valorPorKilo, casasDecimais)} por Kilo (kg)`;
  } else if (unidadeSelecionada.includes("Mililitro")) {
    // Converte para litro para melhor comparação
    const valorPorLitro = valorUnitario * 1000;
    return `R$ ${formatarValor(valorPorLitro, casasDecimais)} por Litro (l)`;
  } else {
    return `R$ ${formatarValor(valorUnitario, casasDecimais)} por ${unidadeSelecionada}`;
  }
};

/**
 * Calcula o valor unitário para comparação de preços
 * @param valor Valor em formato de moeda
 * @param quantidade Quantidade
 * @param unidadeSelecionada Unidade selecionada
 * @param detalhesEmbalagem Detalhes da embalagem (para Caixa, Pack, Fardo)
 * @returns Texto formatado com valor unitário
 */
export const calcularValorUnitario = (
  valor: string,
  quantidade: string,
  unidadeSelecionada: UnidadeMedida,
  detalhesEmbalagem: DetalhesEmbalagem
): string => {
  const valorNumerico = extrairValorNumerico(valor);
  if (!valorNumerico) return "Informe um valor";

  const qtd = parseFloat(quantidade) || 1;

  if (["Caixa", "Pack", "Fardo"].includes(unidadeSelecionada)) {
    return calcularValorUnitarioEmbalagem(
      valorNumerico,
      qtd,
      detalhesEmbalagem
    );
  } else {
    return calcularValorUnitarioSimples(valorNumerico, qtd, unidadeSelecionada);
  }
};

/**
 * Calcula o total por embalagem
 * @param detalhesEmbalagem Detalhes da embalagem
 * @returns Total por embalagem
 */
export const calcularTotalPorEmbalagem = (
  detalhesEmbalagem: DetalhesEmbalagem
): number => {
  return (
    Number(detalhesEmbalagem.quantidadeUnidades) *
    Number(detalhesEmbalagem.quantidadePorUnidade)
  );
};

/**
 * Calcula o total considerando a quantidade
 * @param quantidade Quantidade
 * @param detalhesEmbalagem Detalhes da embalagem
 * @returns Total considerando quantidade
 */
export const calcularTotalComQuantidade = (
  quantidade: string,
  detalhesEmbalagem: DetalhesEmbalagem
): number => {
  return (
    Number(quantidade) *
    Number(detalhesEmbalagem.quantidadeUnidades) *
    Number(detalhesEmbalagem.quantidadePorUnidade)
  );
};

/**
 * Extrai apenas o valor numérico do valor unitário calculado (remove o texto "R$ X.XX por Y")
 * @param valorUnitarioTexto Texto do valor unitário
 * @returns Valor numérico
 */
export const extrairValorNumericoDeTextoUnitario = (
  valorUnitarioTexto: string
): number => {
  // Extrai o valor entre "R$ " e " por"
  const match = valorUnitarioTexto.match(/R\$ ([\d,\.]+) por/);
  if (match && match[1]) {
    return parseFloat(match[1].replace(",", "."));
  }
  return 0;
};

/**
 * Calcula a diferença percentual entre dois valores
 * @param valorMaior Valor maior
 * @param valorMenor Valor menor
 * @returns Diferença percentual
 */
export const calcularDiferencaPercentual = (
  valorMaior: number,
  valorMenor: number
): number => {
  if (valorMenor === 0) return 0;
  return ((valorMaior - valorMenor) / valorMaior) * 100;
};

/**
 * Formata a diferença percentual para exibição
 * @param diferenca Diferença percentual
 * @returns Texto formatado
 */
export const formatarDiferencaPercentual = (diferenca: number): string => {
  return `${diferenca.toFixed(2).replace(".", ",")}%`;
};
