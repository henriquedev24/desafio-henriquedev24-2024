
class RecintosZoo {
    analisaRecintos(tipoAnimal, quantidade) {
        const recintos = [
            { numero: 1, bioma: "savana", tamanhoTotal: 10, animaisExistentes: [{ animal: "MACACO", quantidade: 3, tamanho: 1 }] },
            { numero: 2, bioma: "floresta", tamanhoTotal: 5, animaisExistentes: [] },
            { numero: 3, bioma: ["savana", "rio"], tamanhoTotal: 7, animaisExistentes: [{ animal: "GAZELA", quantidade: 1, tamanho: 2 }] },
            { numero: 4, bioma: "rio", tamanhoTotal: 8, animaisExistentes: [] },
            { numero: 5, bioma: "savana", tamanhoTotal: 9, animaisExistentes: [{ animal: "LEAO", quantidade: 1, tamanho: 3 }] }
        ];

        const animal = {
            LEAO: { tamanho: 3, bioma: ["savana"], carnivoro: true },
            LEOPARDO: { tamanho: 2, bioma: ["savana"], carnivoro: true },
            CROCODILO: { tamanho: 3, bioma: ["rio"], carnivoro: true },
            MACACO: { tamanho: 1, bioma: ["savana", "floresta"], carnivoro: false },
            GAZELA: { tamanho: 2, bioma: ["savana"], carnivoro: false },
            HIPOPOTAMO: { tamanho: 4, bioma: ["savana", "rio"], carnivoro: false }
        };

        if (!animal[tipoAnimal.toUpperCase()]) {
            return { erro: "Animal inválido", recintosViaveis: null };
        }

        if (quantidade <= 0) {
            return { erro: "Quantidade inválida", recintosViaveis: null };
        }

        const recintosViaveis = recintos.filter(recinto => {
            const calcularEspacoOcupado = (recinto, animal) => {
                return recinto.animaisExistentes.reduce((tamanhoTotal, animalExistente) => {
                    const animalInfo = animal[animalExistente.animal.toUpperCase()];
                    return tamanhoTotal + (animalInfo ? animalInfo.tamanho * animalExistente.quantidade : 0);
                }, 0);
            };

            const espacoDisponivel = recinto.tamanhoTotal - calcularEspacoOcupado(recinto, animal);


            const espacoNecessario = quantidade * animal[tipoAnimal.toUpperCase()].tamanho;

            const incompatibilidade = recinto.animaisExistentes.some(existingAnimal => {
                const existing = animal[existingAnimal.animal.toUpperCase()];
                const novoAnimal = animal[tipoAnimal.toUpperCase()];

                if (existing && existing.carnivoro && novoAnimal.carnivoro && existingAnimal.animal !== tipoAnimal.toUpperCase()) {
                    return true;
                }
                if (novoAnimal.carnivoro && existing && !existing.carnivoro) {
                    return true;
                }
                return false;
            });

            const biomaAdequado = Array.isArray(recinto.bioma)
                ? recinto.bioma.some(b => animal[tipoAnimal.toUpperCase()].bioma.includes(b))
                : animal[tipoAnimal.toUpperCase()].bioma.includes(recinto.bioma);

            if (!biomaAdequado || espacoDisponivel < espacoNecessario || incompatibilidade) {
                return false;
            }

            if (tipoAnimal.toUpperCase() === 'MACACO' && recinto.animaisExistentes.length === 0) {
                return true;
            }

            if (tipoAnimal.toUpperCase() === 'MACACO' && recinto.animaisExistentes.length >= 1) {
                return true;
            }



            return !incompatibilidade && espacoDisponivel >= espacoNecessario && recinto.bioma.includes(animal[tipoAnimal.toUpperCase()].bioma);
        });

        if (recintosViaveis.length === 0) {
            return { erro: "Não há recinto viável", recintosViaveis: null };
        }

        const recintosOrdenados = [...recintosViaveis].sort((a, b) => a.numero - b.numero);

        const recintosFormados = recintosOrdenados.map(recinto => {
            let espacoLivre = recinto.tamanhoTotal - recinto.animaisExistentes.reduce((acumulado, existente) => {
                const animalFormados = animal[existente.animal.toUpperCase()];
                return acumulado + (animalFormados ? animalFormados.tamanho * existente.quantidade : 0);
            }, 0) - quantidade * animal[tipoAnimal.toUpperCase()].tamanho;

            if (recinto.animaisExistentes.length > 0 && !recinto.animaisExistentes.some(existing => existing.animal.toUpperCase() === tipoAnimal.toUpperCase())) {
                espacoLivre -= 1;
            }

            return `Recinto ${recinto.numero} (espaço livre: ${espacoLivre} total: ${recinto.tamanhoTotal})`;
        });

        return { erro: null, recintosViaveis: recintosFormados };
    }
}


export { RecintosZoo as RecintosZoo };
