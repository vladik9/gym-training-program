"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Dumbbell, Edit, Trash2, Loader2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Exercise, NewExercise } from "@/lib/db/schema";
import { Skeleton } from "@/components/ui/skeleton";

interface ExerciseDetailsPageProps {
  params: { id: string; };
}

export default function ExerciseDetailsPage({ params }: ExerciseDetailsPageProps) {
  const router = useRouter();
  const { id } = params;
  const [initialExercise, setInitialExercise] = useState<Exercise | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [editedExercise, setEditedExercise] = useState<Partial<NewExercise>>({});
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // New loading state for initial fetch

  useEffect(() => {
    async function fetchExercise() {
      if (id) {
        setIsLoading(true); // Set loading to true before fetch
        try {
          const res = await fetch(`/api/exercises/${id}`);
          if (!res.ok) {
            throw new Error("Failed to fetch exercise");
          }
          const data = await res.json();
          setInitialExercise(data);
          setEditedExercise(data);
        } catch (error) {
          toast.error("Failed to load exercise.");
          console.error("Error fetching exercise:", error);
        } finally {
          setIsLoading(false); // Set loading to false after fetch
        }
      }
    }
    fetchExercise();
  }, [id]);

  async function handleUpdateExercise() {
    setLoading(true);
    try {
      const res = await fetch(`/api/exercises/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editedExercise),
      });
      if (!res.ok) {
        throw new Error("Failed to update exercise");
      }
      toast.success("Exercise updated successfully!");
      setIsEditDialogOpen(false);
      router.refresh();
    } catch (error) {
      toast.error("Failed to update exercise.");
      console.error("Error updating exercise:", error);
    } finally {
      setLoading(false);
    }
  }

  async function handleDeleteExercise() {
    setLoading(true);
    try {
      const res = await fetch(`/api/exercises/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        throw new Error("Failed to delete exercise");
      }
      toast.success("Exercise deleted successfully!");
      setIsDeleteDialogOpen(false);
      router.push("/exercises");
    } catch (error) {
      toast.error("Failed to delete exercise.");
      console.error("Error deleting exercise:", error);
    } finally {
      setLoading(false);
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }

  if (!initialExercise) {
    return (
      <div className="min-h-screen flex items-center justify-center text-muted-foreground">
        Exercise not found.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-end gap-4 mb-8">
          <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Edit className="mr-2 h-4 w-4" />
                Edit Exercise
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Edit Exercise</DialogTitle>
                <DialogDescription>Update the details for this exercise.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">Name</Label>
                  <Input id="name" value={editedExercise.name || ""} onChange={(e) => setEditedExercise({ ...editedExercise, name: e.target.value })} className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="category" className="text-right">Category</Label>
                  <Input id="category" value={editedExercise.category || ""} onChange={(e) => setEditedExercise({ ...editedExercise, category: e.target.value })} className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="equipment" className="text-right">Equipment</Label>
                  <Input id="equipment" value={editedExercise.equipment || ""} onChange={(e) => setEditedExercise({ ...editedExercise, equipment: e.target.value })} className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="difficulty" className="text-right">Difficulty</Label>
                  <Input id="difficulty" value={editedExercise.difficulty || ""} onChange={(e) => setEditedExercise({ ...editedExercise, difficulty: e.target.value })} className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="description" className="text-right">Description</Label>
                  <Textarea id="description" value={editedExercise.description || ""} onChange={(e) => setEditedExercise({ ...editedExercise, description: e.target.value })} className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="instructions" className="text-right">Instructions</Label>
                  <Textarea id="instructions" value={editedExercise.instructions || ""} onChange={(e) => setEditedExercise({ ...editedExercise, instructions: e.target.value })} className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="musclesWorked" className="text-right">Muscles Worked</Label>
                  <Input id="musclesWorked" value={editedExercise.musclesWorked || ""} onChange={(e) => setEditedExercise({ ...editedExercise, musclesWorked: e.target.value })} className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="videoUrl" className="text-right">Video URL</Label>
                  <Input id="videoUrl" value={editedExercise.videoUrl || ""} onChange={(e) => setEditedExercise({ ...editedExercise, videoUrl: e.target.value })} className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="gifUrl" className="text-right">GIF URL</Label>
                  <Input id="gifUrl" value={editedExercise.gifUrl || ""} onChange={(e) => setEditedExercise({ ...editedExercise, gifUrl: e.target.value })} className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="tips" className="text-right">Tips</Label>
                  <Textarea id="tips" value={editedExercise.tips || ""} onChange={(e) => setEditedExercise({ ...editedExercise, tips: e.target.value })} className="col-span-3" />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" onClick={handleUpdateExercise} disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Updating...
                    </>
                  ) : (
                    "Save Changes"
                  )}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="destructive">
                <Trash2 className="mr-2 h-4 w-4" />
                Delete Exercise
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Are you absolutely sure?</DialogTitle>
                <DialogDescription>
                  This action cannot be undone. This will permanently delete the exercise from the database.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>Cancel</Button>
                <Button variant="destructive" onClick={handleDeleteExercise} disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Deleting...
                    </>
                  ) : (
                    "Delete"
                  )}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div >

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-4xl font-bold flex items-center gap-3">
              <Dumbbell className="h-8 w-8 text-primary" />
              {initialExercise.name}
            </CardTitle>
            <CardDescription className="text-lg mt-2">
              Category: {initialExercise.category} | Equipment: {initialExercise.equipment} | Difficulty: {initialExercise.difficulty}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {initialExercise.gifUrl && (
              <div className="w-full rounded-lg overflow-hidden">
                <Image
                  src={initialExercise.gifUrl}
                  alt={initialExercise.name}
                  width={600}
                  height={400}
                  layout="responsive"
                  objectFit="contain"
                  className="rounded-lg"
                />
              </div>
            )}

            {initialExercise.videoUrl && (
              <div className="w-full rounded-lg overflow-hidden">
                <iframe
                  className="w-full aspect-video rounded-lg"
                  src={initialExercise.videoUrl}
                  title={`${initialExercise.name} video`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            )}

            <div>
              <h3 className="text-2xl font-semibold mb-2">Description</h3>
              <p className="text-muted-foreground">{initialExercise.description}</p>
            </div>

            <div>
              <h3 className="text-2xl font-semibold mb-2">Instructions</h3>
              <p className="text-muted-foreground">{initialExercise.instructions}</p>
            </div>

            <div>
              <h3 className="text-2xl font-semibold mb-2">Muscles Worked</h3>
              <p className="text-muted-foreground">{initialExercise.musclesWorked}</p>
            </div>

            {initialExercise.tips && (
              <div>
                <h3 className="text-2xl font-semibold mb-2">Tips</h3>
                <p className="text-muted-foreground">{initialExercise.tips}</p>
              </div>
            )}
          </CardContent>
        </Card >
      </div >
    </div >
  );
}
