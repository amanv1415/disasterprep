import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Brain, CheckCircle, XCircle, RotateCcw, Trophy, ChevronLeft, ChevronRight } from "lucide-react";
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
        <div className="container mx-auto px-4 py-6 sm:py-8 max-w-4xl">
          <div className="text-center mb-6 sm:mb-8 animate-fade-in-up">
            <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full gradient-primary mb-3 sm:mb-4">
              <Trophy className="h-7 w-7 sm:h-8 sm:w-8 text-white" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-display font-bold mb-1.5 sm:mb-2">{t("quiz.results")}</h1>
            <p className="text-sm sm:text-base text-muted-foreground">{t("quiz.resultsSubtitle")}</p>
          </div>

          <Card className="shadow-soft mb-6">
            <CardHeader>
              <CardTitle className="text-center text-base sm:text-lg">{t("quiz.yourScore")}</CardTitle>
            </CardHeader>
            <CardContent className="text-center py-4 sm:py-6">
              <div className="text-5xl sm:text-6xl font-bold text-primary mb-3 sm:mb-4">{percentage}%</div>
              <div className="text-base sm:text-xl mb-4">
                {score} {t("quiz.outOf")} {quizQuestions.length} {t("quiz.correct")}
              </div>
              <Badge
                className={`text-sm sm:text-lg px-3 sm:px-4 py-1.5 sm:py-2 ${percentage >= 80
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

          {/* Review answers */}
          <div className="space-y-3 mb-6">
            {quizQuestions.map((q, idx) => {
              const userAnswer = selectedAnswers[idx];
              const isCorrect = userAnswer === q.correct;
              return (
                <Card key={idx} className={`border-l-4 ${isCorrect ? 'border-l-success' : 'border-l-emergency'}`}>
                  <CardContent className="p-3 sm:p-4">
                    <div className="flex items-start gap-2 mb-2">
                      {isCorrect ? (
                        <CheckCircle className="h-5 w-5 text-success shrink-0 mt-0.5" />
                      ) : (
                        <XCircle className="h-5 w-5 text-emergency shrink-0 mt-0.5" />
                      )}
                      <span className="font-medium text-sm sm:text-base">{q.question}</span>
                    </div>
                    <div className="ml-7 text-xs sm:text-sm">
                      <p className="text-muted-foreground">
                        Your answer: <span className={isCorrect ? 'text-success font-medium' : 'text-emergency font-medium'}>
                          {q.options[userAnswer] || "Not answered"}
                        </span>
                      </p>
                      {!isCorrect && (
                        <p className="text-success mt-1">
                          Correct: <span className="font-medium">{q.options[q.correct]}</span>
                        </p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="text-center">
            <Button onClick={resetQuiz} className="gradient-primary gap-2" size="lg">
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
      <div className="container mx-auto px-4 py-6 sm:py-8 max-w-2xl">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-display font-bold mb-1.5 sm:mb-2 flex items-center gap-2 sm:gap-3">
            <Brain className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
            {t("quiz.title")}
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            {t("quiz.subtitle")}
          </p>
        </div>

        <Card className="shadow-soft">
          <CardHeader className="p-4 sm:p-6">
            <div className="flex items-center justify-between mb-3 sm:mb-4 gap-2">
              <CardTitle className="text-sm sm:text-base">
                {t("quiz.question")} {currentQuestion + 1} {t("quiz.of")} {quizQuestions.length}
              </CardTitle>
              <Badge variant="outline" className="text-xs shrink-0">{Math.round(progress)}% {t("quiz.complete")}</Badge>
            </div>
            <Progress value={progress} className="h-2" />
          </CardHeader>

          <CardContent className="p-4 sm:p-6 pt-0 sm:pt-0">
            <h2 className="text-base sm:text-xl font-semibold mb-4 sm:mb-6 leading-snug">{currentQ.question}</h2>

            <div className="space-y-2 sm:space-y-3 mb-6 sm:mb-8">
              {currentQ.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  className={`w-full text-left p-3 sm:p-4 rounded-lg border transition-smooth text-sm sm:text-base ${selectedAnswers[currentQuestion] === index
                      ? "border-primary bg-primary/5 text-primary"
                      : "border-border bg-muted/30 hover:bg-muted/50"
                    }`}
                >
                  <div className="flex items-start gap-2.5 sm:gap-3">
                    <div
                      className={`w-4 h-4 rounded-full border-2 mt-0.5 shrink-0 ${selectedAnswers[currentQuestion] === index
                          ? "border-primary bg-primary"
                          : "border-muted-foreground"
                        }`}
                    />
                    <span className="leading-snug">{option}</span>
                  </div>
                </button>
              ))}
            </div>

            <div className="flex justify-between gap-3">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentQuestion === 0}
                className="gap-1"
              >
                <ChevronLeft className="h-4 w-4" />
                <span className="hidden sm:inline">{t("quiz.previous")}</span>
                <span className="sm:hidden">Back</span>
              </Button>

              <Button
                onClick={handleNext}
                disabled={selectedAnswers[currentQuestion] === undefined}
                className="gradient-primary gap-1"
              >
                {currentQuestion === quizQuestions.length - 1 ? (
                  <>
                    <span>{t("quiz.finishQuiz")}</span>
                    <Trophy className="h-4 w-4" />
                  </>
                ) : (
                  <>
                    <span className="hidden sm:inline">{t("quiz.nextQuestion")}</span>
                    <span className="sm:hidden">Next</span>
                    <ChevronRight className="h-4 w-4" />
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Question dots navigation */}
        <div className="flex justify-center gap-2 mt-4">
          {quizQuestions.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentQuestion(idx)}
              className={`w-3 h-3 rounded-full transition-smooth ${idx === currentQuestion
                  ? 'bg-primary scale-125'
                  : selectedAnswers[idx] !== undefined
                    ? 'bg-primary/40'
                    : 'bg-muted-foreground/30'
                }`}
              aria-label={`Go to question ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Quiz;