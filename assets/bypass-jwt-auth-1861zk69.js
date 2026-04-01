const n=`# Bypass de autenticación en aplicaciones JWT mal configuradas

Las implementaciones incorrectas de JWT son una de las vulnerabilidades más comunes en aplicaciones web modernas. En este post, exploraremos las técnicas más efectivas para identificar y explotar estas fallas.

## El problema con "alg: none"

Uno de los ataques más clásicos contra JWT es la manipulación del header para cambiar el algoritmo a \`none\`:

\`\`\`json
{
  "alg": "none",
  "typ": "JWT"
}
\`\`\`

Muchas librerías antiguas aceptan este header sin verificar la firma, permitiendo crear tokens arbitrarios.

## Confusión de algoritmos RS256 → HS256

Si el servidor usa RS256 (asimétrico), un atacante puede:

1. Obtener la clave pública (generalmente accesible)
2. Cambiar el algoritmo a HS256 (simétrico)
3. Firmar el token con la clave pública como secreto

\`\`\`python
import jwt

public_key = open('public.pem').read()
payload = {"sub": "admin", "role": "admin"}
token = jwt.encode(payload, public_key, algorithm='HS256')
\`\`\`

## Mitigaciones

- **Validar siempre el algoritmo** en el servidor, nunca confiar en el header
- Usar librerías actualizadas que rechacen \`alg: none\`
- Implementar rotación de claves
- Establecer tiempos de expiración cortos

## Herramientas útiles

- [jwt.io](https://jwt.io) para inspeccionar tokens
- \`jwt_tool\` para testing automatizado
- Burp Suite con extensión JWT Editor

---

*¿Encontraste una implementación vulnerable? Practícalo en entornos controlados como HackTheBox o PortSwigger Academy.*
`;export{n as default};
