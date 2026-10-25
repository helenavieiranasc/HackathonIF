# Hackathon · 23ª Semana de Ciência e Tecnologia · IFSP campus Jacareí

Site de uma página (HTML, CSS e JavaScript estáticos) para o hackathon da 23ª Semana de Ciência e Tecnologia do IFSP campus Jacareí. O projeto tem **duas versões**, e só uma vai ao ar de cada vez:

| Versão | Fonte | O que mostra |
|---|---|---|
| `pre-anuncio` (no ar agora) | `pre-anuncio/` + arquivos neutros de `site/` | apresentação e contagem, reunião de abertura (26/10/2026, 8h às 9h30, Sala 2, Bloco 1, Prof. Olavo), o que é um hackathon, equipes de 3 a 5, rotuladora, maquete 3D da semana e uma página trancada para o restante |
| `completo` (depois do anúncio) | `site/` | o site inteiro: regras, pitch, banca, critérios, prêmios, FAQ, regulamento e inscrição |

## Rodar localmente

```bash
npm run dev
```

Gera `dist/` com a versão indicada em `release.json` e abre em http://localhost:5180. Para ver a versão completa localmente, sem mudar nada do que vai ao ar:

```bash
npm run dev:completo
```

Não há dependências para instalar (Node 18+). `npm run build` só gera `dist/`.

## Publicar no GitHub Pages

O workflow `.github/workflows/pages.yml` roda `node scripts/build.mjs` a cada push na `main` e publica **somente `dist/`**. Em **Settings > Pages > Source**, escolha **GitHub Actions** (o Pages só funciona com o repositório público ou num plano pago).

O GitHub Pages deixa o navegador guardar cada arquivo por 10 minutos. Para um deploy aparecer na hora, o build liga cada CSS e JS com uma impressão do conteúdo (`styles.css?v=1a2b3c4d5e`): arquivo que mudou é baixado de novo, arquivo igual continua no cache. Só a própria página (`index.html`) pode levar até 10 minutos para atualizar; um Ctrl+Shift+R resolve na hora.

### Antes do anúncio: versão `pre-anuncio`

`release.json` diz `"versao": "pre-anuncio"`. O build copia a página, o conteúdo e o script de `pre-anuncio/` e, de `site/`, só os arquivos sem texto do evento: `styles.css` (sem comentários), `model.js` (maquete 3D), `assets/` e `vendor/`. O `index.html`, o `content.js` e o `main.js` do site completo **não entram**. Não há conteúdo escondido por CSS nem dados guardados no navegador: o restante simplesmente não existe nesta versão.

Depois de gerar, o build confere o próprio `dist/` e **falha** (e o deploy não acontece) se encontrar:

- qualquer arquivo fora da lista da versão pré-anúncio (por exemplo, `main.js`);
- qualquer frase do site completo que não faça parte da versão pré-anúncio (frases das seções do anúncio contam sempre, mesmo se alguém colar uma delas em `pre-anuncio/`);
- termos reservados ao anúncio, como banca, critérios, prêmios, regulamento e o nome do jurado.

### Na segunda-feira, depois do anúncio: versão `completo`

1. Atualize `site/content.js` com o que foi anunciado (o tema vai em `revelacao.tema`, se quiserem mostrá-lo na fita).
2. Em `release.json`, troque `"pre-anuncio"` por `"completo"`.
3. Faça commit e push na `main`. O workflow gera e publica o site completo.

O relógio do visitante nunca libera nada: ele só muda o texto da contagem (antes, durante e depois da reunião). Quem publica o restante é a organização, com o passo acima.

Atenção: o repositório é privado. Se ficar público antes do anúncio, `site/` (e a cópia antiga em `HackathonIF-main/`) passa a ser legível no GitHub, mesmo sem ir ao ar.

## Organização das pastas

```
release.json          qual versão vai ao ar: "pre-anuncio" ou "completo"
pre-anuncio/          versão pré-anúncio
  index.html          apresentação, o que é, equipes, rotuladora, revelação e a página trancada
  content.js          só fatos públicos
  pre.js              contagem, rotuladora, maquete, cadeado e animações
  pre.css             linha da revelação e página trancada (sobre styles.css)
site/                 site completo (publicado só na versão "completo")
  index.html          estrutura das seções
  styles.css          tokens (cores, tipos, espaços, sombras, movimento) e layout; usado pelas duas versões
  main.js             lê content.js, monta listas, links, menu, contagem, rotuladora e animações
  model.js            maquete 3D da semana (Three.js), usada pelas duas versões; carregada só em telas
                      largas com animação permitida, nos demais casos a mesma maquete é desenhada em SVG
  content.js          todo o conteúdo do evento
  assets/             favicon e marca oficial do campus Jacareí (SVG)
  vendor/             fontes, GSAP e Three.js hospedados localmente
dist/                 saída do build (não vai para o Git)
brand/                arquivos-fonte da marca IFSP baixados do portal oficial (não publicados)
scripts/build.mjs     gera dist/ e confere a versão pré-anúncio
scripts/serve.mjs     servidor local de dist/
.github/workflows/    publicação no GitHub Pages
PRODUCT.md, DESIGN.md contexto do produto e sistema visual (usados pelas ferramentas de design)
.impeccable/          registros de direção visual (o que é local ou temporário fica no .gitignore)
```

## A página trancada

Ao fim da versão pré-anúncio, a página escurece: a parte aberta do site fica fosca atrás de um vidro e entra uma seção de tela inteira com um cadeado fechado, duas fitas de rotuladora "Trancado até 26.10" e a frase "O restante será revelado na segunda-feira." Ela não cita nem lista o que vem depois. O cadeado segue o ponteiro com profundidade; segurar (mouse, toque, Espaço ou Enter) puxa a alça e enche um anel em volta da fechadura, que volta com uma mola e uma resposta curta. Com `prefers-reduced-motion`, nada se move e um toque só mostra a resposta. Depois das 8h de 26/10 a frase vira "O restante será publicado em breve.", até a versão completa ir ao ar.

## Onde editar o conteúdo

O conteúdo do site completo está em **`site/content.js`**; o da versão pré-anúncio, em `pre-anuncio/content.js` (só fatos públicos). Não é preciso mexer no HTML.

- Texto entre colchetes, como `[LOCAL A DEFINIR]`, é um **marcador provisório**. Na página ele aparece em fita amarela, sublinhado em tracejado. Troque pelo texto oficial e o destaque some sozinho.
- Um valor que é só o marcador vira uma fita amarela inteira; um marcador dentro de uma frase vira um trecho amarelo no meio do texto.
- Datas do cronograma: fita amarela enquanto for marcador, preta quando confirmada, vermelha se o item for um prazo (`marco: true`).
- `confirmado: false` nas perguntas do FAQ mostra a etiqueta "Resposta pendente".
- `exibir: false` esconde um item do cronograma.
- **Revelação do tema:** `revelacao.inicio` e `revelacao.fim` controlam a contagem regressiva (fuso de Brasília). Durante a abertura, a seção mostra "A revelação é agora". Depois, se `revelacao.tema` for preenchido, o tema aparece na fita da gaveta.
- **Links:** enquanto `links.inscricao` for um marcador, os botões dizem "Como se inscrever" e levam à seção de inscrição, onde o formulário aparece desativado com "em breve" e um aviso de que as inscrições não estão abertas por este site. Enquanto `links.regulamento` for um marcador, o botão aparece desativado. Quando a URL real (`https://...`) for colocada, tudo passa a funcionar sozinho.

### Conferir o que falta

Em `localhost` (ou com `?revisao` no endereço), uma fita amarela no canto inferior direito mostra quantos marcadores faltam. Clique nela para ver a lista. No console do navegador, `HACKATHON_PENDENTES()` devolve a mesma lista.

Já confirmado e público: 23ª Semana de Ciência e Tecnologia, de 26 a 30/10/2026; revelação do tema na segunda-feira, 26/10/2026, das 8h às 9h30, na Sala 2, Bloco 1, do IFSP Jacareí, com apresentação do Prof. Olavo; equipes de 3 a 5 estudantes regularmente matriculados no IFSP campus Jacareí, de qualquer curso (outros campi e instituições não participam); datas da maquete (26/10 revelação, 28/10 fim das inscrições às 23h59, 30/10 apresentações das 8h às 11h40). Os demais fatos confirmados estão em `site/content.js`.

Marcadores que a organização ainda precisa definir:

| Área | Marcadores |
|---|---|
| Revelação do tema | depois da abertura, o próprio tema (`revelacao.tema`) |
| Inscrição | link do formulário (`[LINK DO FORMULÁRIO DE INSCRIÇÃO A DEFINIR]`), data de abertura das inscrições |
| Desenvolvimento e entrega | período de desenvolvimento, regras e prazo de entrega |
| Pitch | duração por equipe, tempo de perguntas da banca |
| Avaliação | critérios 1 a 3 e outros, se houver |
| Banca | membros 2 a 5 |
| Premiação | prêmio do 1º, 2º e 3º lugares (além da medalha) |
| Resultado | data do resultado e da premiação |
| FAQ | o que levar |
| Links | regulamento oficial, página da 23ª Semana de Ciência e Tecnologia |
| Contato | organização, e-mail, redes sociais oficiais |

Nada disso foi inventado: datas, prêmios, regras, patrocinadores e perfis sociais aparecem só quando a organização preencher.

## Identidade IFSP

- A marca usada é a **assinatura oficial do campus Jacareí** (Instituto Federal · São Paulo · Campus Jacareí), baixada em https://ifsp.edu.br/component/content/article/141-comunicacao/manuais-da-comunicacao/242-identidade-visual (arquivo `Marca_IFSP_2015_Jcr_H.zip`) e convertida do PDF vetorial oficial para SVG (`site/assets/ifsp/ifsp-jacarei-cor.svg`) sem alterar formas ou cores. Os arquivos originais, incluindo a marca geral do IFSP e o manual, estão em `brand/`.
- Regras seguidas, conforme o Manual de Aplicação da Marca IF (MEC, 2015): a marca fica sempre sobre base branca, com área de proteção de pelo menos um módulo, e o símbolo nunca fica abaixo de 30 px. Nada é rotacionado, recolorido, contornado ou usado como marca d'água.
- O verde (#2f9e41) e o vermelho (#cd191e) institucionais inspiram as fitas. A fita verde usa um tom mais escuro (#1f7f33) para manter o contraste dos letreiros; a marca em si nunca é alterada.

## Acessibilidade e movimento

- HTML semântico, títulos em ordem, link para pular ao conteúdo, foco visível e menu móvel com Esc e foco preso.
- O FAQ usa `<details>`/`<summary>` nativos.
- Marcadores pendentes não dependem só da cor: têm sublinhado tracejado ou a etiqueta "a confirmar".
- Com `prefers-reduced-motion`, nenhuma animação é executada e todo o conteúdo aparece direto. Sem JavaScript, as animações também não rodam, mas os textos vindos de `content.js` não aparecem, porque o conteúdo é montado no navegador.

## Limitações conhecidas

- **Conteúdo montado por JavaScript.** Se for importante que buscadores ou usuários sem JS vejam as listas, vale gerar o HTML a partir de `content.js` em uma etapa de build.
- **Autorização de uso da marca.** A edição anterior se declarava "iniciativa acadêmica independente". Confirmem com a comunicação do campus se o site pode usar a marca oficial ou se precisa de um aviso semelhante.
- **Sem fotos.** Não há fotografias oficiais do evento, e nenhuma foi inventada. Quando houver fotos da edição anterior com autorização, elas podem entrar na seção "O que é".
