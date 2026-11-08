# Diagnóstico do portfólio original (Lovable)

Inspeção feita em **08/11/2026** com Playwright em
<https://screenshot-to-lovely-web-84.lovable.app/> (desktop 1440 px, tablet 768 px,
mobile 390 px e 360 px). Capturas de referência em [`docs/reference/original/`](reference/original/).

## Como a inspeção foi feita

1. Snapshot de acessibilidade da home (estrutura, rótulos, links e `href`).
2. Leitura dos tokens CSS (`:root`) e estilos computados (cores, fontes, grid de fundo).
3. Download do bundle publicado (`styles-*.css`, `routes-*.js`, `hud-*.js`,
   `projects._slug-*.js`) para extrair as classes exatas de cada componente, os dados
   dos projetos e a lógica de interação.
4. Capturas de página inteira (home e `/projects/game-library`) nas quatro larguras.
5. Verificação de todos os links externos e dos repositórios do GitHub (`gh` CLI).

Nenhuma página ficou inacessível. A única limitação: o LinkedIn não pode ser validado
automaticamente (ver abaixo).

## Identidade visual extraída

| Token                | Valor original                      | Uso                  |
| -------------------- | ----------------------------------- | -------------------- |
| `--background`       | `oklch(14.5% .016 260)` ≈ `#080b12` | fundo                |
| `--surface`          | `oklch(20.5% .03 262)`              | cards                |
| `--neon`             | `oklch(82% .15 215)` ≈ `#00d9ff`    | destaque principal   |
| `--cyber`            | `oklch(58% .22 300)` ≈ `#9d4edd`    | secundário roxo      |
| `--terminal`         | `oklch(88% .18 168)` ≈ `#00ffb2`    | status/terminal      |
| `--industrial`       | `oklch(77% .16 58)` ≈ `#ff9f43`     | acentos de automação |
| `--muted-foreground` | `oklch(65% .03 260)`                | texto secundário     |

- Fontes: **Orbitron** (títulos, 500/700/900), **Space Grotesk** (texto), **JetBrains Mono** (HUD).
- Fundo com grid de 48 px em neon a 5%.
- Cantos chanfrados via `clip-path` (`clip-hud` 18 px, `clip-btn` 10 px); molduras de 1 px
  feitas com padding sobre fundo colorido.
- Animações: `dash` (trilhas), `pulse-led`, `spin-slow` (anéis do MCU), `blink` (cursor),
  `reveal` (entrada ao rolar). Já havia suporte a `prefers-reduced-motion`.

## Estrutura encontrada

Navbar fixa (LR://SYS + 6 âncoras + barra de progresso de rolagem), 7 seções e rota
`/projects/:slug` com 6 cards (Problema, Objetivo, Arquitetura, Desafios, Soluções,
Resultados).

## Problemas encontrados

### Conteúdo incorreto ou não verificável

| #   | Problema                                                                                                                | Correção                                                                                             |
| --- | ----------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| 1   | Game Library listava **TypeScript + MySQL**; o repositório usa **JavaScript, Express, PostgreSQL e Prisma**             | Dados reescritos a partir do README/package.json                                                     |
| 2   | Botão GitHub de todos os cards apontava para `https://github.com/`                                                      | Game Library → `github.com/Ashkor7/biblioteca-jogos`; os outros não têm repositório público          |
| 3   | RPG Isekai listado como **Python + C**; o repositório usa **Godot 4.7.2 + GDScript**                                    | Corrigido; funcionalidades limitadas ao que o marco M1 implementa                                    |
| 4   | Personal Agenda como "Development" com "visão semanal pronta"; **não existe repositório nem código**                    | Status **Planned**, sem funcionalidades declaradas como prontas                                      |
| 5   | Resultados inventados nas páginas de detalhes (ex.: "CRUD funcionando", "primeiro mapa implementado" sem fonte)         | Substituídos por informações verificadas                                                             |
| 6   | Timeline com datas 2024/2025 sem fonte                                                                                  | Datas não confirmadas removidas; só ficam as confirmadas pelo Git (out/2026)                         |
| 7   | `seu.email@exemplo.com` publicado como contato                                                                          | Removido; e-mail fica `null` até ser definido                                                        |
| 8   | LinkedIn/GitHub do Hero e Contato apontavam para as páginas iniciais                                                    | Perfis reais centralizados em `src/config/site.ts`                                                   |
| 9   | Capas são **ilustrações geradas** (a da Game Library mostra uma interface fictícia com jogos comerciais), sem indicação | Mantidas pela fidelidade visual, mas marcadas como "Concept art" e com legenda na página de detalhes |
| 10  | Diagrama rotulado "MALHA FECHADA", mas SENSOR → MCU → CONTROLE → ATUADOR não tem realimentação                          | Rotulado como "MALHA ABERTA"                                                                         |

### Funcionalidade

| #   | Problema                                                                               | Correção                                                                        |
| --- | -------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| 11  | Formulário **simulava sucesso** com `setTimeout` ("Mensagem recebida (demonstração)")  | Envio real via `/api/contact` (Resend); sem configuração, mostra erro honesto   |
| 12  | IDs dos cards (`ID_001`…) eram o índice da lista **filtrada** e mudavam com o filtro   | IDs estáveis nos dados                                                          |
| 13  | Filtro não refletia na URL; sem estado vazio                                           | `?filter=` na URL + estado vazio                                                |
| 14  | Sem indicador de seção ativa na navbar; menu mobile sem `aria-expanded`/Esc            | Implementados                                                                   |
| 15  | Simulação: status pulava direto para 78% sem transição; sem reinício nem sinal digital | Resposta de 1ª ordem, gráfico com PWM + sinal digital, reinício, lógica isolada |
| 16  | Sem página 404 tratada para rotas desconhecidas                                        | 404 para rota e para slug inexistente                                           |
| 17  | Terminal de boot sem opção de pular                                                    | Botão _skip_, toca uma vez por sessão                                           |

### Acessibilidade e HTML

| #   | Problema                                                                        | Correção                                                         |
| --- | ------------------------------------------------------------------------------- | ---------------------------------------------------------------- |
| 18  | `<button>` aninhado dentro de `<a>` (HTML inválido) nos CTAs e cards            | Links estilizados como botão (`ButtonLink`/`ButtonAnchor`)       |
| 19  | O `clip-path` cortava o _outline_ de foco dos botões chanfrados: foco invisível | Foco com sombra interna/moldura                                  |
| 20  | Texto roxo (`--cyber`) pequeno abaixo de 4.5:1 de contraste (axe)               | Token `--cyber-soft` para texto; roxo original mantido em bordas |
| 21  | `role="tablist"` sem `tabpanel`, sem navegação por setas                        | Padrão WAI-ARIA Tabs completo                                    |
| 22  | Sem link "pular para o conteúdo"                                                | Adicionado                                                       |
| 23  | Botão "ghost" com borda cortada nos cantos chanfrados                           | Moldura em duas camadas                                          |

## Links verificados

| Link                                       | Resultado                                                                                                                                  |
| ------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------ |
| github.com/Ashkor7                         | 200 ✔                                                                                                                                      |
| github.com/Ashkor7/biblioteca-jogos        | 200 ✔ (público)                                                                                                                            |
| github.com/Ashkor7/rpg-isekai              | 404 para visitantes — **repositório privado**                                                                                              |
| instagram.com/leonardo_ribeiro78           | 200 ✔                                                                                                                                      |
| linkedin.com/in/leonardo-ribeiro-401b023a9 | **Não confirmado**: o LinkedIn responde 999 e redireciona para o login (authwall) para acesso automatizado. Marcado como `verified: false` |
