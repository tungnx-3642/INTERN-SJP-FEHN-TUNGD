"use client";

import { useState } from "react";
import { Category, Subcategory } from "@/api/categoryApi";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Pencil, Trash } from "lucide-react";
import {
  useCreateSubcategory,
  useUpdateCategory,
  useDeleteCategory,
  useUpdateSubcategory,
  useDeleteSubcategory,
} from "@/hooks/useCategory";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { CategoryEditDialog } from "@/components/dialog/CategoryEditDialog";

export default function CategoryCard({ category }: { category: Category }) {
  const queryClient = useQueryClient();
  const [openCategoryDialog, setOpenCategoryDialog] = useState(false);
  const [openSubDialog, setOpenSubDialog] = useState(false);
  const [selectedSub, setSelectedSub] = useState<Subcategory | null>(null);
  const [categoryName, setCategoryName] = useState(category.name);
  const [subName, setSubName] = useState("");

  const handleCallHookSuccess = () => {
    toast.success("Cập nhật thành công");
    queryClient.invalidateQueries({ queryKey: ["categories"] });
  };

  const updateCategory = useUpdateCategory({
    onSuccess: handleCallHookSuccess,
  });
  const deleteCategory = useDeleteCategory({
    onSuccess: handleCallHookSuccess,
  });
  const createSub = useCreateSubcategory({
    onSuccess: handleCallHookSuccess,
  });
  const updateSub = useUpdateSubcategory({
    onSuccess: handleCallHookSuccess,
  });
  const deleteSub = useDeleteSubcategory({
    onSuccess: handleCallHookSuccess,
  });

  return (
    <Card className="shadow-md flex flex-col justify-between">
      <CardContent className="p-4 space-y-3">
        <div className="flex justify-between items-center mb-3">
          <h2 className="font-semibold">{category.name}</h2>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setCategoryName(category.name);
                setOpenCategoryDialog(true);
              }}
            >
              <Pencil className="w-4 h-4" />
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => deleteCategory.mutate(category.id)}
            >
              <Trash className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {category.subcategories && category.subcategories.length > 0 ? (
          <ul className="space-y-3 mt-3">
            {category.subcategories.map((sub) => (
              <li
                key={sub.id}
                className="flex items-center justify-between text-sm"
              >
                <span>{sub.name}</span>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-6 w-6"
                    onClick={() => {
                      setSelectedSub(sub);
                      setSubName(sub.name);
                      setOpenSubDialog(true);
                    }}
                  >
                    <Pencil className="w-3 h-3" />
                  </Button>
                  <Button
                    variant="destructive"
                    size="icon"
                    className="h-6 w-6"
                    onClick={() => deleteSub.mutate(sub.id)}
                  >
                    <Trash className="w-3 h-3" />
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-gray-500 mt-3">No subcategories</p>
        )}
      </CardContent>

      <CardFooter>
        <Button
          variant="ghost"
          className="w-full"
          size="sm"
          onClick={() => {
            setSelectedSub(null);
            setSubName("");
            setOpenSubDialog(true);
          }}
        >
          <Plus className="w-4 h-4 mr-2" /> Add Subcategory
        </Button>
      </CardFooter>

      <CategoryEditDialog
        open={openCategoryDialog}
        onOpenChange={setOpenCategoryDialog}
        title="Edit Category"
        defaultValue={categoryName}
        onSave={(val) =>
          updateCategory.mutate({ id: category.id, data: { name: val } })
        }
      />

      <CategoryEditDialog
        open={openSubDialog}
        onOpenChange={setOpenSubDialog}
        title={selectedSub ? "Edit Subcategory" : "Add Subcategory"}
        defaultValue={subName}
        onSave={(val) => {
          if (selectedSub)
            updateSub.mutate({ id: selectedSub.id, data: { name: val } });
          else createSub.mutate({ name: val, categoryId: category.id });
        }}
      />
    </Card>
  );
}
