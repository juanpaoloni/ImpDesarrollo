/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package EntidadesDominio;


import Enumerados.PosicionIVA;
import Enumerados.TipoDocumento;
import java.util.Date;
/**
 *
 * @author jauni
 */

public class Huesped {
    private String nombre;
    private String apellido;
    private String CUIT;
    private TipoDocumento tipoDocumento;
    private PosicionIVA posicionIVA;
    private String numeroDocumento;
    private Date fechaNacimiento;
    private String nacionalidad;
    private String email;
    private String telefono;
    private String ocupacion;
    private Direccion direccion;
}
