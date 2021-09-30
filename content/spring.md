Title: Spring
Category: Programming
Tags: OOP


# Dependency Injection and Inversion of Control

The Spring IoC container needs to know which beans to create for Dependency Injection.


## Define Beans

| Class Annotation | Use                         |
|------------------|-----------------------------|
| `@Component`     | generic Spring bean         |
| `@Service`       | business service components |
| `@Repository`    | Data Access Objects (DAO) with automatic transaction management |


## Inject Beans

| Annotation           | Use                          |
|-----------------------|-----------------------------|
| `@Autowired`          | Class member to be injected |
| `@Primary`            | This bean is selected even if multiple are valid |
| `@Qualifier`          | Can be added to the bean and the field for selection |

`@Autowired` can be added to class member fields or to constructors.

Auto-wiring is successful if exactly one match is found.
If multiple candidate beans are available the expected one can be
annotated with `@Primary`.

Use `@Qualifier` for manual selection of a bean implementation:


    :::java
    @Component
    @Qualifier("bubblesort")
    class BubbleSort implements Sort {
      // ...
    }
    @Component
    class SimpleSort implements Sort {
      // ...
    }
    @Component
    class MyBean {
      @Autowired
      @Qualifier("bubblesort")
      Sort algorithm;
    }


## Scopes

### Generic Scopes

| Scope        | Use                                                       |
|--------------|-----------------------------------------------------------|
| `singleton` (default) | Only one instance of the bean in a IoC container |
| `prototype` | A new instance of the bean is created each time it is requested from the IoC container |


### Web Context Scopes

| Scope     | Use                                                          |
|-----------|--------------------------------------------------------------|
| `request` | A new instance of the bean is created for each HTTP request  |
| `session` | A new instance of the bean is created for every HTTP session |
| `application` | One instance of the bean for a web application           |


### Usage

    :::java
    @Service 
    @Scope("singleton")
    public class MyServiceImpl implements MyService {}


## Lifecycle Hooks

| Annotation       | Use                                                                        |
|------------------|----------------------------------------------------------------------------|
| `@PostConstruct` | Method that is called once the bean is fully initialized with dependencies |
| `@PreDestroy`    | Method that is called before the bean is removed from the IoC container    |


## Run Spring IoC container

Use `ApplicationContext` to launch an IoC container:


### Configuration for Application Context

| Class Annotation | Use                                          |
|------------------|----------------------------------------------|
| `@Configuration` | Define a Spring configuration                |
| `@ComponentScan` | Add information on where to search for beans |


    :::java
    @Configuration
    @ComponentScan(basePackages = { "com.mycompany.mypackage" })
    class SpringContext {
    }