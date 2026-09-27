# Getting Started

## JWT secret

The backend requires the `JWT_SECRET` environment variable. Generate a random
256-bit (or longer) Base64 secret and set it before starting the application:

```bash
export JWT_SECRET="$(openssl rand -base64 32)"
./gradlew bootRun
```

Keep the same secret across restarts and backend instances so existing tokens
remain valid. Do not commit the secret or expose it in the Angular application.
If it is missing or invalid, the backend will fail to start rather than use an
insecure default.

### Reference Documentation

For further reference, please consider the following sections:

* [Official Gradle documentation](https://docs.gradle.org)
* [Spring Boot Gradle Plugin Reference Guide](https://docs.spring.io/spring-boot/4.1.1/gradle-plugin)
* [Create an OCI image](https://docs.spring.io/spring-boot/4.1.1/gradle-plugin/packaging-oci-image.html)
* [Spring Configuration Processor](https://docs.spring.io/spring-boot/4.1.1/specification/configuration-metadata/annotation-processor.html)
* [Spring Boot DevTools](https://docs.spring.io/spring-boot/4.1.1/reference/using/devtools.html)
* [Spring Modulith](https://docs.spring.io/spring-modulith/reference/)

### Additional Links

These additional references should also help you:

* [Gradle Build Scans – insights for your project's build](https://scans.gradle.com#gradle)
