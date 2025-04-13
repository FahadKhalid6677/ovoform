"use client";

import { useState, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import { ChevronsLeft } from "lucide-react";
import Image from 'next/image';
import { useRouter } from 'next/navigation';

// Logo component
const Logo = () => ( <div className="flex justify-center items-center p-4"> <Image src="/assets/Logoblack.png" alt="VentureFlow Navigator Logo" width={90} height={40} priority /> </div> );










const initialQuestions = {
    start: {
        question: "Do you have a business, or are you just starting out?",
        options: ["Existing 🏢", "New 🚀"],
        type: "initial",
        next: {
            "Existing 🏢": "existingCategory",
            "New 🚀": "newMotive",
        },
    },
    newMotive: {
        question: "What is the main motive for starting your project?",
        options: ["Passion Project ❤️", "Seasonal Opportunity ☀️", "Commercial Profit 💰"],
        type: "multipleChoice",
        next: "newBrandVision",
    },
    newBrandVision: {
        question: "Do you have an idea or brand vision?",
        options: ["Yes ✅", "No ❌"],
        type: "singleChoice",
        next: "newStylePreference",
    },
    newStylePreference: {
        question: "What's your style preference?",
        options: ["Elegant 🌸", "Classic 🏛️", "Sports 🏃", "Modern 🏢"],
        type: "multipleChoice",
        next: "newProductionKnowledge",
    },
    newProductionKnowledge: {
        question: "Do you have knowledge of production sources?",
        options: ["Looking for help 🙋", "Yes ✅", "No ❌"],
        type: "singleChoice",
        next: "newBudget",
    },
    newBudget: {
        question: "What is the estimated budget for production (AED)?",
        type: "range",
        next: "newSellingPlatforms",
    },
    newSellingPlatforms: {
        question: "Where do you intend to sell your products?",
        options: ["Instagram 📱", "Physical Store 🏬", "E-commerce Platforms 🌐", "Other Platforms ℹ️"],
        type: "multipleChoice",
        next: "newSupportFields",
    },
    newSupportFields: {
        question: "What field do you need support in?",
        options: ["Financing 💸", "Marketing 📣", "Product Management 📦", "Branding ✨"],
        type: "multipleChoice",
        next: "thankYou", // End of 'New' branch
    },
    existingCategory: {
        question: "What’s your business category?",
        options: ["Women's Fashion 👚", "Luxury Boutique 💎", "Men's Fashion 👔", "Children Fashion 🧸"],
        type: "singleChoice",
        next: "existingAge",
    },
    existingAge: {
        question: "How old is your business?",
        options: ["Less than a year 👶", "1–3 Years 🌱", "More than 5 years 🏢"],
        type: "singleChoice",
        next: "existingStrengths",
    },
    existingStrengths: {
        question: "What are the strengths of your brand?",
        options: ["Price 💰", "Quality 💎", "Design 🎨", "Customer Service 🤝"],
        type: "multipleChoice",
        next: "existingAudienceAge",
    },
    existingAudienceAge: {
        question: "What's your audience age demographic?",
        options: ["15–25 🧑‍🎓", "26–35 👩‍💼", "36–45 👩‍💼", "45+ 👵"],
        type: "singleChoice",
        next: "existingValue",
    },
    existingValue: {
        question: "What's the most important value you provide?",
        options: ["Competitive price 🏷️", "Sustainability ♻️", "Luxury 👑", "Excellence 🏆"],
        type: "singleChoice",
        next: "existingQualityControl",
    },
    existingQualityControl: {
        question: "How do you deal with quality problems in production?",
        options: ["Select Service ✅", "Intensive Quality Control ⚙️"],
        type: "singleChoice",
        next: "existingObstacle",
    },
    existingObstacle: {
        question: "What is the biggest obstacle you are facing now?",
        options: ["Production 🏭", "Financing 💸", "Marketing 📣", "Competition ⚔️", "Employees 🧑‍💼"],
        type: "multipleChoice",
        next: "thankYou", // End of 'Existing' branch
    },
    thankYou: {
        question: "Thank you for providing the information!",
        type: "thankYou",
        next: null,
    }
};

interface Question {
    question: string;
    options?: string[];
    type: "initial" | "multipleChoice" | "singleChoice" | "range" | "text" | "thankYou";
    next: string | { [key: string]: string } | null;
}

const ThankYou = () => (
    <div className="flex min-h-screen bg-background text-foreground items-center">
        <div className="flex flex-col justify-center w-1/2 pr-8">
            <h1 className="text-3xl font-bold mb-4">Great things are coming your way!</h1>
            <p className="text-lg">We take everyone who fills out this information very seriously. You are our top priority. Our team is brainstorming for you as we speak. We will be in touch soon!</p>
        </div>
        <div className="w-1/2 flex justify-center"> <Image src="/assets/Fashion Designer Studio Scene Apr 12 2025 (3).png" alt="Thank You" width={300} height={200} className="rounded-lg" /> </div>
    </div>
);




export default function Home() {
    const [currentQuestionKey, setCurrentQuestionKey] = useState<string>("start");
    const [formState, setFormState] = useState<{ [key: string]: any }>({ });
    const [isFormComplete, setIsFormComplete] = useState(false);

    const currentQuestion = initialQuestions[currentQuestionKey] as Question;

    const formType = formState['start'];

    const newQuestionKeys = useMemo(() => {
        return Object.keys(initialQuestions).filter(key =>
            key === 'start' ||
            key === 'newMotive' ||
            key === 'newBrandVision' ||
            key === 'newStylePreference' ||
            key === 'newProductionKnowledge' ||
            key === 'newBudget' ||
            key === 'newSellingPlatforms' ||
            key === 'newSupportFields' ||
            key === 'thankYou'
        );
    }, []);

    const existingQuestionKeys = useMemo(() => {
        return Object.keys(initialQuestions).filter(key =>
            key === 'start' ||
            key === 'existingCategory' ||
            key === 'existingAge' ||
            key === 'existingStrengths' ||
            key === 'existingAudienceAge' ||
            key === 'existingValue' ||
            key === 'existingQualityControl' ||
            key === 'existingObstacle' ||
            key === 'thankYou'
        );
    }, []);

    const questionKeys = useMemo(() => {
        if (formType === 'New 🚀') {
            return newQuestionKeys;
        } else if (formType === 'Existing 🏢') {
            return existingQuestionKeys;
        } else {
            return ['start'];
        }
    }, [formType, newQuestionKeys, existingQuestionKeys]);


    const handleAnswer = (answer: string) => {
        const updatedFormState = { ...formState, [currentQuestionKey]: answer };
        setFormState(updatedFormState);

        let nextQuestionKey: string | null = null;

        if (currentQuestion.next === null) {
            // End of the form
            console.log("Form completed!", updatedFormState);
            setIsFormComplete(true);
            setCurrentQuestionKey("thankYou");
        }
        else if (typeof currentQuestion.next === "string") {
            nextQuestionKey = currentQuestion.next; // Simple next question
        }
        else if (typeof currentQuestion.next === "object") {
            if (updatedFormState['start'] === 'New 🚀' && currentQuestion.next[answer]) {
                nextQuestionKey = currentQuestion.next[answer];
            }
            else if (updatedFormState['start'] === 'Existing 🏢' && currentQuestion.next[answer]) {
                nextQuestionKey = currentQuestion.next[answer];
            }
            else if (currentQuestion.next[answer]) {
                nextQuestionKey = currentQuestion.next[answer];
            }
        }

        if (nextQuestionKey) {
            setCurrentQuestionKey(nextQuestionKey);
        } else {
            // Handle the end of the questionnaire or an error
            console.log('Questionnaire completed or error occurred.');
            setIsFormComplete(true);
            setCurrentQuestionKey("thankYou");
        }
    };

    const handleBack = () => {
        const currentIndex = questionKeys.indexOf(currentQuestionKey);
        if (currentIndex > 0) {
            setCurrentQuestionKey(questionKeys[currentIndex - 1]);
        }
    };

    const newTotalQuestions = newQuestionKeys.length - 2;
    const existingTotalQuestions = existingQuestionKeys.length - 2;

    const newCurrentQuestionIndex = useMemo(() => {
        return newQuestionKeys.indexOf(currentQuestionKey) -1 ;
    }, [currentQuestionKey, newQuestionKeys]);

    const existingCurrentQuestionIndex = useMemo(() => {
        return existingQuestionKeys.indexOf(currentQuestionKey) -1 ;
    }, [currentQuestionKey, existingQuestionKeys]);


    const progress = useMemo(() => {
        if (formType === 'New 🚀') {
            return ((newQuestionKeys.indexOf(currentQuestionKey) -1) / newTotalQuestions) * 100;
        } else if (formType === 'Existing 🏢') {
            return ((existingQuestionKeys.indexOf(currentQuestionKey) -1) / existingTotalQuestions) * 100;
        } else {
            return 0;
        }
    }, [currentQuestionKey, formType, newQuestionKeys, existingQuestionKeys, newTotalQuestions, existingTotalQuestions]);


    useEffect(() => {
        console.log("Current Question Key:", currentQuestionKey);
        console.log("Form State:", formState);
    }, [currentQuestionKey, formState]);

   const renderQuestionContent = () => {
        switch (currentQuestion.type) {
            case "initial":
            case "multipleChoice":
            case "singleChoice":
                return (
                    <div className="choices-container">
                        {currentQuestion.options?.map((option) => (
                            <Button
                                key={option}
                                className={cn(
                                    "choice-button",
                                    formState[currentQuestionKey] === option ? "selected-choice" : ""
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
                            onValueChange={(value) => {
                                // Update the form state
                                setFormState({ ...formState, [currentQuestionKey]: String(value[0]) });
                            }}
                            onMouseUp={() => {
                                // Only proceed if a value has been selected
                                if (formState[currentQuestionKey]) {
                                    handleAnswer(formState[currentQuestionKey]);
                                } else {
                                    // Optionally handle the case where no value is selected, e.g., show a message
                                    console.log("Please select a budget value.");
                                }
                            }}
                        />
                        <p className="text-sm text-muted-foreground">
                            Selected Budget: {formState[currentQuestionKey] || 0} AED
                        </p>
                        <Button onClick={() => {
                            // Only proceed if a value has been selected
                            if (formState[currentQuestionKey]) {
                                handleAnswer(formState[currentQuestionKey]);
                            } else {
                                // Optionally handle the case where no value is selected, e.g., show a message
                                console.log("Please select a budget value.");
                            }
                        }}>Next</Button>
                    </div>
                );
            case "thankYou":
                return <ThankYou />;
            default:
                return <p>Unknown question type.</p>;
        }
    };

    const renderContent = () => {
         if (currentQuestion.type === "thankYou") {
             // Render ThankYou component with reduced top padding
             return (
                 <div className="flex flex-1 flex-col items-center justify-start">
                     <ThankYou />
                </div>
             );
         } else {
             // Render other questions with standard padding and question text
             return (<div className="flex flex-1 flex-col items-center justify-start p-8"> <div className="max-w-md w-full flex flex-col"> <div className="text-lg font-semibold">{currentQuestion.question}</div> <div className="p-4">{renderQuestionContent()}</div> </div> </div>
             );
         }
     };




    return (
        <div className="flex flex-col min-h-screen bg-background ">
            {/* Logo */}
            <Logo />

            {/* Progress Bar */}
            <div className="p-4">
                <div className="flex items-center justify-between">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={handleBack}
                        disabled={currentQuestionKey === "start"}
                    >
                        <ChevronsLeft className="h-4 w-4" />
                    </Button>
                    <Progress value={progress} className="progress-animation w-1/2" />
                    <div className="text-sm text-muted-foreground">
                        {formType === 'New 🚀'
                            ? `${newCurrentQuestionIndex} / ${newTotalQuestions}`
                            : formType === 'Existing 🏢'
                                ? `${existingCurrentQuestionIndex} / ${existingTotalQuestions}`
                                : ''}
                    </div>
                </div>
            </div>
            {renderContent()}
        </div>

    );
}
