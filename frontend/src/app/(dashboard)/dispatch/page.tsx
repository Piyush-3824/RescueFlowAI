import type { Metadata } from "next";
import { PageContainer } from "@/components/layout/page-container";

export const metadata: Metadata = { title: "Dispatch Control" };

export default function DispatchPage() {
  return (
    <PageContainer
      heading="Dispatch Control"
      subheading="Assign and manage emergency responder units"
    >
      {/* TODO: Implement DispatchPanel and UnitStatusGrid components */}
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="h-96 skeleton rounded-xl" />
        <div className="h-96 skeleton rounded-xl" />
      </div>
    </PageContainer>
  );
}
