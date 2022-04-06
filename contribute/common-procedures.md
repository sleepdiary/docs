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

1. run [`update-dependencies.sh commit`](https://github.com/sleepdiary/internal-tools/blob/main/bin/update-dependencies.sh) in the development environment:
   * example command: `docker exec -it -w /app/internal-tools sleepdiary-dev-server ./bin/update-dependencies.sh commit`
   * this script is still quite young - read through it and look for issues
   * this will run the upgrade script and commit the results to a new branch
   * this will create several pull requests that will be used in later steps
2. run [`update-dependencies.sh push`](https://github.com/sleepdiary/internal-tools/blob/main/bin/update-dependencies.sh) in the host environment:
   * example command: `./bin/update-dependencies.sh push`
3. follow the instructions displayed by the program
4. merge the pull request for `internal-tools` (guaranteed to run last in the script above)
5. wait for [the relevant action](https://github.com/sleepdiary/internal-tools/actions/workflows/main.yml) to build `pre-release` versions of the build system and dev-server
6. check the new dev-server works as expected
   * run [`check-dev-server.sh pre-release`](https://github.com/sleepdiary/internal-tools/blob/main/bin/check-dev-server.sh) once to check everything
7. push a test-commit for every repository that uses the build system
   * run [`check-prerelease-build-system.sh`](https://github.com/sleepdiary/internal-tools/blob/main/bin/check-prerelease-build-system.sh) once in each repository that was updated
8. [create an `internal-tools` PR to pull into latest from main](https://github.com/sleepdiary/internal-tools/compare/latest...main?expand=1) with message "Recent changes"
9. [Run a planned maintenance](https://github.com/sleepdiary/internal-tools/issues/new?assignees=&labels=planned-maintenance&template=planned-maintenance.md&title=Planned+maintenance%3A+Update+dependencies+for+every+repository) to accept all the PRs generated above
   * [see previous planned maintenances](https://github.com/sleepdiary/internal-tools/issues?q=label%3Aplanned-maintenance)
   * add the PRs above to [the maintenace actions](https://github.com/sleepdiary/planned-maintenance-info/edit/main/index.js)

## Update docs from resources

Some files in the "docs" repo are generated automatically using files from the "resources" repo.  This could be triggered automatically using [a special GitHub Actions script](https://github.com/peter-evans/repository-dispatch), but GitHub's relatively coarse permissions system means it would require careful design.  Until then, we put up with triggering events manually:

1. Go to [the "Generate from resources" action](https://github.com/sleepdiary/docs/actions/workflows/generate-from-resources.yml)
2. click "Run workflow" (to the right "This workflow has a workflow_dispatch event trigger")
3. click the green "Run workflow" button
4. wait for the workflow to complete
5. go to [the list of pull requests](https://github.com/sleepdiary/docs/pulls)
6. review and accept the PR created by the workflow

## Create a new repository

1. make a personal repository that will be the basis for the new repository
2. create a minimum viable product
   * push any commits
   * add repository metadata
   * configure GitHub Pages
3. check everything looks right
   * remove any branches that shouldn't go in the main repository
   * make sure all the branch histories look nice (e.g. remove "fixup" and "WIP" commits)
4. [transfer the repository to sleepdiary](https://docs.github.com/en/repositories/creating-and-managing-repositories/transferring-a-repository)
5. fork a new personal repo from the moved repository
5. [edit your `.gitconfig`](./optimise-your-environment.html#git-repositories)
