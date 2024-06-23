  "use client"

import userQuiz from "@/store/page";
import Link from "next/link";

export default function Button() {

  const addStatus = userQuiz(state => state.addStatus)
  
  return (
    <div className= "flex justify-center items-center">
      <button
        type="button"
        className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
        onClick={()=>addStatus('start')}>
        Start Quiz Now
      </button>
    </div>
  );
}
