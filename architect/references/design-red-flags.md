# Design red flags

Adapted from pstack at commit ae5650febf4320793844c12c4adaa937f417f8da; see ../LICENSE. Screen candidates and implementation, but require concrete consequences. Patterns below are questions, not automatic rewrite orders.

| Signal | Example to investigate | Prefer when evidence supports it | Valid exception |
|---|---|---|---|
| Shallow module | Caller coordinates load/validate/save and learns internals anyway | Small interface hiding coherent behavior/policy | Low-level primitives intentionally compose |
| Information leakage | Storage row or vendor response defines every caller's domain | Parse at boundary; domain owner owns representation | Protocol/client library intentionally exposes wire contract |
| Temporal decomposition | Each pipeline stage repeats same invariants and structure | Group knowledge with clear owner | Streaming/ETL phases have distinct contracts and real isolation |
| Pass-through layer | One-caller wrapper forwards identical arguments without policy | Delete forwarding layer or move useful responsibility | Compatibility, instrumentation or framework boundary adds real behavior |
| Split ownership | Two writers maintain independent copies of same state | One authority; explicit derived/read model | Distributed ownership with tested reconciliation is requirement |
| Two competing APIs | Callers choose old/new entry points for same operation | Migrate callers and retire obsolete path within approved compatibility policy | Public migration window requires both with exit condition |
| Importable internals | Callers bypass invariants through private module imports | Enforce package/module boundary using existing platform features | Existing documented public API must remain compatible |
| Hand-synced lists | New enum item requires edits in schema, registry and validator | Derive from one authority or assert consistency | Independent contracts cannot share source; test agreement |
| Speculative extension | Interface/factory/config exists for one fixed use | Direct code until demonstrated variation | Concrete approved integration needs extension point now |
| Missing operational behavior | Happy path works but retry corrupts data or failures lose state | Required validation, idempotency, recovery and diagnostics | Explicit bounded prototype with isolated disposable data |

For each proposed correction state affected requirement, evidence, smallest sufficient change, accepted ceiling and revisit trigger. Fewest files/lines is not sufficient if required behavior is missing. Future-proofing without documented future need is not sufficient either.
