/*
 * Conteúdo PÚBLICO do site do Hackathon IFSP Jacareí 2026 (fase antes da revelação do tema).
 *
 * Só entra aqui o que pode ser publicado agora. Regulamento, tema, prêmios, banca, critérios,
 * pitch e demais regras ficam em conteudo-pos-anuncio/content-completo.js (fora do site)
 * até a organização liberar. Veja as instruções naquele arquivo.
 *
 * Como editar:
 * - Texto entre colchetes, como "[E-MAIL A DEFINIR]", é um marcador provisório: aparece
 *   destacado em amarelo até ser trocado pelo texto oficial.
 * - Antes de publicar, rode no console do navegador `HACKATHON_PENDENTES()` para listar
 *   os marcadores que ainda faltam.
 */
window.HACKATHON = {
  // Controle de publicação. Enquanto `liberado` for false, as seções do anúncio aparecem
  // trancadas e o site não carrega o conteúdo completo. Só a organização muda isto.
  publicacao: {
    liberado: false,
    arquivo: "content-completo.js",
  },

  evento: {
    edicao: "2026",
    campus: "IFSP campus Jacareí",
    semana: "23ª Semana Nacional de Ciência e Tecnologia",
    periodo: "26 a 30 de outubro de 2026",
    local: "IFSP campus Jacareí",
    tamanhoEquipe: "3 a 5 integrantes",
    descricao:
      "Uma semana, uma equipe e um problema de verdade. Junte gente de cursos diferentes, transforme uma ideia em solução e mostre o que vocês construíram.",
  },

  links: {
    regulamento: "[URL DO REGULAMENTO OFICIAL A DEFINIR]",
    semanaTecnologia: "[URL DA SEMANA NACIONAL DE CIÊNCIA E TECNOLOGIA A DEFINIR]",
    ifsp: "https://ifsp.edu.br/",
    campus: "https://jcr.ifsp.edu.br/",
  },

  contato: {
    email: "[E-MAIL A DEFINIR]",
    organizacao: "[ORGANIZAÇÃO A DEFINIR]",
    redes: [
      // { nome: "Instagram", url: "https://instagram.com/..." }
    ],
  },

  sobre: {
    texto: [
      "Hackathon junta hack e maratona: uma atividade colaborativa e com tempo contado, em que as pessoas trabalham juntas para entender um problema, desenvolver ideias e criar uma solução.",
      "Não é só para quem programa. O hackathon da 23ª Semana Nacional de Ciência e Tecnologia quer estimular criatividade, colaboração, olhares de áreas diferentes e a resolução prática de problemas.",
    ],
    motivos: [
      { titulo: "Aprender fazendo", texto: "Você usa o que já sabe e aprende o resto no caminho, com prazo de verdade." },
      { titulo: "Misturar cursos", texto: "Quem programa, quem desenha, quem entende do problema: cada equipe junta olhares diferentes." },
      { titulo: "Sair com uma solução", texto: "No fim, a equipe mostra algo que ela mesma construiu." },
    ],
  },

  participacao: {
    titulo: "Monte sua equipe antes da revelação.",
    chamada: "Todo curso do IFSP Jacareí tem lugar aqui.",
    texto:
      "Não é preciso ser especialista em programação: conhecimento técnico ajuda, mas criatividade, trabalho em equipe, capacidade de resolver problemas e de comunicar a ideia contam tanto quanto.",
    dicas: [
      "Converse com colegas da sua turma e de outros cursos.",
      "Procure habilidades que se completam: quem programa, quem desenha, quem pesquisa, quem apresenta.",
      "Combinem desde já como vão se organizar durante a semana.",
    ],
    habilidades: ["Criatividade", "Trabalho em equipe", "Resolver problemas", "Comunicação", "Programação"],
    minimo: 3,
    maximo: 5,
    restricao:
      "Todos os integrantes precisam estar regularmente matriculados no IFSP campus Jacareí. Estudantes de outros campi do IFSP e de outras instituições de ensino não podem participar.",
  },

  // Revelação do tema. As datas usam o fuso de Brasília (-03:00) para a contagem regressiva.
  revelacao: {
    inicio: "2026-10-26T08:00:00-03:00",
    fim: "2026-10-26T09:30:00-03:00",
    dia: "Segunda-feira, 26 de outubro",
    dataCurta: "Seg 26/10",
    dataPonto: "26.10.2026",
    horaInicio: "08:00",
    horario: "8h às 9h30",
    sala: "Sala 2",
    bloco: "Bloco 1",
    local: "Sala 2 do Bloco 1, IFSP campus Jacareí",
    apresentador: "Prof. Olavo",
    pauta: [
      "O que é um hackathon e como ele vai funcionar",
      "A revelação do tema",
      "O que cada equipe precisa saber para começar",
    ],
    // O tema só entra aqui depois que a organização liberar o conteúdo.
    tema: "",
  },

  // Maquete 3D da semana: só o que é público agora. Dias com `bloqueado: true` aparecem
  // trancados, sem nenhum detalhe; o conteúdo completo substitui esses dias na liberação.
  agenda: [
    { dia: 26, titulo: "Revelação do tema", hora: "8h às 9h30", local: "Sala 2 · Bloco 1", apresentador: "Prof. Olavo", tipo: "revelacao" },
    { dia: 28, bloqueado: true },
    { dia: 30, bloqueado: true },
  ],

  // O que fica trancado até a liberação: só títulos e frases de suspense, sem conteúdo real.
  bloqueados: [
    { id: "projeto", titulo: "Projeto e IA", texto: "Regras do projeto e do uso de ferramentas: apresentadas no anúncio oficial." },
    { id: "como-funciona", titulo: "Como funciona", texto: "As etapas da semana, passo a passo: liberadas depois do anúncio." },
    { id: "cronograma", titulo: "Cronograma completo", texto: "Os demais prazos e horários: revelados na segunda-feira." },
    { id: "pitch", titulo: "Pitch", texto: "Formato e instruções da apresentação final: em breve." },
    { id: "avaliacao", titulo: "Banca e critérios", texto: "Banca avaliadora e critérios de avaliação: apresentados no anúncio oficial." },
    { id: "premiacao", titulo: "Premiação", texto: "Prêmios: detalhes revelados na segunda-feira." },
    { id: "regulamento", titulo: "Regulamento completo", texto: "Regulamento completo: desbloqueio após o anúncio." },
    { id: "faq", titulo: "Perguntas frequentes", texto: "Respostas sobre regras, inscrição e entrega: depois do anúncio." },
  ],
};

// Lista os marcadores que ainda faltam substituir.
window.HACKATHON_PENDENTES = function () {
  const found = new Set();
  (function walk(v) {
    if (typeof v === "string") (v.match(/\[[^\]]+\]/g) || []).forEach((m) => found.add(m));
    else if (v && typeof v === "object") Object.values(v).forEach(walk);
  })(window.HACKATHON);
  return [...found];
};
