import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { gymProgram } from "@/lib/gym-workouts";
import { Clock, Dumbbell, Play } from "lucide-react";

export default function GymTrainingPage() {
  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-black mb-4 text-balance">GYM TRAINING PROGRAM</h1>
          <p className="text-xl text-muted-foreground mb-6 text-balance">
            8 Weeks of Powerbuilding - Strength & Aesthetics
          </p>

          <Card className="max-w-3xl mx-auto border-primary/50 bg-primary/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 justify-center">
                <Play className="h-5 w-5 text-primary" />
                Important: Watch Warm-up Videos First
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start gap-3 text-left">
                <Clock className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold">Rest Between Sets:</p>
                  <ul className="text-sm text-muted-foreground space-y-1 mt-1">
                    <li>• Basic exercises (squat/bench/deadlift): 4 minutes</li>
                    <li>• Other sets: 2 minutes</li>
                    <li>• Between exercises: 3 minutes</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Week Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {gymProgram.map((week) => (
            <Card key={week.week} className="h-full transition-all hover:scale-105 hover:border-primary">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="outline" className="text-lg px-3 py-1">
                    Week {week.week}
                  </Badge>
                  <Dumbbell className="h-5 w-5 text-primary" />
                </div>
                <CardTitle>Week {week.week} Training</CardTitle>
                <CardDescription>{week.workouts.length} workout days</CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value={`week-${week.week}`}>
                    <AccordionTrigger className="text-base">View Workout Days</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-2 mt-2">
                        {week.workouts.map((workout, idx) => (
                          <div key={idx} className="text-sm">
                            <span className="font-semibold text-primary">{workout.day}:</span>
                            <span className="text-muted-foreground ml-2">{workout.focus}</span>
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
                <Button asChild className="w-full mt-4">
                  <Link href={`/gym-training/week-${week.week}`}>
                    View Week {week.week}
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Warm-up Section */}
        <div className="mt-16">
          <Card className="border-accent/50">
            <CardHeader>
              <CardTitle className="text-2xl">Before Training - Warm-up Routine</CardTitle>
              <CardDescription>15 minutes warm-up protocol</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Cardio Warm-up (10 minutes)</h3>
                <p className="text-muted-foreground">Walking or running on treadmill at moderate pace</p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Stretching Routine (Each exercise 15 seconds)</h3>
                <div className="grid sm:grid-cols-2 gap-2 text-sm text-muted-foreground">
                  <div>1. Neck flexion</div>
                  <div>2. Neck extension</div>
                  <div>3. Side neck flexion</div>
                  <div>4. Shoulder rotations</div>
                  <div>5. Arm circles</div>
                  <div>6. Elbow flexion</div>
                  <div>7. Wrist flexion</div>
                  <div>8. Back rotations</div>
                  <div>9. Trunk extension</div>
                  <div>10. Hip circles</div>
                  <div>11. Leg swings</div>
                  <div>12. Knee flexion</div>
                  <div>13. Ankle rotation</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
