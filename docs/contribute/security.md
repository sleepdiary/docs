# Contribute securely

To understand the project's approach to security, think about the steps we'll have to take if someone breaks into the dashboard and installs a bitcoin miner.  First we'll need to disable the attacker's access before they can do any more damage, then we'll have to figure out how they got in and how to stop it from happening again.

::: tip
In the event of an attack, you need to *quickly prove beyond doubt* that your account can't be used by an attacker
:::

Even if you're sure your account is secure, any time spent proving it is time the attacker can use to do more damage.  If your only access to the project is through pull requests, your job during an attack is fairly simple - just don't submit any PRs if you know it's a bad time.  The rest of this page discusses alternative solutions if you need a level of access that's harder to secure.

## Limit your access

[The principle of least privilege](https://en.wikipedia.org/wiki/Principle_of_least_privilege) is key to designing a secure system.  Put simply, the easiest way to prove you *didn't* do something is to prove you *couldn't* have done it if you wanted to.  Your best solution depends on how you contribute, so you may want to use one or more of:

* [repository access](https://docs.github.com/en/organizations/managing-access-to-your-organizations-repositories) to reduce the number of repositories you're exposed to
* [protected branches](https://docs.github.com/en/github/administering-a-repository/defining-the-mergeability-of-pull-requests/about-protected-branches) to enforce requirements before a branch can be changed
* [code owners](https://docs.github.com/en/github/creating-cloning-and-archiving-repositories/creating-a-repository-on-github/about-code-owners) to specify who needs to sign off on changes

## Use two-factor authentication

[Two-factor authentication ("2FA")](https://docs.github.com/en/github/authenticating-to-github/securing-your-account-with-two-factor-authentication-2fa/configuring-two-factor-authentication) makes it harder for someone to steal your account and push bad commits in your name.  This is a good idea for any developer, but we only require it if you can push changes directly to `sleepdiary` repositories.

If you have direct access to any `sleepdiary` repositories, please follow [GitHub's guide to configuring 2FA](https://docs.github.com/en/github/authenticating-to-github/securing-your-account-with-two-factor-authentication-2fa/configuring-two-factor-authentication).  If you're ever concerned your account might have been compromised, please [update your password](https://github.com/settings/security) immediately, and consider [resetting your 2FA codes](https://github.com/settings/two_factor_authentication/setup/intro).  This makes it hard to get into your account, and easy to prove your account can't be used to do any more damage.

## GPG-sign your commits

[GPG](https://en.wikipedia.org/wiki/GNU_Privacy_Guard) digitally signs to your commits, proving your computer was used to create a change.  For example, if someone steals your GitHub password but not your GPG key, you can prove which of your commits are safe by showing which ones GitHub has verified.

If you have direct access to any `sleepdiary` repositories, please follow [GitHub's guide to configuring GPG](https://docs.github.com/en/github/authenticating-to-github/managing-commit-signature-verification).  You may also want to consider [auto-signing all commits](https://gist.github.com/mort3za/ad545d47dd2b54970c102fe39912f305).

GPG keys for day-to-day use need to strike a balance between security and usability.  You will presumably want to store your key unencrypted on your computer, and might prefer to use a key with a short or empty passphrase.  See the next section for information about higher-security keys.

Here are some specific commands you might find useful when dealing with GPG-signed commits:

```bash
git log --show-signature # show commit signatures
curl https://github.com/web-flow.gpg | gpg --import - # download GitHub's key
curl https://github.com/<username>.gpg | gpg --import - # download a user's key
```

## GPG-sign tags

Some repositories tag official releases, to give users more confidence about the code they use.  These must be signed by a key that meets the following criteria:

* the key must be stored in a location that is rarely or never online (e.g. an old laptop without network access)
* the key must expire (usually after a few years)

In the unlikely event you need this level of access, please talk it through with whoever signed the last tag in the relevant repository.
