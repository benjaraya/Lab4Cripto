// ==UserScript==
// @name         New Userscript2
// @namespace    http://tampermonkey.net/
// @version      2024-06-11
// @description  try to take over the world!
// @author       You
// @match        https://cripto.tiiny.site/*
// @match        http://127.0.0.1:5500/prueba.html*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none

// ==/UserScript==
// Por alguna razón, al ejecutar el scritpt en la página de prueba, http://127.0.0.1:5500/prueba.html, tenía que recargar varías veces para vsiualizar la informaci[on
// así que le pido paciencia al script porfavor  

(function() {
    'use strict';

    // Función para cargar un script externamente
  function loadScript(url, sha, callback) {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;
    script.integrity = sha;
    script.crossOrigin = 'anonymous'; // Es importante establecer el atributo crossOrigin en 'anonymous' cuando se utiliza SRI.
    script.onload = callback;
    document.head.appendChild(script);
}

    // Asegurarse de que el script de Tampermonkey se está ejecutando
   // console.log('Script de Tampermonkey ejecutándose');

    // Cargar la librería CryptoJS
   loadScript('https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.1.1/crypto-js.min.js', 'sha384-S3wQ/l0OsbJoFeJC81UIr3JOlx/OzNJpRt1bV+yhpWQxPAahfpQtpxBSfn+Isslc', () => {
       // console.log('CryptoJS cargado correctamente');

        // Verificar si CryptoJS está cargado
        if (typeof CryptoJS === 'undefined') {
            console.error('CryptoJS no está definido. Asegúrate de que la librería se está cargando correctamente.');
            return;
        } else {
           // console.log('CryptoJS está cargado y definido.');
        }

        // Esperar a que el DOM esté completamente cargado
        document.addEventListener('DOMContentLoaded', () => {
            //console.log('DOM completamente cargado');

            // Contar el número de divs en la página


            // Extraer la clave de cifrado del texto dentro de la etiqueta <p>
            const pElements = document.getElementsByTagName('p');

            if (pElements.length > 0) {
               // console.log('Número de elementos <p> encontrados:', pElements.length);

                let keyText = "";
                for (let p of pElements) {
                    keyText += p.innerText;
                }
               // console.log('Texto combinado de <p>:', keyText);

                const encryptionKey = keyText.replace(/[^A-Z]/g, '').replace(/Ã/g, '');
                console.log('La llave es:', encryptionKey);
                  const divs = document.querySelectorAll('div');
            const numberOfDivs = divs.length;
            console.log('Los mensajes cifrados son:', numberOfDivs);

                // Función para desencriptar el contenido de los elementos <div>
                function decryptDivContent() {
                    var contenidoDesencriptado = '';
                    for (var i = 0; i < divs.length; i++) {
                        var div = divs[i];
                        var id = div.id;
                        var ciphertextBytes = CryptoJS.enc.Base64.parse(id);
                        var decryptedBytes = CryptoJS.TripleDES.decrypt({ ciphertext: ciphertextBytes }, CryptoJS.enc.Utf8.parse(encryptionKey), {
                            mode: CryptoJS.mode.ECB,
                            padding: CryptoJS.pad.Pkcs7
                        });
                        var decryptedText = decryptedBytes.toString(CryptoJS.enc.Utf8);
                        console.log(id + ": " + decryptedText);
                        contenidoDesencriptado += decryptedText + ' ';
                    }

                    var palabrasDesencriptadas = contenidoDesencriptado.split(' ');
                    var mensajeDesencriptado = document.createElement('p');
                    for (var k = 0; k < palabrasDesencriptadas.length; k++) {
                        mensajeDesencriptado.innerHTML += palabrasDesencriptadas[k] + '<br>';
                    }

                    document.body.appendChild(mensajeDesencriptado);
                }

                // Llamar a la función para desencriptar el contenido de los elementos <div>
                decryptDivContent();
            } else {
                console.error('No se encontraron elementos <p> en la página.');
            }
        });
    });
})();
