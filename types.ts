
export type SuperconductorType = 'Type I' | 'Type II' | 'High-Temperature' | 'Unconventional' | 'Unknown';

export interface SuperconductorData {
  name: string;
  type: SuperconductorType;
  description: string;
  criticalTemperatureKelvin: number | null;
  criticalTemperatureCelsius: number | null;
  applications: string[];
  crystalStructure: string | null;
  discoveredBy: string | null;
  yearOfDiscovery: number | null;
}
