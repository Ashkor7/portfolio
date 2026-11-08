# Testes e garantia de qualidade

Resultados da execução em **08/11/2026** (Windows 11, Node 26, Chromium do Playwright 1.65).

## Resumo

| Verificação                                | Comando             | Resultado                                                                                  |
| ------------------------------------------ | ------------------- | ------------------------------------------------------------------------------------------ |
| Lint                                       | `npm run lint`      | ✔ 0 problemas                                                                              |
| Tipos                                      | `npm run typecheck` | ✔ 0 erros                                                                                  |
| Unitários + componentes                    | `npm test`          | ✔ 45/45                                                                                    |
| Build de produção                          | `npm run build`     | ✔ (JS principal: 121 kB gzip; página de detalhes em chunk separado)                        |
| E2E desktop + mobile                       | `npm run test:e2e`  | ✔ 32 passaram · 2 pulados de propósito (teste só-mobile no desktop e só-teclado no mobile) |
| Acessibilidade (axe, WCAG 2 A/AA)          | incluso no E2E      | ✔ sem violações sérias/críticas em `/` e `/projects/game-library`                          |
| Rolagem horizontal (360/390/768/1024/1440) | incluso no E2E      | ✔ nenhuma, na home e nos detalhes                                                          |
| Erros de console                           | incluso no E2E      | ✔ nenhum                                                                                   |

`npm audit` aponta 10 vulnerabilidades **moderadas** apenas em dependências de
desenvolvimento (`minimatch`, via ferramentas de lint/teste). `npm audit --omit=dev`: 0.

## O que é coberto

**Unitários (`src/**/*.test.ts`, `api/*.test.ts`)**

- Simulação: estados OFF/ON, subida e descida do PWM, histórico, `settle`, polyline.
- Dados: IDs/slugs únicos, 4 rotas, repositório da Game Library, ausência de MySQL e de
  Python/C no RPG, nenhum link genérico, nenhum e-mail de exemplo, status honestos, filtros.
- Contato: validação, honeypot, tempo mínimo, `sendContact` (sucesso só com `ok: true`,
  404/503 → indisponível, falha de rede).
- API `/api/contact`: 503 sem segredos, validação 422, envio via Resend, falha 502,
  honeypot, envio rápido, limite por IP (429), método inválido (405).

**Componentes (`src/test/components.test.tsx`)**

- Project Database: filtros, aba ativa, `?filter=` na URL, setas do teclado, estado vazio,
  IDs estáveis, links do card.
- Engineering Lab: sensor ON/OFF, motor, status, medidor PWM, reinício, aviso de simulação.
- Formulário: validação acessível, erro honesto sem configuração, sucesso só com confirmação.
- Navbar: menu mobile com `aria-expanded`, Esc devolve o foco.
- Terminal: movimento reduzido e botão _skip_.
- Rotas: detalhes, 404 de slug e de rota.

**E2E (`e2e/portfolio.spec.ts`, build de produção, desktop 1440 px e mobile 390 px)**

- Carregamento sem erros e metadados; navbar até cada seção com seção ativa; CTAs do Hero;
  links sociais; filtros e URL; detalhes e retorno à lista; acesso direto às 4 rotas;
  repositório da Game Library; 404; simulação completa; formulário (validação, foco no
  primeiro erro, erro honesto sem backend); menu mobile; `prefers-reduced-motion`;
  skip link; axe; rolagem horizontal em 5 larguras.

## Comparação visual com o original

`npm run visual:compare` captura cada seção do Lovable e da reconstrução com animações
congeladas e calcula a diferença de pixels com o pixelmatch (limiar 0.15).

| Viewport | Seção    | Pixels diferentes | Altura original → local | Motivo da diferença                                                        |
| -------- | -------- | ----------------- | ----------------------- | -------------------------------------------------------------------------- |
| desktop  | Hero     | 0.0%              | 900 → 900               | —                                                                          |
| desktop  | Profile  | 0.3%              | 626 → 626               | 6º item no módulo 01                                                       |
| desktop  | Projects | 10.8%             | 1610 → 1675             | linha de status, resumos corrigidos, selo "Concept art", novas tecnologias |
| desktop  | Stack    | 2.9%              | 623 → 701               | legenda "em uso/em estudo", ícones, novas tecnologias                      |
| desktop  | Lab      | 1.9%              | 723 → 860               | sinal digital, medidor PWM, reinício, aviso                                |
| desktop  | Journey  | 3.7%              | 913 → 1001              | categoria nos eventos, eventos reais                                       |
| desktop  | Contact  | 2.3%              | 768 → 796               | Instagram; e-mail falso removido                                           |
| mobile   | Hero     | 0.1%              | 1231 → 1231             | —                                                                          |
| mobile   | Profile  | 3.6%              | 993 → 1053              | conector vertical entre módulos                                            |
| mobile   | Projects | 17.4%             | 2417 → 2681             | idem desktop (acumula em 1 coluna)                                         |
| mobile   | Stack    | 5.6%              | 1213 → 1328             | idem desktop                                                               |
| mobile   | Lab      | 6.3%              | 1063 → 1288             | idem desktop                                                               |
| mobile   | Journey  | 7.5%              | 1073 → 1201             | idem desktop                                                               |
| mobile   | Contact  | 3.9%              | 1189 → 1217             | idem desktop                                                               |

As diferenças vêm de conteúdo corrigido ou adicionado de propósito. Layout, tipografia,
cores, bordas, espaçamentos e proporções coincidem; o Hero, que não teve mudança de
conteúdo, ficou idêntico.

Diferenças visuais intencionais:

- Texto roxo um pouco mais claro (`--cyber-soft`) por contraste.
- Gráfico do Lab em repouso é uma linha plana em 0% (o original exibia uma onda decorativa
  mesmo com o sistema parado, o que contradiz "PWM 0%").
- Botão ghost com moldura completa nos cantos chanfrados (no original a borda era cortada).

## Limitações conhecidas

- O envio real do formulário foi confirmado manualmente no deploy da Vercel (08/11/2026);
  os testes automatizados usam `fetch` simulado e o E2E remoto não envia e-mail.
- O limite de tentativas por IP é em memória (por instância serverless); para algo
  robusto, use Upstash/Redis ou o firewall da Vercel.
- O LinkedIn foi confirmado manualmente (o site bloqueia verificação automatizada).
