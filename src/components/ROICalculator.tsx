import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calculator, TrendingUp, DollarSign } from "lucide-react";

const ROICalculator = () => {
  const [monthlyVisitors, setMonthlyVisitors] = useState<string>("");
  const [avgSaleValue, setAvgSaleValue] = useState<string>("");
  const [results, setResults] = useState<{
    purchaseIntentLift: number;
    perceivedValueBoost: number;
    totalProjection: number;
    monthlyIncrease: number;
  } | null>(null);

  const calculateROI = () => {
    const visitors = parseFloat(monthlyVisitors) || 0;
    const saleValue = parseFloat(avgSaleValue) || 0;

    if (visitors > 0 && saleValue > 0) {
      // Formula based on research metrics: +17% purchase intent, +15% perceived value
      const purchaseIntentLift = visitors * 0.17 * saleValue;
      const perceivedValueBoost = visitors * saleValue * 0.15;
      const totalProjection = purchaseIntentLift + perceivedValueBoost;
      const monthlyIncrease = totalProjection;

      setResults({
        purchaseIntentLift,
        perceivedValueBoost,
        totalProjection,
        monthlyIncrease
      });
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-background to-muted/30">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-display text-4xl font-bold text-foreground mb-4">
            Calculate Your Revenue Impact
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover the potential revenue lift from implementing EZE AirCare's scent marketing solutions in your business.
          </p>
        </div>

        <Card className="shadow-elegant gradient-card backdrop-blur-sm">
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center gap-3 font-display text-2xl">
              <Calculator className="w-8 h-8 text-accent" />
              ROI Projection Calculator
            </CardTitle>
          </CardHeader>
          
          <CardContent className="space-y-8">
            {/* Input Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="visitors" className="text-base font-medium">
                  Monthly Visitors
                </Label>
                <Input
                  id="visitors"
                  type="number"
                  placeholder="e.g., 10,000"
                  value={monthlyVisitors}
                  onChange={(e) => setMonthlyVisitors(e.target.value)}
                  className="h-12 text-lg"
                />
                <p className="text-sm text-muted-foreground">
                  Average number of customers per month
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="saleValue" className="text-base font-medium">
                  Average Sale Value (₹)
                </Label>
                <Input
                  id="saleValue"
                  type="number"
                  placeholder="e.g., 2,500"
                  value={avgSaleValue}
                  onChange={(e) => setAvgSaleValue(e.target.value)}
                  className="h-12 text-lg"
                />
                <p className="text-sm text-muted-foreground">
                  Average transaction amount in rupees
                </p>
              </div>
            </div>

            {/* Calculate Button */}
            <div className="text-center">
              <Button 
                onClick={calculateROI}
                variant="hero"
                size="lg"
                className="w-full md:w-auto"
                disabled={!monthlyVisitors || !avgSaleValue}
              >
                <TrendingUp className="w-5 h-5 mr-2" />
                Calculate Revenue Impact
              </Button>
            </div>

            {/* Results */}
            {results && (
              <div className="mt-8 p-6 gradient-accent rounded-xl shadow-glow animate-fade-in-scale">
                <h3 className="font-display text-xl font-bold text-accent-foreground mb-6 text-center">
                  Your Projected Revenue Lift
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-accent-foreground mb-2">
                      {formatCurrency(results.purchaseIntentLift)}
                    </div>
                    <div className="text-accent-foreground/80 text-sm">
                      From +17% Purchase Intent
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-2xl font-bold text-accent-foreground mb-2">
                      {formatCurrency(results.perceivedValueBoost)}
                    </div>
                    <div className="text-accent-foreground/80 text-sm">
                      From +15% Perceived Value
                    </div>
                  </div>
                </div>

                <div className="text-center p-4 bg-accent-foreground/10 rounded-lg">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <DollarSign className="w-6 h-6 text-accent-foreground" />
                    <span className="text-sm font-medium text-accent-foreground">Total Monthly Projection</span>
                  </div>
                  <div className="text-3xl font-bold text-accent-foreground">
                    {formatCurrency(results.totalProjection)}
                  </div>
                  <div className="text-xs text-accent-foreground/70 mt-1">
                    Based on proven scent marketing research data
                  </div>
                </div>

                <div className="text-center mt-6">
                  <p className="text-sm text-accent-foreground/80 mb-4">
                    Ready to transform your business with measurable results?
                  </p>
                  <Button variant="glass" size="lg">
                    Schedule Your Free Consultation
                  </Button>
                </div>
              </div>
            )}

            {/* Disclaimer */}
            <div className="text-xs text-muted-foreground text-center space-y-1">
              <p>* Projections based on published research: +17% purchase intent, +15% perceived value impact</p>
              <p>Sources: GVR 2023, Retail Week, IFRA/APAC, NeuroSense Research</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default ROICalculator;