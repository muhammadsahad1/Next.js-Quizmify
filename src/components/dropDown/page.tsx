"use client"

import { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import userQuiz from "../../../store/page";
import { Check, ChevronDown, Circle } from "lucide-react"

type categoryType = {
  id : number, 
  name : string 
}

const Type = ["boolean","multiple"]
const Level = ["easy","medium","hard"]

export default function DropDown() {

  const [categories,setCategories] = useState<categoryType[]>([])
  const addCategory = userQuiz(state => state.addCategory)
  const config = userQuiz(state => state.config)
  const addLevel = userQuiz(state => state.addLevel)
  const addType = userQuiz(state => state.addType)
  
  useEffect(()=>{

    async function fetchcategory(){
      const response = await fetch('https://opentdb.com/api_category.php')
      const data = await response.json()
      if(data.trivia_categories){
        setCategories(data.trivia_categories)
      }
      } 
      fetchcategory()
      },[])


  return (
    <section className="flex justify-evenly items-center py-5 ">
      <div className="px-7 py-4 w-1/3 mx-4">
        <DropdownMenu>
          <DropdownMenuTrigger className="flex outline-none justify-between w-full p-10 shadow-xl rounded-lg py-3 text-white hover:bg-blue-600">
          {config.category.name ? config.category.name : 'CATEGORY' } <ChevronDown/>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel></DropdownMenuLabel>
            <DropdownMenuSeparator />
            { categories.map(category => <DropdownMenuItem key={category.name} onClick={()=>addCategory(category.id,category.name)}>{category.name}</DropdownMenuItem> ) }
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="px-7 py-4 w-1/3 mx-4">
        <DropdownMenu>
          <DropdownMenuTrigger className="flex outline-none justify-between w-full p-10 shadow-xl text-white rounded-lg py-3 hover:bg-blue-600">
          {config.level ? config.level : 'LEVEL' } <ChevronDown/>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuSeparator />
            {
              Level.map(e => <DropdownMenuItem onClick={()=> addLevel(e) } key={e}> {e} </DropdownMenuItem> )
            }
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="px-7 py-4 w-1/3 mx-4">
        <DropdownMenu>
          <DropdownMenuTrigger className="flex outline-none justify-between text-white w-full p-10 shadow-xl rounded-lg py-3 hover:bg-blue-600">
          {config.type ? config.type : 'TYPE' } <ChevronDown/>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>SELECT TYPE</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {
              Type.map(e => <DropdownMenuItem key={e} onClick={()=>addType(e)} >{e}</DropdownMenuItem>  )
            }
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </section>
  );
}
