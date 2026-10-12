export interface Chapter {
  id: string;
  number: number;
  title: string;
  subtitle: string;
  animeTheme: {
    emoji: string;
    character: string;
    gradient: string;
    badge: string;
  };
  kidExplanation: {
    story: string;
    analogy: string;
    keyTakeaway: string;
  };
  anatomyElements: {
    name: string;
    role: string;
    kidDescription: string;
    codeExample: string;
  }[];
  problemsAndSolutions: {
    problemName: string;
    dangerLevel: 'Moyen' | 'Critique' | 'Catastrophique';
    symptom: string;
    whyItHappens: string;
    solution: string;
    correctCode: string;
  }[];
  engineeringGuide?: {
    overview: string;
    criticalQuestions: {
      question: string;
      whyItMatters: string;
      rookieMistake: string;
      seniorDecision: string;
    }[];
    umlToCodeSteps: {
      umlConcept: string;
      jpaAnnotation: string;
      codeSnippet: string;
      engineeringRule: string;
    }[];
    architectureChecklist: string[];
  };
  schema: {
    title: string;
    type: 'lifecycle' | 'relation' | 'cache' | 'inheritance' | 'locking';
    description: string;
  };
}

export interface CriticalQuestion {
  id: string;
  category: 'Relations' | 'Transactions' | 'Performance' | 'Héritage' | 'Concurrence';
  question: string;
  childExplanation: string;
  seniorExplanation: string;
  trapToAvoid: string;
  solutionRule: string;
}

export interface UmlToJpaPattern {
  umlElement: string;
  umlSymbol: string;
  jpaMapping: string;
  exampleJava: string;
  exampleSql: string;
  goldenRule: string;
  keyQuestion: string;
}


export interface QuizQuestion {
  id: string;
  chapterId: string;
  labTitle: string;
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
  proTip: string;
}

export interface CodeFillGame {
  id: string;
  title: string;
  difficulty: 'Facile' | 'Moyen' | 'Expert';
  description: string;
  templateCode: string; // contains {{BLANK}}
  choices: string[];
  correctAnswer: string;
  explanation: string;
}

export interface BugHunterGame {
  id: string;
  title: string;
  scenario: string;
  buggyCode: string;
  question: string;
  options: {
    text: string;
    isBug: boolean;
    explanation: string;
  }[];
}

export interface LifecycleStep {
  id: string;
  title: string;
  description: string;
  state: 'NEW / TRANSIENT' | 'MANAGED' | 'DETACHED' | 'REMOVED';
  order: number;
}

export interface InterviewQuestion {
  id: string;
  companyTarget: 'Oracle Maroc' | 'Capgemini' | 'CGI' | 'Atos / Eviden' | 'DXC Technology' | 'Société Générale Africa Tech' | 'SQLI' | 'Général';
  level: 'Junior (0-2 ans)' | 'Confirmé (2-5 ans)' | 'Senior / Lead Tech (5+ ans)';
  topic: 'Hibernate / JPA Interne' | 'Spring Boot & Architecture' | 'Concurrence & Transactions' | 'Performance & SQL Tuning' | 'System Design & DDD';
  question: string;
  childIntuition: string; // Explication intuitive imagée
  seniorTechnicalAnswer: string; // Réponse technique attendue par le recruteur
  codeExample?: string;
  examinerTrap: string; // Ce que l'examinateur cherche à tester ou le piège vicieux
  salaryImpactProTip: string; // Conseil pour négocier et briller en entretien
}

export interface MoroccanTechCompany {
  name: string;
  locations: string[]; // ex: Casablanca Nearshore, Rabat Technopolis
  profilesSought: string[];
  averageSalaryJunior: string;
  averageSalarySenior: string;
  interviewStages: string[];
  keyHiringTechnologies: string[];
  insiderTips: string;
}

export interface CourseLecture {
  id: string;
  number: number;
  title: string;
  duration: string;
  summary: string;
  coreConcepts: {
    title: string;
    description: string;
    codeSnippet?: string;
  }[];
  comparativeTable?: {
    dimension: string;
    col1: string;
    col2: string;
  }[];
  proPractices: string[];
}

