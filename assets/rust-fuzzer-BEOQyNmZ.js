const e=`# Construyendo un fuzzer desde cero con Rust

El fuzzing es una de las técnicas más efectivas para encontrar bugs de seguridad. En este artículo construiremos un fuzzer de cobertura desde cero usando Rust.

## ¿Por qué Rust?

- Performance comparable a C/C++
- Memory safety sin garbage collector
- Excelente ecosistema para herramientas de seguridad

## Arquitectura básica

\`\`\`rust
struct Fuzzer {
    corpus: Vec<Vec<u8>>,
    coverage: HashSet<u64>,
    rng: SmallRng,
}

impl Fuzzer {
    fn mutate(&mut self, input: &[u8]) -> Vec<u8> {
        let mut mutated = input.to_vec();
        let mutation_type = self.rng.gen_range(0..4);
        
        match mutation_type {
            0 => self.bit_flip(&mut mutated),
            1 => self.byte_insert(&mut mutated),
            2 => self.byte_delete(&mut mutated),
            3 => self.havoc(&mut mutated),
            _ => unreachable!(),
        }
        
        mutated
    }
}
\`\`\`

## Mutaciones implementadas

| Mutación | Descripción |
|----------|-------------|
| Bit flip | Invierte bits aleatorios |
| Byte insert | Inserta bytes en posiciones aleatorias |
| Byte delete | Elimina bytes aleatorios |
| Havoc | Combinación de múltiples mutaciones |

## Feedback de cobertura

Usamos instrumentación de compilación para rastrear bloques básicos ejecutados:

\`\`\`rust
fn track_coverage(input: &[u8]) -> HashSet<u64> {
    let output = Command::new("./target_instrumented")
        .stdin(Stdio::piped())
        .env("COVERAGE_FILE", "/tmp/cov.bin")
        .spawn()
        .expect("Failed to spawn target");
    
    parse_coverage("/tmp/cov.bin")
}
\`\`\`

## Resultados

En 48 horas de fuzzing encontramos:
- 3 buffer overflows
- 1 use-after-free
- 2 integer overflows

---

*El código completo está disponible en mi GitHub. PRs bienvenidos.*
`;export{e as default};
