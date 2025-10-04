export interface Invoice {
  id: string;
  client: string;
  case: string;
  amount: number;
  date: string;
  dueDate: string;
  status: InvoiceStatus;
  description: string;
  hoursWorked: number;
  hourlyRate: number;
  items?: InvoiceItem[];
}

export interface InvoiceItem {
  description: string;
  hours: number;
  rate: number;
  amount: number;
}

export type InvoiceStatus = 'paid' | 'overdue' | 'sent' | 'pending-approval' | 'draft';

export interface TimeEntry {
  id: string;
  date: string;
  client: string;
  case: string;
  description: string;
  hours: number;
  rate: number;
  amount: number;
  billable: boolean;
  timekeeper: string;
  classification?: TimeClassification;
  timerId?: string;
  startTime?: string;
  endTime?: string;
}

export interface TimeClassification {
  category: string;
  subcategory?: string;
  billable: boolean;
}

export interface TimerState {
  id: string;
  client: string;
  case: string;
  description: string;
  classification: TimeClassification;
  startTime: number;
  isRunning: boolean;
  elapsedTime: number;
}
