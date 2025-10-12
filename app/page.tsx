import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Dumbbell, Home, Apple, TrendingUp, Play } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-background" />
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: "url(/placeholder.svg?height=600&width=1200&query=muscular+athlete+training+gym)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-6xl md:text-8xl font-black text-foreground mb-6 tracking-tight text-balance">
            Gym App
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 text-balance">
            8 Weeks of Powerbuilding Progress
          </p>
          <p className="text-lg text-foreground/80 mb-12 max-w-2xl mx-auto text-pretty">
            Transform your strength and aesthetic form. We don't just lift weights - we strengthen ligaments and joints
            for lasting health and power.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="text-lg px-8 py-6">
              <Link href="/gym-training">
                <Dumbbell className="mr-2 h-5 w-5" />
                Gym Training
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="text-lg px-8 py-6 bg-transparent">
              <Link href="/home-training">
                <Home className="mr-2 h-5 w-5" />
                Home Training
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Quick Access Cards */}
      <section className="py-20 px-4 max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12">Choose Your Path</h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Link href="/gym-training" className="group">
            <Card className="h-full transition-all hover:scale-105 hover:border-primary">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <Dumbbell className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Gym Training</CardTitle>
                <CardDescription>8-week powerbuilding program</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Complete gym workouts with squats, bench press, and deadlifts
                </p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/home-training" className="group">
            <Card className="h-full transition-all hover:scale-105 hover:border-primary">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center mb-4 group-hover:bg-secondary/20 transition-colors">
                  <Home className="h-6 w-6 text-secondary" />
                </div>
                <CardTitle>Home Training</CardTitle>
                <CardDescription>Bodyweight & minimal equipment</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Build strength at home with pull-ups, dips, and calisthenics
                </p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/nutrition" className="group">
            <Card className="h-full transition-all hover:scale-105 hover:border-primary">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                  <Apple className="h-6 w-6 text-accent" />
                </div>
                <CardTitle>Nutrition</CardTitle>
                <CardDescription>Meal plans & macros</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Complete nutrition guide with sample menus and PFC calculations
                </p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/progress" className="group">
            <Card className="h-full transition-all hover:scale-105 hover:border-primary">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <TrendingUp className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Track Progress</CardTitle>
                <CardDescription>Strength tests & records</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Record your PRs and track your 8-week transformation</p>
              </CardContent>
            </Card>
          </Link>
        </div>
      </section>

      {/* Important Notice */}
      <section className="py-16 px-4 max-w-4xl mx-auto">
        <Card className="border-primary/50 bg-primary/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Play className="h-5 w-5 text-primary" />
              Before You Start
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-foreground/90">
              <strong>Watch the warm-up videos</strong> - All information about warm-up, rest periods, and weights is
              included
            </p>
            <p className="text-foreground/90">
              <strong>Record your starting PRs</strong> - Fix your current personal records in bench press, deadlift,
              and squat to compare after 8 weeks
            </p>
            <p className="text-2xl font-bold text-primary mt-6">I AM SURE YOU WILL BE SURPRISED!</p>
            <p className="text-xl font-semibold">Let's go, champ! 💪</p>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
