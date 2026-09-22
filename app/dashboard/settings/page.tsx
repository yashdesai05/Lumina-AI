"use client";

import { useState } from "react";
import {
  Key,
  Shield,
  Users,
  CreditCard,
  Sliders,
  Check,
  Eye,
  EyeOff,
  Plus,
  Trash2,
  Sparkles,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { GlassCard } from "@/components/ui/GlassCard";
import { cn } from "@/lib/utils";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<"api" | "models" | "team" | "billing">("api");
  const [showKey, setShowKey] = useState<Record<string, boolean>>({});
  const [saved, setSaved] = useState(false);

  // Form states
  const [openAIKey, setOpenAIKey] = useState("sk-proj-902384029482093840294823904");
  const [anthropicKey, setAnthropicKey] = useState("sk-ant-api03-9823409823049283049");
  const [geminiKey, setGeminiKey] = useState("AIzaSyB983274982374982374928374");
  const [groqKey, setGroqKey] = useState("");

  const [defaultModel, setDefaultModel] = useState("gpt-4o");
  const [temperature, setTemperature] = useState(0.7);
  const [systemPrompt, setSystemPrompt] = useState(
    "You are Lumina AI, a helpful, context-aware executive AI assistant designed for high-performance software engineering and product workflows."
  );

  const toggleShowKey = (provider: string) => {
    setShowKey((prev) => ({ ...prev, [provider]: !prev[provider] }));
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="flex flex-1 flex-col overflow-y-auto">
      {/* Top Bar */}
      <header className="flex h-16 shrink-0 items-center justify-between border-b border-white/[0.06] bg-background/80 px-6 backdrop-blur-xl">
        <h1 className="text-base font-semibold text-foreground">Workspace Settings</h1>
        <Button size="sm" onClick={handleSave} className="flex items-center gap-2">
          {saved ? <Check className="h-3.5 w-3.5" /> : null}
          {saved ? "Saved Successfully" : "Save Changes"}
        </Button>
      </header>

      {/* Main Content */}
      <div className="mx-auto w-full max-w-5xl space-y-8 p-6 lg:p-8">
        {/* Navigation Tabs */}
        <div className="flex border-b border-white/[0.08] pb-1 gap-2">
          {[
            { id: "api", label: "API Keys", icon: Key },
            { id: "models", label: "Model Parameters", icon: Sliders },
            { id: "team", label: "Team & Access", icon: Users },
            { id: "billing", label: "Billing & Usage", icon: CreditCard },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={cn(
                "flex items-center gap-2 border-b-2 px-4 py-2.5 text-sm font-medium transition-all -mb-[5px]",
                activeTab === tab.id
                  ? "border-primary text-foreground"
                  : "border-transparent text-muted hover:text-foreground"
              )}
            >
              <tab.icon className="h-4 w-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab 1: API Keys */}
        {activeTab === "api" && (
          <div className="space-y-6">
            <div>
              <h2 className="text-base font-semibold text-foreground">BYOK (Bring Your Own Key)</h2>
              <p className="mt-1 text-xs text-muted">
                Your keys are encrypted with AES-256 before storage and only sent to model providers for your direct requests.
              </p>
            </div>

            <div className="space-y-4">
              {[
                {
                  id: "openai",
                  name: "OpenAI API Key",
                  val: openAIKey,
                  setter: setOpenAIKey,
                  placeholder: "sk-...",
                },
                {
                  id: "anthropic",
                  name: "Anthropic Claude API Key",
                  val: anthropicKey,
                  setter: setAnthropicKey,
                  placeholder: "sk-ant-...",
                },
                {
                  id: "gemini",
                  name: "Google Gemini API Key",
                  val: geminiKey,
                  setter: setGeminiKey,
                  placeholder: "AIzaSy...",
                },
                {
                  id: "groq",
                  name: "Groq LPU API Key (Ultra-Low Latency)",
                  val: groqKey,
                  setter: setGroqKey,
                  placeholder: "gsk_...",
                },
              ].map((item) => (
                <GlassCard key={item.id} className="p-5">
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-semibold text-foreground">{item.name}</label>
                    <span className="text-[11px] text-muted">
                      {item.val ? "Configured" : "Not configured"}
                    </span>
                  </div>
                  <div className="relative flex items-center">
                    <input
                      type={showKey[item.id] ? "text" : "password"}
                      value={item.val}
                      onChange={(e) => item.setter(e.target.value)}
                      placeholder={item.placeholder}
                      className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted/50 focus:border-primary focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => toggleShowKey(item.id)}
                      className="absolute right-3 text-muted hover:text-foreground"
                    >
                      {showKey[item.id] ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </GlassCard>
              ))}
            </div>
          </div>
        )}

        {/* Tab 2: Models & Tuning */}
        {activeTab === "models" && (
          <div className="space-y-6">
            <div>
              <h2 className="text-base font-semibold text-foreground">Inference & Model Defaults</h2>
              <p className="mt-1 text-xs text-muted">
                Configure default reasoning settings used across your chat interface and automations.
              </p>
            </div>

            <GlassCard className="space-y-6 p-6">
              <div>
                <label className="block text-xs font-semibold text-foreground mb-2">
                  Primary Model Engine
                </label>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                  {[
                    { id: "gpt-4o", name: "GPT-4o", provider: "OpenAI", badge: "Balanced" },
                    { id: "claude-3-5", name: "Claude 3.5 Sonnet", provider: "Anthropic", badge: "Best Coding" },
                    { id: "gemini-1-5-pro", name: "Gemini 1.5 Pro", provider: "Google", badge: "2M Context" },
                  ].map((m) => (
                    <div
                      key={m.id}
                      onClick={() => setDefaultModel(m.id)}
                      className={cn(
                        "cursor-pointer rounded-xl border p-4 transition-all",
                        defaultModel === m.id
                          ? "border-primary bg-primary/10 shadow-[0_0_15px_rgba(99,102,241,0.2)]"
                          : "border-white/10 bg-white/[0.02] hover:bg-white/[0.04]"
                      )}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold text-foreground">{m.name}</span>
                        <span className="rounded-full bg-white/[0.06] px-2 py-0.5 text-[10px] text-muted">
                          {m.badge}
                        </span>
                      </div>
                      <p className="mt-1 text-xs text-muted">{m.provider}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-semibold text-foreground">
                    Temperature (Creativity): {temperature}
                  </label>
                  <span className="text-xs text-muted">
                    {temperature < 0.4 ? "Precise & Analytical" : temperature > 0.8 ? "Highly Creative" : "Balanced"}
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1.2"
                  step="0.05"
                  value={temperature}
                  onChange={(e) => setTemperature(parseFloat(e.target.value))}
                  className="w-full accent-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-foreground mb-2">
                  System Persona Prompt
                </label>
                <textarea
                  rows={4}
                  value={systemPrompt}
                  onChange={(e) => setSystemPrompt(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-white/[0.03] p-3 text-xs text-foreground placeholder:text-muted focus:border-primary focus:outline-none"
                />
              </div>
            </GlassCard>
          </div>
        )}

        {/* Tab 3: Team */}
        {activeTab === "team" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base font-semibold text-foreground">Team Members</h2>
                <p className="mt-1 text-xs text-muted">
                  Manage seats, roles, and shared automation access for your team.
                </p>
              </div>
              <Button size="sm" className="flex items-center gap-2">
                <Plus className="h-3.5 w-3.5" /> Invite Member
              </Button>
            </div>

            <GlassCard className="divide-y divide-white/[0.06] overflow-hidden p-0">
              {[
                { name: "Jordan Davis", email: "jordan@lumina.ai", role: "Owner", initials: "JD" },
                { name: "Sarah Chen", email: "sarah.c@lumina.ai", role: "Admin", initials: "SC" },
                { name: "Alex Rivera", email: "alex.r@lumina.ai", role: "Member", initials: "AR" },
              ].map((member) => (
                <div key={member.email} className="flex items-center justify-between p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-primary/30 to-secondary/30 text-xs font-semibold text-foreground">
                      {member.initials}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">{member.name}</p>
                      <p className="text-xs text-muted">{member.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="rounded-lg border border-white/10 bg-white/[0.03] px-2.5 py-1 text-xs text-muted">
                      {member.role}
                    </span>
                  </div>
                </div>
              ))}
            </GlassCard>
          </div>
        )}

        {/* Tab 4: Billing & Usage */}
        {activeTab === "billing" && (
          <div className="space-y-6">
            <div>
              <h2 className="text-base font-semibold text-foreground">Subscription & Consumption</h2>
              <p className="mt-1 text-xs text-muted">
                Track monthly token usage, storage limits, and manage your billing plan.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              <GlassCard className="p-6 lg:col-span-2 space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="rounded-full bg-primary/20 px-3 py-1 text-xs font-semibold text-primary-300">
                      Pro Tier Active
                    </span>
                    <h3 className="mt-3 text-xl font-bold text-foreground">$29 / month</h3>
                    <p className="text-xs text-muted">Next billing date: October 12, 2026</p>
                  </div>
                  <Button variant="ghost" size="sm">
                    Manage Stripe Portal
                  </Button>
                </div>

                <div>
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="text-muted">Monthly Token Consumption</span>
                    <span className="font-semibold text-foreground">412,890 / 1,000,000 tokens (41%)</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-white/10 overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-primary to-secondary w-[41%]" />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="text-muted">Vector Storage Quota</span>
                    <span className="font-semibold text-foreground">31.6 MB / 5.0 GB (&lt;1%)</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-white/10 overflow-hidden">
                    <div className="h-full bg-primary w-[3%]" />
                  </div>
                </div>
              </GlassCard>

              <GlassCard className="flex flex-col justify-between p-6">
                <div>
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-secondary text-white">
                    <Sparkles className="h-5 w-5" />
                  </div>
                  <h4 className="mt-4 text-sm font-semibold text-foreground">Need Enterprise Scale?</h4>
                  <p className="mt-1 text-xs text-muted leading-relaxed">
                    Custom LLM fine-tuning, on-premise VPC deployment, 99.99% SLA, and dedicated engineering support.
                  </p>
                </div>
                <Button className="mt-6 w-full text-xs">Upgrade to Enterprise</Button>
              </GlassCard>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
