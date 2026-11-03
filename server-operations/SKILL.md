---
name: server-operations
description: Inspect and safely debug or deploy services on personal Linux servers. Use for VPS debugging, Docker Compose deployment, ingress, Tailscale exposure, backups, or Homepage discovery. Read host guidance before applying deployment conventions.
---

# Server operations

Read host `~/AGENTS.md`, applicable repository guidance, and existing stack documentation first. Discover current host/user, deployment layout, listeners, networks, and service state with read-only checks. Do not assume Docker, Tailscale, Dockge, Caddy, Cloudflare Tunnel, or Homepage exists.

For hosts explicitly using the personal `$HOME/stacks` convention, read [deployment.md](deployment.md). Its topology examples are conditional, not permission to provision infrastructure. Existing host documentation owns actual paths, domains, networks, and exposure policy. Never impose this topology on unrelated servers.

- Diagnose before changing state. Inspect service status and bounded logs; redact sensitive output. `docker compose config` can interpolate secrets: prefer `docker compose config --quiet` for validation and inspect only required fields without printing secret values.
- Explain intended change, affected service/data, verification, and rollback. Obtain explicit approval before deployments, restarts, exposure/auth changes, destructive operations, or changes outside requested scope.
- Back up stateful data before upgrades/migrations; verify restore instructions. Never delete volumes or overwrite databases without explicit approval and verified backup.
- Keep secrets out of logs, source, artifacts, and command arguments where possible. Secret files need restrictive permissions and ignore rules.
- Preserve existing access controls; do not publish ports, add tunnels, bypass challenges, restart unrelated services, or expose Docker sockets as troubleshooting shortcuts.
- Verify service health and intended access after authorized changes. Update owning stack docs with non-secret inventory, backup/restore, and rollback information. Unverified deployment is not complete.
