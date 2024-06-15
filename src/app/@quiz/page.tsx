"use client";
import { useEffect, useState } from "react";
import userQuiz from "../../../store/page";
import { cn } from "@/lib/utils";
import Trophy from "@/components/Trophy/page";
import Loader from "@/components/Loader/page";

export default function Quiz() {
  const [questions, setQuestions] = useState<any>([]);
  const [answer, setAnswer] = useState<string>("");
  const [isLoading, setLoading] = useState<boolean>(false);
  const config = userQuiz((state) => state.config);
  const addScore = userQuiz((state) => state.addScore);

  
  
  useEffect(() => {
    async function fetchQuestions() {
      try {
        
        
      } catch (error) {
        
      }
      setLoading(true);

      const response = await fetch(
        `https://opentdb.com/api.php?amount=${config.numberOfQuestion}&category=${config.category.id}&difficulty=${config.level}&type=${config.type}`
      );

      const data = await response.json();
      if (data.results) {
        const shuffuleResult = data.results.map((e) => {
          let value = [...e.incorrect_answers, e.correct_answer]
            .map((value) => ({ value, sort: Math.random() }))
            .sort((a, b) => a.sort - b.sort)
            .map(({ value }) => value);
          e.answers = [...value];
          return e;
        });
        
        setQuestions([...shuffuleResult]);
        
        setLoading(false);
        }
        }
        fetchQuestions();
        }, []);
        
        
      
        // handleNext
        const handleNext = () => {
          let remainingQuestions = [...questions];
          remainingQuestions.shift();
          setQuestions([...remainingQuestions]);
          setAnswer("");
        };
      
        // check answer
        const checkAnswer = (answer: string) => {
          if (answer === questions[0].correct_answer) {
            addScore(0);
            setAnswer(answer);
          } else setAnswer(questions[0].correct_answer);
        };
  
  
  return (
    <section className="flex flex-col justify-center items-center mt-10">
      {questions.length ? (
        <h1 className="flex items-center text-5xl font-extrabold   text-white  dark:text-white">
          Question Number
          {questions?.length ? (
            <span className="bg-blue-100 text-blue-800 text-2xl font-semibold me-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-2">
              <b> #{ config.numberOfQuestion - questions?.length +1 } </b>
            </span>
          ) : null}
        </h1>
      ) : null}

      {!isLoading && questions.length ? (
        <p className="text-3xl font-bold mt-4 text-white">Score : { config.score } </p>
      ) : (
        ""
      )}

      { isLoading && <Loader/> }

      {!questions.length && !isLoading && (
        <>
          <Trophy />
          <h1 className="flex items-center text-5xl font-extrabold   text-white dark:text-white">
            YOUR SCORE : {config.score}{" "}
          </h1>
          <button
            onClick={ () => window.location.reload() }
            type="button"
            className="mt-3 py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-100 hover:bg-blue-700 hover:text-white focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          >
            Restart Quiz
          </button>{" "}
        </>
      )}

      <section className="shadow-2xl w-[90%] my-10 p-10 rounded-lg flex flex-col justify-center items-center shadow-blue-400">
        <h1 className="flex items-center text-center text-3xl font-extrabold text-blue-800">
          {questions.length ? questions[0].question : null}
        </h1>
        <div className="flex justify-evenly items-center my-20 flex-wrap w-[90%]">
          {questions.length
            ? questions[0].answers.map((ans: string) => (
                <button
                  key={ans}
                  onClick={() => checkAnswer(ans)}
                  type="button"
                  className={cn(
                    "w-[33%] my-4 py-2.5 px-5 mr-2 mb-2 text-lg font-medium text-gray-900 focus:outline-none bg-white rounded-full border-0 hover:bg-blue-700 hover:text-gray-100 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 shadow-blue-300 shadow-lg",
                    {
                      "bg-red-500": answer && ans !== answer,
                      "bg-blue-700": answer && ans === answer,
                      "hover:bg-red-700": answer && ans !== answer,
                      "hover:bg-blue-700": answer && ans === answer,
                      "text-gray-100": answer,
                    }
                  )}
                >
                  {ans}
                </button>
              ))
            : null}
        </div>

        {questions.length ? (
          <button
            onClick={() => handleNext()}
            type="button"
            className="w-[33%] py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-100 hover:bg-blue-700 hover:text-white focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
            Next
          </button>
        ) : null}
      </section>
    </section>
  );
}
