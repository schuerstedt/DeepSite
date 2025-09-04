# Remark: this is a draft concept paper in what my Deepsite system might evolve. Renamed into DeepLearn maybe :). My current system if for me more a proof of concept - that something like this is possible. For questions/comments I am open for discussion. 

# AI‑Driven, Style‑Aware LMS — Concept Paper (v0.2)

**Date:** 04 Sep 2025
**Scope:** Negotiation 101 as a running example, generalizable to fast‑moving domains (e.g., AI/RAG)

---

## Executive intent

Build an evergreen learning system where courses are assembled from versioned, testable fragments. A planner continuously curates and proposes updates from a living **Content Rack** of instructor uploads and vetted research. A renderer hydrates lesson blocks on demand in the learner’s selected **visual style** and **cohort profile**, then measures outcomes quietly and improves variants over time. Editors stay in control through human‑in‑the‑loop approvals, provenance, and clear diffs; learners experience personalized, stable lessons that feel written for them.

---

## System at a glance

The platform separates three concerns. First, **Evidence**: everything the author or the system finds is normalized into asset cards with rights, summaries, tags, and embeddings. Second, **Plan**: lessons are versioned blueprints composed of blocks (objective, explanation, worked example, practice, reflection, assessment) with clear acceptance checks. Third, **Render**: pages ship with dynamic placeholders; long text, images, and audio are generated just‑in‑time per style and per cohort, cached, and reused.

A steady heartbeat runs **ingest → research → plan → render → learn → improve**. For slow‑changing topics (Negotiation 101) the cadence is measured; for volatile topics (AI systems) the planner watches sources continually and files change proposals without destabilizing the published course.

---

## Content Rack (ingestion) and Research Mode

Uploads (PPTX/PDF/DOCX/notes/whiteboards) and curated web sources are shelved as **Asset Cards**: stable ID and checksum; type (slide, diagram, figure, transcript, code); rights (owned, licensed with terms, reference‑only); machine summaries; concept and pedagogy tags; embeddings for retrieval; quality signals; and segments (per slide, per figure, or time range in media). Images get OCR and alt‑text; diagrams gain a style‑neutral vector (SVG/Excalidraw) so they can be re‑rendered later without losing meaning.

Before planning, authors enter **Research Mode** to accept or reject suggested external sources, forming an **Evidence Board** per lesson concept. Only accepted assets enter the rack; reference‑only assets may inspire derivatives but are never shown verbatim. A similarity gate blocks near‑copies when the renderer paraphrases or re‑draws from references.

---

## Planner: proposals, not rewrites

The planner converts objectives into a lesson blueprint. For each block it drafts an instruction and cites **asset intents** (e.g., “prefer SLIDE‑12’s diagram; if rights=reference‑only, re‑render in current style and cite”). It attaches **acceptance checks** that downstream validators can assert (“must define BATNA explicitly; mention REACH compliance risk”).

The planner runs continuously with three operating modes. In **Conservative**, it only proposes diffs that meet strict confidence and rights thresholds; assessments require explicit approval. In **Active**, it may canary updated examples for small cohorts and surface results for approval. In **Autonomous**, it can accept low‑risk updates within a freshness budget for internal or sandbox courses, issuing weekly digests and instant rollbacks if metrics fall.

Every change enters review as a plan‑diff rather than a wholesale rewrite, so published courses evolve without whiplash. On merge, only affected fragments are invalidated; the renderer hydrates those on demand while canarying old versus new as needed.

---

## Renderer: style‑aware, cohort‑aware hydration

Pages ship with semantic scaffolding and **dynamic placeholders** for long content:

```html
<div
  data-generatetext="Worked example: procurement in chemical manufacturing; EU context; show outside options and compliance risks; conclude with explicit BATNA."
  data-key="negotiation101.batna.worked_example.excalidraw.chemicals.v1-role.procurement.mid-region.eu.de"
  data-length="medium"
  data-tone="confident"
  data-audience="mid-level procurement managers"
  data-lang="en">Loading…</div>
```

At runtime the client composes a system prompt from structural rules plus the chosen **style manifest** and the learner’s **cohort** and requests a fragment via the text service (e.g., Pollinations through our proxy). Returned HTML is sanitized, cached by the key, and reused. Images and audio follow the same law: a prompt plus parameters and a seed, cached under the same key space for reproducibility.

---

## Styles as manifests

A **style** is not a vibe string; it’s a tiny, named manifest of prompt guidance, tokens, and optional libraries. Excalidraw produces sketch aesthetics and rough diagrams; Corporate Slide yields crisp typography and formal tone; Material uses elevation and color tokens. Substance remains identical across styles; only skin changes. Authors and learners can switch skins globally without changing the lesson plan or fragment keys, preserving caches and provenance.

---

## Personalization via cohorts (reuse without chaos)

Learner profiles snap to a small grid: industry, role/seniority, region/regulation, language, tone, and time budget. Each point on that grid is a **cohort** (e.g., `chemicals.v1 + role.procurement.mid + region.eu.de + lang.en + tone.confident + time.standard`). The renderer’s cache key is simply `(lesson, concept, block, style, cohort, difficulty?, seed?)`. The first learner in a cohort triggers generation; later learners reuse the best variant instantly. A lightweight bandit shifts traffic among variants for a key using behavioral signals—dwell time, reveal rates, micro‑check correctness—and humble ratings; editors can lock or promote variants at any point.

A **“Make it mine”** control lets a learner switch style or perspective on demand; when the request aligns with an existing cohort the system snaps to it, otherwise it forms a temporary fork without polluting the cohort taxonomy.

---

## Assessments and mastery

Assessment blocks return with grading hooks: MCQ includes correct indices and rationales; short answers include rubrics; code/math includes unit tests or symbol checks. A tiny learner model (start with logistic knowledge tracing) updates per‑concept mastery using outcomes and time‑on‑task, and the planner adapts difficulty accordingly. Assessments update on a separate cadence with explicit versioning so learners never see mid‑attempt changes.

---

## Copyright, provenance, and audit

Three lanes keep the posture clean. **Owned** assets may be shown verbatim with credit. **Licensed/CC** assets display with license‑specific attribution. **Reference‑only** assets inspire paraphrases or re‑renders; similarity gates catch near‑copies. Every fragment carries a small provenance stub—model, prompts, seed, style, and asset lineage—so audits and rollbacks are trivial. Pages render visible credits on figures and a rolled‑up bibliography per lesson.

---

## Reliability, performance, and safety

Hydration runs through a small queue with bounded concurrency and exponential backoff; caches are salted by model, style, cohort, tone, length, and language. Sanitizers whitelist text‑level tags and safe URLs; no inline event handlers or styles are allowed from generation. Accessibility is first‑class: reduced‑motion and high‑contrast modes in style manifests, meaningful headings, alt text, and visible focus rings. Speech synthesis for long explanations is keyed to the same block ID and cached after first synthesis; transcripts are always rendered.

---

## User stories

**As a course designer,** I upload my Negotiation 101 deck and a few case studies. The system segments slides, extracts concepts like BATNA and ZOPA, and offers a Research Mode list of recent, licensed articles. I accept three, reject two, and tag a slide that I want re‑drawn in Excalidraw. The planner proposes a lesson outline with objectives, a diagnostic, an explanation, a worked example, practice, a reflection, and a quiz. For each block it shows which assets it will use or re‑render and what success looks like. I approve the plan, publish a draft, and the renderer hydrates only what is viewed. After a week, I receive a plan‑diff: a stronger supplier‑side example for the BATNA block in the chemicals‑procurement cohort. I review its evidence and metrics, accept it for canarying, then promote it to default when it outperforms the current variant.

**As a course designer,** I switch the course skin from Excalidraw to Corporate Slide for an executive cohort. With one click the visual style changes globally; caches remain valid where content is shared. Assessments stay pinned to their prior version until I opt to update and re‑approve them.

**As a course designer,** I set the planner to Active mode for my fast‑moving AI course. It watches curated sources, files daily diffs with evidence and risk tags, and canary‑tests non‑assessment blocks for a small fraction of traffic. I get a weekly digest summarizing merges, reversions, and cohort‑level performance.

**As a learner in chemical manufacturing procurement,** I open the BATNA lesson and the worked example reads like my world: multi‑year isocyanate supply, a parallel RFP as an outside option, a note on REACH risk. I tap “Make it mine,” select Corporate Slide, and the same facts re‑render in a formal tone. I pass the micro‑check; the next block nudges difficulty up a notch. I never feel like I’m training the system, but my choices and performance quietly steer which variants the cohort will see next time.

**As a learner in sales,** I flip the example’s perspective to supplier‑side. The system recognizes a neighboring cohort and serves the best available supplier‑flavored variant immediately, offering another take only if I ask for one.

**As an administrator,** I open an audit view for a complaint about a figure. In two clicks I see its asset lineage, rights lane, and where else it is used; I can retire it rack‑wide, prompting the planner to propose replacements in the next digest.

---

## Minimal interfaces (orientation, not prescription)

**Lesson Plan item (planner → renderer, narrative):** a block declares its purpose (e.g., worked example for BATNA), cites asset intents (show or re‑render SLIDE‑12; paraphrase TRANSCRIPT‑03:02–03:45), and lists acceptance checks the validator will assert. **Renderer response (renderer → LMS):** returns HTML plus metadata (purpose, concepts, cognitive level, estimates, grading hooks) and provenance (style, cohort, model, prompts, seed, assets).

**Placeholder contract (on page):** each long‑form region carries `data-generatetext` (self‑contained instruction), `data-key` (stable and cohort‑aware), and hints like `data-length`, `data-tone`, `data-audience`, and `data-lang`. The client composes the final system prompt from the structural default plus the active style manifest and optional per‑block override.

---

## Rollout path

Start with a narrow slice. Phase one: Content Rack + Research Mode + Negotiation 101 planner that outputs a single lesson with placeholders, Excalidraw style only, and one cohort taxonomy (industry and role). Phase two: renderer hydration with caching, sanitization, and provenance; micro‑checks with grading; simple bandit on two variants per key. Phase three: style manifests and cohort expansion; plan‑diff review UI; Active mode for a volatile course; audio synthesis and transcripts. Each phase ships with tests and can run in isolation.

---

## Risks and mitigations

**Drift in tone or structure** is restrained by strict prompts, low temperatures for structure, validators, and repair turns. **License mistakes** are reduced by the rack’s rights lanes, visible credits, and similarity gates. **Cost spikes** are tamed by cohort‑level caching, bandits that prefer reuse, and bounded concurrency with backoff. **Learner confusion** is avoided by pinning assessments and by applying changes through canarying and digests rather than sudden global rewrites.

---

## Closing

By separating what we know (assets), what we plan (blueprints), and what we render (fragments), we get a course factory that keeps learning while people learn from it. Editors remain authors, not babysitters; learners feel seen without micromanaging settings; and the system gets better every week without turning into a black box.

---

# Appendices — Schemas, User Stories, and Negotiation‑101 Sample

## A. Data schemas (TypeScript)

```ts
// Content Rack
export type RightsLane = "owned" | "licensed" | "reference_only";

export interface AssetSegment {
  id: string;                 // e.g., "slide:12" or "transcript:00:03:02-00:03:45"
  kind: "slide" | "figure" | "diagram" | "image" | "table" | "transcript" | "code" | "audio" | "video";
  summary: string;            // short, human summary
  concepts: string[];         // e.g., ["batna", "zopa"]
  pedagogy: string[];         // e.g., ["definition", "worked_example"]
  ocrText?: string;           // extracted text if image/slide
  svg?: string;               // style‑neutral vector re‑render (if available)
  timeRange?: { start: string; end: string }; // for media segments
}

export interface AssetCard {
  id: string;                 // stable ID (checksum‑salted)
  checksum: string;           // SHA‑256 of original
  type: "deck" | "pdf" | "image" | "doc" | "link" | "audio" | "video";
  source: { kind: "upload" | "web"; url?: string; filename?: string };
  rights: { lane: RightsLane; terms?: string; attribution?: string };
  createdAt: string;          // ISO
  ownerUserId: string;
  summary: string;
  concepts: string[];         // tags for retrieval
  pedagogy: string[];         // tags for intended didactic use
  quality: { autoScore?: number; humanScore?: number };
  segments: AssetSegment[];
  embeddingsRef?: string;     // pointer to vec store
}

// Style manifest — wired to your style selector
export interface StyleManifest {
  id: string;                 // e.g., "excalidraw", "corporate-slide", "material"
  name: string;
  prompt: string;             // appended to the system prompt
  tokens?: Record<string,string>; // optional CSS variables/tokens
  libs?: { name: string; src: string }[]; // optional explicit libs
  imagePromptSuffix?: string; // appended to Pollinations image prompts for coherence
}

// Cohorts and learner profile
export interface CohortProfile {
  industry: string;           // e.g., "chemicals.v1"
  role: string;               // e.g., "role.procurement.mid"
  region: string;             // e.g., "region.eu.de"
  lang: string;               // e.g., "en"
  tone: string;               // e.g., "confident"
  timeBudget: "micro" | "standard" | "deep";
  styleId: string;            // links to StyleManifest.id
}
export type CohortId = string; // composed: `${industry}+${role}+${region}+${lang}+${tone}+${timeBudget}`

// Lesson plan
export type BlockType =
  | "objectives" | "diagnostic" | "explanation" | "worked_example"
  | "practice_mcq" | "practice_short" | "reflection" | "quiz" | "reading";

export interface AssetIntent {
  use: "diagram" | "figure" | "facts" | "quote" | "data";
  mode: "show" | "re_render" | "paraphrase";
  assetId: string;            // AssetSegment.id
}

export interface PlanBlock {
  concept: string;            // canonical label (e.g., "batna")
  type: BlockType;
  instruction: string;        // self‑contained renderer instruction
  assetIntents?: AssetIntent[];
  acceptance?: string[];      // checks for validators to assert
  difficulty?: "base" | "stretch";
}

export interface LessonPlan {
  id: string;                 // e.g., "negotiation101"
  version: string;            // semver
  objectives: string[];
  blocks: PlanBlock[];        // ordered
  sources: string[];          // human‑readable bibliography entries
}

// Plan diffs (planner → review)
export type ChangeKind = "add_block" | "update_block" | "remove_block" | "reorder_blocks" | "update_objectives";
export interface PlanDiff {
  planId: string;
  baseVersion: string;
  proposedVersion: string;
  changes: Array<{
    kind: ChangeKind;
    target?: { concept?: string; index?: number };
    before?: PlanBlock | string[]; // block or objectives
    after?: PlanBlock | string[];
    evidenceAssets?: string[];     // AssetSegment IDs backing the change
    risk: "low" | "medium" | "high";
    confidence: number;            // 0..1
  }>;
}

// Renderer request/response
export interface FragmentRequest {
  lessonId: string;
  concept: string;
  blockType: BlockType;
  instruction: string;
  styleId: string;
  cohortId: CohortId;
  lang: string;
  tone: string;
  length: "short" | "medium" | "long";
  constraints?: { width?: number; a11y?: { reducedMotion?: boolean; highContrast?: boolean } };
}

export interface FragmentResponse {
  html: string;               // sanitized fragment
  meta: {
    purpose: BlockType;
    concepts: string[];
    cognitiveLevel?: "remember"|"understand"|"apply"|"analyze"|"evaluate"|"create";
    estTimeSec?: number;
    difficulty?: "base"|"stretch";
    grading?: MCQGrading | ShortGrading | CodeGrading | null;
    provenance: {
      styleId: string;
      cohortId: CohortId;
      model: string;
      prompts: { system: string; user: string };
      seed?: number;
      assets?: Array<{ id: string; mode: "show"|"re_render"|"paraphrase" }>;
    };
  };
}

export interface MCQGrading {
  kind: "mcq";
  correct: number[];          // indices
  rationales?: string[];      // optional, per option
}
export interface ShortGrading {
  kind: "short";
  rubric: string[];           // bullet points
}
export interface CodeGrading {
  kind: "code";
  tests: { name: string; input: string; expect: string }[];
}

// Cache manifest (renderer side)
export interface CacheEntry {
  key: string;                // see derivation below
  variantId: string;          // monotonic within key
  htmlHash: string;
  model: string;
  seed?: number;
  scores: { thumbs?: number; dwellP50?: number; microcheckCorrect?: number };
  approved: boolean;
  updatedAt: string;          // ISO
}

// Telemetry (minimal)
export interface BlockEvent {
  key: string;                // same as cache key
  type: "render" | "dwell" | "expand" | "like" | "dislike" | "microcheck_submit";
  ms?: number;                // dwell time where applicable
  correct?: boolean;          // for microchecks
  ts: string;                 // ISO
}
```

**Cache key derivation** (string form):

```
${lessonId}.${concept}.${blockType}.${styleId}.${cohortId}.${lang}.${tone}.${difficulty?}.${seed?}
```

---

## B. Expanded user stories

**Course designer — evidence to plan.** I upload a PPTX and two PDFs. The system segments slides, extracts concepts (BATNA, ZOPA, anchoring) and proposes a plan. In Research Mode it suggests three recent case studies with clear licenses. I accept two, reject one, and mark slide 12’s diagram “re‑render in Excalidraw with citation.” The planner files a plan‑diff. I approve; only the affected blocks will hydrate on first view.

**Course designer — volatile domain.** I maintain “RAG Systems in Practice.” Planner mode is Active. Each morning I see diffs: a new retrieval strategy paper (low risk), a caution on eval metrics (medium), and a breaking API change (high). I approve the first two, schedule the third for Friday after I update assessments.

**Course designer — style switch.** Feedback says executives prefer a cleaner look. I switch from Excalidraw to Corporate Slide. The chrome reskins instantly; caches remain valid where substance is unchanged. Assessments keep their prior version until I push a pinned update.

**Learner — cohort fit without micromanaging.** I select “Procurement, Chemical Manufacturing, EU,” language English, tone Confident, time Standard. BATNA examples speak my world. I hit “Make it mine” once to see supplier‑side; the system recognizes a neighboring cohort and snaps to that cached variant next time without me thinking about it.

**Learner — seamless improvement.** I give a thumbs‑down on one example. Next page load, a better variant appears; I don’t know or care that a bandit promoted it. The course simply feels sharper.

**Administrator — audit and rollback.** A complaint flags a figure. In Audit view I see it originated from SLIDE‑12 (owned), was re‑rendered, and appears in three lessons. I retire it rack‑wide; the planner proposes replacements in the next digest; published pages continue serving cached variants until new ones are approved.

**Accessibility lead — assured inclusion.** I toggle high‑contrast and reduced motion at the style layer. The renderer respects it automatically in fragments; animations are disabled, focus rings are clear, captions are enforced on media.

---

## C. Negotiation‑101 sample lesson plan and page

### C1. Lesson Plan (excerpt)

```json
{
  "id": "negotiation101",
  "version": "1.0.0",
  "objectives": [
    "Define BATNA and identify it in a workplace scenario",
    "Differentiate BATNA from reservation price and ZOPA",
    "Apply BATNA thinking to evaluate offers"
  ],
  "blocks": [
    {
      "concept": "batna",
      "type": "explanation",
      "instruction": "Explain BATNA plainly with one workplace analogy and one counter‑example (what BATNA is not).",
      "acceptance": ["uses workplace analogy", "contrasts with reservation price"],
      "assetIntents": [{"use":"facts","mode":"paraphrase","assetId":"transcript:00:03:02-00:03:45"}]
    },
    {
      "concept": "batna",
      "type": "worked_example",
      "instruction": "Create a procurement scenario in chemical manufacturing (EU, DACH) with an explicit outside option and a closing sentence that states the BATNA.",
      "acceptance": ["mentions supplier diversification","notes REACH compliance risk","explicit BATNA statement"],
      "assetIntents": [{"use":"diagram","mode":"re_render","assetId":"slide:12"}]
    },
    {
      "concept": "batna",
      "type": "practice_mcq",
      "instruction": "Two MCQs based on the worked example; require identifying BATNA vs. reservation price; include rationales.",
      "acceptance": ["two questions","rationales present"]
    },
    {
      "concept": "zopa",
      "type": "explanation",
      "instruction": "Define ZOPA with a simple number line diagram and a numeric mini‑case.",
      "assetIntents": [{"use":"diagram","mode":"re_render","assetId":"slide:18"}]
    }
  ],
  "sources": [
    "Fisher & Ury, Getting to Yes (reference‑only)",
    "YourUpload: Negotiation101.pptx (owned)"
  ]
}
```

### C2. Page skeleton with your existing system (placeholders + Pollinations)

> The following snippet shows how a single lesson route renders using **your** dynamic text and image approach: text via `data-generatetext` placeholders (fetched by your `generatetext.js`), images via Pollinations prompt URLs, and style supplied by the selector.

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>Negotiation 101 — BATNA</title>
  <meta name="description" content="Learn BATNA with industry‑specific examples and quick checks." />
  <script src="https://cdn.tailwindcss.com"></script>
  <!-- Your runtime -->
  <script src="/generatetext.js"></script>
  <script src="/interactive-features.js"></script>
</head>
<body class="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
  <header class="container mx-auto px-4 py-6 flex items-center justify-between">
    <a class="text-xl font-bold">Negotiation 101</a>
    <nav aria-label="Primary" class="space-x-6">
      <a href="/lessons/batna" class="hover:underline">BATNA</a>
      <a href="/lessons/zopa" class="hover:underline">ZOPA</a>
    </nav>
  </header>

  <main class="container mx-auto px-4 py-8">
    <!-- Hero image via Pollinations (seed for determinism); style coherence via style manifest suffix -->
    <figure class="mb-8">
      <img
        src="https://image.pollinations.ai/prompt/${encodeURIComponent('Abstract negotiation diagram, two-option decision tree, European industrial context, clean minimal style, no text')}
             ?width=1600&height=600&model=flux&enhance=true&seed=42"
        width="1600" height="600" alt="Negotiation decision tree" class="rounded-lg" />
      <figcaption class="text-sm text-slate-600 mt-2">Visual overview (rendered)</figcaption>
    </figure>

    <section class="mb-12 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm rounded-xl border p-8 shadow-lg">
      <h1 class="text-4xl md:text-5xl font-bold mb-6">BATNA in practice</h1>
      <div
        data-generatetext="Explain BATNA plainly with one workplace analogy and one counter‑example (what BATNA is not)."
        data-key="negotiation101.batna.explanation.${'${styleId}'}.${'${cohortId}'}"
        data-length="medium" data-tone="confident" data-audience="mid‑level professionals" data-lang="en">Loading…</div>
    </section>

    <section class="mb-12 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm rounded-xl border p-8 shadow-lg">
      <h2 class="text-3xl md:text-4xl font-bold mb-4">Worked example — Chemicals (EU)</h2>
      <!-- Diagram derived from SLIDE‑12, re‑rendered in current style -->
      <figure class="my-6">
        <img
          src="https://image.pollinations.ai/prompt/${encodeURIComponent('Sketch of supply negotiation scenario, chemical manufacturing procurement, outside option branch, REACH compliance note, hand‑drawn look, no text')}
               ?width=1200&height=600&model=flux&enhance=true&seed=43"
          width="1200" height="600" alt="Procurement scenario diagram" class="rounded-lg" />
        <figcaption class="text-sm text-gray-500">Re‑rendered from your slide 12 · © You</figcaption>
      </figure>
      <div
        data-generatetext="Create a procurement scenario in chemical manufacturing (EU, DACH) with an explicit outside option and a closing sentence that states the BATNA."
        data-key="negotiation101.batna.worked_example.${'${styleId}'}.${'${cohortId}'}"
        data-length="medium" data-tone="confident" data-audience="procurement managers" data-lang="en">Loading…</div>
    </section>

    <section class="mb-12 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm rounded-xl border p-8 shadow-lg">
      <h2 class="text-3xl md:text-4xl font-bold mb-4">Quick check</h2>
      <div
        data-generatetext="Two MCQs based on the scenario; test identifying BATNA vs reservation price; include rationales and mark correct indices for grading."
        data-key="negotiation101.batna.practice_mcq.${'${styleId}'}.${'${cohortId}'}"
        data-length="short" data-tone="neutral" data-lang="en">Loading…</div>
    </section>
  </main>

  <footer class="container mx-auto px-4 py-8 text-sm text-slate-600">© Your Org</footer>
</body>
</html>
```

Notes:

1) **Text** hydrates via your `generatetext.js`. The composed system prompt = structural default + active style manifest + optional per‑block override; fragments are sanitized and cached by key.
2) **Images** use Pollinations with deterministic seeds; prompts include style‑coherence phrases from the manifest.
3) **Keys** include `styleId` and `cohortId` so cache reuse is maximized across learners with the same profile.

### C3. Validator checks (minimum set)

- Headings are hierarchical; sections carry accessible names.
- Generated fragments do not introduce inline styles or event handlers; only whitelist tags (`p, ul, ol, li, h3–h6, strong, em, a, figure, figcaption, blockquote`).
- Images include width/height matching URL params, alt text, and visible focus rings on links.
- MCQ fragments must include machine‑readable grading hooks (data attributes or JSON script tag) when present.

### C4. Bandit & caching sketch

- Cache key: `${lesson}.${concept}.${block}.${style}.${cohort}.${lang}.${tone}`; a `variantId` distinguishes competing variants.
- Thompson sampling or ε‑greedy over existing variants; generate a new variant only when the current best underperforms thresholds on dwell and correctness.
- Editors can **lock** variants or **promote** canary winners to default.

---

## D. Style manifests (examples)

```ts
export const EXCALIDRAW: StyleManifest = {
  id: "excalidraw",
  name: "Excalidraw",
  prompt: "Render content with hand‑drawn sketch aesthetics; prefer analogies; keep headings concise; avoid dense tables; describe diagrams plainly.",
  imagePromptSuffix: "hand‑drawn sketch style, rough strokes, no text",
};

export const CORPORATE_SLIDE: StyleManifest = {
  id: "corporate-slide",
  name: "Corporate Slide",
  prompt: "Formal tone, crisp typography, concise bullets with evidence; emphasize clarity and takeaways; avoid slang.",
  imagePromptSuffix: "clean corporate slide aesthetic, minimal palette, no text",
};
```

These are wired to your style selector; the selected manifest is appended to the system prompt for every text fragment and to the image prompts for Pollinations.

---

## E. Next steps

1) Implement the AssetCard ingestion UI and Research Mode (accept/reject into the rack).
2) Emit Lesson Plan JSON from accepted evidence; render the Negotiation‑101 sample page above.
3) Add the minimal validator and the cache/bandit loop; expose an Audit view for provenance.
4) Expand to a second style and a second cohort to exercise reuse.
