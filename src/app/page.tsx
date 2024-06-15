 "use client"

import Button from "@/components/Button/page";
import DropDown from "@/components/dropDown/page";
import userQuiz from "../../store/page";
import { useState } from "react";
import {useToaster} from "react-hot-toast";


export default function Home() {

  const quizConfig = userQuiz((state) => state.config)
  const addNumberOfQuestions = userQuiz(state => state.addNumberOfQuestions)

  const { handlers } = useToaster()

  return (
    <div className="flex flex-col justify-center items-center my-10">
      <h1 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl ">
      <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-600">
          Welcome to Quizmifyy
        </span>
      </h1>
      <section className="p-10 my-10 rounded-lg shadow-xl w-[75%] bg-black shadow-blue-400">
        <div>
          <label
            htmlFor="first_name"
            className="block mb-2 text-sm font-medium text-white dark:text-white" >
            Number of Questions
          </label>
          <input
            type="number"
            defaultValue={10}
            max={50}
            min={0}
            id="first_name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="number"
            onChange={(e)=>addNumberOfQuestions(parseInt(e.target.value))}
          />
        </div>
        <div className="flex-col justify-center items-center">
          <DropDown />
          <Button />
        </div>
      </section>
    </div>
  );
}
