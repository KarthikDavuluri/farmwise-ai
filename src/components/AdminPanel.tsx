import { useState } from "react";
import { Plus, Trash2, Edit2, Save, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cropPrices as initialData, type CropPrice } from "@/data/cropData";
import { toast } from "@/hooks/use-toast";

export function AdminPanel() {
  const [data, setData] = useState<CropPrice[]>([...initialData]);
  const [editing, setEditing] = useState<number | null>(null);
  const [editRow, setEditRow] = useState<CropPrice | null>(null);
  const [showAdd, setShowAdd] = useState(false);
  const [newRow, setNewRow] = useState<CropPrice>({
    crop_name: "", market: "", state: "", min_price: 0, max_price: 0, avg_price: 0, date: new Date().toISOString().split("T")[0],
  });

  const handleAdd = () => {
    if (!newRow.crop_name || !newRow.market) {
      toast({ title: "Missing fields", description: "Crop name and market are required", variant: "destructive" });
      return;
    }
    setData([...data, { ...newRow }]);
    setShowAdd(false);
    setNewRow({ crop_name: "", market: "", state: "", min_price: 0, max_price: 0, avg_price: 0, date: new Date().toISOString().split("T")[0] });
    toast({ title: "Added", description: `${newRow.crop_name} in ${newRow.market} added` });
  };

  const handleDelete = (index: number) => {
    const item = data[index];
    setData(data.filter((_, i) => i !== index));
    toast({ title: "Deleted", description: `${item.crop_name} in ${item.market} removed` });
  };

  const startEdit = (index: number) => {
    setEditing(index);
    setEditRow({ ...data[index] });
  };

  const saveEdit = () => {
    if (editing === null || !editRow) return;
    const updated = [...data];
    updated[editing] = editRow;
    setData(updated);
    setEditing(null);
    setEditRow(null);
    toast({ title: "Updated", description: "Price data updated successfully" });
  };

  return (
    <Card className="border-border">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-base">Admin – Manage Crop Prices</CardTitle>
        <Button size="sm" onClick={() => setShowAdd(!showAdd)} className="gap-1">
          <Plus className="h-4 w-4" /> Add Crop
        </Button>
      </CardHeader>
      <CardContent>
        {showAdd && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4 p-3 rounded-lg bg-secondary">
            <Input placeholder="Crop Name" value={newRow.crop_name} onChange={(e) => setNewRow({ ...newRow, crop_name: e.target.value })} />
            <Input placeholder="Market" value={newRow.market} onChange={(e) => setNewRow({ ...newRow, market: e.target.value })} />
            <Input placeholder="State" value={newRow.state} onChange={(e) => setNewRow({ ...newRow, state: e.target.value })} />
            <Input placeholder="Min ₹" type="number" value={newRow.min_price || ""} onChange={(e) => setNewRow({ ...newRow, min_price: +e.target.value })} />
            <Input placeholder="Max ₹" type="number" value={newRow.max_price || ""} onChange={(e) => setNewRow({ ...newRow, max_price: +e.target.value })} />
            <Input placeholder="Avg ₹" type="number" value={newRow.avg_price || ""} onChange={(e) => setNewRow({ ...newRow, avg_price: +e.target.value })} />
            <div className="col-span-2 flex gap-2">
              <Button size="sm" onClick={handleAdd} className="gap-1"><Save className="h-3 w-3" /> Save</Button>
              <Button size="sm" variant="outline" onClick={() => setShowAdd(false)}><X className="h-3 w-3" /></Button>
            </div>
          </div>
        )}

        <div className="rounded-lg border border-border overflow-auto max-h-[400px]">
          <table className="w-full text-sm">
            <thead className="sticky top-0">
              <tr className="bg-secondary">
                <th className="text-left p-2 font-semibold">Crop</th>
                <th className="text-left p-2 font-semibold">Market</th>
                <th className="text-left p-2 font-semibold">State</th>
                <th className="text-right p-2 font-semibold">Min ₹</th>
                <th className="text-right p-2 font-semibold">Max ₹</th>
                <th className="text-right p-2 font-semibold">Avg ₹</th>
                <th className="text-center p-2 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((r, i) => (
                <tr key={i} className="border-t border-border">
                  {editing === i && editRow ? (
                    <>
                      <td className="p-1"><Input value={editRow.crop_name} onChange={(e) => setEditRow({ ...editRow, crop_name: e.target.value })} className="h-8 text-sm" /></td>
                      <td className="p-1"><Input value={editRow.market} onChange={(e) => setEditRow({ ...editRow, market: e.target.value })} className="h-8 text-sm" /></td>
                      <td className="p-1"><Input value={editRow.state} onChange={(e) => setEditRow({ ...editRow, state: e.target.value })} className="h-8 text-sm" /></td>
                      <td className="p-1"><Input type="number" value={editRow.min_price} onChange={(e) => setEditRow({ ...editRow, min_price: +e.target.value })} className="h-8 text-sm text-right" /></td>
                      <td className="p-1"><Input type="number" value={editRow.max_price} onChange={(e) => setEditRow({ ...editRow, max_price: +e.target.value })} className="h-8 text-sm text-right" /></td>
                      <td className="p-1"><Input type="number" value={editRow.avg_price} onChange={(e) => setEditRow({ ...editRow, avg_price: +e.target.value })} className="h-8 text-sm text-right" /></td>
                      <td className="p-1 text-center">
                        <Button size="sm" variant="ghost" onClick={saveEdit}><Save className="h-3 w-3" /></Button>
                        <Button size="sm" variant="ghost" onClick={() => { setEditing(null); setEditRow(null); }}><X className="h-3 w-3" /></Button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="p-2">{r.crop_name}</td>
                      <td className="p-2">{r.market}</td>
                      <td className="p-2 text-muted-foreground">{r.state}</td>
                      <td className="p-2 text-right">₹{r.min_price}</td>
                      <td className="p-2 text-right">₹{r.max_price}</td>
                      <td className="p-2 text-right">₹{r.avg_price}</td>
                      <td className="p-2 text-center">
                        <Button size="sm" variant="ghost" onClick={() => startEdit(i)}><Edit2 className="h-3 w-3" /></Button>
                        <Button size="sm" variant="ghost" onClick={() => handleDelete(i)}><Trash2 className="h-3 w-3 text-destructive" /></Button>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
