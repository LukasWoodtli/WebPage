---
title: Testing Strategies
category: Programming
---

Test are written for getting confidence about the software. There are a lot of kinds of feedback that give confidence about the system including:

- Correctness (Business Logic)
- User Interface, User Experience
- Robustness
- Stress/Load
- Resilience
- Regression
- Performance
- Security
- Portability
- Healthy codebase, code quality

This article is focused on automated tests that are usually implemented by developers or testing engineers.

Tests can be categorized based on different properties which leads to a multidimensional definition.

## Scope

Here is a common categorization:

| Category           | Runtime Speed  | Scope  | Number of Tests      | Access to Source Code | Used Resources                                 |
|--------------------|----------------|--------|----------------------|-----------------------|------------------------------------------------|
| Unit Tests         | very fast      | small  | a lot                | Yes                   | no I/O (filesystem access, network, database ) |
| Integration Tests  | slower         | middle | less than Unit Tests | Yes                   | I/O access allowed                             |
| End-to-End Tests   | slow           | big    | a few                | No                    | I/O access usually required                    |


See also:

- [The Practical Test Pyramid](https://martinfowler.com/articles/practical-test-pyramid.html)
- [How Google Tests Software](https://testing.googleblog.com/2011/03/how-google-tests-software-part-five.html)


## Business vs. Technical

Usually most tests are written to make sure that the software behaves correctly from a business point of view.
But sometimes there are tests that ensure correct implementation of pure technical parts of the software.

See also:

- [The Testing Iceberg](https://accu.org/journals/overload/30/172/rose/)
- [Agile Testing Quadrants](https://lisacrispin.com/2011/11/08/using-the-agile-testing-quadrants/)

## Descriptive vs. Prescriptive

Regression Tests vs. Characterization Tests (Golden Master Test)

Regression tests guarantee that unwanted changes (regressions) in the code are detected early.
Characterization tests on the other hand do not verify the correct behavior of the code,
but they verify the behavior that was observed when they were introduced. They are mostly useful
in legacy code.

## Test Time

Automated tests can be executed at different times in the lifecycle of a software. They can be used
during development (TDD) or be run in production. On any step between some kind for quality assurance
measures need to be taken.

See also:

- [Shift Left – Why I Don’t Like the Term](https://janetgregory.ca/shift-left-why-i-dont-like-the-term/)
- [Continuous Testing in DevOps](https://danashby.co.uk/2016/10/19/continuous-testing-in-devops/)


### Development

Tools and techniques that help testing during development:

- Unit Test (TDD)
- Functional/Acceptance Tests (i.e. BDD)
- Component-/Integration Tests
- Contract Tests
- Stress Tests
- Fuzz Tests
- Property Based Testing
- Test Coverage
- Mutation Testing
- Benchmark/Performance Tests
- Static Analysis/ Linting
- Dynamic Analysis
- UI/UX/Usability Tests
- Accessibility Tests
- Security/Penetration Tests, Thread Modeling

### Deployment

Testing tricks that help during deployment:

- Tap Compare
- Load Tests
- Config Tests
- Soak Tests

### Release

Tricks for ensuring quality during relasing:

- Canary Deployment
- Monitoring
- Traffic shaping
- Feature Flagging
- Exception Tracking

### Production

Technologies that can be used in production for improving quality:

- Profiling/Tracing
- Logs/Events/Monitoring
- Chaos Tests
- A/B Testing
- Auditing

## Happy Path vs. Unhappy Path (misbehaviour)

When testing software it's not only important to ensure that the correct successful behavior is working,
but also exceptional behavior (errors) needs to be tested.

## Tools and Techniques

- Software in the Loop (SITL)
- Hardware in the Loop (HITL)
- Test Jigs
- Design by Contract (DbC)
- Characterization test (Approval, github scientist)
- Behavior Driven Development (BDD)
