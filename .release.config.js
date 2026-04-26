/** @type {import('semantic-release').GlobalConfig} */
module.exports = {
  branches: ["main"],
  tagFormat: "v${version}",
  plugins: [
    // 1. Analyse commits to determine release type (major / minor / patch)
    [
      "@semantic-release/commit-analyzer",
      {
        preset: "angular",
        releaseRules: [
          { type: "feat", release: "minor" },
          { type: "fix", release: "patch" },
          { type: "perf", release: "patch" },
          { type: "revert", release: "patch" },
          { type: "docs", release: false },
          { type: "style", release: false },
          { type: "refactor", release: false },
          { type: "test", release: false },
          { type: "chore", release: false },
          { breaking: true, release: "major" }
        ]
      }
    ],

    // 2. Generate release notes from commits
    [
      "@semantic-release/release-notes-generator",
      {
        preset: "angular",
        writerOpts: {
          groupBy: "type",
          commitGroupsSort: "title",
          commitsSort: ["scope", "subject"]
        }
      }
    ],

    // 3. Append release notes to CHANGELOG.md
    [
      "@semantic-release/changelog",
      {
        changelogFile: "CHANGELOG.md"
      }
    ],

    // 4. Bump version in root package.json (does NOT publish to npm)
    [
      "@semantic-release/npm",
      {
        npmPublish: false
      }
    ],

    // 5. Commit CHANGELOG.md + updated package.json back to the repo
    [
      "@semantic-release/git",
      {
        assets: ["CHANGELOG.md", "package.json"],
        message:
          "chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}"
      }
    ]
  ]
};
