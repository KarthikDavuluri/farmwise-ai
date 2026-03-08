import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { DashboardHeader } from "@/components/DashboardHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/hooks/use-toast";
import { Plus, Trash2, Edit2, Save, X, Users, Wheat, Store, DollarSign, LogOut } from "lucide-react";

export default function AdminDashboard() {
  const { signOut, profile } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-accent">
              <Wheat className="h-6 w-6 text-accent-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold">FarmPrice AI — Admin Panel</h1>
              <p className="text-xs opacity-80">Welcome, {profile?.name || "Admin"}</p>
            </div>
          </div>
          <Button variant="secondary" size="sm" onClick={signOut} className="gap-1">
            <LogOut className="h-4 w-4" /> Logout
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <Tabs defaultValue="crops" className="space-y-4">
          <TabsList className="flex flex-wrap h-auto gap-1 bg-secondary p-1">
            <TabsTrigger value="crops" className="gap-1.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Wheat className="h-4 w-4" /> Crops
            </TabsTrigger>
            <TabsTrigger value="markets" className="gap-1.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Store className="h-4 w-4" /> Markets
            </TabsTrigger>
            <TabsTrigger value="prices" className="gap-1.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <DollarSign className="h-4 w-4" /> Prices
            </TabsTrigger>
            <TabsTrigger value="users" className="gap-1.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Users className="h-4 w-4" /> Users
            </TabsTrigger>
          </TabsList>

          <TabsContent value="crops"><CropsManager /></TabsContent>
          <TabsContent value="markets"><MarketsManager /></TabsContent>
          <TabsContent value="prices"><PricesManager /></TabsContent>
          <TabsContent value="users"><UsersManager /></TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

function CropsManager() {
  const [crops, setCrops] = useState<any[]>([]);
  const [newCrop, setNewCrop] = useState("");
  const [editId, setEditId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");

  const load = async () => {
    const { data } = await supabase.from("crops").select("*").order("crop_name");
    if (data) setCrops(data);
  };

  useEffect(() => { load(); }, []);

  const add = async () => {
    if (!newCrop.trim()) return;
    const { error } = await supabase.from("crops").insert({ crop_name: newCrop.trim() });
    if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
    else { setNewCrop(""); load(); toast({ title: "Crop added" }); }
  };

  const save = async (id: string) => {
    await supabase.from("crops").update({ crop_name: editName }).eq("id", id);
    setEditId(null); load(); toast({ title: "Crop updated" });
  };

  const remove = async (id: string) => {
    await supabase.from("crops").delete().eq("id", id);
    load(); toast({ title: "Crop deleted" });
  };

  return (
    <Card className="border-border">
      <CardHeader><CardTitle className="text-base">Manage Crops</CardTitle></CardHeader>
      <CardContent className="space-y-3">
        <div className="flex gap-2">
          <Input placeholder="New crop name" value={newCrop} onChange={e => setNewCrop(e.target.value)} />
          <Button onClick={add} size="sm" className="gap-1"><Plus className="h-4 w-4" /> Add</Button>
        </div>
        <div className="rounded-lg border border-border overflow-auto max-h-[400px]">
          <table className="w-full text-sm">
            <thead><tr className="bg-secondary"><th className="text-left p-2">Crop Name</th><th className="text-center p-2 w-32">Actions</th></tr></thead>
            <tbody>
              {crops.map(c => (
                <tr key={c.id} className="border-t border-border">
                  <td className="p-2">
                    {editId === c.id ? <Input value={editName} onChange={e => setEditName(e.target.value)} className="h-8" /> : c.crop_name}
                  </td>
                  <td className="p-2 text-center">
                    {editId === c.id ? (
                      <>
                        <Button size="sm" variant="ghost" onClick={() => save(c.id)}><Save className="h-3 w-3" /></Button>
                        <Button size="sm" variant="ghost" onClick={() => setEditId(null)}><X className="h-3 w-3" /></Button>
                      </>
                    ) : (
                      <>
                        <Button size="sm" variant="ghost" onClick={() => { setEditId(c.id); setEditName(c.crop_name); }}><Edit2 className="h-3 w-3" /></Button>
                        <Button size="sm" variant="ghost" onClick={() => remove(c.id)}><Trash2 className="h-3 w-3 text-destructive" /></Button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}

function MarketsManager() {
  const [markets, setMarkets] = useState<any[]>([]);
  const [form, setForm] = useState({ market_name: "", state: "", location: "" });
  const [showAdd, setShowAdd] = useState(false);

  const load = async () => {
    const { data } = await supabase.from("markets").select("*").order("market_name");
    if (data) setMarkets(data);
  };

  useEffect(() => { load(); }, []);

  const add = async () => {
    if (!form.market_name || !form.state) return;
    await supabase.from("markets").insert(form);
    setForm({ market_name: "", state: "", location: "" }); setShowAdd(false); load();
    toast({ title: "Market added" });
  };

  const remove = async (id: string) => {
    await supabase.from("markets").delete().eq("id", id);
    load(); toast({ title: "Market deleted" });
  };

  return (
    <Card className="border-border">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-base">Manage Markets</CardTitle>
        <Button size="sm" onClick={() => setShowAdd(!showAdd)} className="gap-1"><Plus className="h-4 w-4" /> Add</Button>
      </CardHeader>
      <CardContent className="space-y-3">
        {showAdd && (
          <div className="grid grid-cols-3 gap-2 p-3 rounded-lg bg-secondary">
            <Input placeholder="Market Name" value={form.market_name} onChange={e => setForm({ ...form, market_name: e.target.value })} />
            <Input placeholder="State" value={form.state} onChange={e => setForm({ ...form, state: e.target.value })} />
            <Input placeholder="Location" value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} />
            <div className="col-span-3 flex gap-2">
              <Button size="sm" onClick={add}><Save className="h-3 w-3 mr-1" /> Save</Button>
              <Button size="sm" variant="outline" onClick={() => setShowAdd(false)}><X className="h-3 w-3" /></Button>
            </div>
          </div>
        )}
        <div className="rounded-lg border border-border overflow-auto max-h-[400px]">
          <table className="w-full text-sm">
            <thead><tr className="bg-secondary"><th className="text-left p-2">Market</th><th className="text-left p-2">State</th><th className="text-left p-2">Location</th><th className="text-center p-2 w-20">Del</th></tr></thead>
            <tbody>
              {markets.map(m => (
                <tr key={m.id} className="border-t border-border">
                  <td className="p-2">{m.market_name}</td>
                  <td className="p-2 text-muted-foreground">{m.state}</td>
                  <td className="p-2 text-muted-foreground">{m.location}</td>
                  <td className="p-2 text-center"><Button size="sm" variant="ghost" onClick={() => remove(m.id)}><Trash2 className="h-3 w-3 text-destructive" /></Button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}

function PricesManager() {
  const [prices, setPrices] = useState<any[]>([]);
  const [crops, setCrops] = useState<any[]>([]);
  const [markets, setMarkets] = useState<any[]>([]);
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ crop_id: "", market_id: "", min_price: 0, max_price: 0, avg_price: 0, date: new Date().toISOString().split("T")[0] });

  const load = async () => {
    const [{ data: p }, { data: c }, { data: m }] = await Promise.all([
      supabase.from("prices").select("*, crops(crop_name), markets(market_name, state)").order("date", { ascending: false }).limit(100),
      supabase.from("crops").select("*").order("crop_name"),
      supabase.from("markets").select("*").order("market_name"),
    ]);
    if (p) setPrices(p);
    if (c) setCrops(c);
    if (m) setMarkets(m);
  };

  useEffect(() => { load(); }, []);

  const add = async () => {
    if (!form.crop_id || !form.market_id) return;
    await supabase.from("prices").insert(form);
    setShowAdd(false); load(); toast({ title: "Price added" });
  };

  const remove = async (id: string) => {
    await supabase.from("prices").delete().eq("id", id);
    load(); toast({ title: "Price deleted" });
  };

  return (
    <Card className="border-border">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-base">Manage Prices</CardTitle>
        <Button size="sm" onClick={() => setShowAdd(!showAdd)} className="gap-1"><Plus className="h-4 w-4" /> Add</Button>
      </CardHeader>
      <CardContent className="space-y-3">
        {showAdd && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 p-3 rounded-lg bg-secondary">
            <select className="rounded-md border border-input bg-background px-3 py-2 text-sm" value={form.crop_id} onChange={e => setForm({ ...form, crop_id: e.target.value })}>
              <option value="">Select Crop</option>
              {crops.map(c => <option key={c.id} value={c.id}>{c.crop_name}</option>)}
            </select>
            <select className="rounded-md border border-input bg-background px-3 py-2 text-sm" value={form.market_id} onChange={e => setForm({ ...form, market_id: e.target.value })}>
              <option value="">Select Market</option>
              {markets.map(m => <option key={m.id} value={m.id}>{m.market_name}</option>)}
            </select>
            <Input placeholder="Min ₹" type="number" value={form.min_price || ""} onChange={e => setForm({ ...form, min_price: +e.target.value })} />
            <Input placeholder="Max ₹" type="number" value={form.max_price || ""} onChange={e => setForm({ ...form, max_price: +e.target.value })} />
            <Input placeholder="Avg ₹" type="number" value={form.avg_price || ""} onChange={e => setForm({ ...form, avg_price: +e.target.value })} />
            <Input type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} />
            <div className="col-span-2 md:col-span-3 flex gap-2">
              <Button size="sm" onClick={add}><Save className="h-3 w-3 mr-1" /> Save</Button>
              <Button size="sm" variant="outline" onClick={() => setShowAdd(false)}><X className="h-3 w-3" /></Button>
            </div>
          </div>
        )}
        <div className="rounded-lg border border-border overflow-auto max-h-[400px]">
          <table className="w-full text-sm">
            <thead><tr className="bg-secondary"><th className="text-left p-2">Crop</th><th className="text-left p-2">Market</th><th className="text-right p-2">Min₹</th><th className="text-right p-2">Max₹</th><th className="text-right p-2">Avg₹</th><th className="text-left p-2">Date</th><th className="w-16"></th></tr></thead>
            <tbody>
              {prices.map(p => (
                <tr key={p.id} className="border-t border-border">
                  <td className="p-2">{(p.crops as any)?.crop_name}</td>
                  <td className="p-2">{(p.markets as any)?.market_name}</td>
                  <td className="p-2 text-right">₹{p.min_price}</td>
                  <td className="p-2 text-right">₹{p.max_price}</td>
                  <td className="p-2 text-right">₹{p.avg_price}</td>
                  <td className="p-2 text-muted-foreground">{p.date}</td>
                  <td className="p-2"><Button size="sm" variant="ghost" onClick={() => remove(p.id)}><Trash2 className="h-3 w-3 text-destructive" /></Button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}

function UsersManager() {
  const [users, setUsers] = useState<any[]>([]);

  const load = async () => {
    const { data } = await supabase.from("profiles").select("*, user_roles(role)").order("created_at", { ascending: false });
    if (data) setUsers(data);
  };

  useEffect(() => { load(); }, []);

  return (
    <Card className="border-border">
      <CardHeader><CardTitle className="text-base">Registered Farmers</CardTitle></CardHeader>
      <CardContent>
        <div className="rounded-lg border border-border overflow-auto max-h-[400px]">
          <table className="w-full text-sm">
            <thead><tr className="bg-secondary"><th className="text-left p-2">Name</th><th className="text-left p-2">Phone</th><th className="text-left p-2">State</th><th className="text-left p-2">Language</th><th className="text-left p-2">Role</th></tr></thead>
            <tbody>
              {users.map(u => (
                <tr key={u.id} className="border-t border-border">
                  <td className="p-2">{u.name}</td>
                  <td className="p-2 text-muted-foreground">{u.phone || "—"}</td>
                  <td className="p-2 text-muted-foreground">{u.state || "—"}</td>
                  <td className="p-2 text-muted-foreground">{u.language}</td>
                  <td className="p-2">{(u.user_roles as any[])?.[0]?.role || "farmer"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
