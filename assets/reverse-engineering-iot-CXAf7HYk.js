const e=`# Reverse engineering de un protocolo IoT propietario

Los dispositivos IoT suelen utilizar protocolos propietarios que raramente son auditados. En este writeup, documentamos el proceso completo de reversing de un protocolo de comunicación entre un hub domótico y sus sensores.

## Captura del tráfico

El primer paso fue interceptar la comunicación usando un SDR (Software Defined Radio):

\`\`\`bash
rtl_433 -f 433.92M -s 250k -r capture.cu8
\`\`\`

## Análisis del protocolo

Después de capturar suficientes paquetes, identificamos la estructura:

\`\`\`
[PREAMBLE: 4 bytes] [DEVICE_ID: 2 bytes] [CMD: 1 byte] [PAYLOAD: N bytes] [CRC: 2 bytes]
\`\`\`

El CRC resultó ser CRC-16/CCITT, lo que confirmamos con:

\`\`\`python
import crcmod

crc16 = crcmod.predefined.mkCrcFun('crc-ccitt-false')
assert crc16(packet[:-2]) == int.from_bytes(packet[-2:], 'big')
\`\`\`

## Descubrimientos

- Sin cifrado en la comunicación
- Device IDs predecibles (secuenciales)
- Comandos de desbloqueo sin autenticación
- Posibilidad de replay attacks

## Impacto

Un atacante dentro del rango de radio podría:
- Desbloquear cerraduras
- Desactivar alarmas
- Manipular lecturas de sensores

## Responsible disclosure

Se reportó al fabricante siguiendo un proceso de divulgación responsable de 90 días.

---

*La seguridad IoT sigue siendo un campo con enormes oportunidades de investigación.*
`;export{e as default};
