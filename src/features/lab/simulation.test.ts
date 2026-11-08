import { describe, expect, it } from 'vitest'
import {
  createInitialState,
  defaultConfig,
  readout,
  setSensor,
  settle,
  step,
  toPolyline,
  type SimState,
} from './simulation'

const run = (state: SimState, seconds: number, dt = 0.08) => {
  let s = state
  for (let t = 0; t < seconds; t += dt) s = step(s, dt)
  return s
}

describe('simulação do Engineering Lab', () => {
  it('começa em repouso: SENSOR OFF, MOTOR IDLE, PWM 0%, AGUARDANDO', () => {
    const r = readout(createInitialState())
    expect(r).toMatchObject({ sensorLabel: 'OFF', motor: 'IDLE', pwm: 0, status: 'AGUARDANDO' })
  })

  it('com o sensor ligado: MOTOR ACTIVE, STATUS OPERANDO e PWM subindo até o alvo', () => {
    const on = setSensor(createInitialState(), true)
    const early = step(on, 0.08)
    expect(readout(early)).toMatchObject({ sensorLabel: 'ON', motor: 'ACTIVE', status: 'OPERANDO' })
    expect(early.pwm).toBeGreaterThan(0)
    expect(early.pwm).toBeLessThan(defaultConfig.targetPwm)

    const steady = run(on, 6)
    expect(readout(steady).pwm).toBe(defaultConfig.targetPwm)
  })

  it('ao desligar, desacelera e volta a IDLE / 0% / AGUARDANDO', () => {
    const running = run(setSensor(createInitialState(), true), 6)
    const off = setSensor(running, false)
    const stopping = step(off, 0.08)
    expect(readout(stopping)).toMatchObject({ motor: 'STOPPING', status: 'DESACELERANDO' })
    const stopped = run(off, 6)
    expect(readout(stopped)).toMatchObject({ motor: 'IDLE', pwm: 0, status: 'AGUARDANDO' })
  })

  it('mantém o histórico com tamanho fixo e registra o sinal digital', () => {
    const s = run(setSensor(createInitialState(), true), 10)
    expect(s.history).toHaveLength(defaultConfig.historySize)
    expect(s.history.at(-1)?.sensor).toBe(1)
  })

  it('settle leva direto ao valor final (movimento reduzido)', () => {
    const s = settle(setSensor(createInitialState(), true))
    expect(s.pwm).toBe(defaultConfig.targetPwm)
    expect(s.history.every((h) => h.pwm === defaultConfig.targetPwm)).toBe(true)
  })

  it('toPolyline mapeia valores para o viewBox', () => {
    expect(toPolyline([0, 100], { width: 300, height: 80, max: 100, padding: 0 })).toBe(
      '0.0,80.0 300.0,0.0',
    )
    expect(toPolyline([], { width: 300, height: 80, max: 100 })).toBe('')
  })
})
