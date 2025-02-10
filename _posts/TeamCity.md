---
date: 2025-02-09
thumbnail: /assets/getting-started.jpg
title: Setting up a CI - Begginers Nightmare
description: Discussing how I created a CI for the printer Queue Management Software
---

<h1 align="center">Introduction</h1>
Well dear reader, remember when I mentioned how creating an installer was a massive headache, I was clearly mistaken. Before I did the refactoring of the code, or even set up a gitea server for all of my projects, I created some unit tests.

I would like to document how it was for a total beginner for setting up a Continuous Integration server to automatically run these tests in this new build which should always succeed.

## Continuous Integration

In the grand scheme of things, setting up a continuous integration server is a bit overkill for a sole developer project. However I have been very interested recently in the past year to learn more about DevOps and how to implement it in my work.

For the reader that decided to read this as their first article of mine, god speed as your about to hear me about talk about something I still barely know enough about.

Imagine you make a commit to a legacy project, now you know nothing major has changed however you want to make sure the change doesn't go downstream to something you don't expect.

Continuous Integration takes the changes from the commit, pull request or merge, builds the project and runs the necessary tests. This ensures your changes wont't make any unexpected behaviors you could have prevented. 

This is where teamcity comes in, through teamcity you can setup what is essentially a virtual environment that solely builds your code, conducts tests and stores the 'artifacts' (executable) after each build. 

Now if you were as foolish as I was to think this would be very simple to construct, you'd be as wrong as a monkeys a uncle.

## The Misconception Of Build

For the most part, installing and creating build steps within TeamCity were very straightforward. However, what really threw a wrench in everything was building my C# solution. 

I first indicated **Build** as the runner to use to build the .sln file however that was incorrect. You see for the longest time I never once thought that when I was building my solution in Visual Studio, it was actually using msbuild from Visual Studio. By indicating **Build** I was using my local machine which did not have the necessary components to even build the solution.

This was very easy to resolve but dear lord did it take longer than i wanted to admit:
```java
steps { 

nuGetInstaller { id = "jb_nuget_installer" toolPath = "%teamcity.tool.NuGet.CommandLine.DEFAULT%" projects = "LoccioniQueueManager.sln" updatePackages = updateParams { } } 

dotnetMsBuild { id = "dotnet" projects = "LoccioniQueueManager.sln" version = DotnetMsBuildStep.MSBuildVersion.V17 configuration = "Release" args = "-restore -noLogo" sdk = "4.7 8" }
}
```


