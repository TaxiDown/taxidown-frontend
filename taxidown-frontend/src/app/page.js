import Image from "next/image";
import { redirect } from 'next/navigation';

export default function Home() {
  redirect('/login');
  return (
    <div className="w-[100vw]">
    </div>
  );
}
