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

| Annotation           | Use                         |
|-----------------------|-----------------------------|
| `@Autowired`          | Class member to be injected |
| `@Primary`            | This bean is selected even if multiple are valid |
| `@Qualifier`          | Can be added to the bean and the field for selection |


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