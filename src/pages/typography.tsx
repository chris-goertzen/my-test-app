import { PageHeader, Section } from "@/components/section"

export default function TypographyPage() {
  return (
    <>
      <PageHeader
        eyebrow="Category"
        title="Typography"
        description="Display, body, lead, quote, lists and inline code. Designed for sustained reading."
      />

      <Section title="Headings" description="Display and section headings.">
        <div className="space-y-4">
          <h1 className="typo-display scroll-m-20 text-4xl font-semibold tracking-tight lg:text-5xl">
            The principles of beautiful UI
          </h1>
          <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
            Type, grid, contrast
          </h2>
          <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">A measured hierarchy</h3>
          <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">Subsection title</h4>
        </div>
      </Section>

      <div className="my-8" />

      <Section title="Lead, paragraph & muted" description="Body copy variants with appropriate leading.">
        <div className="space-y-4">
          <p className="text-xl text-muted-foreground">
            A lead paragraph introduces a topic with slightly larger, lighter text.
          </p>
          <p className="leading-7">
            The quick brown fox jumps over the lazy dog. Body copy is rendered at
            16px with relaxed leading for comfortable reading. Inline emphasis is
            achieved with <strong>strong</strong> and <em>emphasis</em>. Links use{" "}
            <a className="font-medium text-primary underline underline-offset-4" href="#">
              an offset underline
            </a>{" "}
            to retain rhythm.
          </p>
          <p className="text-sm text-muted-foreground">
            Smaller meta text — e.g. captions and helper copy — uses the muted
            foreground colour.
          </p>
        </div>
      </Section>

      <div className="my-8" />

      <Section title="Blockquote" description="Pulled, indented quotation.">
        <blockquote className="mt-6 border-l-2 pl-6 italic">
          "After all," he said, "everyone enjoys a good quotation." The cite is
          rendered with italic styling and a left border to mark its provenance.
        </blockquote>
      </Section>

      <div className="my-8" />

      <Section title="List" description="Ordered, unordered and definition.">
        <div className="grid gap-6 md:grid-cols-2">
          <ul className="my-2 ml-6 list-disc space-y-1.5 text-sm [&>li]:mt-1">
            <li>1st level of hierarchy</li>
            <li>2nd level of hierarchy</li>
            <li>3rd level of hierarchy</li>
          </ul>
          <ol className="my-2 ml-6 list-decimal space-y-1.5 text-sm [&>li]:mt-1">
            <li>Open the dashboard</li>
            <li>Press "Deploy"</li>
            <li>Wait for the build</li>
          </ol>
        </div>
      </Section>

      <div className="my-8" />

      <Section title="Inline & block code" description="Mono code samples with subtle background.">
        <div className="space-y-4">
          <p className="text-sm">
            Use <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">npm install</code> to add a package.
          </p>
          <pre className="overflow-x-auto rounded-md bg-muted p-4 text-xs leading-relaxed">
            <code>{`import { Button } from "@/components/ui/button"

export default function Demo() {
  return <Button>Click me</Button>
}
`}</code>
          </pre>
        </div>
      </Section>
    </>
  )
}
