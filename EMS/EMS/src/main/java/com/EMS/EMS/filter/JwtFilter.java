//package com.EMS.EMS.filter;
//
//import jakarta.servlet.FilterChain;
//import jakarta.servlet.ServletException;
//import jakarta.servlet.http.HttpServletRequest;
//import jakarta.servlet.http.HttpServletResponse;
//
//import org.springframework.stereotype.Component;
//
//import org.springframework.web.filter.OncePerRequestFilter;
//
//import java.io.IOException;
//
//@Component
//public class JwtFilter
//        extends OncePerRequestFilter {
//
//    @Override
//    protected void doFilterInternal(
//
//            HttpServletRequest request,
//
//            HttpServletResponse response,
//
//            FilterChain filterChain
//
//    ) throws ServletException,
//            IOException {
//
//        String authHeader =
//                request.getHeader(
//                        "Authorization"
//                );
//
//        // LOGIN API bypass
//        if (
//                request.getRequestURI()
//                        .contains("/api/auth/login")
//        ) {
//
//            filterChain.doFilter(
//                    request,
//                    response
//            );
//
//            return;
//        }
//
//        // TOKEN CHECK
//        if (
//                authHeader == null
//                        ||
//                        !authHeader.startsWith(
//                                "Bearer "
//                        )
//        ) {
//
//            response.setStatus(
//                    HttpServletResponse.SC_UNAUTHORIZED
//            );
//
//            response.getWriter()
//                    .write(
//                            "Unauthorized"
//                    );
//
//            return;
//        }
//
//        filterChain.doFilter(
//                request,
//                response
//        );
//    }
//}




package com.EMS.EMS.filter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JwtFilter
        extends OncePerRequestFilter {

    @Override
    protected void doFilterInternal(

            HttpServletRequest request,

            HttpServletResponse response,

            FilterChain filterChain

    ) throws ServletException,
            IOException {

        filterChain.doFilter(
                request,
                response
        );
    }
}