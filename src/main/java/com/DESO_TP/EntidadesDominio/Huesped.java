/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.DESO_TP.EntidadesDominio;


import com.DESO_TP.EntidadesDominio.IDs.HuespedId;
import Enumerados.PosicionIVA;
import Enumerados.TipoDocumento;
import jakarta.persistence.*;
import java.time.LocalDate;
import java.util.Date;
import lombok.*;
/**
 *
 * @author jauni
 */

@Entity
@Table(name = "huesped")
@Data
@IdClass(HuespedId.class)
@AllArgsConstructor @NoArgsConstructor
public class Huesped {
    @Column
    private String nombre;
    
    @Column
    private String apellido;
    
    @Column
    private String CUIT;
    
    @Enumerated(EnumType.STRING)
    @Id
    private TipoDocumento tipoDocumento;
    
    @Enumerated(EnumType.STRING)
    @Column
    private PosicionIVA posicionIVA;
    
    @Id
    private String numeroDocumento;
    
    @Column
    private LocalDate fechaNacimiento;
    
    @Column
    private String nacionalidad;
    
    @Column
    private String email;
    
    @Column
    private String telefono;
    
    @Column
    private String ocupacion;
    
    @OneToOne
    @JoinColumn(name = "idDireccion")
    private Direccion direccion;
}
