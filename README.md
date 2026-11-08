# LR://SYS — Portfólio de Leonardo Ribeiro

Portfólio pessoal com estética cyberpunk / painel de engenharia: **Software Development ×
Control & Automation Engineering**.

Reconstrução independente do protótipo feito no Lovable
(<https://screenshot-to-lovely-web-84.lovable.app/>), preservando o design e corrigindo
dados, links, interações e acessibilidade. O diagnóstico completo está em
[`docs/ANALISE_ORIGINAL.md`](docs/ANALISE_ORIGINAL.md).

## Stack

React 19 · TypeScript 6 · Vite 8 · Tailwind CSS 4 · React Router 8 · Lucide ·
Vitest + Testing Library · Playwright + axe · ESLint + Prettier · Vercel Functions (contato).

## Rodando localmente

Pré-requisitos: **Node.js 22.22+** e npm.

```powershell
npm install
npm run dev          # http://localhost:5173
```

O formulário de contato depende da função serverless `/api/contact`, que não roda no
`vite dev`. Localmente ele mostra "envio indisponível", que é o comportamento esperado.
Para testar o envio real, use `vercel dev` com as variáveis configuradas.

## Scripts

| Comando                  | O que faz                                                             |
| ------------------------ | --------------------------------------------------------------------- |
| `npm run dev`            | servidor de desenvolvimento                                           |
| `npm run build`          | typecheck + build de produção em `dist/`                              |
| `npm run preview`        | serve o build em `http://localhost:4173`                              |
| `npm run lint`           | ESLint                                                                |
| `npm run typecheck`      | TypeScript sem emitir arquivos                                        |
| `npm test`               | testes unitários e de componentes (Vitest)                            |
| `npm run test:e2e`       | testes E2E no build de produção (desktop + mobile)                    |
| `npm run check`          | lint + typecheck + testes + build                                     |
| `npm run visual:compare` | compara cada seção com o site original (precisa do `preview` rodando) |
| `npm run og:image`       | regenera `og-image.png` e ícones PNG                                  |

Na primeira vez que for rodar o E2E: `npx playwright install chromium`.

Para testar um deploy: `E2E_BASE_URL=https://portfolio-leonardoribeiro.vercel.app npm run test:e2e`
(o teste de contato só valida os campos e não envia e-mail).

## Funcionalidades

- **Hero:** terminal de boot animado (pode ser pulado, toca uma vez por sessão, respeita
  movimento reduzido), CTAs funcionais e perfis sociais.
- **Operator Profile:** dois módulos com competências vindas de `src/data/profile.ts`.
- **Project Database:** filtros funcionais refletidos na URL (`/?filter=software`),
  navegação por teclado (setas), estado vazio, status diferenciados (Development, Planned,
  Concept, Completed), links reais de GitHub/demonstração e IDs estáveis.
- **Páginas de projeto:** `/projects/game-library`, `/projects/personal-agenda`,
  `/projects/rpg-isekai` e `/projects/engineering-lab`, com problema, objetivo,
  arquitetura, desafios, funcionalidades (implementadas × planejadas), status, pilha
  técnica, repositório e navegação entre projetos; 404 para slug inexistente.
- **Technology Stack:** grupos com ícones, distinção entre "em uso" e "em estudo", sem
  porcentagens.
- **Engineering Lab:** diagrama de blocos com fluxo de sinal, simulação ilustrativa
  sensor → motor com resposta de 1ª ordem, gráfico de PWM + sinal digital, reinício e aviso
  de que não é hardware real. A lógica fica em `src/features/lab/simulation.ts`.
- **Academic Journey:** timeline com filtro Realizado/Planejado e categorias.
- **Contato:** validação acessível, honeypot, tempo mínimo, loading/sucesso/erro reais.
  Sucesso só aparece após confirmação do servidor.
- **Geral:** navbar fixa com seção ativa e progresso de rolagem, menu mobile acessível,
  skip link, foco visível, `prefers-reduced-motion`, SEO (title/description/OG por página,
  favicon, imagem de compartilhamento, `robots.txt`, `sitemap.xml`).

## Editando o conteúdo

| O quê                                  | Arquivo                |
| -------------------------------------- | ---------------------- |
| Nome, bio, e-mail, links sociais, SEO  | `src/config/site.ts`   |
| Projetos (cards e páginas)             | `src/data/projects.ts` |
| Tecnologias                            | `src/data/stack.ts`    |
| Timeline                               | `src/data/journey.ts`  |
| Competências, linhas do terminal, menu | `src/data/profile.ts`  |
| Cores e tipografia                     | `src/styles/index.css` |

Capturas reais de projetos: coloque em `public/projects/` e adicione em `screenshots` do
projeto, com `illustrative: false`.

## Deploy (Vercel)

1. Importe o repositório na Vercel. O `vercel.json` já define o build (`npm run build`),
   a saída (`dist`), o _rewrite_ de SPA e os cabeçalhos de segurança/cache.
2. Em **Settings → Environment Variables**, defina:

   | Variável             | Onde     | Para que                                                                    |
   | -------------------- | -------- | --------------------------------------------------------------------------- |
   | `VITE_SITE_URL`      | build    | URL final (ex.: `https://seudominio.com`), usada em canonical, OG e sitemap |
   | `RESEND_API_KEY`     | servidor | chave da API do [Resend](https://resend.com)                                |
   | `CONTACT_TO_EMAIL`   | servidor | e-mail que recebe as mensagens                                              |
   | `CONTACT_FROM_EMAIL` | servidor | remetente verificado no Resend                                              |

3. Faça o deploy e teste o formulário. Sem as três variáveis de servidor, o formulário
   continua funcionando, mas informa que o envio está indisponível.

Veja o modelo em [`.env.example`](.env.example). Nenhum segredo vai para o repositório.

**Outras plataformas:** o site é estático (`dist/`). A função `api/contact.ts` exporta
`handleContact(request, env)`, independente de plataforma, e pode ser adaptada para
Netlify/Cloudflare. Configure _fallback_ de SPA para `index.html`.

## Antes de publicar — pendências

- [x] **LinkedIn**: perfil confirmado manualmente em 08/11/2026.
- [x] **Envio do formulário**: Resend configurado na Vercel e envio confirmado em 08/11/2026.
- [ ] **E-mail público** (opcional): definir `person.email` em `src/config/site.ts`.
- [ ] **RPG Isekai**: o repositório é privado. Se ficar público, preencha `github` em
      `src/data/projects.ts`.
- [ ] **Datas da timeline**: preencher os anos de ingresso nas graduações em
      `src/data/journey.ts` (as datas do Lovable não puderam ser confirmadas).
- [ ] **Capturas reais**: substituir as ilustrações por screenshots reais quando existirem.

Em desenvolvimento, o console avisa sobre os itens pendentes de `src/config/site.ts`.

## Documentação

- [`docs/ANALISE_ORIGINAL.md`](docs/ANALISE_ORIGINAL.md): inspeção do Lovable e problemas corrigidos
- [`docs/ARQUITETURA.md`](docs/ARQUITETURA.md): estrutura e decisões técnicas
- [`docs/QUALIDADE.md`](docs/QUALIDADE.md): testes e comparação visual
- [`CLAUDE.md`](CLAUDE.md): guia para agentes de IA
