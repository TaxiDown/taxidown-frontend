import Image from "next/image";
import { redirect } from 'next/navigation';
import HomePage from "./(nav_pages)/home/home";

export const dynamic = 'force-static';       // ✅ Force static rendering
export const dynamicParams = false;          // ✅ Only generate the two defined

export async function generateStaticParams() {
  return [
    { lang: 'en' },
    { lang: 'es' },
  ];
}

export default async function Home({params}) {
  return (
    <>
    <HomePage params={await params}/>
    </>
  );
}