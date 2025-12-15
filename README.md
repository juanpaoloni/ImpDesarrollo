Como es indicado en el enunciado del trabajo práctico, el codigo esta dividido en "api/" para todos los archivos relacionados al backend (accesible desde netbeans) y "frontend/" para lo relacionado al frontend (en nuestro caso usamos vscode)
y se uso una base de datos relacional MySQL.

Detalles a tener en cuenta:
  - Se hizo uso de Hibernate para generar de manera automatica las tablas en la base de datos. Más especificamente, ingresa el usuario y contraseña correspondiente de la conexión y, en la misma,
    busca un schema/database llamado "desarrollo" como puede ser visto en la siguiente linea del archivo "application.properties":

    spring.datasource.url=jdbc:mysql://localhost:3306/desarrollo?createDatabaseIfNotExist=true&useSSL=false&serverTimezone=UTC&allowPublicKeyRetrieval=true

    Si se quiere cambiar el nombre de la base de datos a utilizar pueden modificar esa linea (lo que esta justo despues de "//localhost:3306/"). Además, si se quiere modificar las credenciales
    de la conexión tienen que modificar las siguientes líneas que tenemos en "application.properties":

    spring.datasource.username=root          -- aca envez de root pongan el usuario que quieran
    spring.datasource.password=cachito123    -- envez de cachito123 pongan la contraseña que corresponda

    es MUY importante que esta conexión con la base de datos se haga correctamente por que si no el backend no va a ejecutar, y aunque ejecute no haría nada.

    Direccion de "application.properties": "raíz"/api/src/main/resources/application.properties

    Si no tienen MySQL80 ejecutandose como servicio en segundo plano pueden buscarlo haciendo Win + R, services.msc, buscando "MySQL80" y dandole en iniciar.

    Una vez tengan todo en orden, el schema "desarrollo" creado y el backend ejecutado para generar las tablas, copien el txt adjunto con las sentencias de población de la base de datos y peguenlos en el workbench para cargar todo.


  - Para facilitar el uso del programa, en lugar de tener que correrlo manualmente incluímos un ejecutable en la carpeta raíz del proyecto llamado "run.bat", para poder usarlo tienen que tener maven en el path
    de las variables de entorno, ya que se usa "mvn" en la cmd para ejecutar el backend, si no lo tienen lo pueden ejecutar directamente desde netbeans, el front siempre debería funcionar.
    Si no los deja ejecutarlo haciendo doble click, abran la cmd en la carpeta raíz del proyecto y ejecutenlo desde ahi.



  - Se implementaron todos los casos de uso solicitados por el trabajo práctico con algunas modificaciones en algunos, se adjuntan los cambios mas sustanciales:
    
      Dar de baja huésped: en el enunciado del trabajo práctico se indica que se ejecuta "dar de baja huesped" a partir de "Modificar Huésped" luego de seleccionarlo en "Buscar Huésped".
      En un principio hicimos exactamente eso (razón por la cual modificar huésped está implementado), pero nos pareció que el paso intermedio entre "Buscar Huésped" y "dar de baja huésped"
      era completamente innecesario por lo cual decidimos hacer que en la pantalla de "Buscar Huésped" te de las opciones de "Dar de baja Huésped" o "Modificar Huésped" cuando se selecciona uno.
      En cuanto a "Modificar Huésped" hicimos que cargara automaticamente los datos del Huésped seleccionado para modificarlos más facilmente, haciendo el documento inmutable para evitar errores.
      "Dar de Baja Huésped" incluye todo el feedback al usuario de la planilla del caso de uso, incluyendo la confirmación de si efectivamente se quiere dar de baja y el mensaje de error de que
      no se pudo dar de baja en caso de que el huésped tenga ocupaciones.
  
      Mostrar El estado de las habitaciones: Se muestran las habitaciones ocupadas en rojo, las reservadas en amarillo, las fuera de servicio en negro y las disponibles en verde, las reservas canceladas no aparecen.
  
      Facturar: En una situación real, interpretamos que solo debería haber una única ocupación en_proceso por lo que no tendría sentido tener una tabla de selección de ocupaciones a facturar, pero la incluímos con
      fines ilustrativos para mostrar el funcionamiento del sistema. En la sección de selección de items a facturar el enunciado era bastante poco claro sobre que era un item obligatorio y que no, por lo que
      interpretamos que cualquier item con valor distinto de 0 es obligatorio y debe ser marcado, la validación y el feedback es mostrado al usuario por medio de un popup. Finalmente en la preview de la factura
      se obtiene el tipo de factura a partir de la posición frente al iva del responsable, en el caso de las personas jurídicas interpretamos que siempre son Responsables Inscriptos (factura A con IVA discriminado),
      y en el caso de que se seleccione un ocupante se deriva de sus datos. Una vez confirmada la facturación si el responsable era una persona física, se carga en la base de datos como responsable de pago.
  
      Cancelar Reserva: importante aclarar que el caso de uso indica que se seleccionan varias reservas a cancelar, nosotros únicamente permitimos seleccionar de a una, la razón de esto es para poder ingresar el
      motivo de cada cancelación individualmente, permitiendo mayor flexibilidad a cambio de hacer que el proceso sea más lento. Al cancelar una reserva, la misma se le cambia el estado a cancelada y se genera
      una entidad de cancelación en la bdd.


  - Se implementaron un mínimo de 2 de cada tipo de mapping, algunos ejemplos:
    @PutMapping: para crear la entidad de cancelación en la base de datos, para cargar facturas, entre otros.
    @PostMapping: para modificar huésped, para generar reservas seleccionadas, etc. 
    @GetMapping: es el que más usamos, se uso en cosas como obtener la lista de huéspedes que coincidan con los campos de "Buscar Huésped", obtener los estados de las habitaciones, entre muchos otros.

    Ejemplos: http://localhost:8080/huespedes/buscarHuespedes?tipoDocumento=DNI
              http://localhost:8080/huespedes/buscarHuespedes?apellido=Vega&nombre=Carolina
              http://localhost:8080/habitaciones/obtenerPorTipo?tipo=INDIVIDUAL_ESTANDAR
              http://localhost:8080/habitaciones/estado?tipo=&fechaDesde=2025-12-01&fechaHasta=2025-12-31

    @DeleteMapping: se uso en dar de baja huésped y, aunque no lo hayamos implementado en el frontend, se agrego el Dar de baja responsable de pago.


  - Una vez se haya ejecutado el "run.bat" pueden ir a http://localhost:3000 en cualquier buscador para probar el TP. Un pequeño dato a tener en cuenta es que algunos iconos o proporciones de la pagina
    pueden verse raros según la escala de la pantalla que usen, en nuestro caso lo trabajamos a escala de pantalla 100% pero en algunos Sistemas Operativos viene en 125% por defecto.


  - Se implementaron: "Dar de Alta Huésped", "Buscar Huésped", "Dar de baja Huésped", "Modificar Huésped", "Mostrar estado de las habitaciones", "Reservar Habitaciónes", "Cancelar Reserva" y "Facturar".


  - Se hicieron en total 40 tests de toda las clases de la capa de servicio.
    

Para este trabajo práctico se utilizaron diversos patrones de diseño con el objetivo de simplificar el código del backend, mejorar su legibilidad y facilitar su mantenimiento y evolución.

Factory Method fue utilizado en FacturaService para encapsular la creación de responsables de pago según el tipo de persona que representan, ya sea física o jurídica. 
Este patrón resulta adecuado en situaciones donde se necesita instanciar un conjunto de objetos relacionados entre sí, permitiendo separar la lógica de creación de la lógica de uso. 
De esta manera, se mejora la legibilidad del código y se facilita el mantenimiento futuro del sistema ante posibles cambios o extensiones en los tipos de responsables de pago.

Facade fue empleado para ocultar la complejidad interna del sistema mediante la definición de operaciones de alto nivel que simplifican la interacción con distintos subsistemas. 
En particular, se utilizó para el cálculo del estado de una habitación en una fecha determinada (reservada, ocupada o fuera de servicio), donde intervienen múltiples services con sus respectivas operaciones de acceso a datos. 
El uso del Facade permite desacoplar al servicio cliente de los detalles internos de estas interacciones. Asimismo, este patrón fue utilizado en menor medida para encapsular la lógica de interacción entre huésped y ocupación, 
al verificar si un huésped posee ocupaciones activas.

Template Method fue aplicado para centralizar la estructura del algoritmo utilizado en el cálculo del estado de una habitación. 
Dado que la lógica de verificación se repetía de forma similar para los distintos estados posibles distintos de “libre” (reservada, ocupada y fuera de servicio), 
se definió un método plantilla que establece el flujo general, delegando en las subclases la implementación de las condiciones específicas de cada estado. 
Este patrón se utilizó en conjunto con Chain of Responsibility, donde una lista de buscadores de estado es inyectada mediante @Autowired y recorrida secuencialmente hasta que uno de ellos puede resolver la solicitud. 
Si ningún buscador puede hacerlo, se retorna el estado “libre”. La combinación de ambos patrones resulta especialmente conveniente para lograr un sistema desacoplado, extensible y fácil de mantener, 
ya que la incorporación de nuevos estados se realiza simplemente agregando una nueva clase buscadora, sin necesidad de modificar el Facade ni el código existente.

Builder fue utilizado principalmente en la creación de DTOs de respuesta. Este patrón permite simplificar la instanciación de objetos con múltiples atributos, evitando constructores extensos y dependientes del orden de los parámetros, 
así como el uso de múltiples setters dispersos. De esta forma, se mejora la claridad del código y se reduce el riesgo de errores al construir los objetos de transferencia de datos que se envían al frontend.

Por último, Singleton es utilizado de manera implícita por el framework Spring Boot. Los componentes anotados con @Service, @Controller y @Repository son gestionados por el contenedor de Spring como beans singleton por defecto, 
garantizando una única instancia de cada uno dentro del contexto de la aplicación. Esto permite una reutilización eficiente de los recursos, mejora el rendimiento del sistema y evita la creación de instancias duplicadas con responsabilidades equivalentes, 
sin necesidad de implementar manualmente el patrón.
