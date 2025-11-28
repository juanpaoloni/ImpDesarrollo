/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.DESO_TP.DESO_backend;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

/**
 *
 * @author jauni
 */

@RestController
@RequestMapping("/api")
public class ControladorPrueba {
    
    @GetMapping("/hola")
    public String ping(){
        return "Hola desde Spring boot!";
    }
    
}
