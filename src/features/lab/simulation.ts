/**
 * Simulação ILUSTRATIVA de um acionamento sensor → MCU → controle → atuador.
 *
 * Não é um modelo físico validado: a resposta do PWM usa uma aproximação de
 * primeira ordem (exponencial) apenas para tornar a transição visível.
 * Toda a lógica é pura (sem React/DOM) para facilitar testes e expansões
 * futuras (ex.: PID, novos sensores, telemetria real).
 */

export interface SimConfig {
  /** Duty cycle aplicado ao motor quando o sensor detecta presença (%). */
  targetPwm: number
  /** Constante de tempo na aceleração (s). */
  riseTau: number
  /** Constante de tempo na desaceleração (s). */
  fallTau: number
  /** Quantidade de amostras mantidas no gráfico. */
  historySize: number
}

export const defaultConfig: SimConfig = {
  targetPwm: 78,
  riseTau: 0.6,
  fallTau: 0.35,
  historySize: 60,
}

export interface Sample {
  /** Sinal digital do sensor (0 ou 1). */
  sensor: 0 | 1
  /** PWM aplicado (0–100). */
  pwm: number
}

export interface SimState {
  sensor: boolean
  pwm: number
  /** Tempo simulado acumulado (s). */
  time: number
  history: Sample[]
}

export type MotorState = 'IDLE' | 'ACTIVE' | 'STOPPING'
export type SystemStatus = 'AGUARDANDO' | 'OPERANDO' | 'DESACELERANDO'

export interface Readout {
  sensorLabel: 'ON' | 'OFF'
  motor: MotorState
  pwm: number
  status: SystemStatus
  /** Blocos do diagrama que estão transmitindo sinal. */
  activeBlocks: { sensor: boolean; mcu: boolean; control: boolean; actuator: boolean }
}

/** Diferença abaixo da qual o PWM "encosta" no alvo (evita cauda infinita). */
const SNAP = 0.5

export function createInitialState(config: SimConfig = defaultConfig): SimState {
  return {
    sensor: false,
    pwm: 0,
    time: 0,
    history: Array.from({ length: config.historySize }, () => ({ sensor: 0, pwm: 0 })),
  }
}

export function targetPwm(state: Pick<SimState, 'sensor'>, config: SimConfig = defaultConfig) {
  return state.sensor ? config.targetPwm : 0
}

export function setSensor(state: SimState, sensor: boolean): SimState {
  return { ...state, sensor }
}

/** Avança a simulação em `dt` segundos e registra uma amostra no histórico. */
export function step(state: SimState, dt: number, config: SimConfig = defaultConfig): SimState {
  const target = targetPwm(state, config)
  const tau = state.sensor ? config.riseTau : config.fallTau
  let pwm = state.pwm + (target - state.pwm) * (1 - Math.exp(-dt / tau))
  if (Math.abs(target - pwm) < SNAP) pwm = target

  const history = [...state.history, { sensor: state.sensor ? 1 : 0, pwm } satisfies Sample]
  if (history.length > config.historySize) history.splice(0, history.length - config.historySize)

  return { ...state, pwm, time: state.time + dt, history }
}

/** Leva o PWM direto ao valor final (usado com prefers-reduced-motion). */
export function settle(state: SimState, config: SimConfig = defaultConfig): SimState {
  const pwm = targetPwm(state, config)
  const history = state.history.map(() => ({ sensor: state.sensor ? 1 : 0, pwm }) as Sample)
  return { ...state, pwm, history }
}

export function readout(state: SimState): Readout {
  const running = state.pwm > 0
  const motor: MotorState = state.sensor ? 'ACTIVE' : running ? 'STOPPING' : 'IDLE'
  const status: SystemStatus = state.sensor ? 'OPERANDO' : running ? 'DESACELERANDO' : 'AGUARDANDO'
  return {
    sensorLabel: state.sensor ? 'ON' : 'OFF',
    motor,
    pwm: Math.round(state.pwm),
    status,
    activeBlocks: {
      sensor: state.sensor,
      mcu: state.sensor || running,
      control: state.sensor || running,
      actuator: running,
    },
  }
}

/** Converte o histórico em pontos de polyline num viewBox width × height. */
export function toPolyline(
  values: number[],
  {
    width,
    height,
    max,
    padding = 6,
  }: { width: number; height: number; max: number; padding?: number },
): string {
  if (values.length === 0) return ''
  const stepX = values.length > 1 ? width / (values.length - 1) : 0
  const usable = height - padding * 2
  return values
    .map((v, i) => {
      const y = height - padding - (Math.min(Math.max(v, 0), max) / max) * usable
      return `${(i * stepX).toFixed(1)},${y.toFixed(1)}`
    })
    .join(' ')
}
