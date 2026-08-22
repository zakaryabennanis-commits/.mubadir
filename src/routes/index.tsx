import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "مبادر | المنصة الوطنية الموحّدة للتطوع في ليبيا" },
      {
        name: "description",
        content:
          "مبادر — منصة ليبيا الوطنية للتطوع. اكتشف فرصًا قريبة منك، طوّر مهاراتك، واحصل على شهادات معتمدة.",
      },
      { property: "og:title", content: "مبادر | منصة ليبيا الوطنية للتطوع" },
      {
        property: "og:description",
        content: "نربط المتطوعين بالفرص تحت مظلة رقمية واحدة، شفافة ودافئة.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <iframe
      src="/mubader.html"
      title="مبادر"
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        border: "none",
      }}
    />
  );
}
