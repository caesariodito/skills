# Stack contracts and evidence

Reference architecture, not an instruction to install every component. Prefer existing instrumentation and one intentional collection route per signal; avoid exporting duplicate logs/spans to the same backend. App teams own SDK lifecycle and privacy; collector/backend operators own ingestion, retention, access and availability.

## pkg-logging (Go only)

Inspected source: [batikwolter/pkg-logging](https://github.com/batikwolter/pkg-logging), commit `650534002418acfc8d669ff240c6b98dbafd611a`. Its Go module/import path is **`github.com/deccara-tech/pkg-logging`**, not the GitHub URL owner. Recheck target app's pinned version and source before using APIs; do not install `@latest` automatically.

Read upstream [INTEGRATION.md](https://github.com/batikwolter/pkg-logging/blob/650534002418acfc8d669ff240c6b98dbafd611a/INTEGRATION.md) and actual implementation when integration changes. Current contract:

- `observe.New` keeps structured JSON stdout; flat dotted fields include `service.name`, `service.version` when supplied, `env`, event and request/correlation metadata. Map `env` deliberately to OTel `deployment.environment.name` at app/collector boundary without silently changing log schema.
- Unary gRPC client/server interceptors own one completion event each; handlers own domain events. Package does not automatically instrument HTTP, streaming RPC, metrics or distributed tracing.
- Legacy `x-request-id`, `x-correlation-id`, `x-trace-id`, `x-source-service` metadata supports searchable correlation. Generated `trace.id` does not create native OTel parents or Sentry trace linkage. Add compatible native propagation deliberately, including async message boundaries, and validate untrusted inbound metadata.
- `observe/sentry.New(client)` emits Sentry **Logs**, not Issues. Application initializes SDK, binds safe request/job scopes, captures original unexpected exceptions once, configures privacy callbacks and checks bounded flush results. `observe.Error` retains text, not original exception object. Keep JSON stdout; Sentry Logs optional to avoid unnecessary duplicate ingest.
- `observe/otlp.New(provider)` uses explicit OTel log provider and official slog bridge. It creates no exporter, collector, metrics, spans, global provider, Resource or shutdown lifecycle. Valid active OTel context supplies native TraceId/SpanId; custom log fields do not.
- Core denylist masks top-level field keys only: message/error text, nested objects, SDK scope enrichment and provider Resource need separate controls. `SendDefaultPII: false` is not complete scrubbing.
- Remote OTLP export requires fail-closed application privacy wrapper around downstream batch processor, registered exactly once. Separate privacy and exporter processors do not guarantee dropping rejected records. Use closed event/body/attribute vocabulary and trusted Resource/scope allowlists; unknown or malformed records must never reach downstream exporter. Validate bounds and privacy with app tests.
- App owns bounded batching/export timeout/retry budget, overload drops and shared fresh-context shutdown budget after intake/workers stop. Destination fan-out is not asynchronous isolation; blocked writers/handlers can block log calls. No durable-delivery claim.

## Sentry

Use Sentry for grouped exceptions, stack traces, releases/regressions and scoped issue-to-trace diagnosis. Logs and tracing are separate capabilities; configure only needed signals. Inspect installed SDK version and current official docs before selecting integration: Go OTel adapters are version-sensitive. Current [Go OTel guide](https://docs.sentry.io/platforms/go/tracing/instrumentation/opentelemetry/) describes OTLP and removal of legacy span processor/propagator in `sentry-go` v0.47.0; do not copy retired APIs.

Use available Sentry tools for bounded authorized issue/event/trace queries; discover relevant tool schemas rather than invent API calls. Identify organization/project/environment/release/time range and record sampling/retention limitations. No credentials in output; no alert/project mutation during assessment. Verify error-to-trace linkage rather than assuming shared custom trace field is enough.

## Grafana LGTM and collection

- **Loki:** logs; preserve structured searchable metadata while bounding index labels.
- **Grafana:** exploration, dashboards, correlations and alert presentation.
- **Tempo:** distributed traces with native span context and intentional sampling.
- **Mimir:** metrics; existing Prometheus-compatible storage may be sufficient rather than deploying another backend.
- **Alloy or existing OpenTelemetry Collector:** collect/process/route signals with deliberate resource mapping, auth/TLS, bounded buffers, retry/drop behavior and health telemetry. Do not add second collector by default. Check selected versions' supported pipelines and metric temporality/histogram compatibility.
- **Pyroscope (optional, outside LGTM acronym):** continuous profiling when CPU/allocation evidence warrants it and language/runtime support exists. Existing pprof/profiler can suffice for bounded diagnosis. Never expose debug/profile endpoints publicly or attach production profilers without authorization.

Possible route: Go structured stdout collected once into Loki, native OTel traces into Tempo, runtime/business metrics into Prometheus/Mimir, all explored in Grafana; explicit Sentry exception capture alongside. OTLP Logs can replace stdout collection to a destination, not duplicate it accidentally. Deployed topology, protocols, endpoints, tenant headers and credentials must come from inspected configuration, not hardcoded guesses. Development all-in-one LGTM image is not a production HA/retention/capacity design.

Official references: [Grafana OpenTelemetry](https://grafana.com/docs/opentelemetry/), [Alloy to LGTM](https://grafana.com/docs/alloy/latest/collect/opentelemetry-to-lgtm-stack/), [Alloy](https://grafana.com/docs/alloy/latest/). Validate retention, ingestion failure/drop alerts, collector resource use and backend storage capacity, not only app dashboards.

## Monoscope (optional)

Treat Monoscope as optional OTLP-capable destination/exploration surface, not prerequisite or automatic parallel full export. Verify current [Monoscope docs](https://monoscope.tech/docs/), deployed version, signal support, query schema, endpoint/protocol/auth, retention and cost before configuration. Do not infer its schema from Loki/Tempo or promise all signals/profiles supported. SDK defaults that capture bodies/headers require explicit privacy review; never enable raw payload capture as diagnostic shortcut.

When present, document which signals it owns versus LGTM/Sentry and how responders pivot between them. When absent, skip it without blocking skill or lifecycle completion. Adding service, exposing endpoints or shipping new telemetry outside existing authorized destinations requires approval.
