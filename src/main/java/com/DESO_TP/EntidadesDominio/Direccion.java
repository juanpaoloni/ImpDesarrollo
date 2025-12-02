/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.DESO_TP.EntidadesDominio;

import jakarta.persistence.*;
import lombok.*;


/**
 *
 * @author jauni
 */
@Entity
@Table(name = "direccion")
@Data
@AllArgsConstructor @NoArgsConstructor
public class Direccion {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idDireccion;
    
    @Column
    private String calle;
    
    @Column
    private Integer numero;
    
    @Column
    private String departamento;
    
    @Column
    private Integer piso;
    
    @Column
    private String codigoPostal;
    
    @Column
    private String localidad;
    
    @Column
    private String provincia;
    
    @Column
    private String pais;
    
}
