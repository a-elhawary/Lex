import { Case, Client, Appointment, Invoice } from '@/types/billing';

const OPENROUTER_API_KEY = process.env.NEXT_PUBLIC_OPENROUTER_API_KEY;
const REPLICATE_API_TOKEN = process.env.NEXT_PUBLIC_REPLICATE_API_TOKEN;

interface AIInsight {
  type: 'prediction' | 'recommendation' | 'alert' | 'summary';
  title: string;
  description: string;
  confidence: number;
  action?: string;
  priority: 'low' | 'medium' | 'high';
}

interface CasePrediction {
  caseId: string;
  successProbability: number;
  estimatedDuration: number;
  riskFactors: string[];
  recommendedActions: string[];
}

interface WorkloadInsight {
  optimalDistribution: {
    [lawyerId: string]: number;
  };
  bottleneckAlerts: string[];
  efficiencyScore: number;
}

export class AIService {
  private static async callOpenRouter(messages: any[]) {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'anthropic/claude-sonnet-4',
        messages,
        max_tokens: 1000,
      }),
    });
    
    if (!response.ok) {
      throw new Error('AI service error');
    }
    
    return response.json();
  }

  static async generateCaseInsights(cases: Case[]): Promise<CasePrediction[]> {
    const caseData = cases.map(c => ({
      id: c.id,
      type: c.type,
      status: c.status,
      client: c.clientName,
      value: c.value,
      duration: c.duration,
    }));

    const messages = [
      {
        role: 'system',
        content: 'You are a legal analytics expert. Analyze case data and provide predictions with confidence scores.'
      },
      {
        role: 'user',
        content: `Analyze these cases and provide success predictions: ${JSON.stringify(caseData)}`
      }
    ];

    const response = await this.callOpenRouter(messages);
    const insights = JSON.parse(response.choices[0].message.content);
    
    return insights.map((insight: any) => ({
      caseId: insight.caseId,
      successProbability: insight.successProbability,
      estimatedDuration: insight.estimatedDuration,
      riskFactors: insight.riskFactors || [],
      recommendedActions: insight.recommendedActions || [],
    }));
  }

  static async generateWorkloadInsights(
    cases: Case[],
    appointments: Appointment[],
    lawyers: any[]
  ): Promise<WorkloadInsight> {
    const workloadData = {
      activeCases: cases.filter(c => c.status === 'active').length,
      upcomingAppointments: appointments.filter(a => new Date(a.date) > new Date()).length,
      lawyerCount: lawyers.length,
      caseTypes: cases.reduce((acc, c) => {
        acc[c.type] = (acc[c.type] || 0) + 1;
        return acc;
      }, {} as Record<string, number>)
    };

    const messages = [
      {
        role: 'system',
        content: 'You are a legal operations expert. Analyze workload distribution and provide optimization recommendations.'
      },
      {
        role: 'user',
        content: `Optimize this workload: ${JSON.stringify(workloadData)}`
      }
    ];

    const response = await this.callOpenRouter(messages);
    return JSON.parse(response.choices[0].message.content);
  }

  static async generateRevenueForecast(
    cases: Case[],
    invoices: Invoice[]
  ): Promise<{
    nextMonth: number;
    nextQuarter: number;
    riskFactors: string[];
    opportunities: string[];
  }> {
    const financialData = {
      activeCases: cases.filter(c => c.status === 'active').map(c => ({
        value: c.value,
        probability: c.successProbability || 0.8,
        expectedCloseDate: c.expectedCloseDate
      })),
      outstandingInvoices: invoices.filter(i => i.status === 'pending').reduce((sum, i) => sum + i.amount, 0)
    };

    const messages = [
      {
        role: 'system',
        content: 'You are a financial analyst specializing in legal services. Provide revenue forecasts based on case data.'
      },
      {
        role: 'user',
        content: `Forecast revenue: ${JSON.stringify(financialData)}`
      }
    ];

    const response = await this.callOpenRouter(messages);
    return JSON.parse(response.choices[0].message.content);
  }

  static async getDailyInsights(
    cases: Case[],
    clients: Client[],
    appointments: Appointment[]
  ): Promise<AIInsight[]> {
    const dailyData = {
      newCases: cases.filter(c => {
        const created = new Date(c.createdAt);
        const today = new Date();
        return created.toDateString() === today.toDateString();
      }).length,
      upcomingDeadlines: cases.filter(c => {
        const deadline = new Date(c.deadline || '');
        const daysUntil = Math.ceil((deadline.getTime() - Date.now()) / (1000 * 60 * 60 * 24));
        return daysUntil <= 7 && daysUntil >= 0;
      }).length,
      clientMeetings: appointments.filter(a => {
        const apptDate = new Date(a.date);
        const today = new Date();
        return apptDate.toDateString() === today.toDateString();
      }).length
    };

    const messages = [
      {
        role: 'system',
        content: 'You are a legal practice management expert. Provide actionable daily insights for law firm operations.'
      },
      {
        role: 'user',
        content: `Generate daily insights: ${JSON.stringify(dailyData)}`
      }
    ];

    const response = await this.callOpenRouter(messages);
    return JSON.parse(response.choices[0].message.content);
  }
}
