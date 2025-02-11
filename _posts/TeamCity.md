---
date: 2025-02-09
thumbnail: /assets/getting-started.jpg
title: Setting up a CI - Begginers Nightmare
description: Discussing how I created a CI for the printer Queue Management Software
---

<h1 align="center">Introduction</h1>
Well dear reader, remember when I mentioned how creating an installer was a massive headache, I was clearly mistaken. Before I did the refactoring of the code, or even set up a gitea server for all of my projects, I created some unit tests.

I would like to document how it was for a total beginner for setting up a Continuous Integration server to automatically run these tests in this new build which should always succeed.

<h2 align="center">Continuous Integration</h2>


For the reader that decided to read this as their first article of mine, god speed as your about to hear me about talk about something I still barely know enough about.

Imagine you make a commit to a legacy project, now you know nothing major has changed however you want to make sure the change doesn't go downstream to something you don't expect.

Continuous Integration takes the changes from the commit, pull request or merge, builds the project like a normal environment and can even run necessary tests. This ensures your changes wont't make any unexpected behaviors you could have prevented, but rather cause unexpected behaviors you'll find out way later.

This is where Teamcity Comes in, through teamcity you can setup what is essentially a virtual environment that builds your code, conducts tests and stores the 'artifacts' after each build. 

In the grand scheme of things, setting up a continuous integration server is a bit overkill for a sole developer project. However I have been very interested recently in the past year to learn more about DevOps and how to implement it in my work.

Now if you were as foolish as I was to think this would be very simple to construct, you'd be as wrong as a monkeys a uncle.

<h3 align="center">Let's Start Getting The Packages</h3>

For the most part, setting up TeamCity for the first time was straightforward However, what really threw a wrench in everything was making my build step to build my C# solution. 

You see when first creating my build, I decided to follow [this tutorial](https://www.jetbrains.com/teamcity/tutorials/tests/dotnet-build-configure-test/) initially however after some digging I realized it would be preferable to make the first step to get the nuget packages from my solution

A common trend in this project was understanding what Visual Studio was doing that I took for granted, for example getting the packages and installing them onto the local machine:
```java
  steps {  
        nuGetInstaller {  
            id = "jb_nuget_installer"  
            toolPath = "%teamcity.tool.NuGet.CommandLine.DEFAULT%"  
            projects = "LoccioniQueueManager.sln"  
            updatePackages = updateParams {  
            }  
        }
```

In this step what TeamCity would be going through the solution and installing all the necessary packages that are used. Now this was very basic to implement however did the next step cause a huge headache. 


<h3 align="center">The Misconception of Builds</h3>

So after getting the necessary packages installed, the next step is to then build the solution. But wait, shouldn't running the **build*** build step be enough?

You see for the longest time I never once thought that when I was building my solution in Visual Studio, it was actually using msbuild from Visual Studio. By indicating **Build** I was using my local machine which did not have the necessary components to even build the solution.

Now how long did this take to even understand embarrassingly more than 3 hours of googling and bashing my head:
```java
      dotnetMsBuild {  
            id = "dotnet"  
            projects = "LoccioniQueueManager.sln"  
            version = DotnetMsBuildStep.MSBuildVersion.V17  
            configuration = "Release"  
            args = "-restore -noLogo"  
            sdk = "4.7 8"  
        }
```

Now the nice thing about TeamCity is that I can specify what SDK I want, you see I built my project specefcially for .NET framework 4.7, and 4.8  alongside .NET Core 8 so that can easily be modified.

So cool I can build my solution without much problem, but wait I want to automate my tests!

<h4 align="center">The Nightmare Of Automating Tests</h4>

Dear lord was this headache inducing, you see I had worked on the following test calss just to do a basic unit test:
```C#

using LoccioniQueueManager;  
using System.Reflection;  
using System.Runtime.InteropServices;  
namespace LoccioniQueueManager.Test  
{  
    public class LQM_CopyStreamShould  
    {  
        private Execute ex;  
        [SetUp]  
        public void Setup()  
        {  
            ex = new Execute();  
        }  
  
        [Test]  
        public void CopyStream_ExistsAfter()  
        {  
            string directory_path = System.IO.Path.GetTempPath();  
            bool expected = true;  
            var assembly = Assembly.GetExecutingAssembly();  
            ex.resourceName = "LoccioniQueueManager_Test.ClearQ.bat";  
            //const string resourcesName = "LoccioniQueueManager_Test.ClearQ.bat";  
            using (Stream input = assembly.GetManifestResourceStream(ex.resourceName))  
            using (Stream output = File.Create(ex.tempPath))  
            {  
                ex.CopyStream(input, output);  
                bool result = File.Exists(ex.tempPath);  
                Assert.That(expected == result, "The File should exist in the temporary path");  
                Console.WriteLine("##teamcity[buildStatus status='SUCCESS' text='{build.status.text} and then made green']");  
            }  
        }  
    }  
}
```

Now here is where it gets fun, you see this test relies upon the Nunit Test package, and we solely want to run  LoccioniQueueManager.Test. Just like **build** if I used **test** it would give a similar issue.  So let's use VSTest:
```java
dotnetVsTest { name = "TESTING" id = "dotnet_1" assemblies = """**\*_Test.csproj""" version = DotnetVsTestStep.VSTestVersion.V17 platform = DotnetVsTestStep.Platform.x64 sdk = "8" }
```

However remember how I just said it was using Nunit, since that is the case I am provided the following log:
```
20:01:21     in directory: C:\TeamCity\buildAgent\work\2921c6c8fcce4709

  

20:01:23     VSTest version 17.11.1 (x64)

  

20:01:23     

  

20:01:29     Starting test execution, please wait...

  

20:01:43     TeamCity test logger version 1.0.42.314 is initialized

  

20:01:43     A total of 1 test files matched the specified pattern.

  

20:01:44     Unit tests from C:\TeamCity\buildAgent\work\2921c6c8fcce4709\LoccioniQueueManager.Test\LoccioniQueueManager_Test.csproj

  

20:01:45     Process exited with code 0

  

20:01:45   Waiting for 1 service processes to complete
```
All it is saying is that I am using the wrong Test Runner, thanks to [net - NUnit Tests not running in TeamCity, can't figure out why - Stack Overflow](https://stackoverflow.com/questions/26345310/nunit-tests-not-running-in-teamcity-cant-figure-out-why) I was able to realize real quick all I need to do is use the Nunit Build Runner.

Now sure after setting up the Nunit Build Runner you would think it would be smooth sailing, however I ran to a few issues. 

The first was getting an error code of -100 from the buld rinner, now at first that was odd but when looking at the stack trace:
```
  1) Error : C:\TeamCity\buildAgent\work\2921c6c8fcce4709\packages\System.Configuration.ConfigurationManager.8.0.1\lib\net6.0\System.Configuration.ConfigurationManager.dll

  

20:04:34   System.ArgumentException : The netcore-6.0 framework is not available for X86=False.

  

20:04:34   Available frameworks: net-2.0 net-3.0 net-3.5 net-4.0 net-4.5 net-4.5.1 net-4.5.2 net-4.6 net-4.6.1 net-4.6.2 net-4.7 net-4.7.1 net-4.7.2 net-4.8 netcore-8.0

  

20:04:34   --ArgumentException

  

20:04:34   The netcore-6.0 framework is not available for X86=False.

  

20:04:34   Available frameworks: net-2.0 net-3.0 net-3.5 net-4.0 net-4.5 net-4.5.1 net-4.5.2 net-4.6 net-4.6.1 net-4.6.2 net-4.7 net-4.7.1 net-4.7.2 net-4.8 netcore-8.0

  

20:04:34      at NUnit.Engine.Services.TestAgency.GetAgent(TestPackage package) in C:\Users\charlie\dev\NUnit\nunit3-console\src\NUnitEngine\nunit.engine\Services\TestAgency.cs:line 71

  

20:04:34      at NUnit.Engine.Runners.ProcessRunner.CreateAgentAndRunnerIfNeeded() in C:\Users\charlie\dev\NUnit\nunit3-console\src\NUnitEngine\nunit.engine\Runners\ProcessRunner.cs:line 250

  

20:04:34      at NUnit.Engine.Runners.ProcessRunner.RunTests(ITestEventListener listener, TestFilter filter) in C:\Users\charlie\dev\NUnit\nunit3-console\src\NUnitEngine\nunit.engine\Runners\ProcessRunner.cs:line 138
```
It became obvious that the error came from it wanting to run test that is in x86 in a .NET core that doesn't support it. So that's not a difficult thing to resolve but wait there's more.


Then I get an error code of -2 due to invalid of dlls, this was also not difficult to resolve once I looked at the documentation of Nunit. It became clear to me that Visual Studio took away alot of the little complexities such as the following parameters in Nunit :

```
--skipnontestassemblies
--framework=netcore-8.0
```

However even though I had these parameters, I was unsuccessful in having the build to fully succeed as it still exited with error code -2 due to one legacy dll being detected from the expected behavior of the BuildRunner. 

Now to overcome this I had to make it so my build would succeed even if it has an exit code of -2.


<h4 align="center">Conclusion</h4>

After all that headbanging, I was able to construct the following build for the CI for this project
```java  
package _Self.buildTypes  
  
import jetbrains.buildServer.configs.kotlin.*  
  
object Build : BuildType({  
    name = "Build"  
  
    vcs {  
        root(Http1723024013000DebuggingaHopperQueueManagerGitRefsHeadsMaster)  
    }  
  
    steps {  
        nuGetInstaller {  
            id = "jb_nuget_installer"  
            toolPath = "%teamcity.tool.NuGet.CommandLine.DEFAULT%"  
            projects = "LoccioniQueueManager.sln"  
            updatePackages = updateParams {  
            }  
        }  
        dotnetMsBuild {  
            id = "dotnet"  
            projects = "LoccioniQueueManager.sln"  
            version = DotnetMsBuildStep.MSBuildVersion.V17  
            configuration = "Release"  
            args = "-restore -noLogo"  
            sdk = "4.7 8"  
        }  
  
nunitConsole {  
    name = "NUNIT Tests"  
    id = "NUNIT_Tests"  
    nunitPath = "%teamcity.tool.NUnit.Console.DEFAULT%"  
    includeTests = """**\*.dll"""  
    excludeTests = """**\obj\**\*.dll"""  
    args = "--framework=netcore-8.0 --test=LoccioniQueueManager.Test.LQM_CopyStreamShould.CopyStream_ExistsAfter --skipnontestassemblies --teamcity"  
}  
    }  
  
    triggers {  
        vcs {  
        }  
    }  
  
    failureConditions {  
        nonZeroExitCode = false  
        supportTestRetry = true  
    }  
  
    features {  
        perfmon {  
        }  
    }  
})
```

This was an absolute blast to create as it exposed a lot of the aspects of Visual Studio I took for granted and never once thought about as I just mindlessly typed on my keyboard. It was such an eye opener and made this experience worth it as i was able to see how to not only construct a build but also learn the different aspects.

I even learned about Service Messages which  allowed me to see what the intended workflow should be even if I make a test fail. As frustrating as it was, I was able to learn a lot about the components i was using in my projects. Hope you dear reader enjoyed this article as it detailed not only my frustration but also how much fun it was to construct this.







