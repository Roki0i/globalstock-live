# Security Policy

## Reporting a Vulnerability

Please do not publish suspected vulnerabilities, credentials, tokens, or exploit details in a public issue.

Use GitHub's private vulnerability reporting feature when it is available for this repository. If it is not available, contact the repository owner privately through the contact method listed on the owner's GitHub profile.

Include only the minimum information required to reproduce the issue. Do not include real credentials or unrelated personal data.

## Security Expectations

- Secrets must never be committed to the repository.
- Market-data credentials must be read by the server from environment variables and must not be exposed through `VITE_*` variables.
- New dependencies should be kept minimal and reviewed before adoption.
- Dependency updates should pass CI and vulnerability checks before merging.
- Production deployments should terminate HTTPS and set an explicit Content Security Policy at the web-hosting layer.
