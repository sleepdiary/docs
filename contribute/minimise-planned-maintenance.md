# Minimise planned maintenance

Planned maintenance is a window where we can make updates to the project that have a reasonable chance of causing problems for users or developers.  For example, breaking the dashboard or causing GitHub actions to fail.

This page discusses ways to avoid planned maintenance, or at least reduce the amount of work that needs to be done during the maintenance window.

## General guidelines

### Test on a personal fork when possible

Sometimes you need to make changes to a repository that might fail.  For example, GitHub actions generally can't be tested without being run on GitHub's own servers.

Most changes can be made - or at least rehearsed - on a personal fork of the repository.  Even if you need to test actions that look at the `main` branch, you can [rewrite your fork's history](https://git-scm.com/book/en/v2/Git-Tools-Rewriting-History) and rerun tests as often as you like.

### Use a `pre-release` label for live testing

Sometimes you need to build a package and push it to an external site.  For example, you might want to build a new dev server and push an image to [our Docker Hub site](https://hub.docker.com/u/sleepdiaryproject).

Most sites let you push pre-release versions of packages.  In particular, packages that use [semantic versioning](https://semver.org/) should use pre-release labels like `1.2.3-$COMMIT`, while continuously-deployed packages should use a channel called `pre-release`.

When you've finished with the pre-release, you might be able to publish simply by relabelling it.  Otherwise, you'll have to spend a little longer pushing the same binary again.

### Use guard lines to avoid merge conflicts

Sometimes you need to manage changes that `git` can't merge automatically.  For example, most repositories have a `.gitignore` file with lines in the `main` branch that are missing in the `built` branch.

Most merge conflicts can be avoided with a *guard line* for `git` to use:

```javascript
console.log( "This line appears in one branch" );
/* this guard line appears in both branches */
console.log( "This line appears in another branch" );
```

Now you can modify or delete either line in either branch, and `git` will use the guard line to merge them automatically.

## Specific procedures

### Run a planned maintenance

[Create a new maintenance issue](https://github.com/sleepdiary/internal-tools/issues/new?assignees=&labels=planned-maintenance&template=planned-maintenance.md&title=Planned+maintenance%3A+TODO%3A+purpose+of+this+maintenance) and follow the steps described in the template.

### Fix a `built` branch

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

### Update dependency versions

To keep the build system as standard as possible, all dependencies need to be cached in the build image.  That means that when you update the dependencies of a package, you need to update the build system as well.  This can cause hard-to-test problems, because commands occasionally succeed on the dev-server but fail in production due to some quirk of GitHub Actions configuration.  To minimise that risk, use the following procedure:

1. run `./bin/run.sh upgrade` in each repository *except* `internal-tools`, to run whatever upgrade commands are associated with that repo
2. run `git commit -a --reuse-message=$( git log --format=%H -1 package-lock.json )` in each repository from the previous step
3. run `./bin/run.sh upgrade` in `internal-tools`, to copy the above updates into its cache
4. create and accept a pull request for the changes to `internal-tools`
5. wait for [the relevant action](https://github.com/sleepdiary/internal-tools/actions/workflows/main.yml) to build `pre-release` versions of the build system and dev-server
6. check the new dev-server works as expected (see [`check-dev-server.sh`](https://github.com/sleepdiary/internal-tools/blob/main/bin/check-dev-server.sh))
7. push a test-commit for every repository that uses the build system (see [`check-prerelease-build-system.sh`](https://github.com/sleepdiary/internal-tools/blob/main/bin/check-prerelease-build-system.sh))
8. create a set of pull requests to apply during the planned maintenance
   * [create a pull request that pulls main into latest](https://github.com/sleepdiary/internal-tools/compare/latest...main?expand=1)
   * create a pull request for every repo you upgraded in step 1
