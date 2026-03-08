import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  const supabaseAdmin = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
  );

  // Verify caller is admin
  const authHeader = req.headers.get("Authorization")!;
  const token = authHeader.replace("Bearer ", "");
  const { data: { user: caller } } = await supabaseAdmin.auth.getUser(token);
  if (!caller) return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401, headers: corsHeaders });

  const { data: isAdmin } = await supabaseAdmin.rpc("has_role", { _user_id: caller.id, _role: "admin" });
  if (!isAdmin) return new Response(JSON.stringify({ error: "Forbidden" }), { status: 403, headers: corsHeaders });

  const url = new URL(req.url);
  const action = url.searchParams.get("action");

  // LIST users
  if (req.method === "GET" && action === "list") {
    const { data: { users }, error } = await supabaseAdmin.auth.admin.listUsers({ perPage: 1000 });
    if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500, headers: corsHeaders });

    const { data: profiles } = await supabaseAdmin.from("profiles").select("user_id, name, phone, state, language, created_at");
    const { data: roles } = await supabaseAdmin.from("user_roles").select("user_id, role");

    const profileMap = Object.fromEntries((profiles || []).map(p => [p.user_id, p]));
    const roleMap = Object.fromEntries((roles || []).map(r => [r.user_id, r.role]));

    const result = users.map(u => ({
      id: u.id,
      email: u.email,
      name: profileMap[u.id]?.name || "",
      phone: profileMap[u.id]?.phone || "",
      state: profileMap[u.id]?.state || "",
      language: profileMap[u.id]?.language || "English",
      role: roleMap[u.id] || "farmer",
      created_at: profileMap[u.id]?.created_at || u.created_at,
    }));

    return new Response(JSON.stringify(result), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }

  // PROMOTE to admin
  if (req.method === "POST" && action === "promote") {
    const { user_id } = await req.json();
    await supabaseAdmin.from("user_roles").update({ role: "admin" }).eq("user_id", user_id);
    return new Response(JSON.stringify({ success: true }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }

  // DELETE user
  if (req.method === "POST" && action === "delete") {
    const { user_id } = await req.json();
    if (user_id === caller.id) return new Response(JSON.stringify({ error: "Cannot delete yourself" }), { status: 400, headers: corsHeaders });
    await supabaseAdmin.from("user_roles").delete().eq("user_id", user_id);
    await supabaseAdmin.from("profiles").delete().eq("user_id", user_id);
    await supabaseAdmin.auth.admin.deleteUser(user_id);
    return new Response(JSON.stringify({ success: true }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }

  return new Response(JSON.stringify({ error: "Unknown action" }), { status: 400, headers: corsHeaders });
});
