export interface Alarm {
  id: string;
  type: 'datetime' | 'daily';
  targetTime: string; // ISO string for datetime, HH:mm for daily
  webhookUrl?: string;
  label?: string;
  triggered: boolean;
}

export interface TimeState {
  now: Date;
  seconds: number;
  minutes: number;
  hours: number;
}