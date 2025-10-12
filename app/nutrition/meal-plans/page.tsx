import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { sampleMenus } from "@/lib/nutrition-data"
import { ArrowLeft, UtensilsCrossed } from "lucide-react"

export default function MealPlansPage() {
  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <Button asChild variant="ghost" className="mb-6">
          <Link href="/nutrition">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Nutrition
          </Link>
        </Button>

        <h1 className="text-4xl md:text-5xl font-black mb-4">Sample Meal Plans</h1>
        <p className="text-lg text-muted-foreground mb-8">
          Three complete meal plans, each providing around 3,000 calories
        </p>

        <div className="space-y-8">
          {sampleMenus.map((menu, idx) => (
            <Card key={idx} className="border-l-4 border-l-accent">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-2xl flex items-center gap-2">
                      <UtensilsCrossed className="h-6 w-6 text-accent" />
                      {menu.name}
                    </CardTitle>
                    <CardDescription className="text-lg mt-1">{menu.calories}</CardDescription>
                  </div>
                  <Badge variant="outline" className="text-lg px-4 py-2">
                    {Object.keys(menu.meals).length} meals
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  {Object.entries(menu.meals).map(([mealName, items]) => (
                    <div key={mealName} className="space-y-2">
                      <h3 className="font-semibold text-lg capitalize">{mealName.replace(/([A-Z])/g, " $1").trim()}</h3>
                      <div className="p-4 bg-muted/30 rounded-lg">
                        <ul className="space-y-2 text-sm text-muted-foreground">
                          {items.map((item, itemIdx) => (
                            <li key={itemIdx} className="flex items-start gap-2">
                              <span className="text-accent mt-1">•</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
