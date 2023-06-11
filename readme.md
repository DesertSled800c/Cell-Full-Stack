## Docker Edit

Here is a video describing how to run docker in a container:
[video](https://www.youtube.com/watch?v=QqZr6cbKoIM)


N.B. Instead of following the video exactly we want to just create the dockerfile, then:

```docker build -f Dockerfile -t cell .```

This tells docker to build an image for our app from the dockerfile and tag it with the name 'cell', using the dockerfile which was generated for us by VS in the video instructions above. We could also write this dockerfile by hand -- but this is easier for now. 

And we can run our containter from this image with a command like this:

```docker run -it --rm -p 5000:80 -e ASPNETCORE_ENVIRONMENT='Development' --name cell-1 cell```

This command instructs docker to runner our app in a container defined by the image we built with docker build cmd. It also uses a few flags '-it' (Keep STDIN open even if not attached and Allocate a pseudo-TTY) '--rm' (automatically remove the container when it exits) '-p' (Publish a container’s port(s) to the host), '-e' (Set environment variables) and '--name' (Assign a name to the container)

All of this can be found in [dockers docs](https://docs.docker.com/engine/reference/commandline/run/)



Next, we need to figure out how we'd like to deploy our container, instructions for which are here:
[deploy dotnet on heroku](https://dev.to/alrobilliard/deploying-net-core-to-heroku-1lfe)

From there, we can start thinking about a build and deploy pipeline. This is related to a concept called Continuous Delivery. 

Using a build and deploy pipeline, we can push code changes to git and have all our unit tests run automatically, which will tell us if there are any problems with our code changes. Then this pipleline, if tests are passing, will automatically build a new version of our app in a docker container and then deploy that to our platform of choice. 

Easy-peazy!

