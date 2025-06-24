import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import { Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ProdutoDespensa } from "../features/despensa/hooks/useDespensa";

// Chave para armazenar o token de notificação
const NOTIFICATION_TOKEN_KEY = "@bmarket:notification_token";

// Configuração das notificações
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

/**
 * Registra o dispositivo para receber notificações push
 * @returns O token de notificação
 */
export async function registerForPushNotificationsAsync() {
  let token;

  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== "granted") {
      console.log("Permissão para notificações não concedida!");
      return null;
    }

    token = (await Notifications.getExpoPushTokenAsync()).data;

    // Armazenar o token no AsyncStorage
    await AsyncStorage.setItem(NOTIFICATION_TOKEN_KEY, token);
  } else {
    console.log("Dispositivo físico é necessário para notificações push");
  }

  // Configurações específicas para Android
  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#4a9f6e",
    });
  }

  return token;
}

/**
 * Agenda uma notificação local
 * @param titulo Título da notificação
 * @param corpo Corpo da notificação
 * @param segundos Segundos para disparar a notificação
 * @param identificador ID único para a notificação
 */
export async function agendarNotificacao(
  titulo: string,
  corpo: string,
  segundos: number,
  identificador: string
) {
  try {
    // @ts-ignore - Ignora erros de tipo do Expo Notifications
    await Notifications.scheduleNotificationAsync({
      content: {
        title: titulo,
        body: corpo,
        data: { identificador },
      },
      // @ts-ignore - Ignora erros de tipo do Expo Notifications
      trigger: {
        seconds: segundos,
      },
      identifier: identificador,
    });

    console.log(
      `Notificação agendada: ${identificador} em ${segundos} segundos`
    );
  } catch (error) {
    console.error("Erro ao agendar notificação:", error);
  }
}

/**
 * Cancela uma notificação agendada
 * @param identificador ID da notificação a ser cancelada
 */
export async function cancelarNotificacao(identificador: string) {
  await Notifications.cancelScheduledNotificationAsync(identificador);
}

/**
 * Agenda uma notificação com base em dias, configurando para 10h da manhã
 * @param titulo Título da notificação
 * @param corpo Corpo da notificação
 * @param diasFuturos Número de dias no futuro para agendar (0 = hoje)
 * @param identificador ID único para a notificação
 */
export async function agendarNotificacaoPorDias(
  titulo: string,
  corpo: string,
  diasFuturos: number,
  identificador: string
) {
  try {
    // Criar data para 10h da manhã do dia desejado
    const dataNotificacao = new Date();
    dataNotificacao.setDate(dataNotificacao.getDate() + diasFuturos);
    dataNotificacao.setHours(10, 0, 0, 0);

    // Se a hora já passou hoje, agendar para agora + 1 minuto (para testes)
    const agora = new Date();
    if (diasFuturos === 0 && agora > dataNotificacao) {
      // Para teste: agendar 1 minuto após a hora atual
      agora.setMinutes(agora.getMinutes() + 1);
      dataNotificacao.setTime(agora.getTime());
    }

    // @ts-ignore - Ignora erros de tipo do Expo Notifications
    await Notifications.scheduleNotificationAsync({
      content: {
        title: titulo,
        body: corpo,
        data: { identificador },
      },
      // @ts-ignore - Ignora erros de tipo do Expo Notifications
      trigger: {
        date: dataNotificacao.getTime(),
      },
      identifier: identificador,
    });

    console.log(
      `Notificação agendada: ${identificador} para ${dataNotificacao.toLocaleString()}`
    );
  } catch (error) {
    console.error("Erro ao agendar notificação por dias:", error);
  }
}

/**
 * Verifica produtos próximos da data de validade e agenda notificações
 * @param produtos Lista de produtos na despensa
 */
export async function verificarProdutosProximosVencimento(
  produtos: ProdutoDespensa[]
) {
  // Cancelar notificações existentes primeiro
  const notificacoesAgendadas =
    await Notifications.getAllScheduledNotificationsAsync();
  for (const notificacao of notificacoesAgendadas) {
    if (notificacao.identifier.startsWith("vencimento_")) {
      await cancelarNotificacao(notificacao.identifier);
    }
  }

  const hoje = new Date();
  hoje.setHours(0, 0, 0, 0);

  // Filtra produtos que têm data de validade
  const produtosComValidade = produtos.filter(
    (produto) => produto.dataValidade && produto.dataValidade.trim() !== ""
  );

  // Para cada produto, verificar quantos dias faltam para vencer
  for (const produto of produtosComValidade) {
    if (!produto.dataValidade) continue;

    const dataValidade = new Date(produto.dataValidade);
    dataValidade.setHours(0, 0, 0, 0);

    const diferencaMs = dataValidade.getTime() - hoje.getTime();
    const diferencaDias = Math.ceil(diferencaMs / (1000 * 60 * 60 * 24));

    // Configura notificações com base no número de dias
    if (diferencaDias === 7) {
      // Notificação 7 dias antes
      await agendarNotificacaoPorDias(
        "Produto próximo da validade",
        `${produto.nome} irá vencer em 7 dias`,
        0, // Agendar para o mesmo dia, às 10h da manhã
        `vencimento_7dias_${produto.id}`
      );
    } else if (diferencaDias === 3) {
      // Notificação 3 dias antes
      await agendarNotificacaoPorDias(
        "Produto próximo da validade",
        `${produto.nome} irá vencer em 3 dias`,
        0, // Agendar para o mesmo dia, às 10h da manhã
        `vencimento_3dias_${produto.id}`
      );
    } else if (diferencaDias === 1) {
      // Notificação 1 dia antes
      await agendarNotificacaoPorDias(
        "Produto quase vencendo",
        `${produto.nome} irá vencer amanhã`,
        0, // Agendar para o mesmo dia, às 10h da manhã
        `vencimento_1dia_${produto.id}`
      );
    } else if (diferencaDias === 0) {
      // Notificação no dia
      await agendarNotificacaoPorDias(
        "Produto vence hoje",
        `${produto.nome} vence hoje. Utilize-o o quanto antes!`,
        0, // Agendar para o mesmo dia, às 10h da manhã
        `vencimento_hoje_${produto.id}`
      );
    } else if (diferencaDias < 0 && diferencaDias >= -3) {
      // Notificação para produtos vencidos recentemente (até 3 dias)
      await agendarNotificacaoPorDias(
        "Produto vencido",
        `${produto.nome} venceu há ${Math.abs(diferencaDias)} dias. Verifique se ainda pode ser consumido.`,
        0, // Agendar para o mesmo dia, às 10h da manhã
        `vencimento_vencido_${produto.id}`
      );
    }
  }

  // Retorna a quantidade de produtos que terão notificações
  return produtosComValidade.filter((produto) => {
    if (!produto.dataValidade) return false;

    const dataValidade = new Date(produto.dataValidade);
    dataValidade.setHours(0, 0, 0, 0);

    const diferencaMs = dataValidade.getTime() - hoje.getTime();
    const diferencaDias = Math.ceil(diferencaMs / (1000 * 60 * 60 * 24));

    return diferencaDias <= 7 && diferencaDias >= -3;
  }).length;
}
