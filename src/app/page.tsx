import { OS } from "@/components/os/OS";
import { SeoContent } from "@/components/SeoContent";

export default function Page() {
  return (
    <>
      {/* Server-rendered content for crawlers and no-JavaScript clients. The
          interactive OS overlays this for visitors with JavaScript. */}
      <SeoContent />
      <OS />
    </>
  );
}
