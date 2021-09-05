# Pull Request review checklist

Pull requests in our repositories need to be reviewed before they can be accepted.  This page discusses common issues you need to think about for most PRs.

## Commits and messages

Reviewing a PR is like critiquing an argument - you want to know what conclusion the person is trying to reach and the detailed reasoning that builds to their conclusion.  Items in this section make sure your argument is clear, so reviewers can understand what you're trying to say.

### Does each commit do exactly one thing?

It's usually better to have two small commits than one big commit.  Small commits are easier to understand and easier to review.

Many developers prefer to implement a whole feature before they split it into commits.  Git supports [interactive staging](https://git-scm.com/book/en/v2/Git-Tools-Interactive-Staging), which makes it easy to pick the specific lines you want to include in each commit.

Small commits also make [git bisect](https://git-scm.com/docs/git-bisect) more useful.  If your PR is full of small commits, a maintainer can usually fix bugs just by understanding what one commit is doing.  Or if they need your help, they can give you a test case and a small commit to make your life as easy as possible.

### Does each commit message concisely describe the one thing the commit does?

Reviewers will often look at your commit message, look at the changes, and ask whether the proposed changes are the best way to achieve the stated goal.

When you write a commit message, imagine you handed the changes to a reviewer and they asked what the changes were supposed to achieve.  What would you tell them?

If you find it difficult to write a commit message, ask yourself if it would be easier to describe two separate commits.  If you're tempted to put an *and* in a commit message, that's almost always a sign sign you need smaller commits.

### Does each commit message explain any non-obvious changes?

It's usually obvious to you why you're making a change.  But a reviewer might not understand the context of the change, or it might just not occur to them in the moment they're reviewing your code.  When in doubt, include a line or two in the body explaining what each commit achieves.

Imagine someone came along in future, claiming this commit was redundant or actively broke something.  What would you tell them to keep your work from being removed?  Or if this commit had to be replaced, what would you tell the person trying to balance your problem with a new issue?

### Could any commits be removed and still achieve the goal of the PR?

It's common for developers to think "I'll just fix this other problem while I'm here".  That's definitely worth doing, but the fix needs to go in a separate PR.

Reviewers basically have two choices when they've finished their review - either they accept a PR or they reject it.  Combining two unrelated jobs in a single PR means they might have to reject both halves because of a problem that only affects one of them.

Git supports [rewriting history](https://git-scm.com/book/en/v2/Git-Tools-Rewriting-History), which makes it easy to split your work into multiple PRs.  This often involves making clever use of some other techniques, so here's a full example.

Let's say you've just realised the second of three commits belongs in a separate PR:

```bash
$ git log --oneline @{u}..HEAD
abc123 use some new function
bcd234 clarify misleading documentation
cde345 add some new function
```

First you'd create one branch for each PR:

```bash
$ git branch my-new-function
$ git branch clarify-misleading-documentation
```

Then you'd rewrite the first branch to contain one group of commits:

```bash
$ git checkout my-new-function
$ git rebase -i main@{u} # start an interactive session to select just the primary commits
$ git log --oneline main@{u}..HEAD
321cba use some new function
543edc add some new function
```

Then you'd rewrite the other branch:

```bash
$ git checkout clarify-misleading-documentation
$ git rebase -i main@{u} # start an interactive session to select just the extra fix
$ git log --oneline main@{u}..HEAD
432dcb clarify misleading documentation
```

And finally you'd push everything:

```bash
$ git push --all
$ git checkout main
```

### Do command- and instruction-based commits have proper messages?

It can be useful to paste changes from a website, or to run a command that updates things automatically.  Put every such change in a separate commit, and cite the source or include the full text of the command in the commit message.

Imagine you need to make an equivalent change in another repository two years from now.  If you've saved the full information in a commit message, you can just do the same thing next time.

## Format and style

People tend to have strong opinions about the "correct" way to format a document.  We try not to be too prescriptive about formatting, but items in this section make sure we follow some rules that have important practical benefits.

### Is this PR about formatting or about behaviour?

It can be tempting to change the formatting of a file you're working on if you dislike the style (or notice it's inconsistent).  Like other "while I'm here" fixes, this needs to be done in a separate PR.  But unlike other fixes you should reformat the whole file at once rather than just the lines you notice, to avoid creating inconsistency between parts of the file.

### Do changes to existing files match the format of surrounding lines?

When you're not sure the right way to format a file, look at the lines immediately above and below it for guidance.  If a PR changes behaviour and doesn't introduce any new inconsistencies, formatting questions are very unlikely to come up in a review.

### Is there documentation for any new or changed behaviour?

It always seems obvious what your code does when you write it, but can be mystifying to other people (or yourself two weeks later).  Wherever possible, add [JSDoc](https://jsdoc.app/) comments before any new functions you define, and update the comments when you change a function's behaviour.

## Notifications

### Are there links to all related issues, discussions etc.?

Reviewers might need to see the discussion that lead to a PR, and people following issues need to know when progress is being made.  Include links as full URLs or [autolinked reference](https://docs.github.com/en/github/writing-on-github/working-with-advanced-formatting/autolinked-references-and-urls) in commit messages, and GitHub itself will add a notification in the relevant places.

### Is there an @mention for everyone that should see this PR?

If a particular person needs to be aware of a PR, include `@username` in the PR message.  GitHub will notify them automatically.

## Updating the checklist itself

If you'd like to improve this checklist, create a PR for this file and another for [.github/pull_request_template.md](https://github.com/sleepdiary/.github/blob/main/pull_request_template.md).  The checklist is here to ensure all our work is as good as possible with as little work as possible, so new items are always welcome!
