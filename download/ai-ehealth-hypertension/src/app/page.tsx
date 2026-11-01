"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Activity,
  AlertTriangle,
  Calculator,
  Heart,
  HeartPulse,
  Info,
  Languages,
  RotateCcw,
  ShieldCheck,
  Stethoscope,
  Users,
  Github,
} from "lucide-react";
import { translations, type Locale } from "@/lib/i18n";
import type { RiskResult, RiskLevel } from "@/lib/hypertension";

interface ApiResponse {
  ok: boolean;
  result: RiskResult;
  error?: string;
}

export default function Home() {
  const [locale, setLocale] = useState<Locale>("ar");
  const t = translations[locale];
  const dir = t.dir;

  // form state
  const [form, setForm] = useState({
    age: "35",
    gender: "male" as "male" | "female",
    bmi: "25",
    systolic: "125",
    diastolic: "80",
    heartRate: "75",
    familyHistory: false,
    smoking: "none" as "none" | "former" | "current",
    physicalActivity: "moderate" as "low" | "moderate" | "high",
    salt: "medium" as "low" | "medium" | "high",
    stress: "medium" as "low" | "medium" | "high",
    sleep: "7",
    diabetes: false,
    thyroid: false,
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<RiskResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const toggleLocale = () => setLocale(locale === "ar" ? "fr" : "ar");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          age: Number(form.age),
          bmi: Number(form.bmi),
          systolic: Number(form.systolic),
          diastolic: Number(form.diastolic),
          heartRate: Number(form.heartRate),
          sleep: Number(form.sleep),
        }),
      });
      const data: ApiResponse = await res.json();
      if (!res.ok || !data.ok) {
        setError(data.error || t.errors.required);
      } else {
        setResult(data.result);
        setTimeout(() => {
          document.getElementById("result-section")?.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    } catch {
      setError(t.errors.required);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setResult(null);
    setError(null);
    document.getElementById("calculator")?.scrollIntoView({ behavior: "smooth" });
  };

  const setField = <K extends keyof typeof form>(k: K, v: (typeof form)[K]) =>
    setForm((p) => ({ ...p, [k]: v }));

  const levelColor: Record<RiskLevel, string> = {
    low: "risk-low",
    moderate: "risk-moderate",
    high: "risk-high",
    veryHigh: "risk-veryHigh",
  };
  const levelBar: Record<RiskLevel, string> = {
    low: "bar-low",
    moderate: "bar-moderate",
    high: "bar-high",
    veryHigh: "bar-veryHigh",
  };
  const levelLabel: Record<RiskLevel, string> = {
    low: t.result.low,
    moderate: t.result.moderate,
    high: t.result.high,
    veryHigh: t.result.veryHigh,
  };
  const recommendations: Record<RiskLevel, string[]> = {
    low: t.result.recommendationsLow,
    moderate: t.result.recommendationsModerate,
    high: t.result.recommendationsHigh,
    veryHigh: t.result.recommendationsVeryHigh,
  };

  return (
    <div dir={dir} className="flex flex-col min-h-screen">
      {/* ===== Header ===== */}
      <header className="sticky top-0 z-40 backdrop-blur-md bg-background/80 border-b">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-red-500/10 flex items-center justify-center">
              <HeartPulse className="w-5 h-5 text-red-600" />
            </div>
            <div className="leading-tight">
              <div className="font-bold text-sm sm:text-base">AI E-Health</div>
              <div className="text-[10px] sm:text-xs text-muted-foreground">
                {locale === "ar" ? "وحدة ضغط الدم" : "Module Hypertension"}
              </div>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-6 text-sm">
            <a href="#home" className="hover:text-red-600 transition">{t.nav.home}</a>
            <a href="#calculator" className="hover:text-red-600 transition">{t.nav.calculator}</a>
            <a href="#about" className="hover:text-red-600 transition">{t.nav.about}</a>
          </nav>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={toggleLocale}
              className="gap-1.5"
              aria-label="Switch language"
            >
              <Languages className="w-4 h-4" />
              {t.toggleTo}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              asChild
              className="hidden sm:flex"
              aria-label="GitHub"
            >
              <a href="https://github.com" target="_blank" rel="noreferrer">
                <Github className="w-4 h-4" />
              </a>
            </Button>
          </div>
        </div>
      </header>

      {/* ===== Hero ===== */}
      <section id="home" className="bg-gradient-hero border-b">
        <div className="max-w-6xl mx-auto px-4 py-16 md:py-24 grid md:grid-cols-2 gap-8 items-center">
          <div className="animate-fade-up">
            <Badge variant="outline" className="mb-4 border-red-200 bg-red-50 text-red-700">
              <Stethoscope className="w-3 h-3 mr-1" />
              {t.hero.tag}
            </Badge>
            <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-4">
              {t.hero.title}
            </h1>
            <p className="text-muted-foreground text-base md:text-lg mb-6 leading-relaxed">
              {t.hero.desc}
            </p>
            <div className="flex flex-wrap gap-3">
              <Button asChild size="lg" className="bg-red-600 hover:bg-red-700 text-white">
                <a href="#calculator">
                  <Calculator className="w-4 h-4 mr-2" />
                  {t.hero.cta}
                </a>
              </Button>
              <Button asChild size="lg" variant="outline">
                <a href="#about">
                  <Info className="w-4 h-4 mr-2" />
                  {t.hero.learnMore}
                </a>
              </Button>
            </div>

            <div className="mt-6 flex items-center gap-2 text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-lg p-3">
              <AlertTriangle className="w-4 h-4 flex-shrink-0" />
              <span>{t.site.badge}</span>
            </div>
          </div>

          {/* Hero illustration card */}
          <div className="relative">
            <Card className="lift overflow-hidden border-red-100">
              <div className="bg-mesh h-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-red-700">
                    <Heart className="w-5 h-5" />
                    {locale === "ar" ? "لماذا ضغط الدم؟" : "Pourquoi l'hypertension ?"}
                  </CardTitle>
                  <CardDescription>{t.features.desc}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {t.features.items.map((item, i) => (
                    <div key={i} className="flex gap-3 items-start">
                      <div className="w-7 h-7 rounded-lg bg-red-100 text-red-700 flex items-center justify-center text-xs font-bold flex-shrink-0">
                        {i + 1}
                      </div>
                      <div>
                        <div className="font-semibold text-sm">{item.title}</div>
                        <div className="text-xs text-muted-foreground">{item.desc}</div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* ===== Calculator Form ===== */}
      <section id="calculator" className="py-16 bg-background">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-8">
            <Badge variant="secondary" className="mb-3">
              <Calculator className="w-3 h-3 mr-1" />
              {t.nav.calculator}
            </Badge>
            <h2 className="text-2xl md:text-3xl font-bold mb-2">{t.form.title}</h2>
            <p className="text-muted-foreground text-sm">{t.form.subtitle}</p>
          </div>

          <form onSubmit={handleSubmit}>
            <Card className="shadow-sm">
              <CardContent className="p-6 space-y-8">
                {/* Personal info */}
                <div>
                  <h3 className="font-semibold mb-4 flex items-center gap-2 text-red-700">
                    <Users className="w-4 h-4" />
                    {t.form.personal}
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="age" className="mb-1.5 block">
                        {t.form.age}
                      </Label>
                      <Input
                        id="age"
                        type="number"
                        min={14}
                        max={120}
                        value={form.age}
                        onChange={(e) => setField("age", e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label className="mb-1.5 block">{t.form.gender}</Label>
                      <RadioGroup
                        value={form.gender}
                        onValueChange={(v) => setField("gender", v as "male" | "female")}
                        className="flex gap-4"
                      >
                        <div className="flex items-center gap-2">
                          <RadioGroupItem id="g-m" value="male" />
                          <Label htmlFor="g-m">{t.form.male}</Label>
                        </div>
                        <div className="flex items-center gap-2">
                          <RadioGroupItem id="g-f" value="female" />
                          <Label htmlFor="g-f">{t.form.female}</Label>
                        </div>
                      </RadioGroup>
                    </div>
                    <div>
                      <Label htmlFor="bmi" className="mb-1.5 block">
                        {t.form.bmi}
                      </Label>
                      <Input
                        id="bmi"
                        type="number"
                        step="0.1"
                        min={10}
                        max={80}
                        value={form.bmi}
                        onChange={(e) => setField("bmi", e.target.value)}
                        required
                      />
                      <p className="text-[11px] text-muted-foreground mt-1">{t.form.bmiHint}</p>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Clinical */}
                <div>
                  <h3 className="font-semibold mb-4 flex items-center gap-2 text-red-700">
                    <HeartPulse className="w-4 h-4" />
                    {t.form.clinical}
                  </h3>
                  <div className="grid sm:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="sys" className="mb-1.5 block">{t.form.systolic}</Label>
                      <Input
                        id="sys"
                        type="number"
                        min={60}
                        max={300}
                        value={form.systolic}
                        onChange={(e) => setField("systolic", e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="dia" className="mb-1.5 block">{t.form.diastolic}</Label>
                      <Input
                        id="dia"
                        type="number"
                        min={40}
                        max={200}
                        value={form.diastolic}
                        onChange={(e) => setField("diastolic", e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="hr" className="mb-1.5 block">{t.form.heartRate}</Label>
                      <Input
                        id="hr"
                        type="number"
                        min={30}
                        max={250}
                        value={form.heartRate}
                        onChange={(e) => setField("heartRate", e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4 mt-4">
                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                      <Checkbox
                        id="fh"
                        checked={form.familyHistory}
                        onCheckedChange={(v) => setField("familyHistory", v === true)}
                      />
                      <Label htmlFor="fh" className="cursor-pointer">{t.form.familyHistory}</Label>
                    </div>
                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                      <Checkbox
                        id="db"
                        checked={form.diabetes}
                        onCheckedChange={(v) => setField("diabetes", v === true)}
                      />
                      <Label htmlFor="db" className="cursor-pointer">{t.form.diabetes}</Label>
                    </div>
                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                      <Checkbox
                        id="th"
                        checked={form.thyroid}
                        onCheckedChange={(v) => setField("thyroid", v === true)}
                      />
                      <Label htmlFor="th" className="cursor-pointer">{t.form.thyroid}</Label>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Lifestyle */}
                <div>
                  <h3 className="font-semibold mb-4 flex items-center gap-2 text-red-700">
                    <Activity className="w-4 h-4" />
                    {t.form.lifestyle}
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <Label className="mb-1.5 block">{t.form.smoking}</Label>
                      <Select
                        value={form.smoking}
                        onValueChange={(v) => setField("smoking", v as typeof form.smoking)}
                      >
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                          {["none", "former", "current"].map((v, i) => (
                            <SelectItem key={v} value={v}>{t.form.smokingOptions[i]}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="mb-1.5 block">{t.form.physicalActivity}</Label>
                      <Select
                        value={form.physicalActivity}
                        onValueChange={(v) => setField("physicalActivity", v as typeof form.physicalActivity)}
                      >
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                          {["low", "moderate", "high"].map((v, i) => (
                            <SelectItem key={v} value={v}>{t.form.activityOptions[i]}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="mb-1.5 block">{t.form.salt}</Label>
                      <Select
                        value={form.salt}
                        onValueChange={(v) => setField("salt", v as typeof form.salt)}
                      >
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                          {["low", "medium", "high"].map((v, i) => (
                            <SelectItem key={v} value={v}>{t.form.saltOptions[i]}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="mb-1.5 block">{t.form.stress}</Label>
                      <Select
                        value={form.stress}
                        onValueChange={(v) => setField("stress", v as typeof form.stress)}
                      >
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                          {["low", "medium", "high"].map((v, i) => (
                            <SelectItem key={v} value={v}>{t.form.stressOptions[i]}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="sleep" className="mb-1.5 block">{t.form.sleep}</Label>
                      <Input
                        id="sleep"
                        type="number"
                        step="0.5"
                        min={0}
                        max={24}
                        value={form.sleep}
                        onChange={(e) => setField("sleep", e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </div>

                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-md p-3 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4" />
                    {error}
                  </div>
                )}

                <div className="flex flex-wrap gap-3 pt-2">
                  <Button
                    type="submit"
                    size="lg"
                    disabled={loading}
                    className="bg-red-600 hover:bg-red-700 text-white"
                  >
                    {loading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                        {t.form.calculating}
                      </>
                    ) : (
                      <>
                        <Calculator className="w-4 h-4 mr-2" />
                        {t.form.calculate}
                      </>
                    )}
                  </Button>
                  <Button type="button" variant="outline" size="lg" onClick={handleReset}>
                    <RotateCcw className="w-4 h-4 mr-2" />
                    {t.form.reset}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </form>
        </div>
      </section>

      {/* ===== Result ===== */}
      {result && (
        <section id="result-section" className="py-16 bg-muted/30">
          <div className="max-w-4xl mx-auto px-4">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold mb-2">{t.result.title}</h2>
            </div>

            <Card className="shadow-md overflow-hidden">
              <CardContent className="p-6 md:p-8">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  {/* Score gauge */}
                  <div className="text-center">
                    <div className="text-sm text-muted-foreground mb-2">{t.result.level}</div>
                    <div className={`text-5xl md:text-6xl font-bold mb-2 ${levelColor[result.level]}`}>
                      {levelLabel[result.level]}
                    </div>
                    <div className="text-3xl font-bold mb-1">
                      {result.score}
                      <span className="text-base text-muted-foreground"> / {t.result.of}</span>
                    </div>
                    <div className="text-xs text-muted-foreground mb-4">
                      {t.result.probability}: {(result.probability * 100).toFixed(0)}%
                    </div>
                    <div className="h-3 bg-muted rounded-full overflow-hidden">
                      <div
                        className={`h-full ${levelBar[result.level]} transition-all duration-700`}
                        style={{ width: `${result.score}%` }}
                      />
                    </div>
                  </div>

                  {/* Top factors */}
                  <div>
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <Activity className="w-4 h-4 text-red-600" />
                      {t.result.factors}
                    </h4>
                    <div className="space-y-2">
                      {result.topFactors.map((f) => (
                        <div key={f.key} className="flex items-center justify-between gap-2">
                          <span className="text-sm">{locale === "ar" ? f.ar : f.fr}</span>
                          <Badge variant="outline" className="text-red-700 border-red-200">
                            +{f.contribution}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <Separator className="my-6" />

                {/* Recommendations */}
                <div>
                  <h4 className="font-semibold mb-3 flex items-center gap-2 text-red-700">
                    <ShieldCheck className="w-4 h-4" />
                    {t.result.recommendation}
                  </h4>
                  <ul className="space-y-2">
                    {recommendations[result.level].map((r, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <span className="w-5 h-5 rounded-full bg-red-100 text-red-700 flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5">
                          {i + 1}
                        </span>
                        <span>{r}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 bg-amber-50 border border-amber-200 text-amber-800 text-xs rounded-md p-3 flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  <span>{t.result.disclaimer}</span>
                </div>

                <div className="mt-6 flex justify-center">
                  <Button variant="outline" onClick={handleReset}>
                    <RotateCcw className="w-4 h-4 mr-2" />
                    {t.result.recalc}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      )}

      {/* ===== About ===== */}
      <section id="about" className="py-16 bg-background">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-8">
            <Badge variant="secondary" className="mb-3">
              <Info className="w-3 h-3 mr-1" />
              {t.nav.about}
            </Badge>
            <h2 className="text-2xl md:text-3xl font-bold">{t.about.title}</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="lift">
              <CardContent className="p-6 space-y-3">
                <p className="text-sm leading-relaxed">{t.about.p1}</p>
                <p className="text-sm leading-relaxed">{t.about.p2}</p>
                <p className="text-sm leading-relaxed text-muted-foreground">{t.about.p3}</p>
              </CardContent>
            </Card>

            <Card className="lift">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-red-600" />
                  {t.about.stack}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {t.about.stackList.map((s, i) => (
                    <li key={i} className="text-sm flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                      {s}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* ===== Footer ===== */}
      <footer className="mt-auto border-t bg-muted/30">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="grid md:grid-cols-3 gap-6 mb-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center">
                  <HeartPulse className="w-4 h-4 text-red-600" />
                </div>
                <span className="font-bold text-sm">AI E-Health</span>
              </div>
              <p className="text-xs text-muted-foreground">{t.footer.rights}</p>
            </div>
            <div>
              <h5 className="text-xs font-semibold mb-2">{t.nav.calculator}</h5>
              <ul className="text-xs text-muted-foreground space-y-1">
                <li><a href="#calculator" className="hover:text-red-600">{t.form.calculate}</a></li>
                <li><a href="#about" className="hover:text-red-600">{t.about.title}</a></li>
              </ul>
            </div>
            <div>
              <h5 className="text-xs font-semibold mb-2">{t.about.stack}</h5>
              <ul className="text-xs text-muted-foreground space-y-1">
                <li>Next.js 16</li>
                <li>Docker + Compose</li>
                <li>Git / GitHub</li>
              </ul>
            </div>
          </div>
          <Separator className="my-4" />
          <div className="flex flex-col md:flex-row items-center justify-between gap-2 text-xs text-muted-foreground">
            <span>{t.footer.disclaimer}</span>
            <span>{t.footer.built}</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
