# CLAUDE.md — Portfólio LR://SYS

## Objetivo

Portfólio pessoal de Leonardo Ribeiro (estudante de ADS e de Engenharia de Controle e
Automação). É a reconstrução fiel do protótipo do Lovable
(<https://screenshot-to-lovely-web-84.lovable.app/>), com correções de dados, links,
acessibilidade e interações. **Fidelidade ao design original é critério de aceitação.**

## Stack

React 19 · TypeScript 6.0 (não subir para 7 enquanto o typescript-eslint não suportar) ·
Vite 8 · Tailwind CSS 4 (`@theme` em `src/styles/index.css`) · React Router 8
(`createBrowserRouter`) · lucide-react 1.x (sem ícones de marca: use
`components/icons/BrandIcons.tsx`) · Vitest + Testing Library · Playwright + axe.

## Comandos

```bash
npm run dev            # desenvolvimento
npm run check          # lint + typecheck + unit + build — rode antes de concluir
npm run test:e2e       # E2E no build de produção (desktop + mobile)
npm run visual:compare # comparação seção a seção com o Lovable (precisa de `npm run preview`)
```

No Windows, um `vite preview` antigo na porta 4173 faz o Playwright reutilizar um build
desatualizado. Encerre-o antes de rodar o E2E.

## Regras visuais

- Paleta fixa (tokens em `src/styles/index.css`): background, surface, `neon` (ciano),
  `cyber` (roxo), `terminal` (verde), `industrial` (laranja). Para **texto** roxo, use
  `text-cyber-soft` (o roxo original não passa em contraste).
- Fontes: `font-display` (Orbitron) para títulos em caixa alta, `font-sans` (Space
  Grotesk) para texto, `font-mono` (JetBrains Mono) para HUD/rótulos.
- Cantos chanfrados com `clip-hud` (cards) e `clip-btn` (botões). O `clip-path` corta
  bordas e outlines: use `HudCard` (moldura `p-px`) e os componentes `Button*`, que já
  resolvem moldura e foco.
- Identificadores técnicos (`// SECTION 0X`, `MODULE 01`, `ID_00X`) fazem parte da identidade.
- Não fazer redesign. Glow só onde o original tem. Toda animação nova precisa respeitar
  `prefers-reduced-motion`.

## Regras de conteúdo (obrigatórias)

- **Não inventar** dados acadêmicos, profissionais, datas, links, métricas ou capturas.
- Status reais: `Planned`/`Concept` não podem ter funcionalidades `done` (há teste).
- Imagens ilustrativas devem ter `illustrative: true`.
- Links ficam **só** em `src/config/site.ts` e `src/data/projects.ts`. Link não
  confirmado = `verified: false`.
- Nunca simular envio do formulário. Segredos só em variáveis de ambiente do servidor.

## Arquitetura

Ver `docs/ARQUITETURA.md`. Resumo: conteúdo em `src/data` + `src/config`; seções em
`src/sections`; componentes reutilizáveis em `src/components/*`; simulação pura em
`src/features/lab/simulation.ts`; função de contato em `api/contact.ts`
(`handleContact` testável).

## Referências

- Original: <https://screenshot-to-lovely-web-84.lovable.app/>; capturas em `docs/reference/original/`
- GitHub: <https://github.com/Ashkor7>
- Game Library: <https://github.com/Ashkor7/biblioteca-jogos> (React, Express, PostgreSQL, Prisma — **não** MySQL)
- RPG Isekai: repositório privado `Ashkor7/rpg-isekai` (Godot 4.7.2, GDScript, marco M1)
- LinkedIn (confirmado manualmente): <https://www.linkedin.com/in/leonardo-ribeiro-401b023a9/>

## Critérios de teste

Uma mudança só está pronta quando:

1. `npm run check` passa (lint, tipos, testes unitários e build).
2. `npm run test:e2e` passa em desktop e mobile, sem erros de console e sem violações
   axe sérias/críticas.
3. Não há rolagem horizontal em 360, 390, 768, 1024 e 1440 px.
4. Mudanças visuais foram comparadas com o original (`npm run visual:compare`) e as
   diferenças são intencionais.
