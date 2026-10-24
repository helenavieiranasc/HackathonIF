# Hackathon · 23ª Semana Nacional de Ciência e Tecnologia · IFSP campus Jacareí

Site de uma página (HTML, CSS e JavaScript estáticos, sem etapa de build) para o hackathon da 23ª Semana Nacional de Ciência e Tecnologia do IFSP campus Jacareí.

## Rodar localmente

```bash
npm run dev
```

Abre em http://localhost:5180 e serve a pasta `site/`. Não há dependências para instalar: o servidor é `scripts/serve.mjs` (Node 18+).

## Publicar no GitHub Pages

1. Crie um repositório no GitHub e envie este projeto para a branch `main`.
2. No repositório, abra **Settings > Pages** e, em **Build and deployment > Source**, escolha **GitHub Actions**.
3. Pronto: a cada push na `main`, o workflow `.github/workflows/pages.yml` publica somente a pasta `site/`. O endereço aparece na aba **Actions** e em **Settings > Pages** (algo como `https://SEU-USUARIO.github.io/NOME-DO-REPOSITORIO/`).

Todos os caminhos do site são relativos, então ele funciona tanto nesse endereço com subpasta quanto num domínio próprio. O arquivo `site/.nojekyll` faz o GitHub servir os arquivos como estão.

## Organização das pastas

```
site/                 tudo o que vai para o ar
  index.html          estrutura das seções
  styles.css          tokens (cores, tipos, espaços, sombras, movimento) e layout
  main.js             lê content.js, monta listas, links, menu, contagem, rotuladora e animações
  model.js            maquete 3D da semana (Three.js), carregada só em telas largas com animação permitida;
                      nos demais casos main.js desenha a mesma maquete em SVG
  content.js          conteúdo PÚBLICO do evento (fase antes do anúncio)
  assets/             favicon e marca oficial do campus Jacareí (SVG)
  vendor/             fontes, GSAP e Three.js hospedados localmente
conteudo-pos-anuncio/ conteúdo trancado até o anúncio oficial (NÃO publicado)
brand/                arquivos-fonte da marca IFSP baixados do portal oficial (não publicados)
scripts/serve.mjs     servidor local
.github/workflows/    publicação no GitHub Pages
PRODUCT.md, DESIGN.md contexto do produto e sistema visual (usados pelas ferramentas de design)
.impeccable/          registros de direção visual (o que é local ou temporário fica no .gitignore)
```

## Conteúdo trancado até o anúncio (26/10)

Até a reunião de abertura (segunda, 26/10/2026, 8h às 9h30, Sala 2 do Bloco 1, com o Prof. Olavo), o site mostra só o que é público: o que é um hackathon, como montar a equipe, a contagem regressiva, a rotuladora e a maquete 3D da semana. Regulamento, regras do projeto, cronograma completo, pitch, banca, critérios, premiação e FAQ aparecem como gavetas trancadas, com cadeado e a etiqueta "Revelação em 26.10".

**Como funciona o bloqueio**

- O conteúdo trancado **não está no site publicado**: ele fica em `conteudo-pos-anuncio/content-completo.js`, fora da pasta `site/`. O GitHub Pages publica só `site/`, então nada disso chega ao navegador, nem no HTML, nem em `content.js`, nem em atributos escondidos.
- Quem libera é a organização, com a chave `publicacao.liberado` em `site/content.js`. O relógio do visitante **nunca** destrava nada: ele só muda o texto da contagem (antes, durante e depois da reunião). Depois das 9h30, sem liberação, o site diz que o tema já foi revelado e que o conteúdo será publicado em breve.
- Na maquete 3D, os dias ainda secretos (qua 28 e sex 30) aparecem com listras de advertência e "Revelado em 26.10", sem nenhum detalhe.

**Para liberar depois do anúncio**

1. Revise e complete `conteudo-pos-anuncio/content-completo.js` com o que foi anunciado (tema, regras, prêmios, banca...). O tema vai em `revelacao.tema` dentro de `site/content.js`, se quiserem mostrá-lo na fita.
2. Copie o arquivo para `site/content-completo.js`.
3. Em `site/content.js`, mude `publicacao.liberado` para `true`.
4. Faça commit e push. As gavetas dão lugar aos capítulos completos (04 a 10), a maquete mostra os prazos reais e a chamada final ganha o bloco de inscrição.

Atenção: o repositório é privado. Se ele ficar público antes da liberação, `conteudo-pos-anuncio/` (e a cópia antiga em `HackathonIF-main/`) passa a ser visível no GitHub; nesse caso, tire esses arquivos do repositório até a hora.

## Onde editar o conteúdo

O conteúdo público está em **`site/content.js`**; o trancado, em `conteudo-pos-anuncio/content-completo.js`. Não é preciso mexer no HTML.

- Texto entre colchetes, como `[LOCAL A DEFINIR]`, é um **marcador provisório**. Na página ele aparece em fita amarela, sublinhado em tracejado. Troque pelo texto oficial e o destaque some sozinho.
- Um valor que é só o marcador vira uma fita amarela inteira; um marcador dentro de uma frase vira um trecho amarelo no meio do texto.
- Datas do cronograma: fita amarela enquanto for marcador, preta quando confirmada, vermelha se o item for um prazo (`marco: true`).
- `confirmado: false` nas perguntas do FAQ mostra a etiqueta "Resposta pendente".
- `exibir: false` esconde um item do cronograma.
- **Revelação do tema:** `revelacao.inicio` e `revelacao.fim` controlam a contagem regressiva (fuso de Brasília). Durante a abertura, a seção mostra "A revelação é agora". Depois, se `revelacao.tema` for preenchido, o tema aparece na fita da gaveta.
- **Links:** enquanto `links.inscricao` for um marcador, os botões dizem "Como se inscrever" e levam à seção de inscrição, onde o formulário aparece desativado com "em breve" e um aviso de que as inscrições não estão abertas por este site. Enquanto `links.regulamento` for um marcador, o botão aparece desativado. Quando a URL real (`https://...`) for colocada, tudo passa a funcionar sozinho.

### Conferir o que falta

Em `localhost` (ou com `?revisao` no endereço), uma fita amarela no canto inferior direito mostra quantos marcadores faltam. Clique nela para ver a lista. No console do navegador, `HACKATHON_PENDENTES()` devolve a mesma lista.

Já confirmado e público: 23ª Semana Nacional de Ciência e Tecnologia, de 26 a 30/10/2026; revelação do tema na segunda 26/10, 8h às 9h30, na Sala 2 do Bloco 1, com apresentação do Prof. Olavo; equipes de 3 a 5 estudantes regularmente matriculados no IFSP campus Jacareí, de qualquer curso (outros campi e instituições não participam). Os demais fatos confirmados estão no arquivo do conteúdo trancado.

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
| Links | regulamento oficial, página da Semana Nacional de Ciência e Tecnologia |
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
