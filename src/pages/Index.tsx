import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { GradientButton } from "@/components/ui/gradient-button";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, TrendingUp, Users, Shield, Zap, Heart } from "lucide-react";
import heroImage from "@/assets/hero-bg.jpg";

const Index = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Sparkles,
      title: "AI-Powered Recommendations",
      description: "Get personalized anime suggestions based on your unique preferences and viewing history."
    },
    {
      icon: TrendingUp,
      title: "Trending Discoveries",
      description: "Stay up-to-date with the latest and most popular anime series trending right now."
    },
    {
      icon: Users,
      title: "Community Driven",
      description: "Benefit from a vast database of anime data and community-curated recommendations."
    },
    {
      icon: Shield,
      title: "Privacy First",
      description: "Your data is secure and private. We only use your preferences to improve your experience."
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Get instant recommendations with our optimized recommendation engine."
    },
    {
      icon: Heart,
      title: "Made for Fans",
      description: "Built by anime lovers, for anime lovers. Discover your next obsession."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-background/80 via-background/60 to-background/80" />
        </div>
        
        <div className="relative z-10 text-center max-w-4xl mx-auto px-6 space-y-8">
          <div className="space-y-4 animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-primary bg-clip-text text-transparent leading-tight">
              CineSage
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
              Your intelligent anime companion. Discover, explore, and fall in love with anime tailored perfectly to your taste.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up">
            <GradientButton
              onClick={() => navigate("/register")}
              className="px-8 py-4 text-lg font-semibold"
            >
              <Sparkles className="mr-2 h-5 w-5" />
              Start Your Journey
            </GradientButton>
            <Button
              variant="outline"
              onClick={() => navigate("/login")}
              className="px-8 py-4 text-lg border-2 border-primary/50 bg-background/50 hover:bg-primary/10 backdrop-blur-sm"
            >
              Sign In
            </Button>
          </div>
          
          <div className="text-sm text-muted-foreground">
            Join thousands of anime fans discovering their next favorite series
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Why Choose CineSage?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Powered by advanced algorithms and comprehensive anime data to bring you the perfect recommendations.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="bg-gradient-card border-border/50 hover:border-primary/50 transition-all duration-300 hover:scale-105">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-muted-foreground">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-hero">
        <div className="container mx-auto text-center space-y-8">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Ready to Discover Your Next Favorite Anime?
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Join CineSage today and unlock a personalized anime discovery experience like no other.
          </p>
          <GradientButton
            onClick={() => navigate("/register")}
            className="px-8 py-4 text-lg font-semibold"
          >
            <Heart className="mr-2 h-5 w-5" />
            Get Started Free
          </GradientButton>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-border/50">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Sparkles className="h-6 w-6 text-primary" />
            <span className="text-lg font-bold bg-gradient-primary bg-clip-text text-transparent">
              CineSage
            </span>
          </div>
          <p className="text-muted-foreground">
            © 2024 CineSage. Made with ❤️ for anime fans everywhere.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
