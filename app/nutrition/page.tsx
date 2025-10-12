import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Apple, Calculator, UtensilsCrossed, Pill, AlertTriangle, CheckCircle2, XCircle } from "lucide-react"

export default function NutritionPage() {
  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-black mb-4 text-balance">NUTRITION GUIDE</h1>
          <p className="text-xl text-muted-foreground mb-6 text-balance">
            Complete nutrition information for optimal performance
          </p>
        </div>

        {/* Quick Navigation Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <Link href="/nutrition/pfc-basics" className="group">
            <Card className="h-full transition-all hover:scale-105 hover:border-accent">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                  <Apple className="h-6 w-6 text-accent" />
                </div>
                <CardTitle>PFC Basics</CardTitle>
                <CardDescription>Protein, Fats, Carbohydrates</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Learn about macronutrients and daily requirements</p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/nutrition/calculator" className="group">
            <Card className="h-full transition-all hover:scale-105 hover:border-accent">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <Calculator className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Macro Calculator</CardTitle>
                <CardDescription>Calculate your needs</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Calculate calories and macros for your goals</p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/nutrition/meal-plans" className="group">
            <Card className="h-full transition-all hover:scale-105 hover:border-accent">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center mb-4 group-hover:bg-secondary/20 transition-colors">
                  <UtensilsCrossed className="h-6 w-6 text-secondary" />
                </div>
                <CardTitle>Meal Plans</CardTitle>
                <CardDescription>Sample menus & recipes</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">3 complete meal plans with ~3000 calories</p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/nutrition/supplements" className="group">
            <Card className="h-full transition-all hover:scale-105 hover:border-accent">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                  <Pill className="h-6 w-6 text-accent" />
                </div>
                <CardTitle>Supplements</CardTitle>
                <CardDescription>Vitamins & minerals</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Essential vitamins, minerals, and amino acids</p>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* Quick Tips Section */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="border-destructive/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <XCircle className="h-5 w-5 text-destructive" />
                Foods to Avoid
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-destructive mt-1">•</span>
                  <span>Sausages, pates</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-destructive mt-1">•</span>
                  <span>Sweets, crisps</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-destructive mt-1">•</span>
                  <span>Fast food, ready meals</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-destructive mt-1">•</span>
                  <span>White bread, rolls</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-destructive mt-1">•</span>
                  <span>Sweet drinks (juices, lemonade, coke)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-destructive mt-1">•</span>
                  <span>Fried foods (very high in calories)</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-primary/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-primary" />
                Key Nutrition Tips
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Eat several smaller meals instead of one big meal</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Drink plenty of water to fill your stomach and speed up metabolism</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Prepare meals in advance to avoid unhealthy snacks</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Read labels carefully</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Consistency is key - don't give up when you fail</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Important Note */}
        <Card className="mt-8 border-accent/50 bg-accent/5">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold mb-2">Remember:</p>
                <p className="text-sm text-muted-foreground">
                  Sports supplements and vitamins are not a substitute for a balanced diet and regular exercise. The
                  most important thing is a well-thought-out goal and consistency.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
