"use client";

import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Week, WorkoutDay, NewWorkoutDay } from "@/lib/db/schema"
import { Dumbbell, ArrowLeft, PlusCircle, Loader2 } from "lucide-react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface GymWeekClientProps {
  weekData: Week & { workoutDays: WorkoutDay[] }
}

export default function GymWeekClient({ weekData }: GymWeekClientProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [newWorkoutDay, setNewWorkoutDay] = useState<Partial<NewWorkoutDay>>({
    dayNumber: 0,
    dayName: "",
    focus: "",
  })
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const [workoutDays, setWorkoutDays] = useState(weekData.workoutDays)

  async function handleAddDay() {
    setLoading(true)
    try {
      const res = await fetch("/api/workout-days", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...newWorkoutDay, weekId: weekData.id }),
      })
      if (!res.ok) {
        throw new Error("Failed to create workout day")
      }
      toast.success("Workout day created successfully!")
      setIsDialogOpen(false)
      setNewWorkoutDay({ dayNumber: 0, dayName: "", focus: "" })
      router.refresh()
    } catch (error) {
      toast.error("Failed to create workout day.")
      console.error("Error creating workout day:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-black mb-4 text-balance">GYM TRAINING - WEEK {weekData.weekNumber}</h1>
          <p className="text-xl text-muted-foreground mb-6 text-balance">
            Overview of your workouts for Week {weekData.weekNumber}
          </p>
          <div className="flex justify-center gap-4 mt-4">
            <Button asChild variant="outline">
              <Link href="/gym-training">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to All Weeks
              </Link>
            </Button>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add New Day
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle>Add New Workout Day</DialogTitle>
                  <DialogDescription>Fill in the details for the new workout day.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="dayNumber" className="text-right">Day Number</Label>
                    <Input
                      id="dayNumber"
                      type="number"
                      value={newWorkoutDay.dayNumber}
                      onChange={(e) => setNewWorkoutDay({ ...newWorkoutDay, dayNumber: parseInt(e.target.value) })}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="dayName" className="text-right">Day Name</Label>
                    <Input
                      id="dayName"
                      value={newWorkoutDay.dayName}
                      onChange={(e) => setNewWorkoutDay({ ...newWorkoutDay, dayName: e.target.value })}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="focus" className="text-right">Focus</Label>
                    <Input
                      id="focus"
                      value={newWorkoutDay.focus || ""}
                      onChange={(e) => setNewWorkoutDay({ ...newWorkoutDay, focus: e.target.value })}
                      className="col-span-3"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit" onClick={handleAddDay} disabled={loading}>
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Creating...
                      </>
                    ) : (
                      "Create Workout Day"
                    )}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {workoutDays.map((workoutDay) => (
            <Link key={workoutDay.id} href={`/gym-training/week-${weekData.weekNumber}/day-${workoutDay.dayName.toLowerCase().replace(/ /g, '-')}`} className="group">
              <Card className="h-full transition-all hover:scale-105 hover:border-primary">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline" className="text-lg px-3 py-1">
                      {workoutDay.dayName}
                    </Badge>
                    <Dumbbell className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle>{workoutDay.focus} Workout</CardTitle>
                  <CardDescription>View exercises</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button
                    className="w-full mt-4 group-hover:bg-primary group-hover:text-primary-foreground bg-transparent"
                    variant="outline"
                  >
                    View {workoutDay.dayName} Workout
                  </Button>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
