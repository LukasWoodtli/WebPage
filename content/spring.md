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


# REST Services

## Controller

| Class Annotation  | Use                                          |
|-------------------|----------------------------------------------|
| `@RestController` | Create REST controller, combination of `@ResponseBody` and `@Controller` |


## Handler Methods

There are method annotations for handling a path with a HTTP method:

- `@GetMapping("/path")`
- `@PostMapping("/path")`
- `@PutMapping("/path")`
- `@DeleteMapping("/path")`
- ...


### Parameters to Handler Methods

These annotations can be added to the arguments of the handler method:

| Argument Annotation | Use                     |
|---------------------|-------------------------|
| `@PathVariable`     | Capture a path argument |
| `@PathVariable`     | Capture a path argument |


    :::java
    @GetMapping("/hello/{name}")
    public MyBean hello(@PathVariable String name,
                        @RequestBody MyDto body) {
      return new MyBean();
    }


### Return Values

Usually either a bean (DTO) is returned (which is usually converted to a JSON) or
a `ResponseEntity<>` can be used to provide some information to the client.


## Validation
| Annotation     | Use                                                |
|----------------|----------------------------------------------------|
| `@Valid`       | Argument annotation of a handler method to validate incoming data |
| `@AssertTrue`  | Checks if boolean field is true                    |
| `@AssertFalse` | Checks if boolean field is false                   |
| `@Future`      | Date must be in the future                         |
| `@Past`        | Date must be in the past                           |
| `@Max`         | Number must be lower or equal to the given maximum |
| `@Min`         | Number must be lower or equal to the given minimum |
| `@NotNull`     | Element cannot be `null`                           |
| `@Pattern`     | Element must match the given regular expression    |
| `@Size`        | Element size must be within given boundaries       |




    :::java
    // contoller
    @GetMapping("/hello/{name}")
    public MyBean hello(@PathVariable String name,
                        @Valid @RequestBody MyDto body) { // validate MyDto here
      // ...
    }

    // bean
    public class MyDto {
      @NotNull
      private Date date;

      @Size(min = 5)
      private String string;
    }

    }

## Testing


### Unit Testing the Controller

    :::java
    @ExtendWith(SpringExtension.class)  // before Junit 5 use `@RunWith(SpringRunner.class)`
    @WebMvcTest(value = MyController.class)
    public class MyControllerTest {
      @Autowired
      private MockMvc mvc;

      @MockBean  // mocking with Mockito
      private MyService service;

      // write tests with `@Test`
    }


### Integration Testing


    :::java
    @ExtendWith(SpringExtension.class)  // before Junit 5 use `@RunWith(SpringRunner.class)`
    @SpringBootTest(classes = MyApplication.class,
                    webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
      public class MyControllerIT {

      @Autowired
      private TestRestTemplate template;

      // We are testing also the service layer. So it is not mocked here.
      // Data access could be mocked with @MockBean
    }
