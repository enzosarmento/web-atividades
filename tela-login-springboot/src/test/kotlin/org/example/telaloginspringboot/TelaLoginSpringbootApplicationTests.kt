package org.example.telaloginspringboot

import org.junit.jupiter.api.Test
import org.springframework.boot.test.context.SpringBootTest

@SpringBootTest(properties = ["jwt.secret=dGVzdC1vbmx5LWp3dC1zZWNyZXQtMzItYnl0ZXMhISE="])
class TelaLoginSpringbootApplicationTests {

    @Test
    fun contextLoads() {
    }

}
