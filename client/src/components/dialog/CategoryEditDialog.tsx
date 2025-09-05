import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface CategoryEditDialogProps {
  open: boolean;
  onOpenChange: (val: boolean) => void;
  title: string;
  defaultValue?: string;
  onSave: (value: string) => void;
}

export function CategoryEditDialog({ open, onOpenChange, title, defaultValue = "", onSave }: CategoryEditDialogProps) {
  const [value, setValue] = useState(defaultValue);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div className="space-y-2">
          <Input value={value} onChange={(e) => setValue(e.target.value)} />
        </div>
        <DialogFooter>
          <Button onClick={() => onOpenChange(false)} variant="outline">Cancel</Button>
          <Button onClick={() => { onSave(value); onOpenChange(false); }}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
