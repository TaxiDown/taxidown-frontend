import Image from "next/image";
import { redirect } from 'next/navigation';

export default async function Home({params}) {
  redirect('/en/')
}