// callrestapi.js
// Ajusta el host/puerto si tu servidor corre en otro sitio
const url = "https://mysql-restapi-legends-1074346283359.us-central1.run.app/api/legends";
let jugadoresList = [];

// Crear jugador
function postJugador() {
  // Leemos los valores crudos del formulario
  const raw = {
    name:            $("#name").val(),
    estado:          $("#estado").val(),
    ultimoClub:      $("#ultimoClub").val(),
    numeroTitulos:   $("#numeroTitulos").val(),
    numeroGoles:     $("#numeroGoles").val(),
    balonesDeOro:    $("#balonesDeOro").val(),
    mundialesGanados: $("#mundialesGanados").val(),
  };

  // Mapeamos a los campos que espera la API
  const payload = {
    name:          raw.name,
    status:        raw.estado,
    last_club:     raw.ultimoClub,
    titles_count:  parseInt(raw.numeroTitulos, 10),
    goals_count:   parseInt(raw.numeroGoles, 10),
    ballon_dors:   parseInt(raw.balonesDeOro, 10),
    world_cups:    parseInt(raw.mundialesGanados, 10),
  };

  console.log("➡️ Payload mapeado (POST):", payload);

  $.ajax({
    url: url,
    type: 'POST',
    dataType: 'json',
    contentType: 'application/json',
    data: JSON.stringify(payload),
    success: function(data) {
      $('#resultado').html("Creado: " + JSON.stringify(data.legend));
      getJugadores();
    },
    error: function(xhr) {
      $('#resultado').html("Error: " + xhr.responseText);
    }
  });
}

// Obtener todos los jugadores
// Obtener todos los jugadores (con manejo de errores)
// Obtener todos los jugadores (con manejo de errores)
function getJugadores() {
  $.ajax({
    url: url,
    type: 'GET',
    dataType: 'json',
    success: function(json) {
      // Si no viene .legends o no es array, salimos
      if (!json.legends || !Array.isArray(json.legends)) {
        $('#resultado').html("No hay datos disponibles o la respuesta no tiene formato esperado.");
        return;
      }
      jugadoresList = json.legends;

      let html = `
        <table border="1" cellpadding="5">
          <tr>
            <th>ID</th><th>Name</th><th>Status</th><th>Last Club</th>
            <th>Titles</th><th>Goals</th><th>Ballon d'Or</th><th>World Cups</th><th>Acciones</th>
          </tr>`;

      jugadoresList.forEach(j => {
        html += `
          <tr>
            <td>${j.id}</td>
            <td>${j.name}</td>
            <td>${j.status}</td>
            <td>${j.last_club}</td>
            <td>${j.titles_count}</td>
            <td>${j.goals_count}</td>
            <td>${j.ballon_dors}</td>
            <td>${j.world_cups}</td>
            <td>
              <button onclick="populateForm(${j.id})">Editar</button>
              <button onclick="deleteJugador(${j.id})">Eliminar</button>
            </td>
          </tr>`;
      });

      html += `</table>`;
      $('#resultado').html(html);
    },
    error: function(xhr) {
      $('#resultado').html("Error al obtener jugadores: " + xhr.responseText);
    }
  });
}


// Rellenar el formulario con los datos del jugador seleccionado
function populateForm(id) {
  const j = jugadoresList.find(x => x.id === id);
  if (!j) return alert("Jugador no encontrado en la lista");

  $("#jugadorId").val(j.id);
  $("#name").val(j.name);
  $("#estado").val(j.status);
  $("#ultimoClub").val(j.last_club);
  $("#numeroTitulos").val(j.titles_count);
  $("#numeroGoles").val(j.goals_count);
  $("#balonesDeOro").val(j.ballon_dors);
  $("#mundialesGanados").val(j.world_cups);
}

// Actualizar jugador
function updateJugador() {
  const id = $("#jugadorId").val();
  if (!id) return alert("Primero haz click en 'Editar' en la tabla");

  const raw = {
    name:            $("#name").val(),
    estado:          $("#estado").val(),
    ultimoClub:      $("#ultimoClub").val(),
    numeroTitulos:   $("#numeroTitulos").val(),
    numeroGoles:     $("#numeroGoles").val(),
    balonesDeOro:    $("#balonesDeOro").val(),
    mundialesGanados: $("#mundialesGanados").val(),
  };

  const payload = {
    name:          raw.name,
    status:        raw.estado,
    last_club:     raw.ultimoClub,
    titles_count:  parseInt(raw.numeroTitulos, 10),
    goals_count:   parseInt(raw.numeroGoles, 10),
    ballon_dors:   parseInt(raw.balonesDeOro, 10),
    world_cups:    parseInt(raw.mundialesGanados, 10),
  };

  console.log("➡️ Payload mapeado (PUT):", payload);

  $.ajax({
    url: `${url}/${id}`,
    type: 'PUT',
    dataType: 'json',
    contentType: 'application/json',
    data: JSON.stringify(payload),
    success: function(data) {
      $('#resultado').html("Actualizado: " + JSON.stringify(data.legend));
      getJugadores();
    },
    error: function(xhr) {
      $('#resultado').html("Error: " + xhr.responseText);
    }
  });
}

// Eliminar jugador
function deleteJugador(id) {
  if (!confirm("¿Seguro que quieres borrar el jugador " + id + "?")) return;

  $.ajax({
    url: `${url}/${id}`,
    type: 'DELETE',
    success: function() {
      $('#resultado').html("Jugador eliminado.");
      getJugadores();
    },
    error: function(xhr) {
      $('#resultado').html("Error: " + xhr.responseText);
    }
  });
}



/*var url = "http://localhost:3300/api/users";

function postUser() {

    console.log(url);

    var myName = $('#name').val();
    var myEmail = $('#email').val();
    var myAge = $('#age').val();
    var myComments = $('#comments').val();

    var myuser = {
        name: myName,
        email: myEmail,
        age: myAge,
        comments: myComments
    };
    console.log(myuser);

    $.ajax({
        url: url,
        type: 'post',
        dataType: 'json',
        contentType: 'application/json',
        success: function (data) {
            console.log(data);
            $('#resultado').html(JSON.stringify(data.user));
        },
        data: JSON.stringify(myuser)
    });
}


function getUsers() {
    console.log(url);

    $.getJSON(url, function(json) {
        console.log(json);

        var arrUsers = json.users;

        var htmlTableUsers = '<table border=1">';

        arrUsers.forEach(function(item) {
            console.log(item);
            htmlTableUsers += '<tr>' +
                '<td>' + item.id + '</td>' +
                '<td>' + item.name + '</td>' +
                '<td>' + item.email + '</td>' +
                '<td>' + item.age + '</td>' +
                '<td>' + item.comments + '</td>' +
            '</tr>';
        });

        htmlTableUsers += '</table>';

        $('#resultado').html(htmlTableUsers);
    });
}
*/