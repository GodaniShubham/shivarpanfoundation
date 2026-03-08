import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { BadgeCheck, HeartHandshake, Landmark, ShieldCheck, Wallet } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const presetAmounts = [500, 1000, 2500, 5000];
const paymentModes = ["UPI", "Card", "Net Banking"] as const;

const DonateNow = () => {
  const { toast } = useToast();
  const [selectedAmount, setSelectedAmount] = useState<number>(1000);
  const [customAmount, setCustomAmount] = useState("");
  const [paymentMode, setPaymentMode] = useState<(typeof paymentModes)[number]>("UPI");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const finalAmount = useMemo(() => {
    const parsed = Number(customAmount);
    if (Number.isFinite(parsed) && parsed > 0) {
      return parsed;
    }
    return selectedAmount;
  }, [customAmount, selectedAmount]);

  const handleDonate = (event: React.FormEvent) => {
    event.preventDefault();
    toast({
      title: "Donation request submitted",
      description: `Amount: Rs ${finalAmount.toLocaleString("en-IN")} via ${paymentMode}`,
    });
    setCustomAmount("");
    setName("");
    setEmail("");
    setPhone("");
    setMessage("");
  };

  return (
    <div className="relative overflow-hidden donate-page">
      <section className="relative overflow-hidden border-b border-border/70 py-12 md:py-16">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_16%,hsl(var(--primary)/0.18),transparent_35%),radial-gradient(circle_at_86%_80%,hsl(var(--accent)/0.18),transparent_37%),linear-gradient(165deg,hsl(var(--background))_0%,hsl(var(--muted))_52%,hsl(var(--background))_100%)]" />
        <motion.div
          aria-hidden
          animate={{ x: [0, 22, 0], y: [0, -14, 0], opacity: [0.16, 0.3, 0.16] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          className="pointer-events-none absolute -top-16 right-6 h-72 w-72 rounded-full bg-primary/20 blur-3xl"
        />
        <div className="container relative z-10 mx-auto px-4">
          <AnimatedSection>
            <div className="rounded-3xl border border-border/80 bg-card/90 p-6 shadow-[0_26px_70px_-52px_hsl(var(--foreground))] md:p-8">
              <p className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                <HeartHandshake className="h-3.5 w-3.5" />
                Donate Now
              </p>
              <h1 className="mt-4 font-display text-4xl font-bold leading-tight text-foreground md:text-6xl">
                Your Support Fuels Direct Community Impact
              </h1>
              <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted-foreground md:text-base">
                Choose an amount, share your details, and help us deliver food relief, education continuity, healthcare outreach, and environment programs.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="grid gap-6 xl:grid-cols-12">
            <AnimatedSection className="xl:col-span-8" direction="left">
              <form
                onSubmit={handleDonate}
                className="rounded-3xl border border-border bg-card p-6 shadow-[0_24px_66px_-48px_hsl(var(--foreground))] md:p-8"
              >
                <div className="flex items-center justify-between gap-3">
                  <h2 className="font-display text-3xl font-semibold text-foreground">Complete Your Donation</h2>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1 text-xs text-muted-foreground">
                    <ShieldCheck className="h-3.5 w-3.5 text-primary" />
                    Secure flow
                  </span>
                </div>

                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {presetAmounts.map((amount) => (
                    <button
                      type="button"
                      key={amount}
                      onClick={() => {
                        setSelectedAmount(amount);
                        setCustomAmount("");
                      }}
                      className={`rounded-2xl border px-4 py-4 text-left transition-colors ${
                        selectedAmount === amount && customAmount === ""
                          ? "border-primary bg-primary/10"
                          : "border-border bg-background/70 hover:border-primary/40"
                      }`}
                    >
                      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">Quick Amount</p>
                      <p className="mt-1 font-display text-2xl font-bold text-foreground">Rs {amount.toLocaleString("en-IN")}</p>
                    </button>
                  ))}
                </div>

                <Input
                  type="number"
                  min={100}
                  step={100}
                  value={customAmount}
                  onChange={(event) => setCustomAmount(event.target.value)}
                  placeholder="Enter custom amount (minimum Rs 100)"
                  className="mt-4 h-11 bg-background/70"
                />

                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <Input
                    required
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    placeholder="Full Name"
                    className="h-11 bg-background/70"
                  />
                  <Input
                    required
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="Email Address"
                    className="h-11 bg-background/70"
                  />
                  <Input
                    required
                    value={phone}
                    onChange={(event) => setPhone(event.target.value)}
                    placeholder="Phone Number"
                    className="h-11 bg-background/70"
                  />
                  <select
                    value={paymentMode}
                    onChange={(event) => setPaymentMode(event.target.value as (typeof paymentModes)[number])}
                    className="h-11 rounded-md border border-input bg-background/70 px-3 text-sm text-foreground outline-none ring-offset-background transition-shadow focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  >
                    {paymentModes.map((mode) => (
                      <option key={mode}>{mode}</option>
                    ))}
                  </select>
                </div>

                <Textarea
                  rows={4}
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  placeholder="Message (optional)"
                  className="mt-4 bg-background/70"
                />

                <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
                  <p className="text-sm text-muted-foreground">
                    Total donation: <span className="font-semibold text-foreground">Rs {finalAmount.toLocaleString("en-IN")}</span>
                  </p>
                  <Button type="submit" className="bg-accent text-accent-foreground hover:bg-accent/90">
                    Proceed to Donate
                  </Button>
                </div>
              </form>
            </AnimatedSection>

            <AnimatedSection className="xl:col-span-4" delay={0.08} direction="right">
              <div className="space-y-4">
                <div className="rounded-2xl border border-border/85 bg-card p-5 shadow-sm">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">Where It Goes</p>
                  <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2"><BadgeCheck className="mt-0.5 h-4 w-4 text-primary" /> Food relief and ration support</li>
                    <li className="flex items-start gap-2"><BadgeCheck className="mt-0.5 h-4 w-4 text-primary" /> Student scholarships and learning kits</li>
                    <li className="flex items-start gap-2"><BadgeCheck className="mt-0.5 h-4 w-4 text-primary" /> Rural health camps and medicine access</li>
                    <li className="flex items-start gap-2"><BadgeCheck className="mt-0.5 h-4 w-4 text-primary" /> Tree plantation and care cycles</li>
                  </ul>
                </div>

                <div className="rounded-2xl border border-border/85 bg-card p-5 shadow-sm">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">Accepted Modes</p>
                  <div className="mt-4 space-y-2.5 text-sm text-foreground">
                    <p className="inline-flex items-center gap-2"><Wallet className="h-4 w-4 text-primary" /> UPI and wallets</p>
                    <p className="inline-flex items-center gap-2"><Landmark className="h-4 w-4 text-primary" /> Net banking</p>
                    <p className="inline-flex items-center gap-2"><BadgeCheck className="h-4 w-4 text-primary" /> Debit/Credit cards</p>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DonateNow;
