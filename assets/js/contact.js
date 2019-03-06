
function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

document.onreadystatechange = function () {
  if (document.readyState == "complete") {

		window.addEventListener("load", function() {
		  formcell.addEventListener("keypress", soloNumeros, false);
		});

		//Solo permite introducir numeros.
		function soloNumeros(e){
		  var key = window.event ? e.which : e.keyCode;
		  if (key < 48 || key > 57) {
		    e.preventDefault();
		  }
		}

		document.getElementById('btncontact').onclick = function(){
			alerterror = document.getElementById("errorContact").innerHTML = '<h4 id="msgContacted" >Error...</h4>';

			var iframe = document.getElementsByTagName("iframe")[0];
			iframe.display = "none"
			var start = iframe.contentWindow.document.querySelector(".hs-input").id.indexOf("-");
			var end = iframe.contentWindow.document.querySelector(".hs-input").id.length;
			var formId= iframe.contentWindow.document.querySelector(".hs-input").id.substring(start, end);

			var nombre = document.querySelector("#formnombre").value;
			//var pais = document.querySelector("#formpais").value;
			var correo = document.querySelector("#formcorreo").value;
			var phone = document.querySelector("#formcell").value;
			var msg = document.querySelector("#formmsg").value;
			errorFlag = false;
			//validaciones en formulario
			if (nombre.length * correo.length * phone.length * msg.length == 0 ){
				document.getElementById("errorContact").style.display = "inline-block";
				var node = document.createElement("li");                 // Create a <li> node
				var textnode = document.createTextNode("Todos los campos son obligatorios");         // Create a text node
				node.appendChild(textnode);                              // Append the text to <li>
				document.getElementById("errorContact").appendChild(node);
				errorFlag = true;
			}
			if (!validateEmail(correo)){
				var node = document.createElement("li");                 // Create a <li> node
				var textnode = document.createTextNode("Introduzca un correo válido");         // Create a text node
				node.appendChild(textnode);                              // Append the text to <li>
				document.getElementById("errorContact").appendChild(node);
				errorFlag = true;
			}
			////////////

			iframe.contentWindow.document.querySelector("#email"+formId).value = correo;
			iframe.contentWindow.document.querySelector("#firstname"+formId).value = nombre;
			// iframe.contentWindow.document.querySelector("#country"+formId).value = pais;
			iframe.contentWindow.document.querySelector("#phone"+formId).value = phone;
			iframe.contentWindow.document.querySelector("#message"+formId).value = msg;

			if(!errorFlag){
				iframe.contentWindow.document.getElementsByTagName("form")[0].submit();
			}


		}
		window.addEventListener('message', event => {
		   if(event.data.type === 'hsFormCallback' && event.data.eventName === 'onFormSubmitted') {
				var iframe = document.getElementsByTagName("iframe")[0];

				var msg= iframe.contentWindow.document.getElementsByClassName("submitted-message")[0].innerHTML
				document.getElementsByClassName("formcontactFull")[0].style.display = "none";
				document.getElementById("contactado").style.display = "inline-block";
				document.getElementById("msgContacted").innerHTML = msg;
				console.log(msg);
		   }
		});
  }
}
