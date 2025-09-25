import React, { useEffect, useMemo, useState } from "react";
import { useAuth } from "@/providers/AuthProvider";
import aromas from "@/lib/aromaLibrary.json";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

type MonthChoice = {
  id: string; // e.g. '2025-09'
  label: string; // 'Sep 2025'
  aromaId: string | null;
};

const MONTHS_COUNT = {
  6: 6,
  12: 12,
};

function makeMonths(startDate: Date, count: number): MonthChoice[] {
  const list: MonthChoice[] = [];
  for (let i = 0; i < count; i++) {
    const dt = new Date(startDate.getFullYear(), startDate.getMonth() + i, 1);
    const id = `${dt.getFullYear()}-${String(dt.getMonth() + 1).padStart(2, "0")}`;
    const label = dt.toLocaleString(undefined, { month: "short", year: "numeric" });
    list.push({ id, label, aromaId: null });
  }
  return list;
}

const STORAGE_PREFIX = "eze_subscription_";

export default function SubscriptionManager() {
  const auth = useAuth();
  const { toast } = useToast();
  const userKey = auth.user?.email || "guest";

  const [duration, setDuration] = useState<6 | 12>(6);
  const [startMonth, setStartMonth] = useState<string>(() => {
    const dt = new Date();
    return `${dt.getFullYear()}-${String(dt.getMonth() + 1).padStart(2, "0")}`; // e.g. 2025-09
  });
  const [months, setMonths] = useState<MonthChoice[]>(() => makeMonths(new Date(), MONTHS_COUNT[6]));
  const [loaded, setLoaded] = useState(false);
  const [bulkStartIndex, setBulkStartIndex] = useState<number>(0);
  const [bulkEndIndex, setBulkEndIndex] = useState<number>(0);
  const [bulkAroma, setBulkAroma] = useState<string>("");

  // Deduplicate aroma list by id to avoid duplicate React keys and unexpected behaviour
  const aromaOptions = useMemo(() => {
    const map = new Map<string, any>();
    (aromas as any[]).forEach((a) => {
      if (!a || !a.id) return;
      if (!map.has(a.id)) map.set(a.id, a);
      // if duplicate id encountered, keep the first occurrence
    });
    return Array.from(map.values());
  }, []);

  // Suggestion helper: return top 3 aromas matching family or sectors
  function getSuggestions(selectedId?: string) {
    if (!auth.user) return [];
    // try to match by family of selected aroma, else by company sector keywords (from mock data assumption)
    const selected = aromaOptions.find((a) => a.id === selectedId);
    const suggestions: any[] = [];
    if (selected && selected.family) {
      const sameFamily = aromaOptions.filter((a) => a.family === selected.family && a.id !== selectedId);
      suggestions.push(...sameFamily.slice(0, 3));
    }
    if (suggestions.length < 3) {
      // try matching sectors using user's company info from mock (best effort)
      try {
        // read mock user data to find company type
        // We'll fallback to searching sectors for 'retail' or 'hospitality' in the user's email domain / role
        const sectorCandidate = auth.user?.email?.includes("retail") ? "retail" : null;
        const bySector = aromaOptions.filter((a) => (a.sectors || []).some((s: string) => sectorCandidate ? s.toLowerCase().includes(sectorCandidate) : false));
        suggestions.push(...bySector.slice(0, 3 - suggestions.length));
      } catch (e) {
        // ignore
      }
    }
    // fallback: top available aromas
    if (suggestions.length < 3) suggestions.push(...aromaOptions.slice(0, 3 - suggestions.length));
    return suggestions;
  }

  const storageKey = `${STORAGE_PREFIX}${userKey}`;

  useEffect(() => {
    // load from localStorage if exists
    try {
      const raw = localStorage.getItem(storageKey);
      if (raw) {
        const parsed = JSON.parse(raw);
        setDuration(parsed.duration === 12 ? 12 : 6);
        if (parsed.months && parsed.months.length) {
          setMonths(parsed.months);
          // set startMonth to the first saved month
          setStartMonth(parsed.months[0].id);
        } else {
          setMonths(makeMonths(new Date(), MONTHS_COUNT[parsed.duration || 6]));
        }
      }
    } catch (e) {
      // ignore
    } finally {
      setLoaded(true);
    }
  }, [storageKey]);

  useEffect(() => {
    // recreate months when duration or startMonth changes (preserve existing aroma selections where possible)
    const existingMap = new Map(months.map((m) => [m.id, m.aromaId]));
    // parse startMonth string YYYY-MM
    const [sy, sm] = startMonth.split("-").map((v) => parseInt(v, 10));
    const startDate = !isNaN(sy) && !isNaN(sm) ? new Date(sy, sm - 1, 1) : new Date();
    const newMonths = makeMonths(startDate, MONTHS_COUNT[duration]).map((m) => ({ ...m, aromaId: existingMap.get(m.id) ?? null }));
    setMonths(newMonths);
    // reset bulk selections range
    setBulkStartIndex(0);
    setBulkEndIndex(Math.max(0, newMonths.length - 1));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [duration, startMonth]);

  function handleAromaChange(monthId: string, aromaId: string) {
    setMonths((prev) => prev.map((m) => (m.id === monthId ? { ...m, aromaId } : m)));
  }

  function save() {
    if (!auth.user) {
      toast({ title: "Login required", description: "Please login to save your subscription." });
      return;
    }
    const payload = { duration, months };
    localStorage.setItem(storageKey, JSON.stringify(payload));
    toast({ title: "Subscription saved", description: `Your ${duration}-month subscription has been saved.` });
  }

  function applyBulk() {
    if (!bulkAroma) return;
    const start = Math.min(bulkStartIndex, bulkEndIndex);
    const end = Math.max(bulkStartIndex, bulkEndIndex);
    setMonths((prev) => prev.map((m, idx) => (idx >= start && idx <= end ? { ...m, aromaId: bulkAroma } : m)));
    toast({ title: "Applied", description: `Applied aroma to months ${start + 1}–${end + 1}.` });
  }

  function aromaPrice(aromaId?: string | null) {
    if (!aromaId) return 0;
    const a = aromaOptions.find((x) => x.id === aromaId);
    return (a && (a.price || a.price === 0) ? a.price : 2500);
  }

  const totalCost = months.reduce((sum, m) => sum + aromaPrice(m.aromaId), 0);
  const monthlyAverage = months.length ? Math.round(totalCost / months.length) : 0;

  function cancelSubscription() {
    if (!auth.user) return;
    localStorage.removeItem(storageKey);
    setDuration(6);
    setMonths(makeMonths(new Date(), MONTHS_COUNT[6]));
    toast({ title: "Subscription canceled", description: "Your subscription has been removed." });
  }

  if (!auth.user) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Subscription Manager</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Please login to create or manage subscription plans.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Manage Aroma Subscription</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            <div>
              <Label>Start month</Label>
              <input
                type="month"
                value={startMonth}
                onChange={(e) => setStartMonth(e.target.value)}
                className="mt-1 p-2 rounded-lg border w-full"
              />
            </div>
            <div>
              <Label>Bulk apply range</Label>
              <div className="flex flex-col md:flex-row items-stretch md:items-center md:space-x-2 space-y-2 md:space-y-0 mt-1">
                <select className="p-2 rounded-lg border w-full md:w-auto" value={bulkStartIndex} onChange={(e) => setBulkStartIndex(Number(e.target.value))}>
                  {months.map((m, idx) => (
                    <option key={m.id} value={idx}>{idx + 1}. {m.label}</option>
                  ))}
                </select>
                <span className="hidden md:inline">192</span>
                <select className="p-2 rounded-lg border w-full md:w-auto" value={bulkEndIndex} onChange={(e) => setBulkEndIndex(Number(e.target.value))}>
                  {months.map((m, idx) => (
                    <option key={m.id} value={idx}>{idx + 1}. {m.label}</option>
                  ))}
                </select>
                <select className="p-2 rounded-lg border flex-1 w-full" value={bulkAroma} onChange={(e) => setBulkAroma(e.target.value)}>
                  <option value="">Select aroma</option>
                  {aromaOptions.map((a) => (
                    <option key={a.id} value={a.id}>{a.name}</option>
                  ))}
                </select>
                <div className="md:ml-2">
                  <Button size="sm" onClick={applyBulk}>Apply</Button>
                </div>
              </div>
            </div>
            <div>
              <Label>Cost summary</Label>
              <div className="mt-1 text-sm space-y-1 break-words">
                <div className="truncate">Total estimated: <span className="font-medium">9{totalCost.toLocaleString()}</span></div>
                <div className="truncate">Monthly avg: <span className="font-medium">9{monthlyAverage.toLocaleString()}</span></div>
                <div className="truncate">Selected months: <span className="font-medium">{months.length}</span></div>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Label>Duration</Label>
            <div className="flex items-center space-x-2">
              <label className={`px-3 py-2 rounded-lg border ${duration === 6 ? "bg-primary/10" : ""}`}>
                <input type="radio" name="duration" checked={duration === 6} onChange={() => setDuration(6)} className="mr-2" /> 6 months
              </label>
              <label className={`px-3 py-2 rounded-lg border ${duration === 12 ? "bg-primary/10" : ""}`}>
                <input type="radio" name="duration" checked={duration === 12} onChange={() => setDuration(12)} className="mr-2" /> 12 months
              </label>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {months.map((m) => (
              <div key={m.id} className="p-3 rounded-lg border bg-background/50">
                <div className="flex items-center justify-between mb-2">
                  <div className="font-medium">{m.label}</div>
                </div>
                <div className="space-y-2">
                  <Select value={m.aromaId ?? ""} onValueChange={(val) => handleAromaChange(m.id, val || null)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select aroma" />
                    </SelectTrigger>
                      <SelectContent>
                        {/* Don't render a SelectItem with empty string value - Radix requires non-empty values.
                            Use the placeholder in SelectValue to show 'Select aroma' when value is empty. */}
                        {aromaOptions.map((a) => (
                          <SelectItem key={a.id} value={a.id}>{a.name}</SelectItem>
                        ))}
                      </SelectContent>
                  </Select>

                  {m.aromaId && (
                    <div className="text-sm text-muted-foreground">
                      <div>Suggestions:</div>
                      <div className="flex space-x-2 mt-2">
                        {getSuggestions(m.aromaId).map((s) => (
                          <Button key={s.id} size="sm" variant="outline" onClick={() => handleAromaChange(m.id, s.id)}>
                            {s.name}
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center space-x-2">
            <Button variant="premium" onClick={save}>Save Subscription</Button>
            <Button variant="outline" onClick={cancelSubscription}>Cancel Subscription</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
