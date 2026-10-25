/*
 * Conteúdo da versão PRÉ-ANÚNCIO do site (publicada até a reunião de segunda-feira, 26/10).
 *
 * Só entra aqui o que já é público. O site completo, com tudo o que será anunciado,
 * fica em site/ e não faz parte desta versão: veja "Publicar" no README.
 */
window.HACKATHON = {
  evento: {
    campus: "IFSP campus Jacareí",
    semana: "23ª Semana de Ciência e Tecnologia",
    periodo: "26 a 30 de outubro de 2026",
    descricao:
      "Uma semana, uma equipe e um problema de verdade. Junte gente de cursos diferentes, transforme uma ideia em solução e mostre o que vocês construíram.",
  },

  links: {
    ifsp: "https://ifsp.edu.br/",
    campus: "https://jcr.ifsp.edu.br/",
  },

  sobre: {
    texto: [
      "Hackathon junta hack e maratona: um evento intenso, com tempo contado, em que equipes identificam um problema, desenvolvem uma ideia e constroem uma solução para ele.",
      "Na 23ª Semana de Ciência e Tecnologia do IFSP campus Jacareí, ele é um convite para criar, trabalhar em equipe e colocar em prática o que você aprende no curso. Você não precisa ter participado de um antes, nem ser especialista em programação: quanto mais diferentes forem as formações e os olhares de uma equipe, mais interessantes costumam ser as respostas.",
    ],
    motivos: [
      { titulo: "Aprender fazendo", texto: "Você usa o que já sabe e aprende o resto no caminho, com prazo de verdade." },
      { titulo: "Misturar cursos", texto: "Quem programa, quem desenha, quem entende do problema: cada equipe junta olhares diferentes." },
      { titulo: "Sair com uma solução", texto: "No fim, a equipe mostra algo que ela mesma construiu." },
    ],
  },

  participacao: {
    chamada: "Monte sua equipe antes da revelação.",
    texto:
      "Cada equipe tem de 3 a 5 integrantes, e todo curso do IFSP Jacareí tem lugar. Conhecimento técnico ajuda, mas criatividade, trabalho em equipe, capacidade de resolver problemas e de comunicar a ideia contam tanto quanto. Comece a procurar seu time agora.",
    habilidades: ["Criatividade", "Trabalho em equipe", "Resolver problemas", "Comunicação", "Programação"],
    minimo: 3,
    maximo: 5,
    restricao:
      "Todos os integrantes precisam estar regularmente matriculados no IFSP campus Jacareí. Estudantes de outros campi do IFSP e de outras instituições de ensino não podem participar.",
  },

  // Reunião de abertura. Horários no fuso de Brasília (-03:00): a contagem mira o início.
  revelacao: {
    inicio: "2026-10-26T08:00:00-03:00",
    fim: "2026-10-26T09:30:00-03:00",
    dia: "Segunda-feira, 26 de outubro de 2026",
    dataPonto: "26.10.2026",
    horario: "8h às 9h30",
    sala: "Sala 2",
    bloco: "Bloco 1",
    local: "Sala 2, Bloco 1, IFSP campus Jacareí",
    apresentador: "Profa. Ariadne",
  },

  // Agenda pública da semana, desenhada na maquete 3D.
  cronograma: [
    { titulo: "Revelação do tema", data: "Seg 26/10", hora: "8h às 9h30" },
    { titulo: "Encerramento das inscrições", data: "Qua 28/10", hora: "até 23h59", marco: true },
    { titulo: "Apresentações finais e defesa dos projetos", data: "Sex 30/10", hora: "8h às 11h40" },
  ],
};
