import features from "../lists/featuresList";
import Button from "../components/Button";
import Section from "../components/Section";
import { boardColorRamps } from "../lists/boardIconsList";

export default function LandingPage() {
  return (
    <main style={{ padding: 0 }}>
      <Section className="py-40">
        <h2 className="text-4xl font-bold">
          Organise work that actually{" "}
          <span className="text-primary">flows.</span>
        </h2>
        <p className="text-text-muted text-lg">
          Boards, columns, and cards for teams who want less busywork and more
          momentum. Set up your first board in under a minute.
        </p>
        <div className="flex gap-3">
          <Button>Sign up - it's free!</Button>
          <Button outlined>See how it works</Button>
        </div>
        <p className="text-text-muted text-sm">
          No credit card required &bull; Ready in 60 seconds
        </p>
      </Section>
      <Section className="py-20 bg-surface">
        <p className="uppercase text-primary font-bold">why driftboard?</p>
        <h2 className="text-4xl font-bold">
          Built for how teams actually work
        </h2>
        <div className="flex flex-col md:flex-row gap-5 py-5 px-10">
          {features.map((f) => {
            const color = boardColorRamps[f.color];
            return (
              <div
                key={f.title}
                className="bg-surface border border-border rounded-xl p-5 text-start"
              >
                <div
                  className="rounded-lg w-9 h-9 flex items-center justify-center mb-3"
                  style={{ backgroundColor: color.bg }}
                >
                  <f.icon style={{ color: color.fg }} />
                </div>
                <p className="font-semibold text-lg mb-1">{f.title}</p>
                <p className="text-sm text-text-muted leading-relaxed">
                  {f.description}
                </p>
              </div>
            );
          })}
        </div>
      </Section>
      <Section className="bg-primary py-20">
        <h2 className="text-surface font-bold text-3xl">
          Ready to get organized?
        </h2>
        <p className="text-bg">
          Join for free. Your first board is one click away.
        </p>
        <Button outlined>
          <p className="text-primary">Sign up - it's free</p>
        </Button>
      </Section>
    </main>
  );
}
