"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";

const initialQuestions = {
  start: {
    question: "Do you have a business, or are you just starting out?",
    options: ["Existing", "New"],
    type: "initial",
  },
  newMotive: {
    question: "What is the main motive for starting your project?",
    options: ["Passion Project", "Seasonal Opportunity", "Commercial Profit"],
    type: "multipleChoice",
  },
  newBrandVision: {
    question: "Do you have an idea or brand vision?",
    options: ["Yes", "No"],
    type: "singleChoice",
  },
  newStylePreference: {
    question: "What's your style preference?",
    options: ["Elegant", "Classic", "Sports", "Modern"],
    type: "multipleChoice",
  },
  newProductionKnowledge: {
    question: "Do you have knowledge of production sources?",
    options: ["Looking for help", "Yes", "No"],
    type: "singleChoice",
  },
  newBudget: {
    question: "What is the estimated budget for production (AED)?",
    type: "range",
  },
  newSellingPlatforms: {
    question: "Where do you intend to sell your products?",
    options: ["Instagram", "Physical Store", "E-commerce Platforms", "Other Platforms"],
    type: "multipleChoice",
  },
  newSupportFields: {
    question: "What field do you need support in?",
    options: ["Financing", "Marketing", "Product Management", "Branding"],
    type: "multipleChoice",
  },
  existingCategory: {
    question: "What’s your business category?",
    options: ["Women's Fashion", "Luxury Boutique", "Men's Fashion", "Children Fashion"],
    type: "singleChoice",
  },
  existingAge: {
    question: "How old is your business?",
    options: ["Less than a year", "1–3 Years", "More than 5 years"],
    type: "singleChoice",
  },
  existingStrengths: {
    question: "What are the strengths of your brand?",
    options: ["Price", "Quality", "Design", "Customer Service"],
    type: "multipleChoice",
  },
  existingAudienceAge: {
    question: "What's your audience age demographic?",
    options: ["15–25", "26–35", "36–45", "45+"],
    type: "singleChoice",
  },
  existingValue: {
    question: "What's the most important value you provide?",
    options: ["Competitive price", "Sustainability", "Luxury", "Excellence"],
    type: "singleChoice",
  },
  existingQualityControl: {
    question: "How do you deal with quality problems in production?",
    options: ["Select Service", "Intensive Quality Control"],
    type: "singleChoice",
  },
  existingObstacle: {
    question: "What is the biggest obstacle you are facing now?",
    options: ["Production", "Financing", "Marketing", "Competition", "Employees"],
    type: "multipleChoice",
  },
};

interface Question {
  question: string;
  options?: string[];
  type: "initial" | "multipleChoice" | "singleChoice" | "range" | "text";
}

export default function Home() {
  const [currentQuestionKey, setCurrentQuestionKey] = useState<string>("start");
  const [formState, setFormState] = useState<{ [key: string]: any }>({});
  const currentQuestion = initialQuestions[currentQuestionKey] as Question;

  const isExistingBusiness = formState.start === "Existing";

  const determineNextQuestion = () => {
    if (currentQuestionKey === "start") {
      return isExistingBusiness ? "existingCategory" : "newMotive";
    }

    if (isExistingBusiness) {
      switch (currentQuestionKey) {
        case "existingCategory": return "existingAge";
        case "existingAge": return "existingStrengths";
        case "existingStrengths": return "existingAudienceAge";
        case "existingAudienceAge": return "existingValue";
        case "existingValue": return "existingQualityControl";
        case "existingQualityControl": return "existingObstacle";
        default: return null;
      }
    } else {
      switch (currentQuestionKey) {
        case "newMotive": return "newBrandVision";
        case "newBrandVision": return "newStylePreference";
        case "newStylePreference": return "newProductionKnowledge";
        case "newProductionKnowledge": return "newBudget";
        case "newBudget": return "newSellingPlatforms";
        case "newSellingPlatforms": return "newSupportFields";
        default: return null;
      }
    }
  };

  const nextQuestionKey = determineNextQuestion();
  const isFormComplete = nextQuestionKey === null;

  const handleAnswer = (answer: any) => {
    setFormState({ ...formState, [currentQuestionKey]: answer });
  };

  const handleNext = () => {
    if (nextQuestionKey) {
      setCurrentQuestionKey(nextQuestionKey);
    }
  };

  const handleBack = () => {
    // Basic back navigation
    const questionKeys = Object.keys(initialQuestions);
    const currentIndex = questionKeys.indexOf(currentQuestionKey);
    if (currentIndex > 0) {
      setCurrentQuestionKey(questionKeys[currentIndex - 1]);
    }
  };

  const totalQuestions = Object.keys(initialQuestions).length;
  const currentQuestionIndex = Object.keys(initialQuestions).indexOf(currentQuestionKey);
  const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;

  const renderQuestionContent = () => {
    switch (currentQuestion.type) {
      case "initial":
      case "singleChoice":
      case "multipleChoice":
        return (
          <div className="grid gap-4">
            {currentQuestion.options?.map((option) => (
              <Button
                key={option}
                variant="outline"
                className={cn(
                  "justify-start",
                  formState[currentQuestionKey] === option ? "bg-secondary text-secondary-foreground" : ""
                )}
                onClick={() => handleAnswer(option)}
              >
                {option}
              </Button>
            ))}
          </div>
        );
      case "range":
        return (
          <div className="grid gap-4">
            <Slider
              defaultValue={[0]}
              max={500000}
              step={10000}
              onValueChange={(value) => handleAnswer(value[0])}
            />
            <p className="text-sm text-muted-foreground">
              Selected Budget: {formState[currentQuestionKey] || 0} AED
            </p>
          </div>
        );
      default:
        return <p>Unknown question type.</p>;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Top Navigation */}
      <div className="flex items-center justify-between p-4 border-b">
        <Button variant="ghost" size="icon" onClick={handleBack} disabled={currentQuestionKey === "start"}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div className="text-sm text-muted-foreground">
          {currentQuestionIndex + 1}/{totalQuestions}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="p-4">
        <Progress value={progress} className="progress-animation" />
      </div>

      <div className="flex flex-1 items-center justify-center p-4">
        <Card className="max-w-md w-full flex flex-row">
          <div className="flex flex-col flex-1">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">{currentQuestion.question}</CardTitle>
            </CardHeader>
            <CardContent>{renderQuestionContent()}</CardContent>
            <div className="p-4">
              {nextQuestionKey ? (
                <Button onClick={handleNext}>Next</Button>
              ) : (
                <Button>Submit</Button>
              )}
            </div>
          </div>
          <div className="hidden md:block w-1/3">
            <img
              src="https://picsum.photos/300/400" // Replace with your image URL
              alt="Placeholder"
              className="object-cover h-full rounded-r-lg"
            />
          </div>
        </Card>
      </div>
    </div>
  );
}
