import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { vitaminsAndMinerals, aminoAcids } from "@/lib/nutrition-data"
import { ArrowLeft, Pill, AlertTriangle } from "lucide-react"

export default function SupplementsPage() {
  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <Button asChild variant="ghost" className="mb-6">
          <Link href="/nutrition">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Nutrition
          </Link>
        </Button>

        <h1 className="text-4xl md:text-5xl font-black mb-4">Vitamins, Minerals & Supplements</h1>
        <p className="text-lg text-muted-foreground mb-8">
          Essential nutrients and amino acids for optimal performance
        </p>

        {/* Important Warning */}
        <Card className="mb-12 border-accent/50 bg-accent/5">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold mb-2">Important:</p>
                <p className="text-sm text-muted-foreground">
                  Sports supplements and vitamins are not a substitute for a balanced diet and regular exercise. Always
                  consult with a specialist or doctor before taking supplements.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Vitamins and Minerals */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
            <Pill className="h-7 w-7 text-primary" />
            Vitamins & Minerals
          </h2>
          <div className="grid gap-4">
            {vitaminsAndMinerals.map((item, idx) => (
              <Card key={idx} className="hover:border-primary/50 transition-colors">
                <CardHeader>
                  <CardTitle className="text-lg">{item.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{item.function}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Amino Acids */}
        <div>
          <h2 className="text-3xl font-bold mb-6">Amino Acids & Supplements</h2>
          <p className="text-muted-foreground mb-6">
            Amino acids are the building blocks of protein and have numerous benefits for the body.
          </p>
          <div className="grid gap-4">
            {aminoAcids.map((item, idx) => (
              <Card key={idx} className="hover:border-secondary/50 transition-colors">
                <CardHeader>
                  <CardTitle className="text-lg">{item.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{item.function}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
