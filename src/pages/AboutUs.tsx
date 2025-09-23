import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type Parsed = {
  url: string;
  title?: string | null;
  description?: string | null;
  h1?: string | null;
  paragraph?: string | null;
};

// Static summaries fetched and embedded during development.
// Source URLs:
// - https://sawaifragrances.com/
// - https://ezeperfume.com/pages/about-us
const SUMMARIES: Parsed[] = [
  {
    url: "https://sawaifragrances.com/",
    title: "ABOUT US — Sawai Fragrances",
    description: "A natural partner of fragrances, health and beauty products with a legacy spanning decades; Sawai integrates harvest-to-fragrance with innovation and creativity.",
    h1: "ABOUT US",
    paragraph:
      "A natural partner of fragrances, health and beauty products, Sawai has a rich legacy spanning decades. By integrating each step, from harvest to fragrance, with world-class innovation backed by creative zeal, we are a supplier to several market leaders of today. Our aim is to constantly raise the benchmark through consistent market research and provide exceptional creativity to leading brands.",
  },
  {
    url: "https://ezeperfume.com/pages/about-us",
    title: "About Us — Eze Perfume",
    description: "Eze Perfume — rich heritage since 1965, committed to fragrance innovation; affordable premium scents, long-lasting and suitable for every occasion.",
    h1: "About Us — Express Your Eze",
    paragraph:
      "At Eze, we take immense pride in our rich heritage and unwavering commitment to excellence in the perfumery industry. Since our inception in 1965, we've been at the forefront of fragrance innovation, honing our craft and perfecting our artistry. Through dedication and passion, we've evolved into creators of fine perfumes that captivate the senses.",
  },
];

export default function AboutUs() {
  return (
    <div className="p-6">
      {/* Hero */}
      <div className="rounded-2xl p-6 md:p-10 mb-8 bg-background/80 backdrop-blur-sm border border-border/50 shadow-elegant flex flex-col md:flex-row items-start gap-6">
        <div className="flex-1">
          <div className="inline-flex items-center mb-3">
            <div className="w-12 h-12 rounded-xl gradient-hero flex items-center justify-center shadow-glow mr-3">
              <span className="text-white font-display font-bold text-2xl">E</span>
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-display font-bold">About Us</h1>
              <p className="text-sm text-muted-foreground mt-1">Curated summaries of supplier and brand pages used for product and diffuser context.</p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground max-w-2xl">The excerpts below were captured during development and embedded into the site as static summaries to avoid cross-origin runtime fetches. Each card links to the original page for the full source.</p>
        </div>

        <div className="w-full md:w-64">
          <div className="rounded-lg p-4 bg-gradient-to-b from-accent/5 to-background border border-border/50">
            <div className="text-xs text-muted-foreground uppercase mb-2">Sources</div>
            <div className="flex flex-col gap-2">
              {SUMMARIES.map((s) => (
                <a key={s.url} href={s.url} target="_blank" rel="noreferrer" className="text-sm text-foreground hover:text-primary underline truncate">{new URL(s.url).hostname}</a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {SUMMARIES.map((d) => (
          <Card key={d.url} className="overflow-hidden">
            {/* top accent */}
            <div className="h-1 bg-gradient-to-r from-primary to-accent" />
            <CardContent className="p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-1">{d.title ?? d.url}</h3>
                  <div className="text-sm text-muted-foreground mb-3">{d.description ?? <em className="text-muted-foreground">No description available</em>}</div>

                  <div className="text-sm space-y-2">
                    <div><strong className="text-foreground">First &lt;h1&gt;:</strong> <span className="text-muted-foreground">{d.h1 ?? 'n/a'}</span></div>
                    <div><strong className="text-foreground">Representative paragraph:</strong> <p className="text-muted-foreground mt-1">{d.paragraph ?? 'n/a'}</p></div>
                  </div>
                </div>

                <div className="flex-shrink-0 text-right">
                  <div className="text-xs text-muted-foreground mb-2">Source</div>
                  <a href={d.url} target="_blank" rel="noreferrer" className="inline-block">
                    <Button variant="ghost" size="sm">Open original</Button>
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
