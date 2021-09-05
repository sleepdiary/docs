# Maintainer environment recommendations

We generally try not to make developers configure their development environment any particular way.  But maintainers sometimes need to dangerous levels of access, and this page discusses ways they can arrange their environment to avoid making costly mistakes.

## Git repositories

Maintainers often need access to repositories where `git push` updates the sleepdiary project directly, so they can work quickly during difficult moments.  But this bypasses the normal PR-based process, which makes it harder for other people to tell what's going on.

Maintainers also sometimes need to push directly to `built` branches.  For example, maintainers sometimes have to resolve merge conflicts between `built` and `main` when an automated process fails.  And every time you `git checkout built`, you need to `git checkout main` when you're done, or your next `git push` will go to the wrong place.

One good solution is to configure [git remote](https://git-scm.com/docs/git-remote) something like this:

```bash
# By default, pull from sleepdiary and push to your local branch:
git remote set-url origin        git@github.com:sleepdiary/$REPO_NAME.git
git remote set-url origin --push git@github.com:$USER_NAME/$REPO_NAME.git

# Alternative repos should be named such that tab-completion
# won't turn a typo into a valid push command to the wrong repository:
git remote add   safe-personal  git@github.com:$USER_NAME/$REPO_NAME.git
git remote add unsafe-canonical git@github.com:sleepdiary/$REPO_NAME.git

# with this, `git pull -j2 common` will download both repositories at once:
git config remotes.common "origin safe-personal"

# Disable pushing to the built branch:
git config branch.built.remote origin
git config branch.built.pushRemote "If you really want to push to the built branch, type git push origin built"
```

The final `pushRemote` command above is a trick based on [this stackoverflow thread](https://stackoverflow.com/questions/10260311/git-how-to-disable-push).  Any invalid repository will work here, but a long description is more useful when you `git push` and want to know what to do next.

## Browser tabs

During maintenance, you may need to switch rapidly between 20 or more tabs.  This can be quite time-consuming with normal browser tabs, especially when you're under stress.

Consider using a tab-management plugin, such as [Vertical Tabs](https://chrome.google.com/webstore/detail/vertical-tabs/pddljdmihkpdfpkgmbhdomeeifpklgnm) for Chrome or [Tree-Style Tabs](https://addons.mozilla.org/en-US/firefox/addon/tree-style-tab/) for Firefox.  This can make tab-switching much faster.

## `/path/to/sleepdiary`

A lot of examples use `/path/to/sleepdiary` to refer to wherever you keep your repositories.  This can cause friction during maintenance, as you have to remember where your repositories are actually kept.

One solution is to create a *literal* `/path/to/sleepdiary` with a symbolic link to the right location:

```bash
sudo mkdir -p /path/to
sudo chown "$USER" /path/to
ln -s ~/.../sleepdiary /path/to/sleepdiary # change "..." to your location
```

Another solution is to use bash's `CDPATH` variable.  For example, if you add this to your `~/.bashrc`:

```bash
CDPATH=".:$HOME/path/to"
```

... then typing `cd sleepdiary/docs` will change the working directory to `/path/to/sleepdiary/docs` if there is no equivalent in your current working directory.

## See Also

- [Minimising planned maintenance](minimising-planned-maintenance)
