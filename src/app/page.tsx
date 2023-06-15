"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WeatherApp } from "../components/WeatherApp";

const queryClient = new QueryClient();
export default function Home() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <WeatherApp />
      </QueryClientProvider>
    </>
  );
}
