import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Brain, CheckCircle, XCircle, RotateCcw, Trophy } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

// ✅ Full courseData inside the same file
const courseData = {
  en: {
    levels: {
      school: {
        disasters: {
          earthquake: {
            age_groups: {
              g68: {
                assessment: {
                  questions: [
                    { q: "What is a fault line?", o: ["A crack in a building", "Where tectonic plates meet", "A type of earthquake"], a: 1 },
                    { q: "Why is an out-of-state contact useful?", o: ["They can send help faster", "Local phone lines may be busy", "It's a good way to practice memorization"], a: 1 },
                    { q: "The point on the Earth's surface directly above where an earthquake starts is called the:", o: ["Hypocenter", "Epicenter", "Fault"], a: 1 }
                  ]
                }
              }
            }
          }
        }
      }
    }
  }
};

// ✅ Pick one quiz dynamically (example: Earthquake → Grades 6–8)
const rawQuestions =
  courseData.en.levels.school.disasters.earthquake.age_groups.g68.assessment.questions;

// Transform into format for Quiz component
const quizQuestions = rawQuestions.map((q, idx) => ({
  id: idx + 1,
  question: q.q,
  options: q.o,
  correct: q.a,
  explanation: "Refer to the lesson content for more details."
}));

const Quiz = () => {
  const { t } = useLanguage();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setQuizCompleted(true);
      setShowResults(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const calculateScore = () => {
    return selectedAnswers.reduce((score, answer, index) => {
      return score + (answer === quizQuestions[index].correct ? 1 : 0);
    }, 0);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswers([]);
    setShowResults(false);
    setQuizCompleted(false);
  };

  const score = calculateScore();
  const percentage = Math.round((score / quizQuestions.length) * 100);

  // ✅ Results View
  if (showResults) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full gradient-primary mb-4">
              <Trophy className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-3xl font-display font-bold mb-2">{t("quiz.results")}</h1>
            <p className="text-muted-foreground">{t("quiz.resultsSubtitle")}</p>
          </div>

          <Card className="shadow-soft mb-6">
            <CardHeader>
              <CardTitle className="text-center">{t("quiz.yourScore")}</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <div className="text-6xl font-bold text-primary mb-4">{percentage}%</div>
              <div className="text-xl mb-4">
                {score} {t("quiz.outOf")} {quizQuestions.length} {t("quiz.correct")}
              </div>
              <Badge
                className={`text-lg px-4 py-2 ${
                  percentage >= 80
                    ? "bg-success text-success-foreground"
                    : percentage >= 60
                    ? "bg-warning text-warning-foreground"
                    : "bg-emergency text-emergency-foreground"
                }`}
              >
                {percentage >= 80
                  ? t("quiz.excellent")
                  : percentage >= 60
                  ? t("quiz.good")
                  : t("quiz.keepLearning")}
              </Badge>
            </CardContent>
          </Card>

          <div className="text-center">
            <Button onClick={resetQuiz} className="gradient-primary gap-2">
              <RotateCcw className="h-4 w-4" />
              {t("quiz.takeAgain")}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // ✅ Quiz View
  const currentQ = quizQuestions[currentQuestion];
  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="mb-8">
          <h1 className="text-3xl font-display font-bold mb-2 flex items-center gap-3">
            <Brain className="h-8 w-8 text-primary" />
            {t("quiz.title")}
          </h1>
          <p className="text-muted-foreground">
            {t("quiz.subtitle")}
          </p>
        </div>

        <Card className="shadow-soft">
          <CardHeader>
            <div className="flex items-center justify-between mb-4">
              <CardTitle>
                {t("quiz.question")} {currentQuestion + 1} {t("quiz.of")} {quizQuestions.length}
              </CardTitle>
              <Badge variant="outline">{Math.round(progress)}% {t("quiz.complete")}</Badge>
            </div>
            <Progress value={progress} className="h-2" />
          </CardHeader>

          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-6">{currentQ.question}</h2>

            <div className="space-y-3 mb-8">
              {currentQ.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  className={`w-full text-left p-4 rounded-lg border transition-smooth ${
                    selectedAnswers[currentQuestion] === index
                      ? "border-primary bg-primary/5 text-primary"
                      : "border-border bg-muted/30 hover:bg-muted/50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-4 h-4 rounded-full border-2 ${
                        selectedAnswers[currentQuestion] === index
                          ? "border-primary bg-primary"
                          : "border-muted-foreground"
                      }`}
                    />
                    {option}
                  </div>
                </button>
              ))}
            </div>

            <div className="flex justify-between">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentQuestion === 0}
              >
                {t("quiz.previous")}
              </Button>

              <Button
                onClick={handleNext}
                disabled={selectedAnswers[currentQuestion] === undefined}
                className="gradient-primary"
              >
                {currentQuestion === quizQuestions.length - 1
                  ? t("quiz.finishQuiz")
                  : t("quiz.nextQuestion")}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Quiz;