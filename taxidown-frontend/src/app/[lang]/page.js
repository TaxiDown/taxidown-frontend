import Image from "next/image";
import { redirect } from 'next/navigation';
import HomePage from "./home/home";

export default async function Home({params}) {
  return (
    <>
    <HomePage params={await params}/>
    </>
  );
}