"use client";
import { WeatherApp } from "@/components/WeatherApp";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function WeatherPage() {
  const { back } = useRouter();
  return (
    <>
      <Link href="/weather/details">goto details</Link>
      <div onClick={() => back()}>back</div>
      <WeatherApp />
    </>
  );
}
