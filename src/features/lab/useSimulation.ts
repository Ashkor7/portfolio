import { useCallback, useEffect, useState } from 'react'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import {
  createInitialState,
  defaultConfig,
  readout,
  setSensor,
  settle,
  step,
  targetPwm,
  type SimConfig,
} from './simulation'

const TICK_MS = 80

/**
 * Liga a simulação pura ao React.
 * O laço só roda enquanto a seção está visível, há algo mudando e o visitante
 * não pediu movimento reduzido (nesse caso, os valores saltam direto ao final).
 */
export function useSimulation(active: boolean, config: SimConfig = defaultConfig) {
  const reduced = useReducedMotion()
  const [state, setState] = useState(() => createInitialState(config))

  const settled =
    state.pwm === targetPwm(state, config) &&
    state.history.every((s) => s.pwm === state.pwm && s.sensor === (state.sensor ? 1 : 0))
  // Em regime permanente o gráfico ficaria plano: não há por que continuar o laço.
  const running = active && !reduced && !settled

  useEffect(() => {
    if (!running) return
    const id = window.setInterval(() => setState((s) => step(s, TICK_MS / 1000, config)), TICK_MS)
    return () => window.clearInterval(id)
  }, [running, config])

  const toggle = useCallback(() => {
    setState((s) => {
      const next = setSensor(s, !s.sensor)
      return reduced ? settle(next, config) : next
    })
  }, [reduced, config])

  const reset = useCallback(() => setState(createInitialState(config)), [config])

  return { state, readout: readout(state), toggle, reset, config }
}
