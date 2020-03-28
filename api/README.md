#LivEvent's API REST

[![LivEvent](https://livevent.es/logo.png "Livevent Icon")](https://livevent.es)

>Endpoint: https://livevent.es/api

## Indice

```json
{
    "Registrar artistas" : "artist_create.php",
    "Editar artistas" : "artist_edit.php",
    "Mostrar artistas" : "artist_list.php",
    "Sesión de artistas" : "artist_login.php",
    "Crear eventos" : "event_create.php",
    "Eliminar eventos" : "event_delete.php",
    "Editar eventos" : "event_edit.php",
    "Mostrar eventos" : "event_list.php",
    "Crear notificaciones" : "notification_create.php",
    "Eliminar notificaciones" : "notification_delete.php",
    "Mostrar notificaciones" : "notification_list.php",
    "Responder encuesta" : "survey_answer.php",
    "Crear encuesta" : "survey_create.php",
    "Mostrar encuestas" : "survey_list.php",
    "Resultados encuesta" : "survey_result.php",
    "Registrar usuarios" : "user_create.php",
    "Sesión de usuarios" : "user_login.php"
}
```

## Registrar artistas

### Request
>**POST** */v1/[artist_create.php](https://livevent.es/api/v1/artist_create.php)*
>Permite registrar un artista en la aplicación.

```json
{
    "email" : "string, required",
    "password" : "string, required",
    "name" : "string, required",
    "gender" : "string, required",
    "description" : "string",
    "twitter" : "string",
    "facebook" : "string",
    "instagram" : "string",
    "webpage" : "string"
}
```
### Response
### 200 OK
```json
{
    "err" : false,
    "msg" : "Artista registrado correctamente",
    "name" : "Example"
}
```
### 400 Datos no válidos
```json
{
    "err" : true,
    "msg" : "Es necesario introducir un email, una contraseña, un nombre y un género"
}
```
### 409 No se puede completar el proceso
```json
{
    "err" : true,
    "msg" : "Ya existe un artista con ese nombre"
}
```
```json
{
    "err" : true,
    "msg" : "Ese email ya esta registrado"
}
```
### Example
```bash
foo@foo:~$ curl -d "email=mail@example.com&password=password&name=JavaStriker&gender=Rock" -X POST https://livevent.es/api/v1/artist_create.php
```

## Editar artistas

### Request
>**POST** */v1/[artist_edit.php](https://livevent.es/api/v1/artist_edit.php)*
>Permite a un artista modificar uno o varios campos de su perfil.

>|       Campo       |       Label       |       Valor       |
>|       :---:       |       :---:       |       :---:       |
>|  Email            |  email            |  string           |
>|  Contraseña       |  password         |  string           |
>|  Nombre           |  name             |  string           |
>|  Género artístico |  gender           |  string           |
>|  Descripción      |  description      |  string           |
>|  Twitter          |  twitter          |  string           |
>|  Facebook         |  facebook         |  string           |
>|  Instagram        |  instagram        |  string           |
>|  Youtube          |  youtube          |  string           |
>|  Página web       |  webpage          |  string           |

```json
{
    "parameter1" : "string, required",
    "parameter2" : "string",
    "parameter3" : "string",
    "parameter4" : "string",
    "parameter5" : "string",
    "parameter6" : "string",
    "parameter7" : "string",
    "parameter8" : "string",
    "parameter9" : "string",
    "parameter10" : "string"
}
```
### Response
### 200 OK
```json
{
    "err" : false,
    "msg" : "Artista editado correctamente"
}
```
### 400 Datos no válidos
```json
{
    "err" : true,
    "msg" : "Es necesario introducir algún campo a modificar"
}
```
### 409 No se puede completar el proceso
```json
{
    "err" : true,
    "msg" : "Es necesario ser artista para poder usar esta funcionalidad"
}
```
### Example
```bash
foo@foo:~$ curl -d "webpage=example.com" -X POST https://livevent.es/api/v1/artist_edit.php
foo@foo:~$ curl -d "email=mail@example.com&description=Una banda local de rock&gender=Rock" -X POST https://livevent.es/api/v1/artist_edit.php
foo@foo:~$ curl -d "gender=Danzas&email=mail@example.com&description=Un grupo de danzas local" -X POST https://livevent.es/api/v1/artist_edit.php
```

## Mostrar artistas

### Request
>**GET** */v1/[artist_list.php](https://livevent.es/api/v1/artist_list.php)*
>Permite listar todos los artistas existentes u obtener toda la información sobre ese artista.

```json
{
    "artistID" : "integer"
}
```
### Response
### 200 OK
```json
{
    "err" : false,
    "msg" :
    {
        "artists" : 
            {
                "artistID" : "1",
                "name" : "Example",
                "description" : "Some data about me",
                "image" : "img/artists/Example"
            },
            {
                "artistID" : "2",
                "name" : "Dollar",
                "description": null,
                "image" : "img/artists/Dollar"
            }
     }
}
```
>Usando la opción de **artistID**

```json
{
    "err" : false,
    "msg" :
    {
        "name" : "Example",
        "description" : "Some data about me",
        "image" : "img/artists/Example",
        "twitter" : "Example",
        "facebook" : "Example",
        "instagram" : null,
        "webpage" : null
    }
}
```
### Example
```bash
foo@foo:~$ curl -X GET https://livevent.es/api/v1/artist_list.php
foo@foo:~$ curl -d "artistID=2" -X GET https://livevent.es/api/v1/artist_list.php
```

## Sesión de artistas

### Request
>**POST** */v1/[artist_login.php](https://livevent.es/api/v1/artist_login.php)*
>Permite registrar un usuario en la aplicación.

```json
{
    "email" : "string, required",
    "password" : "string, required"
}
```
### Response
### 200 OK
```json
{
    "artistID" : 5,
    "name" : "Artista"
}
```
### 400 Datos no válidos
```json
{
    "err" : true,
    "msg" : "Debes introducir un token"
}
```
### 409 No se puede completar el proceso
```json
{
    "err" : true,
    "msg" : "Email o contraseña incorrectas"
}
```

### Example
```bash
foo@foo:~$ curl -d "email=info@example.com&password=password" -X POST https://livevent.es/api/v1/artist_login.php
```

## Crear eventos

### Request
>**POST** */v1/[event_create.php](https://livevent.es/api/v1/event_create.php)*
>Permite crear un evento y su encuesta en la aplicación. 

```json
{
    "name" : "string, required",
    "description" : "string, required",
    "date" : "date, required",
    "duration" : "time",
    "localization" : "string, required"
}
```
### Response
### 200 OK
```json
{
    "err" : false,
    "msg" : "Evento y encuesta creadas correctamente",
    "name" : "Concierto"
}
```
>Si la encuesta no se crea automáticamente, usar [survey_create.php](https://livevent.es/api/v1/survey_create.php) para crearla manualmente.

```json
{
    "err" : false,
    "msg" : "Evento creado correctamente, encuesta no creada",
    "name" : "Concierto"
}
```
### 400 Datos no válidos
```json
{
    "err" : true,
    "msg" : "Ya existe ese evento"
}
```
### 409 No se puede completar el proceso
```json
{
    "err" : true,
    "msg" : "Es necesario introducir nombre, descripción, fecha y localización del evento"
}
```
### Example
```bash
foo@foo:~$ curl -d "name=Concierto&description=New disc&date=YYYY-MM-DD hh:mm:ss&duration=hh:mm:ss&localization=Fake Street 123" -X POST https://livevent.es/api/v1/event_create.php
```

## Eliminar eventos

### Request
>**POST** */v1/[event_delete.php](https://livevent.es/api/v1/event_delete.php)*
>Permite a un artista eliminar alguno de sus eventos.

```json
{
    "eventID" : "integer"
}
```

### Response
### 200 OK
```json
{
    "err" : false,
    "msg" : "OK"
}
```
### 400 Datos no válidos
```json
{
    "err" : true,
    "msg" : "Introduce un evento a eliminar"
}
```
### 409 No se puede completar el proceso
```json
{
    "err" : true,
    "msg" : "Es necesario ser artista para poder usar esta funcionalidad"
}
```
### Example
```bash
foo@foo:~$ curl -d "eventID=12" -X POST https://livevent.es/api/v1/event_delete.php
```


## Editar eventos

### Request
>**POST** */v1/[event_edit.php](https://livevent.es/api/v1/event_edit.php)*
>Permite a un artista modificar información sobre alguno de sus eventos.

>|       Campo       |       Label       |       Valor       |
>|       :---:       |       :---:       |       :---:       |
>|  Nombre           |  name             |  string           |
>|  Descripción      |  description      |  string           |
>|  Fecha            |  date             |  date             |
>|  Duración         |  duration         |  time             |
>|  Ubicación        |  localization     |  string           |

```json
{
    "eventID" : "integer, required",
    "parameter1" : "string, required",
    "parameter2" : "string",
    "parameter3" : "string",
    "parameter4" : "string",
    "parameter5" : "string"
}
```
### Response
### 200 OK
```json
{
    "err" : false,
    "msg" : "Evento editado correctamente"
}
```
### 400 Datos no válidos
```json
{
    "err" : true,
    "msg" : "Es necesario introducir algún campo a modificar"
}
```
### 409 No se puede completar el proceso
```json
{
    "err" : true,
    "msg" : "Es necesario ser artista para poder usar esta funcionalidad"
}
```
### Example
```bash
foo@foo:~$ curl -d "eventID=10&duration=hh:mm:ss" -X POST https://livevent.es/api/v1/event_edit.php
foo@foo:~$ curl -d "eventID=8&localization=UPNA (Campus de Arrosadía s/n)&date=YYYY-MM-DD hh:mm:ss" -X POST https://livevent.es/api/v1/event_edit.php
```

## Mostrar eventos

### Request
>**GET** */v1/[event_list.php](https://livevent.es/api/v1/event_list.php)*
>Permite listar todos los eventos existentes. Se puede filtrar para ver los eventos de un artista concreto, ver los eventos actuales, anteriores o posteriores u obtener información de un evento concreto.

```json
{
    "flag" : "integer"
}
```
```json
{
    "artistID" : "integer"
}
```
```json
{
    "eventID" : "integer"
}
```
### Response
### 200 OK
>Usando la opción de **flag**
>**1:** Pasado
>**2:** Presente
>**3:** Futuro

```json
{
    "err" : false,
    "msg" :
    {
        "events" : 
            {
                "eventID" : "19",
                "name" : "Rueda de prensa",
                "description" : "Presentación de nueva exposición",
                "image" : "img/events/Exposicion",
                "date" : "YYYY-MM-DD hh:mm:ss",
                "duration" : "hh:mm:ss",
                "localization" : "Campus de Arrosadia s/n"
            },
            {
                "eventID" : "24",
                "name" : "Festival",
                "description": "Exhibicion de danzas de fin de curso",
                "image" : "img/events/Danzas",
                "date" : "YYYY-MM-DD hh:mm:ss",
                "duration" : "hh:mm:ss",
                "localization" : "Zentral Kafe-Teatro (Mercado de Santo Domingo, s/n)"
            },
            {
                "eventID" : "28",
                "name" : "Estreno",
                "description": "Estrenamos nueva obra de teatro",
                "image" : "img/events/Estreno",
                "date" : "YYYY-MM-DD hh:mm:ss",
                "duration" : "hh:mm:ss",
                "localization" : "Teatro Gayarre"
            }
     }
}
```
>Usando la opción de **artistID**

```json
{
    "err" : false,
    "msg" :
    {
        "events" : 
            {
                "eventID" : "11",
                "name" : "Concierto UPNA",
                "description" : "Concierto presentando nuevo disco en la biblioteca de la UPNA",
                "image" : "img/events/Concierto",
                "date" : "YYYY-MM-DD hh:mm:ss",
                "duration" : "hh:mm:ss",
                "localization" : "Campus de Arrosadia s/n"
            },
            {
                "eventID" : "14",
                "name" : "Lectura de poesia",
                "description": "Presentaremos y leeremos alguno de los poemas de nuestro nuevo libro",
                "image" : "img/events/Lectura",
                "date" : "YYYY-MM-DD hh:mm:ss",
                "duration" : "hh:mm:ss",
                "localization" : "FNAC La Morea"
            },
            {
                "eventID" : "18",
                "name" : "Firma de discos",
                "description": "Firmaremos nuestro nuevo disco",
                "image" : "img/events/Firmas",
                "date" : "YYYY-MM-DD hh:mm:ss",
                "duration" : "hh:mm:ss",
                "localization" : "El Corte Ingles"
            }
     }
}
```
### Example
```bash
foo@foo:~$ curl -X GET https://livevent.es/api/v1/event_list.php
foo@foo:~$ curl -d "flag=2" -X GET https://livevent.es/api/v1/event_list.php
foo@foo:~$ curl -d "artistID=10" -X GET https://livevent.es/api/v1/event_list.php
```

## Crear notificaciones

### Request
>**POST** */v1/[notification_create.php](https://livevent.es/api/v1/notification_create.php)*
>Permite añadir hasta un máximo de 3 notificaciones para un evento determinado, como el programa del concierto, posibles cambios en el programa o breves avisos.

```json
{
    "eventID" : "string, required",
    "title" : "string, required",
    "description" : "string",
    "image" : "string"
}
```
### Response
### 200 OK
```json
{
    "err" : false,
    "msg" : "Notificación registrada correctamente"
}
```
### 400 Datos no válidos
```json
{
    "err" : true,
    "msg" : "Ya existen notificaciones para ese evento"
}
```
### 409 No se puede completar el proceso
```json
{
    "err" : true,
    "msg" : "Es necesario introducir un título"
}
```
### Example
```bash
foo@foo:~$ curl -d "eventID=5&title=Nuevo disco&image=release.jpg" -X POST https://livevent.es/api/v1/notification_create.php
```

## Eliminar notificaciones

### Request
>**POST** */v1/[notification_delete.php](https://livevent.es/api/v1/notification_delete.php)*
>Permite a un artista eliminar alguna de sus notificaciones.

```json
{
    "notificationID" : "integer"
}
```

### Response
### 200 OK
```json
{
    "err" : false,
    "msg" : "OK"
}
```
### 400 Datos no válidos
```json
{
    "err" : true,
    "msg" : "Introduce una notificacion a eliminar"
}
```
### 409 No se puede completar el proceso
```json
{
    "err" : true,
    "msg" : "Es necesario ser artista para poder usar esta funcionalidad"
}
```
### Example
```bash
foo@foo:~$ curl -d "notificationID=6" -X POST https://livevent.es/api/v1/notification_delete.php
```

## Mostrar notificaciones

### Request
>**POST** */v1/[notification_list.php](https://livevent.es/api/v1/notification_list.php)*
>Permite listar todas las notificaciones de un evento u obtener toda la información de una notificación concreta.

```json
{
    "artistID" : "integer, required",
    "eventID" : "integer, required"
}
```
```json
{
    "notificationID" : "integer"
}
```

### Response
### 200 OK
>Usando la opción de **artistID** y **eventID** 

```json
{
    "err" : false,
    "msg" :
    {
        "info" : 
            {
                "notificationID" : "3",
                "title" : "Rueda de prensa",
                "description" : "Presentación de nueva exposición",
                "notificationimage" : "img/notifications/Presentacion",
                "name" : "Artista",
                "artistimage" : "img/artists/Artista"
            },
            {
                "notificationID" : "24",
                "title" : "Festival",
                "description": "Cambio en el horario del programa",
                "notificationimage" : "img/notifications/Programa",
                "name" : "Artista",
                "artistimage" : "img/artists/Artista"
            }
     }
}
```
>Usando la opción de **notificationID**

```json
{
    "err" : false,
    "msg" :
    {
        "title" : "Nuevo disco",
        "description" : "Presentamos nuevo disco",
        "image" : "img/notifications/Release"
    }
}
```
### Example
```bash
foo@foo:~$ curl -d "artistID=2&eventID=10" -X POST https://livevent.es/api/v1/notification_list.php
foo@foo:~$ curl -d "notificationID=10" -X GET https://livevent.es/api/v1/notification_list.php
```

## Responder encuesta

### Request
>**POST** */v1/[survey_answer.php](https://livevent.es/api/v1/survey_answer.php)*
>Permite guardar la respuesta del asistente a la encuesta de un evento.

```json
{
    "surveyID" : "integer, required",
    "score" : "integer, required",
    "opinion" : "string"
}
```

### Response
### 200 OK
```json
{
    "err" : false,
    "msg" : "Respuesta registrada correctamente"
}
```
### 400 Datos no válidos
```json
{
    "err" : true,
    "msg" : "Es necesario introducir una puntuación"
}
```
### 409 No se puede completar el proceso
```json
{
    "err" : true,
    "msg" : "Ya existe una respuesta a este evento"
}
```
### Example
```bash
foo@foo:~$ curl -d "surveyID=2&score=10&opinion=Buen concierto" -X POST https://livevent.es/api/v1/survey_answer.php
```

## Crear encuesta

### Request
>**GET** */v1/[survey_create.php](https://livevent.es/api/v1/survey_create.php)*
>Permite listar los eventos que tiene ese artista y crear una encuesta para uno de sus eventos.

```json
{
    "eventID" : "integer, required",
    "date" : "date, required",
    "duration" : "time"
}
```

### Response
### 200 OK

```json
{
    "err" : false,
    "msg" :
    {
        "surveys" : 
            {
                "eventID" : "3",
                "name" : "Concierto",
                "description" : "Inicio de gira",
                "image" : "img/events/Gira",
                "date" : "2019-08-22 22:15:00",
                "duration" : "02:30:00"
            },
            {
                "eventID" : "5",
                "name" : "Festival",
                "description": "Exhibicion final de danzas",
                "image" : "img/events/Festival",
                "date" : "2019-12-29 18:30:00",
                "duration" : "01:30:00"
            }
    }
}
```
>Usando la opción de **eventID**, **date** y **duration**

```json
{
    "err" : false,
    "msg" : "Encuesta creada correctamente"
}
```
### 400 Datos no válidos
```json
{
    "err" : true,
    "msg" : "Es necesario ser artista para poder usar esta funcionalidad"
}
```
### 409 No se puede completar el proceso
```json
{
    "err" : true,
    "msg" : "Ya existe una encuesta para ese evento"
}
```
### Example
```bash
foo@foo:~$ curl -X GET https://livevent.es/api/v1/survey_create.php
foo@foo:~$ curl -d "eventID=10&date=YYYY-MM-DD hh:mm:ss" -X GET https://livevent.es/api/v1/survey_create.php
```

## Mostrar encuestas

### Request
>**GET** */v1/[survey_list.php](https://livevent.es/api/v1/survey_list.php)*
>Permite listar todas las encuestas existentes. Adicionalmente, permite listar todas las encuestas creadas por un artista.

```json
{
    "artistID" : "integer"
}
```
### Response
### 200 OK
```json
{
    "err" : false,
    "msg" :
    {
        "surveys" : 
            {
                "surveyID" : "2",
                "name" : "Concierto",
                "description" : "Nuevo disco",
                "image" : "img/events/Concierto"
            },
            {
                "surveyID" : "4",
                "name" : "Festival",
                "description": "Exhibicion de danzas de fin de curso",
                "image" : "img/events/Danzas"
            },
            {
                "eventID" : "7",
                "name" : "Estreno",
                "description": "Estrenamos nueva obra de teatro",
                "image" : "img/events/Estreno"
            }
     }
}
```
>Usando la opción de **artistID**

```json
{
    "err" : false,
    "msg" :
    {
        "events" : 
            {
                "eventID" : "1",
                "name" : "Concierto UPNA",
                "description" : "Concierto presentando nuevo disco en la biblioteca de la UPNA",
                "image" : "img/events/Concierto"
            },
            {
                "eventID" : "2",
                "name" : "Lectura de poesia",
                "description": "Presentaremos y leeremos alguno de los poemas de nuestro nuevo libro",
                "image" : "img/events/Lectura"
            },
            {
                "eventID" : "8",
                "name" : "Firma de discos",
                "description": "Firmaremos nuestro nuevo disco",
                "image" : "img/events/Firmas"
            }
     }
}
```
### Example
```bash
foo@foo:~$ curl -X GET https://livevent.es/api/v1/survey_list.php
foo@foo:~$ curl -d "artistID=10" -X GET https://livevent.es/api/v1/survey_list.php
```

## Resultados encuesta

### Request
>**POST** */v1/[survey_result.php](https://livevent.es/api/v1/survey_result.php)*
>Permite mostrar al artista los resultados de la encuesta que ha seleccionado

```json
{
    "eventID" : "integer, required"
}
```
### Response
### 200 OK
```json
{
    "err" : false,
    "msg" :
    {
        "info" :
            {
                "0" : 0,
                "1" : 5,
                "2" : 0,
                "3" : 3,
                "4" : 0,
                "5" : 8,
                "6" : 0,
                "7" : 1,
                "8" : 0,
                "9" : 2,
                "10" : 0
            },
        "comments" :
            {
                "opinions" :
                    {
                        "opinion" : "Mal sonido",
                        "opinion" : "Perfecto",
                        "opinion" : "Poco espacio"
                    }
            }
    }                      
}
```
### 400 Datos no válidos
```json
{
    "err" : true,
    "msg" : "Es necesario introducir un evento"
}
```
### 409 No se puede completar el proceso
```json
{
    "err" : true,
    "msg" : "Introduce una encuesta válida"
}
```
### Example
```bash
foo@foo:~$ curl -d "eventID=5" -X POST https://livevent.es/api/v1/survey_result.php
```

## Registrar usuarios

### Request
>**POST** */v1/[user_create.php](https://livevent.es/api/v1/user_create.php)*
>Permite registrar un usuario en la aplicación.

```json
{
    "IMEI" : "string, required"
}
```
### Response
### 200 OK
```json
{
    "err" : false,
    "msg" : "Usuario registrado correctamente"
}
```
### 400 Datos no válidos
```json
{
    "err" : true,
    "msg" : "Es necesario introducir un IMEI"
}
```
### 409 No se puede completar el proceso
```json
{
    "err" : true,
    "msg" : "Ese usuario ya esta registrado"
}
```
### Example
```bash
foo@foo:~$ curl -d "IMEI=1574254484651-LE-adb92tg6ia9" -X POST https://livevent.es/api/v1/user_create.php
```

## Sesión de usuarios

### Request
>**POST** */v1/[user_login.php](https://livevent.es/api/v1/user_login.php)*
>Permite registrar un usuario en la aplicación.

```json
{
    "IMEI" : "string, required"
}
```
### Response
### 200 OK
```json
{
    "userID" : 5,
    "IMEI" : "1574254484651-LE-adb92tg6ia9"
}
```
### 400 Datos no válidos
```json
{
    "err" : true,
    "msg" : "Debes introducir un token"
}
```
### 409 No se puede completar el proceso
```json
{
    "err" : true,
    "msg" : "No existe ningún usuario con ese token"
}
```
### Example
```bash
foo@foo:~$ curl -d "IMEI=1574254484651-LE-adb92tg6ia9" -X POST https://livevent.es/api/v1/user_login.php
```