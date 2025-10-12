"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TrendingUp, Award, Target, Calendar, Dumbbell, HomeIcon } from "lucide-react"

interface ProgressData {
  gym: {
    initial: { squat: string; bench: string; deadlift: string; date: string }
    final: { squat: string; bench: string; deadlift: string; date: string }
  }
  home: {
    initial: { pullups: string; dips: string; pushups: string; date: string }
    final: { pullups: string; dips: string; pushups: string; date: string }
  }
}

export default function ProgressPage() {
  const [activeTab, setActiveTab] = useState<"gym" | "home">("gym")
  const [progressData, setProgressData] = useState<ProgressData>({
    gym: {
      initial: { squat: "", bench: "", deadlift: "", date: "" },
      final: { squat: "", bench: "", deadlift: "", date: "" },
    },
    home: {
      initial: { pullups: "", dips: "", pushups: "", date: "" },
      final: { pullups: "", dips: "", pushups: "", date: "" },
    },
  })

  // Load data from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("gym-app-progress")
    if (saved) {
      setProgressData(JSON.parse(saved))
    }
  }, [])

  // Save data to localStorage
  const saveProgress = (data: ProgressData) => {
    setProgressData(data)
    localStorage.setItem("gym-app-progress", JSON.stringify(data))
  }

  const updateGymInitial = (field: string, value: string) => {
    const newData = {
      ...progressData,
      gym: {
        ...progressData.gym,
        initial: { ...progressData.gym.initial, [field]: value },
      },
    }
    saveProgress(newData)
  }

  const updateGymFinal = (field: string, value: string) => {
    const newData = {
      ...progressData,
      gym: {
        ...progressData.gym,
        final: { ...progressData.gym.final, [field]: value },
      },
    }
    saveProgress(newData)
  }

  const updateHomeInitial = (field: string, value: string) => {
    const newData = {
      ...progressData,
      home: {
        ...progressData.home,
        initial: { ...progressData.home.initial, [field]: value },
      },
    }
    saveProgress(newData)
  }

  const updateHomeFinal = (field: string, value: string) => {
    const newData = {
      ...progressData,
      home: {
        ...progressData.home,
        final: { ...progressData.home.final, [field]: value },
      },
    }
    saveProgress(newData)
  }

  const setInitialDate = (type: "gym" | "home") => {
    const today = new Date().toISOString().split("T")[0]
    if (type === "gym") {
      updateGymInitial("date", today)
    } else {
      updateHomeInitial("date", today)
    }
  }

  const setFinalDate = (type: "gym" | "home") => {
    const today = new Date().toISOString().split("T")[0]
    if (type === "gym") {
      updateGymFinal("date", today)
    } else {
      updateHomeFinal("date", today)
    }
  }

  const calculateImprovement = (initial: string, final: string) => {
    const init = Number.parseFloat(initial)
    const fin = Number.parseFloat(final)
    if (!init || !fin) return null
    const diff = fin - init
    const percent = ((diff / init) * 100).toFixed(1)
    return { diff, percent }
  }

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-black mb-4 text-balance">TRACK YOUR PROGRESS</h1>
          <p className="text-xl text-muted-foreground mb-6 text-balance">
            Record your PRs and watch your transformation
          </p>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as "gym" | "home")} className="space-y-8">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
            <TabsTrigger value="gym" className="gap-2">
              <Dumbbell className="h-4 w-4" />
              Gym Training
            </TabsTrigger>
            <TabsTrigger value="home" className="gap-2">
              <HomeIcon className="h-4 w-4" />
              Home Training
            </TabsTrigger>
          </TabsList>

          {/* Gym Training Tab */}
          <TabsContent value="gym" className="space-y-8">
            <Card className="border-primary/50 bg-primary/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-primary" />
                  Before You Start
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground/90">
                  Record your current personal records in squat, bench press, and deadlift. After 8 weeks, test again
                  and compare your results. You will be surprised!
                </p>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Initial Test */}
              <Card className="border-l-4 border-l-accent">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-2xl">Initial Test</CardTitle>
                    <Badge variant="outline">Week 0</Badge>
                  </div>
                  <CardDescription>Record your starting PRs</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="initial-squat">Squat (kg)</Label>
                    <Input
                      id="initial-squat"
                      type="number"
                      placeholder="100"
                      value={progressData.gym.initial.squat}
                      onChange={(e) => updateGymInitial("squat", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="initial-bench">Bench Press (kg)</Label>
                    <Input
                      id="initial-bench"
                      type="number"
                      placeholder="80"
                      value={progressData.gym.initial.bench}
                      onChange={(e) => updateGymInitial("bench", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="initial-deadlift">Deadlift (kg)</Label>
                    <Input
                      id="initial-deadlift"
                      type="number"
                      placeholder="120"
                      value={progressData.gym.initial.deadlift}
                      onChange={(e) => updateGymInitial("deadlift", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="initial-date-gym">Test Date</Label>
                    <div className="flex gap-2">
                      <Input
                        id="initial-date-gym"
                        type="date"
                        value={progressData.gym.initial.date}
                        onChange={(e) => updateGymInitial("date", e.target.value)}
                      />
                      <Button variant="outline" onClick={() => setInitialDate("gym")}>
                        <Calendar className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Final Test */}
              <Card className="border-l-4 border-l-primary">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-2xl">Final Test</CardTitle>
                    <Badge variant="default">Week 8</Badge>
                  </div>
                  <CardDescription>Record your final PRs</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="final-squat">Squat (kg)</Label>
                    <Input
                      id="final-squat"
                      type="number"
                      placeholder="120"
                      value={progressData.gym.final.squat}
                      onChange={(e) => updateGymFinal("squat", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="final-bench">Bench Press (kg)</Label>
                    <Input
                      id="final-bench"
                      type="number"
                      placeholder="95"
                      value={progressData.gym.final.bench}
                      onChange={(e) => updateGymFinal("bench", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="final-deadlift">Deadlift (kg)</Label>
                    <Input
                      id="final-deadlift"
                      type="number"
                      placeholder="140"
                      value={progressData.gym.final.deadlift}
                      onChange={(e) => updateGymFinal("deadlift", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="final-date-gym">Test Date</Label>
                    <div className="flex gap-2">
                      <Input
                        id="final-date-gym"
                        type="date"
                        value={progressData.gym.final.date}
                        onChange={(e) => updateGymFinal("date", e.target.value)}
                      />
                      <Button variant="outline" onClick={() => setFinalDate("gym")}>
                        <Calendar className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Results */}
            {progressData.gym.initial.squat &&
              progressData.gym.final.squat &&
              progressData.gym.initial.bench &&
              progressData.gym.final.bench &&
              progressData.gym.initial.deadlift &&
              progressData.gym.final.deadlift && (
                <Card className="border-primary/50 bg-primary/5">
                  <CardHeader>
                    <CardTitle className="text-2xl flex items-center gap-2">
                      <Award className="h-6 w-6 text-primary" />
                      Your Progress
                    </CardTitle>
                    <CardDescription>8-week transformation results</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-4">
                      {/* Squat */}
                      {(() => {
                        const improvement = calculateImprovement(
                          progressData.gym.initial.squat,
                          progressData.gym.final.squat,
                        )
                        return (
                          <div className="p-4 bg-background rounded-lg">
                            <h3 className="font-semibold mb-2">Squat</h3>
                            <div className="space-y-1 text-sm">
                              <p className="text-muted-foreground">Initial: {progressData.gym.initial.squat} kg</p>
                              <p className="text-muted-foreground">Final: {progressData.gym.final.squat} kg</p>
                              {improvement && (
                                <div className="pt-2 border-t border-border">
                                  <p className="font-bold text-primary flex items-center gap-2">
                                    <TrendingUp className="h-4 w-4" />+{improvement.diff} kg ({improvement.percent}%)
                                  </p>
                                </div>
                              )}
                            </div>
                          </div>
                        )
                      })()}

                      {/* Bench Press */}
                      {(() => {
                        const improvement = calculateImprovement(
                          progressData.gym.initial.bench,
                          progressData.gym.final.bench,
                        )
                        return (
                          <div className="p-4 bg-background rounded-lg">
                            <h3 className="font-semibold mb-2">Bench Press</h3>
                            <div className="space-y-1 text-sm">
                              <p className="text-muted-foreground">Initial: {progressData.gym.initial.bench} kg</p>
                              <p className="text-muted-foreground">Final: {progressData.gym.final.bench} kg</p>
                              {improvement && (
                                <div className="pt-2 border-t border-border">
                                  <p className="font-bold text-primary flex items-center gap-2">
                                    <TrendingUp className="h-4 w-4" />+{improvement.diff} kg ({improvement.percent}%)
                                  </p>
                                </div>
                              )}
                            </div>
                          </div>
                        )
                      })()}

                      {/* Deadlift */}
                      {(() => {
                        const improvement = calculateImprovement(
                          progressData.gym.initial.deadlift,
                          progressData.gym.final.deadlift,
                        )
                        return (
                          <div className="p-4 bg-background rounded-lg">
                            <h3 className="font-semibold mb-2">Deadlift</h3>
                            <div className="space-y-1 text-sm">
                              <p className="text-muted-foreground">Initial: {progressData.gym.initial.deadlift} kg</p>
                              <p className="text-muted-foreground">Final: {progressData.gym.final.deadlift} kg</p>
                              {improvement && (
                                <div className="pt-2 border-t border-border">
                                  <p className="font-bold text-primary flex items-center gap-2">
                                    <TrendingUp className="h-4 w-4" />+{improvement.diff} kg ({improvement.percent}%)
                                  </p>
                                </div>
                              )}
                            </div>
                          </div>
                        )
                      })()}
                    </div>
                  </CardContent>
                </Card>
              )}
          </TabsContent>

          {/* Home Training Tab */}
          <TabsContent value="home" className="space-y-8">
            <Card className="border-secondary/50 bg-secondary/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-secondary" />
                  Strength Test Protocol
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground/90 mb-4">
                  Complete the strength test before starting and after finishing the 8-week program:
                </p>
                <ol className="space-y-2 text-sm text-muted-foreground">
                  <li>1. Pull-ups - 1 set of maximum reps</li>
                  <li>2. Rest for 15 minutes</li>
                  <li>3. Parallel bar dips - 1 set of maximum reps</li>
                  <li>4. Rest for 20 minutes</li>
                  <li>5. Push-ups - 1 set of maximum reps</li>
                </ol>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Initial Test */}
              <Card className="border-l-4 border-l-accent">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-2xl">Initial Test</CardTitle>
                    <Badge variant="outline">Week 0</Badge>
                  </div>
                  <CardDescription>Record your starting max reps</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="initial-pullups">Pull-ups (max reps)</Label>
                    <Input
                      id="initial-pullups"
                      type="number"
                      placeholder="10"
                      value={progressData.home.initial.pullups}
                      onChange={(e) => updateHomeInitial("pullups", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="initial-dips">Dips (max reps)</Label>
                    <Input
                      id="initial-dips"
                      type="number"
                      placeholder="15"
                      value={progressData.home.initial.dips}
                      onChange={(e) => updateHomeInitial("dips", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="initial-pushups">Push-ups (max reps)</Label>
                    <Input
                      id="initial-pushups"
                      type="number"
                      placeholder="30"
                      value={progressData.home.initial.pushups}
                      onChange={(e) => updateHomeInitial("pushups", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="initial-date-home">Test Date</Label>
                    <div className="flex gap-2">
                      <Input
                        id="initial-date-home"
                        type="date"
                        value={progressData.home.initial.date}
                        onChange={(e) => updateHomeInitial("date", e.target.value)}
                      />
                      <Button variant="outline" onClick={() => setInitialDate("home")}>
                        <Calendar className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Final Test */}
              <Card className="border-l-4 border-l-secondary">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-2xl">Final Test</CardTitle>
                    <Badge className="bg-secondary text-secondary-foreground">Week 8</Badge>
                  </div>
                  <CardDescription>Record your final max reps</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="final-pullups">Pull-ups (max reps)</Label>
                    <Input
                      id="final-pullups"
                      type="number"
                      placeholder="15"
                      value={progressData.home.final.pullups}
                      onChange={(e) => updateHomeFinal("pullups", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="final-dips">Dips (max reps)</Label>
                    <Input
                      id="final-dips"
                      type="number"
                      placeholder="22"
                      value={progressData.home.final.dips}
                      onChange={(e) => updateHomeFinal("dips", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="final-pushups">Push-ups (max reps)</Label>
                    <Input
                      id="final-pushups"
                      type="number"
                      placeholder="45"
                      value={progressData.home.final.pushups}
                      onChange={(e) => updateHomeFinal("pushups", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="final-date-home">Test Date</Label>
                    <div className="flex gap-2">
                      <Input
                        id="final-date-home"
                        type="date"
                        value={progressData.home.final.date}
                        onChange={(e) => updateHomeFinal("date", e.target.value)}
                      />
                      <Button variant="outline" onClick={() => setFinalDate("home")}>
                        <Calendar className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Results */}
            {progressData.home.initial.pullups &&
              progressData.home.final.pullups &&
              progressData.home.initial.dips &&
              progressData.home.final.dips &&
              progressData.home.initial.pushups &&
              progressData.home.final.pushups && (
                <Card className="border-secondary/50 bg-secondary/5">
                  <CardHeader>
                    <CardTitle className="text-2xl flex items-center gap-2">
                      <Award className="h-6 w-6 text-secondary" />
                      Your Progress
                    </CardTitle>
                    <CardDescription>8-week transformation results</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-4">
                      {/* Pull-ups */}
                      {(() => {
                        const improvement = calculateImprovement(
                          progressData.home.initial.pullups,
                          progressData.home.final.pullups,
                        )
                        return (
                          <div className="p-4 bg-background rounded-lg">
                            <h3 className="font-semibold mb-2">Pull-ups</h3>
                            <div className="space-y-1 text-sm">
                              <p className="text-muted-foreground">Initial: {progressData.home.initial.pullups} reps</p>
                              <p className="text-muted-foreground">Final: {progressData.home.final.pullups} reps</p>
                              {improvement && (
                                <div className="pt-2 border-t border-border">
                                  <p className="font-bold text-secondary flex items-center gap-2">
                                    <TrendingUp className="h-4 w-4" />+{improvement.diff} reps ({improvement.percent}%)
                                  </p>
                                </div>
                              )}
                            </div>
                          </div>
                        )
                      })()}

                      {/* Dips */}
                      {(() => {
                        const improvement = calculateImprovement(
                          progressData.home.initial.dips,
                          progressData.home.final.dips,
                        )
                        return (
                          <div className="p-4 bg-background rounded-lg">
                            <h3 className="font-semibold mb-2">Dips</h3>
                            <div className="space-y-1 text-sm">
                              <p className="text-muted-foreground">Initial: {progressData.home.initial.dips} reps</p>
                              <p className="text-muted-foreground">Final: {progressData.home.final.dips} reps</p>
                              {improvement && (
                                <div className="pt-2 border-t border-border">
                                  <p className="font-bold text-secondary flex items-center gap-2">
                                    <TrendingUp className="h-4 w-4" />+{improvement.diff} reps ({improvement.percent}%)
                                  </p>
                                </div>
                              )}
                            </div>
                          </div>
                        )
                      })()}

                      {/* Push-ups */}
                      {(() => {
                        const improvement = calculateImprovement(
                          progressData.home.initial.pushups,
                          progressData.home.final.pushups,
                        )
                        return (
                          <div className="p-4 bg-background rounded-lg">
                            <h3 className="font-semibold mb-2">Push-ups</h3>
                            <div className="space-y-1 text-sm">
                              <p className="text-muted-foreground">Initial: {progressData.home.initial.pushups} reps</p>
                              <p className="text-muted-foreground">Final: {progressData.home.final.pushups} reps</p>
                              {improvement && (
                                <div className="pt-2 border-t border-border">
                                  <p className="font-bold text-secondary flex items-center gap-2">
                                    <TrendingUp className="h-4 w-4" />+{improvement.diff} reps ({improvement.percent}%)
                                  </p>
                                </div>
                              )}
                            </div>
                          </div>
                        )
                      })()}
                    </div>
                  </CardContent>
                </Card>
              )}
          </TabsContent>
        </Tabs>

        {/* Motivation */}
        <Card className="mt-12 border-primary/50 bg-primary/5">
          <CardContent className="pt-6 text-center">
            <p className="text-2xl font-bold text-primary mb-2">I AM SURE YOU WILL BE SURPRISED!</p>
            <p className="text-lg text-foreground/90">Keep pushing, champ! Your transformation is happening.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
