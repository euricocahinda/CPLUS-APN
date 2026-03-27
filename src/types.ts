export type ConnectionStatus = 'disconnected' | 'connecting' | 'connected' | 'error';

export interface Server {
  id: string;
  name: string;
  country: string;
  flag: string;
  latency: number;
  load: number;
  ip: string;
}

export interface Payload {
  id: string;
  name: string;
  network: 'Unitel' | 'Movicel' | 'Generic';
  content: string;
  description: string;
}
