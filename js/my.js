function getPersona(tipo, documento) {
	$.soap({
		url: "http://thinkcentre:8080/sga/servlet/awspersona",
		method: "WSPersonas.Execute",
		appendMethodToURL: false,
		async: false,
		withCredentials: false,
		data: {
			Documento: documento
		},
		namespaceQualifier: "sga",
		namespaceURL: "SGA",
		enableLogging: true,
		success: function (SOAPResponse) {
			//$(SOAPResponse.toXML()).find("Hayerror").text()
			setPersona(tipo,
					   $(SOAPResponse.toXML()).find("Nombre1").text(),
					   $(SOAPResponse.toXML()).find("Nombre2").text(),
					   $(SOAPResponse.toXML()).find("Apellido1").text(),
					   $(SOAPResponse.toXML()).find("Apellido2").text(),
					   $(SOAPResponse.toXML()).find("Nacimiento").text(),
					   $(SOAPResponse.toXML()).find("Dircalle").text(),
					   $(SOAPResponse.toXML()).find("Dirnum").text(),
					   $(SOAPResponse.toXML()).find("Dirapto").text(),
					   $(SOAPResponse.toXML()).find("Diresq").text(),
					   $(SOAPResponse.toXML()).find("Piscod").text(),
					   $(SOAPResponse.toXML()).find("Emergenciacod").text(),
					   $(SOAPResponse.toXML()).find("Essocio").text(),
					   $(SOAPResponse.toXML()).find("Esfuncionario").text());
		},
		error: function() {
			alert("No se logró establecer conexión con el servidor.");
		}
	});
}

function getDatosIniciales() {
	$.soap({
		url: "http://thinkcentre:8080/sga/servlet/awsiniciar",
		method: "WSIniciar.Execute",
		appendMethodToURL: false,
		async: false,
		withCredentials: false,
		data: {
		},
		namespaceQualifier: "sga",
		namespaceURL: "SGA",
		enableLogging: true,
		success: function (SOAPResponse) {
			var datos = new Array();
			$(SOAPResponse.toXML()).find("SDTDato").each(function() {
				datos.push($(this));
			});
			setDatosIniciales(datos);
		},
		error: function() {
			alert("No se logró establecer conexión con el servidor.");
		}
	});
}

function setPersona(tipo, nom1, nom2, nom3, nom4, nac, dir1, dir2, dir3, dir4, pis, eme, soc, fun) {
	/*if (soc === "true") {
		alert("Esta persona ya es beneficiario de Pulso.");
	} else {*/
		if (tipo == 1) {
			//BENEFICIARIO
			if (soc === "true") {
				alert("Esta persona ya es beneficiario de Pulso.");
			}
			$("#nom1").val(nom1);
			$("#nom2").val(nom2);
			$("#nom3").val(nom3);
			$("#nom4").val(nom4);
			$("#nac1").val(nac);
			$("#dir1a").val(dir1);
			$("#dir1b").val(dir2);
			$("#dir1c").val(dir3);
			$("#dir1d").val(dir4);
		} else {
			//RESPONSABLE DE PAGO
			$("#nom5").val(nom1);
			$("#nom6").val(nom2);
			$("#nom7").val(nom3);
			$("#nom8").val(nom4);
			$("#nac2").val(nac);
			$("#dir2a").val(dir1);
			$("#dir2b").val(dir2);
			$("#dir2c").val(dir3);
			$("#dir2d").val(dir4);
		}
	//}
}

function setDatosIniciales(datos) {
	if(datos.length > 0) {
		$("#pis1").empty();
		$("#eme1").empty();
		$("#pis2").empty();
		$("#eme2").empty();
	}
	for(var i = 0; i < datos.length; i++) {
		//alert(datos[i].find("Tipo").text());
		switch(datos[i].find("Tipo").text()) {
			case "PIS":
				$("#pis1").append("<option value='" + datos[i].find("Codigo").text() + "'>" + datos[i].find("Valor").text() + "</option>");
				$("#pis2").append("<option value='" + datos[i].find("Codigo").text() + "'>" + datos[i].find("Valor").text() + "</option>");
				break;
			case "Emergencia":
				$("#eme1").append("<option value='" + datos[i].find("Codigo").text() + "'>" + datos[i].find("Valor").text() + "</option>");
				$("#eme2").append("<option value='" + datos[i].find("Codigo").text() + "'>" + datos[i].find("Valor").text() + "</option>");
				break;
		}
	}
}

function habilitarResponsable() {
	var habilitado = $("#idem").prop("checked");
	$("#responsable input").prop("disabled", habilitado);
	$("#responsable select").prop("disabled", habilitado);
}

$(document).ready(init);
function init() {
	getDatosIniciales();
	
	$("#doc1").blur(
		function() {
			getPersona(1,$("#doc1").val());
		}
	);
	$("#doc2").blur(
		function() {
			getPersona(2,$("#doc2").val());
		}
	);
    $("#btn").click(
		function() {
			if(confirm("¿Confirma que se ha concretado la venta?")) {
				
			}
		}
	);
	$("#idem").change(
		function() {
			habilitarResponsable();
		}
	);
}