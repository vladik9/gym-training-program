"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dumbbell, PlusCircle, Loader2 } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Link from "next/link";
import { Exercise, NewExercise } from "@/lib/db/schema";

interface ExercisesClientPageProps {
  exercises: Exercise[];
}

export default function ExercisesClientPage({ exercises }: ExercisesClientPageProps) {
  const router = useRouter();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newExercise, setNewExercise] = useState<Partial<NewExercise>>({
    name: "",
    category: "",
    equipment: "",
    difficulty: "",
    description: "",
    instructions: "",
    musclesWorked: "",
    videoUrl: "",
    gifUrl: "",
    tips: "",
  });
  const [loading, setLoading] = useState(false);

  async function handleCreateExercise() {
    setLoading(true);
    try {
      const res = await fetch("/api/exercises", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newExercise),
      });
      if (!res.ok) {
        throw new Error("Failed to create exercise");
      }
      toast.success("Exercise created successfully!");
      setIsDialogOpen(false);
      setNewExercise({
        name: "",
        category: "",
        equipment: "",
        difficulty: "",
        description: "",
        instructions: "",
        musclesWorked: "",
        videoUrl: "",
        gifUrl: "",
        tips: "",
      });
      router.refresh();
    } catch (error) {
      toast.error("Failed to create exercise.");
      console.error("Error creating exercise:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-black mb-4 text-balance">All Exercises</h1>
          <p className="text-xl text-muted-foreground mb-6 text-balance">
            Browse through our comprehensive exercise library.
          </p>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="mt-4">
                <PlusCircle className="mr-2 h-4 w-4" />
                Add New Exercise
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Add New Exercise</DialogTitle>
                <DialogDescription>Fill in the details for the new exercise.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">Name</Label>
                  <Input id="name" value={newExercise.name} onChange={(e) => setNewExercise({ ...newExercise, name: e.target.value })} className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="category" className="text-right">Category</Label>
                  <Input id="category" value={newExercise.category} onChange={(e) => setNewExercise({ ...newExercise, category: e.target.value })} className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="equipment" className="text-right">Equipment</Label>
                  <Input id="equipment" value={newExercise.equipment} onChange={(e) => setNewExercise({ ...newExercise, equipment: e.target.value })} className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="difficulty" className="text-right">Difficulty</Label>
                  <Input id="difficulty" value={newExercise.difficulty} onChange={(e) => setNewExercise({ ...newExercise, difficulty: e.target.value })} className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="description" className="text-right">Description</Label>
                  <Textarea id="description" value={newExercise.description} onChange={(e) => setNewExercise({ ...newExercise, description: e.target.value })} className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="instructions" className="text-right">Instructions</Label>
                  <Textarea id="instructions" value={newExercise.instructions} onChange={(e) => setNewExercise({ ...newExercise, instructions: e.target.value })} className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="musclesWorked" className="text-right">Muscles Worked</Label>
                  <Input id="musclesWorked" value={newExercise.musclesWorked} onChange={(e) => setNewExercise({ ...newExercise, musclesWorked: e.target.value })} className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="videoUrl" className="text-right">Video URL</Label>
                  <Input id="videoUrl" value={newExercise.videoUrl || ""} onChange={(e) => setNewExercise({ ...newExercise, videoUrl: e.target.value })} className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="gifUrl" className="text-right">GIF URL</Label>
                  <Input id="gifUrl" value={newExercise.gifUrl || ""} onChange={(e) => setNewExercise({ ...newExercise, gifUrl: e.target.value })} className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="tips" className="text-right">Tips</Label>
                  <Textarea id="tips" value={newExercise.tips || ""} onChange={(e) => setNewExercise({ ...newExercise, tips: e.target.value })} className="col-span-3" />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" onClick={handleCreateExercise} disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    "Create Exercise"
                  )}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {exercises.map((exercise) => (
            <Link key={exercise.id} href={`/exercises/${exercise.id}`} className="group">
              <Card className="h-full transition-all hover:scale-105 hover:border-primary">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Dumbbell className="h-5 w-5 text-primary" />
                    {exercise.name}
                  </CardTitle>
                  <CardDescription>
                    {exercise.category} | {exercise.equipment}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {exercise.description}
                  </p>
                  <Button
                    className="w-full mt-4 group-hover:bg-primary group-hover:text-primary-foreground bg-transparent"
                    variant="outline"
                  >
                    View Details
                  </Button>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
