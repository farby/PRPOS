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
					   $(SOAPResponse.toXML()).find("Pis").text(),
					   $(SOAPResponse.toXML()).find("Emergencia").text(),
					   $(SOAPResponse.toXML()).find("Essocio").text(),
					   $(SOAPResponse.toXML()).find("Esfuncionario").text());
		},
		error: function() {
			alert("No se logró establecer conexión con el servidor.");
		}
	});
}

function getDatosIniciales() {
	var ok = false;
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
			ok = true;
			setDatosIniciales(datos);
		}/*,
		error: function() {
			alert("No se logró establecer conexión con el servidor.");
		}*/
	});
	setEstadoConexion(ok);
}

function newContrato(usu, ase, emi, pro, spis, seme, sdoc, snom1, snom2, sape1, sape2, snac, ssex, stel, seml, rpis, reme, rdoc, rnom1, rnom2, rape1, rape2, rnac, rsex, rtel, reml) {
	$.ajax({
		url: url,
		data: data,
		success: success,
		dataType: dataType
	});
	$.soap({
		url: "http://thinkcentre:8080/sga/servlet/awscontrato",
		method: "WSContrato.Execute",
		appendMethodToURL: false,
		async: false,
		withCredentials: false,
		data: {
			Usuario: usu,
            Asesor: ase,
            Emision: emi,
            Produccion: pro,
            Pis: spis,
            Emergencia: seme,
            Sdocumento: sdoc,
            Snombre1: snom1,
            Snombre2: snom2,
            Sapellido1: sape1,
            Sapellido2: sape2,
            Snacimiento: snac,
			Ssexo: ssex,
            Stelefono: stel,
            Semail: seml,
            Rdocumento: rdoc,
            Rnombre1: rnom1,
            Rnombre2: rnom2,
            Rapellido1: rape1,
            Rapellido2: rape2,
            Rnacimiento: rnac,
			Rsexo: rsex,
            Rtelefono: rtel,
            Remail: reml,
            Rpis: rpis,
            Remergencia: reme
		},
		namespaceQualifier: "sga",
		namespaceURL: "SGA",
		enableLogging: true,
		success: function (SOAPResponse) {
			alert("Contrato ingresado correctamente.")
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
			setEstadoFormulario(tipo, "success");
			if (soc === "true") {
				setEstadoFormulario(tipo, "error");
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
			$("#pis1").val(pis);
			$("#eme1").val(eme);
		} else {
			//RESPONSABLE DE PAGO
			setEstadoFormulario(tipo, "success");
			$("#nom5").val(nom1);
			$("#nom6").val(nom2);
			$("#nom7").val(nom3);
			$("#nom8").val(nom4);
			$("#nac2").val(nac);
			$("#dir2a").val(dir1);
			$("#dir2b").val(dir2);
			$("#dir2c").val(dir3);
			$("#dir2d").val(dir4);
			$("#pis2").val(pis);
			$("#eme2").val(eme);
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

function setEstadoFormulario(tipo, estado) {
	$("#doc" + tipo).parent().addClass("has-" + estado);
	$("#doc" + tipo).prop("style", "background-color: red");
}

function setEstadoConexion(conectado) {
	$("#estado").removeClass("label-info");
	$("#estado").removeClass("label-danger");
	if (conectado) {
		$("#estado").addClass("label-info");
	} else {
		$("#estado").addClass("label-danger");
	}
}

$(document).ready(init);
function init() {
	$("#firma").sketch();
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
		function(){
			if(confirm("¿Confirma que se ha concretado la venta?")) {
				if($("#idem").prop("checked")) {
					$("#doc2").val() = $("#doc1").val();
				}
				newContrato("PRPOS",266,1,1,$("#pis1").val(),$("#eme1").val(),$("#doc1").val(),$("#nom1").val(),$("#nom2").val(),$("#nom3").val(),$("#nom4").val(),$("#nac1").val(),$("#sex1").val(),$("#tel1").val(),$("#email1").val(),$("#pis2").val(),$("#eme2").val(),$("#doc2").val(),$("#nom5").val(),$("#nom6").val(),$("#nom7").val(),$("#nom8").val(),$("#nac2").val(),$("#sex2").val(),$("#tel2").val(),$("#email2").val());
			}
		}
	);
	$("#idem").change(
		function() {
			habilitarResponsable();
		}
	);
}
