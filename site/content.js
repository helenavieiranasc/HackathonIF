/*
 * Fonte única de conteúdo do site do Hackathon IFSP Jacareí 2026.
 *
 * Como editar:
 * - Texto entre colchetes, como "[E-MAIL A DEFINIR]", é um marcador provisório.
 *   Na página ele aparece em fita amarela, sublinhado em tracejado. Troque pelo texto
 *   oficial e o destaque some sozinho.
 * - Um valor que é só o marcador vira uma fita amarela inteira; um marcador dentro de uma
 *   frase vira um trecho amarelo dentro do texto.
 * - `confirmado: false` mostra a etiqueta "Resposta pendente" no FAQ.
 * - Para esconder um item do cronograma, defina `exibir: false`.
 * - Links: enquanto forem marcadores, os botões mostram "em breve" em vez de um link quebrado.
 *
 * Antes de publicar, rode no console do navegador: `HACKATHON_PENDENTES()`
 * para listar todos os marcadores que ainda faltam.
 */
window.HACKATHON = {
  evento: {
    edicao: "2026",
    campus: "IFSP campus Jacareí",
    semana: "23ª Semana de Ciência e Tecnologia",
    edicaoSemana: "",
    periodo: "26 a 30 de outubro de 2026",
    local: "IFSP campus Jacareí",
    prazoInscricao: "Qua 28/10 · 23h59",
    tamanhoEquipe: "3 a 5 integrantes",
    descricao:
      "Uma semana, uma equipe e um problema de verdade. Junte gente de cursos diferentes, transforme uma ideia em solução e mostre o que vocês construíram.",
  },

  links: {
    inscricao: "[LINK DO FORMULÁRIO DE INSCRIÇÃO A DEFINIR]",
    regulamento: "[URL DO REGULAMENTO OFICIAL A DEFINIR]",
    semanaTecnologia: "[URL DA 23ª SEMANA DE CIÊNCIA E TECNOLOGIA A DEFINIR]",
    ifsp: "https://ifsp.edu.br/",
    campus: "https://jcr.ifsp.edu.br/",
    pitch: "https://hackathonbrasil.com.br/glossario/o-que-e-apresentacao-de-pitch-hackathons/",
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
      "Hackathon junta hack e maratona: um evento intenso, com tempo contado, em que equipes identificam um problema, desenvolvem uma ideia e constroem uma solução para ele.",
      "Na 23ª Semana de Ciência e Tecnologia do IFSP campus Jacareí, ele é um convite para criar, trabalhar em equipe e colocar em prática o que você aprende no curso. Quanto mais diferentes forem as formações e os olhares de uma equipe, mais interessantes costumam ser as respostas para desafios tecnológicos e sociais.",
    ],
    motivos: [
      { titulo: "Aprender fazendo", texto: "Você usa o que já sabe e aprende o resto no caminho, com prazo de verdade." },
      { titulo: "Misturar cursos", texto: "Quem programa, quem desenha, quem entende do problema: cada equipe junta olhares diferentes." },
      { titulo: "Sair com uma solução", texto: "No fim, a equipe apresenta para uma banca algo que ela mesma construiu." },
    ],
  },

  participacao: {
    chamada: "Todo curso do IFSP Jacareí tem lugar aqui.",
    texto:
      "O hackathon é multidisciplinar. Não é preciso ser especialista em programação: conhecimento técnico ajuda, mas criatividade, trabalho em equipe, capacidade de resolver problemas e de comunicar a ideia contam tanto quanto.",
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
    horario: "8h às 9h30",
    local: "Sala 2, Bloco 1, IFSP campus Jacareí",
    sala: "Sala 2",
    bloco: "Bloco 1",
    apresentador: "Profa. Ariadne",
    pauta: [
      "O que é um hackathon e como ele vai funcionar",
      "A revelação do tema",
      "O que cada equipe precisa saber para começar",
    ],
    // Depois da revelação, escreva o tema aqui (ex.: tema: "Cidades mais acessíveis").
    tema: "",
  },

  ia: {
    frases: ["Sua ideia importa.", "Sua equipe faz acontecer.", "A IA pode ajudar."],
    texto: [
      "Ferramentas de inteligência artificial são permitidas. Use como apoio para gerar ideias, pesquisar, prototipar, programar e documentar.",
      "O hackathon não é só uma competição de código. O centro é resolver um problema em equipe: a qualidade e a relevância da ideia e a capacidade de desenvolver e explicar a solução. Saber programar ajuda, mas ninguém precisa escrever cada linha sozinho para contribuir.",
    ],
    usos: ["Ideias", "Pesquisa", "Protótipo", "Código", "Documentação"],
    aviso: "Usar IA não é obrigatório. E as regras de sempre continuam valendo: o projeto precisa ser original e desenvolvido durante o evento.",
  },

  projeto: {
    formatos: ["Web", "Mobile", "Desktop", "Hardware", "IoT", "Outros"],
    regras: [
      "Cada equipe escolhe a tecnologia e o formato que fazem mais sentido para a sua solução.",
      "Todo projeto precisa responder ao tema revelado na abertura.",
      "O projeto deve ser original e feito durante o evento: nada de projetos, TCCs ou softwares prontos.",
      "Bibliotecas de código aberto e APIs públicas são permitidas e bem-vindas.",
    ],
  },

  etapas: [
    { id: "inscricao", titulo: "Inscrição", texto: "O líder inscreve a equipe pelo formulário oficial, com os dados de todos os integrantes.", detalhe: "Até qua 28/10, 23h59" },
    { id: "equipe", titulo: "Equipe", texto: "De 3 a 5 estudantes do campus Jacareí. Cursos diferentes são bem-vindos." },
    { id: "revelacao", titulo: "Revelação do tema", texto: "Na abertura, a organização apresenta o hackathon e revela o tema.", detalhe: "Seg 26/10, 8h às 9h30" },
    { id: "desenvolvimento", titulo: "Desenvolvimento", texto: "As equipes constroem a solução com a tecnologia que escolherem. IA liberada.", detalhe: "[PERÍODO A DEFINIR]" },
    { id: "entrega", titulo: "Entrega", texto: "O que e como entregar será definido pela organização.", detalhe: "[A DEFINIR]" },
    { id: "pitch", titulo: "Pitch", texto: "Apresentação curta para a banca, seguida de perguntas.", detalhe: "Sex 30/10, auditório" },
    { id: "resultado", titulo: "Avaliação e prêmios", texto: "A banca dá notas de 0 a 10 por critério e as três melhores equipes são premiadas.", detalhe: "[DATA A DEFINIR]" },
  ],

  // `marco: true` marca prazos sem volta. Itens com `exibir: false` não aparecem.
  cronograma: [
    { titulo: "Abertura das inscrições", data: "[DATA A DEFINIR]", hora: "", exibir: true },
    { titulo: "Revelação do tema", data: "Seg 26/10", hora: "8h às 9h30", local: "Sala 2, Bloco 1", exibir: true },
    { titulo: "Encerramento das inscrições", data: "Qua 28/10", hora: "até 23h59", marco: true, exibir: true },
    { titulo: "Desenvolvimento", data: "[PERÍODO A DEFINIR]", hora: "", exibir: true },
    { titulo: "Prazo de entrega", data: "[DATA A DEFINIR]", hora: "", marco: true, exibir: true },
    { titulo: "Apresentações finais e defesa dos projetos", data: "Sex 30/10", hora: "8h às 11h40", local: "Auditório do campus", exibir: true },
    { titulo: "Resultado e premiação", data: "[DATA A DEFINIR]", hora: "", exibir: true },
  ],

  pitch: {
    dia: "Sexta-feira, 30 de outubro",
    horario: "8h às 11h40",
    local: "Auditório do IFSP campus Jacareí",
    duracao: "[DURAÇÃO DO PITCH A DEFINIR]",
    perguntas: "[TEMPO DE PERGUNTAS A DEFINIR]",
    oQueE:
      "Pitch é uma apresentação curta, clara e objetiva. Em poucos minutos, a equipe mostra o problema que encontrou, a solução que criou e por que ela importa. Depois, responde às perguntas e ouve as considerações da banca.",
    mostrar: [
      { titulo: "O problema", texto: "Qual situação vocês identificaram e quem ela afeta." },
      { titulo: "A solução", texto: "O que a equipe propõe e construiu." },
      { titulo: "O impacto", texto: "O impacto social esperado ou já demonstrado." },
      { titulo: "Como funciona", texto: "O funcionamento técnico da solução." },
    ],
    star: [
      { letra: "S", nome: "Situação", texto: "O contexto: onde o problema acontece e quem ele afeta." },
      { letra: "T", nome: "Tarefa", texto: "O que a equipe decidiu resolver." },
      { letra: "A", nome: "Ação", texto: "O que vocês fizeram e como a solução funciona." },
      { letra: "R", nome: "Resultado", texto: "O que mudou, ou o que pode mudar, com a solução." },
    ],
  },

  avaliacao: {
    escala: "0 a 10",
    pesos: "Todos os critérios têm o mesmo peso na nota final.",
    criterios: [
      "[CRITÉRIO 1 A DEFINIR]",
      "[CRITÉRIO 2 A DEFINIR]",
      "[CRITÉRIO 3 A DEFINIR]",
      "[OUTROS CRITÉRIOS, SE HOUVER]",
    ],
    banca: [
      "Prof. Raul Castanhari",
      "[MEMBRO DA BANCA 2 A DEFINIR]",
      "[MEMBRO DA BANCA 3 A DEFINIR]",
      "[MEMBRO DA BANCA 4 A DEFINIR]",
      "[MEMBRO DA BANCA 5 A DEFINIR]",
    ],
    premios: [
      { lugar: "1º lugar", medalha: true, premio: "[PRÊMIO DO 1º LUGAR A DEFINIR]" },
      { lugar: "2º lugar", medalha: true, premio: "[PRÊMIO DO 2º LUGAR A DEFINIR]" },
      { lugar: "3º lugar", medalha: true, premio: "[PRÊMIO DO 3º LUGAR A DEFINIR]" },
    ],
  },

  faq: [
    {
      pergunta: "Quem pode participar?",
      resposta: "Estudantes regularmente matriculados no IFSP campus Jacareí, de qualquer curso. Estudantes de outros campi do IFSP ou de outras instituições de ensino não podem participar.",
      confirmado: true,
    },
    {
      pergunta: "Preciso saber programar?",
      resposta: "Não precisa ser especialista. Programar ajuda, mas criatividade, trabalho em equipe, resolver problemas e saber comunicar a ideia contam tanto quanto. Uma boa equipe junta habilidades diferentes.",
      confirmado: true,
    },
    {
      pergunta: "Posso usar inteligência artificial?",
      resposta: "Sim. Ferramentas de IA são permitidas como apoio para gerar ideias, pesquisar, prototipar, programar e documentar. O uso não é obrigatório, e o projeto continua precisando ser original e desenvolvido durante o evento.",
      confirmado: true,
    },
    {
      pergunta: "Posso participar sozinho?",
      resposta: "Não. A inscrição é feita por equipe, com no mínimo 3 e no máximo 5 integrantes, todos do campus Jacareí.",
      confirmado: true,
    },
    {
      pergunta: "Quando o tema é revelado?",
      resposta: "Na segunda-feira, 26 de outubro, das 8h às 9h30. Na Sala 2, Bloco 1, do IFSP campus Jacareí, com apresentação da Profa. Ariadne.",
      confirmado: true,
    },
    {
      pergunta: "Até quando posso inscrever minha equipe?",
      resposta: "Até quarta-feira, 28 de outubro, às 23h59. O líder envia o formulário oficial com os dados de todos os integrantes. Inscrições fora do prazo ou incompletas não são homologadas.",
      confirmado: true,
    },
    {
      pergunta: "Posso apresentar um projeto que já existe ou o meu TCC?",
      resposta: "Não. O projeto precisa ser original e desenvolvido durante o hackathon. Bibliotecas de código aberto e APIs públicas podem ser usadas.",
      confirmado: true,
    },
    {
      pergunta: "Que tecnologia posso usar?",
      resposta: "A que fizer sentido para a solução: web, mobile, desktop, hardware, Internet das Coisas ou outra abordagem tecnológica adequada.",
      confirmado: true,
    },
    {
      pergunta: "Como os projetos serão avaliados?",
      resposta: "Por uma banca, com notas de 0 a 10 em cada critério, todos com o mesmo peso. Os critérios ainda serão divulgados pela organização.",
      confirmado: true,
    },
    {
      pergunta: "Quando e onde são as apresentações?",
      resposta: "Na sexta-feira, 30 de outubro, das 8h às 11h40, no auditório do IFSP campus Jacareí.",
      confirmado: true,
    },
    {
      pergunta: "Tem premiação?",
      resposta: "Sim. As três equipes com as maiores notas recebem medalha. Os demais prêmios de cada colocação ainda serão definidos.",
      confirmado: true,
    },
    { pergunta: "O que devo levar?", resposta: "[RESPOSTA: O QUE LEVAR A DEFINIR]", confirmado: false },
  ],

  regulamento: {
    resumo:
      "As regras do Hackathon IFSP Jacareí 2026. O que está em amarelo ainda será definido pela organização. Quando o documento oficial for publicado, ele prevalece sobre esta página.",
    oficialConfirmado: false,
    // Cada item é uma frase, ou { rotulo, valor } para um dado que ainda pode mudar.
    secoes: [
      {
        id: "evento",
        titulo: "O evento",
        itens: [
          "O Hackathon faz parte da 23ª Semana de Ciência e Tecnologia do IFSP campus Jacareí e quer estimular a criatividade, o trabalho em equipe e a aplicação prática do que os estudantes aprendem nos cursos.",
          "Hackathon é um evento colaborativo, intenso e com tempo limitado, em que equipes identificam um problema, desenvolvem uma ideia e constroem uma solução.",
        ],
      },
      {
        id: "tema",
        titulo: "O tema",
        itens: [
          "O tema fica em sigilo até a revelação oficial, na segunda-feira, 26 de outubro de 2026, das 8h às 9h30.",
          { rotulo: "Local da revelação", valor: "Sala 2, Bloco 1, IFSP campus Jacareí" },
          { rotulo: "Apresentação", valor: "Profa. Ariadne" },
          "Nesse encontro, a organização apresenta o conceito de hackathon, revela o tema e passa as informações essenciais para começar.",
          "Todos os projetos precisam responder ao tema anunciado.",
        ],
      },
      {
        id: "equipes",
        titulo: "As equipes",
        itens: [
          "Cada equipe tem no mínimo 3 e no máximo 5 integrantes.",
          "Todos os integrantes precisam estar regularmente matriculados no IFSP campus Jacareí. Estudantes de outros campi do IFSP ou de outras instituições de ensino não podem participar.",
          "Estudantes de todos os cursos do campus podem participar, e equipes que reúnem formações diferentes são incentivadas.",
        ],
      },
      {
        id: "inscricao",
        titulo: "A inscrição",
        itens: [
          "Um único representante, o líder da equipe, faz a inscrição pelo formulário oficial e informa os dados de todos os integrantes.",
          { rotulo: "Prazo", valor: "quarta-feira, 28 de outubro de 2026, às 23h59" },
          "Inscrições enviadas depois do prazo ou com informações incompletas não serão homologadas.",
        ],
      },
      {
        id: "desenvolvimento",
        titulo: "O desenvolvimento",
        itens: [
          "Cada equipe escolhe a tecnologia e o formato da solução: aplicação web, app mobile, software desktop, hardware, Internet das Coisas (IoT) ou outra abordagem tecnológica adequada.",
          "O projeto deve ser original e desenvolvido durante o evento. Projetos, TCCs ou softwares criados antes do hackathon não podem ser apresentados como se fossem novos.",
          "O uso de bibliotecas de código aberto e de APIs públicas é permitido e incentivado.",
          "O uso de ferramentas de inteligência artificial é permitido, como apoio para gerar ideias, pesquisar, prototipar, programar e documentar.",
          { rotulo: "Período de desenvolvimento", valor: "[PERÍODO A DEFINIR]" },
          { rotulo: "Entrega", valor: "[REGRAS DE ENTREGA A DEFINIR]" },
        ],
      },
      {
        id: "apresentacao",
        titulo: "A apresentação",
        itens: [
          "As apresentações finais e a defesa dos projetos acontecem na sexta-feira, 30 de outubro de 2026, das 8h às 11h40, no auditório do IFSP campus Jacareí.",
          "Cada equipe apresenta o projeto em formato de pitch: uma apresentação curta, clara e objetiva.",
          { rotulo: "Duração do pitch", valor: "[DURAÇÃO DO PITCH A DEFINIR]" },
          { rotulo: "Perguntas da banca", valor: "[TEMPO DE PERGUNTAS A DEFINIR]" },
          "Depois do pitch, a equipe responde às perguntas e ouve as considerações da banca.",
          "A equipe deve mostrar o problema escolhido, a solução proposta, o impacto social esperado ou demonstrado e o funcionamento técnico do projeto.",
        ],
      },
      {
        id: "avaliacao",
        titulo: "A avaliação",
        itens: [
          "Os projetos são avaliados por uma banca julgadora, que dá uma nota de 0 a 10 em cada critério.",
          "Todos os critérios têm o mesmo peso na nota final.",
          { rotulo: "Critérios", valor: "[CRITÉRIOS A DEFINIR]" },
        ],
      },
      {
        id: "premiacao",
        titulo: "A premiação",
        itens: [
          "As três equipes com as maiores notas finais são premiadas.",
          { rotulo: "1º lugar", valor: "Medalha + [PRÊMIO DO 1º LUGAR A DEFINIR]" },
          { rotulo: "2º lugar", valor: "Medalha + [PRÊMIO DO 2º LUGAR A DEFINIR]" },
          { rotulo: "3º lugar", valor: "Medalha + [PRÊMIO DO 3º LUGAR A DEFINIR]" },
        ],
      },
      {
        id: "disposicoes",
        titulo: "Disposições finais",
        itens: [
          "Ao se inscrever, cada participante declara conhecer e aceitar os termos do regulamento oficial.",
          "Ao se inscrever, cada participante autoriza, sem custo, o uso de sua imagem e de sua voz em fotos, vídeos e outros materiais de comunicação, para fins institucionais e para a divulgação do evento, das apresentações e de atividades relacionadas do IFSP.",
          "Situações não previstas no regulamento, sejam técnicas, logísticas ou de outra natureza, incluindo eventuais instabilidades nos servidores disponibilizados, serão analisadas e resolvidas pela comissão organizadora.",
        ],
      },
    ],
  },
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
