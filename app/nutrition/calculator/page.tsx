"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Calculator } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function MacroCalculatorPage() {
  const [weight, setWeight] = useState("")
  const [height, setHeight] = useState("")
  const [age, setAge] = useState("")
  const [gender, setGender] = useState<"male" | "female">("male")
  const [activity, setActivity] = useState("1.55")
  const [goal, setGoal] = useState<"bulk" | "cut">("bulk")
  const [results, setResults] = useState<any>(null)

  const calculateMacros = () => {
    const w = Number.parseFloat(weight)
    const h = Number.parseFloat(height)
    const a = Number.parseFloat(age)
    const activityLevel = Number.parseFloat(activity)

    if (!w || !h || !a) return

    // Calculate BMR
    let bmr: number
    if (gender === "male") {
      bmr = 10 * w + 6.25 * h - 5 * a + 5
    } else {
      bmr = 10 * w + 6.25 * h - 5 * a - 161
    }

    // Calculate TDEE
    const tdee = bmr * activityLevel

    // Calculate macros based on goal
    let calories: number
    let protein: number
    let fats: number
    let carbs: number

    if (goal === "bulk") {
      calories = tdee
      protein = w * 2
      fats = w * 1
      const proteinCals = protein * 4
      const fatCals = fats * 9
      carbs = (calories - proteinCals - fatCals) / 4
    } else {
      calories = tdee - 500
      protein = w * 2.5
      fats = w * 0.8
      const proteinCals = protein * 4
      const fatCals = fats * 9
      carbs = (calories - proteinCals - fatCals) / 4
    }

    setResults({
      bmr: Math.round(bmr),
      tdee: Math.round(tdee),
      calories: Math.round(calories),
      protein: Math.round(protein),
      fats: Math.round(fats),
      carbs: Math.round(carbs),
    })
  }

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <Button asChild variant="ghost" className="mb-6">
          <Link href="/nutrition">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Nutrition
          </Link>
        </Button>

        <h1 className="text-4xl md:text-5xl font-black mb-4">Macro Calculator</h1>
        <p className="text-lg text-muted-foreground mb-8">
          Calculate your daily calorie and macronutrient requirements
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Input Form */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-5 w-5 text-primary" />
                Your Information
              </CardTitle>
              <CardDescription>Enter your details to calculate macros</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="weight">Weight (kg)</Label>
                <Input
                  id="weight"
                  type="number"
                  placeholder="70"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="height">Height (cm)</Label>
                <Input
                  id="height"
                  type="number"
                  placeholder="175"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="age">Age (years)</Label>
                <Input id="age" type="number" placeholder="25" value={age} onChange={(e) => setAge(e.target.value)} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="gender">Gender</Label>
                <Select value={gender} onValueChange={(value: "male" | "female") => setGender(value)}>
                  <SelectTrigger id="gender">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="activity">Activity Level</Label>
                <Select value={activity} onValueChange={setActivity}>
                  <SelectTrigger id="activity">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1.2">Sedentary (little or no exercise)</SelectItem>
                    <SelectItem value="1.375">Light (1-3 times/week)</SelectItem>
                    <SelectItem value="1.55">Moderate (3-5 times/week)</SelectItem>
                    <SelectItem value="1.725">Active (6-7 times/week)</SelectItem>
                    <SelectItem value="1.9">Very Active (7+ times/week)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="goal">Goal</Label>
                <Select value={goal} onValueChange={(value: "bulk" | "cut") => setGoal(value)}>
                  <SelectTrigger id="goal">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bulk">Gain Muscle Mass</SelectItem>
                    <SelectItem value="cut">Lose Fat / Shred</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button onClick={calculateMacros} className="w-full" size="lg">
                Calculate Macros
              </Button>
            </CardContent>
          </Card>

          {/* Results */}
          <div className="space-y-6">
            {results ? (
              <>
                <Card className="border-primary/50 bg-primary/5">
                  <CardHeader>
                    <CardTitle>Your Results</CardTitle>
                    <CardDescription>Daily nutritional requirements</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-background rounded-lg">
                      <span className="font-semibold">BMR (Basal Metabolic Rate):</span>
                      <Badge variant="outline" className="text-lg">
                        {results.bmr} kcal
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-background rounded-lg">
                      <span className="font-semibold">TDEE (Maintenance):</span>
                      <Badge variant="outline" className="text-lg">
                        {results.tdee} kcal
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-background rounded-lg">
                      <span className="font-semibold">Target Calories:</span>
                      <Badge className="text-lg bg-primary">{results.calories} kcal</Badge>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Daily Macros</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="p-4 bg-primary/10 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold">Protein</span>
                        <Badge className="bg-primary">{results.protein}g</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{results.protein * 4} kcal (4 kcal/g)</p>
                    </div>

                    <div className="p-4 bg-secondary/10 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold">Fats</span>
                        <Badge className="bg-secondary text-secondary-foreground">{results.fats}g</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{results.fats * 9} kcal (9 kcal/g)</p>
                    </div>

                    <div className="p-4 bg-accent/10 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold">Carbohydrates</span>
                        <Badge className="bg-accent text-accent-foreground">{results.carbs}g</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{results.carbs * 4} kcal (4 kcal/g)</p>
                    </div>
                  </CardContent>
                </Card>
              </>
            ) : (
              <Card className="h-full flex items-center justify-center">
                <CardContent className="text-center py-12">
                  <Calculator className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    Enter your information and click Calculate to see your results
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
