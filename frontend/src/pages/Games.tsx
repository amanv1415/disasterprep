import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  GamepadIcon, 
  Play, 
  Trophy, 
  Star, 
  Clock,
  Users,
  Target,
  Zap,
  Shield,
  Brain
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const leaderboard = [
  { rank: 1, name: "Raj Patel", score: 9850, avatar: "👨" },
  { rank: 2, name: "Priya Sharma", score: 9720, avatar: "👩" },
  { rank: 3, name: "Amit Kumar", score: 9650, avatar: "👨" },
  { rank: 4, name: "Anita Singh", score: 9500, avatar: "👩" },
  { rank: 5, name: "Suresh Gupta", score: 9420, avatar: "👨" }
];

const Games = () => {
  const { t } = useLanguage();
  const [selectedGame, setSelectedGame] = useState<number | null>(null);

  const games = [
    {
      id: 1,
      title: t("games.emergencyResponse"),
      description: t("games.emergencyResponseDesc"),
      difficulty: t("games.medium"),
      duration: "15-20 min",
      category: "Simulation",
      icon: Shield,
      color: "bg-primary",
      rating: 4.8,
      players: "1-4 players",
      completions: 1250
    },
    {
      id: 2,
      title: t("games.memoryGame"),
      description: t("games.memoryGameDesc"),
      difficulty: t("games.easy"),
      duration: "5-10 min", 
      category: "Memory",
      icon: Brain,
      color: "bg-accent",
      rating: 4.6,
      players: "1 player",
      completions: 2100
    },
    {
      id: 3,
      title: t("games.evacuationPuzzle"),
      description: t("games.evacuationPuzzleDesc"),
      difficulty: t("games.hard"),
      duration: "20-30 min",
      category: "Puzzle",
      icon: Target,
      color: "bg-warning",
      rating: 4.9,
      players: "1 player",
      completions: 890
    },
    {
      id: 4,
      title: t("games.timelineChallenge"),
      description: t("games.timelineChallengeDesc"),
      difficulty: t("games.medium"),
      duration: "10-15 min",
      category: "Strategy",
      icon: Zap,
      color: "bg-secondary",
      rating: 4.7,
      players: "1-2 players",
      completions: 1500
    }
  ];

  const achievements = [
    { title: t("games.firstResponder"), description: t("games.firstResponderDesc"), icon: Star, earned: true },
    { title: t("games.quickThinker"), description: t("games.quickThinkerDesc"), icon: Zap, earned: true },
    { title: t("games.perfectScore"), description: t("games.perfectScoreDesc"), icon: Trophy, earned: false },
    { title: t("games.teamPlayer"), description: t("games.teamPlayerDesc"), icon: Users, earned: false },
    { title: t("games.masterPreparer"), description: t("games.masterPreparerDesc"), icon: Shield, earned: false }
  ];

  const getDifficultyColor = (difficulty: string) => {
    const diffLower = difficulty.toLowerCase();
    if (diffLower === 'easy' || diffLower === t("games.easy").toLowerCase()) return 'bg-success text-success-foreground';
    if (diffLower === 'medium' || diffLower === t("games.medium").toLowerCase()) return 'bg-warning text-warning-foreground';
    if (diffLower === 'hard' || diffLower === t("games.hard").toLowerCase()) return 'bg-emergency text-emergency-foreground';
    return 'bg-muted text-muted-foreground';
  };

  const startGame = (game: typeof games[0]) => {
    alert(`Starting ${game.title}...`);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-display font-bold mb-2 flex items-center gap-3">
            <GamepadIcon className="h-8 w-8 text-primary" />
            {t("games.title")}
          </h1>
          <p className="text-muted-foreground">{t("games.subtitle")}</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Games List */}
          <div className="lg:col-span-2">
            <div className="grid gap-6">
              {games.map((game) => (
                <Card 
                  key={game.id} 
                  className={`shadow-soft cursor-pointer transition-smooth hover:shadow-medium ${
                    selectedGame === game.id ? 'ring-2 ring-primary' : ''
                  }`}
                  onClick={() => setSelectedGame(game.id)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className={`w-16 h-16 rounded-lg ${game.color} flex items-center justify-center`}>
                        <game.icon className="h-8 w-8 text-white" />
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="text-xl font-semibold">{game.title}</h3>
                          <Badge className={getDifficultyColor(game.difficulty)}>
                            {game.difficulty}
                          </Badge>
                        </div>
                        
                        <p className="text-muted-foreground mb-4">{game.description}</p>
                        
                        <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground mb-4">
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {game.duration}
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            {game.players}
                          </div>
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4" />
                            {game.rating}/5.0
                          </div>
                          <div className="flex items-center gap-1">
                            <Trophy className="h-4 w-4" />
                            {game.completions} {t("games.completed")}
                          </div>
                        </div>
                        
                        <Button 
                          onClick={(e) => {
                            e.stopPropagation();
                            startGame(game);
                          }}
                          className="gradient-primary gap-2"
                        >
                          <Play className="h-4 w-4" />
                          {t("games.playGame")}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Player Stats */}
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-primary" />
                  {t("games.yourProgress")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>{t("games.overallProgress")}</span>
                      <span>65%</span>
                    </div>
                    <Progress value={65} className="h-2" />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="p-3 rounded-lg bg-muted/30">
                      <div className="text-2xl font-bold text-primary">12</div>
                      <div className="text-sm text-muted-foreground">{t("games.gamesPlayed")}</div>
                    </div>
                    <div className="p-3 rounded-lg bg-muted/30">
                      <div className="text-2xl font-bold text-success">8,750</div>
                      <div className="text-sm text-muted-foreground">{t("games.totalScore")}</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-primary" />
                  {t("games.achievements")}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {achievements.map((achievement, index) => (
                  <div 
                    key={index}
                    className={`flex items-center gap-3 p-3 rounded-lg ${
                      achievement.earned 
                        ? 'bg-success/10 border border-success/20' 
                        : 'bg-muted/30 border border-border'
                    }`}
                  >
                    <achievement.icon className={`h-5 w-5 ${
                      achievement.earned ? 'text-success' : 'text-muted-foreground'
                    }`} />
                    <div className="flex-1">
                      <div className={`font-medium text-sm ${
                        achievement.earned ? 'text-success' : 'text-muted-foreground'
                      }`}>
                        {achievement.title}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {achievement.description}
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Leaderboard */}
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-primary" />
                  {t("games.leaderboard")}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {leaderboard.map((player) => (
                  <div key={player.rank} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/30 transition-smooth">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                      player.rank === 1 ? 'bg-warning text-warning-foreground' :
                      player.rank === 2 ? 'bg-muted text-muted-foreground' :
                      player.rank === 3 ? 'bg-warning/60 text-warning-foreground' :
                      'bg-muted/50 text-muted-foreground'
                    }`}>
                      {player.rank}
                    </div>
                    <div className="text-lg">{player.avatar}</div>
                    <div className="flex-1">
                      <div className="font-medium text-sm">{player.name}</div>
                      <div className="text-xs text-muted-foreground">{player.score} {t("games.pts")}</div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Games;
