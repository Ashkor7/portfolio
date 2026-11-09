import { describe, expect, it } from 'vitest'
import { events, orderEvents } from './events'
import { filterProjects, getProjectBySlug, parseProjectFilter, projects } from './projects'
import { journey } from './journey'
import { person, pendingValidation, socialLinks } from '@/config/site'

// Arquivos em public/, para conferir se as fotos dos eventos existem.
const publicFiles = new Set(
  Object.keys(import.meta.glob('/public/events/**/*.webp')).map((p) => p.replace(/^\/public/, '')),
)

describe('dados dos projetos', () => {
  it('tem ids e slugs únicos', () => {
    expect(new Set(projects.map((p) => p.id)).size).toBe(projects.length)
    expect(new Set(projects.map((p) => p.slug)).size).toBe(projects.length)
  })

  it('expõe as quatro rotas de detalhes esperadas', () => {
    for (const slug of ['game-library', 'personal-agenda', 'rpg-isekai', 'engineering-lab']) {
      expect(getProjectBySlug(slug)).toBeDefined()
    }
    expect(getProjectBySlug('nao-existe')).toBeUndefined()
  })

  it('Game Library aponta para o repositório oficial e não cita MySQL', () => {
    const game = getProjectBySlug('game-library')!
    expect(game.github).toBe('https://github.com/Ashkor7/biblioteca-jogos')
    expect(game.tech).toContain('PostgreSQL')
    expect(JSON.stringify(game)).not.toMatch(/mysql/i)
  })

  it('RPG Isekai usa Godot/GDScript, não Python/C', () => {
    const rpg = getProjectBySlug('rpg-isekai')!
    expect(rpg.tech).toEqual(expect.arrayContaining(['Godot 4', 'GDScript']))
    expect(rpg.tech).not.toContain('Python')
    expect(rpg.tech).not.toContain('C')
  })

  it('nenhum link é genérico (página inicial do GitHub/LinkedIn)', () => {
    const generic = /^https:\/\/(www\.)?(github|linkedin)\.com\/?$/
    for (const p of projects) {
      if (p.github) expect(p.github).not.toMatch(generic)
      if (p.demo) expect(p.demo).not.toMatch(generic)
    }
    for (const l of socialLinks) expect(l.href).not.toMatch(generic)
    for (const e of events) for (const l of e.links) expect(l.href).not.toMatch(generic)
  })

  it('eventos têm slugs únicos, fotos existentes e links de posts específicos', () => {
    expect(new Set(events.map((e) => e.slug)).size).toBe(events.length)
    expect(new Set(events.map((e) => e.id)).size).toBe(events.length)
    for (const e of events) {
      expect(e.photos).toContain(e.cover)
      for (const p of e.photos) {
        expect(p.alt.length).toBeGreaterThan(10)
        for (const file of [p.src, p.thumb]) expect(publicFiles.has(file), file).toBe(true)
      }
      for (const l of e.links) {
        if (l.kind === 'linkedin') expect(l.href).toMatch(/linkedin\.com\/(feed\/update|posts)\//)
        if (l.kind === 'instagram') expect(l.href).toMatch(/instagram\.com\/p\//)
      }
    }
  })

  it('Startup Weekend e Hackathon Atlas ficam fixados no topo dos eventos', () => {
    const slugs = orderEvents(events).map((e) => e.slug)
    expect(slugs.slice(0, 2)).toEqual(['startup-weekend-pelotas-2026', 'hackathon-atlas-2026'])
    expect(new Set(slugs)).toEqual(new Set(events.map((e) => e.slug)))
  })

  it('não publica e-mail de exemplo', () => {
    expect(person.email ?? '').not.toMatch(/exemplo|example/i)
    expect(pendingValidation.some((p) => p.includes('E-mail'))).toBe(person.email === null)
  })

  it('projetos sem código não aparecem como concluídos', () => {
    expect(getProjectBySlug('personal-agenda')!.status).toBe('Planned')
    expect(getProjectBySlug('engineering-lab')!.status).toBe('Concept')
    for (const p of projects.filter((x) => x.status === 'Planned' || x.status === 'Concept')) {
      expect(p.features.every((f) => f.state === 'planned')).toBe(true)
    }
  })

  it('filtra por categoria e interpreta o filtro da URL', () => {
    expect(filterProjects(projects, 'All')).toHaveLength(projects.length)
    expect(filterProjects(projects, 'Automation').map((p) => p.slug)).toEqual(['engineering-lab'])
    expect(parseProjectFilter('software')).toBe('Software')
    expect(parseProjectFilter('ENGINEERING')).toBe('Engineering')
    expect(parseProjectFilter('xyz')).toBe('All')
    expect(parseProjectFilter(null)).toBe('All')
  })

  it('timeline: graduações e o RPG estão em andamento, não concluídos', () => {
    const status = (title: RegExp) => journey.find((e) => title.test(e.title))?.status
    expect(status(/Engenharia de Controle/)).toBe('progress')
    expect(status(/Análise e Desenvolvimento/)).toBe('progress')
    expect(status(/RPG Isekai/)).toBe('progress')
  })
})
