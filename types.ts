
export interface Student {
  id: string;
  name: string;
  registrationNumber: number;
  groupId: number | null;
  timestamp: number;
}

export interface Group {
  id: number;
  students: Student[];
}

export enum AppState {
  LOCKED = 'LOCKED',
  DASHBOARD = 'DASHBOARD',
  REGISTRATION = 'REGISTRATION'
}

export interface SystemConfig {
  expectedStudents: number;
  targetGroupSize: number;
  activeGroups: number;
}
