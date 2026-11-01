// Hypertension risk calculation engine
// Educational scoring model inspired by WHO / AHA guidelines
// NOT for medical diagnosis

export interface HypertensionInput {
  age: number;
  gender: "male" | "female";
  bmi: number;
  systolic: number;
  diastolic: number;
  heartRate: number;
  familyHistory: boolean;
  smoking: "none" | "former" | "current";
  physicalActivity: "low" | "moderate" | "high";
  salt: "low" | "medium" | "high";
  stress: "low" | "medium" | "high";
  sleep: number;
  diabetes: boolean;
  thyroid: boolean;
}

export type RiskLevel = "low" | "moderate" | "high" | "veryHigh";

export interface RiskFactor {
  key: string;
  ar: string;
  fr: string;
  contribution: number; // points contributed
}

export interface RiskResult {
  score: number; // 0-100
  level: RiskLevel;
  probability: number; // 0-1
  topFactors: RiskFactor[];
}

const AGE_RANGES: Array<[number, number, number]> = [
  [18, 30, 0],
  [31, 40, 5],
  [41, 50, 12],
  [51, 60, 20],
  [61, 70, 28],
  [71, 200, 35],
];

const BMI_RANGES: Array<[number, number, number]> = [
  [0, 18.5, 4],   // underweight
  [18.5, 25, 0],  // normal
  [25, 30, 8],    // overweight
  [30, 35, 14],   // obese I
  [35, 100, 20],  // obese II+
];

// Systolic BP scoring (mmHg)
const SYSTOLIC_RANGES: Array<[number, number, number]> = [
  [0, 110, 0],
  [110, 120, 2],
  [120, 130, 6],
  [130, 140, 14],
  [140, 160, 22],
  [160, 180, 30],
  [180, 300, 38],
];

const DIASTOLIC_RANGES: Array<[number, number, number]> = [
  [0, 70, 0],
  [70, 80, 2],
  [80, 90, 6],
  [90, 100, 12],
  [100, 110, 18],
  [110, 300, 24],
];

const HEART_RATE_RANGES: Array<[number, number, number]> = [
  [0, 60, 2],
  [60, 80, 0],
  [80, 90, 4],
  [90, 100, 8],
  [100, 300, 12],
];

const SLEEP_RANGES: Array<[number, number, number]> = [
  [0, 5, 8],
  [5, 6, 4],
  [6, 9, 0],
  [9, 24, 4],
];

function rangeLookup(value: number, ranges: Array<[number, number, number]>): number {
  for (const [min, max, score] of ranges) {
    if (value >= min && value < max) return score;
  }
  // last range inclusive of max
  const last = ranges[ranges.length - 1];
  if (value >= last[0]) return last[2];
  return 0;
}

export function calculateHypertensionRisk(input: HypertensionInput): RiskResult {
  const factors: RiskFactor[] = [];

  // 1) Age
  const ageScore = rangeLookup(input.age, AGE_RANGES);
  factors.push({
    key: "age",
    ar: `العمر (${input.age} سنة)`,
    fr: `Âge (${input.age} ans)`,
    contribution: ageScore,
  });

  // 2) Gender (men slightly higher baseline risk before 55, women after menopause)
  const genderScore = input.gender === "male" && input.age >= 45 ? 3 : input.gender === "female" && input.age >= 55 ? 2 : 0;
  if (genderScore > 0) {
    factors.push({
      key: "gender",
      ar: "الجنس والعمر",
      fr: "Sexe et âge",
      contribution: genderScore,
    });
  }

  // 3) BMI
  const bmiScore = rangeLookup(input.bmi, BMI_RANGES);
  if (bmiScore > 0) {
    factors.push({
      key: "bmi",
      ar: `مؤشر كتلة الجسم (${input.bmi.toFixed(1)})`,
      fr: `IMC (${input.bmi.toFixed(1)})`,
      contribution: bmiScore,
    });
  }

  // 4) Systolic BP (the strongest single predictor)
  const sysScore = rangeLookup(input.systolic, SYSTOLIC_RANGES);
  factors.push({
    key: "systolic",
    ar: `الضغط الانقباضي (${input.systolic} mmHg)`,
    fr: `Pression systolique (${input.systolic} mmHg)`,
    contribution: sysScore,
  });

  // 5) Diastolic BP
  const diaScore = rangeLookup(input.diastolic, DIASTOLIC_RANGES);
  factors.push({
    key: "diastolic",
    ar: `الضغط الانبساطي (${input.diastolic} mmHg)`,
    fr: `Pression diastolique (${input.diastolic} mmHg)`,
    contribution: diaScore,
  });

  // 6) Heart rate
  const hrScore = rangeLookup(input.heartRate, HEART_RATE_RANGES);
  if (hrScore > 0) {
    factors.push({
      key: "heartRate",
      ar: `معدل ضربات القلب (${input.heartRate} نبضة/د)`,
      fr: `Fréquence cardiaque (${input.heartRate} bpm)`,
      contribution: hrScore,
    });
  }

  // 7) Family history
  if (input.familyHistory) {
    factors.push({
      key: "family",
      ar: "تاريخ عائلي للإصابة",
      fr: "Antécédents familiaux",
      contribution: 10,
    });
  }

  // 8) Smoking
  const smokingScore = input.smoking === "current" ? 12 : input.smoking === "former" ? 5 : 0;
  if (smokingScore > 0) {
    factors.push({
      key: "smoking",
      ar: input.smoking === "current" ? "تدخين حالي" : "تدخين سابق",
      fr: input.smoking === "current" ? "Fumeur actuel" : "Ancien fumeur",
      contribution: smokingScore,
    });
  }

  // 9) Physical activity (protective: negative score)
  const activityScore = input.physicalActivity === "low" ? 8 : input.physicalActivity === "moderate" ? 2 : -4;
  factors.push({
    key: "activity",
    ar: input.physicalActivity === "low" ? "نشاط بدني منخفض" : input.physicalActivity === "moderate" ? "نشاط متوسط" : "نشاط منتظم (واقي)",
    fr: input.physicalActivity === "low" ? "Activité physique faible" : input.physicalActivity === "moderate" ? "Activité modérée" : "Activité régulière (protecteur)",
    contribution: activityScore,
  });

  // 10) Salt intake
  const saltScore = input.salt === "high" ? 12 : input.salt === "medium" ? 5 : 0;
  if (saltScore > 0) {
    factors.push({
      key: "salt",
      ar: input.salt === "high" ? "استهلاك ملح مرتفع" : "استهلاك ملح متوسط",
      fr: input.salt === "high" ? "Consommation de sel élevée" : "Consommation de sel moyenne",
      contribution: saltScore,
    });
  }

  // 11) Stress
  const stressScore = input.stress === "high" ? 8 : input.stress === "medium" ? 4 : 0;
  if (stressScore > 0) {
    factors.push({
      key: "stress",
      ar: input.stress === "high" ? "توتر مرتفع" : "توتر متوسط",
      fr: input.stress === "high" ? "Stress élevé" : "Stress moyen",
      contribution: stressScore,
    });
  }

  // 12) Sleep
  const sleepScore = rangeLookup(input.sleep, SLEEP_RANGES);
  if (sleepScore > 0) {
    factors.push({
      key: "sleep",
      ar: `ساعات نوم (${input.sleep} ساعة)`,
      fr: `Heures de sommeil (${input.sleep} h)`,
      contribution: sleepScore,
    });
  }

  // 13) Comorbidities
  if (input.diabetes) {
    factors.push({
      key: "diabetes",
      ar: "سكري مرافق",
      fr: "Diabète associé",
      contribution: 12,
    });
  }
  if (input.thyroid) {
    factors.push({
      key: "thyroid",
      ar: "مرض غدة مرافق",
      fr: "Maladie thyroïdienne associée",
      contribution: 6,
    });
  }

  // Sum, clamp to [0, 100]
  const raw = factors.reduce((sum, f) => sum + f.contribution, 0);
  const score = Math.max(0, Math.min(100, raw));

  // Map to risk level
  let level: RiskLevel;
  if (score < 20) level = "low";
  else if (score < 45) level = "moderate";
  else if (score < 70) level = "high";
  else level = "veryHigh";

  // Probability estimation (educational sigmoid)
  const probability = 1 / (1 + Math.exp(-(score - 50) / 10));

  // Top 5 contributing factors
  const topFactors = [...factors]
    .filter((f) => f.contribution > 0)
    .sort((a, b) => b.contribution - a.contribution)
    .slice(0, 5);

  return { score, level, probability, topFactors };
}
