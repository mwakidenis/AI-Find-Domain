# Deployment Documentation

## Overview

This project uses an automated continuous deployment (CD) pipeline that publishes packages to the npm registry upon GitHub release creation. The deployment process is fully automated through GitHub Actions, ensuring consistent and reliable releases.

## Architecture

### Deployment Workflow

The deployment system operates on a **release-triggered** model:

- **Trigger:** GitHub Release publication
- **Constraint:** Releases must originate from the `main` branch
- **Automation:** GitHub Actions workflow (`.github/workflows/publish.yml`)
- **Target:** npm registry with provenance attestation

### Prerequisites

Before initiating a deployment, ensure the following requirements are met:

1. **Authentication:** `NPM_TOKEN` secret configured in repository settings
2. **Branch:** All changes committed and pushed to `main` branch
3. **Quality:** All automated checks pass locally
4. **Version:** Semantic versioning applied appropriately

## Deployment Process

### Step 1: Version Management

Update the package version in `package.json` according to semantic versioning principles:

```json
{
  "version": "<MAJOR>.<MINOR>.<PATCH>"
}
```

**Semantic Versioning Guidelines:**

| Type  | Increment | Use Case                                         |
| ----- | --------- | ------------------------------------------------ |
| MAJOR | x.0.0     | Breaking changes, incompatible API modifications |
| MINOR | 0.x.0     | New features, backward-compatible functionality  |
| PATCH | 0.0.x     | Bug fixes, backward-compatible corrections       |

### Step 2: Quality Assurance

Execute the complete test suite to verify code integrity:

```bash
pnpm run typecheck
pnpm run lint
pnpm test
pnpm run build
```

All validation steps must complete successfully before proceeding.

### Step 3: Version Control

Commit the version update and synchronize with the remote repository:

```bash
git add package.json
git commit -m "chore: bump version to <VERSION>"
git push origin main
```

### Step 4: Tag Creation

Create an annotated Git tag corresponding to the package version:

```bash
git tag -a v<VERSION> -m "Release v<VERSION>: <DESCRIPTION>"
git push origin v<VERSION>
```

> **Important:** The tag name must match the version in `package.json`, with an optional `v` prefix.

### Step 5: Release Publication

Create a GitHub release to trigger the automated deployment pipeline.

**Method A: Command Line Interface**

```bash
gh release create v<VERSION> \
  --title "v<VERSION> - <TITLE>" \
  --notes "<RELEASE_NOTES>"
```

**Method B: Web Interface**

1. Navigate to the repository's releases page
2. Select "Draft a new release"
3. Choose the created tag
4. Provide release title and comprehensive notes
5. Publish the release

Upon release publication, the deployment workflow initiates automatically.

### Step 6: Deployment Monitoring

Monitor the deployment progress through GitHub Actions:

```bash
gh run watch
```

Alternatively, view the workflow execution in the GitHub Actions dashboard.

### Step 7: Publication Verification

Confirm successful package publication:

```bash
npm view <PACKAGE_NAME> version
```

Verify the package is accessible on the npm registry.

## Continuous Integration Pipeline

The automated deployment workflow executes the following stages:

1. **Source Control:** Repository checkout
2. **Version Validation:** Verify tag-version consistency
3. **Environment Setup:** Install dependencies with locked versions
4. **Static Analysis:** TypeScript compilation and ESLint validation
5. **Testing:** Execute test suite
6. **Build:** Generate distribution artifacts
7. **Artifact Verification:** Validate build output
8. **Publication:** Publish to npm with provenance signature
9. **Reporting:** Generate deployment summary

**Failure Handling:** The pipeline employs fail-fast behavior; any stage failure prevents progression and blocks publication.

## Security Considerations

### Access Control

- Deployment restricted to `main` branch releases
- Requires `NPM_TOKEN` authentication secret
- Utilizes GitHub's OIDC for provenance generation

### Integrity Verification

- Version-tag consistency validation
- Comprehensive quality gate enforcement
- npm provenance attestation for supply chain security

### Best Practices

- Never commit authentication tokens to version control
- Maintain `NPM_TOKEN` in GitHub Secrets with appropriate access controls
- Review workflow logs for security anomalies
- Regularly rotate authentication credentials

## Troubleshooting

### Version Mismatch

**Symptom:** Deployment fails with version inconsistency error

**Resolution:** Ensure the `package.json` version field exactly matches the Git tag (excluding optional `v` prefix)

### Authentication Failure

**Symptom:** `ENEEDAUTH` error during npm publication

**Resolution:** Verify `NPM_TOKEN` secret is correctly configured in repository settings with appropriate permissions

### Duplicate Version

**Symptom:** Publication fails due to existing version

**Resolution:** npm registry prevents version overwrites by design. Increment the version number appropriately.

### Workflow Not Triggering

**Symptom:** GitHub Actions workflow does not execute

**Resolution:** Verify a GitHub Release was created, not merely a Git tag. Releases are the designated trigger mechanism.

## References

- **Workflow Definition:** `.github/workflows/publish.yml`
- **Package Configuration:** `package.json`
- **npm Registry:** https://www.npmjs.com/package/find-my-domain
- **Repository Releases:** https://github.com/idimetrix/find-my-domain/releases
- **Actions Dashboard:** https://github.com/idimetrix/find-my-domain/actions
