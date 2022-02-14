# Optimise your environment

This page presents ways to configure your environment that have proved useful in practice.  These aren't requirements, but it's useful to at least think how you'd solve the problems discussed here.  That's especially true if you want to do operations work, where simple mis-clicks can cause problems for users.

## Git repositories

You will often need to _pull_ changes from canonical `sleepdiary` repositories, _push_ them to your personal repositories, then create pull requests back to the canonical repository.  You might need the ability to push directly to `sleepdiary` repositories if you do operations work, but that should only ever be a last resort.

One good solution is to configure multiple [remote repositories](https://git-scm.com/docs/git-remote) and use the [`remote.<name>.pushurl`](https://git-scm.com/docs/git-config#Documentation/git-config.txt-remoteltnamegtpushurl) config option to pull changes from the canonical repository and push them to your local repository.  Here's how you might do that on a command-line:

```bash
USER_NAME=<your-github-account-name>
REPO_NAME=<name-of-the-current-repository>

# By default, pull from sleepdiary and push to your local branch:
git remote set-url origin        git@github.com:sleepdiary/$REPO_NAME.git
git remote set-url origin --push git@github.com:$USER_NAME/$REPO_NAME.git

# Alternative repos should be named such that tab-completion
# won't turn a typo into a valid push command to the wrong repository:
git remote add   safe-personal  git@github.com:$USER_NAME/$REPO_NAME.git
git remote add unsafe-canonical git@github.com:sleepdiary/$REPO_NAME.git

# create a group of remotes, so you can do `git pull -j2 common`:
git config remotes.common "safe-personal origin unsafe-canonical"

# Disable pushing to the built branch:
git config branch.built.remote origin
git config branch.built.pushRemote "If you really want to push to the built branch, type git push origin built"
```

The final `pushRemote` command above is a trick based on [this stackoverflow thread](https://stackoverflow.com/questions/10260311/git-how-to-disable-push).  Any invalid repository will work here, but a long description is more useful when you `git push` and want to know what to do next.

## Switching directories

If you do a lot of work on a command-line and frequently switch between repositories, you can end up spending a lot of time just typing `cd` commands.

`bash` provides a [`CDPATH` variable](https://www.oreilly.com/library/view/bash-cookbook/0596526784/ch16s05.html) that can make this much easier.  You might like to add this line to your `~/.bashrc`:

```bash
CDPATH=".:$HOME/sleepdiary"
```

... then when you open a new terminal, `cd dashboard` will go to `$HOME/sleepdiary/dashboard` no matter where you previously `cd`ed to.
