import { Suspense, useMemo, useState } from "react";
import Content from "./Content";
import prisma from "@/lib/prisma";

export default async function Home(context: any) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <main className="container mt-7">
        <h1 className="text-4xl font-medium mb-4">Long Do Home</h1>
        <Content />
      </main>
    </Suspense>
  );
}
