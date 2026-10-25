# Hackathon · 23ª Semana de Ciência e Tecnologia · IFSP campus Jacareí

Site do hackathon da 23ª Semana de Ciência e Tecnologia do IFSP campus Jacareí: uma página em HTML, CSS e JavaScript estáticos, publicada no GitHub Pages.

**No ar:** https://helenavieiranasc.github.io/HackathonIF/

## Duas versões, uma de cada vez

O projeto tem duas versões. Só uma vai ao ar, escolhida em `release.json`.

| Versão | Pasta | O que mostra |
|---|---|---|
| `pre-anuncio` (no ar agora) | `pre-anuncio/` + arquivos neutros de `site/` | apresentação com contagem regressiva, data, horário, local e apresentador da reunião de abertura, o que é um hackathon, montagem de equipe (3 a 5 integrantes), maquete 3D da semana e uma página trancada para o restante |
| `completo` (depois do anúncio) | `site/` | o site inteiro, com tudo o que for anunciado na reunião de abertura |

**Reunião de abertura:** segunda-feira, 26/10/2026, das 8h às 9h30, Sala 2, Bloco 1, IFSP Jacareí. Apresentação: Profa. Ariadne.

## Rodar no computador

Precisa só do Node 18 ou mais novo. Não há nada para instalar.

```bash
npm run dev
```

Gera a pasta `dist/` com a versão indicada em `release.json` e abre em http://localhost:5180.

Para ver a versão completa sem mudar o que está no ar:

```bash
npm run dev:completo
```

## Publicar

A cada push na branch `main`, o GitHub Actions (`.github/workflows/pages.yml`) roda `node scripts/build.mjs` e publica **somente a pasta `dist/`** no GitHub Pages. Em **Settings > Pages > Source**, a opção deve estar em **GitHub Actions**.

### Cache

O GitHub Pages deixa o navegador guardar cada arquivo por até 10 minutos. Para que um deploy apareça na hora, o build liga cada CSS e JS com uma marca do conteúdo (`styles.css?v=1a2b3c4d5e`). Só a página em si pode levar alguns minutos para atualizar; **Ctrl+Shift+R** mostra a versão nova na hora.

## Pastas

```
release.json          qual versão vai ao ar: "pre-anuncio" ou "completo"
pre-anuncio/          versão pré-anúncio
  index.html          apresentação, o que é, equipes e página trancada
  content.js          só informações públicas
  pre.js              contagem, maquete 3D, cadeado e animações
  pre.css             estilos próprios da versão pré-anúncio
site/                 site completo (publicado só na versão "completo")
  index.html          estrutura das seções
  content.js          todo o conteúdo do evento
  main.js             monta o conteúdo, menu, contagem, rotuladora e animações
  styles.css          cores, tipos, espaços e layout (usado pelas duas versões)
  model.js            maquete 3D da semana (Three.js, usada pelas duas versões)
  assets/             favicon e marca oficial do campus Jacareí
  vendor/             fontes, GSAP e Three.js hospedados no próprio site
scripts/build.mjs     monta dist/ e confere a versão pré-anúncio
scripts/serve.mjs     servidor local
dist/                 resultado do build (não vai para o Git)
brand/                arquivos originais da marca IFSP (não publicados)
```

## Onde editar o conteúdo

Todo o texto fica nos arquivos `content.js`; não é preciso mexer no HTML.

- `pre-anuncio/content.js`: o que está no ar agora (só informações públicas).
- `site/content.js`: o site completo.

Texto entre colchetes, como `[E-MAIL A DEFINIR]`, é um **marcador provisório**: aparece destacado em amarelo até ser trocado pelo texto oficial. Rodando localmente, uma etiqueta amarela no canto da tela mostra quantos marcadores faltam; no console do navegador, `HACKATHON_PENDENTES()` lista todos.

## O que o site faz

- **Contagem regressiva** até 26/10/2026 às 8h, no horário de Brasília.
- **Maquete 3D da semana** com as datas públicas. Funciona em celular, tablet e computador. Em aparelhos sem suporte a 3D, aparece um desenho da mesma maquete.
- **Página trancada:** um cadeado fechado com a mensagem "O restante será revelado na segunda-feira.", sem citar o que vem depois. Segurar o cadeado puxa a alça e ele responde. Depois das 8h de 26/10, a frase muda para "O restante será publicado em breve.".
- **Responsivo** de celulares de 280px a telas de 2560px, incluindo celular deitado.

## Identidade IFSP

- A marca usada é a **assinatura oficial do campus Jacareí**, baixada do portal do IFSP e convertida do PDF vetorial oficial para SVG, sem alterar formas ou cores. Os arquivos originais e o manual estão em `brand/`.
- Segue o Manual de Aplicação da Marca IF (MEC, 2015): marca sobre base branca, com área de proteção, sem rotação, recoloração ou contorno.
- O verde e o vermelho institucionais inspiram as fitas de rotuladora do site; a marca em si nunca é alterada.

## Acessibilidade

- HTML semântico, títulos em ordem, link para pular ao conteúdo, foco visível e menu de celular que fecha com Esc.
- Com "reduzir movimento" ativado no aparelho, nada se mexe: a maquete aparece parada e o conteúdo, direto.
- O cadeado funciona com mouse, toque, teclado (Espaço ou Enter) e leitor de tela.
- **Conteúdo montado por JavaScript:** sem JavaScript, os textos de `content.js` não aparecem.
- **Uso da marca:** confirmem com a comunicação do campus se o site pode usar a marca oficial.
- **Sem fotos:** não há fotografias oficiais do evento, e nenhuma foi inventada.
