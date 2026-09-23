package com.example.ent.controller;

import com.example.ent.dto.LoginRequest;
import com.example.ent.entity.User;
import com.example.ent.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
@Slf4j
public class UserController {
    private final UserService userService;

    @PostMapping("/register")
    public User register(@Valid @RequestBody User user, HttpServletRequest request) {
        log.info("Выполнен запрос по эндпоинту: '{} {}', Строка параметров запроса: '{}'", request.getMethod(), request.getRequestURI(), request.getQueryString());
        return userService.registerUser(user);
    }

    @PostMapping("/login")
    public String login(@Valid @RequestBody LoginRequest request, HttpServletRequest httpRequest) {
        log.info("Выполнен запрос по эндпоинту: '{} {}', Строка параметров запроса: '{}'", httpRequest.getMethod(), httpRequest.getRequestURI(), httpRequest.getQueryString());
        return userService.login(request.email(), request.password());
    }

    @GetMapping("/token")
    public User getUserByToken(@Valid @RequestParam String token, HttpServletRequest request) {
        log.info("Выполнен запрос по эндпоинту: '{} {}', Строка параметров запроса: '{}'", request.getMethod(), request.getRequestURI(), request.getQueryString());
        return userService.getUserByToken(token);
    }

    @GetMapping("/{userId}")
    public User getUserById(@Valid @PathVariable Long userId, HttpServletRequest request) {
        log.info("Выполнен запрос по эндпоинту: '{} {}', Строка параметров запроса: '{}'", request.getMethod(), request.getRequestURI(), request.getQueryString());
        return userService.getUserById(userId);
    }

    @GetMapping
    public List<User> getUsers(HttpServletRequest request) {
        log.info("Выполнен запрос по эндпоинту: '{} {}', Строка параметров запроса: '{}'", request.getMethod(), request.getRequestURI(), request.getQueryString());
        return userService.getUsers();
    }
}