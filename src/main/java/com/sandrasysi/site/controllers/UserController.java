package com.sandrasysi.site.controllers;

import com.sandrasysi.site.dto.LoginRequestDto;
import com.sandrasysi.site.dto.LoginResponseDto;
import com.sandrasysi.site.secerity.jwt.JwtUtil;
import com.sandrasysi.site.services.AppUserDetailsService;
import com.sandrasysi.site.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "*")
public class UserController {

    @Autowired
    private UserService userService;
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private AppUserDetailsService userDetailsService;
    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/login")
    public ResponseEntity<LoginResponseDto> createAuthenticationToken(@RequestBody LoginRequestDto loginRequestDto) {
        HttpStatus httpStatus = HttpStatus.UNAUTHORIZED;
        String responseMessage = "Vale kasutajanimi või parool!";

        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginRequestDto.getUsername(), loginRequestDto.getPassword())
            );
        } catch (AuthenticationException e) {
            throw new ResponseStatusException(httpStatus, responseMessage, e);
        }

        final UserDetails userDetails = userDetailsService.loadUserByUsername(loginRequestDto.getUsername());
        final String jwt = jwtUtil.generateToken(userDetails);


        return ResponseEntity.ok(new LoginResponseDto(jwt));
    }

}
