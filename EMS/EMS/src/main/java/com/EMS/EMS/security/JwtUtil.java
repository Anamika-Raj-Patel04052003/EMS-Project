package com.EMS.EMS.security;

import io.jsonwebtoken.Jwts;

import javax.crypto.SecretKey;

import io.jsonwebtoken.security.Keys;

import java.nio.charset.StandardCharsets;

import java.util.Date;

public class JwtUtil {

    private static final SecretKey KEY =

            Keys.hmacShaKeyFor(

                    "ems_secret_key_ems_secret_key_123456789"
                            .getBytes(StandardCharsets.UTF_8)
            );

    public static String generateToken(
            String username
    ) {

        return Jwts.builder()

                .setSubject(username)

                .setIssuedAt(
                        new Date()
                )

                .setExpiration(

                        new Date(
                                System.currentTimeMillis()
                                        + 86400000
                        )
                )

                .signWith(KEY)

                .compact();
    }
}