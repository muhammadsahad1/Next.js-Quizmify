"use client"
import { Inter } from "next/font/google";
import "./globals.css";
import userQuiz from "../store/page";

const inter = Inter({ subsets: ["latin"] });


export default function RootLayout({
  children,
  quiz
}: {
  children: React.ReactNode;
  quiz: React.ReactNode;
}) {

  const config = userQuiz(state => state.config)
  let render = config.status === 'start' ? quiz:children
  console.log("render ===> ", config.status,render)

  return (
    <html lang="en">
      <body className={inter.className}>{render}</body>
    </html>
  );
}
