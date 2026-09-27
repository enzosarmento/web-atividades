package org.example.telaloginspringboot

import org.example.telaloginspringboot.controller.AuthController
import org.example.telaloginspringboot.dto.LoginRequest
import org.example.telaloginspringboot.security.JwtService
import org.junit.jupiter.api.Test
import org.springframework.security.authentication.AuthenticationManager
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.Authentication
import kotlin.test.assertEquals
import kotlin.test.assertNotNull

private const val TEST_JWT_SECRET = "dGVzdC1vbmx5LWp3dC1zZWNyZXQtMzItYnl0ZXMhISE="

class AuthControllerIntegrationTest {

    private val authenticationManager = object : AuthenticationManager {
        override fun authenticate(authentication: Authentication): Authentication {
            return UsernamePasswordAuthenticationToken(authentication.name, authentication.credentials, authentication.authorities)
        }
    }

    @Test
    fun `deve autenticar usuario valido e retornar token`() {
        val authController = AuthController(authenticationManager, JwtService(TEST_JWT_SECRET))
        val response = authController.login(LoginRequest(email = "admin@teste.com", password = "123456"))

        assertEquals(200, response.statusCode.value())
        assertNotNull(response.body)
        assertNotNull(response.body!!.token)
        assert(response.body!!.token.isNotBlank())
    }
}
