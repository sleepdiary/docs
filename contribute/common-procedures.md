# Common procedures

Some jobs need to be done frequently, and involve a detailed procedure that hasn't been automated for whatever reason.  This page contains step-by-step instructions to do those jobs.

## Run a planned maintenance

[Create a new maintenance issue](https://github.com/sleepdiary/internal-tools/issues/new?assignees=&labels=planned-maintenance&template=planned-maintenance.md&title=Planned+maintenance%3A+TODO%3A+purpose+of+this+maintenance) and follow the steps described in the template.

## Fix a `built` branch

When you have a merge failure in the `built` branch, see if you can fix it with a guard line.  If so, use the following procedure:

1. create a PR in the `main` branch that adds a guard line but *does not* include the conflicting PR
2. merge the guard line into the `built` branch
3. rebase the conflicting PR on top of the new `main` branch
4. accept the (no longer conflicting) PR

If you can resolve a merge conflict with the procedure above, there's no need to schedule a planned maintenance.  Otherwise:

1. create a new PR that merges the existing PR into the `built` branch
2. test both thoroughly in a personal repo
3. once everything works, [create a new planned maintenance issue](https://github.com/sleepdiary/internal-tools/issues/new?assignees=&labels=planned-maintenance&template=planned-maintenance.md&title=Planned+maintenance%3A+Fix+the+built+branch) with steps like:
   1. merge the `built` PR into main first
   2. then merge the conflicting PR
   3. check the normal workflow merges back correctly
      - it will fail if you merged the `built` PR after the original PR

## Update dependency versions

To keep the build system as standard as possible, all dependencies need to be cached in the build image.  That means that when you update the dependencies of a package, you need to update the build system as well.  This can cause hard-to-test problems, because commands occasionally succeed on the dev-server but fail in production due to some quirk of GitHub Actions configuration.  To minimise that risk, use the following procedure:

1. run [`upgrade-dependencies.sh`](https://github.com/sleepdiary/internal-tools/blob/main/bin/upgrade-dependencies.sh)
   * this script has yet to be tested in a live environment - read through it and look for bugs first
   * this will create several pull requests that will be used in later steps
2. accept the pull request for `internal-tools` (guaranteed to run last in the script above)
3. wait for [the relevant action](https://github.com/sleepdiary/internal-tools/actions/workflows/main.yml) to build `pre-release` versions of the build system and dev-server
4. check the new dev-server works as expected
   * run [`check-dev-server.sh`](https://github.com/sleepdiary/internal-tools/blob/main/bin/check-dev-server.sh) once to check everything
5. push a test-commit for every repository that uses the build system
   * run [`check-prerelease-build-system.sh`](https://github.com/sleepdiary/internal-tools/blob/main/bin/check-prerelease-build-system.sh) once in each repository that was updated
6. [create an `internal-tools` PR to pull into latest from main](https://github.com/sleepdiary/internal-tools/compare/latest...main?expand=1) with message "Recent changes"
7. [Run a planned maintenance](https://github.com/sleepdiary/internal-tools/issues/new?assignees=&labels=planned-maintenance&template=planned-maintenance.md&title=Planned+maintenance%3A+Update+dependencies+for+every+repository) to accept all the PRs generated above
   * [see previous planned maintenances](https://github.com/sleepdiary/internal-tools/issues?q=label%3Aplanned-maintenance)
   * add the PRs above to [the maintenace actions](https://github.com/sleepdiary/planned-maintenance-info/edit/main/index.js)
