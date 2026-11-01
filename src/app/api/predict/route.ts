import { NextRequest, NextResponse } from "next/server";
import { calculateHypertensionRisk, HypertensionInput } from "@/lib/hypertension";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json() as Partial<HypertensionInput>;

    // Basic validation
    const required = ["age", "gender", "bmi", "systolic", "diastolic", "heartRate", "smoking", "physicalActivity", "salt", "stress", "sleep"];
    for (const k of required) {
      if (body[k as keyof HypertensionInput] === undefined || body[k as keyof HypertensionInput] === null) {
        return NextResponse.json({ error: "Missing field: " + k }, { status: 400 });
      }
    }

    const input: HypertensionInput = {
      age: Number(body.age),
      gender: body.gender === "female" ? "female" : "male",
      bmi: Number(body.bmi),
      systolic: Number(body.systolic),
      diastolic: Number(body.diastolic),
      heartRate: Number(body.heartRate),
      familyHistory: Boolean(body.familyHistory),
      smoking: (body.smoking as HypertensionInput["smoking"]) ?? "none",
      physicalActivity: (body.physicalActivity as HypertensionInput["physicalActivity"]) ?? "low",
      salt: (body.salt as HypertensionInput["salt"]) ?? "medium",
      stress: (body.stress as HypertensionInput["stress"]) ?? "medium",
      sleep: Number(body.sleep),
      diabetes: Boolean(body.diabetes),
      thyroid: Boolean(body.thyroid),
    };

    // Range sanity checks
    if (input.age < 14 || input.age > 120) return NextResponse.json({ error: "Age out of range" }, { status: 400 });
    if (input.bmi < 10 || input.bmi > 80) return NextResponse.json({ error: "BMI out of range" }, { status: 400 });
    if (input.systolic < 60 || input.systolic > 300) return NextResponse.json({ error: "Systolic out of range" }, { status: 400 });
    if (input.diastolic < 40 || input.diastolic > 200) return NextResponse.json({ error: "Diastolic out of range" }, { status: 400 });
    if (input.heartRate < 30 || input.heartRate > 250) return NextResponse.json({ error: "Heart rate out of range" }, { status: 400 });
    if (input.sleep < 0 || input.sleep > 24) return NextResponse.json({ error: "Sleep out of range" }, { status: 400 });

    const result = calculateHypertensionRisk(input);

    return NextResponse.json({
      ok: true,
      input,
      result,
      educationalNotice: "Educational use only. Not a medical diagnosis.",
    });
  } catch (e) {
    return NextResponse.json({ error: "Invalid request: " + (e as Error).message }, { status: 400 });
  }
}

export async function GET() {
  return NextResponse.json({
    endpoint: "POST /api/predict",
    description: "Hypertension risk prediction (educational model)",
    fields: [
      "age (14-120)", "gender (male|female)", "bmi (10-80)",
      "systolic (60-300)", "diastolic (40-200)", "heartRate (30-250)",
      "familyHistory (bool)", "smoking (none|former|current)",
      "physicalActivity (low|moderate|high)", "salt (low|medium|high)",
      "stress (low|medium|high)", "sleep (0-24)",
      "diabetes (bool)", "thyroid (bool)",
    ],
  });
}
