## Docker Edit

Here is a video describing how to run docker in a container:
[video](https://www.youtube.com/watch?v=QqZr6cbKoIM)

Next, we need to figure out how we'd like to deploy our container, instructions for which are here:
[deploy dotnet on heroku](https://dev.to/alrobilliard/deploying-net-core-to-heroku-1lfe)

From there, we can start thinking about a build and deploy pipeline. This is related to a concept called Continuous Delivery. 

Using a build and deploy pipeline, we can push code changes to git and have all out unit tests run automattically, which will tell us if there are any problems with our code changes. Then this pipleline, if tests are passing, will automatically build a neversion of our app in a docker container and then deploy that to our platform of choice. 

Easy-peazy!