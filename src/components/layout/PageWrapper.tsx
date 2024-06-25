import { ReactNode } from "react";

export default function PageWrapper({ children }: { children: ReactNode }) {
  return <section className="box-border p-4" >
    {children}
  </section>
}
