import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { GradientButton } from "@/components/ui/gradient-button";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Settings, Plus, X, Save, Trash2 } from "lucide-react";

export default function Preferences() {
  const navigate = useNavigate();
  const { toast } = useToast();

  // TODO: Load from user data
  const [selectedGenres, setSelectedGenres] = useState<string[]>([
    "Action", "Adventure", "Shounen"
  ]);
  const [keywords, setKeywords] = useState<string[]>([
    "fantasy", "magic", "friendship"
  ]);
  const [newKeyword, setNewKeyword] = useState("");

  const availableGenres = [
    "Action", "Adventure", "Comedy", "Drama", "Fantasy", "Horror",
    "Mystery", "Romance", "Sci-Fi", "Slice of Life", "Sports", "Thriller",
    "Shounen", "Shoujo", "Seinen", "Josei", "Mecha", "Supernatural"
  ];

  const handleLogout = () => {
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
    navigate("/");
  };

  const toggleGenre = (genre: string) => {
    setSelectedGenres(prev =>
      prev.includes(genre)
        ? prev.filter(g => g !== genre)
        : [...prev, genre]
    );
  };

  const addKeyword = () => {
    if (newKeyword.trim() && !keywords.includes(newKeyword.trim())) {
      setKeywords(prev => [...prev, newKeyword.trim()]);
      setNewKeyword("");
    }
  };

  const removeKeyword = (keyword: string) => {
    setKeywords(prev => prev.filter(k => k !== keyword));
  };

  const handleSave = async () => {
    try {
      // TODO: Save to Supabase
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Preferences saved!",
        description: "Your anime preferences have been updated successfully.",
      });
    } catch (error) {
      toast({
        title: "Save failed",
        description: "There was an error saving your preferences. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      addKeyword();
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar isAuthenticated={true} onLogout={handleLogout} />
      
      <div className="container mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-3">
            <Settings className="h-8 w-8 text-primary animate-glow" />
            <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Preferences
            </h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Customize your anime discovery experience by selecting your favorite genres and keywords.
          </p>
        </div>

        {/* Genres Section */}
        <Card className="bg-gradient-card border-border/50">
          <CardHeader>
            <CardTitle className="text-xl">Favorite Genres</CardTitle>
            <CardDescription>
              Select the anime genres you enjoy most. This helps us find anime that match your taste.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {availableGenres.map((genre) => (
                <Button
                  key={genre}
                  variant={selectedGenres.includes(genre) ? "default" : "outline"}
                  onClick={() => toggleGenre(genre)}
                  className={`h-auto p-3 transition-all duration-300 ${
                    selectedGenres.includes(genre)
                      ? "bg-gradient-primary text-primary-foreground border-0 shadow-lg shadow-primary/25"
                      : "hover:border-primary/50"
                  }`}
                >
                  {genre}
                </Button>
              ))}
            </div>
            <div className="mt-4 text-sm text-muted-foreground">
              Selected: {selectedGenres.length} genres
            </div>
          </CardContent>
        </Card>

        {/* Keywords Section */}
        <Card className="bg-gradient-card border-border/50">
          <CardHeader>
            <CardTitle className="text-xl">Keywords & Themes</CardTitle>
            <CardDescription>
              Add specific themes, elements, or keywords you're interested in seeing in anime.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Add new keyword */}
            <div className="flex space-x-2">
              <div className="flex-1">
                <Label htmlFor="keyword" className="sr-only">Add keyword</Label>
                <Input
                  id="keyword"
                  placeholder="Enter a keyword (e.g., 'magic', 'school', 'friendship')"
                  value={newKeyword}
                  onChange={(e) => setNewKeyword(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="bg-muted/50 border-border/50 focus:border-primary"
                />
              </div>
              <Button
                onClick={addKeyword}
                disabled={!newKeyword.trim()}
                className="px-6"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add
              </Button>
            </div>

            {/* Current keywords */}
            <div className="space-y-2">
              <Label>Current Keywords:</Label>
              <div className="flex flex-wrap gap-2">
                {keywords.map((keyword, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="flex items-center space-x-2 px-3 py-1 bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                  >
                    <span>{keyword}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeKeyword(keyword)}
                      className="h-auto p-0 ml-2 hover:bg-transparent"
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                ))}
                {keywords.length === 0 && (
                  <p className="text-muted-foreground text-sm italic">
                    No keywords added yet. Add some to improve your recommendations!
                  </p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Summary */}
        <Card className="bg-gradient-card border-border/50">
          <CardHeader>
            <CardTitle className="text-xl">Preference Summary</CardTitle>
            <CardDescription>
              Review your current preferences before saving.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-2 text-primary">Selected Genres ({selectedGenres.length})</h4>
                <div className="flex flex-wrap gap-1">
                  {selectedGenres.map((genre, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {genre}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-2 text-secondary">Keywords ({keywords.length})</h4>
                <div className="flex flex-wrap gap-1">
                  {keywords.map((keyword, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {keyword}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <GradientButton
            onClick={handleSave}
            className="px-8 py-3"
          >
            <Save className="mr-2 h-4 w-4" />
            Save Preferences
          </GradientButton>
          <Button
            variant="outline"
            onClick={() => navigate("/dashboard")}
            className="px-8 py-3"
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}