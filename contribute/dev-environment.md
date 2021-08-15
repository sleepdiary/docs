# Download your environment

This page explains how to get started developing the Sleep Diary Project.  You'll need to download some repositories from GitHub and an environment from Docker Hub - here are some guides if you're not sure how to do that:

- [GitHub quickstart](https://docs.github.com/en/get-started/quickstart)
- [Docker orientation and setup](https://docs.docker.com/get-started/)

## Optional: Prepare the development server

Later on we'll need to install the development server.  This is a large download, so you might like to leave it running while you configure everything else.

[Get Docker](https://docs.docker.com/get-docker/) if it isn't already installed on your computer, then open a new terminal and run this command:

```bash
docker pull sleepdiaryproject/dev-server
```

You should see progress information for several downloads.  Minimise that window, but don't close it - we'll come back to it later.

## Fork and download our repositories

Log in to GitHub and go to [the list of sleepdiary repositories](https://github.com/orgs/sleepdiary/repositories).  Open whichever repositories you're interested in, then click the repository's <em>fork</em> button to fork a new repository.

Once you've forked all your repositories, create a new folder called `sleepdiary` for them.   This is usually in your `Documents` folder (Windows) or home directory (Mac/Linux).  Then *clone* all your repositories into that folder.

## Run the development server

[Get Docker](https://docs.docker.com/get-docker/) if it isn't already installed on your computer.  If you prepared the development server before, unminimise that window and wait for your download to finish.

Open a terminal and run this command to install the development server:

```bash
docker run -v /path/to/sleepdiary:/app -d -p 8080-8090:8080-8090 --name sleepdiary-dev-server sleepdiaryproject/dev-server
```

Remember to change `/path/to/sleepdiary` to the folder you created in the previous step (e.g. `C:\Users\YourName\Documents\sleepdiary` or `/home/yourname/sleepdiary`).

This program will close as soon as the server is ready.  When that happens, go to [your development page](http://localhost:8080/dev-server/).

## Restart the development server

The development server doesn't restart automatically when you log in.  To start it again, run this command in a terminal:

```bash
docker restart sleepdiary-dev-server
```

## Running repositories outside of a container

If you're already used to node.js, you may have noticed most of our repositories have a `package.json` file.  You may be able to use these repositories like your other node projects, but be careful - different systems will have slightly different behaviour, and it's harder for us to deal with bug reports when we can't replicate the issue.
