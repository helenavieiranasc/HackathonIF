/*
 * CONTEÚDO COMPLETO DO HACKATHON — NÃO PUBLICAR ANTES DO ANÚNCIO OFICIAL.
 *
 * Este arquivo fica fora da pasta site/ de propósito: o GitHub Pages publica só site/,
 * então nada daqui chega ao navegador antes da hora.
 *
 * Para liberar o conteúdo depois da reunião de segunda-feira (26/10, 9h30):
 *   1. Revise e complete este arquivo com o que foi anunciado (tema, regras, prêmios, banca...).
 *   2. Copie este arquivo para site/content-completo.js
 *   3. Em site/content.js, mude `publicacao.liberado` para true.
 *   4. Faça commit e push. O site passa a mostrar todas as seções.
 *
 * Atenção: se o repositório ficar público, este arquivo também fica visível no GitHub.
 * Nesse caso, guarde-o fora do repositório até a liberação.
 */
window.HACKATHON_COMPLETO = {
  evento: {
    prazoInscricao: "Qua 28/10 · 23h59",
  },

  links: {
    inscricao: "[LINK DO FORMULÁRIO DE INSCRIÇÃO A DEFINIR]",
    pitch: "https://hackathonbrasil.com.br/glossario/o-que-e-apresentacao-de-pitch-hackathons/",
  },

  // Agenda completa da maquete 3D (substitui os dias bloqueados).
  agenda: [
    { dia: 28, titulo: "Inscrições encerram", hora: "até 23h59", tipo: "prazo" },
    { dia: 30, titulo: "Pitch final", hora: "8h às 11h40", local: "Auditório do campus", tipo: "final" },
  ],

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
    { titulo: "Revelação do tema", data: "Seg 26/10", hora: "8h às 9h30", local: "Sala 2 do Bloco 1", exibir: true },
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
      { lugar: "1º lugar", medalha: "Medalha", premio: "[PRÊMIO DO 1º LUGAR A DEFINIR]" },
      { lugar: "2º lugar", medalha: "Medalha", premio: "[PRÊMIO DO 2º LUGAR A DEFINIR]" },
      { lugar: "3º lugar", medalha: "Medalha", premio: "[PRÊMIO DO 3º LUGAR A DEFINIR]" },
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
      resposta: "Na segunda-feira, 26 de outubro, das 8h às 9h30. Na Sala 2 do Bloco 1, com apresentação do Prof. Olavo.",
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
          "O Hackathon faz parte da 23ª Semana Nacional de Ciência e Tecnologia do IFSP campus Jacareí e quer estimular a criatividade, o trabalho em equipe e a aplicação prática do que os estudantes aprendem nos cursos.",
          "Hackathon é um evento colaborativo, intenso e com tempo limitado, em que equipes identificam um problema, desenvolvem uma ideia e constroem uma solução.",
        ],
      },
      {
        id: "tema",
        titulo: "O tema",
        itens: [
          "O tema fica em sigilo até a revelação oficial, na segunda-feira, 26 de outubro de 2026, das 8h às 9h30.",
          { rotulo: "Local da revelação", valor: "Sala 2 do Bloco 1, IFSP campus Jacareí" },
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

  // Capítulos completos (marcação). Entram na página no lugar do cofre trancado.
  secoesHtml: "    <!-- 04 -->\n    <section class=\"section ai\" id=\"projeto\" aria-labelledby=\"ai-title\">\n      <h2 class=\"h2\" id=\"ai-title\"><span class=\"chap tape tape--black tape--s\" aria-hidden=\"true\">04</span><span data-words>IA e projeto.</span></h2>\n      <div class=\"ai-grid\">\n        <p class=\"ai-lines\" data-list=\"ia.frases\"></p>\n        <div class=\"ai-body\">\n          <div class=\"prose\" data-list=\"ia.texto\"></div>\n          <p class=\"ai-uses\"><span class=\"who-label\">A IA pode ajudar com:</span> <span data-uses></span>.</p>\n          <p class=\"note\" data-c=\"ia.aviso\"></p>\n        </div>\n      </div>\n      <div class=\"project\">\n        <h3 class=\"h3\">O projeto</h3>\n        <p class=\"formats\" aria-label=\"Formatos possíveis\" data-formats></p>\n        <ul class=\"list\" data-list=\"projeto.regras\"></ul>\n      </div>\n    </section>\n\n    <!-- 05 -->\n    <section class=\"section route\" id=\"como-funciona\" aria-labelledby=\"route-title\">\n      <h2 class=\"h2\" id=\"route-title\"><span class=\"chap tape tape--black tape--s\" aria-hidden=\"true\">05</span><span data-words>Como funciona.</span></h2>\n      <p class=\"intro\">Sete etapas, da inscrição à premiação.</p>\n      <div class=\"course\">\n        <svg class=\"course-line\" aria-hidden=\"true\" focusable=\"false\"></svg>\n        <ol class=\"course-list\" data-list=\"etapas\"></ol>\n      </div>\n    </section>\n\n    <!-- 06 -->\n    <section class=\"section schedule\" id=\"cronograma\" aria-labelledby=\"schedule-title\">\n      <h2 class=\"h2\" id=\"schedule-title\"><span class=\"chap tape tape--black tape--s\" aria-hidden=\"true\">06</span><span data-words>A semana.</span></h2>\n      <p class=\"intro\"><span data-c=\"evento.periodo\"></span>. Prazos sem volta levam a etiqueta vermelha “prazo”.</p>\n      <div class=\"week\" data-week>\n        <ol class=\"week-days\" aria-label=\"Dias da semana do evento\"></ol>\n      </div>\n      <div class=\"week-pending\">\n        <h3 class=\"h3\">Ainda sem data</h3>\n        <ul class=\"list list--pending\" data-week-pending></ul>\n      </div>\n    </section>\n\n    <!-- 07 -->\n    <section class=\"section pitch\" id=\"pitch\" aria-labelledby=\"pitch-title\">\n      <h2 class=\"h2\" id=\"pitch-title\"><span class=\"chap tape tape--black tape--s\" aria-hidden=\"true\">07</span><span data-words>O pitch.</span></h2>\n      <div class=\"pitch-grid\">\n        <div class=\"pitch-about\">\n          <p class=\"lead\" data-c=\"pitch.oQueE\"></p>\n          <p><a class=\"textlink\" data-link=\"pitch\" href=\"#pitch\">Saiba mais sobre pitch</a></p>\n          <dl class=\"facts\">\n            <div><dt>Quando</dt><dd><span data-c=\"pitch.dia\"></span>, <span data-c=\"pitch.horario\"></span></dd></div>\n            <div><dt>Onde</dt><dd data-c=\"pitch.local\"></dd></div>\n            <div><dt>Duração por equipe</dt><dd data-c=\"pitch.duracao\"></dd></div>\n            <div><dt>Perguntas da banca</dt><dd data-c=\"pitch.perguntas\"></dd></div>\n          </dl>\n        </div>\n        <div class=\"pitch-guide\">\n          <h3 class=\"h3\">O que mostrar</h3>\n          <ol class=\"show\" data-list=\"pitch.mostrar\"></ol>\n          <h3 class=\"h3\">Um jeito de organizar: STAR</h3>\n          <p class=\"note\">Uma sugestão de roteiro, não uma regra.</p>\n          <ol class=\"star\" data-list=\"pitch.star\"></ol>\n        </div>\n      </div>\n    </section>\n\n    <!-- 08 -->\n    <section class=\"section scoring\" id=\"avaliacao\" aria-labelledby=\"scoring-title\">\n      <h2 class=\"h2\" id=\"scoring-title\"><span class=\"chap tape tape--black tape--s\" aria-hidden=\"true\">08</span><span data-words>Banca e prêmios.</span></h2>\n      <div class=\"scoring-grid\">\n        <div class=\"score-rule\">\n          <p class=\"score-scale\"><span class=\"score-big\" data-c=\"avaliacao.escala\"></span><span>em cada critério</span></p>\n          <p class=\"lead\" data-c=\"avaliacao.pesos\"></p>\n          <h3 class=\"h3\">Critérios</h3>\n          <ol class=\"criteria-list\" data-list=\"avaliacao.criterios\"></ol>\n        </div>\n        <div class=\"panel\">\n          <h3 class=\"h3\">Banca</h3>\n          <ul class=\"panel-list\" data-list=\"avaliacao.banca\"></ul>\n        </div>\n      </div>\n      <h3 class=\"h3\">Premiação</h3>\n      <ol class=\"awards\" data-list=\"avaliacao.premios\"></ol>\n    </section>\n\n    <!-- 09 -->\n    <section class=\"section faq\" id=\"faq\" aria-labelledby=\"faq-title\">\n      <div class=\"faq-grid\">\n        <div>\n          <h2 class=\"h2\" id=\"faq-title\"><span class=\"chap tape tape--black tape--s\" aria-hidden=\"true\">09</span><span data-words>Perguntas frequentes.</span></h2>\n          <p class=\"intro\">Respostas curtas. As regras completas estão no regulamento, logo abaixo.</p>\n        </div>\n        <div class=\"faq-list\" data-list=\"faq\"></div>\n      </div>\n    </section>\n\n    <!-- 10 -->\n    <section class=\"section rules\" id=\"regulamento\" aria-labelledby=\"rules-title\">\n      <h2 class=\"h2\" id=\"rules-title\"><span class=\"chap tape tape--black tape--s\" aria-hidden=\"true\">10</span><span data-words>Regulamento.</span></h2>\n      <article class=\"sheet\">\n        <div class=\"sheet-head\">\n          <p class=\"sheet-summary\" data-c=\"regulamento.resumo\"></p>\n          <p class=\"sheet-official\">\n            <a class=\"link-out\" data-link=\"regulamento\" href=\"#regulamento\">Regulamento oficial <svg class=\"icon\" aria-hidden=\"true\"><use href=\"#i-external\"/></svg></a>\n          </p>\n        </div>\n        <div class=\"sheet-body\">\n          <nav class=\"toc\" aria-label=\"Índice do regulamento\">\n            <p class=\"toc-title\">Índice</p>\n            <ol data-toc></ol>\n          </nav>\n          <ol class=\"rules-list\" data-list=\"regulamento.secoes\"></ol>\n        </div>\n      </article>\n    </section>\n\n",

  // Bloco de inscrição da chamada final (só depois que houver formulário oficial).
  inscricaoHtml: "        <ul class=\"list\">\n          <li>O líder da equipe preenche o formulário oficial com os dados de todos os integrantes.</li>\n          <li>Equipes de 3 a 5 estudantes do IFSP campus Jacareí.</li>\n          <li>Inscrições depois do prazo ou incompletas não são homologadas.</li>\n        </ul>\n        <div class=\"final-actions\">\n          <a class=\"tape tape--green tape--l\" data-link=\"inscricao\" data-pending-label=\"Formulário de inscrição\" href=\"#participe\">Inscrever equipe <svg class=\"icon\" aria-hidden=\"true\"><use href=\"#i-arrow\"/></svg></a>\n          <p class=\"final-deadline\">Inscrições até <span class=\"tape tape--s tape--time\" data-c=\"evento.prazoInscricao\" data-tape=\"deadline\"></span></p>\n        </div>\n        <p class=\"note\" id=\"nota-inscricao\" data-link-note=\"inscricao\" hidden>O formulário de inscrição ainda não foi publicado pela organização. As inscrições não estão abertas por este site.</p>\n",
};
