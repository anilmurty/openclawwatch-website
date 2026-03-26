# OpenClawWatch

Open-source, OTel-native observability for autonomous AI agents. Full telemetry, cost tracking, and safety alerts — on your machine, no backend required.

## What is OpenClawWatch?

OpenClawWatch is a CLI-based observability tool for developers building agentic AI systems. It gives you full visibility into what your agents do — tool calls, token costs, behavioral drift, and sensitive actions — without requiring a SaaS account or cloud dependency.

**Key features:**
- OTel GenAI Semantic Conventions compliance (exportable to Grafana, Jaeger, Datadog)
- Real-time USD cost tracking per agent, per model, per task
- Sensitive action alerts (email sends, file writes, form submissions)
- Local behavioral drift detection
- Output schema validation
- Full-featured CLI + local REST API

**Works with:** OpenClaw, LangChain, LangGraph, CrewAI, AutoGen, OpenAI Assistants, Anthropic Claude, and custom agents.

## Status

OpenClawWatch is in active development. This repo currently hosts the landing page at [opencla.watch](https://opencla.watch). The CLI tool is coming soon.

## Commercial tier

For teams needing multi-agent aggregation, dashboards, SSO/RBAC, and hosted retention, see [cla.watch](https://cla.watch).

## License

MIT / Apache 2.0
