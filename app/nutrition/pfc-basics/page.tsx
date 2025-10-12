import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { pfcInfo, macroRatios } from "@/lib/nutrition-data"
import { ArrowLeft, Flame } from "lucide-react"

export default function PFCBasicsPage() {
  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <Button asChild variant="ghost" className="mb-6">
          <Link href="/nutrition">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Nutrition
          </Link>
        </Button>

        <h1 className="text-4xl md:text-5xl font-black mb-4">PFC Basics</h1>
        <p className="text-lg text-muted-foreground mb-8">
          Understanding Protein, Fats, and Carbohydrates - the three main sources of energy for our bodies
        </p>

        {/* Macronutrients */}
        <div className="space-y-6 mb-12">
          <Card className="border-l-4 border-l-primary">
            <CardHeader>
              <CardTitle className="text-2xl">{pfcInfo.protein.name}</CardTitle>
              <CardDescription>{pfcInfo.protein.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <span className="font-semibold">Calories per gram:</span>
                <Badge variant="outline">{pfcInfo.protein.caloriesPerGram} kcal/g</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <span className="font-semibold">Daily recommendation:</span>
                <Badge variant="secondary">{pfcInfo.protein.recommendation}</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <span className="font-semibold">For muscle building:</span>
                <Badge className="bg-primary">{pfcInfo.protein.bulking}</Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-secondary">
            <CardHeader>
              <CardTitle className="text-2xl">{pfcInfo.fats.name}</CardTitle>
              <CardDescription>{pfcInfo.fats.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <span className="font-semibold">Calories per gram:</span>
                <Badge variant="outline">{pfcInfo.fats.caloriesPerGram} kcal/g</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <span className="font-semibold">Daily recommendation:</span>
                <Badge variant="secondary">{pfcInfo.fats.recommendation}</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <span className="font-semibold">Minimum for bulking:</span>
                <Badge className="bg-secondary text-secondary-foreground">{pfcInfo.fats.bulking}</Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-accent">
            <CardHeader>
              <CardTitle className="text-2xl">{pfcInfo.carbohydrates.name}</CardTitle>
              <CardDescription>{pfcInfo.carbohydrates.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <span className="font-semibold">Calories per gram:</span>
                <Badge variant="outline">{pfcInfo.carbohydrates.caloriesPerGram} kcal/g</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <span className="font-semibold">Daily recommendation:</span>
                <Badge variant="secondary">{pfcInfo.carbohydrates.recommendation}</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <span className="font-semibold">For muscle building:</span>
                <Badge className="bg-accent text-accent-foreground">{pfcInfo.carbohydrates.bulking}</Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Example Calculation */}
        <Card className="mb-12 border-primary/50 bg-primary/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Flame className="h-5 w-5 text-primary" />
              Example Calculation
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-foreground/90 mb-4">For instance, a woman weighing 60kg should consume:</p>
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between p-3 bg-background rounded-lg">
                <span>Protein:</span>
                <span className="font-bold text-primary">60g daily</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-background rounded-lg">
                <span>Fats:</span>
                <span className="font-bold text-secondary">60g daily</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-background rounded-lg">
                <span>Carbohydrates:</span>
                <span className="font-bold text-accent">240g daily</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Macro Ratios */}
        <div className="space-y-6">
          <h2 className="text-3xl font-bold">Macro Ratios for Different Goals</h2>

          <Card>
            <CardHeader>
              <CardTitle>To Gain Muscle Mass</CardTitle>
              <CardDescription>Recommended ratios for bulking</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid sm:grid-cols-3 gap-4">
                <div className="p-4 bg-primary/10 rounded-lg text-center">
                  <p className="text-sm text-muted-foreground mb-1">Protein</p>
                  <p className="text-2xl font-bold text-primary">{macroRatios.bulking.men.protein}</p>
                </div>
                <div className="p-4 bg-secondary/10 rounded-lg text-center">
                  <p className="text-sm text-muted-foreground mb-1">Fats</p>
                  <p className="text-2xl font-bold text-secondary">{macroRatios.bulking.men.fats}</p>
                </div>
                <div className="p-4 bg-accent/10 rounded-lg text-center">
                  <p className="text-sm text-muted-foreground mb-1">Carbs</p>
                  <p className="text-2xl font-bold text-accent">{macroRatios.bulking.men.carbs}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Slimming Down or Shredding</CardTitle>
              <CardDescription>Recommended ratios for cutting</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid sm:grid-cols-3 gap-4">
                <div className="p-4 bg-primary/10 rounded-lg text-center">
                  <p className="text-sm text-muted-foreground mb-1">Protein</p>
                  <p className="text-2xl font-bold text-primary">{macroRatios.cutting.protein}</p>
                </div>
                <div className="p-4 bg-secondary/10 rounded-lg text-center">
                  <p className="text-sm text-muted-foreground mb-1">Fats</p>
                  <p className="text-2xl font-bold text-secondary">{macroRatios.cutting.fats}</p>
                </div>
                <div className="p-4 bg-accent/10 rounded-lg text-center">
                  <p className="text-sm text-muted-foreground mb-1">Carbs</p>
                  <p className="text-2xl font-bold text-accent">{macroRatios.cutting.carbs}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Navigation */}
        <div className="flex justify-end mt-12">
          <Button asChild size="lg">
            <Link href="/nutrition/calculator">
              Calculate Your Macros
              <ArrowLeft className="ml-2 h-4 w-4 rotate-180" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
